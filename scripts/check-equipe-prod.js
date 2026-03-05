// Script to check if equipe page content exists in production MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function checkEquipe() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    console.log('📍 URI:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const page = await PageContent.findOne({ path: 'equipe' });
    
    if (!page) {
      console.log('❌ Page "equipe" NON TROUVÉE en production');
      console.log('\n💡 Solution: Exécuter le script d\'initialisation');
      console.log('   docker exec -it azalee-frontend node /app/scripts/init-all-missing-content-prod.js');
      process.exit(1);
    }

    console.log('✅ Page "equipe" trouvée:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published ? '✅ OUI' : '❌ NON'}`);
    console.log(`   - Last Modified: ${page.lastModified}\n`);

    if (!page.published) {
      console.log('⚠️  ATTENTION: La page n\'est pas publiée !');
      console.log('   Solution: Mettre published: true dans MongoDB\n');
    }

    const content = page.content || {};
    console.log('📋 Structure du contenu:');
    console.log(`   - hero: ${content.hero ? '✅' : '❌'}`);
    console.log(`   - team: ${content.team ? '✅' : '❌'}`);
    if (content.team) {
      console.log(`     - members: ${content.team.members ? `✅ (${content.team.members.length} membres)` : '❌'}`);
    }
    console.log(`   - expertise: ${content.expertise ? '✅' : '❌'}`);
    console.log(`   - cta: ${content.cta ? '✅' : '❌'}`);
    console.log(`   - seo: ${content.seo ? '✅' : '❌'}\n`);

    if (!content.hero || !content.team || !content.team.members || content.team.members.length === 0) {
      console.log('⚠️  ATTENTION: Contenu incomplet !');
      console.log('   Solution: Exécuter le script d\'initialisation\n');
    } else {
      console.log('✅ Contenu complet et valide !');
    }

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

checkEquipe();

