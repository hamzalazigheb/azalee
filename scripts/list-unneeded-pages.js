// List all unneeded CMS pages (pages not in navigation)
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

// Liste exacte des chemins présents dans la navigation (Navbar)
const navbarPaths = new Set([
  'accueil', 'home', '/',
  // Fiscalité
  'fiscalite', 'fiscalite/impot-sur-le-revenu', 'fiscalite/declaration-impots', 'fiscalite/tranches-baremes-plafonds', 'fiscalite/lois-fiscales',
  'fiscalite/loi-pinel', 'fiscalite/loi-girardin', 'fiscalite/loi-denormandie', 'fiscalite/loi-malraux', 'fiscalite/loi-cosse',
  'fiscalite/monument-historique', 'fiscalite/reductions-impot-deficit-foncier', 'fiscalite/fiscalite-placements', 'fiscalite/pfu',
  'fiscalite/tmi-prelevements-sociaux', 'fiscalite/defiscalisation-cas-specifiques', 'fiscalite/autre-fiscalite',
  // Immobilier
  'immobilier', 'immobilier/immobilier-neuf', 'immobilier/vefa', 'immobilier/scellier', 'immobilier/faire-construire',
  'immobilier/investissement-locatif', 'immobilier/sci', 'immobilier/credit-immobilier-ptz', 'immobilier/plus-value-immobiliere',
  'immobilier/lmnp', 'immobilier/immeubles-de-rapport',
  // Placements
  'placements', 'placements/assurance-vie', 'placements/assurance-vie-luxembourg', 'placements/compte-titres',
  'placements/contrat-capitalisation', 'placements/livret', 'placements/bourse-actions', 'placements/scpi-opci',
  'placements/pea-per', 'placements/taux-interets', 'placements/etf-produits-financiers', 'placements/autres',
  // Retraite
  'retraite', 'retraite/plan-retraite', 'retraite/rachat-trimestres', 'retraite/simulation', 'retraite/prevoyance-protection',
  'retraite/retraite-progressive', 'retraite/autre',
  // Patrimoine
  'patrimoine', 'patrimoine/succession-heritage', 'patrimoine/donation-gratuite', 'patrimoine/donation-onereuse',
  'patrimoine/transmission', 'patrimoine/protection-famille', 'patrimoine/bilan', 'patrimoine/conseils', 'patrimoine/autre',
  // Outils
  'outils-financiers', 'outils-financiers/guide-defiscalisation', 'outils/calculatrice-impots', 'outils/calculs-financiers',
  'outils-financiers/assurance-vie-vs-per', 'outils/simulateur-investissement', 'outils/guides-pratiques',
  // Institutionnel
  'qui-sommes-nous', 'equipe', 'notre-approche', 'contact',
  // Blog et Ressources
  'blog', 'ressources'
]);

async function listUnneededPages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    console.log('📍 URI:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    const allPages = await PageContent.find({}).sort({ path: 1 }).select('path title published lastModified');
    
    console.log(`📋 Total Pages in MongoDB: ${allPages.length}\n`);
    
    // Filter pages that are NOT in navigation
    const unneededPages = [];
    const neededPages = [];
    
    allPages.forEach(page => {
      if (!page.path) {
        unneededPages.push({ ...page.toObject(), reason: 'No path' });
        return;
      }
      
      const rawPath = page.path.toLowerCase().replace(/^\//, '');
      const path = rawPath === '' ? '/' : rawPath;
      
      // Check if page is in navigation
      const isInNav = navbarPaths.has(path) || navbarPaths.has(rawPath);
      
      // Also check if it's a sub-page of a valid category (e.g., retraite/autre)
      const pathParts = path.split('/');
      const mainCategory = pathParts[0];
      const isSubPage = pathParts.length > 1 && navbarPaths.has(mainCategory);
      
      // Special case: check if it's a valid sub-page pattern
      const isValidSubPage = pathParts.length > 1 && (
        navbarPaths.has(path) || // Exact match
        navbarPaths.has(mainCategory) // Main category exists
      );
      
      if (!isInNav && !isValidSubPage) {
        unneededPages.push({ ...page.toObject(), reason: 'Not in navigation' });
      } else {
        neededPages.push(page.path);
      }
    });
    
    console.log('='.repeat(80));
    console.log(`✅ NEEDED PAGES: ${neededPages.length}`);
    console.log(`❌ UNNEEDED PAGES: ${unneededPages.length}`);
    console.log('='.repeat(80));
    
    if (unneededPages.length > 0) {
      console.log('\n❌ UNNEEDED PAGES (to delete):\n');
      unneededPages.forEach((page, index) => {
        const status = page.published ? '✅' : '❌';
        const date = page.lastModified ? new Date(page.lastModified).toLocaleDateString('fr-FR') : 'N/A';
        console.log(`${(index + 1).toString().padStart(3)}. ${status} /${page.path}`);
        console.log(`     Title: ${page.title}`);
        console.log(`     Reason: ${page.reason}`);
        console.log(`     Last Modified: ${date}`);
        console.log('');
      });
      
      // Group by category
      const categories = {};
      unneededPages.forEach(page => {
        const category = (page.path && page.path.split('/')[0]) || 'root';
        if (!categories[category]) categories[category] = [];
        categories[category].push(page.path || 'null');
      });
      
      console.log('\n📁 Unneeded Pages by Category:');
      Object.entries(categories).sort((a, b) => b[1].length - a[1].length).forEach(([cat, paths]) => {
        console.log(`   ${cat}: ${paths.length} pages`);
        paths.forEach(path => console.log(`      - ${path}`));
      });
      
      console.log('\n💾 To delete all unneeded pages, run:');
      console.log('   node scripts/delete-unneeded-pages.js');
    } else {
      console.log('\n✅ No unneeded pages found! All pages are in navigation.');
    }
    
    console.log('\n' + '='.repeat(80));
    console.log(`\n📊 Summary:`);
    console.log(`   Total pages: ${allPages.length}`);
    console.log(`   Needed pages: ${neededPages.length}`);
    console.log(`   Unneeded pages: ${unneededPages.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

listUnneededPages();

