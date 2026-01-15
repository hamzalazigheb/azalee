// Sync more FULL content from JSX pages to CMS
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

// More full content pages
const fullContentPages = [
  // ==================== FISCALITE - AUTRE ====================
  {
    path: 'fiscalite/autre-fiscalite',
    title: 'Autres Sujets Fiscaux',
    content: {
      hero: {
        title: "Autres sujets fiscaux",
        subtitle: "Découvrez d'autres aspects de la fiscalité française : ISF, taxe foncière, droits de succession, et bien plus encore.",
        button: "Explorer la fiscalité",
        image: "/images/fiscalite-autres-sujets-hero.jpg"
      },
      sujets: {
        title: "Sujets fiscaux divers",
        items: [
          {
            nom: "Impôt sur la Fortune Immobilière (IFI)",
            description: "Taxe sur le patrimoine immobilier net",
            details: ["Seuil : 1,3 million d'euros", "Taux progressif de 0,5% à 1,5%", "Déclaration annuelle obligatoire"]
          },
          {
            nom: "Taxe foncière",
            description: "Taxe annuelle sur les propriétés bâties et non bâties",
            details: ["Calcul basé sur la valeur locative", "Paiement en octobre", "Possibilité de déduction"]
          },
          {
            nom: "Droits de succession",
            description: "Taxe sur la transmission du patrimoine",
            details: ["Abattements selon le lien familial", "Taux progressifs", "Optimisation possible"]
          },
          {
            nom: "Taxe d'habitation",
            description: "Taxe résidentielle (supprimée pour la résidence principale)",
            details: ["Maintien pour résidences secondaires", "Calcul selon la valeur locative", "Exonérations possibles"]
          }
        ]
      },
      optimisations: {
        title: "Optimisations fiscales",
        items: [
          {
            strategie: "Donation",
            description: "Transmission anticipée du patrimoine",
            avantages: ["Abattements renouvelables", "Réduction des droits", "Transmission progressive"]
          },
          {
            strategie: "Assurance-vie",
            description: "Transmission optimisée du capital",
            avantages: ["Exonération partielle", "Plafond 152 500€", "Transmission hors succession"]
          },
          {
            strategie: "SCPI",
            description: "Investissement immobilier indirect",
            avantages: ["Diversification", "Gestion déléguée", "Liquidité"]
          }
        ]
      },
      cta: {
        title: "Besoin d'informations sur d'autres sujets fiscaux ?",
        subtitle: "Nos experts vous accompagnent sur tous les aspects de la fiscalité française",
        primaryButton: "Consultation gratuite",
        secondaryButton: "Guide complet"
      },
      seo: {
        metaTitle: "Autres Sujets Fiscaux | Azalée Patrimoine",
        metaDescription: "Découvrez les différents aspects de la fiscalité française avec Azalée Patrimoine."
      }
    }
  },

  // ==================== FISCALITE - CAS SPECIFIQUES ====================
  {
    path: 'fiscalite/defiscalisation-cas-specifiques',
    title: 'Défiscalisation Cas Spécifiques',
    content: {
      hero: {
        title: "Défiscalisation - Cas spéciaux",
        subtitle: "Découvrez les dispositifs de défiscalisation spécifiques et les situations particulières qui peuvent vous permettre d'optimiser votre fiscalité.",
        button: "Étudier mon cas",
        image: "/images/fiscalite-cas-specifiques-hero.jpg"
      },
      casSpecifiques: {
        title: "Cas spéciaux de défiscalisation",
        items: [
          {
            nom: "Défiscalisation outre-mer",
            description: "Dispositifs spécifiques pour les investissements en outre-mer",
            avantages: ["Réduction jusqu'à 40%", "Investissement plafonné à 300k€", "Engagement 5 ans minimum"],
            conditions: ["Bien situé en outre-mer", "Location à usage d'habitation", "Investissement direct ou SCPI"]
          },
          {
            nom: "Défiscalisation monuments historiques",
            description: "Réduction d'impôt pour la rénovation de monuments classés",
            avantages: ["Réduction jusqu'à 30%", "Plafond 400k€", "Engagement 9 ans minimum"],
            conditions: ["Bien classé ou inscrit", "Rénovation aux normes", "Location 9 ans minimum"]
          },
          {
            nom: "Défiscalisation rénovation énergétique",
            description: "Réduction d'impôt pour les travaux de rénovation énergétique",
            avantages: ["Réduction jusqu'à 30%", "Plafond 8k€", "Engagement 3 ans"],
            conditions: ["Résidence principale", "Travaux énergétiques", "Engagement 3 ans"]
          }
        ]
      },
      situationsParticulieres: {
        title: "Situations particulières",
        items: [
          {
            situation: "Investisseur étranger",
            description: "Fiscalité spécifique pour les non-résidents",
            points: ["Imposition différente", "Conventions fiscales", "Obligations déclaratives"]
          },
          {
            situation: "Expatrié",
            description: "Optimisation fiscale pour les expatriés",
            points: ["Résidence fiscale", "Imposition des revenus", "Défiscalisation à distance"]
          },
          {
            situation: "Retraité",
            description: "Stratégies fiscales pour les retraités",
            points: ["TMI réduit", "Défiscalisation adaptée", "Transmission optimisée"]
          }
        ]
      },
      cta: {
        title: "Votre cas est-il éligible ?",
        subtitle: "Nos experts analysent votre situation pour identifier les dispositifs applicables",
        primaryButton: "Analyse gratuite",
        secondaryButton: "Consultation spécialisée"
      },
      seo: {
        metaTitle: "Défiscalisation Cas Spécifiques | Azalée Patrimoine",
        metaDescription: "Découvrez les dispositifs de défiscalisation spécifiques avec Azalée Patrimoine."
      }
    }
  },

  // ==================== FISCALITE - PLACEMENTS ====================
  {
    path: 'fiscalite/fiscalite-placements',
    title: 'Fiscalité des Placements',
    content: {
      hero: {
        title: "Fiscalité des placements financiers",
        subtitle: "Ce qu'il faut absolument comprendre. La performance d'un placement ne se mesure pas uniquement à son rendement brut. En réalité, c'est le rendement net d'impôt qui détermine l'efficacité de votre stratégie patrimoniale.",
        button: "Simuler mes placements",
        image: "/images/fiscalite-placements-hero.jpg"
      },
      quickStats: {
        title: "Taux de prélèvement",
        stats: [
          { label: "PFU", value: "30%", description: "Prélèvement Forfaitaire Unique" },
          { label: "Prélèvements sociaux", value: "17.2%", description: "CSG, CRDS, etc." },
          { label: "TMI moyen", value: "14%", description: "Taux Marginal d'Imposition" }
        ]
      },
      regimesFiscaux: {
        title: "Les grands régimes fiscaux des placements",
        description: "Comprendre les différences entre les enveloppes fiscales",
        regimes: [
          {
            nom: "PEA (Plan d'Épargne en Actions)",
            fiscalite: "Exonération IR après 5 ans, 17,2% de prélèvements sociaux",
            avantages: ["Actions européennes", "Pas de limite de gains", "Transmission possible"]
          },
          {
            nom: "Assurance-vie",
            fiscalite: "PFU ou abattement après 8 ans (7,5%)",
            avantages: ["Supports diversifiés", "Transmission avantageuse", "Disponibilité"]
          },
          {
            nom: "Compte-titres ordinaire (CTO)",
            fiscalite: "PFU 30% sur les gains",
            avantages: ["Liberté totale", "Pas de plafond", "Tous les marchés"]
          },
          {
            nom: "PER (Plan Épargne Retraite)",
            fiscalite: "Déduction des versements, fiscalité à la sortie",
            avantages: ["Déduction immédiate", "Capitalisation", "Sortie en capital possible"]
          }
        ]
      },
      cta: {
        title: "Optimisez la fiscalité de vos placements",
        subtitle: "Nos experts vous aident à choisir les meilleures enveloppes fiscales",
        primaryButton: "Consultation gratuite",
        secondaryButton: "Simulation fiscale"
      },
      seo: {
        metaTitle: "Fiscalité des Placements | Azalée Patrimoine",
        metaDescription: "Comprendre la fiscalité des placements financiers : PFU, PEA, assurance-vie, PER."
      }
    }
  },

  // ==================== PLACEMENTS - AUTRES ====================
  {
    path: 'placements/autres',
    title: 'Autres Placements',
    content: {
      hero: {
        title: "Autres placements",
        subtitle: "Découvrez nos solutions d'investissement alternatives pour diversifier votre patrimoine.",
        description: "Au-delà des placements traditionnels, il existe de nombreuses solutions pour faire fructifier votre capital."
      },
      types: {
        title: "Types de placements alternatifs",
        items: [
          {
            nom: "Private Equity",
            description: "Investissement dans des entreprises non cotées",
            avantages: ["Rendement potentiel élevé", "Diversification", "Impact économique"]
          },
          {
            nom: "Crowdfunding immobilier",
            description: "Financement participatif de projets immobiliers",
            avantages: ["Rendement 8-12%", "Durée courte (12-36 mois)", "Ticket accessible"]
          },
          {
            nom: "Or et métaux précieux",
            description: "Valeur refuge en période d'incertitude",
            avantages: ["Protection inflation", "Liquidité", "Anonymat (or physique)"]
          },
          {
            nom: "Cryptomonnaies",
            description: "Actifs numériques décentralisés",
            avantages: ["Potentiel de croissance", "Décorrélation", "Innovation"]
          }
        ]
      },
      risques: {
        title: "Points de vigilance",
        items: [
          "Volatilité importante",
          "Liquidité parfois limitée",
          "Nécessité d'une expertise",
          "Diversification recommandée"
        ]
      },
      cta: {
        title: "Diversifiez votre patrimoine",
        description: "Nos experts vous accompagnent pour intégrer des placements alternatifs adaptés à votre profil.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Autres Placements | Azalée Patrimoine",
        metaDescription: "Découvrez les placements alternatifs : private equity, crowdfunding, or, crypto."
      }
    }
  },

  // ==================== PLACEMENTS - BOURSE ====================
  {
    path: 'placements/bourse-actions',
    title: 'Bourse et Actions',
    content: {
      hero: {
        title: "Bourse et actions",
        subtitle: "Investir sur les marchés financiers pour faire croître votre patrimoine sur le long terme.",
        description: "Les actions représentent une part de propriété dans une entreprise et offrent un potentiel de rendement attractif sur le long terme."
      },
      avantages: {
        title: "Pourquoi investir en bourse ?",
        items: [
          { titre: "Rendement historique", description: "7-10% par an en moyenne sur le long terme" },
          { titre: "Liquidité", description: "Achat et vente rapides sur les marchés" },
          { titre: "Diversification", description: "Accès à des milliers d'entreprises mondiales" },
          { titre: "Dividendes", description: "Revenus réguliers pour certaines actions" }
        ]
      },
      strategies: {
        title: "Stratégies d'investissement",
        items: [
          { nom: "Buy & Hold", description: "Acheter et conserver sur le long terme" },
          { nom: "Value Investing", description: "Rechercher des actions sous-évaluées" },
          { nom: "Growth Investing", description: "Miser sur les entreprises en forte croissance" },
          { nom: "Gestion indicielle", description: "Répliquer un indice via des ETF" }
        ]
      },
      risques: {
        title: "Risques à considérer",
        items: [
          "Volatilité des marchés",
          "Risque de perte en capital",
          "Risque de change (actions étrangères)",
          "Risque spécifique à l'entreprise"
        ]
      },
      cta: {
        title: "Investir en bourse avec Azalée",
        description: "Nos experts vous accompagnent pour construire un portefeuille actions adapté à vos objectifs.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Bourse et Actions | Azalée Patrimoine",
        metaDescription: "Investir en bourse : stratégies, avantages et risques. Accompagnement par des experts."
      }
    }
  },

  // ==================== PLACEMENTS - COMPTE TITRES ====================
  {
    path: 'placements/compte-titres',
    title: 'Compte-Titres Ordinaire',
    content: {
      hero: {
        title: "Compte-Titres Ordinaire (CTO) : définition, fiscalité et stratégie",
        subtitle: "Le Compte-Titres Ordinaire (CTO) est l'enveloppe d'investissement la plus flexible disponible en France.",
        description: "Contrairement au PEA ou à l'assurance-vie, il n'impose aucune limite de versement et permet d'investir dans tous les marchés financiers mondiaux."
      },
      definition: {
        title: "Qu'est-ce qu'un CTO ?",
        description: "Le Compte-Titres Ordinaire permet d'investir dans :",
        contenus: [
          "Actions françaises et internationales",
          "Obligations et produits de taux",
          "ETF (trackers) du monde entier",
          "Warrants et certificats",
          "Options et futures"
        ]
      },
      fiscalite: {
        title: "Fiscalité du CTO",
        description: "Les gains sont soumis au PFU (Prélèvement Forfaitaire Unique) de 30% :",
        details: [
          "12,8% d'impôt sur le revenu",
          "17,2% de prélèvements sociaux",
          "Option pour le barème progressif possible"
        ]
      },
      avantages: {
        title: "Avantages du CTO",
        items: [
          "Aucun plafond de versement",
          "Accès à tous les marchés mondiaux",
          "Pas de durée de détention minimum",
          "Transmission simple aux héritiers"
        ]
      },
      cta: {
        title: "Ouvrir un compte-titres",
        description: "Nos experts vous accompagnent pour choisir le bon intermédiaire et les bons supports.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Compte-Titres | Azalée Patrimoine",
        metaDescription: "Le compte-titres ordinaire : liberté totale pour investir sur tous les marchés."
      }
    }
  },

  // ==================== PLACEMENTS - ETF ====================
  {
    path: 'placements/etf-produits-financiers',
    title: 'ETF et Produits Financiers',
    content: {
      hero: {
        title: "Produits financiers : actions, ETF, produits structurés",
        subtitle: "Les supports dynamiques disponibles dans les enveloppes fiscales pour accéder à la croissance des marchés financiers avec une diversification optimale.",
        description: "Découvrez les différents produits financiers et leur place dans votre stratégie patrimoniale."
      },
      etf: {
        title: "Les ETF (Exchange Traded Funds)",
        description: "Fonds indiciels cotés en bourse qui répliquent un indice",
        avantages: [
          "Frais très faibles (0,1-0,5% par an)",
          "Diversification instantanée",
          "Liquidité comme une action",
          "Transparence totale"
        ],
        exemples: [
          { nom: "ETF MSCI World", description: "1600 entreprises mondiales" },
          { nom: "ETF S&P 500", description: "500 plus grandes entreprises US" },
          { nom: "ETF CAC 40", description: "40 plus grandes entreprises françaises" }
        ]
      },
      produitsStructures: {
        title: "Les produits structurés",
        description: "Combinaison d'actifs pour un profil rendement/risque personnalisé",
        types: [
          "Autocalls (sortie anticipée si performance)",
          "Phoenix (coupons conditionnels)",
          "Certificates (exposition à un sous-jacent)"
        ]
      },
      cta: {
        title: "Construire un portefeuille diversifié",
        description: "Nos experts sélectionnent les meilleurs produits pour votre profil.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "ETF et Produits Financiers | Azalée Patrimoine",
        metaDescription: "ETF, actions, produits structurés : les supports pour diversifier votre patrimoine."
      }
    }
  },

  // ==================== PLACEMENTS - ASSURANCE VIE LUX ====================
  {
    path: 'placements/assurance-vie-luxembourg',
    title: 'Assurance-Vie Luxembourg',
    content: {
      hero: {
        title: "Assurance-vie luxembourgeoise : l'enveloppe premium",
        subtitle: "L'assurance-vie luxembourgeoise offre une protection et des options supérieures aux contrats français.",
        description: "Le Luxembourg, première place financière européenne, offre un cadre juridique unique pour les contrats d'assurance-vie."
      },
      avantages: {
        title: "Avantages clés",
        items: [
          { titre: "Super-privilège", description: "Les avoirs des clients sont prioritaires sur tous les créanciers" },
          { titre: "Triangle de sécurité", description: "Séparation légale des actifs (compagnie, banque dépositaire, commissariat)" },
          { titre: "Neutralité fiscale", description: "Fiscalité du pays de résidence du souscripteur" },
          { titre: "Multi-devises", description: "Possibilité de détenir plusieurs devises (€, $, £, CHF)" }
        ]
      },
      eligibilite: {
        title: "Pour qui ?",
        description: "L'assurance-vie luxembourgeoise s'adresse principalement aux :",
        profils: [
          "Patrimoines supérieurs à 250 000€",
          "Personnes mobiles internationalement",
          "Investisseurs recherchant une protection maximale",
          "Entrepreneurs avec des actifs importants"
        ]
      },
      supports: {
        title: "Supports d'investissement",
        items: [
          "Fonds dédiés (FID) sur mesure",
          "Fonds internes collectifs (FIC)",
          "Actifs non cotés (private equity)",
          "Gestion sous mandat personnalisée"
        ]
      },
      cta: {
        title: "Découvrir l'assurance-vie luxembourgeoise",
        description: "Nos experts vous présentent les contrats les plus adaptés à votre situation.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Assurance-Vie Luxembourg | Azalée Patrimoine",
        metaDescription: "L'assurance-vie luxembourgeoise : super-privilège, triangle de sécurité, multi-devises."
      }
    }
  },

  // ==================== PLACEMENTS - PEA/PER ====================
  {
    path: 'placements/pea-per',
    title: 'PEA et PER',
    content: {
      hero: {
        title: "PEA et PER : les enveloppes fiscales stratégiques",
        subtitle: "Optimisez votre fiscalité avec le PEA (actions européennes) et le PER (épargne retraite).",
        description: "Ces deux enveloppes offrent des avantages fiscaux significatifs pour les investisseurs de long terme."
      },
      pea: {
        title: "Plan d'Épargne en Actions (PEA)",
        description: "Enveloppe dédiée aux actions européennes avec exonération d'impôt après 5 ans",
        caracteristiques: [
          { label: "Plafond", value: "150 000€" },
          { label: "Fiscalité après 5 ans", value: "17,2% (PS uniquement)" },
          { label: "Supports", value: "Actions et ETF européens" }
        ],
        avantages: [
          "Exonération totale d'IR après 5 ans",
          "Possibilité de retrait partiel après 5 ans",
          "Pas de limite sur les gains"
        ]
      },
      per: {
        title: "Plan Épargne Retraite (PER)",
        description: "Déduction des versements du revenu imposable + capitalisation jusqu'à la retraite",
        caracteristiques: [
          { label: "Plafond déduction", value: "10% des revenus (max ~35 000€)" },
          { label: "Sortie", value: "Capital et/ou rente" },
          { label: "Déblocage anticipé", value: "Achat résidence principale" }
        ],
        avantages: [
          "Déduction immédiate des versements",
          "Report des plafonds non utilisés",
          "Sortie en capital possible"
        ]
      },
      comparaison: {
        title: "PEA vs PER : que choisir ?",
        conclusion: "Les deux sont complémentaires : le PEA pour la performance et la flexibilité, le PER pour la déduction fiscale immédiate."
      },
      cta: {
        title: "Optimiser votre épargne avec PEA et PER",
        description: "Nos experts vous aident à définir la meilleure allocation entre ces deux enveloppes.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "PEA et PER | Azalée Patrimoine",
        metaDescription: "PEA et PER : les enveloppes fiscales pour optimiser votre épargne long terme."
      }
    }
  },

  // ==================== PATRIMOINE - BILAN ====================
  {
    path: 'patrimoine/bilan',
    title: 'Bilan Patrimonial',
    content: {
      hero: {
        title: "Bilan patrimonial complet",
        subtitle: "Faites le point sur votre situation patrimoniale avec nos experts.",
        description: "Le bilan patrimonial est la première étape indispensable pour optimiser votre patrimoine."
      },
      elements: {
        title: "Ce que comprend un bilan patrimonial",
        items: [
          { titre: "Inventaire des actifs", description: "Immobilier, financier, professionnel" },
          { titre: "Analyse du passif", description: "Crédits, dettes, engagements" },
          { titre: "Étude fiscale", description: "Optimisation de votre imposition" },
          { titre: "Situation familiale", description: "Protection et transmission" },
          { titre: "Objectifs de vie", description: "Court, moyen et long terme" }
        ]
      },
      etapes: {
        title: "Les étapes du bilan",
        items: [
          "Collecte des informations",
          "Analyse de la situation actuelle",
          "Identification des points d'amélioration",
          "Recommandations personnalisées",
          "Plan d'action prioritaire"
        ]
      },
      benefices: {
        title: "Les bénéfices d'un bilan patrimonial",
        items: [
          "Vision claire de votre patrimoine",
          "Identification des opportunités",
          "Réduction de votre fiscalité",
          "Protection de vos proches",
          "Optimisation de vos placements"
        ]
      },
      cta: {
        title: "Réaliser votre bilan patrimonial",
        description: "Premier rendez-vous gratuit et sans engagement pour faire le point sur votre situation.",
        buttonText: "Demander un bilan gratuit"
      },
      seo: {
        metaTitle: "Bilan Patrimonial | Azalée Patrimoine",
        metaDescription: "Réalisez votre bilan patrimonial complet avec Azalée Patrimoine. Analyse personnalisée et recommandations."
      }
    }
  },

  // ==================== PATRIMOINE - TRANSMISSION ====================
  {
    path: 'patrimoine/transmission',
    title: 'Transmission de Patrimoine',
    content: {
      hero: {
        title: "Transmission de patrimoine : anticipez pour mieux transmettre",
        subtitle: "La transmission de patrimoine consiste à organiser le passage de ses biens à ses héritiers ou à des tiers, de son vivant ou après son décès.",
        description: "Anticiper permet d'optimiser la fiscalité et de protéger vos proches."
      },
      strategies: {
        title: "Les leviers de la transmission",
        items: [
          {
            nom: "Donations avec abattements",
            description: "Transmettre de son vivant en bénéficiant d'abattements fiscaux renouvelables tous les 15 ans",
            avantages: ["100 000€ par enfant", "31 865€ par petit-enfant", "Abattements cumulables"]
          },
          {
            nom: "Assurance-vie",
            description: "Transmettre un capital hors succession avec une fiscalité avantageuse",
            avantages: ["152 500€ d'abattement par bénéficiaire", "Transmission rapide", "Clause bénéficiaire libre"]
          },
          {
            nom: "Démembrement de propriété",
            description: "Donner la nue-propriété en conservant l'usufruit",
            avantages: ["Réduction de l'assiette fiscale", "Conservation des revenus", "Reconstitution automatique"]
          },
          {
            nom: "Pacte Dutreil",
            description: "Transmettre une entreprise avec 75% d'abattement",
            avantages: ["Abattement de 75%", "Engagement de conservation", "Transmission progressive"]
          }
        ]
      },
      erreurs: {
        title: "Les erreurs à éviter",
        items: [
          "Attendre trop longtemps pour anticiper",
          "Ne pas tenir compte des abattements",
          "Oublier de mettre à jour les clauses bénéficiaires",
          "Ne pas équilibrer entre les héritiers"
        ]
      },
      cta: {
        title: "Préparez votre transmission",
        description: "Nos experts vous accompagnent pour optimiser la transmission de votre patrimoine.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Transmission de Patrimoine | Azalée Patrimoine",
        metaDescription: "Anticipez la transmission de votre patrimoine. Donations, assurance-vie, démembrement."
      }
    }
  },

  // ==================== PATRIMOINE - SUCCESSION ====================
  {
    path: 'patrimoine/succession-heritage',
    title: 'Succession et Héritage',
    content: {
      hero: {
        title: "Succession et héritage : comprendre pour mieux anticiper",
        subtitle: "Règles de succession, droits des héritiers et optimisation fiscale.",
        description: "La succession est l'ensemble des règles qui régissent la transmission du patrimoine après le décès."
      },
      regles: {
        title: "Les règles de la succession en France",
        description: "Le droit français prévoit des règles strictes pour protéger les héritiers réservataires.",
        elements: [
          { nom: "Réserve héréditaire", description: "Part du patrimoine réservée aux enfants (50-75% selon le nombre)" },
          { nom: "Quotité disponible", description: "Part dont on peut disposer librement (25-50%)" },
          { nom: "Ordre des héritiers", description: "Enfants > Parents > Frères/sœurs > Autres" }
        ]
      },
      droits: {
        title: "Droits de succession",
        description: "Les droits de succession varient selon le lien de parenté",
        bareme: [
          { lien: "Conjoint/Partenaire PACS", taux: "Exonéré" },
          { lien: "Enfant (après abattement 100k€)", taux: "5% à 45%" },
          { lien: "Frère/Sœur (après abattement 16k€)", taux: "35% à 45%" },
          { lien: "Autres", taux: "55% à 60%" }
        ]
      },
      optimisation: {
        title: "Comment optimiser ?",
        items: [
          "Anticiper avec des donations",
          "Utiliser l'assurance-vie",
          "Démembrer la propriété",
          "Rédiger un testament"
        ]
      },
      cta: {
        title: "Anticipez votre succession",
        description: "Nos experts vous accompagnent pour protéger vos proches et optimiser la fiscalité.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Succession et Héritage | Azalée Patrimoine",
        metaDescription: "Comprendre la succession en France : règles, droits des héritiers, optimisation fiscale."
      }
    }
  },

  // ==================== PATRIMOINE - PROTECTION FAMILLE ====================
  {
    path: 'patrimoine/protection-famille',
    title: 'Protection de la Famille',
    content: {
      hero: {
        title: "Protection de la famille",
        subtitle: "Protéger vos proches : assurance décès, mandat de protection, prévoyance.",
        description: "La protection de votre famille est un pilier essentiel de toute stratégie patrimoniale."
      },
      outils: {
        title: "Les outils de protection",
        items: [
          {
            nom: "Assurance décès",
            description: "Versement d'un capital en cas de décès",
            avantages: ["Protection immédiate", "Capital garanti", "Bénéficiaires au choix"]
          },
          {
            nom: "Mandat de protection future",
            description: "Désigner une personne de confiance en cas d'incapacité",
            avantages: ["Évite la tutelle judiciaire", "Choix du mandataire", "Anticipation"]
          },
          {
            nom: "Donation au dernier vivant",
            description: "Augmenter les droits du conjoint survivant",
            avantages: ["Usufruit total", "100% de la quotité disponible", "Protection renforcée"]
          },
          {
            nom: "Contrats de prévoyance",
            description: "Couverture en cas d'invalidité ou incapacité",
            avantages: ["Maintien des revenus", "Prise en charge des frais", "Protection familiale"]
          }
        ]
      },
      situations: {
        title: "Situations à anticiper",
        items: [
          "Décès prématuré",
          "Invalidité ou incapacité",
          "Perte d'autonomie",
          "Divorce ou séparation"
        ]
      },
      cta: {
        title: "Protégez votre famille",
        description: "Nos experts vous accompagnent pour mettre en place les protections adaptées.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Protection de la Famille | Azalée Patrimoine",
        metaDescription: "Protégez votre famille : assurance décès, prévoyance, mandats de protection."
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


