/**
 * Script pour initialiser le contenu CMS de la page SCPI/OPCI
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

// Import du defaultContent depuis le fichier page.jsx
// Pour simplifier, on le redéfinit ici
const defaultContent = {
  hero: {
    title: "SCPI / OPCI",
    subtitle: "Les <strong>SCPI (Sociétés Civiles de Placement Immobilier)</strong> et les <strong>OPCI (Organismes de Placement Collectif Immobilier)</strong> permettent d'investir dans l'immobilier <strong>sans acheter directement un bien</strong>.",
    description: "L'épargnant acquiert des <strong>parts gérées par une société de gestion</strong>, qui se charge de sélectionner les immeubles, de percevoir les loyers et de les redistribuer sous forme de revenus.",
    note: "Ce sont des solutions d'<strong>immobilier collectif</strong> qui offrent une diversification inaccessible à l'investisseur particulier en direct.",
    primaryButton: "Découvrir nos solutions",
    secondaryButton: "Marché secondaire"
  },
  heroCards: {
    scpi: {
      name: "SCPI",
      description: "Société Civile de Placement Immobilier",
      yield: "5.8%",
      yieldLabel: "Rendement moyen"
    },
    opci: {
      name: "OPCI",
      description: "Organisme de Placement Collectif Immobilier",
      yield: "4.2%",
      yieldLabel: "Rendement moyen"
    }
  },
  chart: {
    title: "Performance des SCPI et OPCI",
    data: [
      { label: "Rendement moyen SCPI", value: "5.8%" },
      { label: "Durée moyenne d'investissement", value: "8-10 ans" },
      { label: "Ticket d'entrée moyen", value: "€5,000" },
      { label: "Frais d'entrée", value: "10-15%" },
      { label: "Performance sur 5 ans", value: "+28.5%" }
    ],
    image: "/images/scpi.webp"
  },
  tabs: [
    { id: "introduction", label: "Introduction" },
    { id: "fiscalite", label: "Intérêt fiscal" },
    { id: "avantages", label: "Avantages" },
    { id: "inconvenients", label: "Inconvénients" },
    { id: "types", label: "Types de SCPI" },
    { id: "azalee", label: "Solution Azalée" }
  ],
  tabContent: {
    introduction: {
      title: "Introduction aux SCPI et OPCI",
      subtitle: "Découvrez les solutions d'investissement immobilier collectif adaptées à vos objectifs patrimoniaux",
      role: {
        title: "Rôle économique",
        description: "Ces solutions d'investissement immobilier collectif jouent un rôle essentiel dans le financement de l'économie française (logement social, collectivités, transition énergétique)."
      }
    },
    fiscalite: {
      title: "Intérêt fiscal des SCPI/OPCI",
      subtitle: "Optimisez votre fiscalité grâce aux différents modes de détention",
      modes: [
        {
          title: "En détention directe",
          description: "Les revenus des SCPI sont imposés comme des <strong>revenus fonciers</strong>, soumis au barème progressif + 17,2 % de prélèvements sociaux."
        },
        {
          title: "Via assurance-vie",
          description: "Fiscalité différée, plus douce, notamment sur les arbitrages."
        },
        {
          title: "En nue-propriété",
          description: "Pas de revenus pendant la durée du démembrement → donc <strong>pas d'imposition</strong>, avec un prix d'achat réduit."
        }
      ]
    },
    avantages: {
      title: "Avantages des SCPI/OPCI",
      subtitle: "Découvrez les atouts de l'investissement immobilier collectif",
      items: [
        {
          title: "Accès simplifié",
          description: "Accès simplifié à l'immobilier tertiaire (bureaux, commerces, logistique, santé…)."
        },
        {
          title: "Diversification",
          description: "Diversification géographique et sectorielle immédiate."
        },
        {
          title: "Mutualisation des risques",
          description: "Mutualisation des risques locatifs : un locataire qui part n'impacte qu'une petite fraction du patrimoine."
        },
        {
          title: "Ticket d'entrée accessible",
          description: "Ticket d'entrée accessible : à partir de quelques milliers d'euros."
        },
        {
          title: "Effet de levier",
          description: "Possibilité de financer à crédit avec effet de levier bancaire."
        }
      ]
    },
    inconvenients: {
      title: "Inconvénients et points de vigilance",
      subtitle: "Les points importants à connaître avant d'investir",
      items: [
        {
          title: "Frais de souscription élevés",
          description: "Autour de <strong>10 % HT</strong>, ce qui oblige à investir long terme pour amortir ces frais.",
          details: "Certaines SCPI \"<strong>0 % frais d'entrée</strong>\" (ex. <strong>Iroko Zen</strong>) appliquent en réalité des <strong>frais de gestion internes plus élevés</strong> → ce modèle n'est pas forcément plus avantageux."
        },
        {
          title: "Liquidité limitée",
          description: "Depuis 2023, certaines SCPI historiques sont devenues <strong>illiquides</strong>, bloquant les rachats."
        },
        {
          title: "Fiscalité lourde",
          description: "<strong>Revenus fiscalisés lourdement</strong> en détention directe (hors enveloppes fiscales)."
        },
        {
          title: "Revalorisation à la baisse",
          description: "<strong>Revalorisation à la baisse des parts</strong> depuis 2023 (Primonial, Perial, Sofidy…), destinée à réaligner les valeurs avec le marché immobilier."
        }
      ]
    },
    types: {
      title: "Les différents types de SCPI",
      subtitle: "Choisissez le type de SCPI adapté à vos objectifs d'investissement",
      list: [
        {
          title: "SCPI de rendement",
          objective: "Objectif : générer des <strong>revenus réguliers</strong>.",
          points: [
            "• Investies dans les bureaux, commerces, santé, logistique",
            "• Exemples : <strong>Immorente (Sofidy)</strong>, <strong>Efimmo 1 (Sofidy)</strong>, <strong>Épargne Pierre (Atland Voisin)</strong>"
          ]
        },
        {
          title: "SCPI fiscales",
          objective: "Objectif : <strong>avantage fiscal immédiat</strong> (Pinel, Malraux, déficit foncier).",
          points: [
            "• Investies dans du résidentiel en France",
            "• Rendement financier plus faible mais avantage fiscal compensateur"
          ]
        },
        {
          title: "SCPI patrimoniales (nue-propriété)",
          objective: "Objectif : <strong>optimiser fiscalité et transmission</strong>.",
          points: [
            "• Achat en nue-propriété avec une décote de 20 à 40 %",
            "• Pas de revenus pendant le démembrement → <strong>zéro fiscalité</strong>",
            "• Au terme, récupération de la pleine propriété sans droits supplémentaires"
          ]
        },
        {
          title: "SCPI internationales",
          objective: "Objectif : investir hors de France (Allemagne, Pays-Bas, Espagne…).",
          points: [
            "• Avantages : diversification économique, fiscalité souvent plus douce",
            "• Exemple : <strong>Novapierre Allemagne (Paref Gestion)</strong>"
          ]
        }
      ]
    },
    azalee: {
      title: "L'action Azalée Patrimoine : retrouver de la liquidité",
      subtitle: "Notre solution innovante pour libérer votre épargne bloquée",
      intro: {
        paragraphs: [
          "Chez <strong>Azalée Patrimoine</strong>, nous avons constaté que de nombreux épargnants de notre <strong>Club</strong> sont immobilisés depuis 2023 dans des SCPI historiques devenues <strong>illiquides</strong>.",
          "Cette situation empêche toute évolution de leur stratégie patrimoniale, notamment pour ceux qui souhaitent :"
        ],
        list: [
          "préparer leur retraite,",
          "financer un projet,",
          "ou optimiser leur transmission <strong>avant 70 ans</strong>."
        ]
      },
      solution: {
        title: "Notre solution : marché secondaire de gré à gré",
        steps: [
          {
            number: "1",
            title: "Mise en relation",
            description: "Acheteurs / vendeurs avec carnet d'ordres interne"
          },
          {
            number: "2",
            title: "Décote maîtrisée",
            description: "~10 % HT pour fluidifier les transactions"
          },
          {
            number: "3",
            title: "Accompagnement",
            description: "Fiscalité, transmission, sécurisation"
          }
        ]
      },
      objective: {
        title: "Objectif",
        description: "Permettre à nos clients <strong>d'éviter d'être \"bloqués\"</strong> et de <strong>continuer à faire évoluer leur stratégie patrimoniale</strong>, plutôt que de subir une immobilisation forcée."
      }
    }
  },
  ranking: {
    title: "Classement des SCPI parmi les plus performantes (S1 2025)",
    subtitle: "Voici un tableau actualisé des SCPI les plus performantes au 1er semestre 2025, avec les rendements déclarés, points forts, et mises en garde.",
    table: {
      headers: ["Rang", "SCPI", "Société de Gestion", "Rendement", "Points Forts / Risques"],
      rows: [
        {
          cells: [
            "1",
            "Comète",
            "Alderan",
            "≈ 11,18%",
            "Très jeune SCPI (2023), stratégie diversifiée, investissements internationaux. Attention : profil de risque plus important."
          ]
        },
        {
          cells: [
            "2",
            "Osmo Énergie",
            "Mata Capital",
            "≈ 9,33%",
            "Entreprise très jeune, forte progression, rendement élevé au départ. Risque sur la pérennité."
          ]
        },
        {
          cells: [
            "3",
            "Mistral Sélection",
            "Swiss Life REIM",
            "≈ 8,59%",
            "SCPI \"sans frais de souscription\", bonne diversification, groupe reconnu. Risque modéré."
          ]
        },
        {
          cells: [
            "4",
            "Transitions Europe",
            "Arkéa REIM",
            "≈ 8,25%",
            "Capitalisation importante, stratégie très européenne. Risques liés à l'évolution macroéconomique."
          ]
        },
        {
          cells: [
            "5",
            "Upeka",
            "Axipit REP",
            "≈ 7,96%",
            "Jeune SCPI, bon positionnement. Moindre historique."
          ]
        }
      ]
    },
    warning: {
      title: "Ce qu'il faut nuancer / risques à connaître",
      items: [
        "• <strong>Actualisation des chiffres</strong> : beaucoup de rendements sont ceux de 2024 et ne se traduisent pas nécessairement sur S1 2025",
        "• <strong>Valeur des parts</strong> : certaines SCPI ont vu leur prix de souscription / valeur des parts baisser en début d'année",
        "• <strong>Liquidité</strong> : dans un contexte de marché tendu, certaines SCPI peuvent avoir des difficultés à racheter des parts",
        "• <strong>Non garanti</strong> : les rendements projetés ou objectifs ne sont pas garantis"
      ]
    }
  },
  comparison: {
    title: "Comparatif SCPI en fonction de l'accès",
    table: {
      headers: ["Critères", "SCPI traditionnelles", "SCPI à 0% frais", "Solution gré à gré Azalée"],
      rows: [
        {
          cells: [
            "Frais de souscription",
            "Environ <strong>10% HT</strong> à l'entrée",
            "0% à la souscription, mais frais de gestion souvent <strong>plus élevés</strong>",
            "Décote à l'entrée portée par le cédant (≈ <strong>10% HT</strong>)"
          ]
        },
        {
          cells: [
            "Frais de gestion annuels",
            "8 à 12% des loyers",
            "Souvent supérieurs (jusqu'à 15% des loyers)",
            "Identiques à ceux des SCPI sous-jacentes"
          ]
        },
        {
          cells: [
            "Liquidité",
            "Limitée, surtout en période de crise (blocage depuis 2023)",
            "Dépend du marché secondaire de la société de gestion",
            "<strong>Marché secondaire interne Azalée</strong> : mise en relation acheteurs/vendeurs"
          ]
        },
        {
          cells: [
            "Horizon conseillé",
            "8 à 12 ans pour amortir les frais d'entrée",
            "Plus flexible mais dépend du rendement net réel",
            "Court / moyen terme → récupération de liquidité pour réinvestir avant 70 ans"
          ]
        },
        {
          cells: [
            "Objectif pour l'épargnant",
            "Revenus réguliers long terme",
            "Revenus rapides, marketing axé sur la \"gratuité\"",
            "<strong>Retrouver de la liquidité</strong> pour continuer à faire évoluer sa stratégie patrimoniale"
          ]
        }
      ]
    }
  },
  opci: {
    title: "Les OPCI : une alternative plus liquide",
    content: [
      {
        title: "Caractéristiques des OPCI",
        items: [
          "<strong>OPCI (Organismes de Placement Collectif Immobilier)</strong> : proches des SCPI mais investis à la fois en immobilier direct et en actifs financiers (actions, obligations, liquidités).",
          "Objectif : offrir une <strong>meilleure liquidité</strong> (rachat sous quelques jours).",
          "Contrepartie : plus de <strong>volatilité</strong>, car sensibles aux marchés financiers.",
          "Fiscalité : similaire aux fonds classiques (OPCVM) en assurance-vie."
        ]
      },
      {
        title: "Crise de liquidité et ajustement du marché",
        description: "Depuis 2023, le marché des SCPI traverse une <strong>crise de liquidité</strong> :",
        items: [
          "La hausse des taux d'intérêt a fait <strong>baisser la valeur des actifs immobiliers</strong>",
          "Les demandes de rachat se sont multipliées → certaines SCPI historiques n'arrivent plus à offrir de liquidité",
          "Résultat : des <strong>revalorisations à la baisse</strong> des parts, qui assainissent le marché à long terme mais impactent les portefeuilles à court terme"
        ]
      }
    ]
  },
  cta: {
    title: "En résumé",
    summary: [
      "Les SCPI restent un outil puissant de diversification immobilière, mais avec des <strong>frais, une fiscalité et une liquidité à surveiller</strong>.",
      "Les OPCI offrent une alternative plus liquide mais plus volatile.",
      "Depuis 2023, la crise de liquidité a mis en évidence la <strong>fragilité du marché secondaire</strong>.",
      "Avec son service de <strong>vente de gré à gré</strong>, <strong>Azalée Patrimoine</strong> offre une <strong>solution concrète et innovante</strong> pour aider ses clients à <strong>retrouver de la liberté</strong> dans leur allocation patrimoniale."
    ],
    primaryButton: "Découvrir notre marché secondaire",
    secondaryButton: "Planifiez votre consultation gratuite"
  },
  seo: {
    metaTitle: "SCPI / OPCI : investissement immobilier collectif | Azalée Patrimoine",
    metaDescription: "Découvrez les SCPI et OPCI : avantages, fiscalité, types, liquidité. Solution marché secondaire Azalée Patrimoine pour retrouver de la liquidité."
  }
};

async function main() {
  console.log('🚀 Initialisation de la page SCPI/OPCI dans le CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'placements/scpi-opci';
    const existing = await PageContent.findOne({ path });

    console.log(`Updating page ${path}...`);
    await PageContent.findOneAndUpdate(
      { path },
      {
        path,
        title: 'SCPI / OPCI',
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

