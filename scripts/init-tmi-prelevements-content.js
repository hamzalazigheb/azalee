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
    title: "Tranche Marginale d'Imposition (TMI) + Prélèvements sociaux",
    subtitle: "Ce que tout investisseur doit comprendre",
    description: "La fiscalité des placements dépend en grande partie de votre Tranche Marginale d'Imposition (TMI). Couplée aux prélèvements sociaux (17,2%), elle conditionne le rendement net de vos investissements.",
    button: "Calculer ma TMI"
  },
  definition: {
    title: "Qu'est-ce que la TMI ?",
    description: "La TMI correspond au taux d'imposition marginal auquel sont soumis vos derniers euros de revenu imposable.",
    tableau: {
      headers: ["Revenu imposable (2024)", "Taux TMI"],
      rows: [
        { revenu: "Jusqu'à 11 294 €", taux: "0 %" },
        { revenu: "De 11 295 à 28 797 €", taux: "11 %" },
        { revenu: "De 28 798 à 82 341 €", taux: "30 %" },
        { revenu: "De 82 342 à 177 106 €", taux: "41 %" },
        { revenu: "Au-delà de 177 106 €", taux: "45 %" }
      ]
    },
    precision: "Il s'agit d'un taux marginal, et non global : seule la fraction de revenu correspondante est taxée à ce taux."
  },
  prelevementsSociaux: {
    title: "Prélèvements sociaux (17,2%)",
    description: "Les prélèvements sociaux s'ajoutent à l'impôt sur le revenu pour certains placements",
    details: [
      "CSG (Contribution Sociale Généralisée) : 9,2%",
      "CRDS (Contribution au Remboursement de la Dette Sociale) : 0,5%",
      "Prélèvement social : 7,5%",
      "Total : 17,2%"
    ]
  },
  impact: {
    title: "Impact sur vos investissements",
    description: "La TMI et les prélèvements sociaux déterminent le rendement net de vos placements",
    examples: [
      {
        title: "Placement à 4% avec TMI 30%",
        description: "Rendement net : 4% - (4% × 30%) - (4% × 17,2%) = 2,11%"
      },
      {
        title: "Placement à 4% avec TMI 41%",
        description: "Rendement net : 4% - (4% × 41%) - (4% × 17,2%) = 1,67%"
      }
    ]
  },
  cta: {
    title: "Besoin d'aide pour optimiser votre fiscalité ?",
    description: "Nos experts vous accompagnent pour comprendre et optimiser votre situation fiscale.",
    buttonText: "Planifiez votre consultation gratuite"
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const existingPage = await PageContent.findOne({ path: 'fiscalite/tmi-prelevements-sociaux' });
    
    if (existingPage) {
      existingPage.content = { ...existingPage.content, ...defaultContent };
      existingPage.published = true;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page mise à jour avec le contenu complet');
    } else {
      await PageContent.create({
        path: 'fiscalite/tmi-prelevements-sociaux',
        title: 'TMI et Prélèvements Sociaux',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log('   ✅ definition');
    console.log('   ✅ prelevementsSociaux');
    console.log('   ✅ impact');
    console.log('   ✅ cta');

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initContent();

