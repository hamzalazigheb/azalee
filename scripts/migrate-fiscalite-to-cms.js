// Script to migrate Fiscalité pages from hardcoded content to CMS
// Run with: node scripts/migrate-fiscalite-to-cms.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define PageContent schema
const PageContentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  published: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// List of Fiscalité pages to migrate
const fiscalitePages = [
  'fiscalite/autre-fiscalite',
  'fiscalite/declaration-impots',
  'fiscalite/defiscalisation-cas-specifiques',
  'fiscalite/fiscalite-placements',
  'fiscalite/impot-sur-le-revenu',
  'fiscalite/loi-cosse',
  'fiscalite/loi-denormandie',
  'fiscalite/loi-girardin',
  'fiscalite/loi-malraux',
  'fiscalite/loi-pinel',
  'fiscalite/lois-fiscales',
  'fiscalite/monument-historique',
  'fiscalite/pfu',
  'fiscalite/reductions-impot-deficit-foncier',
  'fiscalite/tmi-prelevements-sociaux',
  'fiscalite/tranches-baremes-plafonds'
];

// Helper function to extract defaultContent from a file
function extractDefaultContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Try to find defaultContent object
    const defaultContentMatch = content.match(/const\s+defaultContent\s*=\s*(\{[\s\S]*?\});/);
    if (defaultContentMatch) {
      try {
        // Use eval to parse the object (safe in this context as it's our own code)
        const defaultContent = eval(`(${defaultContentMatch[1]})`);
        return defaultContent;
      } catch (e) {
        console.error(`  ⚠️  Could not parse defaultContent for ${filePath}:`, e.message);
        return null;
      }
    }
    
    // Try to find other content objects
    const contentMatch = content.match(/const\s+\w+Content\s*=\s*(\{[\s\S]{200,}?\});/);
    if (contentMatch) {
      try {
        const contentObj = eval(`(${contentMatch[1]})`);
        return contentObj;
      } catch (e) {
        console.error(`  ⚠️  Could not parse content object for ${filePath}:`, e.message);
        return null;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`  ❌ Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to generate title from path
function generateTitle(path) {
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function migrateFiscalitePages() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (const pagePath of fiscalitePages) {
      const filePath = path.join('src/app', `${pagePath}/page.jsx`);
      
      console.log(`\n📄 Processing: ${pagePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  File not found: ${filePath}`);
        skipped++;
        continue;
      }

      // Extract defaultContent
      const defaultContent = extractDefaultContent(filePath);
      
      if (!defaultContent) {
        console.log(`  ⚠️  Could not extract defaultContent, skipping...`);
        skipped++;
        continue;
      }

      // Check if page already exists in CMS
      const existing = await PageContent.findOne({ path: pagePath.toLowerCase() });
      
      if (existing) {
        console.log(`  ⏭️  Page already exists in CMS, skipping...`);
        skipped++;
        continue;
      }

      // Create CMS entry
      try {
        const pageContent = new PageContent({
          path: pagePath.toLowerCase(),
          title: generateTitle(pagePath),
          content: defaultContent,
          published: true,
          lastModified: new Date()
        });

        await pageContent.save();
        console.log(`  ✅ Created CMS entry for ${pagePath}`);
        migrated++;
      } catch (error) {
        if (error.code === 11000) {
          console.log(`  ⏭️  Page already exists (duplicate key), skipping...`);
          skipped++;
        } else {
          console.error(`  ❌ Error creating CMS entry:`, error.message);
          errors++;
        }
      }
    }

    console.log(`\n\n📊 MIGRATION SUMMARY:`);
    console.log(`✅ Migrated: ${migrated} pages`);
    console.log(`⏭️  Skipped: ${skipped} pages`);
    console.log(`❌ Errors: ${errors} pages`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

migrateFiscalitePages()
  .then(() => {
    console.log('\n✅ Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });

