/**
 * Script pour s'assurer que toutes les entrées CMS ont published: true
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

async function main() {
  console.log('🔧 Correction des entrées CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Mettre à jour toutes les entrées sans published à true
    const result = await PageContent.updateMany(
      { $or: [{ published: { $exists: false } }, { published: null }] },
      { $set: { published: true } }
    );

    console.log(`📝 ${result.modifiedCount} entrées mises à jour avec published: true`);

    // Vérifier le nombre total d'entrées
    const totalCount = await PageContent.countDocuments();
    const publishedCount = await PageContent.countDocuments({ published: true });

    console.log(`\n📊 Total entrées CMS: ${totalCount}`);
    console.log(`✅ Entrées publiées: ${publishedCount}`);

    await mongoose.disconnect();
    console.log('\n✅ Déconnecté de MongoDB');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

