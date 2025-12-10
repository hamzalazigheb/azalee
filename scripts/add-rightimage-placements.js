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

async function addRightImageToPlacements() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the placements page
    const page = await PageContent.findOne({ path: 'placements' });
    
    if (!page) {
      console.log('❌ Page "placements" not found. Creating it...');
      const newPage = new PageContent({
        path: 'placements',
        title: 'Placements',
        content: {
          hero: {
            h1: "Construire son patrimoine",
            introText: "Construire son patrimoine, c'est bien plus qu'investir. C'est donner du sens à son argent, structurer ses actifs avec méthode et préparer l'avenir de sa famille. Chez Azalée Patrimoine, nous vous accompagnons à chaque étape, en alliant performance, fiscalité optimisée et indépendance pour transformer votre patrimoine en levier de sérénité et de performance sur le long terme.",
            rightImage: "/images/place.webp"
          }
        },
        published: true
      });
      await newPage.save();
      console.log('✅ Created placements page with rightImage field');
    } else {
      // Update existing page
      if (!page.content) {
        page.content = {};
      }
      if (!page.content.hero) {
        page.content.hero = {};
      }
      
      // Add rightImage field if it doesn't exist
      if (!page.content.hero.rightImage) {
        page.content.hero.rightImage = "/images/place.webp";
        page.lastModified = new Date();
        await page.save();
        console.log('✅ Added rightImage field to hero section');
      } else {
        console.log('ℹ️  rightImage field already exists:', page.content.hero.rightImage);
      }
      
      // Optionally remove old fields (question, objectives) if they exist
      if (page.content.hero.question || page.content.hero.objectives) {
        console.log('ℹ️  Old fields (question, objectives) found. They can be removed manually from CMS if needed.');
      }
    }

    console.log('✅ Update completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addRightImageToPlacements();

