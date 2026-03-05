/**
 * Script pour initialiser les pages sans defaultContent avec un contenu minimal
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Contenu minimal par défaut
const minimalContent = {
  hero: {
    title: "Titre de la page",
    description: "Description de la page"
  },
  introduction: {
    title: "Introduction",
    content: "Contenu à compléter"
  },
  cta: {
    title: "Besoin de conseils ?",
    description: "Nos experts sont à votre disposition",
    buttonText: "Prendre rendez-vous"
  }
};

// Pages à initialiser avec contenu minimal
const pagesToInit = [
  'conditions-generales',
  'contact',
  'equipe',
  'espace-client',
  'mentions-legales',
  'nos-courtiers',
  'notre-approche',
  'qui-sommes-nous',
  'fiscalite/declaration-impots',
  'fiscalite/lois-fiscales',
  'fiscalite/tmi-prelevements-sociaux',
  'fiscalite/tranches-baremes-plafonds',
  'immobilier/lmnp-2025',
  'immobilier/robien',
  'outils/autres',
  'outils/calculatrice-impots',
  'outils/calculs-financiers',
  'outils/guides-pratiques',
  'outils/simulateur-investissement',
  'outils/simulations-generales',
  'outils-financiers/assurance-vie-vs-per',
  'outils-financiers/guide-defiscalisation',
  'patrimoine/bilan',
  'placements/bourse-actions',
  'placements/contrat-capitalisation',
  'placements/etf-produits-financiers',
  'placements/pea-per',
  'placements/produits-structures/ambition-pharma-2026',
  'placements/produits-structures/athena-ia-robotique-2025',
  'placements/produits-structures/athena-luxe-2025',
  'placements/produits-structures/autocall-credit-agricole-2025',
  'placements/produits-structures/energie-degressive-2025',
  'placements/scpi-opci',
  'placements/taux-interets',
];

async function initMinimalContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    let initialized = 0;
    let skipped = 0;

    for (const pagePath of pagesToInit) {
      const page = await collection.findOne({ path: pagePath });
      
      if (!page) {
        console.log(`  ⚠️  Page non trouvée: ${pagePath}`);
        skipped++;
        continue;
      }

      // Vérifier si la page est vide
      const hasContent = page.content && Object.keys(page.content).length > 0;
      
      if (hasContent) {
        console.log(`  ⏭️  Déjà du contenu: ${pagePath}`);
        skipped++;
        continue;
      }

      // Initialiser avec contenu minimal
      await collection.updateOne(
        { _id: page._id },
        { 
          $set: { 
            content: minimalContent,
            updatedAt: new Date()
          } 
        }
      );

      console.log(`  ✅ Initialisé: ${pagePath}`);
      initialized++;
    }

    console.log(`\n✅ INITIALISATION TERMINÉE!`);
    console.log(`   Pages initialisées: ${initialized}`);
    console.log(`   Pages ignorées: ${skipped}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initMinimalContent();

