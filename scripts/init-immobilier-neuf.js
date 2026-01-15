const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const defaultContent = {
  hero: {
    title: "Immobilier neuf: investir dans la modernité et la fiscalité",
    subtitle: "Découvrez les opportunités d'investissement dans l'immobilier neuf avec nos experts. De la VEFA aux dispositifs fiscaux avantageux comme Pinel, Scellier et Robien, nous vous accompagnons dans vos projets d'investissement immobilier moderne.",
    backgroundImage: "/images/modern.webp",
    ctaText: "Prendre rendez-vous",
    badgeText: "0 €",
    badgeSubtext: "Analyse gratuite"
  },
  introduction: {
    title: "Qu'est-ce que l'immobilier neuf ?",
    content: "L'immobilier neuf représente une opportunité d'investissement moderne qui combine avantages fiscaux, garanties constructeur et valorisation patrimoniale. Que vous souhaitiez investir en VEFA (Vente en l'État Futur d'Achèvement) ou faire construire sur votre propre terrain, nos experts vous accompagnent dans chaque étape de votre projet."
  },
  dispositifsFiscaux: {
    title: "Les dispositifs fiscaux : Pinel, Scellier, Robien",
    subtitle: "Découvrez les dispositifs fiscaux avantageux pour l'investissement immobilier neuf",
    dispositifs: [
      {
        name: "Pinel",
        title: "Loi Pinel",
        description: "Réduction d'impôt jusqu'à 12% du prix d'acquisition sur 12 ans maximum",
        features: [
          "Investissement locatif neuf",
          "Réduction d'impôt progressive",
          "Engagement de location 6 à 12 ans",
          "Plafonds de loyer et de ressources"
        ],
        linkText: "",
        linkUrl: ""
      },
      {
        name: "Scellier",
        title: "Loi Scellier",
        description: "Dispositif fiscal pour l'investissement locatif dans le neuf (discontinué)",
        features: [
          "Réduction d'impôt sur le revenu",
          "Investissement locatif neuf",
          "Engagement de location 9 ans",
          "Dispositif historique"
        ],
        linkText: "Découvrir Scellier",
        linkUrl: "/immobilier/scellier"
      },
      {
        name: "Robien",
        title: "Loi Robien",
        description: "Ancien dispositif fiscal pour l'investissement locatif dans le neuf",
        features: [
          "Réduction d'impôt sur le revenu",
          "Investissement locatif neuf",
          "Engagement de location 5 ans",
          "Dispositif historique"
        ],
        linkText: "Découvrir Robien",
        linkUrl: "/immobilier/robien"
      }
    ]
  },
  vefa: {
    title: "VEFA : Vente en l'État Futur d'Achèvement",
    subtitle: "Investissez dans un bien immobilier neuf avant sa construction",
    description: "La VEFA vous permet d'acquérir un bien immobilier neuf avant même sa construction, avec des avantages fiscaux et financiers significatifs.",
    advantages: [
      {
        title: "Avantages fiscaux",
        description: "Bénéficiez des dispositifs Pinel, Scellier ou Robien selon votre situation"
      },
      {
        title: "Paiement échelonné",
        description: "Paiement progressif au fur et à mesure de l'avancement des travaux"
      },
      {
        title: "Garanties constructeur",
        description: "Garantie de parfait achèvement, garantie biennale et décennale"
      },
      {
        title: "Valorisation",
        description: "Potentiel de plus-value à la livraison du bien"
      }
    ],
    linkText: "Découvrir la VEFA",
    linkUrl: "/immobilier/vefa"
  },
  faireConstruire: {
    title: "Faire construire : terrain + maison",
    subtitle: "Construire sa maison sur son propre terrain offre de nombreux avantages : personnalisation totale, économies d'impôts, et investissement patrimonial durable",
    linkText: "Découvrir faire construire",
    linkUrl: "/immobilier/faire-construire"
  },
  advantages: {
    title: "Les avantages de l'investissement immobilier neuf",
    advantages: [
      {
        title: "Avantages fiscaux",
        description: "Bénéficiez de réductions d'impôt importantes avec les dispositifs Pinel, Scellier ou Robien",
        icon: "💰"
      },
      {
        title: "Garanties constructeur",
        description: "Protection maximale avec garantie de parfait achèvement, biennale et décennale",
        icon: "🛡️"
      },
      {
        title: "Modernité",
        description: "Bien conforme aux dernières normes énergétiques et de sécurité",
        icon: "🏗️"
      },
      {
        title: "Valorisation",
        description: "Potentiel de plus-value à la livraison et valorisation patrimoniale",
        icon: "📈"
      },
      {
        title: "Personnalisation",
        description: "Choix des finitions et aménagements selon vos préférences",
        icon: "🎨"
      },
      {
        title: "Maintenance réduite",
        description: "Pas de travaux de rénovation immédiats, tout est neuf",
        icon: "🔧"
      }
    ]
  },
  conclusion: {
    title: "Conclusion",
    content: "L'<strong>investissement immobilier</strong> n'est pas monolithique : il existe une stratégie adaptée à chaque objectif.",
    objectives: [
      {
        title: "Réduire vos impôts",
        description: "→ Loi Pinel, déficit foncier, LMNP"
      },
      {
        title: "Préparer votre retraite",
        description: "→ Investissement locatif, LMNP, SCI familiale"
      },
      {
        title: "Valoriser rapidement votre capital",
        description: "→ Immeubles de rapport, plus-value immobilière"
      }
    ],
    finalText: "Chez <strong>Azalée Patrimoine</strong>, nous analysons votre profil fiscal, patrimonial et vos objectifs pour bâtir une stratégie sur mesure.",
    primaryCta: {
      text: "Demander un bilan gratuit",
      url: "https://calendly.com/rdv-azalee-patrimoine/30min"
    },
    secondaryCta: {
      text: "Prendre rendez-vous",
      url: "https://calendly.com/rdv-azalee-patrimoine/30min"
    }
  },
  seo: {
    metaTitle: "Immobilier Neuf - Programmes Neufs | Azalée Patrimoine",
    metaDescription: "Immobilier neuf avec Azalée Patrimoine : programmes neufs sélectionnés, avantages fiscaux, garanties constructeur. Investissez dans l'immobilier neuf.",
    keywords: "immobilier neuf, programmes neufs, investissement immobilier, défiscalisation, Azalée Patrimoine",
    openGraphTitle: "Immobilier Neuf - Programmes Neufs | Azalée Patrimoine",
    openGraphDescription: "Immobilier neuf : programmes neufs sélectionnés, avantages fiscaux, garanties constructeur.",
    openGraphImage: "/images/modern.webp"
  },
  relatedLinks: {
    title: "Pages connexes",
    links: [
      { text: "VEFA", url: "/immobilier/vefa" },
      { text: "Scellier", url: "/immobilier/scellier" },
      { text: "Robien", url: "/immobilier/robien" },
      { text: "Faire construire", url: "/immobilier/faire-construire" },
      { text: "Investissement locatif", url: "/immobilier/investissement-locatif" }
    ]
  }
};

async function initImmobilierNeuf() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if page already exists
    const existing = await PageContent.findOne({ path: 'immobilier/immobilier-neuf' });
    
    if (existing) {
      console.log('⚠️  Page already exists. Updating content...');
      existing.content = defaultContent;
      existing.lastModified = new Date();
      await existing.save();
      console.log('✅ Page updated successfully');
    } else {
      console.log('📝 Creating new page...');
      const page = new PageContent({
        path: 'immobilier/immobilier-neuf',
        title: 'Immobilier Neuf - Programmes Neufs',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      await page.save();
      console.log('✅ Page created successfully');
    }

    console.log('\n📋 Page details:');
    console.log('   Path: immobilier/immobilier-neuf');
    console.log('   Title: Immobilier Neuf - Programmes Neufs');
    console.log('   Sections: hero, introduction, dispositifsFiscaux, vefa, faireConstruire, advantages, conclusion, seo, relatedLinks');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

initImmobilierNeuf();


