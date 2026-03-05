const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function checkContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const page = await PageContent.findOne({ path: 'patrimoine/succession-heritage' });
    
    if (!page) {
      console.log('❌ Page non trouvée');
      process.exit(1);
    }

    console.log('📄 Page trouvée:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Last Modified: ${page.lastModified}\n`);

    console.log('📋 Structure du contenu:');
    const content = page.content || {};
    
    console.log(`   - hero: ${content.hero ? '✅' : '❌'}`);
    if (content.hero) {
      console.log(`     - title: ${content.hero.title || '❌'}`);
      console.log(`     - description: ${content.hero.description ? '✅' : '❌'}`);
      console.log(`     - buttons: ${content.hero.buttons ? `✅ (${content.hero.buttons.length})` : '❌'}`);
    }
    
    console.log(`   - chart: ${content.chart ? '✅' : '❌'}`);
    if (content.chart) {
      console.log(`     - title: ${content.chart.title || '❌'}`);
      console.log(`     - data: ${content.chart.data ? `✅ (${content.chart.data.length} items)` : '❌'}`);
    }
    
    console.log(`   - definition: ${content.definition ? '✅' : '❌'}`);
    if (content.definition) {
      console.log(`     - title: ${content.definition.title || '❌'}`);
      console.log(`     - blocks: ${content.definition.blocks ? `✅ (${content.definition.blocks.length})` : '❌'}`);
    }
    
    console.log(`   - fiscalite: ${content.fiscalite ? '✅' : '❌'}`);
    if (content.fiscalite) {
      console.log(`     - title: ${content.fiscalite.title || '❌'}`);
      console.log(`     - tableRows: ${content.fiscalite.tableRows ? `✅ (${content.fiscalite.tableRows.length})` : '❌'}`);
    }
    
    console.log(`   - regime: ${content.regime ? '✅' : '❌'}`);
    if (content.regime) {
      console.log(`     - title: ${content.regime.title || '❌'}`);
      console.log(`     - items: ${content.regime.items ? `✅ (${content.regime.items.length})` : '❌'}`);
    }
    
    console.log(`   - optimisation: ${content.optimisation ? '✅' : '❌'}`);
    if (content.optimisation) {
      console.log(`     - title: ${content.optimisation.title || '❌'}`);
      console.log(`     - items: ${content.optimisation.items ? `✅ (${content.optimisation.items.length})` : '❌'}`);
    }
    
    console.log(`   - finalCta: ${content.finalCta ? '✅' : '❌'}`);
    if (content.finalCta) {
      console.log(`     - title: ${content.finalCta.title || '❌'}`);
      console.log(`     - buttons: ${content.finalCta.buttons ? `✅ (${content.finalCta.buttons.length})` : '❌'}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkContent();

