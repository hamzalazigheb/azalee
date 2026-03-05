// Script to initialize "Équipe" page content in MongoDB
// Run with: node scripts/init-equipe.js

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

// Content for "Équipe" page
const equipeContent = {
  path: 'equipe',
  title: 'Notre Équipe - Azalée Patrimoine',
  content: {
    hero: {
      title: "Notre équipe de conseillers",
      subtitle: "Des experts passionnés à votre service",
      description: "Chaque membre de notre équipe partage la même vision : vous accompagner avec excellence dans la gestion et la transmission de votre patrimoine."
    },
    team: {
      members: [
        {
          name: "Jean-Marc Dupont",
          position: "Fondateur & Directeur",
          photo: "/images/jean.webp",
          bio: "Fort de plus de 20 ans d'expérience dans le secteur financier, Jean-Marc a fondé Azalée Patrimoine avec la conviction que chaque client mérite un accompagnement sur-mesure. Son expertise couvre l'ensemble des domaines patrimoniaux, de l'optimisation fiscale à la transmission.",
          certifications: ["CIF - Conseiller en Investissements Financiers", "Master en Gestion de Patrimoine"],
          experience: "20+ ans"
        },
        {
          name: "Sophie Martin",
          position: "Conseillère en Gestion de Patrimoine",
          photo: "/images/sophie.webp",
          bio: "Sophie accompagne nos clients dans leurs projets d'investissement immobilier et financier. Sa double compétence juridique et financière lui permet d'apporter des solutions globales et adaptées à chaque situation.",
          certifications: ["CIF - Conseiller en Investissements Financiers", "Diplôme de Notariat"],
          experience: "15 ans"
        },
        {
          name: "Thomas Bernard",
          position: "Expert Fiscal",
          photo: "/images/client1.webp",
          bio: "Spécialiste de l'optimisation fiscale, Thomas aide nos clients à réduire leur imposition tout en construisant leur patrimoine. Il maîtrise parfaitement les dispositifs de défiscalisation immobilière et les stratégies d'investissement.",
          certifications: ["Expert-Comptable Diplômé", "Certification AMF"],
          experience: "12 ans"
        },
        {
          name: "Marie Leroy",
          position: "Conseillère Retraite & Prévoyance",
          photo: "/images/client2.webp",
          bio: "Marie accompagne nos clients dans la préparation de leur retraite et la protection de leur famille. Son approche pédagogique permet à chacun de comprendre les enjeux et de prendre des décisions éclairées.",
          certifications: ["CIF - Conseiller en Investissements Financiers", "Spécialisation Retraite"],
          experience: "10 ans"
        }
      ]
    },
    expertise: {
      title: "Nos domaines d'expertise",
      items: [
        {
          icon: "📊",
          title: "Gestion de patrimoine",
          description: "Stratégies personnalisées pour optimiser et développer votre patrimoine"
        },
        {
          icon: "🏠",
          title: "Investissement immobilier",
          description: "Accompagnement complet dans vos projets immobiliers"
        },
        {
          icon: "💰",
          title: "Optimisation fiscale",
          description: "Solutions légales pour réduire votre imposition"
        },
        {
          icon: "🛡️",
          title: "Protection & transmission",
          description: "Sécurisez l'avenir de vos proches"
        }
      ]
    },
    cta: {
      title: "Prêt à rencontrer votre conseiller ?",
      subtitle: "Prenez rendez-vous pour un premier échange gratuit et sans engagement. Nous étudierons ensemble votre situation et vos objectifs.",
      button: "Prendre rendez-vous"
    },
    seo: {
      metaTitle: "Notre Équipe de Conseillers - Azalée Patrimoine | Experts en gestion de patrimoine",
      metaDescription: "Découvrez l'équipe d'experts d'Azalée Patrimoine. Des conseillers certifiés et expérimentés pour vous accompagner dans la gestion de votre patrimoine.",
      keywords: ["équipe conseil patrimoine", "conseillers gestion patrimoine", "experts fiscaux", "Azalée Patrimoine"]
    }
  },
  published: true
};

async function initEquipe() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if page already exists
    const existingPage = await PageContent.findOne({ path: 'equipe' });
    
    if (existingPage) {
      console.log('📄 Page "Équipe" already exists, updating...');
      await PageContent.updateOne(
        { path: 'equipe' },
        { $set: equipeContent }
      );
      console.log('✅ Page "Équipe" updated successfully');
    } else {
      console.log('📄 Creating new page "Équipe"...');
      await PageContent.create(equipeContent);
      console.log('✅ Page "Équipe" created successfully');
    }

    console.log('\n📋 Content structure:');
    console.log('- Hero section');
    console.log('- Team section (4 members with photos, bios, certifications)');
    console.log('- Expertise section (4 domains)');
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

initEquipe()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

