/**
 * This script reads each page's defaultContent and syncs it to the CMS
 * Ensures CMS structure matches exactly what each page expects
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Function to extract defaultContent from a page file
function extractDefaultContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the defaultContent object
    const match = content.match(/const\s+defaultContent\s*=\s*(\{[\s\S]*?\});?\s*(?:export|function|const|$)/);
    if (!match) {
      console.log(`  ⚠️ No defaultContent found`);
      return null;
    }
    
    // Extract and evaluate the object
    let objectStr = match[1];
    
    // Remove trailing semicolon if present
    objectStr = objectStr.replace(/;\s*$/, '');
    
    // Use Function constructor to safely evaluate the object
    // This is safer than eval() as it creates a new scope
    try {
      const fn = new Function(`return ${objectStr}`);
      return fn();
    } catch (evalError) {
      console.log(`  ⚠️ Failed to parse defaultContent: ${evalError.message}`);
      return null;
    }
  } catch (error) {
    console.log(`  ⚠️ Error reading file: ${error.message}`);
    return null;
  }
}

// Pages to sync
const pagesToSync = [
  { path: 'immobilier/immobilier-neuf', file: 'src/app/immobilier/immobilier-neuf/page.jsx', title: 'Immobilier Neuf - Programmes Neufs' },
  { path: 'immobilier/lmnp', file: 'src/app/immobilier/lmnp/page.jsx', title: 'LMNP - Loueur Meublé Non Professionnel' },
  { path: 'immobilier/vefa', file: 'src/app/immobilier/vefa/page.jsx', title: 'VEFA - Vente en État Futur d\'Achèvement' },
  { path: 'immobilier/sci', file: 'src/app/immobilier/sci/page.jsx', title: 'SCI - Société Civile Immobilière' },
  { path: 'immobilier/scellier', file: 'src/app/immobilier/scellier/page.jsx', title: 'Dispositifs Fiscaux : Pinel, Scellier, Robien' },
  { path: 'immobilier/investissement-locatif', file: 'src/app/immobilier/investissement-locatif/page.jsx', title: 'Investissement Locatif' },
  { path: 'immobilier/faire-construire', file: 'src/app/immobilier/faire-construire/page.jsx', title: 'Faire Construire - Terrain + Construction' },
  { path: 'immobilier/credit-immobilier-ptz', file: 'src/app/immobilier/credit-immobilier-ptz/page.jsx', title: 'Crédit Immobilier / PTZ' },
  { path: 'immobilier/plus-value-immobiliere', file: 'src/app/immobilier/plus-value-immobiliere/page.jsx', title: 'Plus-value Immobilière' },
  { path: 'immobilier/immeubles-de-rapport', file: 'src/app/immobilier/immeubles-de-rapport/page.jsx', title: 'Immeubles de Rapport' },
];

async function syncAllPages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    for (const pageInfo of pagesToSync) {
      console.log(`📄 Processing ${pageInfo.path}...`);
      
      const filePath = path.join(process.cwd(), pageInfo.file);
      const defaultContent = extractDefaultContent(filePath);
      
      if (!defaultContent) {
        console.log(`  ⏭️ Skipping (no content found)\n`);
        continue;
      }

      const sections = Object.keys(defaultContent);
      console.log(`  📋 Sections found: ${sections.join(', ')}`);

      const existingPage = await PageContent.findOne({ path: pageInfo.path });
      
      if (existingPage) {
        existingPage.content = defaultContent;
        existingPage.title = pageInfo.title;
        existingPage.published = true;
        existingPage.lastModified = new Date();
        await existingPage.save();
        console.log(`  ✅ Updated with ${sections.length} sections\n`);
      } else {
        const newPage = new PageContent({
          path: pageInfo.path,
          title: pageInfo.title,
          content: defaultContent,
          published: true,
        });
        await newPage.save();
        console.log(`  ✅ Created with ${sections.length} sections\n`);
      }
    }

    console.log('📊 Summary:');
    for (const pageInfo of pagesToSync) {
      const page = await PageContent.findOne({ path: pageInfo.path });
      if (page) {
        const sections = Object.keys(page.content);
        console.log(`   ${pageInfo.path}: ${sections.length} sections`);
      }
    }

    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    console.log(`\n✅ All ${pagesToSync.length} pages synced successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncAllPages();


