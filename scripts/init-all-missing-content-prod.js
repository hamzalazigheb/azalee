const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

// Contenu pour toutes les pages identifiées comme manquantes
const allPagesContent = {
  'patrimoine/succession-heritage': {
    title: 'Succession et héritage : droits et fiscalité | Azalée',
    content: {
      hero: {
        title: "Succession et héritage",
        subtitle: "Comprendre les droits de succession et optimiser la transmission",
        buttons: [
          { text: "Simuler ma succession", url: "https://calendly.com/rdv-azalee-patrimoine/30min" }
        ]
      },
      chart: {
        title: "Indicateurs de succession",
        data: [
          { label: "Abattement parent-enfant", value: "100 000 €" },
          { label: "Abattement entre époux", value: "80 724 €" },
          { label: "Taux droits de succession", value: "5% à 45%" }
        ],
        image: "/images/azalee-patrimoine-succesion.webp"
      }
    }
  },
  'patrimoine/donation-gratuite': {
    title: 'Donation à titre gratuit : donner de son vivant | Azalée',
    content: {
      hero: {
        title: "Donation à titre gratuit",
        subtitle: "La donation à titre gratuit permet de <strong>transmettre de son vivant</strong> une partie de son patrimoine à ses proches, tout en <strong>optimisant la fiscalité successorale</strong> et en <strong>préparant la transmission</strong>.",
        highlight: "Avantage principal : réduire les droits de succession en transmettant progressivement.",
        cards: [
          {
            title: "Abattement",
            subtitle: "Par parent et par enfant",
            value: "100 000 €",
            footer: "Tous les 15 ans"
          },
          {
            title: "Taux",
            subtitle: "Droits de donation",
            value: "5% à 45%",
            footer: "Selon le lien de parenté"
          }
        ],
        buttons: [
          {
            text: "Simuler ma donation",
            url: "https://calendly.com/rdv-azalee-patrimoine/30min"
          }
        ]
      },
      chart: {
        title: "Caractéristiques des donations à titre gratuit",
        subtitle: "Comparaison des différents types de donations",
        data: [
          { label: "Abattement parent-enfant", value: "100 000 €" },
          { label: "Abattement entre époux", value: "80 724 €" },
          { label: "Abattement frères/sœurs", value: "15 932 €" },
          { label: "Abattement neveux/nièces", value: "7 967 €" },
          { label: "Fréquence", value: "Tous les 15 ans" }
        ],
        image: "/images/azalee-patrimoine-donation.webp"
      },
      formes: {
        title: "Les différentes formes de donation",
        subtitle: "Chaque type de donation répond à des objectifs spécifiques",
        items: [
          {
            title: "Donation simple",
            subtitle: "Transmission immédiate",
            descriptions: [
              "Transmission immédiate et définitive du bien",
              "Le donataire devient propriétaire dès l'acte",
              "Idéal pour transmettre des liquidités ou des biens mobiliers"
            ],
            note: "Attention : le bien sort définitivement du patrimoine du donateur"
          },
          {
            title: "Donation avec réserve d'usufruit",
            subtitle: "Conserver l'usage",
            descriptions: [
              "Le donateur conserve l'usufruit (droit d'usage et de jouissance)",
              "Le donataire reçoit la nue-propriété",
              "Réduction des droits de donation (calcul sur la nue-propriété uniquement)"
            ],
            note: "Avantage fiscal : les droits sont calculés uniquement sur la valeur de la nue-propriété"
          }
        ]
      },
      fiscalite: {
        title: "Fiscalité des donations",
        subtitle: "Les droits de donation varient selon le lien de parenté et le montant transmis",
        rows: [
          { label: "Entre parents et enfants", value: "5% à 45%" },
          { label: "Entre époux", value: "0% (exonération totale)" },
          { label: "Entre frères et sœurs", value: "35% ou 45%" },
          { label: "Entre oncles/tantes et neveux/nièces", value: "55%" },
          { label: "Entre personnes non parentes", value: "60%" }
        ],
        example: {
          title: "Exemple concret : donation de 150 000 € à un enfant",
          cards: [
            { label: "Abattement", value: "100 000 €" },
            { label: "Part taxable", value: "50 000 €" },
            { label: "Droits de donation", value: "2 500 €" }
          ],
          result: "Soit un taux effectif de <strong>1,67%</strong> sur la donation totale"
        }
      },
      demembrement: {
        title: "Donation avec démembrement",
        subtitle: "Optimiser la transmission en séparant usufruit et nue-propriété",
        leftTitle: "Barème de l'usufruit",
        leftItems: [
          { age: "Moins de 21 ans", rate: "90%", description: "de la valeur du bien" },
          { age: "21 à 30 ans", rate: "80%", description: "de la valeur du bien" },
          { age: "31 à 40 ans", rate: "70%", description: "de la valeur du bien" },
          { age: "41 à 50 ans", rate: "60%", description: "de la valeur du bien" },
          { age: "51 à 60 ans", rate: "50%", description: "de la valeur du bien" },
          { age: "Plus de 60 ans", rate: "40%", description: "de la valeur du bien" }
        ],
        rightTitle: "Exemple : donation d'un bien de 200 000 €",
        rightSubtitle: "Donateur de 55 ans (usufruit = 50%)",
        rightItems: [
          { label: "Valeur totale", value: "200 000 €" },
          { label: "Usufruit (50%)", value: "100 000 €" },
          { label: "Nue-propriété (50%)", value: "100 000 €" }
        ],
        rightResult: "Droits calculés uniquement sur la nue-propriété : <strong>5 000 €</strong> au lieu de 10 000 €",
        rightResultNote: "Économie de 50% sur les droits de donation"
      },
      strategie: {
        title: "Stratégie de donation progressive",
        subtitle: "Planifier plusieurs donations pour optimiser la transmission",
        leftTitle: "Avantages de la donation progressive",
        leftItems: [
          {
            title: "Utiliser plusieurs abattements",
            description: "Profiter de l'abattement tous les 15 ans pour transmettre progressivement"
          },
          {
            title: "Réduire les droits",
            description: "Étaler la transmission sur plusieurs années pour minimiser la fiscalité"
          },
          {
            title: "Anticiper la succession",
            description: "Préparer la transmission de son vivant plutôt que de laisser faire la loi"
          }
        ],
        rightTitle: "Exemple : transmission de 300 000 €",
        rightSubtitle: "Stratégie sur 30 ans (2 donations)",
        rightItems: [
          { label: "1ère donation (année 0)", value: "150 000 €" },
          { label: "2ème donation (année 15)", value: "150 000 €" },
          { label: "Total transmis", value: "300 000 €" }
        ],
        rightResult: "Droits totaux : <strong>10 000 €</strong> au lieu de 20 000 € en une seule fois",
        rightResultNote: "Économie de 50% grâce à l'utilisation de 2 abattements"
      },
      vision: {
        title: "Pourquoi faire une donation ?",
        subtitle: "Les avantages de la transmission de son vivant",
        items: [
          {
            title: "Réduire les droits",
            description: "Profiter de l'abattement tous les 15 ans pour minimiser la fiscalité"
          },
          {
            title: "Anticiper la transmission",
            description: "Préparer la succession et éviter les conflits familiaux"
          },
          {
            title: "Aider ses proches",
            description: "Transmettre de son vivant pour aider financièrement ses enfants"
          }
        ],
        highlight: "La donation permet de <strong>transmettre progressivement</strong> tout en <strong>optimisant la fiscalité</strong> et en <strong>préparant sereinement la succession</strong>.",
        cards: [
          {
            title: "Abattement",
            description: "100 000 € par parent et par enfant tous les 15 ans"
          },
          {
            title: "Taux réduit",
            description: "5% à 45% selon le lien de parenté et le montant"
          },
          {
            title: "Exonération",
            description: "0% entre époux (exonération totale)"
          }
        ],
        ctaText: "Besoin de conseils pour optimiser votre donation ? <strong>Nos experts vous accompagnent</strong> pour structurer votre transmission dans les meilleures conditions."
      },
      finalCta: {
        title: "Optimisez votre donation avec Azalée Patrimoine",
        subtitle: "Nos conseillers en gestion de patrimoine vous accompagnent pour structurer votre transmission et réduire votre fiscalité.",
        buttons: [
          {
            text: "Prendre rendez-vous",
            url: "https://calendly.com/rdv-azalee-patrimoine/30min"
          }
        ]
      }
    }
  },
  'patrimoine/donation-onereuse': {
    title: 'Donation à titre onéreux : transmission | Azalée Patrimoine',
    content: {
      hero: {
        title: "Donation à titre onéreux",
        subtitle: "La donation à titre onéreux permet de <strong>transmettre un bien</strong> en échange d'une <strong>contrepartie financière</strong>, offrant des <strong>avantages fiscaux</strong> par rapport à une vente classique.",
        highlight: "Avantage principal : réduire les droits de mutation et optimiser la transmission.",
        cards: [
          {
            title: "Réduction",
            subtitle: "Droits de mutation",
            value: "Jusqu'à 50%",
            footer: "Par rapport à une vente"
          },
          {
            title: "Taux",
            subtitle: "Droits de donation",
            value: "5% à 45%",
            footer: "Selon le lien de parenté"
          }
        ],
        buttons: [
          {
            text: "Simuler ma donation",
            url: "https://calendly.com/rdv-azalee-patrimoine/30min"
          }
        ]
      },
      chart: {
        title: "Données clés - Donation onéreuse",
        subtitle: "Comparaison avec la donation gratuite",
        data: [
          { label: "Réduction droits de mutation", value: "Jusqu'à 50%" },
          { label: "Taux droits de donation", value: "5% à 45%" },
          { label: "Contrepartie", value: "Obligatoire" },
          { label: "Avantage fiscal", value: "Significatif" }
        ],
        image: "/images/azalee-patrimoine-donation.webp"
      },
      definition: {
        title: "Qu'est-ce qu'une donation à titre onéreux ?",
        subtitle: "Comprendre le mécanisme et les avantages",
        content: [
          "La donation à titre onéreux est un <strong>acte de transmission</strong> par lequel le donateur cède un bien à un donataire en échange d'une <strong>contrepartie financière</strong> (prix de vente).",
          "Contrairement à la donation gratuite, cette forme de donation permet de <strong>combiner transmission et rémunération</strong>, tout en bénéficiant d'<strong>avantages fiscaux</strong> par rapport à une vente classique.",
          "Le prix de vente doit être <strong>réel et sérieux</strong>, mais peut être inférieur à la valeur vénale du bien, ce qui permet de transmettre une partie du patrimoine tout en recevant une contrepartie."
        ],
        features: [
          {
            title: "Contrepartie obligatoire",
            description: "Le donataire doit verser un prix de vente réel et sérieux"
          },
          {
            title: "Avantages fiscaux",
            description: "Réduction des droits de mutation par rapport à une vente classique"
          },
          {
            title: "Transmission progressive",
            description: "Permet de transmettre tout en conservant une partie de la valeur"
          }
        ]
      },
      casUsage: {
        title: "Cas d'usage de la donation onéreuse",
        subtitle: "Quand utiliser cette forme de donation ?",
        items: [
          {
            title: "Transmission d'un bien immobilier",
            description: "Transmettre un bien immobilier à un enfant tout en recevant une contrepartie financière, réduisant ainsi les droits de mutation."
          },
          {
            title: "Optimisation fiscale",
            description: "Bénéficier d'une réduction des droits de mutation tout en transmettant progressivement le patrimoine."
          },
          {
            title: "Aide financière",
            description: "Aider un enfant à acquérir un bien tout en optimisant la fiscalité de la transmission."
          }
        ]
      },
      fiscalite: {
        title: "Fiscalité de la donation onéreuse",
        subtitle: "Les avantages fiscaux par rapport à une vente classique",
        points: [
          {
            title: "Réduction des droits de mutation",
            description: "Les droits de mutation sont réduits par rapport à une vente classique, pouvant atteindre jusqu'à 50% de réduction."
          },
          {
            title: "Droits de donation",
            description: "Les droits de donation s'appliquent sur la différence entre la valeur vénale et le prix de vente, permettant une optimisation fiscale."
          },
          {
            title: "Abattements applicables",
            description: "Les abattements de donation (100 000 € par parent et par enfant tous les 15 ans) s'appliquent sur la part gratuite."
          }
        ],
        exampleTitle: "Exemple concret : donation d'un bien de 300 000 €",
        exampleItems: [
          { label: "Valeur vénale", value: "300 000 €" },
          { label: "Prix de vente", value: "200 000 €" },
          { label: "Part gratuite", value: "100 000 €" }
        ],
        exampleResult: "Droits de donation calculés uniquement sur la part gratuite : <strong>5 000 €</strong> au lieu de droits de mutation de 20 000 €"
      },
      comparaison: {
        title: "Donation gratuite vs donation onéreuse",
        subtitle: "Comparaison des deux formes de donation",
        rows: [
          {
            feature: "Contrepartie",
            gratuite: "Aucune",
            onereuse: "Obligatoire (prix de vente)"
          },
          {
            feature: "Droits de mutation",
            gratuite: "Non applicables",
            onereuse: "Réduits (jusqu'à 50%)"
          },
          {
            feature: "Droits de donation",
            gratuite: "Sur la totalité",
            onereuse: "Sur la part gratuite uniquement"
          },
          {
            feature: "Avantage fiscal",
            gratuite: "Abattements tous les 15 ans",
            onereuse: "Réduction droits de mutation + abattements"
          }
        ]
      },
      vision: {
        title: "Pourquoi choisir la donation onéreuse ?",
        subtitle: "Les avantages de cette forme de transmission",
        items: [
          {
            title: "Optimisation fiscale",
            description: "Réduire les droits de mutation tout en transmettant progressivement"
          },
          {
            title: "Contrepartie financière",
            description: "Recevoir une contrepartie tout en optimisant la fiscalité"
          },
          {
            title: "Transmission progressive",
            description: "Transmettre le patrimoine tout en conservant une partie de la valeur"
          }
        ],
        ctaText: "La donation onéreuse permet de <strong>combiner transmission et rémunération</strong> tout en <strong>optimisant la fiscalité</strong>. <strong>Nos experts vous accompagnent</strong> pour structurer votre donation dans les meilleures conditions."
      },
      finalCta: {
        title: "Optimisez votre donation onéreuse avec Azalée Patrimoine",
        subtitle: "Nos conseillers en gestion de patrimoine vous accompagnent pour structurer votre transmission et réduire votre fiscalité.",
        buttons: [
          {
            text: "Prendre rendez-vous",
            url: "https://calendly.com/rdv-azalee-patrimoine/30min"
          }
        ]
      }
    }
  },
  'patrimoine/bilan': {
    title: 'Bilan patrimonial : audit et stratégie | Azalée Patrimoine',
    content: {
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
    }
  },
  'outils/guides-pratiques': {
    title: 'Guides Pratiques',
    content: {
      hero: {
        title: "Guides pratiques partenaires",
        subtitle: "Supports pédagogiques de nos partenaires",
        description: "Nous mettons à disposition les guides pédagogiques de nos partenaires assureurs et sociétés de gestion pour vous accompagner dans vos choix d'investissement."
      },
      partners: [
        {
          id: "selencia",
          name: "Selencia",
          description: "Guide complet sur les produits d'assurance-vie et de capitalisation",
          logo: "/images/azalee-patrimoine-selencia.svg",
          logoType: "svg",
          category: "assurance",
          products: ["Assurance-vie", "Capitalisation", "Épargne retraite"],
          features: ["Caractéristiques détaillées", "Tableau des frais", "Avantages fiscaux", "Modalités de souscription"]
        },
        {
          id: "cardif",
          name: "Cardif",
          description: "Supports pédagogiques sur les contrats d'assurance et d'épargne",
          logo: "/images/azalee-patrimoine-cardif-logo.svg",
          logoType: "svg",
          category: "assurance",
          products: ["Assurance-vie", "PER", "Contrats de capitalisation"],
          features: ["Fonctionnement des produits", "Fiscalité applicable", "Risques et garanties", "Conseils d'utilisation"]
        },
        {
          id: "swisslife",
          name: "SwissLife",
          description: "Guides spécialisés en gestion de patrimoine et assurance",
          logo: "/images/azalee-patrimoine-sl-logo-svg.svg",
          logoType: "svg",
          category: "patrimoine",
          products: ["Assurance-vie", "Gestion de patrimoine", "Transmission", "Retraite"],
          features: ["Stratégies patrimoniales", "Optimisation fiscale", "Transmission intergénérationnelle", "Planification retraite"]
        },
        {
          id: "vieplus",
          name: "Vie Plus",
          description: "Documentation sur les produits d'assurance-vie et d'épargne",
          logo: "/images/azalee-patrimoine-vieplus.svg",
          logoType: "svg",
          category: "assurance",
          products: ["Assurance-vie", "Épargne", "Capitalisation"],
          features: ["Présentation des contrats", "Avantages concurrentiels", "Fiscalité", "Flexibilité des versements"]
        },
        {
          id: "uaflife",
          name: "UAF Life",
          description: "Guides pratiques sur l'assurance-vie et les placements",
          logo: "🎯",
          logoType: "emoji",
          category: "assurance",
          products: ["Assurance-vie", "Placements", "Épargne"],
          features: ["Comparaison des supports", "Rendements historiques", "Frais et charges", "Conseils d'allocation"]
        },
        {
          id: "intencial",
          name: "Intencial",
          description: "Supports pédagogiques sur la gestion d'actifs et l'assurance",
          logo: "/images/azalee-patrimoine-intencial-1.webp",
          logoType: "svg",
          category: "gestion",
          products: ["Gestion d'actifs", "Assurance-vie", "OPCVM"],
          features: ["Philosophie d'investissement", "Gestion active", "Performance", "Transparence des frais"]
        }
      ],
      categories: {
        all: "Tous les partenaires",
        assurance: "Assurance",
        patrimoine: "Patrimoine",
        gestion: "Gestion d'actifs"
      },
      featured: {
        title: "Guide du mois",
        guide: {
          title: "Assurance-vie 2024 : les nouveautés réglementaires",
          description: "Découvrez les dernières évolutions réglementaires et leurs impacts sur vos contrats d'assurance-vie.",
          readTime: "25 min",
          difficulty: "Intermédiaire"
        }
      },
      benefits: {
        title: "Pourquoi consulter nos guides partenaires ?",
        benefits: [
          "Informations officielles et actualisées des émetteurs",
          "Comparaison objective des caractéristiques et frais",
          "Présentation claire des avantages et inconvénients",
          "Conseils pratiques pour optimiser vos investissements"
        ]
      }
    }
  },
  'fiscalite/tmi-prelevements-sociaux': {
    title: 'TMI et Prélèvements Sociaux',
    content: {
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
    }
  },
  'fiscalite/lois-fiscales': {
    title: 'Lois Fiscales',
    content: {
      hero: {
        title: "Lois fiscales",
        subtitle: "Guide complet",
        description: "Optimiser sa fiscalité, c'est protéger et valoriser durablement son patrimoine. Les dispositifs fiscaux d'investissement immobilier offrent des leviers puissants pour réduire son imposition, préparer sa retraite ou transmettre plus efficacement. Ce guide décrypte les 7 principaux régimes en vigueur, à jour des dernières réformes, pour vous aider à arbitrer en toute connaissance de cause."
      },
      laws: [
        { id: 1, name: "Loi Pinel", shortName: "Pinel", category: "immobilier", path: "/fiscalite/loi-pinel", color: "bg-[#B99066]" },
        { id: 2, name: "Loi Malraux", shortName: "Malraux", category: "immobilier", path: "/fiscalite/loi-malraux", color: "bg-[#B99066]" },
        { id: 3, name: "Loi Cosse", shortName: "Cosse", category: "immobilier", path: "/fiscalite/loi-cosse", color: "bg-[#B99066]" },
        { id: 4, name: "Loi Denormandie", shortName: "Denormandie", category: "immobilier", path: "/fiscalite/loi-denormandie", color: "bg-[#B99066]" },
        { id: 5, name: "Loi Girardin", shortName: "Girardin", category: "immobilier", path: "/fiscalite/loi-girardin", color: "bg-[#B99066]" },
        { id: 6, name: "Monument Historique", shortName: "Monument", category: "immobilier", path: "/fiscalite/monument-historique", color: "bg-[#B99066]" }
      ],
      categories: [
        { id: "immobilier", label: "Immobilier" },
        { id: "entreprise", label: "Entreprise" },
        { id: "patrimoine", label: "Patrimoine" },
        { id: "retraite", label: "Retraite" }
      ],
      dispositifs: {
        immobilier: [
          {
            name: "Loi Pinel",
            description: "Réduction d'impôt de 12% par an",
            avantages: ["Réduction d'impôt de 12% par an", "Investissement dans le neuf uniquement", "Engagement de location de 9 ans"],
            conditions: ["Plafond de 300 000€ par an", "Respect des plafonds de loyers", "Respect des plafonds de ressources des locataires"]
          },
          {
            name: "Loi Malraux",
            description: "Réduction d'impôt jusqu'à 30%",
            avantages: ["Réduction d'impôt jusqu'à 30%", "Restauration de monuments historiques", "Engagement de location de 9 ans"],
            conditions: ["Bien situé en secteur sauvegardé", "Travaux de restauration", "Respect des normes patrimoniales"]
          }
        ],
        entreprise: [],
        patrimoine: [],
        retraite: []
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
          { reduction: "12%", annees: "9 ans" },
          { reduction: "12%", annees: "12 ans" }
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
        cas_pratique: "Exemple : Investissement de 200 000€ dans un appartement Pinel à Paris. Réduction d'impôt de 24 000€ par an pendant 9 ans, soit 216 000€ au total.",
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
      }
    }
  },
  'equipe': {
    title: 'Notre Équipe - Azalée Patrimoine',
    content: {
      hero: {
        title: "Notre équipe de conseillers",
        subtitle: "Des experts passionnés à votre service",
        description: "Chaque membre de notre équipe partage la même vision : vous accompagner avec excellence dans la gestion et la transmission de votre patrimoine."
      },
      team: {
        members: [
          {
            name: "Jean-Marc Dupont",
            position: "Fondateur & Directeur",
            photo: "/images/azalee-patrimoine-jean.webp",
            bio: "Fort de plus de 20 ans d'expérience dans le secteur financier, Jean-Marc a fondé Azalée Patrimoine avec la conviction que chaque client mérite un accompagnement sur-mesure. Son expertise couvre l'ensemble des domaines patrimoniaux, de l'optimisation fiscale à la transmission.",
            certifications: ["CIF - Conseiller en Investissements Financiers", "Master en Gestion de Patrimoine"],
            experience: "20+ ans"
          },
          {
            name: "Sophie Martin",
            position: "Conseillère en Gestion de Patrimoine",
            photo: "/images/azalee-patrimoine-sophie.webp",
            bio: "Sophie accompagne nos clients dans leurs projets d'investissement immobilier et financier. Sa double compétence juridique et financière lui permet d'apporter des solutions globales et adaptées à chaque situation.",
            certifications: ["CIF - Conseiller en Investissements Financiers", "Diplôme de Notariat"],
            experience: "15 ans"
          },
          {
            name: "Thomas Bernard",
            position: "Expert Fiscal",
            photo: "/images/azalee-patrimoine-client1.webp",
            bio: "Spécialiste de l'optimisation fiscale, Thomas aide nos clients à réduire leur imposition tout en construisant leur patrimoine. Il maîtrise parfaitement les dispositifs de défiscalisation immobilière et les stratégies d'investissement.",
            certifications: ["Expert-Comptable Diplômé", "Certification AMF"],
            experience: "12 ans"
          },
          {
            name: "Marie Leroy",
            position: "Conseillère Retraite & Prévoyance",
            photo: "/images/azalee-patrimoine-client2.webp",
            bio: "Marie accompagne nos clients dans la préparation de leur retraite et la protection de leur famille. Son approche pédagogique permet à chacun de comprendre les enjeux et de prendre des décisions éclairées.",
            certifications: ["CIF - Conseiller en Investissements Financiers", "Spécialisation Retraite"],
            experience: "10 ans"
          }
        ]
      },
      expertise: {
        title: "Nos domaines d'expertise",
        items: [
          {
            icon: "📊",
            title: "Gestion de patrimoine",
            description: "Stratégies personnalisées pour optimiser et développer votre patrimoine"
          },
          {
            icon: "🏠",
            title: "Investissement immobilier",
            description: "Accompagnement complet dans vos projets immobiliers"
          },
          {
            icon: "💰",
            title: "Optimisation fiscale",
            description: "Solutions légales pour réduire votre imposition"
          },
          {
            icon: "🛡️",
            title: "Protection & transmission",
            description: "Sécurisez l'avenir de vos proches"
          }
        ]
      },
      cta: {
        title: "Prêt à rencontrer votre conseiller ?",
        subtitle: "Prenez rendez-vous pour un premier échange gratuit et sans engagement. Nous étudierons ensemble votre situation et vos objectifs.",
        button: "Prendre rendez-vous",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  'qui-sommes-nous': {
    title: 'Qui sommes-nous - Azalée Patrimoine',
    content: {
      hero: {
        title: "Qui sommes-nous ?",
        subtitle: "Azalée Patrimoine, votre partenaire de confiance pour la gestion de votre patrimoine",
        description: "Depuis notre création, nous accompagnons les particuliers et les professionnels dans l'optimisation et la transmission de leur patrimoine."
      },
      histoire: {
        title: "Notre histoire",
        paragraphs: [
          "Azalée Patrimoine est née de la conviction qu'une gestion patrimoniale de qualité ne devait pas être réservée aux grandes fortunes. Notre fondateur, fort de plusieurs années d'expérience dans le secteur bancaire et financier, a décidé de créer un cabinet indépendant, libre de tout conflit d'intérêt.",
          "Depuis notre création, nous avons accompagné des centaines de familles dans la construction, la protection et la transmission de leur patrimoine. Chaque situation est unique, et c'est cette singularité qui guide notre approche personnalisée.",
          "Aujourd'hui, Azalée Patrimoine est devenue une référence en matière de conseil patrimonial, reconnue pour son expertise, sa transparence et la qualité de son accompagnement sur le long terme."
        ]
      },
      mission: {
        title: "Notre mission",
        intro: "Chez Azalée Patrimoine, notre mission est claire :",
        points: [
          {
            title: "Accompagner",
            description: "Nous accompagnons chaque client dans la réalisation de ses objectifs patrimoniaux, qu'il s'agisse de préparer sa retraite, de protéger sa famille ou d'optimiser sa fiscalité."
          },
          {
            title: "Conseiller",
            description: "Nous fournissons des conseils indépendants et objectifs, toujours dans l'intérêt exclusif de nos clients. Notre rémunération est transparente et alignée sur vos intérêts."
          },
          {
            title: "Simplifier",
            description: "Nous rendons accessibles les stratégies patrimoniales complexes grâce à une pédagogie claire et un accompagnement personnalisé tout au long de votre parcours."
          }
        ]
      },
      valeurs: {
        title: "Nos valeurs",
        items: [
          {
            icon: "🤝",
            title: "Confiance",
            description: "La confiance est au cœur de notre relation avec nos clients. Elle se construit sur la transparence, l'écoute et le respect de nos engagements."
          },
          {
            icon: "🎯",
            title: "Excellence",
            description: "Nous visons l'excellence dans chaque conseil, chaque recommandation. Notre équipe se forme en permanence pour vous offrir les meilleures solutions."
          },
          {
            icon: "🔒",
            title: "Indépendance",
            description: "Notre indépendance garantit des conseils objectifs, libres de tout conflit d'intérêt. Nous sélectionnons les solutions les plus adaptées à votre situation."
          },
          {
            icon: "👥",
            title: "Proximité",
            description: "Nous privilégions une relation de proximité avec chaque client. Votre conseiller dédié vous accompagne sur le long terme."
          }
        ]
      },
      cta: {
        title: "Envie d'en savoir plus ?",
        subtitle: "Rencontrez notre équipe et découvrez comment nous pouvons vous accompagner dans la gestion de votre patrimoine.",
        primaryButton: "Découvrir notre équipe",
        primaryUrl: "/equipe",
        secondaryButton: "Prendre rendez-vous",
        secondaryUrl: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  }
};

async function initAllContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    let successCount = 0;
    let errorCount = 0;

    for (const [path, pageData] of Object.entries(allPagesContent)) {
      try {
        const existingPage = await PageContent.findOne({ path });
        
        if (existingPage) {
          // Mettre à jour la page existante
          existingPage.content = { ...existingPage.content, ...pageData.content };
          existingPage.published = true;
          existingPage.lastModified = new Date();
          if (pageData.title) {
            existingPage.title = pageData.title;
          }
          await existingPage.save();
          console.log(`✅ ${path} - Page mise à jour`);
          successCount++;
        } else {
          // Créer une nouvelle page
          await PageContent.create({
            path,
            title: pageData.title || path,
            content: pageData.content,
            published: true,
            lastModified: new Date()
          });
          console.log(`✅ ${path} - Page créée`);
          successCount++;
        }
      } catch (error) {
        console.error(`❌ ${path} - Erreur:`, error.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log('📊 RÉSUMÉ');
    console.log('='.repeat(70));
    console.log(`✅ Pages initialisées avec succès: ${successCount}`);
    console.log(`❌ Erreurs: ${errorCount}`);
    console.log(`📄 Total traité: ${Object.keys(allPagesContent).length}`);

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initAllContent();

