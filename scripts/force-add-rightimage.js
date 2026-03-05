const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function forceAddRightImage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const page = await PageContent.findOne({ path: 'placements' });
    
    if (!page) {
      console.log('❌ Page "placements" not found');
      process.exit(1);
    }

    // Force update - ensure hero section exists
    if (!page.content) {
      page.content = {};
    }
    if (!page.content.hero) {
      page.content.hero = {};
    }
    
    // Force add rightImage field
    page.content.hero.rightImage = "/images/place.webp";
    page.lastModified = new Date();
    
    // Use updateOne to ensure the change is saved
    await PageContent.updateOne(
      { path: 'placements' },
      { 
        $set: { 
          'content.hero.rightImage': '/images/place.webp',
          lastModified: new Date()
        } 
      }
    );
    
    console.log('✅ Force added rightImage field to hero section');
    
    // Verify
    const updatedPage = await PageContent.findOne({ path: 'placements' });
    console.log('✅ Verification - Hero fields:', Object.keys(updatedPage.content.hero));
    console.log('✅ Verification - rightImage value:', updatedPage.content.hero.rightImage);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

forceAddRightImage();

