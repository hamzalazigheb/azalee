const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function syncPagesToStaging() {
  try {
    // Production MongoDB URI (from .env.local)
    const prodUri = process.env.MONGODB_URI;
    if (!prodUri) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    // Staging MongoDB URI (modify the database name)
    const stagingUri = prodUri.replace(/\/[^\/]+$/, '/azalee_db_staging');
    
    console.log('🔄 Syncing pages from Production to Staging...\n');
    console.log('📍 Production:', prodUri.replace(/\/\/.*@/, '//***:***@'));
    console.log('📍 Staging:', stagingUri.replace(/\/\/.*@/, '//***:***@'));
    console.log('');

    // Connect to production
    console.log('🔗 Connecting to Production MongoDB...');
    await mongoose.connect(prodUri);
    console.log('✅ Connected to Production\n');

    const ProdPageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    // Get all pages from production
    const prodPages = await ProdPageContent.find({}).select('path title content published lastModified');
    console.log(`📊 Found ${prodPages.length} pages in Production\n`);

    // Disconnect from production
    await mongoose.disconnect();
    console.log('✅ Disconnected from Production\n');

    // Connect to staging
    console.log('🔗 Connecting to Staging MongoDB...');
    await mongoose.connect(stagingUri);
    console.log('✅ Connected to Staging\n');

    const StagingPageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    // Copy each page to staging
    for (const prodPage of prodPages) {
      try {
        const existingPage = await StagingPageContent.findOne({ path: prodPage.path });
        
        if (existingPage) {
          // Update existing page
          existingPage.title = prodPage.title;
          existingPage.content = prodPage.content;
          existingPage.published = prodPage.published;
          existingPage.lastModified = prodPage.lastModified;
          await existingPage.save();
          updated++;
          console.log(`  ✅ Updated: /${prodPage.path}`);
        } else {
          // Create new page
          const newPage = new StagingPageContent({
            path: prodPage.path,
            title: prodPage.title,
            content: prodPage.content,
            published: prodPage.published,
            lastModified: prodPage.lastModified
          });
          await newPage.save();
          created++;
          console.log(`  ➕ Created: /${prodPage.path}`);
        }
      } catch (error) {
        if (error.code === 11000) {
          skipped++;
          console.log(`  ⏭️  Skipped (duplicate): /${prodPage.path}`);
        } else {
          errors++;
          console.error(`  ❌ Error with /${prodPage.path}: ${error.message}`);
        }
      }
    }

    // Final count
    const stagingCount = await StagingPageContent.countDocuments({});

    console.log('\n' + '='.repeat(80));
    console.log('📊 SYNC SUMMARY:');
    console.log('='.repeat(80));
    console.log(`   Production pages: ${prodPages.length}`);
    console.log(`   Created in staging: ${created}`);
    console.log(`   Updated in staging: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total in staging: ${stagingCount}`);
    console.log('='.repeat(80));

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from Staging');
    console.log('\n✅ Sync completed successfully!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

syncPagesToStaging();

