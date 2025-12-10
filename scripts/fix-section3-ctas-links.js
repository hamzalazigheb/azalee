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

async function fixSection3CTAs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const page = await PageContent.findOne({ path: 'placements' });
    
    if (!page) {
      console.log('❌ Page "placements" not found');
      process.exit(1);
    }

    // Ensure section3 exists
    if (!page.content) {
      page.content = {};
    }
    if (!page.content.section3) {
      page.content.section3 = {};
    }
    
    // Fix CTAs links - replace any wrong Calendly links with the correct one
    if (page.content.section3.ctas && Array.isArray(page.content.section3.ctas)) {
      page.content.section3.ctas = page.content.section3.ctas.map(cta => {
        if (cta.link) {
          // Replace wrong Calendly links
          if (cta.link.includes('contact-azalee-patrimoine') || 
              cta.link.includes('calendly.com') && !cta.link.includes('rdv-azalee-patrimoine/30min')) {
            cta.link = 'https://calendly.com/rdv-azalee-patrimoine/30min';
            console.log(`✅ Fixed CTA link for: "${cta.text}"`);
          }
        }
        return cta;
      });
    }
    
    // Fix conclusion CTAs links
    if (page.content.section3.conclusion && page.content.section3.conclusion.ctas && 
        Array.isArray(page.content.section3.conclusion.ctas)) {
      page.content.section3.conclusion.ctas = page.content.section3.conclusion.ctas.map(cta => {
        if (cta.link) {
          // Replace wrong Calendly links
          if (cta.link.includes('contact-azalee-patrimoine') || 
              cta.link.includes('calendly.com') && !cta.link.includes('rdv-azalee-patrimoine/30min')) {
            cta.link = 'https://calendly.com/rdv-azalee-patrimoine/30min';
            console.log(`✅ Fixed conclusion CTA link for: "${cta.text}"`);
          }
        }
        return cta;
      });
    }
    
    page.lastModified = new Date();
    await page.save();
    
    console.log('✅ Section3 CTAs links fixed');
    console.log('✅ Updated CTAs:', JSON.stringify(page.content.section3.ctas, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixSection3CTAs();

