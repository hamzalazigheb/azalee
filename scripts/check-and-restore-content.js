/**
 * Script pour vérifier et restaurer le contenu des sous-pages
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkAndRestore() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    // Récupérer toutes les pages
    const allPages = await collection.find({}).toArray();
    
    console.log('=== VÉRIFICATION CONTENU ===\n');
    
    let pagesWithContent = 0;
    let pagesWithoutContent = 0;
    const emptyPages = [];

    for (const page of allPages) {
      const hasContent = page.content && Object.keys(page.content).length > 0;
      
      if (hasContent) {
        pagesWithContent++;
      } else {
        pagesWithoutContent++;
        emptyPages.push(page.path);
      }
    }

    console.log(`✅ Pages avec contenu: ${pagesWithContent}`);
    console.log(`❌ Pages sans contenu: ${pagesWithoutContent}\n`);

    if (emptyPages.length > 0) {
      console.log('📋 Pages vides:');
      emptyPages.forEach(p => console.log(`  - ${p}`));
      
      console.log('\n💡 Les pages vides doivent être initialisées avec du contenu par défaut.');
      console.log('   Vous pouvez les éditer dans le CMS pour ajouter du contenu.');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkAndRestore();

