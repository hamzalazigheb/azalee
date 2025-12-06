// Script to initialize the homepage (accueil) in CMS
// Run with: node scripts/init-accueil-cms.js

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

// Default content structure for homepage
const accueilContent = {
  path: 'home',
  title: 'Page d\'accueil',
  content: {
    hero: {
      heroTitle: "Préserver. Optimiser. Transmettre.",
      heroSubtitle: "Depuis plus de 20 ans, Azalée Patrimoine accompagne les dirigeants, cadres supérieurs, professions libérales et familles fortunées dans la gestion et la transmission de leur patrimoine.",
      heroButton1: "Prenez rendez-vous en toute confidentialité",
      heroButton2: "Commencez à explorer les sujets",
      heroBackgrounds: [
        "/images/home.webp",
        "/images/image2.webp",
        "/images/image3.webp"
      ]
    },
    intro: {
      introTitle: "Gérer un patrimoine conséquent exige plus qu'une expertise financière : cela nécessite une vision, une stratégie, et un partenaire de confiance.",
      introParagraph: "Notre mission : protéger vos intérêts, valoriser votre patrimoine et organiser sa transmission pour les générations futures. Chez Azalée Patrimoine, nous privilégions la discrétion, l'indépendance et un accompagnement sur-mesure qui s'adapte à chaque étape de votre vie.",
      introButton: "Rencontrez-nous"
    },
    team: {
      teamTitle: "Qui sommes-nous",
      teamSubtitle: "Une équipe passionnée à votre service",
      teamDescription: "Chez Azalée Patrimoine, nous croyons que la réussite de votre stratégie patrimoniale repose sur la qualité humaine de l'accompagnement. Notre équipe pluridisciplinaire combine expertise technique et approche personnalisée pour vous offrir des solutions sur-mesure.",
      teamImage: "/images/quiss.jpg",
      teamButton: "Découvrir notre approche",
      teamValues: [
        { title: "Confidentialité", desc: "Nous protégeons vos informations et garantissons une totale discrétion dans la gestion de votre patrimoine.", icon: "" },
        { title: "Impartialité", desc: "Nos conseils sont 100% indépendants, toujours orientés vers vos seuls intérêts.", icon: "" },
        { title: "Suivi personnalisé", desc: "À chaque étape de votre vie, nous adaptons notre accompagnement à vos besoins spécifiques.", icon: "" },
        { title: "Clarté", desc: "Des honoraires fixes et une rémunération transparente, sans mauvaise surprise", icon: "" }
      ]
    },
    experts: {
      expertsTitle: "Nos expertises",
      expertsDescription: "Nous vous accompagnons dans tous les aspects de la gestion patrimoniale avec une approche globale et personnalisée.",
      experts: [
        { title: "Optimiser votre fiscalité", desc: "Réduisez votre impôt sur le revenu, votre IFI ou la fiscalité de vos revenus immobiliers grâce à des stratégies adaptées à votre situation.", button: "Découvrir nos solutions fiscales" },
        { title: "Préparer votre retraite", desc: "Construisez dès aujourd'hui le capital nécessaire pour sécuriser vos revenus futurs, grâce à des solutions comme le PER, l'assurance-vie ou des investissements financiers diversifiés.", button: "Planifier ma retraite" },
        { title: "Transmettre et protéger vos proches", desc: "Organisez la transmission de votre patrimoine dans les meilleures conditions fiscales : donations, successions, protection du conjoint, mise en place de holdings familiales.", button: "Organiser ma transmission" },
        { title: "Investir dans l'immobilier et le financier", desc: "Diversifiez vos actifs : SCPI, private equity, produits structurés, ou immobilier direct. Nous sélectionnons les opportunités qui correspondent à vos objectifs et à votre tolérance au risque.", button: "Diversifier mes investissements" },
        { title: "Sécuriser l'avenir de votre entreprise", desc: "Accompagner la cession d'entreprise, organiser votre trésorerie professionnelle, protéger vos actifs personnels et bâtir une stratégie patrimoniale durable.", button: "Sécuriser mon entreprise" },
        { title: "Accompagnement sur-mesure", desc: "Plus de 30 ans d'expérience en conseil patrimonial avec une approche indépendante et tournée vers vos intérêts.", button: "Rencontrer nos experts" }
      ]
    },
    statsTitle: 'Dans les chiffres clés établis',
    stats: [
      { value: '1996', label: 'Création d\'AGORA PATRIMOINE' },
      { value: '2018', label: 'Rachat par Proactive Finance' },
      { value: '2025', label: 'Rachat et fusion du groupe sous la marque AZALEE PATRIMOINE' },
      { value: '486', label: 'Clients' },
      { value: '50%', label: '50% de nos clients détiennent de l\'immobilier grâce à notre action de conseil' },
      { value: '35', label: 'Partenaires' },
      { value: '5', label: 'Implementations en France (Paris / Nantes / La Rochelle / Salon de Provence / Nice)' }
    ],
    investment: {
      investmentTitle: 'Sécurisez votre avenir avec une stratégie patrimoniale sur mesure',
      investmentText: "Gérer son patrimoine, ce n'est pas seulement investir : c'est anticiper, organiser et transmettre dans les meilleures conditions fiscales et familiales.\n\n👉 Chez Azalée Patrimoine, nous agissons comme un véritable chef d'orchestre, en coordination avec notaires et experts-comptables.\n\nSelon la phase de vie patrimoniale dans laquelle vous vous trouvez (constitution, consolidation, jouissance ou transmission), nous définissons un plan clair et optimisé. Notre objectif : vous permettre de profiter de vos capitaux tout en préservant durablement votre patrimoine.\n\nGrâce à un suivi régulier et personnalisé, nous adaptons la stratégie à vos objectifs personnels. Avec une approche pédagogique, nous vous donnons les clés pour prendre des décisions éclairées et avancer en toute confiance vers une gestion patrimoniale fluide, optimisée et fiscalement avantageuse.",
      investmentButton: 'Vous avez des questions, nous avons des réponses',
      investmentImage1: '/images/img_image_1222.png',
      investmentImage2: '/images/img_image_1220.png',
      investmentItems: [
        { 
          title: "Comprendre la fiscalité avant de défiscaliser", 
          description: "Découvrez les meilleures stratégies d'investissement adaptées à votre profil et vos objectifs financiers.",
          url: "/fiscalite",
          expanded: true
        },
        { 
          title: "Qui a-t-il dans un bilan patrimonial", 
          description: "",
          url: "/patrimoine",
          expanded: false
        },
        { 
          title: "Alléger votre fiscalité", 
          description: "",
          url: "/retraite",
          expanded: false
        },
        { 
          title: "Comment optimiser son pouvoir d'achat à la retraite", 
          description: "",
          url: "/retraite",
          expanded: false
        },
        { 
          title: "Gagner de l'argent grâce à des placements financiers", 
          description: "",
          url: "/placements",
          expanded: false
        },
        { 
          title: "Pourquoi l'immobilier est une base pour votre patrimoine ?", 
          description: "",
          url: "/Investissement-immobilier",
          expanded: false
        }
      ]
    },
    partners: [
      '/images/selencia.svg',
      '/images/cardif-logo.svg',
      '/images/SL-Logo-svg.svg',
      '/images/vieplus.svg',
      '/images/intencial-1.png',
      '/images/img_header_logo.png'
    ],
    finalCta: {
      finalCtaTitle: 'Et si nous parlions de votre patrimoine autour d\'un premier échange ?',
      finalCtaText: "Un rendez-vous en visio ou dans nos bureaux, en toute confidentialité. Prenez rendez-vous avec un conseiller Azalée Patrimoine pour découvrir comment nous pouvons vous accompagner dans la gestion et la transmission de votre patrimoine.",
      finalCtaImage: '/images/img_image_1227.png'
    },
    sectionOrder: [
      'hero',
      'intro',
      'team',
      'stats',
      'investment',
      'partners',
      'finalCta'
    ]
  }
};

async function initializeAccueil() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    try {
      // Check if page already exists
      const existing = await PageContent.findOne({ path: 'home' });
      
      if (existing) {
        console.log('📝 Page "accueil" (path: "home") already exists. Updating content structure...');
        // Deep merge content
        function deepMerge(target, source) {
          for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
              if (!target[key]) target[key] = {};
              deepMerge(target[key], source[key]);
            } else {
              target[key] = source[key];
            }
          }
          return target;
        }
        existing.content = deepMerge(existing.content || {}, accueilContent.content);
        existing.title = accueilContent.title;
        existing.published = true;
        existing.lastModified = new Date();
        await existing.save();
        console.log('✅ Page "accueil" updated successfully!');
      } else {
        console.log('📝 Creating page "accueil" (path: "home")...');
        const page = new PageContent({
          path: 'home',
          title: accueilContent.title,
          content: accueilContent.content,
          published: true,
          lastModified: new Date()
        });
        await page.save();
        console.log('✅ Page "accueil" created successfully!');
      }
    } catch (error) {
      console.error('❌ Error processing page "accueil":', error.message);
    }

    console.log('\n✅ Homepage initialized successfully!');
    console.log('\n📋 Page available in CMS:');
    console.log('   - "home" (Page d\'accueil)');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

initializeAccueil();

