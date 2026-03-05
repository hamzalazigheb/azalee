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

// All immobilier pages to initialize
const pages = [
  {
    path: 'immobilier/lmnp',
    title: 'LMNP - Loueur Meublé Non Professionnel',
    content: {
      hero: {
        title: "LMNP (Loueur Meublé Non Professionnel) : un dispositif fiscal avantageux pour investir dans l'immobilier locatif",
        subtitle: "Le statut de Loueur Meublé Non Professionnel (LMNP) est l'un des dispositifs fiscaux les plus attractifs pour les investisseurs particuliers.",
        description: "Contrairement à la location nue, les loyers perçus sont déclarés en BIC, permettant d'amortir le bien et le mobilier.",
        example: "Exemple simple : un studio acheté 120 000 € et loué 550 €/mois. Grâce à l'amortissement, les loyers sont quasi non imposés pendant 15 à 20 ans.",
        button: "Simuler votre projet LMNP",
      },
      rightCard: {
        title: "Nos experts à votre service",
        benefits: ["Fiscalité très avantageuse avec amortissement", "Loyers quasi exonérés d'impôt pendant 15-20 ans", "Flexibilité d'investissement", "Revenus complémentaires sécurisés"],
        floatingText: "0 € →\nAnalyse personnalisée gratuite",
      },
      avantages: {
        title: "Les avantages du LMNP",
        cards: [
          { title: "Fiscalité très avantageuse", bullets: ["L'amortissement du bien et du mobilier permet de gommer une grande partie du bénéfice imposable", "Les loyers encaissés sont souvent exonérés d'impôt pendant 15 à 20 ans"] },
          { title: "Flexibilité d'investissement", bullets: ["Le LMNP s'applique aussi bien à un studio classique qu'à des résidences gérées", "Vous pouvez investir en direct ou via un exploitant professionnel"] },
          { title: "Revenus complémentaires sécurisés", bullets: ["En location meublée classique, vous fixez librement le loyer", "En résidence gérée, vous signez un bail commercial avec un exploitant"] },
          { title: "Transmission facilitée", bullets: ["Le LMNP reste une activité non professionnelle, donc plus simple à transmettre"] },
        ],
      },
      inconvenients: {
        title: "Les inconvénients et points de vigilance",
        cards: [
          { title: "Gestion plus lourde en direct", bullets: ["Recherche de locataires", "Turnover plus élevé", "Entretien du mobilier"] },
          { title: "Dépendance à l'exploitant en résidence gérée", bullets: ["Si la société de gestion connaît des difficultés, vos loyers peuvent être impactés"] },
          { title: "Risque de vacance locative", bullets: ["Un logement mal placé ou mal meublé peut rester vide plusieurs mois"] },
          { title: "Revente encadrée", bullets: ["En résidence gérée, le marché secondaire peut être moins liquide"] },
        ],
      },
      plusValue: {
        title: "Le nouveau traitement de la plus-value en LMNP",
        paragraphs: ["Jusqu'ici, l'amortissement n'était pas réintégré dans le calcul de la plus-value.", "Désormais, l'administration fiscale a précisé que l'amortissement doit être pris en compte."],
        bullets: ["Le LMNP reste une stratégie sur 15 à 20 ans", "Les avantages fiscaux immédiats compensent largement cet ajustement", "La revente peut toujours être optimisée"],
      },
      exemple: {
        title: "Exemple concret",
        description: "Un investisseur achète un studio 120 000 € en LMNP, financé par crédit. Loué 550 €/mois, il perçoit 6 600 € par an. Grâce à l'amortissement, son revenu imposable est nul pendant 15 ans.",
        conclusion: "À la revente, la fiscalité sur la plus-value doit intégrer une partie des amortissements pratiqués. Mais l'investisseur a déjà largement profité d'une fiscalité allégée.",
      },
      comparaison: {
        title: "LMNP en direct ou en résidence gérée ?",
        options: [
          { title: "En direct (studio, colocation)", bullets: ["Plus de liberté dans le choix du locataire", "Rentabilité brute plus élevée", "Gestion plus chronophage"] },
          { title: "En résidence gérée (tourisme, EHPAD)", bullets: ["Revenus sécurisés par un bail commercial", "Zéro gestion locative", "Rentabilité légèrement inférieure"] },
        ],
      },
      conseil: {
        title: "Conseil Azalée Patrimoine",
        paragraphs: ["Le LMNP reste un des dispositifs fiscaux les plus efficaces pour se constituer des revenus complémentaires.", "Chez Azalée Patrimoine, nous vous aidons à :"],
        bullets: ["Choisir entre investissement en direct ou en résidence gérée", "Sécuriser vos loyers grâce à un bon emplacement", "Anticiper la fiscalité de la revente"],
        conclusion: "Le LMNP est un outil puissant pour diversifier vos revenus et préparer votre retraite sereinement.",
      },
      finalCta: {
        title: "Prêt à investir en LMNP ?",
        subtitle: "Nos experts vous accompagnent pour construire votre stratégie d'investissement LMNP.",
        primaryButton: "Simuler mon projet LMNP",
        secondaryButton: "Prendre rendez-vous",
      },
      seo: { metaTitle: "LMNP - Loueur Meublé Non Professionnel | Azalée Patrimoine", metaDescription: "Découvrez le statut LMNP, un dispositif fiscal avantageux pour investir dans l'immobilier locatif meublé." },
    }
  },
  {
    path: 'immobilier/vefa',
    title: 'VEFA - Vente en l\'État Futur d\'Achèvement',
    content: {
      hero: { title: "VEFA (Vente en l'État Futur d'Achèvement)", subtitle: "Investir dans l'immobilier neuf en VEFA consiste à acheter un logement sur plan.", button1: "L'essentiel", button2: "Sommaire" },
      rightCard: { title: "VEFA : investissez dans le neuf", subtitle: "Bénéficiez d'avantages fiscaux et d'une plus-value garantie.", benefits: ["Logements économes en énergie (RE2020)", "Frais de notaire réduits (2-3% vs 7%)", "Garanties constructeur sécurisées", "Défiscalisation loi Pinel"], button1: "Prendre rendez-vous", button2: "Fiscalité" },
      essentiel: { title: "L'essentiel", items: ["Logements économes en énergie grâce aux normes RE2020", "Frais de notaire réduits (2 à 3 %)", "Garanties constructeur sécurisantes", "Possibilité de bénéficier de dispositifs fiscaux", "Délais de livraison pouvant s'allonger", "Surcote du neuf limitant la rentabilité"] },
      definition: { title: "Qu'est-ce que la VEFA ?", text1: "La VEFA est un contrat de vente d'un bien immobilier neuf non terminé.", text2: "L'acheteur devient propriétaire dès la signature du contrat.", savoirTitle: "À savoir", savoirItems: ["Contrat signé avant achèvement", "Propriété dès la signature", "Livraison à la fin des travaux", "Garanties obligatoires"] },
      avantages: { title: "Avantages de la VEFA", items: [{ title: "Économies d'énergie", description: "Logements conformes aux normes RE2020" }, { title: "Frais réduits", description: "Frais de notaire réduits (2 à 3 %)" }, { title: "Garanties sécurisées", description: "Garanties constructeur" }, { title: "Défiscalisation", description: "Loi Pinel réduisant l'impôt" }] },
      inconvenients: { title: "Inconvénients", items: [{ title: "Délais de livraison", description: "Délais pouvant s'allonger" }, { title: "Surcote du neuf", description: "Prix au m² souvent plus élevé" }, { title: "Plafonds de loyers", description: "Restrictions en cas de Pinel" }, { title: "Risque de vacance", description: "Si l'emplacement est mal choisi" }] },
      exemple: { title: "Exemple concret", content: "Un investisseur acquiert un T2 en VEFA à Nantes pour 230 000 €. Grâce au dispositif Pinel, il bénéficie d'une réduction d'impôt de 4 600 €/an pendant 9 ans." },
      financement: { title: "Financement et étapes", steps: [{ step: "1", title: "Signature du contrat", description: "Acompte de 5%" }, { step: "2", title: "Construction", description: "Paiement des intérêts" }, { step: "3", title: "Livraison", description: "Solde et transfert" }, { step: "4", title: "Possession", description: "Jouissance du bien" }] },
      fiscalite: { title: "Fiscalité et défiscalisation", content: "La VEFA offre TVA réduite, déficit foncier possible, et éligibilité aux dispositifs comme Pinel ou Malraux." },
      conseil: { title: "Conseil Azalée Patrimoine", content: "La VEFA est adaptée aux investisseurs recherchant sécurité et défiscalisation. Le choix de la ville et de la demande locative est primordial." },
      risques: { title: "Risques et précautions", items: ["Délais de livraison non respectés", "Qualité des finitions", "Évolution des prix du marché", "Risques de défaillance du promoteur"] },
      comparaison: { title: "VEFA vs Immobilier existant", data: [{ critere: "TVA", vefa: "5,5%", existant: "20%" }, { critere: "Plus-value", vefa: "Élevée", existant: "Modérée" }, { critere: "Délai", vefa: "12-24 mois", existant: "Immédiat" }, { critere: "Risque", vefa: "Modéré", existant: "Faible" }] },
      finalCta: { title: "Prêt à investir en VEFA ?", subtitle: "Nos experts vous accompagnent dans votre projet.", primaryButton: "Prendre rendez-vous", secondaryButton: "Consulter un expert" },
      seo: { metaTitle: "VEFA - Vente en l'État Futur d'Achèvement | Azalée Patrimoine", metaDescription: "Investissez dans l'immobilier neuf en VEFA avec Azalée Patrimoine." }
    }
  },
  {
    path: 'immobilier/sci',
    title: 'SCI - Société Civile Immobilière',
    content: {
      hero: { title: "SCI : un outil de gestion et de transmission patrimoniale", subtitle: "La Société Civile Immobilière (SCI) est une structure juridique très utilisée par les familles et les investisseurs pour acheter, gérer et transmettre un bien immobilier.", button1: "Les avantages", button2: "IR ou IS ?" },
      rightCard: { title: "SCI : gérez et transmettez", subtitle: "Outil puissant de gestion et de transmission patrimoniale", benefits: ["Souplesse familiale", "Gestion simplifiée", "Optimisation fiscale IR/IS"], button1: "Conseil expert", button2: "Fiscalité" },
      avantages: { title: "Les avantages de la SCI", items: [{ title: "Souplesse familiale", description: "Facilite la transmission d'un patrimoine avec abattement de 100 000 € par parent et par enfant." }, { title: "Gestion simplifiée", description: "Gouvernance claire avec un gérant désigné et des règles fixées dans les statuts." }, { title: "Optimisation fiscale", description: "Choix entre SCI à l'IR (revenus chez les associés) ou SCI à l'IS (amortissement possible)." }] },
      inconvenients: { title: "Les inconvénients de la SCI", items: [{ title: "Formalités de création et de gestion", description: "Statuts, assemblée générale annuelle et comptabilité stricte." }, { title: "Responsabilité des associés", description: "Indéfiniment responsable des dettes sociales à hauteur de sa participation." }, { title: "Choix fiscal piégeux", description: "Le passage à l'IS entraîne une fiscalité lourde sur la plus-value à la revente." }] },
      fiscalite: { title: "SCI à l'IR ou SCI à l'IS : quel régime choisir ?", ir: { title: "SCI à l'IR", description: "Adaptée pour des loyers modestes ou déficit foncier.", avantages: "Fiscalité simple, déficit foncier possible", inconvenients: "Fiscalité lourde si revenus élevés" }, is: { title: "SCI à l'IS", description: "Intéressante pour beaucoup de loyers ou importants travaux.", avantages: "Amortissement possible, réduction du bénéfice", inconvenients: "Plus-value calculée sur valeur réduite" }, comparaison: [{ critere: "Imposition", ir: "Chez les associés", is: "Au niveau de la société" }, { critere: "Amortissement", ir: "Non possible", is: "Possible" }, { critere: "Déficit foncier", ir: "Possible", is: "Non applicable" }, { critere: "Plus-value", ir: "Régime des particuliers", is: "Valeur nette comptable" }] },
      exemple: { title: "Exemple concret", description: "Deux frères héritent d'un immeuble évalué à 600 000 €.", sansScI: ["Décisions à l'unanimité", "Risque de blocages familiaux", "Gestion complexe"], avecSci: ["Statuts clairs", "Régime IR avec abattements", "Gérant désigné avec pouvoirs définis"], conclusion: "Les statuts évitent les blocages familiaux et anticipent la transmission aux enfants." },
      conseil: { title: "Conseil Azalée Patrimoine", paragraphs: ["La SCI est un outil puissant mais doit être maniée avec précaution. Le choix entre IR et IS est stratégique.", "Chez Azalée Patrimoine, nous accompagnons nos clients pour :"], items: ["Créer leur SCI avec des statuts adaptés", "Choisir le régime fiscal le plus pertinent", "Anticiper la transmission de leurs biens"], conclusion: "La SCI bien pensée devient un véritable levier patrimonial." },
      finalCta: { title: "Prêt à créer votre SCI ?", subtitle: "Nos experts vous accompagnent pour définir la fiscalité la plus avantageuse.", primaryButton: "Prendre rendez-vous", secondaryButton: "Nous écrire" },
      seo: { metaTitle: "SCI - Société Civile Immobilière | Azalée Patrimoine", metaDescription: "La SCI est un outil de gestion et de transmission patrimoniale. Découvrez ses avantages avec Azalée Patrimoine." }
    }
  },
  {
    path: 'immobilier/scellier',
    title: 'Dispositifs Fiscaux : Pinel, Scellier, Robien',
    content: {
      hero: { title: "Les dispositifs fiscaux : Pinel, Scellier, Robien", subtitle: "Depuis près de 20 ans, l'État a mis en place plusieurs dispositifs fiscaux immobiliers pour encourager la construction et l'investissement locatif.", button: "Prendre rendez-vous" },
      rightCard: { title: "Nos experts à votre service", floatingText: "21% →\nRéduction d'impôt", benefits: ["Réduction d'impôt jusqu'à 21%", "Constitution de patrimoine", "Revenus locatifs", "Accompagnement revente"] },
      pinel: { title: "La loi Pinel : défiscaliser tout en investissant", description: "La loi Pinel offre une réduction d'impôt proportionnelle à la durée d'engagement locatif.", durees: [{ ans: "6 ans", pourcentage: "12%" }, { ans: "9 ans", pourcentage: "18%" }, { ans: "12 ans", pourcentage: "21%" }], exemple: "Un couple investit 250 000 € dans un T2 à Toulouse. Ils économisent 52 500 € d'impôts en 9 ans.", avantages: ["Réduction d'impôt significative (jusqu'à 63 000 €)", "Patrimoine neuf attractif", "Transmission facilitée"], inconvenients: ["Plafonds de loyers limitant la rentabilité", "Limité géographiquement aux zones tendues", "Fin programmée du Pinel"] },
      anciens: { title: "Les anciens dispositifs : Scellier et Robien", description: "Avant la loi Pinel, existaient le Robien (2003-2009) et le Scellier (2009-2012).", robien: { titre: "Dispositif Robien (2003-2009)", description: "Permettait d'amortir une partie du prix d'achat." }, scellier: { titre: "Dispositif Scellier (2009-2012)", description: "Offrait une réduction d'impôt de 25% sur 9 ans." }, note: "Ces régimes ne sont plus accessibles pour de nouveaux investissements." },
      apres: { title: "Pourquoi vendre après la période d'engagement fiscal ?", items: [{ titre: "Réduire l'imposition", description: "Détention longue permet de bénéficier d'abattements sur la plus-value." }, { titre: "Diversifier son patrimoine", description: "Le capital libéré peut être réinvesti dans d'autres actifs." }, { titre: "Arbitrage", description: "Profiter des opportunités du marché." }] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "Ces dispositifs ont permis à de nombreux Français de se constituer un patrimoine. Chez Azalée Patrimoine, nous vous accompagnons pour identifier le meilleur moment pour revendre." },
      finalCta: { title: "Vous avez un bien Pinel, Scellier ou Robien ?", subtitle: "Nos experts vous accompagnent pour optimiser votre sortie et maximiser la valeur de votre patrimoine.", primaryButton: "Faire évaluer mon bien", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Dispositifs Fiscaux Pinel, Scellier, Robien | Azalée Patrimoine", metaDescription: "Découvrez les dispositifs fiscaux Pinel, Scellier et Robien avec Azalée Patrimoine." }
    }
  },
  {
    path: 'immobilier/investissement-locatif',
    title: 'Investissement Locatif',
    content: {
      hero: { title: "Investissement locatif : un levier puissant pour bâtir votre patrimoine", subtitle: "L'investissement locatif est la stratégie immobilière la plus répandue en France. Elle permet de percevoir des revenus complémentaires et de constituer un patrimoine transmissible.", button: "Calculer ma rentabilité" },
      rightCard: { title: "Nos experts à votre service", floatingText: "Effet →\nde levier", benefits: ["Revenus complémentaires", "Effet de levier du crédit", "Patrimoine tangible et transmissible", "Optimisation fiscale"] },
      pourquoi: { title: "Pourquoi investir dans l'immobilier locatif ?", items: [{ title: "Génération de revenus réguliers", description: "Les loyers financent le crédit et offrent un revenu complémentaire." }, { title: "Effet de levier du crédit", description: "Investir avec peu d'apport, les locataires remboursent le prêt." }, { title: "Valorisation patrimoniale", description: "Le capital de l'emprunt diminue tandis que le bien prend de la valeur." }], exemple: "Vous achetez un bien à 200 000 € avec un prêt de 180 000 €. Loyer de 900 €/mois, mensualité de 1 000 € = effort de 100 €/mois." },
      avantages: { title: "Les avantages de l'investissement locatif", items: [{ title: "Revenus complémentaires", description: "Source de revenus stable et prévisible." }, { title: "Effet de levier du crédit", description: "Patrimoine important sans immobiliser trop de capital." }, { title: "Patrimoine tangible", description: "Actif concret, sécurisant et transmissible." }, { title: "Optimisation fiscale", description: "Régime réel, déficit foncier, ou statut LMNP." }] },
      inconvenients: { title: "Les inconvénients et risques", items: [{ title: "Vacance locative", description: "Périodes sans locataire impactant la rentabilité." }, { title: "Impayés", description: "Risque de défaut de paiement des locataires." }, { title: "Entretien", description: "Travaux d'entretien et de réparation à prévoir." }, { title: "Fiscalité", description: "Loyers imposables pouvant alourdir la charge fiscale." }] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "L'investissement locatif demande de la rigueur mais offre des perspectives de rentabilité solides. Chez Azalée Patrimoine, nous vous accompagnons dans la sélection, le financement et la gestion de vos biens." },
      finalCta: { title: "Prêt à investir dans l'immobilier locatif ?", subtitle: "Nos experts vous accompagnent pour optimiser votre investissement.", primaryButton: "Calculer ma rentabilité", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Investissement Locatif | Azalée Patrimoine", metaDescription: "Découvrez l'investissement locatif avec Azalée Patrimoine. Revenus complémentaires et constitution de patrimoine." }
    }
  },
  {
    path: 'immobilier/faire-construire',
    title: 'Faire Construire - Terrain + Construction',
    content: {
      hero: { title: "Faire construire : terrain + construction", subtitle: "Investir dans l'immobilier via la construction d'une maison individuelle ou d'un immeuble vous permet de personnaliser votre bien et de bénéficier d'avantages fiscaux spécifiques.", button: "Prendre rendez-vous" },
      rightCard: { title: "Construction sur-mesure", benefits: ["Personnalisation totale", "Normes RT2020 / RE2020", "Garanties constructeur", "Optimisation fiscale"] },
      avantages: { title: "Avantages de faire construire", items: [{ title: "Personnalisation", description: "Vous choisissez l'agencement, les matériaux et les finitions." }, { title: "Normes énergétiques", description: "Construction aux dernières normes RE2020." }, { title: "Garanties", description: "Garantie décennale et parfait achèvement." }, { title: "Fiscalité", description: "TVA réduite dans certains cas, PTZ éligible." }] },
      inconvenients: { title: "Points de vigilance", items: [{ title: "Délais", description: "12 à 24 mois de construction." }, { title: "Coordination", description: "Gestion de multiples intervenants." }, { title: "Budget", description: "Risque de dépassement de budget." }, { title: "Terrain", description: "Recherche et choix du terrain crucial." }] },
      etapes: { title: "Les étapes de votre projet", items: [{ numero: "1", title: "Recherche du terrain", description: "Choix de l'emplacement et étude du sol." }, { numero: "2", title: "Conception", description: "Plans architecturaux et permis de construire." }, { numero: "3", title: "Construction", description: "Suivi des travaux et coordination." }, { numero: "4", title: "Livraison", description: "Réception et levée des réserves." }] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "Faire construire est un projet ambitieux qui nécessite un accompagnement expert. Nous vous aidons à trouver le terrain idéal et à optimiser votre financement." },
      finalCta: { title: "Prêt à faire construire ?", subtitle: "Nos experts vous accompagnent de la recherche du terrain à la livraison.", primaryButton: "Démarrer mon projet", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Faire Construire - Terrain + Construction | Azalée Patrimoine", metaDescription: "Faire construire votre bien immobilier avec Azalée Patrimoine. Personnalisation, normes RE2020 et accompagnement expert." }
    }
  },
  {
    path: 'immobilier/credit-immobilier-ptz',
    title: 'Crédit Immobilier / PTZ',
    content: {
      hero: { title: "Crédit immobilier et Prêt à Taux Zéro (PTZ)", subtitle: "Le crédit immobilier est le levier principal pour financer votre investissement. Le PTZ est un dispositif d'aide à l'accession qui permet d'emprunter sans intérêts.", button: "Simuler mon financement" },
      rightCard: { title: "Financement optimisé", benefits: ["Meilleurs taux négociés", "PTZ éligibilité vérifiée", "Montage financier personnalisé", "Accompagnement complet"] },
      credit: { title: "Le crédit immobilier", description: "Le crédit immobilier permet de financer l'acquisition d'un bien avec un apport limité. Les banques proposent différentes formules adaptées à votre profil.", elements: [{ title: "Taux fixe", description: "Mensualité constante sur toute la durée." }, { title: "Taux variable", description: "Taux qui évolue selon le marché." }, { title: "Assurance emprunteur", description: "Protection obligatoire du prêt." }, { title: "Garantie", description: "Hypothèque ou caution bancaire." }] },
      ptz: { title: "Le Prêt à Taux Zéro (PTZ)", description: "Le PTZ est un prêt sans intérêts accordé sous conditions de ressources pour l'acquisition d'une résidence principale.", conditions: ["Primo-accédant (ne pas avoir été propriétaire les 2 dernières années)", "Plafonds de ressources selon la zone géographique", "Acquisition dans le neuf ou l'ancien avec travaux"], avantages: ["Aucun intérêt à payer", "Différé de remboursement possible", "Complément idéal d'un prêt classique"] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "Le montage financier est crucial pour la réussite de votre projet. Nous analysons votre situation et négocions les meilleures conditions auprès de nos partenaires bancaires." },
      finalCta: { title: "Optimisez votre financement immobilier", subtitle: "Nos experts négocient pour vous les meilleures conditions de crédit.", primaryButton: "Simuler mon financement", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Crédit Immobilier et PTZ | Azalée Patrimoine", metaDescription: "Optimisez votre financement immobilier avec Azalée Patrimoine. Crédit immobilier et Prêt à Taux Zéro." }
    }
  },
  {
    path: 'immobilier/plus-value-immobiliere',
    title: 'Plus-value Immobilière',
    content: {
      hero: { title: "Plus-value immobilière : comprendre et optimiser", subtitle: "La plus-value immobilière est le gain réalisé lors de la vente d'un bien. Comprendre son calcul et les exonérations possibles est essentiel pour optimiser votre patrimoine.", button: "Calculer ma plus-value" },
      rightCard: { title: "Optimisation fiscale", benefits: ["Calcul personnalisé", "Stratégies d'exonération", "Abattements pour durée", "Accompagnement expert"] },
      definition: { title: "Qu'est-ce que la plus-value immobilière ?", description: "La plus-value est la différence entre le prix de vente et le prix d'acquisition, majoré des frais. Elle est soumise à l'impôt sur le revenu (19%) et aux prélèvements sociaux (17,2%)." },
      calcul: { title: "Comment calculer la plus-value ?", etapes: [{ titre: "Prix de vente", description: "Prix net vendeur après déduction des frais." }, { titre: "Prix d'acquisition", description: "Prix d'achat majoré des frais de notaire et travaux." }, { titre: "Plus-value brute", description: "Prix de vente - Prix d'acquisition." }, { titre: "Abattements", description: "Réduction selon la durée de détention." }] },
      abattements: { title: "Abattements pour durée de détention", description: "La plus-value est progressivement réduite selon la durée de détention du bien.", ir: "Exonération totale après 22 ans de détention pour l'impôt sur le revenu.", ps: "Exonération totale après 30 ans pour les prélèvements sociaux." },
      exonerations: { title: "Cas d'exonération", items: ["Résidence principale : exonération totale", "Première vente d'un logement autre que la résidence principale (sous conditions)", "Vente inférieure à 15 000 €", "Expropriation avec remploi"] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "Anticiper la fiscalité de la revente est essentiel. Nous vous accompagnons pour optimiser le timing de vente et maximiser votre gain net." },
      finalCta: { title: "Optimisez votre plus-value immobilière", subtitle: "Nos experts vous aident à calculer et anticiper la fiscalité de votre revente.", primaryButton: "Calculer ma plus-value", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Plus-value Immobilière | Azalée Patrimoine", metaDescription: "Comprenez et optimisez votre plus-value immobilière avec Azalée Patrimoine." }
    }
  },
  {
    path: 'immobilier/immeubles-de-rapport',
    title: 'Immeubles de Rapport',
    content: {
      hero: { title: "Immeubles de rapport : investir dans le collectif", subtitle: "L'immeuble de rapport est un investissement locatif où vous achetez un bâtiment entier comprenant plusieurs logements. Cette stratégie offre des avantages significatifs en termes de rentabilité et de gestion.", button: "Découvrir les opportunités" },
      rightCard: { title: "Investissement collectif", benefits: ["Rentabilité élevée", "Mutualisation des risques", "Économies d'échelle", "Plus-value importante"] },
      definition: { title: "Qu'est-ce qu'un immeuble de rapport ?", description: "Un immeuble de rapport est un bâtiment comprenant plusieurs logements (appartements ou studios) destinés à la location. Il permet de diversifier les revenus locatifs au sein d'un seul investissement." },
      avantages: { title: "Les avantages", items: [{ title: "Rentabilité", description: "Prix au m² souvent inférieur à l'achat en copropriété." }, { title: "Mutualisation", description: "Un logement vacant n'impacte pas totalement les revenus." }, { title: "Autonomie", description: "Pas de copropriété, vous êtes seul décisionnaire." }, { title: "Plus-value", description: "Potentiel de valorisation important après rénovation." }] },
      inconvenients: { title: "Les points de vigilance", items: [{ title: "Capital initial", description: "Investissement plus important qu'un appartement seul." }, { title: "Gestion", description: "Multiplication des locataires à gérer." }, { title: "Travaux", description: "Rénovation souvent nécessaire sur les parties communes." }, { title: "Financement", description: "Dossier bancaire plus complexe." }] },
      conseil: { title: "Conseil Azalée Patrimoine", content: "L'immeuble de rapport est réservé aux investisseurs avertis mais offre des perspectives de rentabilité exceptionnelles. Nous vous accompagnons dans la recherche, l'analyse et la gestion de ce type de bien." },
      finalCta: { title: "Investir dans un immeuble de rapport", subtitle: "Nos experts vous accompagnent pour identifier les meilleures opportunités.", primaryButton: "Découvrir les opportunités", secondaryButton: "Prendre rendez-vous" },
      seo: { metaTitle: "Immeubles de Rapport | Azalée Patrimoine", metaDescription: "Investissez dans un immeuble de rapport avec Azalée Patrimoine. Rentabilité élevée et mutualisation des risques." }
    }
  }
];

async function initAllPages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    for (const page of pages) {
      const existingPage = await PageContent.findOne({ path: page.path });
      
      if (existingPage) {
        console.log(`📄 Updating ${page.path}...`);
        existingPage.content = page.content;
        existingPage.title = page.title;
        existingPage.lastModified = new Date();
        await existingPage.save();
        console.log(`✅ ${page.path} updated`);
      } else {
        console.log(`📄 Creating ${page.path}...`);
        const newPage = new PageContent({
          path: page.path,
          title: page.title,
          content: page.content,
          published: true,
        });
        await newPage.save();
        console.log(`✅ ${page.path} created`);
      }
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    console.log(`\n✅ All ${pages.length} pages initialized successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initAllPages();


