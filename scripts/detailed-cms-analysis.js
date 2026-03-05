// Detailed analysis of CMS pages
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function detailedAnalysis() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    const pages = await PageContent.find({}).sort({ path: 1 }).select('path title published');
    
    console.log(`📋 Total CMS Pages: ${pages.length}\n`);
    
    // Check for outils vs outils-financiers
    const outilsPages = pages.filter(p => p.path.startsWith('outils/'));
    const outilsFinanciersPages = pages.filter(p => p.path.startsWith('outils-financiers/'));
    
    console.log(`📁 Outils: ${outilsPages.length} pages`);
    outilsPages.forEach(p => console.log(`   - ${p.path}`));
    
    console.log(`\n📁 Outils-financiers: ${outilsFinanciersPages.length} pages`);
    outilsFinanciersPages.forEach(p => console.log(`   - ${p.path}`));
    
    // List all pages by category
    const categories = {};
    pages.forEach(page => {
      const parts = page.path.split('/');
      const category = parts[0] || 'root';
      if (!categories[category]) categories[category] = [];
      categories[category].push(page);
    });
    
    console.log('\n📁 All Categories with page count:');
    Object.entries(categories).sort((a, b) => b[1].length - a[1].length).forEach(([cat, catPages]) => {
      console.log(`\n${cat}: ${catPages.length} pages`);
      catPages.forEach(p => {
        console.log(`   - ${p.path} (${p.title})`);
      });
    });
    
    // Check if we have more pages than expected
    // Expected: main pages + subpages (not 122)
    const mainCategories = ['fiscalite', 'immobilier', 'placements', 'retraite', 'patrimoine', 'outils'];
    const mainPagesCount = mainCategories.length;
    const subPagesCount = pages.length - mainPagesCount - 8; // 8 = other pages (accueil, equipe, etc.)
    
    console.log('\n' + '='.repeat(80));
    console.log(`📊 BREAKDOWN:`);
    console.log(`   Main category pages: ${mainPagesCount}`);
    console.log(`   Sub-pages: ${subPagesCount}`);
    console.log(`   Other pages: ${pages.length - mainPagesCount - subPagesCount}`);
    console.log(`   Total: ${pages.length}`);
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

detailedAnalysis();

