const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String }
}, { collection: 'pagecontents' });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function fixHeaderLogo() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const header = await PageContent.findOne({ path: 'header' });
    
    if (!header) {
      console.log('⚠️ Header non trouvé dans la base de données');
      await mongoose.disconnect();
      return;
    }

    if (!header.content) {
      header.content = {};
    }

    if (!header.content.logo) {
      header.content.logo = {};
    }

    // Mettre à jour le logo
    header.content.logo.src = '/images/azalee-patrimoine3.webp';
    header.content.logo.alt = 'Azalée Patrimoine Logo';
    header.lastModified = new Date();
    
    await header.save();
    console.log('✅ Logo mis à jour dans MongoDB');
    console.log('   - src:', header.content.logo.src);
    console.log('   - alt:', header.content.logo.alt);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

fixHeaderLogo();

