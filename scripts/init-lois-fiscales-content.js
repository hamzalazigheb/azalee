const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

const defaultContent = {
  hero: {
    title: "Lois fiscales",
    subtitle: "Guide complet",
    description: "Optimiser sa fiscalité, c'est protéger et valoriser durablement son patrimoine. Les dispositifs fiscaux d'investissement immobilier offrent des leviers puissants pour réduire son imposition, préparer sa retraite ou transmettre plus efficacement. Ce guide décrypte les 7 principaux régimes en vigueur, à jour des dernières réformes, pour vous aider à arbitrer en toute connaissance de cause."
  },
  laws: [
    { id: 1, name: "Loi Pinel", shortName: "Pinel", category: "immobilier", path: "/fiscalite/loi-pinel", color: "bg-[#B99066]" },
    { id: 2, name: "Loi Malraux", shortName: "Malraux", category: "immobilier", path: "/fiscalite/loi-malraux", color: "bg-[#B99066]" },
    { id: 3, name: "Loi Cosse", shortName: "Cosse", category: "immobilier", path: "/fiscalite/loi-cosse", color: "bg-[#B99066]" },
    { id: 4, name: "Loi Denormandie", shortName: "Denormandie", category: "immobilier", path: "/fiscalite/loi-denormandie", color: "bg-[#B99066]" },
    { id: 5, name: "Loi Girardin", shortName: "Girardin", category: "immobilier", path: "/fiscalite/loi-girardin", color: "bg-[#B99066]" },
    { id: 6, name: "Monument Historique", shortName: "Monument", category: "immobilier", path: "/fiscalite/monument-historique", color: "bg-[#B99066]" }
  ],
  categories: [
    { id: "immobilier", label: "Immobilier" },
    { id: "entreprise", label: "Entreprise" },
    { id: "patrimoine", label: "Patrimoine" },
    { id: "retraite", label: "Retraite" }
  ],
  dispositifs: {
    immobilier: [
      {
        name: "Loi Pinel",
        description: "Réduction d'impôt de 12% par an",
        avantages: ["Réduction d'impôt de 12% par an", "Investissement dans le neuf uniquement", "Engagement de location de 9 ans"],
        conditions: ["Plafond de 300 000€ par an", "Respect des plafonds de loyers", "Respect des plafonds de ressources des locataires"]
      },
      {
        name: "Loi Malraux",
        description: "Réduction d'impôt jusqu'à 30%",
        avantages: ["Réduction d'impôt jusqu'à 30%", "Restauration de monuments historiques", "Engagement de location de 9 ans"],
        conditions: ["Bien situé en secteur sauvegardé", "Travaux de restauration", "Respect des normes patrimoniales"]
      }
    ],
    entreprise: [],
    patrimoine: [],
    retraite: []
  },
  selectedLawData: {
    name: "Loi Pinel",
    description: "Dispositif de défiscalisation immobilière",
    avantages: [
      "Réduction d'impôt de 12% par an",
      "Investissement dans le neuf uniquement",
      "Engagement de location de 9 ans"
    ],
    conditions: [
      "Plafond de 300 000€ par an",
      "Respect des plafonds de loyers",
      "Respect des plafonds de ressources des locataires"
    ],
    taux: [
      { reduction: "12%", annees: "6 ans" },
      { reduction: "12%", annees: "9 ans" },
      { reduction: "12%", annees: "12 ans" }
    ],
    plafonds: {
      "Plafond annuel": "300 000€",
      "Plafond loyer": "Selon zone",
      "Plafond ressources": "Selon zone"
    },
    risques: [
      "Non-respect des conditions d'engagement",
      "Baisse de la valeur du bien",
      "Évolutions législatives"
    ],
    cas_pratique: "Exemple : Investissement de 200 000€ dans un appartement Pinel à Paris. Réduction d'impôt de 24 000€ par an pendant 9 ans, soit 216 000€ au total.",
    recommandation: "La loi Pinel est un excellent dispositif pour réduire ses impôts tout en investissant dans l'immobilier neuf. Elle convient particulièrement aux contribuables imposés souhaitant diversifier leur patrimoine."
  },
  faq: [
    {
      question: "Puis-je cumuler plusieurs dispositifs ?",
      answer: "Oui, dans certains cas, vous pouvez cumuler plusieurs dispositifs fiscaux. Par exemple, la loi Pinel peut être combinée avec le prêt à taux zéro (PTZ) ou d'autres aides régionales."
    },
    {
      question: "Quand dois-je m'engager ?",
      answer: "L'engagement de location doit généralement être pris dès l'acquisition du bien. La durée varie selon le dispositif : 6, 9 ou 12 ans pour Pinel, 9 ans pour Malraux, etc."
    },
    {
      question: "Quels sont les risques ?",
      answer: "Les principaux risques sont la non-respect des conditions d'engagement, la baisse de la valeur du bien, et les évolutions législatives qui peuvent modifier les avantages fiscaux."
    },
    {
      question: "Quels documents fournir ?",
      answer: "Vous devrez fournir les justificatifs d'acquisition, les contrats de location, les attestations de loyer, et respecter les déclarations fiscales annuelles."
    }
  ],
  cta: {
    title: "Prêt à optimiser votre fiscalité ?",
    subtitle: "Nos experts vous accompagnent pour identifier le dispositif le plus adapté à votre situation.",
    buttons: [
      { text: "Simuler mes avantages", type: "primary" },
      { text: "Consulter un expert", type: "secondary" }
    ]
  },
  finalCta: {
    title: "Besoin d'un arbitrage personnalisé ?",
    description: "Chaque situation fiscale est unique. Chez Azalée, nous vous aidons à intégrer ces dispositifs dans une stratégie globale patrimoniale (transmission, SCI, IR/IFI, assurance vie...)",
    email: "contact@azalee-patrimoine.fr",
    emailSubtitle: "Planifiez votre consultation gratuite pour un arbitrage personnalisé",
    buttons: [
      { text: "Planifiez votre consultation gratuite", type: "primary" },
      { text: "Nous écrire", type: "secondary" }
    ]
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const existingPage = await PageContent.findOne({ path: 'fiscalite/lois-fiscales' });
    
    if (existingPage) {
      existingPage.content = { ...existingPage.content, ...defaultContent };
      existingPage.published = true;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page mise à jour avec le contenu complet');
    } else {
      await PageContent.create({
        path: 'fiscalite/lois-fiscales',
        title: 'Lois Fiscales',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log(`   ✅ laws (${defaultContent.laws.length} lois)`);
    console.log(`   ✅ categories (${defaultContent.categories.length} catégories)`);
    console.log('   ✅ dispositifs');
    console.log('   ✅ selectedLawData');
    console.log(`   ✅ faq (${defaultContent.faq.length} questions)`);
    console.log('   ✅ cta');
    console.log('   ✅ finalCta');

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initContent();

