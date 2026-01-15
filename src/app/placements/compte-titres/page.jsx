"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/common/Footer";

export const defaultContent = {
  hero: {
    title: "Compte-Titres Ordinaire (CTO) : définition, fiscalité et stratégie",
    subtitle: "Le Compte-Titres Ordinaire (CTO) est l'enveloppe d'investissement la plus flexible disponible en France. Contrairement au PEA (Plan d'Épargne en Actions) ou à l'assurance-vie, il n'impose aucune limite de versement et permet d'investir dans tous les marchés financiers mondiaux.",
    description: "Le CTO est donc l'outil idéal pour diversifier et élargir son univers d'investissement.",
    button: "Demander une étude patrimoniale gratuite",
    image: "/images/compte-titres-hero.jpg"
  },
  definition: {
    title: "Qu'est-ce qu'un CTO ?",
    description: "Le Compte-Titres Ordinaire (CTO) est l'enveloppe d'investissement la plus flexible disponible en France. Contrairement au PEA (Plan d'Épargne en Actions) ou à l'assurance-vie, il n'impose aucune limite de versement et permet d'investir dans tous les marchés financiers mondiaux.",
    contenus: [
      "Actions françaises et internationales",
      "Obligations",
      "ETF (trackers) et fonds indiciels",
      "Produits structurés",
      "OPCVM et SICAV",
      "Dérivés financiers (options, turbos, warrants)"
    ],
    conclusion: "Le CTO est donc l'outil idéal pour diversifier et élargir son univers d'investissement."
  },
  fiscalite: {
    title: "Fiscalité du CTO",
    description: "Le CTO n'offre pas de régime fiscal privilégié. Ses revenus et plus-values sont imposés chaque année :",
    points: [
      "PFU (Prélèvement Forfaitaire Unique) de 30% : 12,8% d'impôt + 17,2% de prélèvements sociaux",
      "Option pour le barème progressif : possible si votre taux marginal est inférieur ou si vous bénéficiez d'abattements"
    ],
    conclusion: "Contrairement à l'assurance-vie ou au PEA, il n'existe aucun mécanisme de capitalisation différée : les gains sont fiscalisés immédiatement."
  },
  avantages: {
    title: "Les avantages du CTO",
    points: [
      "Aucune limite de versement : liberté totale d'investissement",
      "Accès illimité aux marchés financiers : actions, obligations, ETF, produits structurés, fonds spécialisés",
      "Outil de diversification indispensable pour aller au-delà des restrictions des autres enveloppes fiscales",
      "Flexibilité totale : pas de durée minimale de détention",
      "Accès à des stratégies avancées (spéculation, couverture, arbitrages internationaux)"
    ]
  },
  inconvenients: {
    title: "Les inconvénients du CTO",
    points: [
      "Fiscalité lourde : 30% sur chaque gain (hors option pour le barème progressif)",
      "Pas de cadre successoral avantageux (contrairement à l'assurance-vie ou au contrat de capitalisation)",
      "Moins intéressant utilisé seul : le CTO doit généralement être pensé en complément d'un PEA et/ou d'une assurance-vie",
      "Peut générer une pression psychologique liée à la volatilité et à l'absence de capitalisation différée"
    ]
  },
  speculation: {
    title: "Spéculation avec un CTO : pour les investisseurs avertis",
    description: "L'un des grands intérêts du CTO est d'offrir la possibilité d'accéder à des produits de spéculation :",
    produits: [
      "Options (stratégies de couverture ou de levier)",
      "Turbos et warrants",
      "Vente à découvert pour parier sur la baisse d'un actif"
    ],
    avantage: "Ces outils permettent de multiplier les gains potentiels mais exposent également à des pertes rapides et totales.",
    profil: "Ils s'adressent uniquement à des investisseurs :",
    conditions: [
      "disposant d'un haut degré de connaissance des marchés financiers",
      "capables d'assumer une forte volatilité",
      "et préparés psychologiquement à la possibilité de tout perdre"
    ],
    conclusion: "Ce type d'approche ne relève pas de la gestion de patrimoine traditionnelle, mais peut être intégré dans une stratégie d'investissement personnelle pour des profils très dynamiques."
  },
  utilisation: {
    title: "Quand utiliser un CTO ?",
    description: "Le CTO est particulièrement adapté pour :",
    cas: [
      "Accéder aux marchés internationaux et à des actifs non éligibles au PEA",
      "Investir sans plafond de versement",
      "Diversifier son patrimoine au-delà de l'assurance-vie",
      "Mettre en place des stratégies sophistiquées (obligations internationales, produits structurés, trading actif)"
    ]
  },
  comparaison: {
    title: "CTO ou Assurance-vie ?",
    tableau: [
      { critere: "Fiscalité", cto: "PFU 30% immédiat", assurance: "Différée, allégée après 8 ans" },
      { critere: "Versements", cto: "Illimités", assurance: "Illimités mais souvent encadrés par les assureurs" },
      { critere: "Supports", cto: "Tous (actions, ETF, obligations, produits spéculatifs)", assurance: "Fonds euros, UC, ETF, SCPI" },
      { critere: "Transmission", cto: "Aucune optimisation", assurance: "Avantages fiscaux majeurs" }
    ],
    conclusion: "En pratique, le CTO est rarement un concurrent direct de l'assurance-vie. Les deux enveloppes sont complémentaires dans une stratégie patrimoniale bien structurée."
  },
  conseil: {
    title: "Notre conseil Azalée Patrimoine",
    description: "Chez Azalée Patrimoine, nous intégrons le CTO comme un outil de diversification et de liberté dans une stratégie patrimoniale globale.",
    strategie: "Il est pertinent pour élargir son horizon d'investissement, mais doit être équilibré par des solutions fiscalement optimisées (assurance-vie, PEA, PER).",
    conclusion: "Pour la plupart des clients, le CTO est donc un complément stratégique, tandis que pour les investisseurs avertis, il peut devenir un terrain de jeu pour la spéculation et l'innovation financière."
  },
  faq: {
    title: "FAQ – Compte-Titres Ordinaire (CTO)",
    questions: [
      {
        question: "Quelle est la fiscalité d'un CTO en France ?",
        answer: "Les gains (plus-values, dividendes, intérêts) sont soumis par défaut au PFU de 30% (12,8% d'impôt + 17,2% de prélèvements sociaux). Vous pouvez opter pour le barème progressif de l'impôt sur le revenu si cela est plus avantageux. Contrairement à l'assurance-vie, la fiscalité est immédiate.",
        precision: "Spécificité importante : les moins-values réalisées sur un CTO sont reportables pendant 10 ans. Elles peuvent venir s'imputer sur vos futures plus-values mobilières, ce qui permet de réduire la fiscalité des gains ultérieurs.",
        exemple: "Exemple simple : En 2025, vous vendez une action avec une perte de 5 000€. En 2026, vous réalisez une plus-value de 8 000€. Vous ne serez imposé que sur la différence, soit 3 000€, et non 8 000€."
      },
      {
        question: "Quelle différence entre CTO et PEA ?",
        answer: "Le Compte-Titres Ordinaire (CTO) et le Plan d'Épargne en Actions (PEA) sont deux enveloppes d'investissement complémentaires, mais leurs règles diffèrent fortement.",
        points: [
          "Univers d'investissement : CTO = tous les marchés mondiaux, PEA = actions et ETF européens éligibles",
          "Fiscalité : CTO = immédiate (PFU 30%), PEA = exonération après 5 ans",
          "Plafonds : CTO = illimité, PEA = 150 000€",
          "Non coté : PEA permet d'investir dans des sociétés non cotées européennes"
        ],
        conclusion: "Pour un investisseur averti, la bonne stratégie consiste souvent à utiliser les deux de façon complémentaire : un PEA pour la fiscalité long terme, un CTO pour diversifier et accéder à l'international."
      },
      {
        question: "Peut-on spéculer avec un CTO ?",
        answer: "Oui. Le Compte-Titres Ordinaire (CTO) est la seule enveloppe qui permet d'accéder à des produits spéculatifs et à des stratégies de marché avancées, interdites dans le cadre d'un PEA ou d'une assurance-vie.",
        produits: [
          "Options : contrats financiers pour couvrir ou spéculer avec effet de levier",
          "Turbos et warrants : produits dérivés cotés qui amplifient les variations",
          "CFD : instruments à effet de levier pour miser sur la hausse ou la baisse",
          "Vente à découvert : vendre un titre que l'on ne possède pas"
        ],
        risques: [
          "Effet de levier : peut multiplier gains et pertes",
          "Volatilité extrême : valeur peut passer de +100% à -100% en quelques heures",
          "Perte totale du capital investi",
          "Pression psychologique"
        ],
        profil: "La spéculation via CTO s'adresse uniquement aux investisseurs disposant d'un haut degré de connaissance des marchés financiers, maîtrisant les notions de couverture, levier et volatilité, capables de supporter psychologiquement le risque de perte totale."
      },
      {
        question: "Le CTO est-il adapté à la transmission patrimoniale ?",
        answer: "Non. Contrairement à l'assurance-vie ou au contrat de capitalisation, le CTO n'offre aucun avantage successoral.",
        transmission: "En cas de décès, les titres détenus sur un CTO sont intégrés dans la succession classique et taxés selon le barème des droits de mutation à titre gratuit (DMTG), après application des abattements légaux.",
        donation: "Si le CTO n'a pas de régime fiscal particulier en matière successorale, il peut toutefois être utilisé dans une stratégie de transmission par donation :",
        strategies: [
          "Donation en pleine propriété : transmission des titres avec abattements et réinitialisation du prix d'acquisition",
          "Donation en nue-propriété avec réserve d'usufruit : conservation des revenus tout en anticipant la transmission"
        ],
        avantage: "Cette stratégie est particulièrement intéressante si les titres ont déjà pris beaucoup de valeur dans le CTO, car la donation permet de purger la plus-value latente."
      },
      {
        question: "Quelle est la meilleure stratégie avec un CTO ?",
        answer: "Chez Azalée Patrimoine, nous conseillons d'utiliser le CTO en complément d'autres enveloppes fiscales (PEA, assurance-vie, PER). C'est un outil de diversification et de liberté, utile pour accéder à certains marchés, mais rarement suffisant seul."
      }
    ]
  },
  cta: {
    title: "Contactez un conseiller Azalée Patrimoine",
    subtitle: "pour optimiser votre stratégie d'investissement avec un CTO",
    email: "contact@azalee-patrimoine.fr",
    primaryButton: "Demander une étude gratuite",
    secondaryButton: "Planifiez votre consultation gratuite"
  }
};

export default function CompteTitresPage() {
  const [content, setContent] = useState(defaultContent);
  const [activeTab, setActiveTab] = useState("definition");
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const articleContent = {
    title: "CTO à bas coûts : le vrai prix caché du trading low-cost",
    sections: [
      {
        title: "Introduction : la promesse du trading \"gratuit\"",
        content: "Depuis quelques années, des plateformes comme Trade Republic, Revolut, ou encore Robinhood aux États-Unis séduisent des millions d'épargnants avec une promesse simple :",
        highlight: "\"Investissez sans frais, sans commission, depuis votre smartphone.\"",
        explanation: "À première vue, l'offre paraît irrésistible : pourquoi payer 10 € de courtage chez une banque traditionnelle quand on vous propose la même action \"gratuitement\" ? Mais en finance, rien n'est jamais vraiment gratuit. Derrière l'écran marketing, il existe des mécanismes complexes de rémunération qui impactent directement l'épargnant final. Et souvent, ces coûts cachés dépassent ce qu'on croyait économiser."
      },
      {
        title: "1. Comment ces plateformes se rémunèrent ?",
        content: "Les acteurs du trading low-cost n'inventent pas l'argent. Ils se financent autrement. Voici les trois principaux canaux de revenus :",
        subsections: [
          {
            title: "1.1 Le spread : la marge invisible",
            content: "Le spread est l'écart entre le prix d'achat et le prix de vente d'un actif.",
            example: "Exemple concret : Une action est cotée 100 € sur le marché. Le courtier low-cost vous la propose à 100,20 € (cours acheteur). Si vous la revendez aussitôt, il vous la rachète 99,80 € (cours vendeur).",
            highlight: "La différence de 0,40 € est le spread, dont une partie rémunère le courtier.",
            conclusion: "En apparence, vous n'avez payé aucune commission, mais vous avez déjà perdu 0,40 % de votre investissement. Multipliez cela par des dizaines d'ordres chaque mois et la facture grimpe rapidement."
          },
          {
            title: "1.2 Le paiement pour flux d'ordres (PFOF)",
            content: "Le Payment For Order Flow (PFOF) est une pratique importée des États-Unis.",
            points: [
              "Les courtiers low-cost redirigent vos ordres vers des market makers (intermédiaires financiers spécialisés)",
              "Ces derniers paient le courtier pour recevoir vos ordres"
            ],
            consequences: [
              "Vous ne bénéficiez pas toujours du meilleur prix d'exécution",
              "Le courtier a un conflit d'intérêt : est-il motivé par votre intérêt (acheter/vendre au meilleur prix) ou par la commission qu'il reçoit du market maker ?"
            ],
            note: "La SEC américaine (autorité des marchés) a déjà ouvert plusieurs enquêtes sur cette pratique, qui fragilise la transparence des marchés."
          },
          {
            title: "1.3 Les frais annexes cachés",
            content: "Si la commission est affichée comme \"zéro\", d'autres frais existent :",
            fees: [
              "Conversion de devises : acheter une action Apple en dollars via Trade Republic implique souvent un coût de change, parfois 1 % ou plus",
              "Frais d'inactivité : certains courtiers facturent si vous ne tradez pas assez",
              "Frais de retrait : jusqu'à plusieurs dizaines d'euros pour rapatrier vos fonds",
              "Frais de garde spécifiques : sur certains produits complexes"
            ],
            conclusion: "Au final, l'addition peut être plus salée qu'avec un courtier traditionnel qui facture un courtage transparent mais optimise l'exécution."
          }
        ]
      },
      {
        title: "2. Pourquoi c'est problématique pour l'épargnant final ?",
        content: "Ces coûts cachés ont des impacts concrets sur la performance de votre épargne :",
        impacts: [
          {
            title: "2.1 L'illusion du gratuit",
            content: "Vous pensez économiser 5 à 10 € de frais de courtage. En réalité, vous perdez parfois bien plus sur le spread ou le taux de conversion."
          },
          {
            title: "2.2 Une mauvaise exécution",
            content: "Acheter systématiquement un peu plus cher et vendre un peu moins bien réduit mécaniquement votre performance. Sur un portefeuille actif, cela peut coûter plusieurs centaines d'euros par an."
          },
          {
            title: "2.3 L'incitation à spéculer",
            content: "Les plateformes low-cost proposent facilement : options, turbos, cryptomonnaies, la vente à découvert. Elles gamifient parfois l'investissement, avec des notifications et une interface proche d'un jeu. Mais la finance n'est pas un jeu : les pertes peuvent être rapides et définitives."
          },
          {
            title: "2.4 Absence de conseil",
            content: "Un CTO ouvert chez un courtier low-cost n'est qu'un outil transactionnel. Aucun accompagnement stratégique, aucune réflexion patrimoniale. Or, investir sans stratégie, c'est un peu comme partir en mer sans boussole : séduisant au départ, risqué à l'arrivée."
          }
        ]
      },
      {
        title: "3. Les enjeux fiscaux et patrimoniaux",
        content: "Au-delà des frais, la fiscalité est un sujet trop souvent ignoré dans les messages marketing.",
        subsections: [
          {
            title: "3.1 La fiscalité du CTO",
            points: [
              "Plus-values et dividendes soumis au PFU (flat tax) de 30 %",
              "Ou imposition au barème progressif sur option"
            ],
            note: "Fiscalité immédiate, contrairement à l'assurance-vie ou au PEA."
          },
          {
            title: "3.2 Le report des moins-values",
            content: "Bonne nouvelle : les pertes réalisées sur un CTO peuvent être reportées pendant 10 ans et imputées sur les plus-values futures.",
            example: "Exemple : 2025 : -5 000 € de perte, 2026 : +8 000 € de gain. Vous n'êtes imposé que sur 3 000 €.",
            note: "Mais encore faut-il savoir l'utiliser… Ce point est souvent totalement absent des discours des courtiers low-cost."
          },
          {
            title: "3.3 Transmission et donation",
            points: [
              "En cas de décès, les titres du CTO intègrent la succession classique",
              "Pas d'avantage successoral comme en assurance-vie",
              "Seule possibilité : anticiper via donation de titres (pleine propriété ou nue-propriété), ce qui permet de purger les plus-values latentes"
            ],
            note: "Là encore, ce type de stratégie ne sera jamais expliqué par une plateforme \"zéro frais\"."
          }
        ]
      },
      {
        title: "4. CTO low-cost vs CTO patrimonial",
        content: "Comparaison des deux approches :",
        comparison: [
          { critere: "Frais affichés", lowcost: "Zéro ou très faibles", patrimonial: "Frais de courtage transparents (5–10 €)" },
          { critere: "Frais cachés", lowcost: "Spreads, conversion devises, inactivité", patrimonial: "Limités, transparence contractuelle" },
          { critere: "Qualité d'exécution", lowcost: "Aléatoire (PFOF)", patrimonial: "Optimisée, souvent accès direct aux marchés" },
          { critere: "Accès aux produits", lowcost: "Large (ETF, actions, cryptos, turbos)", patrimonial: "Large, + produits structurés et non coté" },
          { critere: "Conseil patrimonial", lowcost: "Aucun", patrimonial: "Oui (fiscalité, transmission, stratégie)" },
          { critere: "Objectif principal", lowcost: "Trading actif, court terme", patrimonial: "Gestion de patrimoine, long terme" }
        ]
      },
      {
        title: "5. La vision Azalée Patrimoine",
        content: "Chez Azalée Patrimoine, nous ne considérons pas le CTO comme un simple compte de trading.",
        approach: "C'est un outil stratégique qui doit s'intégrer dans une réflexion globale :",
        points: [
          "Optimisation fiscale (report des moins-values, arbitrage CTO/PEA/AV)",
          "Gestion du risque et diversification",
          "Transmission (donation de titres, intégration dans une stratégie familiale)",
          "Accès à des solutions sophistiquées (produits structurés, private equity)"
        ],
        conviction: "Notre conviction est simple :",
        conclusions: [
          "Un courtier low-cost peut convenir pour un investisseur qui veut \"jouer en Bourse\"",
          "Mais pour un épargnant qui souhaite construire, protéger et transmettre son patrimoine, seule une approche professionnelle et transparente a du sens"
        ]
      },
      {
        title: "Conclusion : le vrai prix du trading low-cost",
        content: "Le trading \"gratuit\" n'existe pas.",
        reality: "Les frais sont simplement cachés dans le spread, les conversions, la qualité d'exécution.",
        question: "Pour l'épargnant, la vraie question n'est pas :",
        wrongQuestion: "\"Combien je paie par ordre ?\"",
        rightQuestion: "mais : \"Quelle performance nette, quelle sécurité et quelle stratégie patrimoniale pour mon capital ?\"",
        finalNote: "Et c'est précisément là que la différence se fait entre un CTO low-cost marketing et un CTO patrimonial structuré avec Azalée."
      }
    ]
  };

  const faqContent = {
    title: "FAQ SEO – CTO à bas coûts et trading low-cost",
    questions: [
      {
        question: "Un CTO gratuit, est-ce vraiment sans frais ?",
        answer: "Non. Même si certains courtiers affichent \"0 € de commission\", ils se rémunèrent autrement : via le spread (écart achat/vente), les frais de conversion de devises ou le paiement pour flux d'ordres (PFOF). Ces coûts sont invisibles mais bien réels."
      },
      {
        question: "Comment Trade Republic et les courtiers low-cost gagnent-ils de l'argent ?",
        answer: "Ils se rémunèrent principalement grâce au spread et au PFOF : vos ordres sont redirigés vers des market makers qui reversent une partie de leur marge au courtier. Cela peut impacter la qualité d'exécution de vos transactions."
      },
      {
        question: "Quelle est la fiscalité d'un CTO en France ?",
        answer: "Les plus-values et dividendes d'un CTO sont soumis au PFU (flat tax) de 30 % ou, sur option, au barème progressif. Contrairement au PEA ou à l'assurance-vie, la fiscalité est immédiate."
      },
      {
        question: "Peut-on reporter ses pertes (moins-values) avec un CTO ?",
        answer: "Oui. Les pertes réalisées sur un CTO sont reportables pendant 10 ans et peuvent s'imputer sur vos futures plus-values mobilières. C'est un levier fiscal souvent méconnu."
      },
      {
        question: "Quelle différence entre un CTO et un PEA ?",
        answer: "Le CTO donne accès à tous les marchés (actions internationales, obligations, ETF, produits structurés, turbos…), sans plafond de versement, mais avec une fiscalité lourde. Le PEA est limité aux titres européens et plafonné à 150 000 €, mais sa fiscalité est très avantageuse après 5 ans."
      },
      {
        question: "Peut-on spéculer avec un CTO ?",
        answer: "Oui. Le CTO est la seule enveloppe permettant d'utiliser des options, turbos, warrants ou la vente à découvert. Ces produits sont réservés aux investisseurs avertis, capables d'assumer un risque de perte totale."
      },
      {
        question: "Le CTO est-il adapté à la transmission patrimoniale ?",
        answer: "Non. En cas de décès, les titres d'un CTO intègrent la succession classique et sont taxés aux droits de mutation. En revanche, une donation de titres peut être utilisée pour purger les plus-values latentes et anticiper la transmission."
      }
    ]
  };

  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=placements/compte-titres&t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setContent((prev) => ({ ...prev, ...data.content }));
          }
        }
      } catch (error) {
        console.error("Failed to load CMS content", error);
      }
    };

    loadContent();

    // Listen for CMS updates
    const handleCMSUpdate = () => {
      loadContent();
    };
    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Main Title */}
              <h1 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero.title}
              </h1>
              
              {/* Description */}
              <p className="text-[#374151] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                {content.hero.subtitle}
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  {content.hero.button}
                </button>
              </div>
            </div>
            
            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  CTO : Flexibilité maximale
                </h2>
              </div>
              
              {/* Floating Price Card */}
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">100% →<br /></span>
                  <span className="sm:hidden">100%</span>
                  <span className="hidden sm:block">Flexible</span>
                </div>
              </div>
              
              {/* Services List */}
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Aucune limite de versement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Tous les marchés financiers mondiaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Produits spéculatifs accessibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Diversification maximale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("definition")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "definition"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Définition
            </button>
            <button
              onClick={() => setActiveTab("fiscalite")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "fiscalite"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Fiscalité
            </button>
            <button
              onClick={() => setActiveTab("avantages")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "avantages"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Avantages
            </button>
            <button
              onClick={() => setActiveTab("speculation")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "speculation"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Spéculation
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "faq"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              FAQ
            </button>
          </div>
              </div>
      </section>

      {/* Definition Section */}
      {activeTab === "definition" && (
        <div className="space-y-12">
          <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  {content.definition.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  {content.definition.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {content.definition.contenus.map((contenu, index) => (
                  <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <p className="text-white text-base font-inter leading-relaxed">{contenu}</p>
                    </div>
                  </div>
                ))}
            </div>

              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <p className="text-xl sm:text-2xl font-cairo font-bold"> {content.definition.conclusion}</p>
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Avantages et Inconvénients */}
          <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Avantages et Inconvénients
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold">{content.avantages.title.replace(/✅\s*/, '')}</h3>
                  </div>
                  <ul className="space-y-4">
                    {content.avantages.points.map((point, index) => (
                      <li key={index} className="text-[#253F60] text-base flex items-start gap-3 leading-relaxed">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold">{content.inconvenients.title.replace(/⚠️\s*/, '')}</h3>
                  </div>
                  <ul className="space-y-4">
                    {content.inconvenients.points.map((point, index) => (
                      <li key={index} className="text-[#253F60] text-base flex items-start gap-3 leading-relaxed">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Utilisation */}
          <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  {content.utilisation.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  {content.utilisation.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {content.utilisation.cas.map((cas, index) => (
                  <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <p className="text-white text-base font-inter leading-relaxed">{cas}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Fiscalité Section */}
      {activeTab === "fiscalite" && (
        <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
              {content.fiscalite.title}
            </h2>
            <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
              {content.fiscalite.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {content.fiscalite.points.map((point, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-3">
                    <p className="text-[#253F60] text-sm font-medium">{point}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
              <p className="text-lg font-medium"> {content.fiscalite.conclusion}</p>
            </div>
          </div>
        </section>
      )}

      {/* Avantages Section */}
      {activeTab === "avantages" && (
        <div className="space-y-12">
          <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
                {content.avantages.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.avantages.points.map((point, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#253F60] text-sm font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 bg-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
                {content.inconvenients.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.inconvenients.points.map((point, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-3">
                      <p className="text-[#253F60] text-sm font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparaison CTO vs Assurance-vie */}
          <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
                {content.comparaison.title}
              </h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Critère</th>
                        <th className="px-6 py-4 text-left font-semibold">CTO</th>
                        <th className="px-6 py-4 text-left font-semibold">Assurance-vie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparaison.tableau.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-6 py-4 font-medium text-[#253F60]">{row.critere}</td>
                          <td className="px-6 py-4 text-[#253F60]">{row.cto}</td>
                          <td className="px-6 py-4 text-[#253F60]">{row.assurance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>

              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center mt-8">
                <p className="text-lg font-medium"> {content.comparaison.conclusion}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Spéculation Section */}
      {activeTab === "speculation" && (
        <div className="space-y-12">
          <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
                {content.speculation.title}
              </h2>
              <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.speculation.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {content.speculation.produits.map((produit, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#253F60] text-sm font-medium">{produit}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#B99066] to-[#FFB263] rounded-xl p-8 text-white mb-8">
                <p className="text-lg font-medium">{content.speculation.avantage}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-[#253F60] text-lg font-semibold mb-4">{content.speculation.profil}</h3>
                <ul className="space-y-3">
                  {content.speculation.conditions.map((condition, index) => (
                    <li key={index} className="text-[#253F60] text-sm flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                      {condition}
                    </li>
                  ))}
                </ul>
            </div>

              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
                <p className="text-lg font-medium"> {content.speculation.conclusion}</p>
              </div>
            </div>
          </section>

          {/* Conseil Azalée */}
          <section className="py-12 bg-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
                {content.conseil.title}
              </h2>
              <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.conseil.description}
              </p>
              
              <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-8 mb-8">
                <p className="text-[#253F60] text-lg font-medium mb-6 text-center">
                  {content.conseil.strategie}
              </p>
            </div>

              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
                <p className="text-lg font-medium"> {content.conseil.conclusion}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
              {content.faq.title}
            </h2>
            <div className="space-y-6">
              {content.faq.questions.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-[#253F60] text-lg font-semibold mb-4">{faq.question}</h3>
                  <p className="text-[#374151] text-sm mb-4">{faq.answer}</p>
                  
                  {faq.precision && (
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white mb-4">
                      <p className="text-sm font-medium"> {faq.precision}</p>
                    </div>
                  )}
                  
                  {faq.exemple && (
                    <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-4 mb-4">
                      <p className="text-[#253F60] text-sm font-medium">{faq.exemple}</p>
                    </div>
                  )}
                  
                  {faq.points && (
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {faq.points.map((point, idx) => (
                          <li key={idx} className="text-[#253F60] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {faq.produits && (
                    <div className="mb-4">
                      <h4 className="text-[#253F60] text-sm font-semibold mb-2">Produits spéculatifs accessibles :</h4>
                      <ul className="space-y-2">
                        {faq.produits.map((produit, idx) => (
                          <li key={idx} className="text-[#253F60] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                            {produit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {faq.risques && (
                    <div className="mb-4">
                      <h4 className="text-[#253F60] text-sm font-semibold mb-2">Risques :</h4>
                      <ul className="space-y-2">
                        {faq.risques.map((risque, idx) => (
                          <li key={idx} className="text-[#253F60] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                            {risque}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {faq.profil && (
                    <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-4 mb-4">
                      <p className="text-[#253F60] text-sm font-medium">{faq.profil}</p>
                    </div>
                  )}
                  
                  {faq.transmission && (
                    <div className="mb-4">
                      <p className="text-[#253F60] text-sm">{faq.transmission}</p>
                    </div>
                  )}
                  
                  {faq.donation && (
                    <div className="mb-4">
                      <p className="text-[#253F60] text-sm">{faq.donation}</p>
                    </div>
                  )}
                  
                  {faq.strategies && (
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {faq.strategies.map((strategie, idx) => (
                          <li key={idx} className="text-[#253F60] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                            {strategie}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {faq.avantage && (
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white">
                      <p className="text-sm font-medium"> {faq.avantage}</p>
                    </div>
                  )}
                  
                  {faq.conclusion && (
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white">
                      <p className="text-sm font-medium"> {faq.conclusion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Articles SEO */}
            <div className="mt-12">
              <h3 className="text-[#253F60] text-xl font-semibold text-center mb-8">
                Articles complémentaires
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#253F60]">
                  <div className="flex items-start gap-3">
                    <div>
                      <h4 className="text-[#253F60] text-lg font-semibold mb-2">
                        CTO à bas coûts : le vrai prix caché du trading low-cost
                      </h4>
                      <p className="text-[#374151] text-sm mb-4">
                        Découvrez les vrais coûts cachés des CTO low-cost et comment optimiser vos frais de trading.
                      </p>
                      <button 
                        onClick={() => setShowArticleModal(true)}
                        className="text-[#253F60] font-semibold text-sm hover:underline"
                      >
                        Lire l'article →
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#B99066]">
                  <div className="flex items-start gap-3">
                    <div>
                      <h4 className="text-[#253F60] text-lg font-semibold mb-2">
                        FAQ SEO – CTO à bas coûts et trading low-cost
                      </h4>
                      <p className="text-[#374151] text-sm mb-4">
                        Questions fréquentes sur les CTO low-cost, les frais cachés et les stratégies d'optimisation.
                      </p>
                      <button 
                        onClick={() => setShowFaqModal(true)}
                        className="text-[#B99066] font-semibold text-sm hover:underline"
                      >
                        Consulter la FAQ →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F2F2F2] to-[#E5E5E5]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <h2 className="text-[#253F60] text-2xl lg:text-3xl font-semibold mb-4">
              {content.cta.title}
          </h2>
            <p className="text-[#374151] text-lg mb-8 max-w-3xl mx-auto">
              {content.cta.subtitle}
            </p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-semibold mb-3">{content.cta.email}</h3>
              <p className="text-sm opacity-90">Optimisation de votre stratégie d'investissement</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 text-lg"
              >
                {content.cta.primaryButton}
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="border-2 border-[#253F60] text-[#253F60] px-8 py-4 rounded-lg font-medium hover:bg-[#253F60] hover:text-white transition-colors duration-200 text-lg"
              >
                {content.cta.secondaryButton}
          </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-[#253F60] text-2xl font-semibold">
                {articleContent.title}
              </h2>
              <button 
                onClick={() => setShowArticleModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {articleContent.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-[#253F60] text-xl font-semibold">
                    {section.title}
                  </h3>
                  
                  {section.content && (
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {section.content}
                    </p>
                  )}
                  
                  {section.highlight && (
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white">
                      <p className="text-sm font-medium"> {section.highlight}</p>
                    </div>
                  )}
                  
                  {section.explanation && (
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {section.explanation}
                    </p>
                  )}
                  
                  {section.subsections && (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-[#253F60] text-lg font-semibold mb-3">
                            {subsection.title}
                          </h4>
                          
                          {subsection.content && (
                            <p className="text-[#374151] text-sm leading-relaxed mb-3">
                              {subsection.content}
                            </p>
                          )}
                          
                          {subsection.example && (
                            <div className="bg-white rounded-lg p-3 mb-3">
                              <p className="text-[#374151] text-sm font-medium">
                                {subsection.example}
                              </p>
                            </div>
                          )}
                          
                          {subsection.highlight && (
                            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-3 mb-3 text-white">
                              <p className="text-sm font-medium"> {subsection.highlight}</p>
                            </div>
                          )}
                          
                          {subsection.points && (
                            <ul className="space-y-2 mb-3">
                              {subsection.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="text-[#374151] text-sm flex items-start gap-2">
                                  <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          {subsection.consequences && (
                            <div className="mb-3">
                              <p className="text-[#374151] text-sm font-medium mb-2">Conséquences :</p>
                              <ul className="space-y-1">
                                {subsection.consequences.map((consequence, consIndex) => (
                                  <li key={consIndex} className="text-[#374151] text-sm flex items-start gap-2">
                                    <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                                    {consequence}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {subsection.fees && (
                            <ul className="space-y-2 mb-3">
                              {subsection.fees.map((fee, feeIndex) => (
                                <li key={feeIndex} className="text-[#374151] text-sm flex items-start gap-2">
                                  <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                                  {fee}
                                </li>
                              ))}
                            </ul>
                          )}
                          
                          {subsection.note && (
                            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-3 text-white">
                              <p className="text-sm font-medium"> {subsection.note}</p>
                            </div>
                          )}
                          
                          {subsection.conclusion && (
                            <p className="text-[#374151] text-sm leading-relaxed">
                              {subsection.conclusion}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.impacts && (
                    <div className="space-y-4">
                      {section.impacts.map((impact, impactIndex) => (
                        <div key={impactIndex} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-[#253F60] text-lg font-semibold mb-2">
                            {impact.title}
                          </h4>
                          <p className="text-[#374151] text-sm leading-relaxed">
                            {impact.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.comparison && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] text-white">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Critère</th>
                              <th className="px-4 py-3 text-left font-semibold">CTO low-cost</th>
                              <th className="px-4 py-3 text-left font-semibold">CTO patrimonial</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.comparison.map((row, rowIndex) => (
                              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="px-4 py-3 font-medium text-[#253F60]">{row.critere}</td>
                                <td className="px-4 py-3 text-[#374151]">{row.lowcost}</td>
                                <td className="px-4 py-3 text-[#374151]">{row.patrimonial}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {section.approach && (
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {section.approach}
                    </p>
                  )}
                  
                  {section.points && (
                    <ul className="space-y-2">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-[#374151] text-sm flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.conviction && (
                    <p className="text-[#374151] text-sm font-medium">
                      {section.conviction}
                    </p>
                  )}
                  
                  {section.conclusions && (
                    <div className="space-y-2">
                      {section.conclusions.map((conclusion, conclIndex) => (
                        <div key={conclIndex} className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-3 text-white">
                          <p className="text-sm font-medium"> {conclusion}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.reality && (
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {section.reality}
                    </p>
                  )}
                  
                  {section.question && (
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {section.question}
                    </p>
                  )}
                  
                  {section.wrongQuestion && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-3">
                      <p className="text-red-700 text-sm font-medium">
                        {section.wrongQuestion}
                      </p>
                    </div>
                  )}
                  
                  {section.rightQuestion && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-3">
                      <p className="text-green-700 text-sm font-medium">
                        {section.rightQuestion}
                      </p>
                    </div>
                  )}
                  
                  {section.finalNote && (
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white">
                      <p className="text-sm font-medium"> {section.finalNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 text-center">
              <button 
                onClick={() => setShowArticleModal(false)}
                className="bg-[#B99066] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-[#253F60] text-2xl font-semibold">
                {faqContent.title}
          </h2>
              <button 
                onClick={() => setShowFaqModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {faqContent.questions.map((faq, index) => (
                <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-[#253F60] text-lg font-semibold mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-[#374151] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Call to action */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Besoin d'un conseil personnalisé ?
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Nos experts Azalée Patrimoine vous accompagnent dans l'optimisation de votre stratégie CTO
                </p>
                <button 
                  onClick={() => setShowFaqModal(false)}
                  className="bg-white text-[#253F60] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Demander un conseil
                </button>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 text-center">
              <button 
                onClick={() => setShowFaqModal(false)}
                className="bg-[#B99066] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200"
              >
                Fermer
          </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
} 