const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function checkPage() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const page = await PageContent.findOne({ path: 'patrimoine/donation-gratuite' });
    
    if (!page) {
      console.log('❌ Page "patrimoine/donation-gratuite" non trouvée dans MongoDB');
      console.log('📝 La page doit être créée avec du contenu initial');
    } else {
      console.log('✅ Page trouvée dans MongoDB');
      console.log(`   Titre: ${page.title || 'N/A'}`);
      console.log(`   Publiée: ${page.published ? 'Oui' : 'Non'}`);
      console.log(`   Dernière modification: ${page.lastModified || 'N/A'}`);
      
      if (page.content) {
        console.log('\n📋 Structure du contenu:');
        console.log(`   - hero: ${page.content.hero ? '✅' : '❌'}`);
        if (page.content.hero) {
          console.log(`     - title: ${page.content.hero.title ? '✅' : '❌'}`);
          console.log(`     - subtitle: ${page.content.hero.subtitle ? '✅' : '❌'}`);
        }
        console.log(`   - chart: ${page.content.chart ? '✅' : '❌'}`);
        console.log(`   - formes: ${page.content.formes ? '✅' : '❌'}`);
        console.log(`   - fiscalite: ${page.content.fiscalite ? '✅' : '❌'}`);
        console.log(`   - demembrement: ${page.content.demembrement ? '✅' : '❌'}`);
        console.log(`   - strategie: ${page.content.strategie ? '✅' : '❌'}`);
        console.log(`   - vision: ${page.content.vision ? '✅' : '❌'}`);
        console.log(`   - finalCta: ${page.content.finalCta ? '✅' : '❌'}`);
      } else {
        console.log('❌ Aucun contenu trouvé dans la page');
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkPage();

