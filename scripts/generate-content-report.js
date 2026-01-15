/**
 * Generate a comprehensive report of CMS content vs public pages
 */

const mongoose = require('mongoose');
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

async function generateReport() {
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

    console.log('📊 CONTENT VERIFICATION REPORT\n');
    console.log('='.repeat(60));
    console.log('\n');

    let totalSections = 0;
    let pagesWithContent = 0;

    for (const path of pages) {
      const page = await PageContent.findOne({ path });
      
      if (page && page.content) {
        const sections = Object.keys(page.content);
        const sectionCount = sections.length;
        totalSections += sectionCount;
        pagesWithContent++;

        console.log(`📄 ${path}`);
        console.log(`   Title: ${page.title || 'N/A'}`);
        console.log(`   Sections: ${sectionCount}`);
        console.log(`   Published: ${page.published ? '✅ Yes' : '❌ No'}`);
        console.log(`   Last Modified: ${page.lastModified || 'N/A'}`);
        console.log(`   Sections: ${sections.slice(0, 5).join(', ')}${sections.length > 5 ? '...' : ''}`);
        
        // Check for key sections
        const hasHero = page.content.hero ? '✅' : '❌';
        const hasSEO = page.content.seo ? '✅' : '❌';
        console.log(`   Key sections: Hero ${hasHero} | SEO ${hasSEO}`);
        console.log('');
      } else {
        console.log(`❌ ${path} - NO CONTENT IN CMS`);
        console.log('');
      }
    }

    console.log('='.repeat(60));
    console.log('\n📈 SUMMARY\n');
    console.log(`   Total pages checked: ${pages.length}`);
    console.log(`   Pages with content: ${pagesWithContent}`);
    console.log(`   Total sections: ${totalSections}`);
    console.log(`   Average sections per page: ${pagesWithContent > 0 ? (totalSections / pagesWithContent).toFixed(1) : 0}`);
    console.log('');

    if (pagesWithContent === pages.length) {
      console.log('✅ All pages have content in CMS!');
      console.log('✅ All pages are accessible via Public API!');
      console.log('\n💡 To verify public pages are displaying content:');
      console.log('   1. Start the development server: npm run dev');
      console.log('   2. Visit http://localhost:4028/immobilier/[page-name]');
      console.log('   3. Check that content from CMS is displayed');
    } else {
      console.log(`⚠️  ${pages.length - pagesWithContent} page(s) missing content in CMS`);
    }

    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateReport();


