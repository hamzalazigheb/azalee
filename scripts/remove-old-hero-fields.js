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

async function removeOldHeroFields() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const page = await PageContent.findOne({ path: 'placements' });
    
    if (!page) {
      console.log('❌ Page "placements" not found');
      process.exit(1);
    }

    // Remove question and objectives fields from hero section
    if (page.content && page.content.hero) {
      delete page.content.hero.question;
      delete page.content.hero.objectives;
      
      page.lastModified = new Date();
      await page.save();
      
      console.log('✅ Removed "question" and "objectives" fields from hero section');
    }
    
    // Also use updateOne to ensure the fields are removed
    await PageContent.updateOne(
      { path: 'placements' },
      { 
        $unset: { 
          'content.hero.question': '',
          'content.hero.objectives': ''
        },
        $set: {
          lastModified: new Date()
        }
      }
    );
    
    // Verify
    const updatedPage = await PageContent.findOne({ path: 'placements' });
    console.log('✅ Verification - Hero fields:', Object.keys(updatedPage.content.hero));
    console.log('✅ Remaining fields:', updatedPage.content.hero);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removeOldHeroFields();

