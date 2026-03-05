const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.production' });

// Import du modèle PageContent
const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Liste exacte des chemins de la navbar (copiée de src/app/admin/cms/page.jsx)
const navbarPaths = [
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
];

// Fonction pour générer un titre à partir du path
function generateTitle(path) {
  if (path === '/' || path === 'home' || path === 'accueil') return 'Accueil';
  
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  
  // Convertir kebab-case en titre
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Contenu minimal par défaut
const defaultContent = {
  hero: {
    title: "Titre de la page",
    subtitle: "Sous-titre de la page",
    description: "Description de la page"
  },
  seo: {
    metaTitle: "Page | Azalée Patrimoine",
    metaDescription: "Description de la page"
  }
};

async function initAllNavbarPages() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔌 Connexion à MongoDB...');
    console.log(`   URI: ${mongoUri.replace(/\/\/.*@/, '//***@')}`); // Masquer les credentials
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    let created = 0;
    let existing = 0;
    let errors = 0;
    const errorsList = [];

    for (const path of navbarPaths) {
      try {
        // Normaliser le path (home, accueil, / -> home)
        const normalizedPath = path === '/' || path === 'accueil' ? 'home' : path;
        
        const existingPage = await PageContent.findOne({ path: normalizedPath });
        
        if (existingPage) {
          console.log(`⏭️  Existe déjà: ${normalizedPath}`);
          existing++;
        } else {
          await PageContent.create({
            path: normalizedPath,
            title: generateTitle(normalizedPath),
            content: defaultContent,
            published: true,
            lastModified: new Date(),
            createdAt: new Date()
          });
          console.log(`✅ Créé: ${normalizedPath}`);
          created++;
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⏭️  Ignoré (doublon): ${path}`);
          existing++;
        } else {
          console.error(`❌ Erreur pour ${path}:`, error.message);
          errorsList.push({ path, error: error.message });
          errors++;
        }
      }
    }

    console.log(`\n✅ INITIALISATION TERMINÉE!`);
    console.log(`   Pages créées: ${created}`);
    console.log(`   Pages existantes: ${existing}`);
    console.log(`   Erreurs: ${errors}`);
    console.log(`   Total attendu: ${navbarPaths.length}`);
    console.log(`   Total dans la base: ${created + existing}`);

    if (errorsList.length > 0) {
      console.log(`\n⚠️  Erreurs détaillées:`);
      errorsList.forEach(({ path, error }) => {
        console.log(`   - ${path}: ${error}`);
      });
    }

    await mongoose.disconnect();
    console.log('\n✅ Déconnecté de MongoDB');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initAllNavbarPages();

