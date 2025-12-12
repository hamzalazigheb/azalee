// Script to add missing testimonial (Julien R.) to immobilier page
// Run with: node scripts/add-missing-testimonial-immobilier.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define PageContent schema
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

async function addMissingTestimonial() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const path = 'immobilier';
    const page = await PageContent.findOne({ path });
    
    if (!page) {
      console.log(`❌ Page with path "${path}" not found`);
      process.exit(1);
    }

    // Ensure section10 exists
    if (!page.content.section10) {
      page.content.section10 = {};
    }

    // Ensure testimonials array exists
    if (!page.content.section10.testimonials) {
      page.content.section10.testimonials = [];
    }

    // Check if Julien R. testimonial already exists
    const existingTestimonials = page.content.section10.testimonials || [];
    const julienExists = existingTestimonials.some(t => t.name === 'Julien R.');

    if (julienExists) {
      console.log('✅ Julien R. testimonial already exists');
    } else {
      // Add Julien R. testimonial
      const julienTestimonial = {
        name: "Julien R.",
        role: "42 ans, dirigeant à Nantes",
        text: "J'ai investi avec Azalée dans une SCPI Comète : <strong>transparence, rendement au rendez-vous</strong>, et un accompagnement complet sur la fiscalité.",
        rating: 5
      };

      page.content.section10.testimonials.push(julienTestimonial);
      page.lastModified = new Date();
      
      await page.save();
      console.log('✅ Added Julien R. testimonial to section10');
    }

    // Display current testimonials
    console.log('\n📋 Current testimonials:');
    page.content.section10.testimonials.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.name} - ${t.role}`);
    });

    console.log(`\n✅ Total testimonials: ${page.content.section10.testimonials.length}`);
    
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMissingTestimonial();

