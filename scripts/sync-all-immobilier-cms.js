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

// Complete content for all immobilier pages - EXACT COPY from defaultContent in each page.jsx

const pages = [
  // ========== IMMOBILIER NEUF ==========
  {
    path: 'immobilier/immobilier-neuf',
    title: 'Immobilier Neuf - Programmes Neufs',
    content: {
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
    }
  },
  
  // ========== LMNP ==========
  {
    path: 'immobilier/lmnp',
    title: 'LMNP - Loueur Meublé Non Professionnel',
    content: {
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
    }
  },

  // ========== VEFA ==========
  {
    path: 'immobilier/vefa',
    title: 'VEFA - Vente en l\'État Futur d\'Achèvement',
    content: {
      hero: {
        title: "VEFA (Vente en l'État Futur d'Achèvement)",
        subtitle: "Investir dans l'immobilier neuf en VEFA consiste à acheter un logement sur plan, avant même la fin de sa construction. Ce mode d'acquisition, très répandu dans les programmes neufs, offre de nombreux avantages – tout en présentant des points de vigilance à connaître.",
        button1: "L'essentiel",
        button2: "Sommaire"
      },
      rightCard: {
        title: "VEFA : investissez dans le neuf",
        subtitle: "La Vente en l'État Futur d'Achèvement vous permet de devenir propriétaire d'un bien immobilier moderne et performant.",
        benefits: [
          "Logements économes en énergie (RE2020)",
          "Frais de notaire réduits (2-3% vs 7%)",
          "Garanties constructeur sécurisées",
          "Défiscalisation loi Pinel"
        ],
        button1: "Prendre rendez-vous",
        button2: "Fiscalité"
      },
      essentiel: {
        title: "L'essentiel",
        items: [
          "Logements économes en énergie grâce aux normes RE2020",
          "Frais de notaire réduits (2 à 3 % contre 7 à 8 % dans l'ancien)",
          "Garanties constructeur sécurisantes (parfait achèvement, biennale, décennale)",
          "Possibilité de bénéficier de dispositifs fiscaux comme la loi Pinel",
          "Délais de livraison pouvant s'allonger en cas de difficultés du promoteur",
          "Surcote du neuf par rapport à l'ancien, limitant parfois la rentabilité locative"
        ]
      },
      definition: {
        title: "Qu'est-ce que la VEFA ?",
        text1: "La VEFA est un contrat de vente d'un bien immobilier neuf qui n'est pas encore terminé (ou parfois pas encore commencé). L'acheteur s'engage à acquérir un logement sur la base de plans, de descriptions et de garanties légales.",
        text2: "Le prix est payé progressivement, au fur et à mesure de l'avancement des travaux, ce qui permet à l'acheteur de lisser son effort financier. L'acheteur devient propriétaire dès la signature de l'acte de vente, même si le bien n'est pas encore construit.",
        savoirTitle: "À savoir",
        savoirItems: [
          "Contrat signé avant achèvement",
          "Propriété dès la signature",
          "Livraison à la fin des travaux",
          "Garanties obligatoires"
        ]
      },
      avantages: {
        title: "Avantages de la VEFA",
        items: [
          { title: "Économies d'énergie", description: "Logements conformes aux dernières normes énergétiques (RE2020, BBC), vous assurant des charges réduites et une meilleure valorisation à long terme." },
          { title: "Frais réduits", description: "Frais de notaire réduits (2 à 3 % du prix d'achat au lieu de 7 à 8 % dans l'ancien), un avantage financier non négligeable." },
          { title: "Garanties sécurisées", description: "Garantie de parfait achèvement (1 an), garantie biennale (2 ans), garantie décennale (10 ans) : ces garanties vous protègent contre les malfaçons." },
          { title: "Défiscalisation", description: "Éligibilité à la loi Pinel pour les investisseurs, réduisant l'impôt sur le revenu tout en constituant un patrimoine." }
        ]
      },
      inconvenients: {
        title: "Inconvénients",
        items: [
          { title: "Délais de livraison", description: "Les chantiers peuvent prendre du retard, notamment en cas de difficultés financières du promoteur ou de problèmes d'approvisionnement." },
          { title: "Surcote du neuf", description: "Le prix au m² du neuf est souvent plus élevé que dans l'ancien, limitant parfois la rentabilité locative brute." },
          { title: "Plafonds de loyers", description: "En cas de dispositif fiscal comme la loi Pinel, vous devez respecter des plafonds de loyer et de ressources des locataires." },
          { title: "Risque de vacance", description: "Si l'emplacement est mal choisi ou si la demande locative est faible, le bien peut rester vacant." }
        ]
      },
      exemple: {
        title: "Exemple concret",
        content: "Un investisseur acquiert un T2 en VEFA à Nantes pour 230 000 €, qu'il loue 750 €/mois. Grâce au dispositif Pinel (9 ans d'engagement), il bénéficie d'une réduction d'impôt de 4 600 €/an (18 % du prix d'achat étalé sur 9 ans). Sur la durée, il réduit son impôt de plus de 40 000 €, tout en se constituant un patrimoine immobilier neuf dans une ville à forte demande locative."
      },
      financement: {
        title: "Financement et étapes",
        steps: [
          { step: "1", title: "Signature du contrat", description: "Signature de l'acte authentique et premier acompte (environ 5%)" },
          { step: "2", title: "Construction", description: "Paiement des intérêts intercalaires et acomptes progressifs" },
          { step: "3", title: "Livraison", description: "Versement du solde et transfert de propriété définitif" },
          { step: "4", title: "Possession", description: "Jouissance du bien et mise en location éventuelle" }
        ]
      },
      fiscalite: {
        title: "Fiscalité et défiscalisation",
        content: "La VEFA permet de bénéficier de plusieurs avantages fiscaux : TVA réduite dans certaines zones, possibilité de déficit foncier, éligibilité aux dispositifs de défiscalisation comme la loi Pinel ou Malraux selon le type de bien."
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "La VEFA est un excellent levier pour les investisseurs recherchant sécurité et défiscalisation. Toutefois, le choix de la ville, du quartier et de la demande locative est primordial. Chez Azalée Patrimoine, nous vous accompagnons dans la sélection du programme le plus adapté à vos objectifs patrimoniaux."
      },
      risques: {
        title: "Risques et précautions",
        items: [
          "Délais de livraison non respectés par le promoteur",
          "Qualité des finitions en deçà des attentes",
          "Évolution défavorable des prix du marché immobilier",
          "Risques de défaillance du promoteur pendant la construction"
        ]
      },
      comparaison: {
        title: "VEFA vs Immobilier existant",
        data: [
          { critere: "TVA", vefa: "5,5% (zone ANRU)", existant: "20%" },
          { critere: "Potentiel de plus-value", vefa: "Élevé", existant: "Modéré" },
          { critere: "Délai d'acquisition", vefa: "12-24 mois", existant: "Immédiat" },
          { critere: "Risque", vefa: "Modéré", existant: "Faible" }
        ]
      },
      finalCta: {
        title: "Prêt à investir en VEFA ?",
        subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour sélectionner le programme immobilier neuf le plus adapté à votre stratégie patrimoniale.",
        primaryButton: "Prendre rendez-vous",
        secondaryButton: "Consulter un expert"
      },
      seo: {
        metaTitle: "VEFA - Vente en l'État Futur d'Achèvement | Azalée Patrimoine",
        metaDescription: "Investissez dans l'immobilier neuf en VEFA avec Azalée Patrimoine. Découvrez les avantages fiscaux et les garanties constructeur.",
        keywords: ["VEFA", "immobilier neuf", "investissement locatif", "défiscalisation", "loi Pinel"]
      }
    }
  },

  // ========== SCI ==========
  {
    path: 'immobilier/sci',
    title: 'SCI - Société Civile Immobilière',
    content: {
      hero: {
        title: "SCI : un outil de gestion et de transmission patrimoniale",
        subtitle: "La Société Civile Immobilière (SCI) est une structure juridique très utilisée par les familles et les investisseurs pour acheter, gérer et transmettre un bien immobilier. Souvent associée à l'indivision ou à la transmission de patrimoine, elle offre une grande souplesse de gestion.",
        button1: "Les avantages",
        button2: "IR ou IS ?"
      },
      rightCard: {
        title: "SCI : gérez et transmettez votre patrimoine",
        subtitle: "Outil puissant pour la gestion et la transmission de patrimoine immobilier.",
        benefits: [
          "Souplesse de gestion familiale",
          "Transmission facilitée avec abattements",
          "Choix fiscal IR ou IS",
          "Gouvernance claire et définie"
        ],
        button1: "Conseil expert",
        button2: "Fiscalité"
      },
      avantages: {
        title: "Les avantages de la SCI",
        items: [
          {
            title: "Souplesse familiale",
            description: "Facilite la transmission d'un patrimoine entre générations, avec un abattement de 100 000 € par parent et par enfant tous les 15 ans.",
            details: "Les statuts permettent de définir les règles de gestion et de décision, évitant les blocages de l'indivision."
          },
          {
            title: "Gestion simplifiée",
            description: "Un gérant est désigné pour gérer le bien, évitant les décisions unanimes souvent requises en indivision.",
            details: "Les règles de fonctionnement sont clairement définies dans les statuts de la société."
          },
          {
            title: "Optimisation fiscale",
            description: "Choix entre SCI à l'IR (revenus imposés chez les associés) ou SCI à l'IS (possibilité d'amortir le bien).",
            details: "Le choix dépend de votre situation fiscale et de vos objectifs patrimoniaux."
          }
        ]
      },
      inconvenients: {
        title: "Les inconvénients de la SCI",
        items: [
          {
            title: "Formalités de création et de gestion",
            description: "Rédaction des statuts, assemblée générale annuelle, tenue d'une comptabilité stricte en cas d'IS."
          },
          {
            title: "Responsabilité des associés",
            description: "Chaque associé est indéfiniment responsable des dettes sociales à hauteur de sa participation."
          },
          {
            title: "Choix fiscal piégeux",
            description: "Le passage à l'IS entraîne une fiscalité lourde sur la plus-value à la revente (calculée sur la valeur nette comptable)."
          }
        ]
      },
      fiscalite: {
        title: "SCI à l'IR ou SCI à l'IS : quel régime choisir ?",
        ir: {
          title: "SCI à l'IR (Impôt sur le Revenu)",
          description: "Les revenus sont imposés directement chez les associés selon leur quote-part. Pas d'amortissement possible, mais possibilité de déficit foncier.",
          avantages: "Fiscalité simple, pas de double imposition, déficit foncier possible",
          inconvenients: "Fiscalité lourde si revenus fonciers élevés"
        },
        is: {
          title: "SCI à l'IS (Impôt sur les Sociétés)",
          description: "La SCI est imposée comme une entreprise (15% puis 25%). Amortissement du bien possible, réduisant le bénéfice imposable.",
          avantages: "Amortissement possible, fiscalité allégée sur les loyers",
          inconvenients: "Plus-value calculée sur la valeur nette comptable (après amortissement), fiscalité plus lourde à la revente"
        },
        comparaison: [
          { critere: "Imposition des revenus", ir: "Chez les associés", is: "Au niveau de la société" },
          { critere: "Amortissement", ir: "Non possible", is: "Possible" },
          { critere: "Déficit foncier", ir: "Possible", is: "Non applicable" },
          { critere: "Plus-value à la revente", ir: "Régime des particuliers", is: "Calculée sur valeur nette comptable" }
        ]
      },
      exemple: {
        title: "Exemple concret",
        description: "Deux frères héritent d'un immeuble familial évalué à 600 000 €. Plutôt que de rester en indivision, ils créent une SCI.",
        sansSci: [
          "Toutes les décisions doivent être prises à l'unanimité",
          "En cas de désaccord, la seule solution est souvent la vente forcée",
          "Risque de blocages familiaux"
        ],
        avecSci: [
          "Les statuts définissent les règles de gestion et les pouvoirs du gérant",
          "Régime IR avec abattements sur les plus-values à long terme",
          "Le gérant désigné peut gérer le bien sans accord unanime"
        ],
        conclusion: "Les statuts évitent les blocages et anticipent la transmission aux enfants, avec des donations de parts progressives."
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        paragraphs: [
          "La SCI est un outil puissant mais doit être maniée avec précaution. Le choix entre IR et IS est stratégique et dépend de nombreux facteurs.",
          "Chez Azalée Patrimoine, nous accompagnons nos clients pour :"
        ],
        items: [
          "Créer leur SCI avec des statuts adaptés à leur situation familiale",
          "Choisir le régime fiscal le plus pertinent (IR ou IS)",
          "Anticiper la transmission de leurs biens immobiliers"
        ],
        conclusion: "La SCI bien pensée devient un véritable levier patrimonial pour gérer et transmettre votre patrimoine."
      },
      finalCta: {
        title: "Prêt à créer votre SCI ?",
        subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour définir la structure la plus adaptée à vos objectifs patrimoniaux.",
        primaryButton: "Prendre rendez-vous",
        secondaryButton: "Nous écrire"
      },
      seo: {
        metaTitle: "SCI - Société Civile Immobilière | Azalée Patrimoine",
        metaDescription: "Créez votre SCI avec Azalée Patrimoine pour gérer et transmettre votre patrimoine immobilier en toute sérénité.",
        keywords: ["SCI", "société civile immobilière", "transmission patrimoine", "gestion immobilière", "fiscalité immobilière"]
      }
    }
  },

  // ========== SCELLIER / DISPOSITIFS FISCAUX ==========
  {
    path: 'immobilier/scellier',
    title: 'Dispositifs Fiscaux : Pinel, Scellier, Robien',
    content: {
      hero: {
        title: "Les dispositifs fiscaux : Pinel, Scellier, Robien",
        subtitle: "Depuis près de 20 ans, l'État a mis en place plusieurs dispositifs fiscaux immobiliers pour encourager la construction de logements neufs et l'investissement locatif. Les plus connus : Robien (2003-2009), Scellier (2009-2012) et Pinel (2015-2024).",
        button: "Prendre rendez-vous"
      },
      rightCard: {
        title: "Nos experts à votre service",
        floatingText: "21% →\nRéduction d'impôt max",
        benefits: [
          "Réduction d'impôt jusqu'à 21% (Pinel)",
          "Constitution de patrimoine immobilier",
          "Revenus locatifs réguliers",
          "Accompagnement à la revente"
        ]
      },
      pinel: {
        title: "La loi Pinel : défiscaliser tout en investissant",
        description: "La loi Pinel est le dispositif de défiscalisation immobilière phare des années 2015-2024. Elle offre une réduction d'impôt proportionnelle à la durée d'engagement locatif.",
        durees: [
          { ans: "6 ans", pourcentage: "12%" },
          { ans: "9 ans", pourcentage: "18%" },
          { ans: "12 ans", pourcentage: "21%" }
        ],
        exemple: "Un couple investit 250 000 € dans un T2 à Toulouse. Ils s'engagent à louer 9 ans et économisent 45 000 € d'impôts (18 % de 250 000 €), soit 5 000 €/an pendant 9 ans.",
        avantages: [
          "Réduction d'impôt significative (jusqu'à 63 000 € sur 12 ans)",
          "Patrimoine immobilier neuf, moderne et attractif",
          "Transmission facilitée à terme"
        ],
        inconvenients: [
          "Plafonds de loyers limitant parfois la rentabilité",
          "Investissement limité géographiquement aux zones tendues",
          "Fin programmée du dispositif Pinel"
        ]
      },
      anciens: {
        title: "Les anciens dispositifs : Scellier et Robien",
        description: "Avant la loi Pinel, deux dispositifs majeurs ont encouragé l'investissement locatif dans le neuf : le Robien (2003-2009) et le Scellier (2009-2012).",
        robien: {
          titre: "Dispositif Robien (2003-2009)",
          description: "Permettait d'amortir une partie du prix d'achat du bien sur les revenus locatifs, réduisant ainsi l'impôt sur le revenu."
        },
        scellier: {
          titre: "Dispositif Scellier (2009-2012)",
          description: "Offrait une réduction d'impôt de 25% sur 9 ans pour les investissements locatifs neufs dans certaines zones."
        },
        note: "Ces régimes ne sont plus accessibles pour de nouveaux investissements, mais de nombreux investisseurs détiennent encore des biens acquis sous ces dispositifs."
      },
      apres: {
        title: "Pourquoi vendre après la période d'engagement fiscal ?",
        items: [
          {
            titre: "Réduire l'imposition sur la plus-value",
            description: "Une détention longue permet de bénéficier d'abattements sur la plus-value immobilière."
          },
          {
            titre: "Diversifier son patrimoine",
            description: "Le capital libéré peut être réinvesti dans d'autres actifs (SCPI, assurance vie, etc.)."
          },
          {
            titre: "Arbitrage stratégique",
            description: "Profiter des opportunités du marché immobilier local."
          }
        ]
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "Ces dispositifs ont permis à de nombreux Français de se constituer un patrimoine immobilier tout en réduisant leur impôt. Si vous avez investi en Robien, Scellier ou Pinel, la question de la revente se pose souvent à la fin de la période d'engagement. Chez Azalée Patrimoine, nous vous accompagnons pour identifier le meilleur moment pour revendre et réinvestir."
      },
      finalCta: {
        title: "Vous avez un bien Pinel, Scellier ou Robien ?",
        subtitle: "Nos experts vous accompagnent pour optimiser votre sortie et maximiser la valeur de votre patrimoine immobilier.",
        primaryButton: "Faire évaluer mon bien",
        secondaryButton: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Dispositifs Fiscaux Pinel, Scellier, Robien | Azalée Patrimoine",
        metaDescription: "Découvrez les dispositifs fiscaux Pinel, Scellier et Robien pour l'investissement immobilier locatif. Conseils d'experts Azalée Patrimoine.",
        keywords: ["Pinel", "Scellier", "Robien", "défiscalisation", "investissement locatif", "immobilier neuf"]
      }
    }
  },

  // ========== INVESTISSEMENT LOCATIF ==========
  {
    path: 'immobilier/investissement-locatif',
    title: 'Investissement Locatif',
    content: {
      hero: {
        title: "Investissement locatif : un levier puissant pour bâtir votre patrimoine",
        subtitle: "L'investissement locatif est la stratégie immobilière la plus répandue en France. Elle permet de se constituer un patrimoine, de percevoir des revenus complémentaires et de préparer sa retraite, tout en bénéficiant d'un effet de levier grâce au crédit.",
        button: "Calculer ma rentabilité"
      },
      rightCard: {
        title: "Nos experts à votre service",
        floatingText: "Effet →\nde levier",
        benefits: [
          "Revenus complémentaires réguliers",
          "Effet de levier du crédit immobilier",
          "Patrimoine tangible et transmissible",
          "Optimisation fiscale possible"
        ]
      },
      pourquoi: {
        title: "Pourquoi investir dans l'immobilier locatif ?",
        items: [
          {
            title: "Génération de revenus réguliers",
            description: "Les loyers perçus permettent de financer le crédit immobilier et de générer un revenu complémentaire."
          },
          {
            title: "Effet de levier du crédit",
            description: "Vous pouvez investir avec peu d'apport personnel, les locataires remboursant une partie ou la totalité du prêt."
          },
          {
            title: "Valorisation patrimoniale",
            description: "Au fil du temps, le capital restant dû diminue tandis que le bien prend généralement de la valeur."
          }
        ],
        exemple: "Vous achetez un bien à 200 000 € avec un prêt de 180 000 €. Les loyers de 900 €/mois couvrent une mensualité de 1 000 €. Votre effort d'épargne n'est que de 100 €/mois."
      },
      avantages: {
        title: "Les avantages de l'investissement locatif",
        items: [
          {
            title: "Revenus complémentaires",
            description: "Les loyers constituent une source de revenus stable et prévisible."
          },
          {
            title: "Effet de levier du crédit",
            description: "Le crédit permet de se constituer un patrimoine important sans immobiliser trop de capital."
          },
          {
            title: "Patrimoine tangible",
            description: "L'immobilier est un actif concret, sécurisant et transmissible."
          },
          {
            title: "Optimisation fiscale",
            description: "Plusieurs dispositifs permettent de réduire l'imposition : régime réel, déficit foncier, LMNP, etc."
          }
        ]
      },
      inconvenients: {
        title: "Les inconvénients et risques",
        items: [
          {
            title: "Vacance locative",
            description: "Périodes sans locataire impactant la rentabilité de l'investissement."
          },
          {
            title: "Impayés",
            description: "Risque de défaut de paiement des locataires."
          },
          {
            title: "Entretien",
            description: "Travaux d'entretien et de réparation à prévoir régulièrement."
          },
          {
            title: "Fiscalité",
            description: "Les loyers sont imposables et peuvent alourdir la charge fiscale."
          }
        ]
      },
      types: {
        title: "Les différents types d'investissement locatif",
        items: [
          {
            title: "Location nue",
            description: "Location d'un logement vide, régime des revenus fonciers."
          },
          {
            title: "Location meublée (LMNP)",
            description: "Location équipée, régime BIC avec amortissement possible."
          },
          {
            title: "Colocation",
            description: "Location à plusieurs locataires, rentabilité souvent supérieure."
          },
          {
            title: "Immeuble de rapport",
            description: "Achat d'un bâtiment entier pour mutualiser les risques."
          }
        ]
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "L'investissement locatif demande de la rigueur dans le choix du bien, du financement et de la gestion. Mais il offre des perspectives de rentabilité solides sur le long terme. Chez Azalée Patrimoine, nous vous accompagnons dans la sélection du bien, le montage du financement et la gestion locative."
      },
      finalCta: {
        title: "Prêt à investir dans l'immobilier locatif ?",
        subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour optimiser votre investissement et construire votre patrimoine.",
        primaryButton: "Calculer ma rentabilité",
        secondaryButton: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Investissement Locatif | Azalée Patrimoine",
        metaDescription: "Découvrez l'investissement locatif avec Azalée Patrimoine. Revenus complémentaires, effet de levier et constitution de patrimoine.",
        keywords: ["investissement locatif", "immobilier", "revenus locatifs", "patrimoine", "crédit immobilier"]
      }
    }
  },

  // ========== FAIRE CONSTRUIRE ==========
  // NOTE: This page uses different field names than other pages
  {
    path: 'immobilier/faire-construire',
    title: 'Faire Construire - Terrain + Construction',
    content: {
      hero: {
        title: "Faire construire votre projet immobilier",
        subtitle: "Accompagnement complet pour la construction de votre maison ou immeuble",
        description: "De la recherche du terrain à la livraison de votre bien, nous vous accompagnons dans toutes les étapes de votre projet de construction.",
        button: "Découvrir nos services",
        image: "/images/expertise.webp"
      },
      services: [
        {
          title: "Recherche de terrain",
          description: "Identification et sélection du terrain idéal pour votre projet",
          icon: "🏗️",
          features: ["Analyse de faisabilité", "Étude de sol", "Vérification des contraintes", "Négociation du prix"]
        },
        {
          title: "Architecture et plans",
          description: "Conception et réalisation des plans selon vos besoins",
          icon: "📐",
          features: ["Plans architecturaux", "Permis de construire", "Suivi des travaux", "Contrôle qualité"]
        },
        {
          title: "Financement",
          description: "Solutions de financement adaptées à votre projet",
          icon: "💰",
          features: ["Prêt construction", "Prêt relais", "Financement travaux", "Optimisation fiscale"]
        },
        {
          title: "Suivi des travaux",
          description: "Accompagnement pendant toute la durée du chantier",
          icon: "🔨",
          features: ["Planning travaux", "Contrôle qualité", "Gestion des artisans", "Livraison clés en main"]
        }
      ],
      process: [
        {
          step: "1",
          title: "Étude de faisabilité",
          description: "Analyse de votre projet et de sa viabilité technique et financière"
        },
        {
          step: "2",
          title: "Recherche du terrain",
          description: "Identification et acquisition du terrain idéal pour votre construction"
        },
        {
          step: "3",
          title: "Conception architecturale",
          description: "Élaboration des plans et obtention des autorisations nécessaires"
        },
        {
          step: "4",
          title: "Financement du projet",
          description: "Mise en place des solutions de financement les plus avantageuses"
        },
        {
          step: "5",
          title: "Réalisation des travaux",
          description: "Suivi et contrôle de la construction jusqu'à la livraison"
        }
      ],
      advantages: [
        {
          title: "Personnalisation totale",
          description: "Concevez votre maison selon vos goûts et vos besoins spécifiques"
        },
        {
          title: "Économies d'énergie",
          description: "Construisez avec les dernières normes environnementales et réduisez vos factures"
        },
        {
          title: "Valeur patrimoniale",
          description: "Un bien neuf qui prendra de la valeur et répondra aux standards actuels"
        },
        {
          title: "Garanties constructeur",
          description: "Bénéficiez des garanties légales et des assurances décennale"
        }
      ],
      cta: {
        title: "Prêt à construire votre projet ?",
        subtitle: "Nos experts vous accompagnent dans toutes les étapes de votre construction",
        button: "Demander un devis gratuit"
      }
    }
  },

  // ========== CRÉDIT IMMOBILIER / PTZ ==========
  {
    path: 'immobilier/credit-immobilier-ptz',
    title: 'Crédit Immobilier / PTZ',
    content: {
      hero: {
        title: "Crédit immobilier et Prêt à Taux Zéro (PTZ)",
        subtitle: "Le crédit immobilier est le levier principal pour financer votre acquisition. Le PTZ est un dispositif d'aide à l'accession qui permet d'emprunter sans intérêts sous certaines conditions.",
        button: "Simuler mon financement"
      },
      rightCard: {
        title: "Financement optimisé",
        benefits: [
          "Meilleurs taux négociés",
          "Éligibilité PTZ vérifiée",
          "Montage financier personnalisé",
          "Accompagnement complet"
        ]
      },
      credit: {
        title: "Le crédit immobilier",
        description: "Le crédit immobilier permet de financer l'acquisition d'un bien avec un apport limité. Les banques proposent différentes formules adaptées à votre profil et à votre projet.",
        elements: [
          {
            title: "Taux fixe",
            description: "Mensualité constante sur toute la durée du prêt, sécurité maximale."
          },
          {
            title: "Taux variable",
            description: "Taux qui évolue selon les conditions du marché, potentiellement plus avantageux."
          },
          {
            title: "Assurance emprunteur",
            description: "Protection obligatoire couvrant décès, invalidité et incapacité."
          },
          {
            title: "Garantie",
            description: "Hypothèque ou caution bancaire pour sécuriser le prêt."
          }
        ]
      },
      ptz: {
        title: "Le Prêt à Taux Zéro (PTZ)",
        description: "Le PTZ est un prêt sans intérêts accordé sous conditions de ressources pour l'acquisition d'une résidence principale. Il complète un prêt principal et permet de réduire le coût total du financement.",
        conditions: [
          "Primo-accédant (ne pas avoir été propriétaire les 2 dernières années)",
          "Plafonds de ressources selon la zone géographique",
          "Acquisition dans le neuf ou l'ancien avec travaux"
        ],
        avantages: [
          "Aucun intérêt à payer sur cette partie du financement",
          "Différé de remboursement possible (5 à 15 ans)",
          "Complément idéal d'un prêt classique"
        ],
        montants: {
          neuf: "Jusqu'à 40% du prix du bien en zone A/A bis",
          ancien: "Jusqu'à 40% avec travaux représentant 25% du coût"
        }
      },
      simulation: {
        title: "Simulez votre financement",
        description: "Nos outils de simulation vous permettent d'estimer rapidement votre capacité d'emprunt et le montant de vos mensualités."
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "Le montage financier est crucial pour la réussite de votre projet immobilier. Nous analysons votre situation, vérifions votre éligibilité au PTZ et négocions les meilleures conditions auprès de nos partenaires bancaires."
      },
      finalCta: {
        title: "Optimisez votre financement immobilier",
        subtitle: "Nos experts Azalée Patrimoine négocient pour vous les meilleures conditions de crédit et vérifient votre éligibilité au PTZ.",
        primaryButton: "Simuler mon financement",
        secondaryButton: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Crédit Immobilier et PTZ | Azalée Patrimoine",
        metaDescription: "Optimisez votre financement immobilier avec Azalée Patrimoine. Crédit immobilier aux meilleurs taux et Prêt à Taux Zéro.",
        keywords: ["crédit immobilier", "PTZ", "prêt à taux zéro", "financement", "taux immobilier"]
      }
    }
  },

  // ========== PLUS-VALUE IMMOBILIÈRE ==========
  {
    path: 'immobilier/plus-value-immobiliere',
    title: 'Plus-value Immobilière',
    content: {
      hero: {
        title: "Plus-value immobilière : comprendre et optimiser",
        subtitle: "La plus-value immobilière est le gain réalisé lors de la vente d'un bien. Comprendre son calcul et les exonérations possibles est essentiel pour optimiser votre stratégie patrimoniale.",
        button: "Calculer ma plus-value"
      },
      rightCard: {
        title: "Optimisation fiscale",
        benefits: [
          "Calcul personnalisé de votre plus-value",
          "Stratégies d'exonération",
          "Abattements pour durée de détention",
          "Accompagnement expert"
        ]
      },
      definition: {
        title: "Qu'est-ce que la plus-value immobilière ?",
        description: "La plus-value immobilière est la différence entre le prix de vente d'un bien et son prix d'acquisition, majoré des frais. Elle est soumise à l'impôt sur le revenu (19%) et aux prélèvements sociaux (17,2%), soit 36,2% au total avant abattements."
      },
      calcul: {
        title: "Comment calculer la plus-value ?",
        etapes: [
          {
            titre: "Prix de vente",
            description: "Prix net vendeur après déduction des frais de vente (diagnostics, commission d'agence à charge du vendeur)."
          },
          {
            titre: "Prix d'acquisition",
            description: "Prix d'achat majoré des frais de notaire (forfait 7,5% ou frais réels) et des travaux (forfait 15% après 5 ans ou montants réels)."
          },
          {
            titre: "Plus-value brute",
            description: "Différence entre le prix de vente corrigé et le prix d'acquisition majoré."
          },
          {
            titre: "Abattements",
            description: "Réduction de la plus-value selon la durée de détention du bien."
          }
        ]
      },
      abattements: {
        title: "Abattements pour durée de détention",
        description: "La plus-value est progressivement réduite selon la durée de détention du bien immobilier.",
        ir: {
          title: "Impôt sur le revenu",
          description: "Exonération totale après 22 ans de détention",
          tranches: [
            { annees: "0-5 ans", taux: "0%" },
            { annees: "6-21 ans", taux: "6% par an" },
            { annees: "22e année", taux: "4%" }
          ]
        },
        ps: {
          title: "Prélèvements sociaux",
          description: "Exonération totale après 30 ans de détention",
          tranches: [
            { annees: "0-5 ans", taux: "0%" },
            { annees: "6-21 ans", taux: "1,65% par an" },
            { annees: "22e année", taux: "1,60%" },
            { annees: "23-30 ans", taux: "9% par an" }
          ]
        }
      },
      exonerations: {
        title: "Cas d'exonération",
        items: [
          {
            titre: "Résidence principale",
            description: "Exonération totale pour la vente de votre résidence principale."
          },
          {
            titre: "Première vente",
            description: "Exonération pour la première vente d'un logement autre que la résidence principale, sous conditions (remploi dans les 24 mois pour l'achat d'une résidence principale)."
          },
          {
            titre: "Vente < 15 000 €",
            description: "Exonération pour les ventes dont le prix est inférieur à 15 000 €."
          },
          {
            titre: "Expropriation",
            description: "Exonération si le prix est remployé dans les 12 mois pour l'achat d'un bien immobilier."
          }
        ]
      },
      exemple: {
        title: "Exemple concret",
        achat: "Achat en 2010 : 150 000 €",
        vente: "Vente en 2025 : 220 000 €",
        calcul: [
          "Prix d'acquisition majoré : 150 000 € + 11 250 € (frais) + 22 500 € (travaux) = 183 750 €",
          "Plus-value brute : 220 000 € - 183 750 € = 36 250 €",
          "Abattement IR (15 ans) : 60% → Plus-value imposable IR : 14 500 €",
          "Abattement PS (15 ans) : 16,5% → Plus-value imposable PS : 30 268 €",
          "Impôt total : 2 755 € (IR) + 5 206 € (PS) = 7 961 €"
        ]
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "Anticiper la fiscalité de la revente est essentiel pour optimiser votre patrimoine. Nous vous accompagnons pour choisir le meilleur moment pour vendre et maximiser votre gain net après impôt."
      },
      finalCta: {
        title: "Optimisez votre plus-value immobilière",
        subtitle: "Nos experts Azalée Patrimoine vous aident à calculer et anticiper la fiscalité de votre revente.",
        primaryButton: "Calculer ma plus-value",
        secondaryButton: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Plus-value Immobilière | Azalée Patrimoine",
        metaDescription: "Comprenez et optimisez votre plus-value immobilière avec Azalée Patrimoine. Calcul, abattements et stratégies d'exonération.",
        keywords: ["plus-value immobilière", "fiscalité immobilière", "abattements", "exonération", "revente"]
      }
    }
  },

  // ========== IMMEUBLES DE RAPPORT ==========
  {
    path: 'immobilier/immeubles-de-rapport',
    title: 'Immeubles de Rapport',
    content: {
      hero: {
        title: "Immeubles de rapport : investir dans le collectif",
        subtitle: "L'immeuble de rapport est un investissement locatif où vous achetez un bâtiment entier comprenant plusieurs logements. Cette stratégie offre des avantages significatifs en termes de rentabilité, de mutualisation des risques et d'économies d'échelle.",
        button: "Découvrir les opportunités"
      },
      rightCard: {
        title: "Investissement collectif",
        benefits: [
          "Rentabilité élevée",
          "Mutualisation des risques locatifs",
          "Économies d'échelle sur la gestion",
          "Potentiel de plus-value important"
        ]
      },
      definition: {
        title: "Qu'est-ce qu'un immeuble de rapport ?",
        description: "Un immeuble de rapport est un bâtiment comprenant plusieurs logements (appartements, studios) destinés à la location. Contrairement à l'achat d'un appartement en copropriété, vous êtes seul propriétaire de l'ensemble du bâtiment.",
        avantages: [
          "Pas de copropriété : vous êtes seul décisionnaire",
          "Prix au m² souvent inférieur à l'achat unitaire",
          "Revenus diversifiés sur plusieurs lots"
        ]
      },
      avantages: {
        title: "Les avantages",
        items: [
          {
            title: "Rentabilité",
            description: "Le prix au m² est souvent inférieur à l'achat en copropriété, améliorant la rentabilité brute."
          },
          {
            title: "Mutualisation",
            description: "Un logement vacant n'impacte pas totalement vos revenus, les autres lots continuent de générer des loyers."
          },
          {
            title: "Autonomie",
            description: "Pas de copropriété, vous êtes seul décisionnaire pour les travaux et la gestion."
          },
          {
            title: "Plus-value",
            description: "Potentiel de valorisation important après rénovation ou division des lots."
          }
        ]
      },
      inconvenients: {
        title: "Les points de vigilance",
        items: [
          {
            title: "Capital initial",
            description: "L'investissement est plus important qu'un appartement seul, nécessitant un apport conséquent."
          },
          {
            title: "Gestion",
            description: "Multiplication des locataires à gérer, des contrats et des états des lieux."
          },
          {
            title: "Travaux",
            description: "Rénovation souvent nécessaire sur les parties communes et privatives."
          },
          {
            title: "Financement",
            description: "Dossier bancaire plus complexe, nécessitant une analyse approfondie."
          }
        ]
      },
      rentabilite: {
        title: "Calculer la rentabilité",
        formules: [
          {
            nom: "Rentabilité brute",
            formule: "(Loyers annuels / Prix d'achat) × 100",
            exemple: "36 000 € / 400 000 € × 100 = 9%"
          },
          {
            nom: "Rentabilité nette",
            formule: "(Loyers - Charges - Travaux) / Prix total × 100",
            exemple: "(36 000 € - 6 000 €) / 450 000 € × 100 = 6,7%"
          }
        ]
      },
      exemple: {
        title: "Exemple concret",
        description: "Achat d'un immeuble de 6 lots à Lille pour 350 000 €",
        details: [
          "6 studios loués 450 €/mois = 32 400 €/an de revenus",
          "Rentabilité brute : 9,3%",
          "Après travaux et charges : rentabilité nette ~7%",
          "Un lot vacant = impact limité à 17% des revenus"
        ],
        conclusion: "La mutualisation des risques et la rentabilité élevée compensent l'investissement initial important."
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        content: "L'immeuble de rapport est réservé aux investisseurs avertis mais offre des perspectives de rentabilité exceptionnelles. Nous vous accompagnons dans la recherche du bien idéal, l'analyse de la rentabilité et le montage du financement."
      },
      finalCta: {
        title: "Investir dans un immeuble de rapport",
        subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour identifier les meilleures opportunités et optimiser votre investissement.",
        primaryButton: "Découvrir les opportunités",
        secondaryButton: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Immeubles de Rapport | Azalée Patrimoine",
        metaDescription: "Investissez dans un immeuble de rapport avec Azalée Patrimoine. Rentabilité élevée, mutualisation des risques et accompagnement expert.",
        keywords: ["immeuble de rapport", "investissement locatif", "rentabilité", "immobilier collectif", "patrimoine"]
      }
    }
  }
];

async function syncAllPages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    for (const page of pages) {
      const existingPage = await PageContent.findOne({ path: page.path });
      
      if (existingPage) {
        console.log(`📝 Updating ${page.path}...`);
        existingPage.content = page.content;
        existingPage.title = page.title;
        existingPage.published = true;
        existingPage.lastModified = new Date();
        await existingPage.save();
        console.log(`   ✅ Updated with ${Object.keys(page.content).length} sections`);
      } else {
        console.log(`➕ Creating ${page.path}...`);
        const newPage = new PageContent({
          path: page.path,
          title: page.title,
          content: page.content,
          published: true,
        });
        await newPage.save();
        console.log(`   ✅ Created with ${Object.keys(page.content).length} sections`);
      }
    }

    console.log('\n📊 Summary:');
    for (const page of pages) {
      const sections = Object.keys(page.content);
      console.log(`   ${page.path}: ${sections.length} sections`);
    }

    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    console.log(`\n✅ All ${pages.length} immobilier pages synced successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncAllPages();

