const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function checkPagesCount() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    console.log('📍 URI:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    // Count all pages
    const totalCount = await PageContent.countDocuments({});
    console.log(`📊 Total Pages in Database: ${totalCount}\n`);

    // Get all pages
    const pages = await PageContent.find({}).sort({ path: 1 }).select('path title published');
    
    if (pages.length === 0) {
      console.log('⚠️  No pages found in database!');
      return;
    }

    // Group by category
    const categories = {};
    pages.forEach(page => {
      const path = page.path.toLowerCase();
      let category = 'Autres';
      
      if (path === 'accueil' || path === 'home' || path === 'header' || path === 'footer') {
        category = 'Système';
      } else if (path.startsWith('fiscalite')) {
        category = 'Fiscalité';
      } else if (path.startsWith('immobilier')) {
        category = 'Immobilier';
      } else if (path.startsWith('placements')) {
        category = 'Placements';
      } else if (path.startsWith('retraite')) {
        category = 'Retraite';
      } else if (path.startsWith('patrimoine')) {
        category = 'Patrimoine';
      } else if (path.startsWith('outils') || path.startsWith('outils-financiers')) {
        category = 'Outils';
      } else if (path === 'qui-sommes-nous' || path === 'equipe') {
        category = 'Institutionnel';
      }
      
      if (!categories[category]) categories[category] = [];
      categories[category].push(page);
    });

    console.log('📁 Pages by Category:');
    console.log('='.repeat(80));
    Object.entries(categories).sort((a, b) => b[1].length - a[1].length).forEach(([cat, catPages]) => {
      console.log(`\n${cat}: ${catPages.length} pages`);
      catPages.forEach(p => {
        const status = p.published ? '✅' : '❌';
        console.log(`   ${status} /${p.path} - ${p.title}`);
      });
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n📊 Summary:`);
    console.log(`   Total: ${totalCount} pages`);
    console.log(`   Published: ${pages.filter(p => p.published).length} pages`);
    console.log(`   Draft: ${pages.filter(p => !p.published).length} pages`);
    console.log(`   Categories: ${Object.keys(categories).length} categories`);

    // Check for non-page entries
    const nonPages = pages.filter(p => {
      const path = p.path.toLowerCase();
      return path === 'header' || path === 'footer' || path.startsWith('component-');
    });

    if (nonPages.length > 0) {
      console.log(`\n⚠️  Non-page entries (${nonPages.length}):`);
      nonPages.forEach(p => console.log(`   - ${p.path}`));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

checkPagesCount();

