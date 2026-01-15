// Sync remaining pages with full content
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const fullContentPages = [
  // ==================== CONTACT ====================
  {
    path: 'contact',
    title: 'Contact',
    content: {
      hero: {
        title: "Contactez-nous",
        subtitle: "Nos experts patrimoniaux sont à votre disposition pour répondre à vos questions.",
        description: "Que vous souhaitiez un bilan patrimonial, des conseils d'investissement ou simplement des informations, nous sommes là pour vous accompagner."
      },
      coordonnees: {
        title: "Nos coordonnées",
        telephone: "+33 1 85 09 67 92",
        email: "contact@azalee-patrimoine.fr",
        adresse: "75 rue de Tolbiac, 75013 Paris",
        horaires: "Lundi - Vendredi : 9h - 19h"
      },
      form: {
        title: "Envoyez-nous un message",
        fields: [
          { name: "nom", label: "Votre nom", type: "text", required: true },
          { name: "email", label: "Votre email", type: "email", required: true },
          { name: "telephone", label: "Votre téléphone", type: "tel", required: false },
          { name: "sujet", label: "Sujet", type: "select", options: ["Bilan patrimonial", "Investissement immobilier", "Placements financiers", "Défiscalisation", "Autre"] },
          { name: "message", label: "Votre message", type: "textarea", required: true }
        ],
        submitButton: "Envoyer le message"
      },
      cta: {
        title: "Préférez-vous nous appeler ?",
        description: "Nos conseillers sont disponibles pour un échange téléphonique.",
        buttonText: "Appeler maintenant"
      },
      seo: {
        metaTitle: "Contact | Azalée Patrimoine",
        metaDescription: "Contactez Azalée Patrimoine pour un conseil patrimonial personnalisé. Téléphone, email ou rendez-vous."
      }
    }
  },

  // ==================== NOTRE APPROCHE ====================
  {
    path: 'notre-approche',
    title: 'Notre Approche',
    content: {
      hero: {
        title: "Notre approche",
        subtitle: "Un accompagnement sur-mesure pour votre patrimoine",
        description: "Chez Azalée Patrimoine, nous croyons que chaque situation est unique. Notre approche personnalisée vous garantit des conseils adaptés à vos objectifs et à votre situation."
      },
      valeurs: {
        title: "Nos valeurs",
        items: [
          { titre: "Indépendance", description: "Nous ne sommes liés à aucun établissement financier, ce qui garantit des conseils objectifs." },
          { titre: "Transparence", description: "Nous vous expliquons clairement les avantages et les risques de chaque solution." },
          { titre: "Expertise", description: "Notre équipe est composée de professionnels certifiés et expérimentés." },
          { titre: "Accompagnement", description: "Nous vous suivons dans la durée pour adapter votre stratégie à l'évolution de votre vie." }
        ]
      },
      methode: {
        title: "Notre méthode",
        etapes: [
          { numero: 1, titre: "Écoute et compréhension", description: "Nous prenons le temps de comprendre votre situation, vos objectifs et vos contraintes." },
          { numero: 2, titre: "Analyse approfondie", description: "Nous réalisons un bilan patrimonial complet pour identifier les opportunités." },
          { numero: 3, titre: "Recommandations personnalisées", description: "Nous vous proposons des solutions adaptées à votre profil et à vos objectifs." },
          { numero: 4, titre: "Mise en œuvre", description: "Nous vous accompagnons dans la mise en place des solutions retenues." },
          { numero: 5, titre: "Suivi régulier", description: "Nous faisons le point régulièrement pour ajuster votre stratégie si nécessaire." }
        ]
      },
      cta: {
        title: "Découvrez notre approche",
        description: "Prenez rendez-vous pour un premier échange gratuit et sans engagement.",
        buttonText: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Notre Approche | Azalée Patrimoine",
        metaDescription: "Découvrez l'approche personnalisée d'Azalée Patrimoine : indépendance, transparence, expertise."
      }
    }
  },

  // ==================== NOS COURTIERS ====================
  {
    path: 'nos-courtiers',
    title: 'Nos Courtiers',
    content: {
      hero: {
        title: "Nos courtiers partenaires",
        subtitle: "Un réseau d'experts à votre service",
        description: "Azalée Patrimoine s'appuie sur un réseau de courtiers partenaires sélectionnés pour leur expertise et leur professionnalisme."
      },
      partenaires: {
        title: "Nos partenaires de confiance",
        description: "Nous travaillons avec les meilleurs acteurs du marché :",
        items: [
          { nom: "Courtiers en assurance", description: "Accès aux meilleurs contrats d'assurance-vie du marché" },
          { nom: "Courtiers immobiliers", description: "Expertise sur les marchés immobiliers locaux" },
          { nom: "Gestionnaires d'actifs", description: "Gestion sous mandat de qualité institutionnelle" },
          { nom: "Experts fiscaux", description: "Conseil et accompagnement fiscal pointu" }
        ]
      },
      avantages: {
        title: "Les avantages de notre réseau",
        items: [
          "Accès à une large gamme de produits",
          "Conditions tarifaires négociées",
          "Expertise multi-domaines",
          "Accompagnement personnalisé"
        ]
      },
      cta: {
        title: "Bénéficiez de notre réseau",
        description: "Profitez de notre expertise et de nos partenariats pour optimiser votre patrimoine.",
        buttonText: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Nos Courtiers | Azalée Patrimoine",
        metaDescription: "Découvrez le réseau de courtiers partenaires d'Azalée Patrimoine."
      }
    }
  },

  // ==================== MENTIONS LEGALES ====================
  {
    path: 'mentions-legales',
    title: 'Mentions Légales',
    content: {
      hero: {
        title: "Mentions légales",
        subtitle: "Informations légales du site azalee-patrimoine.fr"
      },
      editeur: {
        title: "Éditeur du site",
        nom: "Azalée Patrimoine SAS",
        adresse: "75 rue de Tolbiac, 75013 Paris",
        siret: "XXX XXX XXX XXXXX",
        capital: "10 000 €",
        directeur: "Directeur de la publication : [Nom du dirigeant]"
      },
      hebergeur: {
        title: "Hébergement",
        nom: "Vercel Inc.",
        adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, USA"
      },
      proprieteIntellectuelle: {
        title: "Propriété intellectuelle",
        description: "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive d'Azalée Patrimoine, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires."
      },
      donnees: {
        title: "Données personnelles",
        description: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à : contact@azalee-patrimoine.fr"
      },
      seo: {
        metaTitle: "Mentions Légales | Azalée Patrimoine",
        metaDescription: "Mentions légales du site Azalée Patrimoine : éditeur, hébergeur, propriété intellectuelle."
      }
    }
  },

  // ==================== CGU ====================
  {
    path: 'conditions-generales',
    title: 'Conditions Générales',
    content: {
      hero: {
        title: "Conditions générales d'utilisation",
        subtitle: "Conditions applicables à l'utilisation du site azalee-patrimoine.fr"
      },
      articles: [
        {
          titre: "Article 1 - Objet",
          contenu: "Les présentes CGU ont pour objet de définir les conditions d'utilisation du site azalee-patrimoine.fr et des services proposés par Azalée Patrimoine."
        },
        {
          titre: "Article 2 - Accès au site",
          contenu: "L'accès au site est gratuit. Les frais d'accès à Internet et d'équipement nécessaire restent à la charge de l'utilisateur."
        },
        {
          titre: "Article 3 - Services",
          contenu: "Azalée Patrimoine propose des services de conseil en gestion de patrimoine. Les informations présentes sur le site ont un caractère informatif et ne constituent pas un conseil personnalisé."
        },
        {
          titre: "Article 4 - Responsabilité",
          contenu: "Azalée Patrimoine s'efforce de fournir des informations exactes et à jour. Toutefois, elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées."
        },
        {
          titre: "Article 5 - Données personnelles",
          contenu: "Les données personnelles collectées sont traitées conformément à notre politique de confidentialité et au RGPD."
        }
      ],
      seo: {
        metaTitle: "CGU | Azalée Patrimoine",
        metaDescription: "Conditions générales d'utilisation du site Azalée Patrimoine."
      }
    }
  },

  // ==================== ESPACE CLIENT ====================
  {
    path: 'espace-client',
    title: 'Espace Client',
    content: {
      hero: {
        title: "Espace client",
        subtitle: "Accédez à votre espace personnel sécurisé",
        description: "Retrouvez tous vos documents, suivez l'évolution de vos placements et communiquez avec votre conseiller."
      },
      fonctionnalites: {
        title: "Vos fonctionnalités",
        items: [
          { titre: "Tableau de bord", description: "Vue d'ensemble de votre patrimoine" },
          { titre: "Documents", description: "Accès à tous vos contrats et relevés" },
          { titre: "Messagerie", description: "Échangez avec votre conseiller" },
          { titre: "Rendez-vous", description: "Planifiez vos prochains rendez-vous" }
        ]
      },
      connexion: {
        title: "Connexion",
        description: "Connectez-vous avec vos identifiants",
        fields: [
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Mot de passe", type: "password" }
        ],
        submitButton: "Se connecter",
        forgotPassword: "Mot de passe oublié ?"
      },
      contact: {
        title: "Pas encore client ?",
        description: "Découvrez nos services et prenez rendez-vous pour un premier échange gratuit.",
        buttonText: "Nous contacter"
      },
      seo: {
        metaTitle: "Espace Client | Azalée Patrimoine",
        metaDescription: "Connectez-vous à votre espace client Azalée Patrimoine."
      }
    }
  },

  // ==================== OUTILS ====================
  {
    path: 'outils',
    title: 'Outils et Calculateurs',
    content: {
      hero: {
        title: "Outils et calculateurs",
        subtitle: "Des outils pratiques pour simuler et planifier",
        description: "Utilisez nos calculateurs en ligne pour estimer vos impôts, simuler un investissement ou planifier votre retraite."
      },
      outils: {
        title: "Nos outils",
        items: [
          { nom: "Simulateur d'impôts", description: "Estimez votre impôt sur le revenu", icon: "calculator" },
          { nom: "Calculateur de crédit", description: "Simulez vos mensualités de prêt", icon: "home" },
          { nom: "Simulateur retraite", description: "Projetez votre pension future", icon: "trending-up" },
          { nom: "Calculateur d'épargne", description: "Estimez votre capital futur", icon: "piggy-bank" },
          { nom: "Simulateur assurance-vie", description: "Projetez la valeur de votre contrat", icon: "shield" },
          { nom: "Calculateur PFU", description: "Comparez flat tax et barème", icon: "percent" }
        ]
      },
      cta: {
        title: "Besoin d'un accompagnement personnalisé ?",
        description: "Nos experts sont disponibles pour analyser votre situation en détail.",
        buttonText: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Outils Patrimoniaux | Azalée Patrimoine",
        metaDescription: "Calculateurs et simulateurs patrimoniaux : impôts, crédit, retraite, épargne."
      }
    }
  },

  // ==================== OUTILS FINANCIERS ====================
  {
    path: 'outils-financiers',
    title: 'Outils Financiers',
    content: {
      hero: {
        title: "Outils financiers",
        subtitle: "Simulateurs et calculateurs pour vos décisions financières",
        description: "Des outils pratiques pour vous aider à prendre les bonnes décisions d'investissement."
      },
      calculateurs: {
        title: "Nos calculateurs",
        items: [
          { nom: "Rendement composé", description: "Calculez l'effet des intérêts composés sur votre épargne" },
          { nom: "Allocation d'actifs", description: "Déterminez la répartition optimale de votre portefeuille" },
          { nom: "Ratio risque/rendement", description: "Évaluez la performance ajustée du risque" },
          { nom: "Coût total de possession", description: "Calculez les frais totaux de vos investissements" }
        ]
      },
      guides: {
        title: "Guides pratiques",
        items: [
          "Comment diversifier son portefeuille ?",
          "Comprendre la fiscalité des placements",
          "Choisir entre PEA et assurance-vie",
          "Les erreurs à éviter en bourse"
        ]
      },
      cta: {
        title: "Un accompagnement personnalisé ?",
        description: "Nos experts vous aident à optimiser vos investissements.",
        buttonText: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Outils Financiers | Azalée Patrimoine",
        metaDescription: "Simulateurs et calculateurs financiers pour vos décisions d'investissement."
      }
    }
  },

  // ==================== PATRIMOINE AUTRE ====================
  {
    path: 'patrimoine/autre',
    title: 'Autres Services Patrimoniaux',
    content: {
      hero: {
        title: "Autres services patrimoniaux",
        subtitle: "Des solutions complètes pour tous vos besoins patrimoniaux",
        description: "Au-delà des services classiques, nous proposons des solutions adaptées à des situations particulières."
      },
      services: {
        title: "Nos services complémentaires",
        items: [
          { nom: "Audit patrimonial", description: "Analyse complète de votre situation" },
          { nom: "Conseil en organisation", description: "Structuration de votre patrimoine (SCI, holding...)" },
          { nom: "Accompagnement expatriation", description: "Conseil pour les Français de l'étranger" },
          { nom: "Conseil aux chefs d'entreprise", description: "Optimisation patrimoine personnel/professionnel" }
        ]
      },
      expertises: {
        title: "Nos expertises spécifiques",
        items: [
          "Démembrement de propriété",
          "Pactes Dutreil",
          "Family office",
          "Restructuration de dettes"
        ]
      },
      cta: {
        title: "Une situation particulière ?",
        description: "Nos experts analysent votre cas et vous proposent des solutions sur-mesure.",
        buttonText: "Prendre rendez-vous"
      },
      seo: {
        metaTitle: "Autres Services | Azalée Patrimoine",
        metaDescription: "Services patrimoniaux complémentaires : audit, organisation, expatriation, chefs d'entreprise."
      }
    }
  },

  // ==================== PLACEMENTS - CONTRAT CAPITALISATION ====================
  {
    path: 'placements/contrat-capitalisation',
    title: 'Contrat de Capitalisation',
    content: {
      hero: {
        title: "Contrat de capitalisation",
        subtitle: "L'alternative patrimoniale à l'assurance-vie",
        description: "Le contrat de capitalisation offre des avantages uniques, notamment en matière de transmission et pour les personnes morales."
      },
      definition: {
        title: "Qu'est-ce qu'un contrat de capitalisation ?",
        description: "Le contrat de capitalisation est une enveloppe d'épargne similaire à l'assurance-vie mais avec des particularités :",
        particularites: [
          "Souscription possible par les personnes morales",
          "Transmission par donation possible",
          "Pas de clause bénéficiaire",
          "Non dénoué au décès du souscripteur"
        ]
      },
      avantages: {
        title: "Avantages spécifiques",
        items: [
          { titre: "Donation possible", description: "Contrairement à l'assurance-vie, on peut donner son contrat de son vivant" },
          { titre: "Personnes morales", description: "Les sociétés peuvent souscrire (trésorerie d'entreprise)" },
          { titre: "IFI", description: "La partie en unités de compte n'entre pas dans l'assiette IFI" },
          { titre: "Succession", description: "Le contrat n'est pas dénoué au décès, il entre dans la succession" }
        ]
      },
      fiscalite: {
        title: "Fiscalité",
        description: "Fiscalité identique à l'assurance-vie pour les rachats :",
        details: [
          "PFU 30% avant 8 ans",
          "Abattement + taux réduit après 8 ans",
          "Option pour le barème progressif"
        ]
      },
      cta: {
        title: "Découvrir le contrat de capitalisation",
        description: "Nos experts vous présentent cette solution et ses avantages.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Contrat de Capitalisation | Azalée Patrimoine",
        metaDescription: "Le contrat de capitalisation : alternative à l'assurance-vie avec des avantages spécifiques."
      }
    }
  },

  // ==================== PLACEMENTS - TAUX INTERETS ====================
  {
    path: 'placements/taux-interets',
    title: 'Taux et Intérêts',
    content: {
      hero: {
        title: "Taux et intérêts",
        subtitle: "Comprendre les taux pour optimiser vos placements",
        description: "Les taux d'intérêt impactent directement la rentabilité de vos placements. Apprenez à les décrypter."
      },
      types: {
        title: "Les différents types de taux",
        items: [
          { nom: "Taux nominal", description: "Taux affiché brut, avant inflation et fiscalité" },
          { nom: "Taux réel", description: "Taux nominal corrigé de l'inflation" },
          { nom: "Taux net", description: "Taux après fiscalité (ce que vous gagnez vraiment)" },
          { nom: "TME", description: "Taux Moyen des Emprunts d'État (référence)" }
        ]
      },
      tauxActuels: {
        title: "Taux actuels de référence",
        date: "Janvier 2026",
        taux: [
          { nom: "Livret A", taux: "3,00%", commentaire: "Taux réglementé" },
          { nom: "LEP", taux: "5,00%", commentaire: "Sous conditions de ressources" },
          { nom: "Fonds euros", taux: "2,50-4,00%", commentaire: "Selon les contrats" },
          { nom: "OAT 10 ans", taux: "2,80%", commentaire: "Référence obligataire" }
        ]
      },
      conseil: {
        title: "Notre conseil",
        description: "Le taux affiché n'est pas tout. Pensez à calculer le rendement réel (après inflation et impôts) pour comparer vos placements."
      },
      cta: {
        title: "Optimiser le rendement de votre épargne",
        description: "Nos experts vous aident à choisir les placements les plus adaptés.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Taux et Intérêts | Azalée Patrimoine",
        metaDescription: "Comprendre les taux d'intérêt pour optimiser vos placements : taux nominal, réel, net."
      }
    }
  },

  // ==================== PRODUITS STRUCTURES SUBPAGES ====================
  {
    path: 'placements/produits-structures/ambition-pharma-2026',
    title: 'Ambition Pharma 2026',
    content: {
      hero: {
        title: "Ambition Pharma 2026",
        subtitle: "Produit structuré sur le secteur pharmaceutique",
        description: "Investissez dans le secteur de la santé avec une protection partielle du capital."
      },
      caracteristiques: {
        title: "Caractéristiques du produit",
        items: [
          { label: "Sous-jacent", value: "Panier d'actions pharmaceutiques" },
          { label: "Durée maximale", value: "5 ans" },
          { label: "Coupon conditionnel", value: "8% par an" },
          { label: "Barrière de protection", value: "-40%" },
          { label: "Sortie anticipée", value: "Annuelle si performance ≥ 0%" }
        ]
      },
      mecanisme: {
        title: "Mécanisme du produit",
        description: "Ambition Pharma 2026 verse un coupon de 8% par an si le panier est au-dessus de -20%. Le capital est protégé tant que le panier reste au-dessus de -40% à l'échéance."
      },
      risques: {
        title: "Risques",
        items: [
          "Perte en capital si le panier baisse de plus de 40%",
          "Pas de coupon si le panier baisse de plus de 20%",
          "Liquidité limitée avant l'échéance"
        ]
      },
      cta: {
        title: "Souscrire à ce produit",
        description: "Contactez nos experts pour plus d'informations.",
        buttonText: "Demander des informations"
      },
      seo: {
        metaTitle: "Ambition Pharma 2026 | Azalée Patrimoine",
        metaDescription: "Produit structuré Ambition Pharma 2026 : investissez dans le secteur pharmaceutique."
      }
    }
  },

  {
    path: 'placements/produits-structures/athena-ia-robotique-2025',
    title: 'Athena IA Robotique 2025',
    content: {
      hero: {
        title: "Athena IA Robotique 2025",
        subtitle: "Produit structuré sur l'intelligence artificielle et la robotique",
        description: "Profitez de la croissance du secteur technologique avec un mécanisme de protection."
      },
      caracteristiques: {
        title: "Caractéristiques du produit",
        items: [
          { label: "Sous-jacent", value: "Indice IA & Robotique" },
          { label: "Durée maximale", value: "4 ans" },
          { label: "Coupon à l'échéance", value: "40% (10% par an)" },
          { label: "Barrière de protection", value: "-30%" },
          { label: "Sortie anticipée", value: "Trimestrielle si performance ≥ +5%" }
        ]
      },
      mecanisme: {
        title: "Mécanisme du produit",
        description: "Athena IA Robotique capitalise les coupons jusqu'à l'échéance ou une sortie anticipée. Protection du capital tant que l'indice reste au-dessus de -30%."
      },
      cta: {
        title: "En savoir plus",
        description: "Contactez nos experts pour plus d'informations sur ce produit.",
        buttonText: "Demander des informations"
      },
      seo: {
        metaTitle: "Athena IA Robotique 2025 | Azalée Patrimoine",
        metaDescription: "Produit structuré Athena IA Robotique 2025 : investissez dans l'IA et la robotique."
      }
    }
  },

  {
    path: 'placements/produits-structures/athena-luxe-2025',
    title: 'Athena Luxe 2025',
    content: {
      hero: {
        title: "Athena Luxe 2025",
        subtitle: "Produit structuré sur le secteur du luxe",
        description: "Investissez dans les grandes maisons du luxe français et européen."
      },
      caracteristiques: {
        title: "Caractéristiques du produit",
        items: [
          { label: "Sous-jacent", value: "Panier LVMH, Hermès, Kering" },
          { label: "Durée maximale", value: "5 ans" },
          { label: "Coupon capitalisé", value: "9% par an" },
          { label: "Barrière de protection", value: "-35%" },
          { label: "Sortie anticipée", value: "Annuelle si performance ≥ 0%" }
        ]
      },
      cta: {
        title: "En savoir plus",
        description: "Contactez nos experts pour plus d'informations sur ce produit.",
        buttonText: "Demander des informations"
      },
      seo: {
        metaTitle: "Athena Luxe 2025 | Azalée Patrimoine",
        metaDescription: "Produit structuré Athena Luxe 2025 : investissez dans le secteur du luxe."
      }
    }
  },

  {
    path: 'placements/produits-structures/autocall-credit-agricole-2025',
    title: 'Autocall Crédit Agricole 2025',
    content: {
      hero: {
        title: "Autocall Crédit Agricole 2025",
        subtitle: "Produit structuré adossé à l'action Crédit Agricole",
        description: "Un produit simple avec un mécanisme de sortie anticipée attractif."
      },
      caracteristiques: {
        title: "Caractéristiques du produit",
        items: [
          { label: "Sous-jacent", value: "Action Crédit Agricole SA" },
          { label: "Durée maximale", value: "6 ans" },
          { label: "Coupon annuel", value: "8%" },
          { label: "Barrière de protection", value: "-40%" },
          { label: "Sortie anticipée", value: "Annuelle si action ≥ niveau initial" }
        ]
      },
      cta: {
        title: "En savoir plus",
        description: "Contactez nos experts pour plus d'informations sur ce produit.",
        buttonText: "Demander des informations"
      },
      seo: {
        metaTitle: "Autocall Crédit Agricole 2025 | Azalée Patrimoine",
        metaDescription: "Produit structuré Autocall Crédit Agricole 2025 : coupon 8% par an."
      }
    }
  },

  {
    path: 'placements/produits-structures/energie-degressive-2025',
    title: 'Énergie Dégressive 2025',
    content: {
      hero: {
        title: "Énergie Dégressive 2025",
        subtitle: "Produit structuré sur le secteur énergétique",
        description: "Un produit avec une barrière dégressive pour optimiser vos chances de sortie."
      },
      caracteristiques: {
        title: "Caractéristiques du produit",
        items: [
          { label: "Sous-jacent", value: "Indice énergies renouvelables" },
          { label: "Durée maximale", value: "8 ans" },
          { label: "Coupon annuel", value: "7%" },
          { label: "Barrière initiale", value: "100%" },
          { label: "Barrière finale", value: "70% (dégressive de 5% par an)" }
        ]
      },
      mecanisme: {
        title: "Mécanisme dégressif",
        description: "La barrière de sortie anticipée diminue chaque année de 5%, facilitant la sortie avec le temps."
      },
      cta: {
        title: "En savoir plus",
        description: "Contactez nos experts pour plus d'informations sur ce produit.",
        buttonText: "Demander des informations"
      },
      seo: {
        metaTitle: "Énergie Dégressive 2025 | Azalée Patrimoine",
        metaDescription: "Produit structuré Énergie Dégressive 2025 : investissez dans les énergies renouvelables."
      }
    }
  }
];

async function syncContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    let synced = 0;
    let errors = 0;
    
    for (const page of fullContentPages) {
      try {
        await PageContent.findOneAndUpdate(
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
        synced++;
      } catch (error) {
        console.log(`❌ Error with /${page.path}: ${error.message}`);
        errors++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Synced: ${synced} pages with FULL content`);
    console.log(`   Errors: ${errors}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

syncContent();


