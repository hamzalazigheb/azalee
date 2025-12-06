// Script to initialize the 5 main pages in CMS with all their sections
// Run with: node scripts/init-main-pages-cms.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define PageContent schema inline (CommonJS)
const PageContentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  published: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Default content structures for each page
const pagesContent = {
  placements: {
    path: 'placements',
    title: 'Placements',
    content: {
      hero: {
        h1: "Construire son patrimoine",
        introText: "Construire son patrimoine, c'est bien plus qu'investir. C'est donner du sens à son argent, structurer ses actifs avec méthode et préparer l'avenir de sa famille. Chez Azalée Patrimoine, nous vous accompagnons à chaque étape, en alliant performance, fiscalité optimisée et indépendance pour transformer votre patrimoine en levier de sérénité et de performance sur le long terme.",
        question: "Que souhaitez-vous faire ?",
        objectives: [
          "Faire fructifier votre épargne",
          "Financer un projet",
          "Optimiser ma transmission",
          "Revenus complémentaires",
          "Réduire ma fiscalité",
          "Préparer la retraite"
        ]
      },
      section1: {
        h2: "Comprendre les placements patrimoniaux",
        introText: "Avant de parler de produits, parlons de stratégie. La réussite patrimoniale repose d'abord sur la bonne compréhension des outils disponibles et de leur articulation. Nous distinguons deux notions essentielles : les enveloppes et les supports d'investissement.",
        linkText: "Liens vers Section 8 : Les enveloppes - les Supports"
      },
      section2: {
        h2: "Les placements sans risques sont-ils vraiment les meilleurs placements ?",
        h3_inflation: {
          title: "Quel rôle joue l'inflation dans le choix d'un placement ?",
          content: "Les placements dits \"sans risque\", comme le Livret A, le LDDS ou les fonds euros, rassurent parce qu'ils garantissent le capital. Pourtant, leur rendement est souvent inférieur à l'inflation, ce qui signifie que votre argent perd de la valeur avec le temps.",
          inflation_explanation: "L'inflation, c'est l'augmentation générale des prix. Autrement dit, avec le même euro, vous pouvez acheter moins de choses qu'avant.",
          example: "Exemple : si une baguette coûtait 1 € il y a cinq ans et qu'elle coûte aujourd'hui 1,20 €, votre pouvoir d'achat a diminué de 20 %.",
          conclusion: "Ainsi, un placement \"sans risque\" peut cacher un risque invisible : celui de l'érosion du pouvoir d'achat.",
          strategy: "Pour faire fructifier votre épargne, l'objectif n'est pas d'éviter le risque, mais de le maîtriser intelligemment.",
          balanced_strategy: "Une stratégie équilibrée doit combiner liquidité, sécurité et rendement, selon votre horizon de placement et votre profil investisseur.",
          tip: "Astuce Azalée Patrimoine : conservez vos placements garantis pour votre épargne de précaution, et explorez des solutions plus performantes pour vos projets à moyen et long terme."
        },
        h3_test: {
          title: "Testez vos connaissances et découvrez votre profil investisseur",
          content: "Avant d'investir, il est essentiel de comprendre votre relation au risque et votre niveau de connaissance financière.",
          help_list: [
            "votre taux de tolérance au risque",
            "vos objectifs patrimoniaux",
            "et les placements adaptés à votre horizon de temps."
          ],
          ctas: [
            { text: "Découvrir mon profil investisseur avec un conseiller Azalée", link: "https://calendly.com/contact-azalee-patrimoine" }
          ]
        }
      },
      section3: {
        intro: [],
        h2: "Private equity : effet de mode ou réelle opportunité ?",
        paragraphs: [],
        quote: {
          text: "",
          conclusion: ""
        },
        more_paragraphs: [],
        questions: {
          title: "Questions fréquentes sur les placements",
          items: []
        },
        remember: {
          title: "À retenir",
          content: "Les placements sans risque ne sont pas toujours les meilleurs placements. L'inflation peut éroder votre pouvoir d'achat.",
          points: []
        },
        ctas: [],
        conclusion: {
          paragraphs: [
            "L'objectif : transformer votre patrimoine en levier de sérénité et de performance sur le long terme."
          ],
          quote: "",
          ctas: []
        }
      },
      articles: {
        h2: "Articles et guides placements",
        description: "Découvrez nos articles détaillés pour approfondir vos connaissances sur les placements et l'investissement",
        items: [
          {
            title: "Assurance-vie : optimiser votre épargne en 2025",
            description: "Découvrez comment optimiser votre assurance-vie avec Azalée Patrimoine : fiscalité, supports, arbitrages et stratégies pour maximiser votre rendement net.",
            link: "/placements/assurance-vie",
            badge: "Guide complet",
            gradient: "from-[#253F60] to-[#2d4a6b]"
          },
          {
            title: "Private Equity 2025 : opportunités et risques",
            description: "Le capital-investissement offre des rendements attractifs mais nécessite une compréhension approfondie. Découvrez comment investir intelligemment en Private Equity malgré les risques.",
            link: "#section3",
            badge: "Analyse 2025",
            gradient: "from-[#253F60] to-[#B99066]"
          }
        ]
      }
    }
  },
  patrimoine: {
    path: 'patrimoine',
    title: 'Patrimoine',
    content: {
      hero: {
        cardLeft: {
          title: "Bien gérer son patrimoine en 2025, c'est anticiper, structurer et transmettre",
          paragraph1: "Une bonne gestion de patrimoine ne se résume pas à faire fructifier son épargne.",
          paragraph2: "Elle repose sur une approche globale et exclusive qui intègre la protection de la famille, la stratégie de transmission, l'optimisation fiscale, des placements performants, une structuration juridique et l'anticipation des risques.",
          paragraph3: "Notre équipe de conseillers en gestion de patrimoine indépendants vous accompagne pour bâtir une stratégie personnalisée et cohérente avec vos objectifs de vie.",
          paragraph4: "Que vous soyez chef d'entreprise, héritier, expatrié ou jeune investisseur, nous vous guidons avec clarté.",
          buttonText: "Faire mon bilan patrimonial",
          buttonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
        },
        cardRight: {
          title: "Votre patrimoine mérite une stratégie claire et durable",
          description: "Chez Azalée Patrimoine, nous vous aidons à construire un avenir financier solide grâce à une approche personnalisée et des solutions adaptées à vos besoins spécifiques.",
          features: [
            "Optimisation fiscale",
            "Protection de la famille",
            "Transmission sereine"
          ],
          badge: {
            line1: "Votre 1er",
            line2: "Diagnostique",
            line3: "offert"
          }
        }
      },
      enQuelquesMots: {
        title: "En quelques mots : comprendre la gestion de patrimoine",
        paragraph1: "structurer, valoriser et transmettre un ensemble de biens (immobilier, placements financiers, liquidités, entreprise, objets de valeur).",
        paragraph2: "Consulter un conseiller en gestion de patrimoine indépendant permet de prendre des décisions éclairées en intégrant les aspects fiscaux, juridiques, financiers et familiaux.",
        bilanPatrimonial: {
          title: "point de départ pour une stratégie personnalisée :",
          items: [
            "Analyser votre situation actuelle",
            "Identifier les opportunités d'optimisation",
            "Construire un plan d'action personnalisé"
          ]
        },
        accompagnement: {
          title: "nous vous accompagnons pour :",
          items: [
            "Protéger votre famille",
            "Transmettre efficacement",
            "Optimiser la fiscalité",
            "Sécuriser l'avenir"
          ]
        },
        conclusion: "Notre approche repose sur la clarté, la pédagogie et l'indépendance. L'objectif : transformer le patrimoine en levier de sérénité et de performance sur le long terme."
      },
      definition: {
        title: "Définition de la gestion de patrimoine",
        intro: "La gestion de patrimoine est une discipline transversale qui consiste à analyser, organiser, valoriser et transmettre l'ensemble des actifs d'une personne ou d'une entreprise — qu'ils soient immobiliers, financiers, professionnels ou familiaux — en tenant compte de leurs objectifs personnels, fiscaux et successoraux.",
        paragraph1: "Contrairement à une idée reçue, le métier de conseiller en gestion de patrimoine (CGP) n'est pas réglementé en tant que tel, mais il regroupe plusieurs statuts professionnels encadrés par la loi, chacun répondant à des compétences spécifiques :",
        statuts: [],
        paragraph2: "En pratique, un CGP expérimenté combine souvent plusieurs de ces statuts pour offrir une vision globale et cohérente de la situation de ses clients.",
        paragraph3: "Son rôle est avant tout d'accompagner, de conseiller et d'anticiper, en s'appuyant sur une approche personnalisée qui intègre :",
        domaines: [],
        resume: {
          title: "En résumé :",
          text: "la gestion de patrimoine, c'est l'art de faire dialoguer le juridique, le fiscal et le financier pour créer de la valeur et de la sérénité sur le long terme."
        }
      },
      pourquoiCGP: {
        title: "Pourquoi faire appel à un conseiller en gestion de patrimoine indépendant ?",
        intro: "Un CGP est votre copilote pour prendre les bonnes décisions patrimoniales. Il apporte une vision à 360° sur votre situation, en prenant en compte vos revenus, votre patrimoine immobilier et financier, votre environnement fiscal, familial et professionnel.",
        points: [
          "Structuration patrimoniale globale",
          "Optimisation fiscale et transmission",
          "Accès à des solutions haut de gamme",
          "Suivi personnalisé et réactif"
        ]
      },
      auditPatrimonial: {
        title: "L'inventaire patrimonial : la base de toute stratégie",
        intro: "Notre accompagnement commence par un inventaire patrimonial gratuit. Ce diagnostic complet permet de dresser une cartographie de vos actifs et passifs, d'analyser votre situation juridique et fiscale, puis de construire un plan d'action réaliste et optimisé.",
        stepsTitle: "Étapes de l'inventaire patrimonial",
        steps: [
          "Inventaire des actifs et dettes",
          "Etablissement d'une lettre de mission",
          "Analyse des flux de revenus et dépenses",
          "Identification des risques (juridiques, fiscaux, successoraux)",
          "Propositions de stratégies (placements, transmission, structuration)",
          "Plan d'action chiffré et suivi annuel"
        ],
        buttonText: "Inventaire patrimonial gratuit",
        buttonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      expertises: {
        title: "Nos expertises pour structurer et valoriser votre patrimoine",
        services: [],
        buttonText: "Je prends rdv",
        buttonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      casConcrets: {
        title: "Cas concrets de stratégies patrimoniales",
        intro: "La gestion de patrimoine et la transmission nécessitent des solutions sur-mesure, adaptées à vos objectifs, à l'âge de vos bénéficiaires et à vos contraintes fiscales. Voici trois profils représentatifs pour illustrer comment structurer efficacement une stratégie patrimoniale pour les familles françaises d'aujourd'hui.",
        cas: [],
        conclusion1: "Ces trois situations illustrent parfaitement la diversité des approches patrimoniales selon les cycles de vie.",
        conclusion2: "Chaque stratégie combine plusieurs outils juridiques et fiscaux pour maximiser l'efficacité de la transmission.",
        buttonText: "Je contacte un expert pour analyser ma situation",
        buttonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      simulateurs: {
        title: "Simuler pour mieux décider",
        items: [],
        note: "simulateur succession, tableau de bord patrimonial, simulateur d'IFI, comparatif assurance-vie vs capitalisation."
      },
      pourquoiAzalee: {
        title: "Pourquoi choisir Azalée Patrimoine ?",
        points: []
      },
      autresProfessionnels: {
        title: "Qui sont les autres professionnels qui vous conseillent sur votre patrimoine ?",
        intro1: "La gestion de patrimoine ne se fait pas en vase clos.",
        intro2: "Pour vous offrir un accompagnement complet et cohérent, le conseiller en gestion de patrimoine collabore étroitement avec d'autres professionnels du droit, de la finance et de l'immobilier.",
        intro3: "Chacun joue un rôle spécifique dans la protection, la valorisation et la transmission de votre patrimoine.",
        professionnels: []
      },
      faq: {
        title: "FAQ Gestion de patrimoine",
        questions: []
      },
      expatries: {
        title: "Travaillez-vous avec des expatriés ?",
        content: "Oui, nous accompagnons les expatriés français et les non-résidents dans leur gestion de patrimoine. Nous prenons en compte les conventions fiscales internationales, les régimes de résidence fiscale et les spécificités de chaque pays pour vous proposer des solutions adaptées."
      },
      localisation: {
        title: "Rencontrer un conseiller en gestion de patrimoine",
        villes: [],
        cardTitle: "Disponible en toute la France",
        cardDescription: "Nos conseillers en gestion de patrimoine sont présents partout en France pour vous accompagner dans votre projet patrimonial, où que vous soyez.",
        buttonText: "Prendre rendez-vous",
        buttonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min",
        ctaButtonText: "Rencontrer un conseiller en gestion de patrimoine",
        ctaButtonUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  immobilier: {
    path: 'immobilier',
    title: 'Immobilier',
    content: {
      hero: {
        h1: "Investir dans l'immobilier avec Azalée Patrimoine",
        description: "L'immobilier, pilier de votre indépendance financière et de la transmission familiale. Chez Azalée Patrimoine, nous considérons l'immobilier comme un socle fondamental d'un patrimoine équilibré : tangible, résilient et porteur de sens. Notre rôle est de transformer vos projets immobiliers — qu'ils soient locatifs, neufs ou patrimoniaux — en véritables stratégies d'enrichissement à long terme, intégrant rendement, fiscalité et transmission.",
        ctaButton1: "Demandez votre audit patrimonial personnalisé",
        ctaButton1Link: "https://calendly.com/rdv-azalee-patrimoine/30min",
        ctaButton2: "Découvrir nos solutions",
        ctaButton2Link: "#pourquoi-investir",
        rightCard: {
          percentage: "61,2%",
          text: "des français",
          description: "61.2% des français possèdent un ou plusieurs biens immobiliers.",
          buttonText: "Téléchargez le guide complet pour bâtir et optimiser votre patrimoine",
          buttonLink: "/outils-financiers/guide-defiscalisation"
        }
      },
      section1: {
        title: "Pourquoi investir dans l'immobilier ?",
        description: "L'immobilier reste l'investissement préféré des Français. Il offre un rendement régulier, une protection contre l'inflation et constitue un actif tangible qui peut être transmis.",
        azaleeMessage: "Chez Azalée Patrimoine, nous vous accompagnons pour choisir le bon investissement immobilier selon vos objectifs.",
        ctaTitle: "Découvrez votre profil investisseur immobilier",
        ctaButton: "Faire le test de profil",
        ctaButtonLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section2: {
        h2: "Pourquoi investir dans l'immobilier aujourd'hui ?",
        intro: "L'immobilier reste l'actif préféré des Français, et ce n'est pas un hasard :",
        statistic: {
          value: "61,2%",
          text: "des ménages possèdent un bien immobilier",
          source: "INSEE 2024"
        },
        scpiMention: "",
        azaleeMessage: "Chez Azalée Patrimoine, nous intégrons chaque actif immobilier dans une vision globale — financière, fiscale et humaine — pour bâtir la liberté patrimoniale de demain.",
        ctaTitle: "",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min",
        ctaButton: "Faire le test de profil"
      },
      section3: {
        h2: "Investir dans les SCPI : la pierre sans les contraintes",
        intro: [],
        advantages: [],
        scpiExamples: {
          title: "",
          scpis: [],
          note: ""
        },
        quote: "",
        ctaButton: "",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      cta: {
        ctaTitle: "Prêt à Investir dans l'Immobilier ?",
        ctaText: "Contactez nos experts pour une consultation personnalisée et découvrez comment optimiser votre patrimoine immobilier.",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min",
        ctaButton: "Demander une consultation"
      }
    }
  },
  fiscalite: {
    path: 'fiscalite',
    title: 'Fiscalité',
    content: {
      hero: {
        leftCard: {
          h1: "Optimiser votre fiscalité en 2025 pour mieux valoriser votre patrimoine",
          description: "La fiscalité n'est pas une fatalité. Chez Azalée Patrimoine, nous vous accompagnons pour optimiser votre situation fiscale tout en respectant la législation en vigueur.",
          description1: "La fiscalité influence directement la rentabilité de vos investissements et la transmission de votre patrimoine. Comprendre les mécanismes de l'impôt, maîtriser les déductions et utiliser les bons dispositifs vous permet de transformer la fiscalité en levier de croissance.",
          description2: "<strong className=\"text-[#253F60] font-semibold\">Azalée Patrimoine</strong> vous accompagne pour bâtir une stratégie fiscale cohérente, durable et adaptée à votre profil.",
          ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min",
          ctaButton: "Je prends ma fiscalité en main maintenant"
        },
        rightCard: {
          bubble: {
            amount: "66 768€",
            text: "d'économie d'impôts"
          },
          h2: ["Je choisis", "La meilleure stratégie", "Pour réduire mes impôts"],
          benefits: []
        }
      },
      essentiel: {
        items: [],
        note: ""
      },
      comprendreIR: {
        h2: "Comprendre l'impôt sur le revenu",
        h3: "Comment fonctionne l'impôt en France",
        paragraphs: []
      },
      categoriesRevenus: {
        h3: "Les différentes catégories de revenus",
        intro: "Vos revenus sont classés en plusieurs catégories, chacune répondant à des règles spécifiques.",
        categories: [],
        conclusion: ""
      },
      bareme: {
        h3: "Barème, tranches, décote et quotient familial",
        paragraphs: [],
        infographie: {
          image: "/images/I6644.jpg",
          imageAlt: "Barème de l'impôt sur le revenu 2025 - Tranches et taux d'imposition"
        }
      },
      declarer: {
        h2: "Déclarer efficacement ses revenus",
        intro: "Déclarer ses revenus de manière rigoureuse est une étape clé pour éviter tout redressement fiscal et optimiser le montant de son impôt.",
        h3: "Quand et comment déclarer ?",
        boxes: []
      },
      dispositifs: {
        h2: "Profiter des dispositifs fiscaux",
        intro: "La fiscalité française regorge de \"niches\" permettant de réduire son impôt tout en investissant dans des actifs porteurs.",
        ctaButton: "",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      defiscalisation: {
        h2: "Les dispositifs de défiscalisation immobilière",
        dispositifs: [],
        ctas: []
      },
      erreurs: {
        h2: "Les erreurs fréquentes à éviter",
        errors: [],
        astuce: {
          title: "Astuce",
          text: ""
        }
      },
      profils: {
        h2: "Optimiser sa fiscalité selon son profil",
        intro: "Adopter les bons réflexes et dispositifs en fonction de votre situation permet de transformer l'impôt en véritable levier patrimonial.",
        profils: [],
        conclusion: ""
      },
      conseilsExpert: {
        h2: "Conseils de l'expert Azalée Patrimoine",
        h3: "Pourquoi travailler avec un Conseiller en Gestion de Patrimoine (CGP) ?",
        paragraphs: [],
        avantages: {
          title: "",
          items: []
        },
        inconvenients: {
          title: "",
          items: []
        },
        astuce: {
          title: "Astuce",
          items: []
        },
        auditFiscal: {
          title: "",
          description: ""
        },
        diagnostic: {
          h2: "",
          items: []
        },
        accompagnement: {
          title: "",
          intro: "",
          items: [],
          conclusion: ""
        }
      },
      expertise: {
        h2: "L'expertise Azalée Patrimoine à votre service",
        intro: "Faire appel à un Conseiller en Gestion de Patrimoine (CGP) indépendant représente un investissement stratégique pour optimiser durablement votre situation fiscale et patrimoniale. Notre approche holistique dépasse la simple recherche de réduction d'impôt pour construire une véritable stratégie patrimoniale cohérente.",
        diagramme: {
          segments: []
        },
        services: []
      },
      banniere: {
        text: ""
      },
      faq: {
        h2: "FAQ Fiscalité",
        questions: []
      }
    }
  },
  retraite: {
    path: 'retraite',
    title: 'Retraite',
    content: {
      hero: {
        h1: "Préparer sa retraite sereinement avec Azalée Patrimoine",
        description1: "Anticiper sa retraite, c'est protéger son niveau de vie futur tout en optimisant la gestion de son patrimoine. Dans un contexte de réformes successives et d'allongement des carrières, bien préparer sa retraite ne relève plus du confort, mais d'une véritable stratégie patrimoniale.",
        description2: "<strong className=\"text-[#253F60] font-semibold\">Azalée Patrimoine</strong> vous accompagne pour bâtir une stratégie fiscale cohérente, durable et adaptée à votre profil.",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min",
        ctaButton: "Demander un diagnostic offert",
        rightCard: {
          percentage: "1666€",
          text: "net/mois",
          description: "Montant moyen de la retraite complémentaire pour nos clients."
        }
      },
      section1: {
        stats: {
          pensionMoyenne: "1666€",
          pensionLabel: "net/mois"
        },
        evolution: {
          h3: "L'évolution du système de retraite français"
        },
        h2: "Pourquoi anticiper sa retraite dès aujourd'hui ?",
        ctaSimulateur: {
          link: "https://calendly.com/rdv-azalee-patrimoine/30min",
          text: "SIMULER VOTRE PENSION RETRAITE"
        },
        liberteFinanciere: {
          salaire: "4 000 €",
          salaireLabel: "Net de salaire par mois",
          pension: "MOINS DE 2000 €",
          pensionLabel: "De pension de retraite",
          h3: "Préparer la liberté financière en anticipant l'impact du taux de remplacement",
          description1: "Le taux de remplacement correspond au rapport entre votre dernière rémunération et votre pension retraite. Le taux de remplacement se situe aujourd'hui entre 40% et 60% pour la plupart des cadres.",
          description2: "Anticiper, c'est combler cet écart dès aujourd'hui en constituant des revenus futurs de complément."
        },
        calcul: {
          h3: "Avec un capital initial de 1000 €, en plaçant 200€ par mois pendant 30 ans à un taux de rendement net de 6,01%.",
          intro: "",
          estimation: "",
          epargneMensuelle: "200 €",
          capitalFinal: "208 336 €",
          versementsCumules: "72 000 €",
          interetsCumules: "135 336 €",
          tableau: [],
          note: "",
          cta: {
            link: "https://calendly.com/rdv-azalee-patrimoine/30min",
            text: ""
          }
        },
        avantage: {
          h3: "L'avantage de la préparation progressive",
          paragraphs: []
        },
        bonASavoir: {
          h3: "Bon à savoir",
          paragraphs: []
        },
        focusAzalee: {
          title: "Focus Azalée",
          h4: "Le choc de revenus à la retraite",
          leSaviezVous: {
            title: "Le saviez-vous ?",
            text: "Un cadre salarié perd en moyenne 30 à 40% de son revenu au moment du passage à la retraite."
          },
          exemple: {
            title: "Exemple concret",
            revenuAvant: "Revenu avant retraite : 100 000 €/an",
            pensionEstimee: "Pension estimée : 60 000 €/an",
            perteAnnuelle: "Perte annuelle : 40 000 €",
            details: []
          },
          pourquoiAnticiper: {
            title: "Pourquoi anticiper :",
            items: [],
            conclusion: ""
          }
        },
        perteRevenus: {
          text: "Cela signifie une baisse de 40 000 € de revenus chaque année.",
          paragraphs: [],
          depenses: [],
          conclusion: ""
        }
      },
      section2: {
        h2: "Évaluer vos besoins futurs",
        simuler: {
          h3: "Simuler sa pension de retraite",
          paragraphs: [],
          link: {
            text: "",
            url: "/retraite/simulation"
          }
        }
      },
      section3: {
        h2: "S'organiser pour partir à la retraite à 50 ans : un objectif atteignable avec une stratégie patrimoniale solide",
        intro: {
          title: "Partir à la retraite à 50 ans, c'est possible.",
          paragraphs: []
        },
        comprendre: {
          h3: "Comprendre la différence entre retraite légale et indépendance financière",
          paragraphs: []
        },
        pourquoi: {
          h3: "Pourquoi vouloir partir à 50 ans ?",
          paragraphs: []
        },
        combien: {
          h3: "Combien faut-il pour partir à la retraite à 50 ans ?",
          intro: "Le montant nécessaire pour prendre sa retraite à 50 ans dépend de votre train de vie, de votre capacité d'épargne et du rendement de vos placements.",
          estimation: "Voici une estimation simple pour visualiser votre objectif, à 4% net de rendement :",
          tableau: [],
          note: "",
          cta: {
            link: "https://calendly.com/rdv-azalee-patrimoine/30min",
            text: "Simulez votre indépendance financière avec un conseiller Azalée Patrimoine"
          }
        },
        calculer: {
          h3: "Calculez votre plan d'indépendance financière"
        },
        strategie: {},
        erreurs: {},
        conseil: {},
        cta: {}
      }
    }
  }
};

async function initializePages() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    for (const [key, pageData] of Object.entries(pagesContent)) {
      try {
        // Check if page already exists
        const existing = await PageContent.findOne({ path: pageData.path });
        
        if (existing) {
          console.log(`📝 Page "${pageData.path}" already exists. Updating content structure...`);
          // Merge new content structure with existing content
          existing.content = { ...pageData.content, ...existing.content };
          existing.title = pageData.title;
          existing.published = true;
          existing.lastModified = new Date();
          await existing.save();
          console.log(`✅ Page "${pageData.path}" updated successfully!`);
        } else {
          console.log(`📝 Creating page "${pageData.path}"...`);
          const page = new PageContent({
            path: pageData.path,
            title: pageData.title,
            content: pageData.content,
            published: true,
            lastModified: new Date()
          });
          await page.save();
          console.log(`✅ Page "${pageData.path}" created successfully!`);
        }
      } catch (error) {
        console.error(`❌ Error processing page "${pageData.path}":`, error.message);
      }
    }

    console.log('\n✅ All pages initialized successfully!');
    console.log('\n📋 Pages available in CMS:');
    for (const key of Object.keys(pagesContent)) {
      console.log(`   - ${pagesContent[key].path} (${pagesContent[key].title})`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('ECONNREFUSED') || error.message.includes('connect')) {
      console.error('\n💡 Make sure MongoDB is running!');
    }
    process.exit(1);
  }
}

initializePages();

