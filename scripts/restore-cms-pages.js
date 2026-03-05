/**
 * Script pour restaurer toutes les pages CMS (sans section SEO)
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Toutes les pages réelles du site
const allPages = [
  // Homepage
  { path: 'accueil', title: 'Accueil - Azalée Patrimoine' },
  
  // Pages principales
  { path: 'conditions-generales', title: 'Conditions Générales' },
  { path: 'contact', title: 'Contact' },
  { path: 'equipe', title: 'Notre Équipe' },
  { path: 'espace-client', title: 'Espace Client' },
  { path: 'mentions-legales', title: 'Mentions Légales' },
  { path: 'nos-courtiers', title: 'Nos Courtiers' },
  { path: 'notre-approche', title: 'Notre Approche' },
  { path: 'qui-sommes-nous', title: 'Qui Sommes-Nous' },
  
  // Fiscalité
  { path: 'fiscalite', title: 'Fiscalité' },
  { path: 'fiscalite/autre-fiscalite', title: 'Autres Sujets Fiscaux' },
  { path: 'fiscalite/declaration-impots', title: 'Déclaration d\'Impôts' },
  { path: 'fiscalite/defiscalisation-cas-specifiques', title: 'Défiscalisation Cas Spécifiques' },
  { path: 'fiscalite/fiscalite-placements', title: 'Fiscalité des Placements' },
  { path: 'fiscalite/impot-sur-le-revenu', title: 'Impôt sur le Revenu' },
  { path: 'fiscalite/loi-cosse', title: 'Loi Cosse' },
  { path: 'fiscalite/loi-denormandie', title: 'Loi Denormandie' },
  { path: 'fiscalite/loi-girardin', title: 'Loi Girardin' },
  { path: 'fiscalite/loi-malraux', title: 'Loi Malraux' },
  { path: 'fiscalite/loi-pinel', title: 'Loi Pinel' },
  { path: 'fiscalite/lois-fiscales', title: 'Lois Fiscales' },
  { path: 'fiscalite/monument-historique', title: 'Monument Historique' },
  { path: 'fiscalite/pfu', title: 'PFU - Prélèvement Forfaitaire Unique' },
  { path: 'fiscalite/reductions-impot-deficit-foncier', title: 'Déficit Foncier' },
  { path: 'fiscalite/tmi-prelevements-sociaux', title: 'TMI et Prélèvements Sociaux' },
  { path: 'fiscalite/tranches-baremes-plafonds', title: 'Tranches, Barèmes et Plafonds' },
  
  // Immobilier
  { path: 'immobilier', title: 'Investissement Immobilier' },
  { path: 'immobilier/credit-immobilier-ptz', title: 'Crédit Immobilier et PTZ' },
  { path: 'immobilier/faire-construire', title: 'Faire Construire' },
  { path: 'immobilier/immeubles-de-rapport', title: 'Immeubles de Rapport' },
  { path: 'immobilier/immobilier-neuf', title: 'Immobilier Neuf' },
  { path: 'immobilier/investissement-immobilier-rentable', title: 'Investissement Immobilier Rentable' },
  { path: 'immobilier/investissement-locatif', title: 'Investissement Locatif' },
  { path: 'immobilier/lmnp', title: 'LMNP' },
  { path: 'immobilier/lmnp-2025', title: 'LMNP 2025' },
  { path: 'immobilier/plus-value-immobiliere', title: 'Plus-Value Immobilière' },
  { path: 'immobilier/robien', title: 'Loi Robien' },
  { path: 'immobilier/scellier', title: 'Dispositif Scellier' },
  { path: 'immobilier/sci', title: 'SCI' },
  { path: 'immobilier/vefa', title: 'VEFA' },
  
  // Outils
  { path: 'outils/autres', title: 'Autres Outils' },
  { path: 'outils/calculatrice-impots', title: 'Calculatrice d\'Impôts' },
  { path: 'outils/calculs-financiers', title: 'Calculs Financiers' },
  { path: 'outils/guides-pratiques', title: 'Guides Pratiques' },
  { path: 'outils/simulateur-investissement', title: 'Simulateur d\'Investissement' },
  { path: 'outils/simulations-generales', title: 'Simulations Générales' },
  
  // Outils-financiers
  { path: 'outils-financiers', title: 'Outils Financiers' },
  { path: 'outils-financiers/assurance-vie-vs-per', title: 'Assurance-Vie vs PER' },
  { path: 'outils-financiers/guide-defiscalisation', title: 'Guide de la Défiscalisation' },
  
  // Patrimoine
  { path: 'patrimoine', title: 'Patrimoine' },
  { path: 'patrimoine/autre', title: 'Autres Solutions Patrimoniales' },
  { path: 'patrimoine/bilan', title: 'Bilan Patrimonial' },
  { path: 'patrimoine/conseils', title: 'Conseils Patrimoniaux' },
  { path: 'patrimoine/donation-gratuite', title: 'Donation à Titre Gratuit' },
  { path: 'patrimoine/donation-onereuse', title: 'Donation à Titre Onéreux' },
  { path: 'patrimoine/protection-famille', title: 'Protection de la Famille' },
  { path: 'patrimoine/succession-heritage', title: 'Succession et Héritage' },
  { path: 'patrimoine/transmission', title: 'Transmission de Patrimoine' },
  
  // Placements
  { path: 'placements', title: 'Placements' },
  { path: 'placements/assurance-vie', title: 'Assurance-Vie' },
  { path: 'placements/assurance-vie-luxembourg', title: 'Assurance-Vie Luxembourg' },
  { path: 'placements/autres', title: 'Autres Placements' },
  { path: 'placements/bourse-actions', title: 'Bourse et Actions' },
  { path: 'placements/compte-titres', title: 'Compte-Titres' },
  { path: 'placements/contrat-capitalisation', title: 'Contrat de Capitalisation' },
  { path: 'placements/etf-produits-financiers', title: 'ETF et Produits Financiers' },
  { path: 'placements/livret', title: 'Livrets Réglementés' },
  { path: 'placements/pea-per', title: 'PEA et PER' },
  { path: 'placements/produits-structures', title: 'Produits Structurés' },
  { path: 'placements/produits-structures/ambition-pharma-2026', title: 'Ambition Pharma 2026' },
  { path: 'placements/produits-structures/athena-ia-robotique-2025', title: 'Athena IA Robotique 2025' },
  { path: 'placements/produits-structures/athena-luxe-2025', title: 'Athena Luxe 2025' },
  { path: 'placements/produits-structures/autocall-credit-agricole-2025', title: 'Autocall Crédit Agricole 2025' },
  { path: 'placements/produits-structures/energie-degressive-2025', title: 'Énergie Dégressive 2025' },
  { path: 'placements/scpi-opci', title: 'SCPI et OPCI' },
  { path: 'placements/taux-interets', title: 'Taux et Intérêts' },
  
  // Retraite
  { path: 'retraite', title: 'Retraite' },
  { path: 'retraite/autre', title: 'Autres Solutions Retraite' },
  { path: 'retraite/plan-retraite', title: 'Plans d\'Épargne Retraite' },
  { path: 'retraite/prevoyance-protection', title: 'Prévoyance et Protection' },
  { path: 'retraite/rachat-trimestres', title: 'Rachat de Trimestres' },
  { path: 'retraite/retraite-progressive', title: 'Retraite Progressive' },
  { path: 'retraite/simulation', title: 'Simulation Retraite' },
];

async function restorePages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    // Récupérer les pages existantes
    const existingPages = await collection.find({}).toArray();
    const existingPaths = existingPages.map(p => p.path);
    console.log(`📊 Pages existantes: ${existingPages.length}\n`);

    let created = 0;
    let skipped = 0;

    for (const page of allPages) {
      if (existingPaths.includes(page.path)) {
        console.log(`  ⏭️  Existe déjà: ${page.path}`);
        skipped++;
      } else {
        await collection.insertOne({
          path: page.path,
          title: page.title,
          status: 'published',
          content: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`  ✅ Créé: ${page.path}`);
        created++;
      }
    }

    const totalPages = await collection.countDocuments();
    console.log(`\n✅ RESTAURATION TERMINÉE!`);
    console.log(`   Pages créées: ${created}`);
    console.log(`   Pages existantes: ${skipped}`);
    console.log(`   Total pages: ${totalPages}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

restorePages();

