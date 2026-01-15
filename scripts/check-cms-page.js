const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function checkPage() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Find all pages with 'immobilier' in path
    const immobilierPages = await PageContent.find({ path: /immobilier/i });
    console.log('\n📋 Pages avec "immobilier" dans le path:');
    immobilierPages.forEach(page => {
      console.log(`   - ${page.path} (published: ${page.published})`);
    });

    // Find specific page
    const page = await PageContent.findOne({ path: 'immobilier/immobilier-neuf' });
    
    if (page) {
      console.log('\n✅ Page "immobilier/immobilier-neuf" trouvée:');
      console.log('   Path:', page.path);
      console.log('   Title:', page.title);
      console.log('   Published:', page.published);
      console.log('   LastModified:', page.lastModified);
      console.log('   Content sections:', Object.keys(page.content || {}));
      
      if (page.content && page.content.hero) {
        console.log('\n   Hero section:');
        console.log('   - title:', page.content.hero.title?.substring(0, 50) + '...');
        console.log('   - subtitle:', page.content.hero.subtitle?.substring(0, 50) + '...');
      }
    } else {
      console.log('\n❌ Page "immobilier/immobilier-neuf" NON trouvée!');
      
      // List all pages
      const allPages = await PageContent.find({});
      console.log('\n📋 Toutes les pages dans la base:');
      allPages.forEach(p => {
        console.log(`   - ${p.path}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkPage();


