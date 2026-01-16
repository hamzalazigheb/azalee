const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function checkPages() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const pages = [
      'fiscalite/tmi-prelevements-sociaux',
      'fiscalite/lois-fiscales'
    ];

    for (const pagePath of pages) {
      console.log(`\n📄 Vérification de "${pagePath}":`);
      const page = await PageContent.findOne({ path: pagePath });
      
      if (!page) {
        console.log('   ❌ Page non trouvée dans MongoDB');
      } else {
        console.log(`   ✅ Page trouvée`);
        console.log(`      Titre: ${page.title || 'N/A'}`);
        console.log(`      Publiée: ${page.published ? 'Oui' : 'Non'}`);
        
        if (page.content) {
          console.log(`      Contenu:`);
          console.log(`         - hero: ${page.content.hero ? '✅' : '❌'}`);
          if (page.content.hero) {
            console.log(`           - title: ${page.content.hero.title ? '✅' : '❌'}`);
            console.log(`           - subtitle: ${page.content.hero.subtitle ? '✅' : '❌'}`);
          }
          // Vérifier d'autres sections selon le type de page
          if (pagePath.includes('tmi')) {
            console.log(`         - definition: ${page.content.definition ? '✅' : '❌'}`);
            console.log(`         - baremes: ${page.content.baremes ? '✅' : '❌'}`);
          }
          if (pagePath.includes('lois-fiscales')) {
            console.log(`         - dispositifs: ${page.content.dispositifs ? '✅' : '❌'}`);
            console.log(`         - tabs: ${page.content.tabs ? '✅' : '❌'}`);
          }
        } else {
          console.log(`      ❌ Aucun contenu`);
        }
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkPages();

