// Script to initialize the blog page in CMS
// Run with: node scripts/init-blog-cms.js

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

// Default content structure for blog page
const blogContent = {
  path: 'blog',
  title: 'Blog & Actualités',
  content: {
    hero: {
      title: "Blog & Actualités",
      subtitle: "Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser la gestion de votre patrimoine."
    },
    articles: [
      {
        id: 1,
        slug: 'optimisation-fiscale-2025',
        title: 'Optimisation Fiscale 2025 : Les Stratégies Gagnantes',
        excerpt: 'Découvrez les meilleures stratégies pour réduire votre imposition en 2025. Notre guide complet sur les dispositifs fiscaux les plus avantageux.',
        category: 'Fiscalité',
        author: 'Équipe Azalée',
        date: '2025-01-15',
        readTime: '8 min',
        featured: true,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      },
      {
        id: 2,
        slug: 'preparer-retraite-50-ans',
        title: 'Préparer sa Retraite à 50 ans : Le Guide Complet',
        excerpt: 'À 50 ans, il est encore temps d\'optimiser votre préparation retraite. Découvrez les leviers à activer pour sécuriser vos revenus futurs.',
        category: 'Retraite',
        author: 'Équipe Azalée',
        date: '2025-01-10',
        readTime: '12 min',
        featured: true,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      },
      {
        id: 3,
        slug: 'scpi-2025-guide-investissement',
        title: 'SCPI en 2025 : Guide de l\'Investissement Immobilier Pierre-Papier',
        excerpt: 'Les SCPI restent un placement attractif en 2025. Analyse des rendements, des risques et des meilleures opportunités du marché.',
        category: 'Placements',
        author: 'Équipe Azalée',
        date: '2025-01-05',
        readTime: '10 min',
        featured: false,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      },
      {
        id: 4,
        slug: 'transmission-patrimoine-famille',
        title: 'Transmission de Patrimoine : Protéger sa Famille',
        excerpt: 'Comment transmettre son patrimoine dans les meilleures conditions fiscales ? Les clés pour préparer votre succession.',
        category: 'Patrimoine',
        author: 'Équipe Azalée',
        date: '2024-12-28',
        readTime: '15 min',
        featured: false,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      },
      {
        id: 5,
        slug: 'assurance-vie-luxembourg-avantages',
        title: 'Assurance-Vie Luxembourg : Les Avantages pour les Patrimoines Importants',
        excerpt: 'L\'assurance-vie luxembourgeoise offre des garanties uniques. Découvrez pourquoi elle séduit les investisseurs fortunés.',
        category: 'Placements',
        author: 'Équipe Azalée',
        date: '2024-12-20',
        readTime: '9 min',
        featured: false,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      },
      {
        id: 6,
        slug: 'investissement-immobilier-lmnp',
        title: 'Investissement LMNP : Optimiser sa Fiscalité Immobilière',
        excerpt: 'Le statut LMNP reste un outil puissant de défiscalisation. Guide complet pour maximiser vos avantages fiscaux.',
        category: 'Immobilier',
        author: 'Équipe Azalée',
        date: '2024-12-15',
        readTime: '11 min',
        featured: false,
        socialLinks: {
          linkedin: '',
          facebook: '',
          twitter: '',
          instagram: ''
        }
      }
    ],
    categories: ['Tous', 'Fiscalité', 'Retraite', 'Placements', 'Patrimoine', 'Immobilier'],
    newsletter: {
      title: "Restez Informé",
      description: "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.",
      buttonText: "S'abonner"
    }
  }
};

async function initializeBlog() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    try {
      // Check if page already exists
      const existing = await PageContent.findOne({ path: 'blog' });
      
      if (existing) {
        console.log('📝 Page "blog" already exists. Updating content structure...');
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
        // Merge articles array
        existing.content = deepMerge(existing.content || {}, blogContent.content);
        existing.title = blogContent.title;
        existing.published = true;
        existing.lastModified = new Date();
        await existing.save();
        console.log('✅ Page "blog" updated successfully!');
      } else {
        console.log('📝 Creating page "blog"...');
        const page = new PageContent({
          path: 'blog',
          title: blogContent.title,
          content: blogContent.content,
          published: true,
          lastModified: new Date()
        });
        await page.save();
        console.log('✅ Page "blog" created successfully!');
      }
    } catch (error) {
      console.error('❌ Error processing page "blog":', error.message);
    }

    console.log('\n✅ Blog page initialized successfully!');
    console.log('\n📋 Page available in CMS:');
    console.log('   - "blog" (Blog & Actualités)');
    console.log('\n💡 You can now manage blog at /admin/blog');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

initializeBlog();

