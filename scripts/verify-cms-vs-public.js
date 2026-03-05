/**
 * Script to verify CMS content vs public pages
 * Checks if pages have content in MongoDB and if public pages can fetch it
 */

const mongoose = require('mongoose');
const http = require('http');
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

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function verifyPages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const pages = [
      'immobilier/immobilier-neuf',
      'immobilier/lmnp',
      'immobilier/vefa',
      'immobilier/sci',
      'immobilier/scellier',
      'immobilier/investissement-locatif',
      'immobilier/faire-construire',
      'immobilier/credit-immobilier-ptz',
      'immobilier/plus-value-immobiliere',
      'immobilier/immeubles-de-rapport',
    ];

    const results = {
      cmsOnly: [],
      publicOnly: [],
      both: [],
      neither: []
    };

    console.log('📊 Verifying CMS content vs Public API...\n');

    for (const path of pages) {
      // Check CMS (MongoDB)
      const cmsPage = await PageContent.findOne({ path });
      const hasCMS = cmsPage && cmsPage.content && Object.keys(cmsPage.content).length > 0;
      
      // Check Public API
      let hasPublic = false;
      let publicSections = 0;
      try {
        const apiResponse = await fetchJSON(`http://localhost:4028/api/cms/content?path=${encodeURIComponent(path)}`);
        if (apiResponse.success && apiResponse.data) {
          hasPublic = true;
          publicSections = Object.keys(apiResponse.data).length;
        }
      } catch (error) {
        // API not available or error
      }

      const cmsSections = hasCMS ? Object.keys(cmsPage.content).length : 0;

      if (hasCMS && hasPublic) {
        results.both.push({ path, cmsSections, publicSections });
        console.log(`✅ ${path}`);
        console.log(`   CMS: ${cmsSections} sections | Public API: ${publicSections} sections`);
        if (cmsSections !== publicSections) {
          console.log(`   ⚠️  WARNING: Section count mismatch!`);
        }
      } else if (hasCMS && !hasPublic) {
        results.cmsOnly.push({ path, cmsSections });
        console.log(`⚠️  ${path}`);
        console.log(`   CMS: ${cmsSections} sections | Public API: ❌ Not available`);
      } else if (!hasCMS && hasPublic) {
        results.publicOnly.push({ path, publicSections });
        console.log(`⚠️  ${path}`);
        console.log(`   CMS: ❌ Not found | Public API: ${publicSections} sections`);
      } else {
        results.neither.push({ path });
        console.log(`❌ ${path}`);
        console.log(`   CMS: ❌ Not found | Public API: ❌ Not available`);
      }
      console.log('');
    }

    // Summary
    console.log('\n📈 Summary:');
    console.log(`   ✅ Both CMS and Public: ${results.both.length} pages`);
    console.log(`   ⚠️  CMS only: ${results.cmsOnly.length} pages`);
    console.log(`   ⚠️  Public only: ${results.publicOnly.length} pages`);
    console.log(`   ❌ Neither: ${results.neither.length} pages`);

    if (results.cmsOnly.length > 0) {
      console.log('\n⚠️  Pages in CMS but not accessible via Public API:');
      results.cmsOnly.forEach(p => console.log(`   - ${p.path} (${p.cmsSections} sections)`));
    }

    if (results.publicOnly.length > 0) {
      console.log('\n⚠️  Pages accessible via Public API but not in CMS:');
      results.publicOnly.forEach(p => console.log(`   - ${p.path} (${p.publicSections} sections)`));
    }

    if (results.neither.length > 0) {
      console.log('\n❌ Pages missing from both CMS and Public API:');
      results.neither.forEach(p => console.log(`   - ${p.path}`));
    }

    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    
    if (results.both.length === pages.length) {
      console.log('\n✅ All pages have content in both CMS and Public API!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some pages need attention.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyPages();


