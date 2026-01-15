// Script to initialize "Qui sommes-nous" page content in MongoDB
// Run with: node scripts/init-qui-sommes-nous.js

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

// Content for "Qui sommes-nous" page
const quiSommesNousContent = {
  path: 'qui-sommes-nous',
  title: 'Qui sommes-nous - Azalée Patrimoine',
  content: {
    hero: {
      title: "Qui sommes-nous ?",
      subtitle: "Azalée Patrimoine, votre partenaire de confiance pour la gestion de votre patrimoine",
      description: "Depuis notre création, nous accompagnons les particuliers et les professionnels dans l'optimisation et la transmission de leur patrimoine."
    },
    histoire: {
      title: "Notre histoire",
      paragraphs: [
        "Azalée Patrimoine est née de la conviction qu'une gestion patrimoniale de qualité ne devait pas être réservée aux grandes fortunes. Notre fondateur, fort de plusieurs années d'expérience dans le secteur bancaire et financier, a décidé de créer un cabinet indépendant, libre de tout conflit d'intérêt.",
        "Depuis notre création, nous avons accompagné des centaines de familles dans la construction, la protection et la transmission de leur patrimoine. Chaque situation est unique, et c'est cette singularité qui guide notre approche personnalisée.",
        "Aujourd'hui, Azalée Patrimoine est devenue une référence en matière de conseil patrimonial, reconnue pour son expertise, sa transparence et la qualité de son accompagnement sur le long terme."
      ]
    },
    mission: {
      title: "Notre mission",
      intro: "Chez Azalée Patrimoine, notre mission est claire :",
      points: [
        {
          title: "Accompagner",
          description: "Nous accompagnons chaque client dans la réalisation de ses objectifs patrimoniaux, qu'il s'agisse de préparer sa retraite, de protéger sa famille ou d'optimiser sa fiscalité."
        },
        {
          title: "Conseiller",
          description: "Nous fournissons des conseils indépendants et objectifs, toujours dans l'intérêt exclusif de nos clients. Notre rémunération est transparente et alignée sur vos intérêts."
        },
        {
          title: "Simplifier",
          description: "Nous rendons accessibles les stratégies patrimoniales complexes grâce à une pédagogie claire et un accompagnement personnalisé tout au long de votre parcours."
        }
      ]
    },
    valeurs: {
      title: "Nos valeurs",
      items: [
        {
          icon: "🤝",
          title: "Confiance",
          description: "La confiance est au cœur de notre relation avec nos clients. Elle se construit sur la transparence, l'écoute et le respect de nos engagements."
        },
        {
          icon: "🎯",
          title: "Excellence",
          description: "Nous visons l'excellence dans chaque conseil, chaque recommandation. Notre équipe se forme en permanence pour vous offrir les meilleures solutions."
        },
        {
          icon: "🔒",
          title: "Indépendance",
          description: "Notre indépendance garantit des conseils objectifs, libres de tout conflit d'intérêt. Nous sélectionnons les solutions les plus adaptées à votre situation."
        },
        {
          icon: "👥",
          title: "Proximité",
          description: "Nous privilégions une relation de proximité avec chaque client. Votre conseiller dédié vous accompagne sur le long terme."
        }
      ]
    },
    cta: {
      title: "Envie d'en savoir plus ?",
      subtitle: "Rencontrez notre équipe et découvrez comment nous pouvons vous accompagner dans la gestion de votre patrimoine.",
      primaryButton: "Découvrir notre équipe",
      secondaryButton: "Prendre rendez-vous"
    },
    seo: {
      metaTitle: "Qui sommes-nous - Azalée Patrimoine | Cabinet de gestion de patrimoine",
      metaDescription: "Découvrez Azalée Patrimoine, votre cabinet indépendant de gestion de patrimoine. Notre histoire, mission et valeurs au service de votre patrimoine.",
      keywords: ["gestion de patrimoine", "cabinet conseil", "Azalée Patrimoine", "conseiller patrimoine"]
    }
  },
  published: true
};

async function initQuiSommesNous() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if page already exists
    const existingPage = await PageContent.findOne({ path: 'qui-sommes-nous' });
    
    if (existingPage) {
      console.log('📄 Page "Qui sommes-nous" already exists, updating...');
      await PageContent.updateOne(
        { path: 'qui-sommes-nous' },
        { $set: quiSommesNousContent }
      );
      console.log('✅ Page "Qui sommes-nous" updated successfully');
    } else {
      console.log('📄 Creating new page "Qui sommes-nous"...');
      await PageContent.create(quiSommesNousContent);
      console.log('✅ Page "Qui sommes-nous" created successfully');
    }

    console.log('\n📋 Content structure:');
    console.log('- Hero section');
    console.log('- Histoire section (3 paragraphs)');
    console.log('- Mission section (3 points)');
    console.log('- Valeurs section (4 values)');
    console.log('- CTA section');
    console.log('- SEO metadata');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

initQuiSommesNous()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

