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
    title: "Bilan patrimonial",
    subtitle: "Un diagnostic complet de votre situation patrimoniale pour optimiser votre stratégie d'investissement et réduire votre fiscalité.",
    highlight: "Votre premier diagnostic est offert. Découvrez comment optimiser votre patrimoine avec l'expertise d'Azalée Patrimoine.",
    stats: [
      {
        label: "Bilans réalisés",
        value: "500+",
        description: "Depuis 2020"
      },
      {
        label: "Économies moyennes",
        value: "15%",
        description: "Sur la fiscalité"
      },
      {
        label: "Satisfaction client",
        value: "98%",
        description: "Clients satisfaits"
      },
      {
        label: "Temps moyen",
        value: "2h",
        description: "Pour un bilan complet"
      }
    ],
    buttons: [
      {
        text: "Demander mon bilan gratuit",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      {
        text: "En savoir plus",
        url: "#pourquoi"
      }
    ]
  },
  pourquoi: {
    title: "Pourquoi faire un bilan patrimonial ?",
    subtitle: "Un diagnostic complet pour optimiser votre patrimoine",
    listTitle: "Le processus en 6 étapes",
    items: [
      {
        title: "Écoute et compréhension",
        description: "Nous analysons votre situation actuelle, vos objectifs et vos contraintes pour comprendre vos besoins spécifiques."
      },
      {
        title: "Analyse approfondie",
        description: "Évaluation complète de vos actifs, passifs, revenus et charges pour établir un diagnostic précis."
      },
      {
        title: "Définition des objectifs",
        description: "Identification de vos priorités : optimisation fiscale, transmission, retraite, investissement..."
      },
      {
        title: "Allocation des ressources",
        description: "Proposition d'une stratégie d'allocation adaptée à votre profil et à vos objectifs."
      },
      {
        title: "Stratégie personnalisée",
        description: "Élaboration d'un plan d'action détaillé avec des recommandations concrètes et chiffrées."
      },
      {
        title: "Suivi et ajustements",
        description: "Accompagnement régulier pour adapter votre stratégie aux évolutions de votre situation."
      }
    ],
    calculator: {
      title: "Calculez votre potentiel d'optimisation",
      description: "Estimez les économies potentielles sur votre fiscalité"
    }
  },
  contenu: {
    title: "Contenu du bilan patrimonial",
    subtitle: "Un diagnostic complet couvrant tous les aspects de votre patrimoine",
    items: [
      {
        title: "Patrimoine",
        description: "Inventaire complet de vos actifs (immobilier, placements financiers, liquidités, biens mobiliers) et de vos passifs."
      },
      {
        title: "Protection de la famille",
        description: "Analyse de votre couverture assurance et des dispositifs de protection de votre famille."
      },
      {
        title: "Fiscalité",
        description: "Évaluation de votre situation fiscale et identification des leviers d'optimisation disponibles."
      },
      {
        title: "Retraite",
        description: "Analyse de votre préparation à la retraite et des dispositifs d'épargne retraite adaptés."
      },
      {
        title: "Investissements",
        description: "Évaluation de votre portefeuille d'investissements et recommandations de diversification."
      },
      {
        title: "Assurance et protection",
        description: "Analyse de vos contrats d'assurance et de votre couverture risques."
      }
    ]
  },
  tarifs: {
    title: "Tarifs du bilan patrimonial",
    plans: [
      {
        name: "Bilan Essentiel",
        price: "Gratuit",
        features: [
          "Diagnostic de base",
          "Analyse de votre situation",
          "Recommandations générales",
          "Rendez-vous de 1h"
        ]
      },
      {
        name: "Bilan Complet",
        price: "Sur devis",
        features: [
          "Diagnostic approfondi",
          "Analyse détaillée complète",
          "Plan d'action personnalisé",
          "Suivi sur 6 mois",
          "Rendez-vous de 2h"
        ]
      },
      {
        name: "Bilan Premium",
        price: "Sur devis",
        features: [
          "Diagnostic exhaustif",
          "Stratégie globale",
          "Accompagnement personnalisé",
          "Suivi sur 12 mois",
          "Rendez-vous de 3h"
        ]
      }
    ],
    bottomNote: "Le premier bilan est toujours offert. Contactez-nous pour en savoir plus sur nos formules."
  },
  exemple: {
    title: "Exemple concret",
    subtitle: "Comment un bilan patrimonial peut vous faire économiser",
    leftTitle: "Situation initiale",
    leftItems: [
      {
        label: "Patrimoine total",
        value: "500 000 €"
      },
      {
        label: "Revenus annuels",
        value: "120 000 €"
      },
      {
        label: "Impôts annuels",
        value: "25 000 €"
      },
      {
        label: "Situation familiale",
        value: "Couple, 2 enfants"
      }
    ],
    leftNoteTitle: "Points d'attention",
    leftNotes: [
      "Pas d'optimisation fiscale en place",
      "Patrimoine non structuré",
      "Pas de stratégie de transmission"
    ],
    rightTitle: "Après le bilan",
    rightItems: [
      {
        title: "Optimisation fiscale",
        subtitle: "Mise en place de dispositifs adaptés"
      },
      {
        title: "Stratégie patrimoniale",
        subtitle: "Structuration du patrimoine"
      },
      {
        title: "Transmission",
        subtitle: "Préparation de la succession"
      }
    ],
    rightNoteTitle: "Résultats obtenus",
    rightNote: "Économies fiscales de 8 000 € par an et optimisation patrimoniale de +12%",
    conclusion: "Un bilan patrimonial permet d'identifier rapidement les leviers d'optimisation et de mettre en place une stratégie adaptée.",
    conclusionCards: [
      {
        title: "Économies fiscales",
        subtitle: "8 000 € par an"
      },
      {
        title: "Optimisation",
        subtitle: "+12% de performance"
      }
    ]
  },
  finalCta: {
    title: "Prêt à optimiser votre patrimoine ?",
    subtitle: "Demandez votre bilan patrimonial gratuit et découvrez comment améliorer votre situation financière.",
    listTitle: "Ce que vous obtenez avec votre bilan",
    items: [
      "Diagnostic complet de votre situation",
      "Recommandations personnalisées",
      "Plan d'action détaillé",
      "Accompagnement personnalisé"
    ],
    buttons: [
      {
        text: "Demander mon bilan gratuit",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      {
        text: "En savoir plus",
        url: "/patrimoine"
      }
    ],
    bottomNote: "Votre premier bilan est offert. Contactez-nous dès aujourd'hui pour commencer."
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const existingPage = await PageContent.findOne({ path: 'patrimoine/bilan' });
    
    if (existingPage) {
      // Mettre à jour la page existante
      existingPage.content = { ...existingPage.content, ...defaultContent };
      existingPage.published = true;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page mise à jour avec le contenu complet');
    } else {
      // Créer une nouvelle page
      await PageContent.create({
        path: 'patrimoine/bilan',
        title: 'Bilan patrimonial : audit et stratégie | Azalée Patrimoine',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log('   ✅ pourquoi');
    console.log('   ✅ contenu');
    console.log('   ✅ tarifs');
    console.log('   ✅ exemple');
    console.log('   ✅ finalCta');

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initContent();

