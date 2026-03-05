// Script to add teamPreview section to homepage CMS
// Run with: node scripts/add-teamPreview-to-cms.js

// Try .env.production first (for EC2), then .env.local (for local dev)
require('dotenv').config({ path: '.env.production' });
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection string - use MONGODB_URI from env, or default to localhost, or use Docker service name
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/azalee_db' || 'mongodb://localhost:27017/azalee_db';

// Define PageContent schema inline (CommonJS)
const PageContentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  published: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// teamPreview content structure
const teamPreviewContent = {
  title: "Rencontrez votre équipe de gestion",
  subtitle: "Des experts passionnés et certifiés, dédiés à la réussite de vos projets patrimoniaux.",
  members: [
    {
      name: "Jean-Marc Dupont",
      position: "Fondateur & Directeur",
      photo: "/images/azalee-patrimoine-jean.webp",
      experience: "20+ ans"
    },
    {
      name: "Sophie Martin",
      position: "Conseillère en Gestion de Patrimoine",
      photo: "/images/azalee-patrimoine-sophie.webp",
      experience: "15 ans"
    },
    {
      name: "Thomas Bernard",
      position: "Expert Fiscal",
      photo: "/images/azalee-patrimoine-client1.webp",
      experience: "12 ans"
    }
  ],
  buttonText: "En savoir plus sur notre équipe"
};

async function addTeamPreviewToCMS() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    try {
      // Find the homepage
      const homepage = await PageContent.findOne({ path: 'home' });
      
      if (!homepage) {
        console.log('❌ Homepage (path: "home") not found. Please run init-accueil-cms.js first.');
        await mongoose.disconnect();
        process.exit(1);
      }

      console.log('📝 Updating homepage with teamPreview section...');
      
      // Ensure content object exists
      if (!homepage.content) {
        homepage.content = {};
      }

      // Add or update teamPreview section
      homepage.content.teamPreview = teamPreviewContent;

      // Ensure sectionOrder includes teamPreview
      if (!homepage.content.sectionOrder) {
        homepage.content.sectionOrder = [
          'hero',
          'intro',
          'team',
          'teamPreview',
          'testimonials',
          'stats',
          'investment',
          'partners',
          'finalCta'
        ];
      } else if (!homepage.content.sectionOrder.includes('teamPreview')) {
        // Insert teamPreview after 'team' if present, otherwise after 'intro'
        const teamIndex = homepage.content.sectionOrder.indexOf('team');
        const introIndex = homepage.content.sectionOrder.indexOf('intro');
        
        if (teamIndex !== -1) {
          homepage.content.sectionOrder.splice(teamIndex + 1, 0, 'teamPreview');
        } else if (introIndex !== -1) {
          homepage.content.sectionOrder.splice(introIndex + 1, 0, 'teamPreview');
        } else {
          homepage.content.sectionOrder.push('teamPreview');
        }
      }

      homepage.lastModified = new Date();
      await homepage.save();
      
      console.log('✅ teamPreview section added to homepage successfully!');
      console.log('\n📋 Section structure:');
      console.log('   - title:', teamPreviewContent.title);
      console.log('   - subtitle:', teamPreviewContent.subtitle);
      console.log('   - members:', teamPreviewContent.members.length, 'members');
      console.log('   - buttonText:', teamPreviewContent.buttonText);
      console.log('\n✅ Section is now editable in CMS at /admin/cms (page: "home")');
      
    } catch (error) {
      console.error('❌ Error updating homepage:', error.message);
      console.error(error.stack);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

addTeamPreviewToCMS();

