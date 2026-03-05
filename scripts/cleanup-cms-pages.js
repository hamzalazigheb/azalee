/**
 * Script pour nettoyer les pages CMS en double ou obsolètes
 * Garde uniquement les pages qui correspondent aux fichiers réels
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Pages réelles dans le codebase (basé sur src/app/*/page.jsx)
const realPages = [
  // Homepage
  'accueil',
  
  // Pages principales
  'conditions-generales',
  'contact',
  'equipe',
  'espace-client',
  'mentions-legales',
  'nos-courtiers',
  'notre-approche',
  'qui-sommes-nous',
  
  // Fiscalité
  'fiscalite',
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
  'fiscalite/tranches-baremes-plafonds',
  
  // Immobilier
  'immobilier',
  'immobilier/credit-immobilier-ptz',
  'immobilier/faire-construire',
  'immobilier/immeubles-de-rapport',
  'immobilier/immobilier-neuf',
  'immobilier/investissement-immobilier-rentable',
  'immobilier/investissement-locatif',
  'immobilier/lmnp',
  'immobilier/lmnp-2025',
  'immobilier/plus-value-immobiliere',
  'immobilier/robien',
  'immobilier/scellier',
  'immobilier/sci',
  'immobilier/vefa',
  
  // Outils
  'outils/autres',
  'outils/calculatrice-impots',
  'outils/calculs-financiers',
  'outils/guides-pratiques',
  'outils/simulateur-investissement',
  'outils/simulations-generales',
  
  // Outils-financiers
  'outils-financiers',
  'outils-financiers/assurance-vie-vs-per',
  'outils-financiers/guide-defiscalisation',
  
  // Patrimoine
  'patrimoine',
  'patrimoine/autre',
  'patrimoine/bilan',
  'patrimoine/conseils',
  'patrimoine/donation-gratuite',
  'patrimoine/donation-onereuse',
  'patrimoine/protection-famille',
  'patrimoine/succession-heritage',
  'patrimoine/transmission',
  
  // Placements
  'placements',
  'placements/assurance-vie',
  'placements/assurance-vie-luxembourg',
  'placements/autres',
  'placements/bourse-actions',
  'placements/compte-titres',
  'placements/contrat-capitalisation',
  'placements/etf-produits-financiers',
  'placements/livret',
  'placements/pea-per',
  'placements/produits-structures',
  'placements/produits-structures/ambition-pharma-2026',
  'placements/produits-structures/athena-ia-robotique-2025',
  'placements/produits-structures/athena-luxe-2025',
  'placements/produits-structures/autocall-credit-agricole-2025',
  'placements/produits-structures/energie-degressive-2025',
  'placements/scpi-opci',
  'placements/taux-interets',
  
  // Retraite
  'retraite',
  'retraite/autre',
  'retraite/plan-retraite',
  'retraite/prevoyance-protection',
  'retraite/rachat-trimestres',
  'retraite/retraite-progressive',
  'retraite/simulation',
];

async function cleanupCMS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    // Récupérer toutes les pages CMS
    const allPages = await collection.find({}).toArray();
    console.log(`📊 Pages actuelles dans le CMS: ${allPages.length}\n`);

    // Identifier les pages à supprimer
    const pagesToDelete = [];
    const pagesToKeep = [];

    for (const page of allPages) {
      if (realPages.includes(page.path)) {
        pagesToKeep.push(page.path);
      } else {
        pagesToDelete.push({ path: page.path, title: page.title });
      }
    }

    console.log('🗑️  PAGES À SUPPRIMER (' + pagesToDelete.length + '):');
    console.log('─'.repeat(60));
    pagesToDelete.forEach(p => console.log(`  - ${p.path} | "${p.title}"`));
    
    console.log('\n✅ PAGES À GARDER (' + pagesToKeep.length + '):');
    console.log('─'.repeat(60));
    pagesToKeep.forEach(p => console.log(`  - ${p}`));

    // Supprimer les pages obsolètes
    console.log('\n\n🔄 Suppression en cours...');
    
    for (const page of pagesToDelete) {
      await collection.deleteOne({ path: page.path });
      console.log(`  ❌ Supprimé: ${page.path}`);
    }

    // Vérifier le résultat
    const remainingPages = await collection.countDocuments();
    console.log(`\n✅ NETTOYAGE TERMINÉ!`);
    console.log(`   Pages restantes: ${remainingPages}`);
    console.log(`   Pages supprimées: ${pagesToDelete.length}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

cleanupCMS();

