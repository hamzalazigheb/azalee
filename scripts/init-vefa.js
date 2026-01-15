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
    title: "VEFA (Vente en l'État Futur d'Achèvement)",
    subtitle: "Investir dans l'immobilier neuf, et plus particulièrement en VEFA, consiste à acheter un logement sur plan, dont la construction est en cours ou à venir. Ce mode d'acquisition séduit de nombreux investisseurs qui souhaitent bénéficier d'un bien moderne, conforme aux normes énergétiques actuelles, et d'avantages fiscaux attractifs.",
    button1: "L'essentiel",
    button2: "Sommaire",
  },
  rightCard: {
    title: "VEFA : investissez dans le neuf",
    subtitle: "Bénéficiez d'avantages fiscaux, d'un financement adapté et d'une plus-value garantie.",
    benefits: [
      "Logements économes en énergie (RE2020)",
      "Frais de notaire réduits (2-3% vs 7%)",
      "Garanties constructeur sécurisées",
      "Défiscalisation loi Pinel"
    ],
    button1: "Prendre rendez-vous",
    button2: "Fiscalité",
  },
  essentiel: {
    title: "L'essentiel",
    items: [
      "Des logements économes en énergie grâce aux normes RE2020, gage de valorisation à long terme.",
      "Des frais de notaire réduits (2 à 3 % contre 7 % dans l'ancien).",
      "Des garanties constructeur (parfait achèvement, décennale, biennale) qui sécurisent l'investissement.",
      "La possibilité de bénéficier de dispositifs fiscaux comme la loi Pinel, réduisant significativement l'impôt.",
      "Délais de livraison pouvant s'allonger, avec parfois des retards de chantier.",
      "Surcote du neuf : le prix au m² est souvent plus élevé que dans l'ancien, ce qui limite la rentabilité."
    ],
  },
  definition: {
    title: "Qu'est-ce que la VEFA ?",
    text1: "La Vente en l'État Futur d'Achèvement (VEFA) est un contrat de vente d'un bien immobilier neuf qui n'est pas encore terminé au moment de la signature.",
    text2: "L'acheteur devient propriétaire du bien dès la signature du contrat, mais la livraison et le transfert de propriété effective se font à la fin des travaux.",
    savoirTitle: "À savoir",
    savoirItems: [
      "Contrat de vente signé avant achèvement",
      "Propriété acquise dès la signature",
      "Livraison à la fin des travaux",
      "Garanties constructeur obligatoires"
    ],
  },
  avantages: {
    title: "Avantages de la VEFA",
    items: [
      { title: "Économies d'énergie", description: "Logements conformes aux normes RE2020, gage de valorisation à long terme" },
      { title: "Frais réduits", description: "Frais de notaire réduits (2 à 3 % contre 7 % dans l'ancien)" },
      { title: "Garanties sécurisées", description: "Garanties constructeur (parfait achèvement, décennale, biennale)" },
      { title: "Défiscalisation", description: "Dispositifs fiscaux comme la loi Pinel réduisant significativement l'impôt" }
    ],
  },
  inconvenients: {
    title: "Inconvénients",
    items: [
      { title: "Délais de livraison", description: "Délais pouvant s'allonger, avec parfois des retards de chantier" },
      { title: "Surcote du neuf", description: "Le prix au m² est souvent plus élevé que dans l'ancien, limitant la rentabilité" },
      { title: "Plafonds de loyers", description: "En cas de Pinel, plafonds pouvant restreindre la cible de locataires" },
      { title: "Risque de vacance", description: "Vacance locative si l'emplacement est mal choisi (zones saturées)" }
    ],
  },
  exemple: {
    title: "Exemple concret",
    content: "Un investisseur acquiert un T2 en VEFA à Nantes pour 230 000 €. Grâce au dispositif Pinel, il bénéficie d'une réduction d'impôt de 4 600 €/an pendant 9 ans. Loué 650 €/mois, son bien lui permet de limiter son effort d'épargne à 150 €/mois tout en se constituant un patrimoine valorisé.",
  },
  financement: {
    title: "Financement et étapes",
    steps: [
      { step: "1", title: "Signature du contrat", description: "Engagement d'achat avec un acompte de 5%" },
      { step: "2", title: "Période de construction", description: "Paiement des intérêts uniquement" },
      { step: "3", title: "Livraison", description: "Paiement du solde et transfert de propriété" },
      { step: "4", title: "Possession", description: "Occupation et jouissance du bien" }
    ],
  },
  fiscalite: {
    title: "Fiscalité et défiscalisation",
    content: "La VEFA offre plusieurs avantages fiscaux : TVA réduite, possibilité de déficit foncier, et éligibilité aux dispositifs de défiscalisation comme Pinel ou Malraux selon la localisation et le type de bien.",
  },
  conseil: {
    title: "Conseil Azalée Patrimoine",
    content: "La VEFA est particulièrement adaptée aux investisseurs qui recherchent sécurité et défiscalisation. Mais le choix de la ville, du quartier et de la demande locative réelle est primordial. Chez Azalée Patrimoine, nous vous aidons à sélectionner uniquement les programmes offrant un véritable potentiel locatif et patrimonial.",
  },
  risques: {
    title: "Risques et précautions",
    items: [
      "Délais de livraison non respectés",
      "Qualité des finitions",
      "Évolution des prix du marché",
      "Risques de défaillance du promoteur"
    ],
  },
  comparaison: {
    title: "VEFA vs Immobilier existant",
    data: [
      { critere: "TVA", vefa: "5,5%", existant: "20%" },
      { critere: "Plus-value", vefa: "Élevée", existant: "Modérée" },
      { critere: "Délai", vefa: "12-24 mois", existant: "Immédiat" },
      { critere: "Risque", vefa: "Modéré", existant: "Faible" }
    ],
  },
  finalCta: {
    title: "Prêt à investir en VEFA ?",
    subtitle: "Nos experts vous accompagnent dans votre projet d'investissement immobilier neuf avec une approche personnalisée.",
    primaryButton: "Prendre rendez-vous",
    secondaryButton: "Consulter un expert",
  },
  seo: {
    metaTitle: "VEFA - Vente en l'État Futur d'Achèvement | Azalée Patrimoine",
    metaDescription: "Investissez dans l'immobilier neuf en VEFA. Avantages fiscaux, garanties constructeur et accompagnement expert avec Azalée Patrimoine.",
    keywords: ["VEFA", "immobilier neuf", "investissement", "défiscalisation", "Pinel"],
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

    const existingPage = await PageContent.findOne({ path: 'immobilier/vefa' });
    
    if (existingPage) {
      console.log('📄 Page exists, updating content...');
      existingPage.content = defaultContent;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page updated successfully');
    } else {
      console.log('📄 Creating new page...');
      const newPage = new PageContent({
        path: 'immobilier/vefa',
        title: 'VEFA - Vente en l\'État Futur d\'Achèvement',
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


