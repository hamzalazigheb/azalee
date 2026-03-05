// Sync FULL content from JSX pages to CMS
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

// Full content for all pages - extracted from JSX files
const fullContentPages = [
  // ==================== LOI PINEL ====================
  {
    path: 'fiscalite/loi-pinel',
    title: 'Loi Pinel',
    content: {
      hero: {
        title: "Loi Pinel",
        subtitle: "Investir dans le neuf pour réduire ses impôts",
        description: "La loi Pinel est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans l'immobilier neuf locatif. Elle offre une réduction d'impôt de 12% du montant investi par an pendant 9 ans.",
        button: "En savoir plus",
        image: "/images/loi-pinel-hero.jpg"
      },
      overview: {
        title: "Présentation de la loi Pinel",
        description: "La loi Pinel est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans l'immobilier neuf locatif. Elle vise à stimuler la construction de logements neufs et à favoriser l'investissement locatif.",
        keyPoints: [
          "Réduction d'impôt de 12% par an",
          "Investissement dans le neuf uniquement",
          "Engagement de location de 9 ans",
          "Plafond de 300 000€ par an"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "12% du montant investi par an", percentage: "12%" },
          { title: "Plafond d'investissement", description: "300 000€ par an", amount: "300k€" },
          { title: "Durée d'engagement", description: "9 ans minimum", duration: "9 ans" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier de la Loi Pinel, plusieurs conditions doivent être respectées :",
        points: [
          "Investissement dans un bien neuf",
          "Location à usage d'habitation principale",
          "Engagement de location de 9 ans minimum",
          "Respect des plafonds de loyer"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Pinel.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Pinel | Azalée Patrimoine",
        metaDescription: "La loi Pinel est un dispositif de défiscalisation pour l'investissement locatif neuf. Réduction jusqu'à 21%."
      }
    }
  },

  // ==================== LOI COSSE ====================
  {
    path: 'fiscalite/loi-cosse',
    title: 'Loi Cosse',
    content: {
      hero: {
        title: "Loi Cosse",
        subtitle: "Dispositif de défiscalisation pour l'investissement immobilier locatif dans les zones tendues",
        button: "En savoir plus",
        image: "/images/loi-cosse-hero.jpg"
      },
      definition: {
        title: "Qu'est-ce que la Loi Cosse ?",
        description: "La Loi Cosse est un dispositif de défiscalisation qui permet de réduire son impôt sur le revenu en investissant dans l'immobilier locatif dans les zones tendues.",
        details: [
          "Réduction d'impôt de 12% du montant investi",
          "Plafond de 300 000€ par an",
          "Engagement de location de 9 ans minimum",
          "Bien situé dans une zone tendue"
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier de la Loi Cosse, plusieurs conditions doivent être respectées :",
        points: [
          "Bien situé dans une zone tendue",
          "Conventionnement avec l'Anah",
          "Respect des plafonds de loyers et de ressources",
          "Engagement de location de 6 à 9 ans minimum"
        ]
      },
      avantages: {
        title: "Avantages du dispositif",
        description: "Les principaux avantages de la Loi Cosse :",
        items: [
          { title: "Déduction sur revenus fonciers", description: "Jusqu'à 85% de déduction" },
          { title: "Loyers modérés", description: "Loyers inférieurs au marché" },
          { title: "Action sociale", description: "Contribuer au logement social" }
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Cosse.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Cosse | Azalée Patrimoine",
        metaDescription: "La Loi Cosse permet de défiscaliser en investissant dans l'immobilier locatif à loyer modéré."
      }
    }
  },

  // ==================== LOI DENORMANDIE ====================
  {
    path: 'fiscalite/loi-denormandie',
    title: 'Loi Denormandie',
    content: {
      hero: {
        title: "Loi Denormandie",
        subtitle: "Relancer la rénovation dans les centres-villes anciens",
        description: "La loi Denormandie offre la même réduction d'impôt que Pinel, mais pour de l'ancien avec travaux. Un dispositif fiscal attractif pour investisseurs actifs ou appuyés par un bon promoteur, fiscalement efficace mais technique.",
        button: "En savoir plus",
        image: "/images/loi-denormandie-hero.jpg"
      },
      overview: {
        title: "Présentation de la loi Denormandie",
        description: "La loi Denormandie est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de logements anciens situés dans des zones de revitalisation urbaine.",
        keyPoints: [
          "Même réduction d'impôt que Pinel",
          "Mais pour de l'ancien avec travaux",
          "Travaux = ≥ 25% du coût total",
          "Location nue à loyer plafonné"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "12% à 21% selon la durée", percentage: "12-21%" },
          { title: "Plafond d'investissement", description: "300 000€ par an", amount: "300k€" },
          { title: "Part des travaux", description: "≥ 25% du coût total", percentage: "≥25%" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier de la Loi Denormandie, plusieurs conditions doivent être respectées :",
        points: [
          "Bien situé dans une zone éligible (ORT ou commune labellisée)",
          "Travaux représentant au moins 25% du coût total",
          "Amélioration de la performance énergétique",
          "Location nue pendant 6, 9 ou 12 ans"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Denormandie.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Denormandie | Azalée Patrimoine",
        metaDescription: "La loi Denormandie pour investir dans l'ancien avec travaux et bénéficier d'une réduction d'impôt."
      }
    }
  },

  // ==================== LOI GIRARDIN ====================
  {
    path: 'fiscalite/loi-girardin',
    title: 'Loi Girardin',
    content: {
      hero: {
        title: "Loi Girardin industriel",
        subtitle: "Financer l'économie ultramarine via des investissements productifs",
        description: "La loi Girardin industriel offre une réduction d'impôt \"one shot\" supérieure à l'investissement (jusqu'à 110% du montant investi). Un dispositif fiscal puissant pour contribuables très fortement imposés acceptant un placement à fonds perdus mais sûr juridiquement.",
        button: "En savoir plus",
        image: "/images/loi-girardin-hero.jpg"
      },
      overview: {
        title: "Présentation de la loi Girardin",
        description: "La loi Girardin est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans des équipements productifs dans les DOM-TOM.",
        keyPoints: [
          "Réduction d'impôt jusqu'à 110%",
          "Investissement en outre-mer",
          "Placement à fonds perdus",
          "One shot (une seule fois)"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "Jusqu'à 110% de l'investissement", percentage: "110%" },
          { title: "Effet immédiat", description: "Réduction dès l'année d'investissement", duration: "Année N" },
          { title: "Plafond élevé", description: "Jusqu'à 40 909€ de réduction", amount: "40k€" }
        ]
      },
      risques: {
        title: "Points de vigilance",
        description: "Comme tout investissement, le Girardin présente des risques :",
        points: [
          "Placement à fonds perdus (le capital n'est pas récupéré)",
          "Risque de requalification fiscale",
          "Dépendance à la santé financière de l'entreprise ultramarine",
          "Nécessité de choisir un opérateur fiable"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement Girardin.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Girardin | Azalée Patrimoine",
        metaDescription: "La loi Girardin industriel pour défiscaliser jusqu'à 110% en investissant dans les DOM-TOM."
      }
    }
  },

  // ==================== PFU ====================
  {
    path: 'fiscalite/pfu',
    title: 'PFU - Prélèvement Forfaitaire Unique',
    content: {
      hero: {
        title: "PFU ou Prélèvement Forfaitaire Unique",
        subtitle: "Tout ce qu'un investisseur doit savoir. Le Prélèvement Forfaitaire Unique (PFU), aussi appelé « flat tax », est une mécanique fiscale clé depuis 2018. Voici une note pédagogique pour tout comprendre.",
        button: "Calculer mon PFU",
        image: "/images/pfu.webp"
      },
      definition: {
        title: "Qu'est-ce que le PFU ?",
        description: "Le PFU (Prélèvement Forfaitaire Unique), aussi appelé « flat tax », est un impôt forfaitaire de 30% qui s'applique aux revenus du capital depuis le 1er janvier 2018.",
        composition: [
          { label: "Impôt sur le revenu", value: "12,8%" },
          { label: "Prélèvements sociaux", value: "17,2%" },
          { label: "Total PFU", value: "30%" }
        ]
      },
      application: {
        title: "Revenus concernés par le PFU",
        description: "Le PFU s'applique par défaut aux revenus suivants :",
        revenus: [
          "Dividendes d'actions",
          "Intérêts d'obligations",
          "Plus-values mobilières",
          "Intérêts de comptes à terme",
          "Revenus d'assurance-vie (pour les versements après 2017)"
        ]
      },
      optionBareme: {
        title: "Option pour le barème progressif",
        description: "Vous pouvez opter pour l'imposition au barème progressif de l'impôt sur le revenu si c'est plus avantageux.",
        avantages: [
          "Intéressant si TMI < 12,8%",
          "Abattement de 40% sur les dividendes",
          "CSG partiellement déductible (6,8%)"
        ]
      },
      cta: {
        title: "Besoin d'aide pour optimiser votre fiscalité ?",
        description: "Nos experts vous accompagnent pour choisir entre PFU et barème progressif.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "PFU - Flat Tax | Azalée Patrimoine",
        metaDescription: "Comprendre le Prélèvement Forfaitaire Unique (PFU) ou flat tax de 30% sur les revenus du capital."
      }
    }
  },

  // ==================== LOI MALRAUX (updated) ====================
  {
    path: 'fiscalite/loi-malraux',
    title: 'Loi Malraux',
    content: {
      hero: {
        title: "Loi Malraux",
        subtitle: "Restaurer des biens immobiliers situés dans des secteurs historiques",
        description: "La loi Malraux offre une réduction d'impôt sur le montant des travaux engagés (22 à 30%). Un dispositif fiscal d'excellence pour investisseurs hauts revenus amateurs de pierre de caractère, avec une stratégie de conservation long terme.",
        button: "En savoir plus",
        image: "/images/loi-malraux-hero.jpg"
      },
      overview: {
        title: "Présentation de la loi Malraux",
        description: "La loi Malraux est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits. Elle vise à restaurer des biens immobiliers situés dans des secteurs historiques.",
        keyPoints: [
          "Réduction d'impôt de 22 à 30%",
          "Sur le montant des travaux engagés",
          "Immeuble situé en SPR, PSMV ou QAD",
          "Travaux encadrés par architecte des Bâtiments de France"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "22 à 30% du montant des travaux", percentage: "22-30%" },
          { title: "Plafond de travaux", description: "400 000€ par période de 4 ans", amount: "400k€" },
          { title: "Durée d'engagement", description: "9 ans minimum", duration: "9 ans" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier de la Loi Malraux, plusieurs conditions doivent être respectées :",
        points: [
          "Immeuble situé en SPR, PSMV ou QAD",
          "Travaux encadrés par architecte des Bâtiments de France",
          "Engagement de location de 9 ans minimum",
          "Respect des normes patrimoniales"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Malraux.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Malraux | Azalée Patrimoine",
        metaDescription: "La loi Malraux offre une réduction d'impôt sur le montant des travaux engagés (22 à 30%). Dispositif fiscal d'excellence pour investisseurs hauts revenus."
      }
    }
  },

  // ==================== MONUMENT HISTORIQUE (updated) ====================
  {
    path: 'fiscalite/monument-historique',
    title: 'Monument Historique',
    content: {
      hero: {
        title: "Monument Historique",
        subtitle: "Investir dans le patrimoine historique français",
        description: "Le dispositif Monument Historique permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits. Il offre une réduction d'impôt de 22 à 30% du montant des travaux engagés."
      },
      overview: {
        title: "Présentation du dispositif Monument Historique",
        description: "Le dispositif Monument Historique est un mécanisme de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits. Il vise à préserver le patrimoine historique français.",
        keyPoints: [
          "Réduction d'impôt de 22 à 30%",
          "Sur le montant des travaux engagés",
          "Monument classé ou inscrit",
          "Travaux encadrés par architecte des Bâtiments de France"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "22 à 30% du montant des travaux", percentage: "22-30%" },
          { title: "Plafond de travaux", description: "400 000€ par période de 4 ans", amount: "400k€" },
          { title: "Durée d'engagement", description: "9 ans minimum", duration: "9 ans" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier du dispositif Monument Historique, plusieurs conditions doivent être respectées :",
        points: [
          "Monument classé ou inscrit",
          "Travaux encadrés par architecte des Bâtiments de France",
          "Engagement de location de 9 ans minimum",
          "Respect des normes patrimoniales"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement Monument Historique.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Monument Historique | Azalée Patrimoine",
        metaDescription: "Le dispositif Monument Historique permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits."
      }
    }
  },

  // ==================== DEFICIT FONCIER (updated) ====================
  {
    path: 'fiscalite/reductions-impot-deficit-foncier',
    title: 'Déficit Foncier et Réductions d\'Impôt',
    content: {
      hero: {
        title: "Déficit foncier et réductions d'impôt",
        subtitle: "Un levier fiscal puissant pour investisseurs avertis",
        description: "Pour les investisseurs disposant de revenus fonciers imposables ou d'une tranche marginale d'imposition (TMI) élevée, le déficit foncier permet une double optimisation : réduction de l'impôt sur le revenu et diminution des prélèvements sociaux (CSG/CRDS à 17,2%) sur les revenus fonciers.",
        button: "Calculer mon déficit foncier",
        image: "/images/fiscalite-deficit-foncier-hero.jpg"
      },
      quickStats: {
        title: "Chiffres clés",
        stats: [
          { label: "Déficit foncier", value: "10 700€", description: "Plafond annuel déductible" },
          { label: "Report", value: "10 ans", description: "Sur revenus fonciers" },
          { label: "Rendement fiscal", value: "58%", description: "TMI 41% + CSG/CRDS" }
        ]
      },
      comparison: {
        title: "Réduction d'impôt ou déduction du revenu ?",
        description: "Comprendre la différence entre les deux mécanismes fiscaux",
        table: {
          headers: ["Mécanisme", "Effet fiscal", "Bénéfice"],
          rows: [
            { mecanisme: "Réduction d'impôt", effet: "Soustraction directe de l'impôt à payer", benefice: "1 000 € réduits = 1 000 € gagnés" },
            { mecanisme: "Déficit foncier", effet: "Diminution de la base imposable", benefice: "Effet amplifié selon la TMI + économie de CSG/CRDS" }
          ]
        }
      },
      investorProfile: {
        title: "Qui peut en profiter ?",
        description: "Le déficit foncier s'adresse à des investisseurs spécifiques",
        profiles: [
          "Propriétaires de biens locatifs déjà imposables au régime réel (hors micro-foncier)",
          "Contribuables avec une TMI élevée (30% ou plus)",
          "Investisseurs souhaitant valoriser des biens anciens avec travaux"
        ]
      },
      conditions: {
        title: "Conditions pour créer un déficit foncier",
        description: "Les conditions spécifiques à respecter pour bénéficier du déficit foncier",
        conditions: [
          "Bien en location nue (non meublée), soumis au régime réel",
          "Travaux éligibles : entretien, réparation, amélioration",
          "Pas d'agrandissement ni de construction neuve",
          "Travaux réellement payés et effectués avant d'être mis en location"
        ]
      },
      cta: {
        title: "Besoin d'aide pour optimiser votre fiscalité ?",
        description: "Nos experts vous accompagnent dans votre stratégie de déficit foncier et réductions d'impôt.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Déficit Foncier et Réductions d'Impôt | Azalée Patrimoine",
        metaDescription: "Le déficit foncier permet une double optimisation : réduction de l'impôt sur le revenu et diminution des prélèvements sociaux sur les revenus fonciers."
      }
    }
  },

  // ==================== PLACEMENTS - LIVRET ====================
  {
    path: 'placements/livret',
    title: 'Livrets Réglementés',
    content: {
      hero: {
        title: "Livrets réglementés (Livret A, LDDS, LEP, PEL…) : utiles mais pas suffisants",
        subtitle: "Les livrets réglementés font partie des placements préférés des Français. Sécurisés, liquides et garantis par l'État, ils constituent souvent la première étape de l'épargne.",
        description: "Mais attention : si leur sécurité est rassurante, leur rendement net d'inflation est souvent nul voire négatif. Ils doivent être considérés comme un matelas de sécurité, pas comme un outil de constitution de patrimoine."
      },
      types: {
        title: "Les différents livrets réglementés",
        items: [
          { nom: "Livret A", plafond: "22 950€", taux: "3%", fiscalite: "Exonéré" },
          { nom: "LDDS", plafond: "12 000€", taux: "3%", fiscalite: "Exonéré" },
          { nom: "LEP", plafond: "10 000€", taux: "5%", fiscalite: "Exonéré (sous conditions)" },
          { nom: "PEL", plafond: "61 200€", taux: "2%", fiscalite: "PFU après 12 ans" }
        ]
      },
      avantages: {
        title: "Avantages des livrets",
        items: [
          "Capital garanti par l'État",
          "Disponibilité immédiate",
          "Fiscalité avantageuse",
          "Pas de frais"
        ]
      },
      limites: {
        title: "Limites des livrets",
        items: [
          "Rendement faible (souvent < inflation)",
          "Plafonds de versement",
          "Pas de valorisation du capital",
          "Inadaptés pour des objectifs long terme"
        ]
      },
      cta: {
        title: "Optimisez votre épargne",
        description: "Nos experts vous aident à structurer votre épargne entre sécurité et performance.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Livrets Réglementés | Azalée Patrimoine",
        metaDescription: "Tout sur les livrets réglementés : Livret A, LDDS, LEP, PEL. Avantages, limites et place dans votre stratégie patrimoniale."
      }
    }
  },

  // ==================== PLACEMENTS - ASSURANCE VIE ====================
  {
    path: 'placements/assurance-vie',
    title: 'Assurance-Vie',
    content: {
      hero: {
        title: "Assurance-vie : l'enveloppe incontournable",
        subtitle: "L'assurance-vie est le placement préféré des Français, avec près de 1 900 milliards d'euros d'encours.",
        description: "Son intérêt dépasse le rendement financier : il tient surtout à sa fiscalité avantageuse et à sa souplesse en matière de transmission."
      },
      enveloppe: {
        title: "L'assurance-vie comme enveloppe fiscale",
        description: "Une assurance-vie n'est pas un placement en soi mais une enveloppe qui peut contenir :",
        contenus: [
          "un fonds en euros sécurisé (capital garanti)",
          "des unités de compte (UC) : actions, ETF, SCPI, obligations, produits structurés…"
        ],
        particularite: "La particularité est que cette enveloppe bénéficie d'un régime fiscal spécifique, plus favorable que celui des autres placements financiers."
      },
      fiscalite: {
        title: "La fiscalité des rachats (retraits)",
        description: "Lorsque vous retirez de l'argent de votre contrat, seule la part des gains (intérêts, plus-values) est imposée.",
        criteres: [
          "La durée du contrat (moins ou plus de 8 ans)",
          "La date des versements (avant ou après le 27 septembre 2017, entrée en vigueur du PFU)"
        ],
        avantApres8ans: {
          avant: "PFU 30% ou barème progressif",
          apres: "Abattement de 4 600€ (célibataire) ou 9 200€ (couple) puis taux réduit de 7,5%"
        }
      },
      transmission: {
        title: "La transmission hors succession",
        description: "L'assurance-vie permet de transmettre un capital à des bénéficiaires désignés, hors succession.",
        avantages: [
          "Abattement de 152 500€ par bénéficiaire (versements avant 70 ans)",
          "Clause bénéficiaire modifiable à tout moment",
          "Capital versé rapidement aux bénéficiaires"
        ]
      },
      cta: {
        title: "Optimisez votre assurance-vie",
        description: "Nos experts vous aident à choisir le bon contrat et les bons supports.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Assurance-Vie | Azalée Patrimoine",
        metaDescription: "Tout savoir sur l'assurance-vie : fiscalité, succession, rendement. L'enveloppe incontournable pour votre patrimoine."
      }
    }
  },

  // ==================== PLACEMENTS - SCPI/OPCI ====================
  {
    path: 'placements/scpi-opci',
    title: 'SCPI / OPCI',
    content: {
      hero: {
        title: "SCPI / OPCI : l'immobilier papier accessible",
        subtitle: "Investir dans l'immobilier sans les contraintes de gestion grâce aux SCPI et OPCI.",
        description: "Les SCPI (Sociétés Civiles de Placement Immobilier) et OPCI (Organismes de Placement Collectif Immobilier) permettent d'accéder à l'immobilier professionnel avec un ticket d'entrée réduit."
      },
      avantages: {
        title: "Les avantages de la pierre papier",
        items: [
          { title: "Mutualisation des risques", description: "Patrimoine diversifié géographiquement et sectoriellement" },
          { title: "Revenus réguliers", description: "Distributions trimestrielles (4-6% en moyenne)" },
          { title: "Accessibilité", description: "Dès quelques milliers d'euros" },
          { title: "Gestion déléguée", description: "Aucune gestion locative à assurer" }
        ]
      },
      comparaison: {
        title: "SCPI vs OPCI",
        scpi: {
          nom: "SCPI",
          description: "100% immobilier, revenus réguliers, moins liquide",
          rendement: "4-6% par an"
        },
        opci: {
          nom: "OPCI",
          description: "60% immobilier + 40% financier, plus liquide",
          rendement: "3-5% par an"
        }
      },
      fiscalite: {
        title: "Fiscalité des SCPI",
        description: "Les revenus de SCPI sont imposés comme des revenus fonciers :",
        points: [
          "Barème progressif de l'IR + prélèvements sociaux (17,2%)",
          "Possibilité d'investir via assurance-vie pour optimiser la fiscalité",
          "SCPI européennes : fiscalité allégée"
        ]
      },
      cta: {
        title: "Investir en SCPI/OPCI",
        description: "Nos experts vous accompagnent pour sélectionner les meilleures SCPI selon vos objectifs.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "SCPI OPCI | Azalée Patrimoine",
        metaDescription: "Investir en SCPI et OPCI : rendement moyen 5.8%, diversification immobilière sans gestion."
      }
    }
  },

  // ==================== PLACEMENTS - PRODUITS STRUCTURES ====================
  {
    path: 'placements/produits-structures',
    title: 'Produits Structurés',
    content: {
      hero: {
        title: "Comprendre les produits structurés",
        subtitle: "Un contrat à géométrie maîtrisée pour votre patrimoine",
        description: "Les produits structurés sont des instruments financiers combinant plusieurs actifs pour offrir un profil rendement/risque personnalisé."
      },
      definition: {
        title: "Définition d'une UCS",
        description: "Une UCS (Unité de Compte Structurée) est un engagement contractuel définissant à l'avance :",
        elements: [
          "Le sous-jacent (indice, action, panier)",
          "Le rendement potentiel (fixe ou conditionnel)",
          "L'horizon de placement (3 à 8 ans)",
          "La protection du capital (totale, partielle ou conditionnelle)",
          "Les règles de liquidité"
        ]
      },
      familles: {
        title: "Les principales familles de produits structurés",
        items: [
          { nom: "Phoenix", description: "Rendement conditionnel avec coupons périodiques, capital protégé sous barrière" },
          { nom: "Athena", description: "Rendement capitalisé versé à l'échéance ou sortie anticipée si performance atteinte" },
          { nom: "Autocall", description: "Sortie automatique si le sous-jacent dépasse son niveau initial à une date d'observation" }
        ]
      },
      avantages: {
        title: "Avantages des produits structurés",
        items: [
          "Rendement potentiel supérieur aux fonds euros",
          "Protection partielle ou totale du capital",
          "Transparence : toutes les règles sont connues à l'avance",
          "Diversification du portefeuille"
        ]
      },
      risques: {
        title: "Risques à connaître",
        items: [
          "Perte en capital possible selon la barrière",
          "Liquidité limitée avant l'échéance",
          "Performance liée au sous-jacent"
        ]
      },
      cta: {
        title: "Investir dans les produits structurés",
        description: "Nos experts sélectionnent les meilleurs produits structurés du marché.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Produits Structurés | Azalée Patrimoine",
        metaDescription: "Découvrez les produits structurés : UCS, Phoenix, Athena, Autocall. Un contrat à géométrie maîtrisée pour votre patrimoine."
      }
    }
  },

  // ==================== PATRIMOINE - CONSEILS ====================
  {
    path: 'patrimoine/conseils',
    title: 'Conseils Patrimoniaux',
    content: {
      hero: {
        title: "Conseils patrimoniaux",
        subtitle: "Le patrimoine n'est pas qu'une addition de biens immobiliers et financiers.",
        description: "C'est un ensemble cohérent qui doit être construit, protégé, optimisé fiscalement et transmis dans les meilleures conditions."
      },
      piliers: {
        title: "Les piliers d'une stratégie patrimoniale",
        subtitle: "Un patrimoine équilibré repose sur 4 piliers fondamentaux",
        items: [
          { titre: "Construit", description: "Stratégie d'accumulation adaptée à vos revenus et objectifs" },
          { titre: "Protégé", description: "Sécurité et assurance face aux aléas de la vie" },
          { titre: "Optimisé fiscalement", description: "Réduction des impôts dans le respect de la loi" },
          { titre: "Transmis", description: "Dans les meilleures conditions pour vos proches" }
        ]
      },
      classes: {
        title: "Les grandes classes d'actifs",
        items: [
          { nom: "L'immobilier", description: "Résidence principale, secondaire, locatif" },
          { nom: "L'assurance-vie", description: "Placement préféré des Français, souple et polyvalent" },
          { nom: "Les produits financiers", description: "PEA / CTO, PER, allocation dynamique ou sécurisée" },
          { nom: "La transmission", description: "Anticiper les droits de succession" }
        ]
      },
      valeurAjoutee: {
        title: "La valeur ajoutée Azalée Patrimoine",
        description: "Chez Azalée Patrimoine, nos conseils vont au-delà du produit",
        points: [
          "Analyse globale de votre situation",
          "Recommandations personnalisées",
          "Suivi régulier de vos investissements",
          "Accompagnement dans la durée"
        ]
      },
      cta: {
        title: "Prêt à optimiser votre patrimoine ?",
        description: "Nos experts vous accompagnent pour construire une stratégie patrimoniale cohérente et durable.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Conseils Patrimoniaux | Azalée Patrimoine",
        metaDescription: "Bénéficiez de conseils patrimoniaux personnalisés pour construire, protéger et transmettre votre patrimoine."
      }
    }
  },

  // ==================== PATRIMOINE - DONATION ONEREUSE ====================
  {
    path: 'patrimoine/donation-onereuse',
    title: 'Donation à titre onéreux',
    content: {
      hero: {
        title: "Donation à titre onéreux & donation de la nue-propriété",
        subtitle: "Une donation à titre onéreux est une donation assortie de charges ou contreparties pour le bénéficiaire.",
        description: "Ce mécanisme permet de transmettre tout en conservant un contrôle ou en fixant des conditions adaptées à la situation familiale et patrimoniale."
      },
      formes: {
        title: "Les formes de donations à titre onéreux",
        items: [
          { nom: "Donation avec charges", description: "Le donataire doit accomplir certaines obligations (entretien du donateur, paiement d'une rente, etc.)" },
          { nom: "Donation de la nue-propriété", description: "Le donateur conserve l'usufruit (jouissance) du bien donné" }
        ]
      },
      bareme: {
        title: "Barème fiscal (article 669 CGI)",
        description: "La valeur de la nue-propriété dépend de l'âge du donateur",
        tranches: [
          { age: "Moins de 21 ans", nuePropriete: "10%", usufruit: "90%" },
          { age: "21-30 ans", nuePropriete: "20%", usufruit: "80%" },
          { age: "31-40 ans", nuePropriete: "30%", usufruit: "70%" },
          { age: "41-50 ans", nuePropriete: "40%", usufruit: "60%" },
          { age: "51-60 ans", nuePropriete: "50%", usufruit: "50%" },
          { age: "61-70 ans", nuePropriete: "60%", usufruit: "40%" },
          { age: "71-80 ans", nuePropriete: "70%", usufruit: "30%" },
          { age: "81-90 ans", nuePropriete: "80%", usufruit: "20%" },
          { age: "Plus de 90 ans", nuePropriete: "90%", usufruit: "10%" }
        ]
      },
      avantages: {
        title: "Intérêts de la donation à titre onéreux",
        items: [
          "Transmission progressive du patrimoine",
          "Optimisation fiscale grâce au démembrement",
          "Conservation du contrôle sur le bien (usufruit)",
          "Sécurisation de la transmission (évite les conflits)"
        ]
      },
      cta: {
        title: "Prêt à optimiser votre transmission ?",
        description: "Nos experts vous accompagnent pour mettre en place la stratégie de donation la plus adaptée.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Donation à titre onéreux | Azalée Patrimoine",
        metaDescription: "Découvrez la donation à titre onéreux et la donation de la nue-propriété pour optimiser votre transmission patrimoniale."
      }
    }
  },

  // ==================== PATRIMOINE - DONATION GRATUITE ====================
  {
    path: 'patrimoine/donation-gratuite',
    title: 'Donation à titre gratuit',
    content: {
      hero: {
        title: "Donation à titre gratuit",
        subtitle: "Transmettre de son vivant sans contrepartie : les règles et stratégies optimales",
        description: "La donation à titre gratuit est un acte par lequel le donateur transmet de son vivant un bien à un donataire, sans contrepartie."
      },
      types: {
        title: "Les différentes formes de donations",
        items: [
          { nom: "Don manuel", description: "Remise de main à main de biens meubles (argent, bijoux...)" },
          { nom: "Donation simple", description: "Acte notarié pour tout type de bien" },
          { nom: "Donation-partage", description: "Répartition anticipée entre héritiers" },
          { nom: "Donation entre époux", description: "Optimisation de la protection du conjoint" }
        ]
      },
      abattements: {
        title: "Les abattements fiscaux",
        description: "Chaque donataire bénéficie d'abattements renouvelables tous les 15 ans :",
        items: [
          { lien: "Enfant", montant: "100 000€" },
          { lien: "Petit-enfant", montant: "31 865€" },
          { lien: "Arrière-petit-enfant", montant: "5 310€" },
          { lien: "Conjoint/Partenaire PACS", montant: "80 724€" },
          { lien: "Frère/Sœur", montant: "15 932€" }
        ]
      },
      donSarkozy: {
        title: "Le don Sarkozy (don familial de sommes d'argent)",
        description: "Abattement supplémentaire de 31 865€ pour les dons d'argent aux enfants, petits-enfants ou arrière-petits-enfants majeurs.",
        conditions: [
          "Le donateur doit avoir moins de 80 ans",
          "Le donataire doit être majeur",
          "Don en numéraire uniquement"
        ]
      },
      cta: {
        title: "Optimisez votre transmission",
        description: "Nos experts vous accompagnent pour structurer vos donations de manière optimale.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Donation à Titre Gratuit | Azalée Patrimoine",
        metaDescription: "Tout savoir sur la donation à titre gratuit : types, fiscalité, stratégies de transmission."
      }
    }
  }
];

async function syncContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    let added = 0;
    let updated = 0;
    let errors = 0;
    
    for (const page of fullContentPages) {
      try {
        const result = await PageContent.findOneAndUpdate(
          { path: page.path },
          {
            path: page.path,
            title: page.title,
            content: page.content,
            published: true,
            lastModified: new Date()
          },
          { upsert: true, new: true }
        );
        
        console.log(`✅ Synced: /${page.path}`);
        updated++;
      } catch (error) {
        console.log(`❌ Error with /${page.path}: ${error.message}`);
        errors++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Synced: ${updated} pages`);
    console.log(`   Errors: ${errors}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

syncContent();


