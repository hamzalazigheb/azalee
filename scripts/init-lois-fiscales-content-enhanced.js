const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const loisFiscalesContent = {
  title: 'Lois Fiscales | Guide complet | Azalée Patrimoine',
  content: {
    hero: {
      title: "Lois fiscales",
      subtitle: "Guide complet",
      description: "Optimiser sa fiscalité, c'est protéger et valoriser durablement son patrimoine. Les dispositifs fiscaux d'investissement immobilier offrent des leviers puissants pour réduire son imposition, préparer sa retraite ou transmettre plus efficacement. Ce guide décrypte les 7 principaux régimes en vigueur, à jour des dernières réformes, pour vous aider à arbitrer en toute connaissance de cause."
    },
    laws: [
      { 
        id: 1, 
        name: "Loi Pinel", 
        shortName: "Pinel", 
        category: "immobilier", 
        path: "/fiscalite/loi-pinel", 
        color: "bg-[#B99066]",
        description: "Dispositif de défiscalisation immobilière"
      },
      { 
        id: 2, 
        name: "Loi Malraux", 
        shortName: "Malraux", 
        category: "immobilier", 
        path: "/fiscalite/loi-malraux", 
        color: "bg-[#B99066]",
        description: "Réduction d'impôt pour restauration patrimoniale"
      },
      { 
        id: 3, 
        name: "Loi Cosse", 
        shortName: "Cosse", 
        category: "immobilier", 
        path: "/fiscalite/loi-cosse", 
        color: "bg-[#B99066]",
        description: "Défiscalisation en résidence de tourisme"
      },
      { 
        id: 4, 
        name: "Loi Denormandie", 
        shortName: "Denormandie", 
        category: "immobilier", 
        path: "/fiscalite/loi-denormandie", 
        color: "bg-[#B99066]",
        description: "Rénovation en centre-ville"
      },
      { 
        id: 5, 
        name: "Loi Girardin", 
        shortName: "Girardin", 
        category: "immobilier", 
        path: "/fiscalite/loi-girardin", 
        color: "bg-[#B99066]",
        description: "Investissement dans les DOM-TOM"
      },
      { 
        id: 6, 
        name: "Monument Historique", 
        shortName: "Monument", 
        category: "immobilier", 
        path: "/fiscalite/monument-historique", 
        color: "bg-[#B99066]",
        description: "Protection du patrimoine historique"
      }
    ],
    categories: [
      { id: "immobilier", label: "Immobilier" },
      { id: "entreprise", label: "Entreprise" },
      { id: "patrimoine", label: "Patrimoine" },
      { id: "retraite", label: "Retraite" }
    ],
    lawsData: {
      "pinel": {
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
          { reduction: "18%", annees: "9 ans" },
          { reduction: "21%", annees: "12 ans" }
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
        cas_pratique: "Exemple : Investissement de 200 000€ dans un appartement Pinel à Paris. Réduction d'impôt de 36 000€ sur 9 ans, soit 18% du prix d'acquisition.",
        recommandation: "La loi Pinel est un excellent dispositif pour réduire ses impôts tout en investissant dans l'immobilier neuf. Elle convient particulièrement aux contribuables imposés souhaitant diversifier leur patrimoine."
      },
      "malraux": {
        name: "Loi Malraux",
        description: "Réduction d'impôt pour restauration patrimoniale",
        avantages: [
          "Réduction d'impôt jusqu'à 30%",
          "Restauration de monuments historiques",
          "Engagement de location de 9 ans"
        ],
        conditions: [
          "Bien situé en secteur sauvegardé",
          "Travaux de restauration",
          "Respect des normes patrimoniales"
        ],
        taux: [
          { reduction: "30%", annees: "9 ans" }
        ],
        plafonds: {
          "Plafond travaux": "100 000€/an",
          "Plafond loyer": "Selon zone",
          "Plafond ressources": "Selon zone"
        },
        risques: [
          "Coûts de restauration élevés",
          "Contraintes patrimoniales",
          "Délais de travaux"
        ],
        cas_pratique: "Exemple : Travaux de restauration de 150 000€ dans un bien Malraux. Réduction d'impôt de 45 000€ sur 9 ans.",
        recommandation: "La loi Malraux convient aux investisseurs passionnés de patrimoine et disposant d'un budget conséquent pour les travaux."
      },
      "cosse": {
        name: "Loi Cosse",
        description: "Défiscalisation en résidence de tourisme",
        avantages: [
          "Réduction d'impôt jusqu'à 25%",
          "Investissement en résidence de tourisme",
          "Gestion déléguée possible"
        ],
        conditions: [
          "Bien en résidence de tourisme",
          "Engagement de location de 9 ans",
          "Respect des normes hôtelières"
        ],
        taux: [
          { reduction: "25%", annees: "9 ans" }
        ],
        plafonds: {
          "Plafond investissement": "300 000€",
          "Plafond loyer": "Selon zone",
          "Plafond ressources": "Selon zone"
        },
        risques: [
          "Dépendance au tourisme",
          "Gestion complexe",
          "Réglementation stricte"
        ],
        cas_pratique: "Exemple : Investissement de 200 000€ en résidence de tourisme. Réduction d'impôt de 50 000€ sur 9 ans.",
        recommandation: "La loi Cosse convient aux investisseurs souhaitant diversifier dans le tourisme avec une gestion déléguée."
      },
      "denormandie": {
        name: "Loi Denormandie",
        description: "Rénovation en centre-ville",
        avantages: [
          "Réduction d'impôt jusqu'à 21%",
          "Investissement dans l'ancien rénové",
          "Revitalisation des centres-villes"
        ],
        conditions: [
          "Bien en zone ANRU ou action cœur de ville",
          "Travaux représentant 25% du prix",
          "Engagement de location de 6, 9 ou 12 ans"
        ],
        taux: [
          { reduction: "12%", annees: "6 ans" },
          { reduction: "18%", annees: "9 ans" },
          { reduction: "21%", annees: "12 ans" }
        ],
        plafonds: {
          "Plafond investissement": "300 000€",
          "Plafond travaux": "75 000€ minimum",
          "Plafond loyer": "Selon zone"
        },
        risques: [
          "Coûts de rénovation",
          "Sélection des zones",
          "Délais de travaux"
        ],
        cas_pratique: "Exemple : Achat de 150 000€ + travaux de 50 000€. Réduction d'impôt de 27 000€ sur 9 ans (18%).",
        recommandation: "La loi Denormandie convient aux investisseurs souhaitant participer à la revitalisation des centres-villes."
      },
      "girardin": {
        name: "Loi Girardin",
        description: "Investissement dans les DOM-TOM",
        avantages: [
          "Réduction d'impôt immédiate",
          "Investissement dans les DOM-TOM",
          "Secteurs variés (immobilier, industrie)"
        ],
        conditions: [
          "Investissement en DOM-TOM",
          "Respect des normes locales",
          "Engagement de durée variable"
        ],
        taux: [
          { reduction: "Variable", annees: "Selon secteur" }
        ],
        plafonds: {
          "Plafond investissement": "Variable",
          "Plafond réduction": "Selon secteur",
          "Plafond loyer": "Selon zone"
        },
        risques: [
          "Risques géographiques",
          "Complexité réglementaire",
          "Liquidité limitée"
        ],
        cas_pratique: "Exemple : Investissement de 100 000€ en Girardin industriel. Réduction d'impôt immédiate de 30 000€.",
        recommandation: "La loi Girardin convient aux investisseurs avertis acceptant les risques liés aux DOM-TOM."
      },
      "monument": {
        name: "Monument Historique",
        description: "Protection du patrimoine historique",
        avantages: [
          "Réduction d'impôt jusqu'à 50%",
          "Protection du patrimoine",
          "Pas de plafond d'investissement"
        ],
        conditions: [
          "Bien classé ou inscrit MH",
          "Travaux de restauration",
          "Ouverture au public"
        ],
        taux: [
          { reduction: "50%", annees: "Travaux" }
        ],
        plafonds: {
          "Plafond investissement": "Aucun",
          "Plafond travaux": "Aucun",
          "Plafond loyer": "Libre"
        },
        risques: [
          "Coûts très élevés",
          "Contraintes strictes",
          "Délais importants"
        ],
        cas_pratique: "Exemple : Travaux de 500 000€ sur un monument historique. Réduction d'impôt de 250 000€.",
        recommandation: "Monument Historique convient aux investisseurs fortunés passionnés de patrimoine."
      }
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
        { reduction: "18%", annees: "9 ans" },
        { reduction: "21%", annees: "12 ans" }
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
      cas_pratique: "Exemple : Investissement de 200 000€ dans un appartement Pinel à Paris. Réduction d'impôt de 36 000€ sur 9 ans, soit 18% du prix d'acquisition.",
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
    },
    seo: {
      metaTitle: "Lois Fiscales | Guide complet des dispositifs de défiscalisation | Azalée Patrimoine",
      metaDescription: "Guide complet des lois fiscales : Pinel, Malraux, Denormandie, Girardin, Cosse, Monument Historique. Comparez les dispositifs de défiscalisation et optimisez votre fiscalité."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'fiscalite/lois-fiscales';
    
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: loisFiscalesContent.title,
            content: loisFiscalesContent.content,
            published: true,
            lastModified: new Date()
          }
        },
        { new: true }
      );
      
      console.log('✅ Contenu mis à jour avec succès\n');
    } else {
      console.log(`📝 Création de la page "${path}"...`);
      
      const newPage = new PageContent({
        path,
        title: loisFiscalesContent.title,
        content: loisFiscalesContent.content,
        published: true,
        lastModified: new Date()
      });
      
      await newPage.save();
      console.log('✅ Page créée avec succès\n');
    }

    const page = await PageContent.findOne({ path });
    console.log('📋 Vérification du contenu:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Hero: ${page.content.hero ? '✅' : '❌'}`);
    console.log(`   - Hero Title: ${page.content.hero?.title || '❌'}`);
    console.log(`   - Laws: ${page.content.laws ? `✅ (${page.content.laws.length})` : '❌'}`);
    console.log(`   - Laws Data: ${page.content.lawsData ? `✅ (${Object.keys(page.content.lawsData).length} lois)` : '❌'}`);
    console.log(`   - Categories: ${page.content.categories ? `✅ (${page.content.categories.length})` : '❌'}`);
    console.log(`   - FAQ: ${page.content.faq ? `✅ (${page.content.faq.length})` : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();

