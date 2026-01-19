/**
 * Script pour vérifier si teamPreview existe dans le CMS
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function checkTeamSection() {
  console.log('🔍 Vérification de la section teamPreview...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Chercher la page home
    const possiblePaths = ['home', 'accueil', 'homepage', '/'];
    
    let page = null;
    for (const path of possiblePaths) {
      page = await PageContent.findOne({ path: path.toLowerCase() });
      if (page) {
        console.log(`✅ Page trouvée: ${page.path}\n`);
        break;
      }
    }

    if (!page) {
      console.log('❌ Aucune page d\'accueil trouvée dans MongoDB');
      console.log('   Exécutez: node scripts/init-team-section.js\n');
      await mongoose.disconnect();
      return;
    }

    // Vérifier si teamPreview existe
    if (page.content && page.content.teamPreview) {
      console.log('✅ Section teamPreview TROUVÉE dans MongoDB!\n');
      console.log('📋 Contenu:');
      console.log(JSON.stringify(page.content.teamPreview, null, 2));
      console.log('\n✅ La section devrait être visible dans le CMS');
      console.log('   URL: http://localhost:4028/admin/cms');
      console.log('   Page: ' + page.path);
    } else {
      console.log('❌ Section teamPreview NON TROUVÉE dans MongoDB\n');
      console.log('📋 Sections disponibles dans la page:');
      if (page.content) {
        Object.keys(page.content).forEach(key => {
          console.log(`   - ${key}`);
        });
      } else {
        console.log('   (aucune section)');
      }
      console.log('\n💡 Solution: Exécutez le script d\'initialisation');
      console.log('   node scripts/init-team-section.js\n');
    }

    await mongoose.disconnect();
    console.log('\n✅ Vérification terminée');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

checkTeamSection();

