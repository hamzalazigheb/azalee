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
    title: "LMNP (Loueur Meublé Non Professionnel) : un dispositif fiscal avantageux pour investir dans l'immobilier locatif",
    subtitle: "Le statut de Loueur Meublé Non Professionnel (LMNP) est l'un des dispositifs fiscaux les plus attractifs pour les investisseurs particuliers. Il permet de louer un logement meublé (studio, colocation, résidence gérée…) tout en bénéficiant d'un régime fiscal très favorable.",
    description: "Contrairement à la location nue, les loyers perçus sont déclarés non pas en revenus fonciers, mais en BIC (Bénéfices Industriels et Commerciaux). Cette distinction ouvre la possibilité d'amortir le bien et le mobilier, réduisant fortement – voire annulant – l'imposition sur les loyers pendant plusieurs années.",
    example: "Exemple simple : un studio acheté 120 000 € et loué 550 €/mois. Grâce à l'amortissement, les loyers sont quasi non imposés pendant 15 à 20 ans.",
    button: "Simuler votre projet LMNP",
  },
  rightCard: {
    title: "Nos experts à votre service",
    benefits: [
      "Fiscalité très avantageuse avec amortissement",
      "Loyers quasi exonérés d'impôt pendant 15-20 ans",
      "Flexibilité d'investissement (studio, résidence gérée)",
      "Revenus complémentaires sécurisés",
    ],
    floatingText: "0 € →\nAnalyse personnalisée gratuite",
  },
  sommaire: {
    items: [
      "Les avantages du LMNP",
      "Les inconvénients et points de vigilance",
      "Le nouveau traitement de la plus-value en LMNP",
      "Exemple concret",
      "LMNP en direct ou en résidence gérée ?",
      "Conseil Azalée Patrimoine",
    ],
  },
  avantages: {
    title: "Les avantages du LMNP",
    cards: [
      {
        title: "Fiscalité très avantageuse",
        bullets: [
          "L'amortissement du bien et du mobilier permet de gommer une grande partie du bénéfice imposable",
          "En pratique, les loyers encaissés sont souvent exonérés d'impôt pendant 15 à 20 ans",
        ],
      },
      {
        title: "Flexibilité d'investissement",
        bullets: [
          "Le LMNP s'applique aussi bien à un studio classique qu'à des résidences gérées (étudiantes, seniors, EHPAD, tourisme)",
          "Vous pouvez investir en direct ou via un exploitant professionnel",
        ],
      },
      {
        title: "Revenus complémentaires sécurisés",
        bullets: [
          "En location meublée classique, vous fixez librement le loyer et choisissez vos locataires",
          "En résidence gérée, vous signez un bail commercial avec un exploitant qui vous verse un loyer régulier, que le logement soit occupé ou non",
        ],
      },
      {
        title: "Transmission facilitée",
        bullets: [
          "Le LMNP reste une activité non professionnelle, donc plus simple à transmettre qu'un statut professionnel (LMP)",
        ],
      },
    ],
  },
  inconvenients: {
    title: "Les inconvénients et points de vigilance",
    cards: [
      {
        title: "Gestion plus lourde en direct",
        bullets: [
          "Recherche de locataires",
          "Turnover plus élevé (étudiants, jeunes actifs)",
          "Entretien du mobilier",
        ],
      },
      {
        title: "Dépendance à l'exploitant en résidence gérée",
        bullets: [
          "Si la société de gestion connaît des difficultés, vos loyers peuvent être impactés",
        ],
      },
      {
        title: "Risque de vacance locative",
        bullets: [
          "En direct, un logement mal placé ou mal meublé peut rester vide plusieurs mois",
        ],
      },
      {
        title: "Revente encadrée",
        bullets: [
          "En résidence gérée, le marché secondaire peut être moins liquide que pour un logement classique",
        ],
      },
    ],
  },
  plusValue: {
    title: "Le nouveau traitement de la plus-value en LMNP",
    paragraphs: [
      "Jusqu'ici, l'un des grands atouts du LMNP était que l'amortissement pratiqué sur le bien n'était pas réintégré dans le calcul de la plus-value. Autrement dit, vous profitiez d'années de loyers quasi exonérés d'impôt sans pénalité à la revente.",
      "Désormais, l'administration fiscale a précisé que l'amortissement doit être pris en compte dans certaines conditions lors du calcul de la plus-value en cas de cession. Cela signifie que la plus-value imposable peut être plus élevée que prévu.",
      "Toutefois, il est essentiel de garder une vision long terme :",
    ],
    bullets: [
      "Le LMNP reste une stratégie sur 15 à 20 ans",
      "Les avantages fiscaux immédiats (loyers peu ou pas imposés) compensent largement cet ajustement à la sortie",
      "La revente peut toujours être optimisée via une bonne anticipation et une détention longue",
    ],
  },
  exemple: {
    title: "Exemple concret",
    description: "Un investisseur achète un studio 120 000 € en LMNP, financé par crédit. Loué 550 €/mois, il perçoit 6 600 € par an. Grâce à l'amortissement (environ 4 000 €/an), son revenu imposable est nul. Pendant 15 ans, il encaisse plus de 90 000 € de loyers quasi exonérés d'impôt.",
    conclusion: "À la revente, la fiscalité sur la plus-value doit intégrer une partie des amortissements pratiqués. Mais l'investisseur a déjà largement profité d'une fiscalité allégée pendant 15 ans, ce qui compense ce traitement.",
  },
  comparaison: {
    title: "LMNP en direct ou en résidence gérée ?",
    options: [
      {
        title: "En direct (studio, colocation, petite surface en ville)",
        bullets: [
          "Plus de liberté dans le choix du locataire et du loyer",
          "Rentabilité brute généralement plus élevée",
          "Gestion plus chronophage",
        ],
      },
      {
        title: "En résidence gérée (tourisme, étudiant, EHPAD, seniors)",
        bullets: [
          "Revenus sécurisés par un bail commercial avec un exploitant",
          "Zéro gestion locative",
          "Rentabilité légèrement inférieure et dépendance à la santé financière de l'exploitant",
        ],
      },
    ],
  },
  conseil: {
    title: "Conseil Azalée Patrimoine",
    paragraphs: [
      "Le LMNP reste un des dispositifs fiscaux les plus efficaces pour se constituer des revenus complémentaires. L'impact du nouveau traitement de la plus-value ne doit pas faire oublier que le cœur de la stratégie se joue sur le long terme : lissage des revenus, fiscalité allégée et patrimoine constitué sur 15 à 20 ans.",
      "Chez Azalée Patrimoine, nous vous aidons à :",
    ],
    bullets: [
      "Choisir entre investissement en direct ou en résidence gérée",
      "Sécuriser vos loyers grâce à un bon emplacement ou un exploitant solide",
      "Anticiper la fiscalité de la revente pour éviter les mauvaises surprises",
    ],
    conclusion: "Le LMNP est un outil puissant pour diversifier vos revenus et préparer votre retraite sereinement.",
  },
  finalCta: {
    title: "Prêt à investir en LMNP ?",
    subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour construire votre stratégie d'investissement LMNP et optimiser votre défiscalisation immobilière.",
    primaryButton: "Simuler mon projet LMNP",
    secondaryButton: "Prendre rendez-vous",
  },
  seo: {
    metaTitle: "LMNP - Loueur Meublé Non Professionnel | Azalée Patrimoine",
    metaDescription: "Découvrez le statut LMNP, un dispositif fiscal avantageux pour investir dans l'immobilier locatif meublé. Conseils d'experts Azalée Patrimoine.",
    keywords: ["LMNP", "loueur meublé non professionnel", "investissement locatif", "défiscalisation", "immobilier meublé"],
  },
};

async function initPage() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const existingPage = await PageContent.findOne({ path: 'immobilier/lmnp' });
    
    if (existingPage) {
      console.log('📄 Page exists, updating content...');
      existingPage.content = defaultContent;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page updated successfully');
    } else {
      console.log('📄 Creating new page...');
      const newPage = new PageContent({
        path: 'immobilier/lmnp',
        title: 'LMNP - Loueur Meublé Non Professionnel',
        content: defaultContent,
        published: true,
      });
      await newPage.save();
      console.log('✅ Page created successfully');
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initPage();


