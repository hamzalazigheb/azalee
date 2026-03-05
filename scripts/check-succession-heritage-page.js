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
    
    const page = await PageContent.findOne({ path: 'patrimoine/succession-heritage' });
    
    if (!page) {
      console.log('❌ Page "patrimoine/succession-heritage" non trouvée dans MongoDB');
      console.log('📝 La page doit être créée avec du contenu initial');
    } else {
      console.log('✅ Page trouvée dans MongoDB');
      console.log(`   Titre: ${page.title || 'N/A'}`);
      console.log(`   Publiée: ${page.published ? 'Oui' : 'Non'}`);
      console.log(`   Dernière modification: ${page.lastModified || 'N/A'}`);
      
      if (page.content) {
        console.log('\n📋 Structure du contenu:');
        console.log(`   - hero: ${page.content.hero ? '✅' : '❌'}`);
        console.log(`   - chart: ${page.content.chart ? '✅' : '❌'}`);
        if (page.content.chart) {
          console.log(`     - title: ${page.content.chart.title ? '✅' : '❌'}`);
          console.log(`     - data: ${page.content.chart.data && Array.isArray(page.content.chart.data) ? `✅ (${page.content.chart.data.length} items)` : '❌'}`);
          console.log(`     - image: ${page.content.chart.image ? '✅' : '❌'}`);
        }
        console.log(`   - definition: ${page.content.definition ? '✅' : '❌'}`);
        console.log(`   - fiscalite: ${page.content.fiscalite ? '✅' : '❌'}`);
        console.log(`   - regime: ${page.content.regime ? '✅' : '❌'}`);
        console.log(`   - optimisation: ${page.content.optimisation ? '✅' : '❌'}`);
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

