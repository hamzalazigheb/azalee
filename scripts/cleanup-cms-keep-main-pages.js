/**
 * Script pour nettoyer le CMS:
 * 1. Supprimer la section SEO de toutes les pages
 * 2. Garder uniquement les pages principales (pas les sous-pages)
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Pages principales à garder (6 pages)
const mainPagesToKeep = [
  'accueil',      // Homepage
  'fiscalite',    // Fiscalité
  'immobilier',   // Immobilier
  'placements',   // Placements
  'retraite',     // Retraite
  'patrimoine',   // Patrimoine
];

async function cleanupCMS() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    // Récupérer toutes les pages CMS
    const allPages = await collection.find({}).toArray();
    console.log(`📊 Pages actuelles: ${allPages.length}\n`);

    // 1. Supprimer la section SEO de toutes les pages
    console.log('🔄 Suppression de la section SEO de toutes les pages...');
    for (const page of allPages) {
      if (page.content && page.content.seo) {
        await collection.updateOne(
          { _id: page._id },
          { $unset: { 'content.seo': '' } }
        );
        console.log(`  ✅ SEO supprimé: ${page.path}`);
      }
    }

    // 2. Supprimer toutes les pages sauf les principales
    console.log('\n🗑️  Suppression des sous-pages...');
    
    const pagesToDelete = [];
    const pagesToKeep = [];

    for (const page of allPages) {
      if (mainPagesToKeep.includes(page.path)) {
        pagesToKeep.push(page.path);
      } else {
        pagesToDelete.push({ path: page.path, title: page.title });
      }
    }

    console.log('\n📋 PAGES À SUPPRIMER (' + pagesToDelete.length + '):');
    pagesToDelete.forEach(p => console.log(`  - ${p.path}`));
    
    console.log('\n✅ PAGES À GARDER (' + pagesToKeep.length + '):');
    pagesToKeep.forEach(p => console.log(`  - ${p}`));

    // Supprimer les pages
    for (const page of pagesToDelete) {
      await collection.deleteOne({ path: page.path });
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

