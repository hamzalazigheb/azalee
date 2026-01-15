// Check the exact structure of quickStats in MongoDB
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function checkStructure() {
  try {
    await mongoose.connect(MONGODB_URI);
    const page = await PageContent.findOne({ path: 'fiscalite/declaration-impots' });
    
    if (!page) {
      console.log('❌ Page not found');
      return;
    }

    console.log('📦 QuickStats structure:');
    console.log(JSON.stringify(page.content.quickStats, null, 2));
    
    console.log('\n📦 TabContent.general structure:');
    console.log(JSON.stringify(page.content.tabContent?.general, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkStructure()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

