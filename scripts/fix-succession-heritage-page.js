const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function fixPage() {
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

    // Mettre à jour la page pour qu'elle soit publiée
    // Et ajouter les champs manquants dans chart
    const updates = {
      published: true,
      lastModified: new Date()
    };

    if (page.content && page.content.chart) {
      if (!page.content.chart.title) {
        page.content.chart.title = "Indicateurs de succession";
      }
      if (!page.content.chart.image) {
        page.content.chart.image = "/images/azalee-patrimoine-succesion.webp";
      }
      updates.content = page.content;
    }

    await PageContent.findOneAndUpdate(
      { path: 'patrimoine/succession-heritage' },
      { $set: updates },
      { new: true }
    );

    console.log('✅ Page mise à jour:');
    console.log(`   - Publiée: Oui`);
    if (updates.content && updates.content.chart) {
      console.log(`   - chart.title: ${updates.content.chart.title}`);
      console.log(`   - chart.image: ${updates.content.chart.image}`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

fixPage();

