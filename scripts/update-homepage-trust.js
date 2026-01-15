// Script to update homepage with trust sections (teamPreview & testimonials)
// Run with: node scripts/update-homepage-trust.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

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

// Trust sections to add to homepage
const trustSections = {
  teamPreview: {
    title: "Rencontrez votre équipe de gestion",
    subtitle: "Des experts passionnés et certifiés, dédiés à la réussite de vos projets patrimoniaux.",
    members: [
      {
        name: "Jean-Marc Dupont",
        position: "Fondateur & Directeur",
        photo: "/images/jean.webp",
        experience: "20+ ans"
      },
      {
        name: "Sophie Martin",
        position: "Conseillère en Gestion de Patrimoine",
        photo: "/images/sophie.webp",
        experience: "15 ans"
      },
      {
        name: "Thomas Bernard",
        position: "Expert Fiscal",
        photo: "/images/client1.webp",
        experience: "12 ans"
      }
    ],
    buttonText: "En savoir plus sur notre équipe"
  },
  testimonials: {
    title: "Ce que disent nos clients",
    subtitle: "La confiance de nos clients est notre plus grande fierté. Découvrez leurs témoignages.",
    items: [
      {
        text: "Grâce à Azalée Patrimoine, j'ai optimisé mon investissement locatif tout en réduisant mon impôt sur le revenu. Leur accompagnement va bien au-delà du simple conseil financier.",
        author: "Laurent D.",
        situation: "Chef d'entreprise, Lyon",
        rating: 5
      },
      {
        text: "Un accompagnement exceptionnel pour notre projet de transmission familiale. L'équipe a su comprendre nos enjeux et nous proposer des solutions adaptées.",
        author: "Marie-Claire P.",
        situation: "Retraitée, Paris",
        rating: 5
      },
      {
        text: "J'avais un projet LMNP, ils m'ont aidée à le rendre rentable, sécurisé et transmissible. Une équipe à l'écoute et très professionnelle.",
        author: "Sophie B.",
        situation: "Cadre supérieure, Nantes",
        rating: 5
      },
      {
        text: "Enfin un cabinet qui prend le temps d'expliquer et de nous accompagner sur le long terme. Je recommande vivement leurs services.",
        author: "Philippe M.",
        situation: "Médecin libéral, Marseille",
        rating: 5
      }
    ]
  }
};

// Helper function for deep merge
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key]) && !Array.isArray(source[key])) {
        if (!(key in target) || !isObject(target[key])) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

async function updateHomepageTrust() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find homepage content
    const homepage = await PageContent.findOne({ path: 'accueil' });
    
    if (!homepage) {
      console.log('⚠️ Homepage not found in CMS, creating with trust sections...');
      await PageContent.create({
        path: 'accueil',
        title: 'Accueil - Azalée Patrimoine',
        content: trustSections,
        published: true
      });
      console.log('✅ Homepage created with trust sections');
    } else {
      console.log('📄 Homepage found, merging trust sections...');
      
      // Deep merge existing content with trust sections
      const mergedContent = deepMerge(homepage.content || {}, trustSections);
      
      // Update section order if it exists
      if (mergedContent.sectionOrder && Array.isArray(mergedContent.sectionOrder)) {
        // Add teamPreview and testimonials after 'team' if not already present
        if (!mergedContent.sectionOrder.includes('teamPreview')) {
          const teamIndex = mergedContent.sectionOrder.indexOf('team');
          if (teamIndex !== -1) {
            mergedContent.sectionOrder.splice(teamIndex + 1, 0, 'teamPreview', 'testimonials');
          } else {
            mergedContent.sectionOrder.push('teamPreview', 'testimonials');
          }
        }
      }
      
      await PageContent.updateOne(
        { path: 'accueil' },
        { 
          $set: { 
            content: mergedContent,
            lastModified: new Date()
          } 
        }
      );
      console.log('✅ Homepage updated with trust sections');
    }

    console.log('\n📋 Added sections:');
    console.log('- teamPreview: 3 team member previews with photos');
    console.log('- testimonials: 4 client testimonials with ratings');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

updateHomepageTrust()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

