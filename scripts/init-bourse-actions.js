/**
 * Script pour initialiser le contenu CMS de la page Bourse-Actions
 */

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

const defaultContent = {
  hero: {
    title: "La Bourse (actions, CAC 40, indices, ETF…) : guide pour débuter",
    subtitle: "Investir en Bourse attire de plus en plus d'épargnants français. Entre l'<strong>attrait de la performance</strong> (bien supérieure aux livrets ou fonds en euros) et la possibilité de <strong>participer à la croissance des entreprises</strong>, la Bourse est un passage obligé pour diversifier son patrimoine.",
    note: "Mais la Bourse peut sembler complexe : actions, dividendes, CAC 40, indices mondiaux, ETF, volatilité… Cette page vous aide à <strong>décrypter les bases</strong> pour investir de manière éclairée.",
    primaryButton: "Commencer à investir",
    secondaryButton: "Voir nos analyses"
  },
  marketData: {
    cac40: {
      description: "40 plus grandes entreprises françaises"
    },
    sp500: {
      description: "500 plus grandes sociétés américaines"
    },
    msciWorld: {
      description: "1 500 actions dans 23 pays développés"
    },
    averageReturn: {
      description: "Performance historique S&P 500"
    }
  },
  tabs: [
    { id: "introduction", label: "Introduction" },
    { id: "definition", label: "Qu'est-ce que la Bourse ?" },
    { id: "actions", label: "Les actions" },
    { id: "indices", label: "Indices boursiers" },
    { id: "investir", label: "Comment investir ?" },
    { id: "enveloppes", label: "Enveloppes fiscales" },
    { id: "faq", label: "FAQ" }
  ],
  tabContent: {
    introduction: {
      title: "Introduction",
      subtitle: "Investir en Bourse attire de plus en plus d'épargnants français. Entre l'<strong>attrait de la performance</strong> (bien supérieure aux livrets ou fonds en euros) et la possibilité de <strong>participer à la croissance des entreprises</strong>, la Bourse est un passage obligé pour diversifier son patrimoine.",
      whyInvest: {
        title: "Pourquoi investir en Bourse ?",
        items: [
          {
            title: "Performance supérieure",
            description: "Rendement historique de 7% par an sur le S&P 500 depuis 50 ans, bien supérieur aux livrets."
          },
          {
            title: "Participation à l'économie réelle",
            description: "Investir dans la croissance des entreprises et participer à l'économie mondiale."
          }
        ]
      }
    },
    definition: {
      title: "Qu'est-ce que la Bourse ?",
      subtitle: "La <strong>Bourse</strong> est un marché où s'échangent des titres financiers.",
      types: [
        { title: "Actions", description: "Parts de sociétés cotées" },
        { title: "Obligations", description: "Titres de dette" },
        { title: "ETF et fonds", description: "Panier de titres" },
        { title: "Produits dérivés", description: "Options, turbos, warrants (pour investisseurs avertis)" }
      ],
      role: {
        title: "Rôle de la Bourse",
        items: [
          {
            title: "Pour les entreprises",
            description: "Se financer en émettant des actions"
          },
          {
            title: "Pour les investisseurs",
            description: "Placer leur argent dans l'économie réelle"
          }
        ]
      }
    },
    actions: {
      title: "Les actions : le cœur de la Bourse",
      subtitle: "Une <strong>action</strong> est une part du capital d'une société cotée.",
      rights: {
        title: "Détenir une action vous donne :",
        items: [
          {
            title: "Droit de vote",
            description: "En assemblée générale"
          },
          {
            title: "Droit aux dividendes",
            description: "Part des bénéfices distribuée aux actionnaires"
          },
          {
            title: "Espérance de plus-value",
            description: "Si le cours de l'action augmente"
          }
        ]
      },
      example: {
        title: "Exemple concret : TotalÉnergies",
        scenarios: [
          {
            title: "Achat",
            description: "Vous achetez 100 actions de TotalÉnergies à <strong>60 €</strong>"
          },
          {
            title: "Scénario positif",
            description: "Si le cours monte à <strong>70 €</strong> → Plus-value de <strong>1 000 €</strong>"
          },
          {
            title: "Scénario négatif",
            description: "Si le cours baisse à <strong>50 €</strong> → Perte de <strong>1 000 €</strong>"
          }
        ],
        conclusion: "L'action combine <strong>rendement (dividendes)</strong> et <strong>risque (fluctuation du cours)</strong>."
      }
    },
    indices: {
      title: "Les indices boursiers : CAC 40, S&P 500, MSCI World…",
      subtitle: "Les <strong>indices boursiers</strong> mesurent la performance d'un groupe d'actions représentatif d'un marché.",
      list: [
        {
          name: "CAC 40",
          value: "7,245.69",
          description: "Les 40 plus grandes entreprises françaises cotées à Paris.",
          companies: ["TotalÉnergies", "LVMH", "Hermès", "L'Oréal"]
        },
        {
          name: "S&P 500",
          value: "4,783.35",
          description: "Les 500 plus grandes sociétés américaines.",
          companies: ["Apple", "Microsoft", "Amazon", "Tesla"]
        },
        {
          name: "MSCI World",
          value: "2,156.78",
          description: "Environ 1 500 actions dans 23 pays développés.",
          companies: ["Diversification mondiale", "Pays développés", "Large capitalisation", "Référence internationale"]
        }
      ],
      role: {
        title: "Rôle des indices",
        description: "Un indice est un <strong>thermomètre</strong> du marché. Il permet de suivre l'évolution de la Bourse sans s'attarder sur chaque titre."
      }
    },
    investir: {
      title: "Comment investir en Bourse ?",
      subtitle: "Il existe plusieurs façons d'investir en Bourse selon votre profil et vos objectifs.",
      methods: [
        {
          title: "En direct",
          description: "Achat d'actions individuelles via un PEA ou CTO.",
          points: [
            "• Plus risqué",
            "• Nécessite du temps",
            "• Demande des connaissances",
            "• Sélection manuelle"
          ]
        },
        {
          title: "Via des fonds / ETF",
          description: "Un ETF réplique la performance d'un indice (ex. CAC 40, S&P 500).",
          points: [
            "• <strong>Diversification automatique</strong>",
            "• Coûts réduits",
            "• Simplicité",
            "• Exemple : ETF MSCI World = 1 500 actions mondiales"
          ]
        },
        {
          title: "Produits structurés",
          description: "Combinent actions et protection partielle du capital.",
          points: [
            "• Réservés aux investisseurs accompagnés",
            "• Protection du capital",
            "• Exposition aux marchés",
            "• Complexité technique"
          ]
        }
      ]
    },
    enveloppes: {
      title: "PEA, CTO ou Assurance-vie : quelle enveloppe pour investir en Bourse ?",
      list: [
        {
          name: "PEA",
          description: "Enveloppe fiscale française, idéale pour investir en actions européennes et ETF éligibles.",
          points: [
            "• Exonération d'impôt après 5 ans",
            "• Limité aux actions européennes",
            "• Plafond : 150 000 €",
            "• Prélèvements sociaux : 17,2%"
          ]
        },
        {
          name: "CTO",
          description: "Accès illimité à toutes les places boursières (US, Asie…), mais fiscalité plus lourde.",
          points: [
            "• Accès mondial",
            "• Pas de plafond",
            "• PFU : 30%",
            "• Flexibilité totale"
          ]
        },
        {
          name: "Assurance-vie",
          description: "Permet d'investir en ETF ou OPCVM tout en optimisant la fiscalité et la transmission.",
          points: [
            "• Fiscalité douce après 8 ans",
            "• Abattement : 4 600 €/9 200 €",
            "• Transmission optimisée",
            "• Diversification"
          ]
        }
      ],
      conclusion: {
        title: "Le choix dépend de vos objectifs :",
        items: [
          { name: "PEA", description: "Long terme fiscalement optimisé" },
          { name: "CTO", description: "Flexibilité totale" },
          { name: "Assurance-vie", description: "Retraite et transmission" }
        ]
      }
    },
    faq: {
      title: "FAQ – Investir en Bourse",
      items: [
        {
          question: "1. Comment débuter en Bourse avec 1 000 € ?",
          answer: "Oui, il est possible de commencer en Bourse avec <strong>1 000 €</strong>.",
          details: "L'idéal est de privilégier un <strong>ETF (fonds indiciel)</strong>, par exemple un ETF qui réplique le <strong>CAC 40</strong> ou le <strong>MSCI World</strong>, afin d'obtenir une <strong>diversification immédiate</strong> sans devoir acheter plusieurs actions individuellement.",
          note: "Avec un PEA ou une assurance-vie, vous pouvez loger cet investissement dans un cadre fiscal optimisé."
        },
        {
          question: "2. Le CAC 40 est-il un bon placement ?",
          answer: "Le <strong>CAC 40</strong> est l'indice phare de la Bourse de Paris, composé des 40 plus grandes entreprises françaises.",
          details: "Investir dans le CAC 40 via un <strong>ETF CAC 40</strong> permet de miser sur l'économie française, mais la diversification reste limitée.",
          note: "Pour équilibrer votre portefeuille, il est conseillé de compléter avec des indices mondiaux (S&P 500, MSCI World)."
        },
        {
          question: "3. Quelle est la différence entre un PEA et un CTO ?",
          answer: "",
          details: "• <strong>PEA</strong> : enveloppe fiscale française, très avantageuse après 5 ans, mais limitée aux actions et ETF européens.<br/>• <strong>CTO</strong> : accès illimité à toutes les places boursières (USA, Asie, marchés émergents), mais fiscalité plus lourde (PFU 30 %).",
          note: "Le PEA est idéal pour le long terme, le CTO pour diversifier sans contrainte géographique."
        },
        {
          question: "4. Peut-on perdre tout son argent en Bourse ?",
          answer: "La Bourse comporte un <strong>risque de perte en capital</strong>.",
          details: "• Si vous investissez dans une seule action, oui, vous pouvez perdre beaucoup si l'entreprise fait faillite.<br/>• Mais en investissant via des <strong>ETF diversifiés</strong>, le risque de perte totale est extrêmement faible.",
          note: "Le secret : investir <strong>progressivement</strong> et <strong>diversifier</strong>."
        },
        {
          question: "5. Quelle fiscalité sur les gains en Bourse ?",
          answer: "",
          details: "• <strong>CTO</strong> : gains taxés au <strong>PFU (30 %)</strong> ou au barème progressif.<br/>• <strong>PEA</strong> : exonération d'impôt après 5 ans (hors prélèvements sociaux de 17,2 %).<br/>• <strong>Assurance-vie</strong> : fiscalité douce après 8 ans avec abattement annuel (4 600 €/9 200 €)."
        },
        {
          question: "6. Faut-il investir en actions ou en ETF ?",
          answer: "",
          details: "• <strong>Actions individuelles</strong> : plus risquées, demandent du temps et des connaissances.<br/>• <strong>ETF</strong> : fonds indiciels qui répliquent un indice (CAC 40, S&P 500, MSCI World), simples, peu chers, diversifiés.",
          note: "Pour un débutant, les <strong>ETF sont la meilleure porte d'entrée</strong> en Bourse."
        },
        {
          question: "7. Combien de temps faut-il investir en Bourse ?",
          answer: "La Bourse est un <strong>placement long terme</strong>.",
          details: "• À court terme (1-2 ans), les marchés peuvent être très volatils.<br/>• Sur 10 ans ou plus, l'histoire montre que la Bourse offre en moyenne <strong>6-8 % de rendement annuel</strong>.",
          note: "Plus l'horizon est long, plus le risque est réduit."
        }
      ],
      conclusion: "Chez <strong>Azalée Patrimoine</strong>, nous accompagnons les épargnants débutants comme les investisseurs confirmés pour construire une stratégie boursière adaptée à leurs objectifs de <strong>performance, fiscalité et transmission</strong>."
    }
  },
  advantagesInconvenients: {
    advantages: {
      title: "Avantages de la Bourse",
      items: [
        {
          title: "Rendement historique supérieur",
          description: "Sur longue durée, la Bourse bat largement les livrets et l'immobilier (moyenne de <strong>7 %/an sur le S&P 500 depuis 50 ans</strong>)."
        },
        {
          title: "Liquidité",
          description: "Vous pouvez acheter/vendre vos titres rapidement."
        },
        {
          title: "Diversification",
          description: "Accès à tous les secteurs et pays."
        },
        {
          title: "Accessibilité",
          description: "Via un PEA, un CTO ou une assurance-vie en unités de compte."
        }
      ]
    },
    inconvenients: {
      title: "Inconvénients et risques",
      items: [
        {
          title: "Volatilité",
          description: "Les cours peuvent fortement fluctuer à court terme."
        },
        {
          title: "Risque de perte en capital",
          description: "Investir en actions n'est jamais garanti."
        },
        {
          title: "Effet psychologique",
          description: "Les débutants paniquent souvent en cas de baisse, et vendent au mauvais moment."
        },
        {
          title: "Fiscalité",
          description: "Hors PEA/assurance-vie, les gains sont taxés au <strong>PFU de 30 %</strong>."
        }
      ]
    }
  },
  approach: {
    title: "La Bourse et la stratégie patrimoniale",
    subtitle: "Chez <strong>Azalée Patrimoine</strong>, nous voyons la Bourse non pas comme un <strong>casino</strong>, mais comme un <strong>levier de construction patrimoniale</strong>.",
    items: [
      {
        title: "Allocation personnalisée",
        description: "Selon votre profil (prudent, équilibré, dynamique).",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      },
      {
        title: "Intégration patrimoniale",
        description: "Avec vos autres actifs (immobilier, épargne retraite, SCPI).",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      },
      {
        title: "Simulations sur mesure",
        description: "De vos revenus futurs en intégrant Bourse + immobilier + retraite.",
        icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      }
    ],
    objective: {
      title: "Objectif",
      description: "Transformer la Bourse en un <strong>outil durable de croissance</strong>, adapté à votre horizon de vie et à vos projets."
    }
  },
  cta: {
    title: "En résumé",
    summary: [
      "La <strong>Bourse</strong> permet d'investir dans l'économie réelle à travers actions, indices et ETF.",
      "Elle offre un <strong>rendement élevé sur le long terme</strong>, mais implique une <strong>volatilité</strong> et un <strong>risque de perte en capital</strong>.",
      "Bien utilisée, elle constitue un <strong>pilier d'une stratégie patrimoniale équilibrée</strong>.",
      "Chez <strong>Azalée Patrimoine</strong>, nous aidons nos clients à :"
    ],
    services: [
      {
        title: "Démarrer sereinement",
        description: "en Bourse",
        icon: "M13 10V3L4 14h7v7l9-11h-7z"
      },
      {
        title: "Choisir la bonne enveloppe",
        description: "(PEA, CTO, Assurance-vie)",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      },
      {
        title: "Construire une stratégie",
        description: "intégrant retraite, transmission et diversification",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      }
    ],
    primaryButton: "Démarrer mon investissement",
    secondaryButton: "Planifiez votre consultation gratuite"
  },
  seo: {
    metaTitle: "La Bourse (actions, CAC 40, indices, ETF) : guide pour débuter | Azalée Patrimoine",
    metaDescription: "Découvrez comment investir en Bourse : actions, indices, ETF, PEA, CTO. Guide complet pour débuter avec Azalée Patrimoine."
  }
};

async function main() {
  console.log('🚀 Initialisation de la page Bourse-Actions dans le CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'placements/bourse-actions';
    const existing = await PageContent.findOne({ path });

    console.log(`Updating page ${path}...`);
    await PageContent.findOneAndUpdate(
      { path },
      {
        path,
        title: 'Bourse, actions et indices',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Page ${path} updated successfully!\n`);

    await mongoose.disconnect();
    console.log('✅ Déconnecté de MongoDB\n');
    console.log('✨ Initialisation terminée !\n');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();


