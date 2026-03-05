// Script to initialize the ressources page in CMS
// Run with: node scripts/init-ressources-cms.js

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

// Default content structure for ressources page
const ressourcesContent = {
  path: 'ressources',
  title: 'Ressources & Guides',
  content: {
    hero: {
      title: "Ressources & Guides",
      subtitle: "Téléchargez gratuitement nos guides experts pour maîtriser la gestion de votre patrimoine et optimiser votre fiscalité."
    },
    guides: [
      {
        id: 1,
        title: 'Guide Complet de la Gestion de Patrimoine',
        description: 'Tout ce que vous devez savoir pour organiser, optimiser et transmettre votre patrimoine. Un guide de 45 pages rédigé par nos experts.',
        category: 'Patrimoine',
        pages: 45,
        icon: '📊',
        color: 'from-[#253F60] to-[#1a2d47]',
        featured: true,
        pdfUrl: ''
      },
      {
        id: 2,
        title: 'Optimisation Fiscale 2025',
        description: 'Les meilleures stratégies pour réduire votre imposition en toute légalité. Dispositifs PER, SCPI, LMNP et plus.',
        category: 'Fiscalité',
        pages: 28,
        icon: '💰',
        color: 'from-[#B99066] to-[#8a6b4d]',
        featured: true,
        pdfUrl: ''
      },
      {
        id: 3,
        title: 'Préparer sa Retraite : Le Guide Pratique',
        description: 'De 40 à 65 ans, les étapes clés pour sécuriser vos revenus futurs et profiter sereinement de votre retraite.',
        category: 'Retraite',
        pages: 32,
        icon: '🏖️',
        color: 'from-[#4a6b8a] to-[#253F60]',
        featured: false,
        pdfUrl: ''
      },
      {
        id: 4,
        title: 'Investir en SCPI : Mode d\'Emploi',
        description: 'Comprendre les SCPI, choisir les meilleures, et optimiser votre investissement pierre-papier.',
        category: 'Placements',
        pages: 24,
        icon: '🏢',
        color: 'from-[#6b8a4a] to-[#4a6b3a]',
        featured: false,
        pdfUrl: ''
      },
      {
        id: 5,
        title: 'Transmission de Patrimoine : Anticiper pour Protéger',
        description: 'Donation, succession, assurance-vie : les outils pour transmettre dans les meilleures conditions.',
        category: 'Patrimoine',
        pages: 36,
        icon: '👨‍👩‍👧‍👦',
        color: 'from-[#8a4a6b] to-[#6b3a4a]',
        featured: false,
        pdfUrl: ''
      },
      {
        id: 6,
        title: 'L\'Assurance-Vie : Guide Complet',
        description: 'Fonctionnement, fiscalité, gestion : maîtrisez l\'assurance-vie pour optimiser votre épargne.',
        category: 'Placements',
        pages: 30,
        icon: '🛡️',
        color: 'from-[#4a8a6b] to-[#3a6b4a]',
        featured: false,
        pdfUrl: ''
      }
    ],
    categories: ['Tous', 'Patrimoine', 'Fiscalité', 'Placements', 'Retraite']
  }
};

async function initializeRessources() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    try {
      // Check if page already exists
      const existing = await PageContent.findOne({ path: 'ressources' });
      
      if (existing) {
        console.log('📝 Page "ressources" already exists. Updating content structure...');
        // Deep merge content (arrays from source replace target arrays completely)
        function deepMerge(target, source) {
          for (const key in source) {
            if (Array.isArray(source[key])) {
              // Arrays from source completely replace target arrays
              target[key] = source[key];
            } else if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
              if (!target[key]) target[key] = {};
              deepMerge(target[key], source[key]);
            } else {
              // Primitive values from source override target
              target[key] = source[key];
            }
          }
          return target;
        }
        // Merge guides array
        existing.content = deepMerge(existing.content || {}, ressourcesContent.content);
        existing.title = ressourcesContent.title;
        existing.published = true;
        existing.lastModified = new Date();
        await existing.save();
        console.log('✅ Page "ressources" updated successfully!');
      } else {
        console.log('📝 Creating page "ressources"...');
        const page = new PageContent({
          path: 'ressources',
          title: ressourcesContent.title,
          content: ressourcesContent.content,
          published: true,
          lastModified: new Date()
        });
        await page.save();
        console.log('✅ Page "ressources" created successfully!');
      }
    } catch (error) {
      console.error('❌ Error processing page "ressources":', error.message);
    }

    console.log('\n✅ Ressources page initialized successfully!');
    console.log('\n📋 Page available in CMS:');
    console.log('   - "ressources" (Ressources & Guides)');
    console.log('\n💡 You can now manage resources at /admin/ressources');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

initializeRessources();

