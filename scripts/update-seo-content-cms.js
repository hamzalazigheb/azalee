// Script to update CMS with new SEO content from CSV feedback
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String }
}, { collection: 'pagecontents' });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// SEO updates from CSV Feedback URL v2
const seoUpdates = [
  // Homepage
  {
    path: 'homepage',
    altPaths: ['accueil', '/', 'home'],
    title: 'Cabinet de Gestion de Patrimoine & Conseil Financier | Azalée',
    seo: {
      h1: 'Cabinet de Gestion de Patrimoine & Conseil Financier',
      metaTitle: 'Cabinet de Gestion de Patrimoine & Conseil Financier | Azalée',
      metaDescription: 'Cabinet expert en gestion de patrimoine. Optimisez votre fiscalité, préparez votre retraite et vos placements avec Azalée Patrimoine.'
    }
  },
  // Patrimoine
  {
    path: 'patrimoine',
    title: 'Stratégie Patrimoniale & Audit Global : Conseil Expert | Azalée',
    seo: {
      h1: 'Conseil en Stratégie Patrimoniale & Audit Global',
      metaTitle: 'Stratégie Patrimoniale & Audit Global : Conseil Expert | Azalée',
      metaDescription: 'Audit patrimonial 360° et stratégie sur-mesure. Nos experts analysent vos actifs pour optimiser votre fiscalité et préparer votre transmission.'
    }
  },
  {
    path: 'patrimoine/transmission',
    title: 'Transmission de patrimoine : anticiper sa succession | Azalée',
    seo: {
      h1: 'Transmission de patrimoine et succession',
      metaTitle: 'Transmission de patrimoine : anticiper sa succession | Azalée',
      metaDescription: 'Préparez la transmission de votre patrimoine pour protéger vos proches. Solutions juridiques et fiscales sur-mesure avec Azalée Patrimoine.'
    }
  },
  {
    path: 'patrimoine/succession-heritage',
    title: 'Succession et héritage : droits et fiscalité | Azalée',
    seo: {
      h1: 'Comprendre les règles de succession',
      metaTitle: 'Succession et héritage : droits et fiscalité | Azalée',
      metaDescription: 'Droits de succession, héritiers réservataires, testament : nos experts vous éclairent pour gérer sereinement les étapes d\'un héritage.'
    }
  },
  {
    path: 'patrimoine/protection-famille',
    title: 'Protection de la famille et prévoyance | Azalée Patrimoine',
    seo: {
      h1: 'Protection de la famille et prévoyance',
      metaTitle: 'Protection de la famille et prévoyance | Azalée Patrimoine',
      metaDescription: 'Assurez l\'avenir de votre conjoint et de vos enfants. Solutions de prévoyance et stratégies patrimoniales pour faire face aux aléas de la vie.'
    }
  },
  {
    path: 'patrimoine/bilan',
    title: 'Bilan patrimonial : audit et stratégie | Azalée Patrimoine',
    seo: {
      h1: 'Bilan patrimonial : audit complet',
      metaTitle: 'Bilan patrimonial : audit et stratégie | Azalée Patrimoine',
      metaDescription: 'Première étape vers l\'optimisation : le bilan patrimonial. Nos experts analysent vos actifs, passifs et objectifs pour définir une stratégie.'
    }
  },
  {
    path: 'patrimoine/donation-onereuse',
    title: 'Donation à titre onéreux : transmission | Azalée Patrimoine',
    seo: {
      h1: 'Donation à titre onéreux et nue-propriété',
      metaTitle: 'Donation à titre onéreux : transmission | Azalée Patrimoine',
      metaDescription: 'La donation avec charges ou à titre onéreux est un outil de transmission méconnu. Découvrez ses avantages fiscaux et civils.'
    }
  },
  {
    path: 'patrimoine/donation-gratuite',
    title: 'Donation à titre gratuit : donner de son vivant | Azalée',
    seo: {
      h1: 'Donation à titre gratuit et présent d\'usage',
      metaTitle: 'Donation à titre gratuit : donner de son vivant | Azalée',
      metaDescription: 'Aider ses enfants ou ses proches de son vivant grâce à la donation simple ou au présent d\'usage. Règles fiscales et abattements.'
    }
  },
  {
    path: 'patrimoine/autre',
    title: 'Solutions patrimoniales sur-mesure | Azalée Patrimoine',
    seo: {
      h1: 'Autres solutions patrimoniales sur-mesure',
      metaTitle: 'Solutions patrimoniales sur-mesure | Azalée Patrimoine',
      metaDescription: 'Chaque patrimoine est unique. Découvrez nos solutions spécifiques pour répondre à des problématiques complexes (art, forêt, groupements fonciers).'
    }
  },
  {
    path: 'patrimoine/conseils',
    title: 'Conseils patrimoniaux : expertise sur-mesure | Azalée',
    seo: {
      h1: 'Conseils en stratégie patrimoniale',
      metaTitle: 'Conseils patrimoniaux : expertise sur-mesure | Azalée',
      metaDescription: 'Retrouvez tous nos conseils d\'experts pour gérer, valoriser et transmettre votre patrimoine. Une approche globale et personnalisée.'
    }
  },
  {
    path: 'patrimoine/holding',
    title: 'Holding patrimoniale : avantages fiscaux | Azalée',
    seo: {
      h1: 'Holding patrimoniale civile',
      metaTitle: 'Holding patrimoniale : avantages fiscaux | Azalée',
      metaDescription: 'La holding civile est un outil puissant pour organiser, gérer et transmettre un patrimoine professionnel et privé.'
    }
  },
  {
    path: 'patrimoine/demembrement',
    title: 'Démembrement de propriété : usufruit et nue-propriété | Azalée',
    seo: {
      h1: 'Démembrement de propriété',
      metaTitle: 'Démembrement de propriété : usufruit et nue-propriété | Azalée',
      metaDescription: 'Séparer l\'usufruit de la nue-propriété est une technique clé en gestion de patrimoine pour optimiser la fiscalité et la transmission.'
    }
  },
  // Fiscalité
  {
    path: 'fiscalite/pfu',
    title: 'PFU ou prélèvement forfaitaire unique | Azalée Patrimoine',
    seo: {
      h1: 'PFU ou prélèvement forfaitaire unique',
      metaTitle: 'PFU ou prélèvement forfaitaire unique | Azalée Patrimoine',
      metaDescription: 'Tout savoir sur le PFU (prélèvement forfaitaire unique). Azalée Patrimoine vous conseille pour optimiser votre fiscalité sur les revenus du capital.'
    }
  },
  {
    path: 'fiscalite/deficit-foncier',
    altPaths: ['fiscalite/reductions-impot-deficit-foncier'],
    title: 'Déficit foncier : réduire ses impôts | Azalée Patrimoine',
    seo: {
      h1: 'Déficit foncier et réductions d\'impôt',
      metaTitle: 'Déficit foncier : réduire ses impôts | Azalée Patrimoine',
      metaDescription: 'Mécanisme du déficit foncier : comment imputer vos travaux sur vos revenus globaux ? Stratégies d\'optimisation fiscale par Azalée Patrimoine.'
    }
  },
  {
    path: 'fiscalite/impot-sur-le-revenu',
    altPaths: ['fiscalite/ir-impot-revenu'],
    title: 'Impôt sur le revenu : tranches et calcul | Azalée',
    seo: {
      h1: 'Impôt sur le revenu (IR) : comprendre et optimiser',
      metaTitle: 'Impôt sur le revenu : tranches et calcul | Azalée',
      metaDescription: 'Comprendre le barème progressif et les mécanismes de l\'impôt sur le revenu. Stratégies pour réduire votre pression fiscale légalement.'
    }
  },
  {
    path: 'fiscalite/ifi',
    altPaths: ['fiscalite/ifi-impot-fortune-immobiliere'],
    title: 'IFI (impôt fortune immobilière) : seuils et calcul | Azalée',
    seo: {
      h1: 'IFI : impôt sur la fortune immobilière',
      metaTitle: 'IFI (impôt fortune immobilière) : seuils et calcul | Azalée',
      metaDescription: 'Êtes-vous assujetti à l\'IFI ? Analyse du barème, des biens imposables et des stratégies pour optimiser votre base taxable immobilière.'
    }
  },
  {
    path: 'fiscalite/entreprises',
    altPaths: ['fiscalite/optimisation-fiscale-entreprises'],
    title: 'Fiscalité entreprise et dirigeant : conseils | Azalée',
    seo: {
      h1: 'Optimisation fiscale pour les entreprises et dirigeants',
      metaTitle: 'Fiscalité entreprise et dirigeant : conseils | Azalée',
      metaDescription: 'Chefs d\'entreprise, optimisez la fiscalité de votre société et votre rémunération. Solutions d\'épargne salariale et holding patrimoniale.'
    }
  },
  {
    path: 'fiscalite/niches',
    altPaths: ['fiscalite/niches-fiscales'],
    title: 'Niches fiscales : liste et plafonnement | Azalée',
    seo: {
      h1: 'Les niches fiscales et le plafonnement',
      metaTitle: 'Niches fiscales : liste et plafonnement | Azalée',
      metaDescription: 'Optimisez votre imposition en utilisant les niches fiscales légales. Analyse du plafonnement global et des dispositifs les plus efficaces.'
    }
  },
  {
    path: 'fiscalite/prelevement-a-la-source',
    altPaths: ['fiscalite/prelevement-source'],
    title: 'Prélèvement à la source : gérer son taux | Azalée',
    seo: {
      h1: 'Le prélèvement à la source (PAS)',
      metaTitle: 'Prélèvement à la source : gérer son taux | Azalée',
      metaDescription: 'Comprendre le fonctionnement du prélèvement à la source. Comment modifier son taux et gérer les acomptes sur revenus fonciers.'
    }
  },
  {
    path: 'fiscalite/plus-values',
    altPaths: ['fiscalite/plus-values-mobilieres'],
    title: 'Plus-values mobilières : impôt et flat tax | Azalée',
    seo: {
      h1: 'Plus-values mobilières : taxation',
      metaTitle: 'Plus-values mobilières : impôt et flat tax | Azalée',
      metaDescription: 'Imposition des gains sur actions et obligations. Choix entre le prélèvement forfaitaire unique (PFU) et le barème progressif.'
    }
  },
  {
    path: 'fiscalite/droits-succession',
    title: 'Droits de succession : barème et calcul | Azalée',
    seo: {
      h1: 'Droits de succession : calcul et barème',
      metaTitle: 'Droits de succession : barème et calcul | Azalée',
      metaDescription: 'Comment sont calculés les droits de succession ? Barème, abattements en ligne directe et entre époux. Tout pour anticiper.'
    }
  },
  // Investissement Immobilier (nouveau silo)
  {
    path: 'investissement-immobilier/sci',
    title: 'SCI : gestion et transmission de patrimoine | Azalée',
    seo: {
      h1: 'SCI : outil de gestion et transmission patrimoniale',
      metaTitle: 'SCI : gestion et transmission de patrimoine | Azalée',
      metaDescription: 'La SCI est un outil puissant pour gérer et transmettre votre patrimoine immobilier. Découvrez nos conseils d\'experts pour créer et gérer votre SCI.'
    }
  },
  {
    path: 'investissement-immobilier/lmnp',
    title: 'LMNP : statut et avantages fiscaux | Azalée Patrimoine',
    seo: {
      h1: 'LMNP : loueur en meublé non professionnel',
      metaTitle: 'LMNP : statut et avantages fiscaux | Azalée Patrimoine',
      metaDescription: 'Le statut LMNP (loueur en meublé non professionnel) offre une fiscalité attractive. Azalée Patrimoine vous guide pour investir en location meublée.'
    }
  },
  {
    path: 'investissement-immobilier/plus-value-immobiliere',
    title: 'Plus-value immobilière : fiscalité et calcul | Azalée',
    seo: {
      h1: 'Plus-value immobilière : fiscalité et calcul',
      metaTitle: 'Plus-value immobilière : fiscalité et calcul | Azalée',
      metaDescription: 'Comprendre la taxation des plus-values immobilières. Nos experts analysent pour vous les abattements et cas d\'exonération pour optimiser votre revente.'
    }
  },
  {
    path: 'investissement-immobilier/pinel',
    title: 'Loi Pinel : investir et réduire ses impôts | Azalée',
    seo: {
      h1: 'Loi Pinel : défiscalisation immobilière',
      metaTitle: 'Loi Pinel : investir et réduire ses impôts | Azalée',
      metaDescription: 'Le dispositif Pinel permet de réduire vos impôts en investissant dans le neuf. Analyse des zones éligibles et rentabilité par nos experts.'
    }
  },
  {
    path: 'investissement-immobilier/malraux',
    title: 'Loi Malraux : défiscalisation et patrimoine | Azalée',
    seo: {
      h1: 'Loi Malraux : défiscalisation et patrimoine',
      metaTitle: 'Loi Malraux : défiscalisation et patrimoine | Azalée',
      metaDescription: 'Investissez dans l\'immobilier ancien réhabilité et bénéficiez d\'une forte réduction d\'impôt. Expertise sur les programmes éligibles loi Malraux.'
    }
  },
  {
    path: 'investissement-immobilier/denormandie',
    title: 'Loi Denormandie : défiscalisation ancien | Azalée',
    seo: {
      h1: 'Loi Denormandie : défiscalisation ancien',
      metaTitle: 'Loi Denormandie : défiscalisation ancien | Azalée',
      metaDescription: 'Le dispositif Denormandie encourage la rénovation des logements en centre-ville. Bénéficiez d\'une réduction d\'impôt similaire au Pinel.'
    }
  },
  {
    path: 'investissement-immobilier/scpi',
    title: 'SCPI : investir dans l\'immobilier locatif | Azalée',
    seo: {
      h1: 'SCPI : la pierre-papier',
      metaTitle: 'SCPI : investir dans l\'immobilier locatif | Azalée',
      metaDescription: 'Investir en SCPI pour percevoir des revenus potentiels sans contrainte de gestion. Comparatif des meilleures SCPI de rendement et fiscales.'
    }
  },
  {
    path: 'investissement-immobilier/credit-immobilier',
    title: 'Crédit immobilier : courtage et financement | Azalée',
    seo: {
      h1: 'Crédit immobilier et financement',
      metaTitle: 'Crédit immobilier : courtage et financement | Azalée',
      metaDescription: 'Obtenez les meilleures conditions pour financer vos acquisitions. Nos courtiers négocient taux et assurances pour optimiser votre investissement.'
    }
  },
  {
    path: 'investissement-immobilier/nue-propriete',
    title: 'Nue-propriété : investissement immobilier | Azalée',
    seo: {
      h1: 'Investir en nue-propriété immobilière',
      metaTitle: 'Nue-propriété : investissement immobilier | Azalée',
      metaDescription: 'Acheter la nue-propriété d\'un bien permet d\'investir avec une décote importante et sans fiscalité foncière. Une stratégie long terme efficace.'
    }
  },
  {
    path: 'investissement-immobilier/usufruit-locatif',
    title: 'Usufruit locatif social (ULS) : investir | Azalée',
    seo: {
      h1: 'Usufruit locatif social (ULS)',
      metaTitle: 'Usufruit locatif social (ULS) : investir | Azalée',
      metaDescription: 'L\'investissement en usufruit locatif permet de percevoir des loyers temporaires ou de valoriser un bien. Zoom sur ce démembrement de propriété.'
    }
  },
  {
    path: 'investissement-immobilier/viager',
    title: 'Viager : vente et achat immobilier | Azalée Patrimoine',
    seo: {
      h1: 'Vente et achat en viager',
      metaTitle: 'Viager : vente et achat immobilier | Azalée Patrimoine',
      metaDescription: 'Le viager permet de vendre ou d\'acheter un bien avec versement d\'une rente à vie. Comprendre le bouquet et la rente viagère.'
    }
  },
  {
    path: 'investissement-immobilier/saisonniere',
    altPaths: ['investissement-immobilier/location-saisonniere'],
    title: 'Location saisonnière : fiscalité et règles | Azalée',
    seo: {
      h1: 'Location saisonnière et touristique',
      metaTitle: 'Location saisonnière : fiscalité et règles | Azalée',
      metaDescription: 'Louer en saisonnier offre une rentabilité élevée mais impose des contraintes réglementaires strictes. Nos conseils pour réussir.'
    }
  },
  {
    path: 'investissement-immobilier/locatif',
    title: 'Investissement locatif : rentabilité et conseil | Azalée',
    seo: {
      h1: 'Investissement locatif : stratégies',
      metaTitle: 'Investissement locatif : rentabilité et conseil | Azalée',
      metaDescription: 'Réussir son investissement locatif demande de choisir le bon bien et le bon dispositif fiscal. Nos conseils pour maximiser votre rentabilité.'
    }
  },
  {
    path: 'investissement-immobilier/robien',
    title: 'Loi Robien : gestion du dispositif | Azalée Patrimoine',
    seo: {
      h1: 'Loi Robien (dispositif éteint)',
      metaTitle: 'Loi Robien : gestion du dispositif | Azalée Patrimoine',
      metaDescription: 'Le dispositif Robien ne permet plus de nouveaux investissements mais continue d\'impacter les propriétaires actuels. Gestion et sortie du dispositif.'
    }
  },
  {
    path: 'investissement-immobilier/borloo',
    title: 'Loi Borloo : gestion du dispositif | Azalée Patrimoine',
    seo: {
      h1: 'Loi Borloo (dispositif éteint)',
      metaTitle: 'Loi Borloo : gestion du dispositif | Azalée Patrimoine',
      metaDescription: 'Informations sur le dispositif Borloo ancien et neuf. Comment gérer la fin de l\'avantage fiscal et les engagements de location.'
    }
  },
  // Placements
  {
    path: 'placements/assurance-vie',
    title: 'Assurance-vie : placement et fiscalité | Azalée Patrimoine',
    seo: {
      h1: 'Assurance-vie : épargne et transmission',
      metaTitle: 'Assurance-vie : placement et fiscalité | Azalée Patrimoine',
      metaDescription: 'L\'assurance-vie reste le placement préféré des Français. Découvrez nos contrats performants et nos conseils pour optimiser votre épargne.'
    }
  },
  {
    path: 'placements/pea',
    title: 'PEA : investir en bourse fiscalement | Azalée Patrimoine',
    seo: {
      h1: 'PEA : plan d\'épargne en actions',
      metaTitle: 'PEA : investir en bourse fiscalement | Azalée Patrimoine',
      metaDescription: 'Le PEA permet d\'investir sur les marchés européens avec une fiscalité douce. Nos conseils pour sélectionner les meilleurs fonds et titres.'
    }
  },
  {
    path: 'placements/compte-titres',
    title: 'Compte-titres : investir sans plafond | Azalée Patrimoine',
    seo: {
      h1: 'Compte-titres ordinaire (CTO)',
      metaTitle: 'Compte-titres : investir sans plafond | Azalée Patrimoine',
      metaDescription: 'Le compte-titres offre une flexibilité totale pour investir sur les marchés mondiaux. Découvrez nos solutions de gestion sous mandat ou conseillée.'
    }
  },
  {
    path: 'placements/private-equity',
    title: 'Private equity : investissement non-coté | Azalée',
    seo: {
      h1: 'Private equity : investir dans le non-coté',
      metaTitle: 'Private equity : investissement non-coté | Azalée',
      metaDescription: 'Diversifiez votre patrimoine en investissant dans l\'économie réelle. Accès exclusif à des fonds de private equity sélectionnés par Azalée.'
    }
  },
  {
    path: 'placements/fip',
    altPaths: ['placements/fip-fcpi'],
    title: 'FIP / FCPI : réduire son impôt sur le revenu | Azalée',
    seo: {
      h1: 'FIP et FCPI : investissement et défiscalisation',
      metaTitle: 'FIP / FCPI : réduire son impôt sur le revenu | Azalée',
      metaDescription: 'Soutenez les PME innovantes et réduisez votre IR. Notre sélection des meilleurs FIP et FCPI pour allier potentiel de gain et avantage fiscal.'
    }
  },
  {
    path: 'placements/crowdfunding',
    title: 'Crowdfunding immobilier : investir dès 1000€ | Azalée',
    seo: {
      h1: 'Crowdfunding immobilier : financement participatif',
      metaTitle: 'Crowdfunding immobilier : investir dès 1000€ | Azalée',
      metaDescription: 'Participez au financement de projets immobiliers via le crowdfunding. Des rendements potentiels élevés sur des horizons courts.'
    }
  },
  {
    path: 'placements/or',
    altPaths: ['placements/or-metaux-precieux'],
    title: 'Investir dans l\'or : valeur refuge | Azalée Patrimoine',
    seo: {
      h1: 'Investir dans l\'or et les métaux précieux',
      metaTitle: 'Investir dans l\'or : valeur refuge | Azalée Patrimoine',
      metaDescription: 'L\'or reste la valeur refuge par excellence. Conseils pour intégrer les métaux précieux dans votre allocation d\'actifs patrimoniale.'
    }
  },
  {
    path: 'placements/art',
    altPaths: ['placements/investir-en-art'],
    title: 'Investir dans l\'art : diversification et fiscalité | Azalée',
    seo: {
      h1: 'Investir dans l\'art et les objets de collection',
      metaTitle: 'Investir dans l\'art : diversification et fiscalité | Azalée',
      metaDescription: 'Le marché de l\'art offre des opportunités de diversification et de transmission avantageuses. Conseil pour investir dans des œuvres de qualité.'
    }
  },
  {
    path: 'placements/cryptomonnaies',
    title: 'Cryptomonnaies : investir et déclarer | Azalée Patrimoine',
    seo: {
      h1: 'Cryptomonnaies et actifs numériques',
      metaTitle: 'Cryptomonnaies : investir et déclarer | Azalée Patrimoine',
      metaDescription: 'Bitcoin, Ethereum... Les crypto-actifs entrent dans les stratégies patrimoniales. Comprendre les risques et la fiscalité spécifique.'
    }
  },
  {
    path: 'placements/etf',
    altPaths: ['placements/etf-trackers'],
    title: 'ETF / Trackers : investir en gestion indicielle | Azalée',
    seo: {
      h1: 'ETF et trackers : gestion passive',
      metaTitle: 'ETF / Trackers : investir en gestion indicielle | Azalée',
      metaDescription: 'Les ETF permettent de répliquer des indices boursiers à moindres frais. Une solution efficace pour diversifier votre portefeuille boursier.'
    }
  },
  {
    path: 'placements/girardin',
    altPaths: ['placements/girardin-industriel'],
    title: 'Girardin industriel : défiscalisation outre-mer | Azalée',
    seo: {
      h1: 'Girardin industriel : défiscalisation outre-mer',
      metaTitle: 'Girardin industriel : défiscalisation outre-mer | Azalée',
      metaDescription: 'Réduisez votre impôt sur le revenu (IR) dès cette année en investissant dans le matériel industriel en outre-mer via la loi Girardin.'
    }
  },
  {
    path: 'placements/pea-pme',
    title: 'PEA-PME : fiscalité et investissement | Azalée',
    seo: {
      h1: 'PEA-PME : investir dans les PME',
      metaTitle: 'PEA-PME : fiscalité et investissement | Azalée',
      metaDescription: 'Le PEA-PME est dédié au financement des petites et moyennes entreprises. Un complément idéal au PEA classique avec les mêmes atouts fiscaux.'
    }
  },
  {
    path: 'placements/livrets',
    altPaths: ['placements/livrets-epargne'],
    title: 'Livrets d\'épargne : placer sa trésorerie | Azalée',
    seo: {
      h1: 'Livrets d\'épargne et trésorerie',
      metaTitle: 'Livrets d\'épargne : placer sa trésorerie | Azalée',
      metaDescription: 'Livret A, LDDS, livrets bancaires fiscalisés... Où placer votre épargne de précaution à court terme ? Comparatif des taux.'
    }
  },
  {
    path: 'placements/fcpr',
    title: 'FCPR : investir en capital risque | Azalée Patrimoine',
    seo: {
      h1: 'FCPR : fonds commun de placement à risques',
      metaTitle: 'FCPR : investir en capital risque | Azalée Patrimoine',
      metaDescription: 'Le FCPR permet d\'investir dans des entreprises non cotées. Un placement dynamique pour diversifier son patrimoine avec un horizon long terme.'
    }
  },
  {
    path: 'placements/obligations',
    title: 'Obligations : rendement et sécurité | Azalée Patrimoine',
    seo: {
      h1: 'Obligations et fonds obligataires',
      metaTitle: 'Obligations : rendement et sécurité | Azalée Patrimoine',
      metaDescription: 'Les obligations d\'État ou d\'entreprises (corporate) pour sécuriser une partie de votre portefeuille. Comprendre le couple rendement/risque.'
    }
  },
  // Retraite
  {
    path: 'retraite/per',
    title: 'PER (Plan Épargne Retraite) : fonctionnement | Azalée',
    seo: {
      h1: 'PER (Plan Épargne Retraite)',
      metaTitle: 'PER (Plan Épargne Retraite) : fonctionnement | Azalée',
      metaDescription: 'Tout savoir sur le PER : déductibilité fiscale, sorties en capital ou rente. Optimisez votre effort d\'épargne avec Azalée Patrimoine.'
    }
  },
  {
    path: 'retraite/preparer-jeune',
    altPaths: ['retraite/preparer-retraite-jeune'],
    title: 'Préparer sa retraite jeune : stratégies | Azalée Patrimoine',
    seo: {
      h1: 'Préparer sa retraite dès le début de carrière',
      metaTitle: 'Préparer sa retraite jeune : stratégies | Azalée Patrimoine',
      metaDescription: 'Il n\'est jamais trop tôt pour anticiper. Découvrez comment l\'intérêt composé et les bons placements sécurisent votre avenir dès aujourd\'hui.'
    }
  },
  {
    path: 'retraite/cadres',
    altPaths: ['retraite/optimiser-retraite-cadre'],
    title: 'Retraite des cadres : optimiser ses revenus | Azalée',
    seo: {
      h1: 'Optimisation de la retraite pour les cadres',
      metaTitle: 'Retraite des cadres : optimiser ses revenus | Azalée',
      metaDescription: 'Cadres supérieurs, anticipez la baisse de revenus à la retraite. Solutions d\'épargne retraite et stratégies dédiées aux carrières à hauts revenus.'
    }
  },
  {
    path: 'retraite/cumul-emploi',
    altPaths: ['retraite/cumul-emploi-retraite'],
    title: 'Cumul emploi-retraite : règles et plafonds | Azalée',
    seo: {
      h1: 'Cumul emploi-retraite : fonctionnement et droits',
      metaTitle: 'Cumul emploi-retraite : règles et plafonds | Azalée',
      metaDescription: 'Poursuivre une activité après la retraite est possible. Décryptage des règles du cumul intégral et partiel pour optimiser vos revenus.'
    }
  },
  {
    path: 'retraite/reversion',
    title: 'Pension de réversion : conditions et montant | Azalée',
    seo: {
      h1: 'Pension de réversion : droits et démarches',
      metaTitle: 'Pension de réversion : conditions et montant | Azalée',
      metaDescription: 'Au décès du conjoint, la pension de réversion est une aide essentielle. Tout savoir sur les conditions d\'âge, de ressources et les démarches.'
    }
  },
  {
    path: 'retraite/calcul',
    altPaths: ['retraite/calcul-retraite'],
    title: 'Calcul retraite : mode d\'emploi complet | Azalée',
    seo: {
      h1: 'Calcul de la retraite : trimestres et points',
      metaTitle: 'Calcul retraite : mode d\'emploi complet | Azalée',
      metaDescription: 'Comprendre le calcul de votre retraite de base et complémentaire. Trimestres, SAM, valeur du point : nos experts vous expliquent tout.'
    }
  },
  {
    path: 'retraite/madelin',
    title: 'Loi Madelin : retraite TNS et indépendants | Azalée',
    seo: {
      h1: 'Loi Madelin : retraite des indépendants (TNS)',
      metaTitle: 'Loi Madelin : retraite TNS et indépendants | Azalée',
      metaDescription: 'Le contrat Madelin permet aux travailleurs non-salariés (TNS) de se constituer une retraite tout en déduisant les cotisations.'
    }
  },
  {
    path: 'retraite/per-individuel',
    altPaths: ['retraite/plan-epargne-retraite'],
    title: 'PER individuel (PERIN) : souscription | Azalée',
    seo: {
      h1: 'Le PER individuel (PERIN)',
      metaTitle: 'PER individuel (PERIN) : souscription | Azalée',
      metaDescription: 'Le PER individuel remplace les anciens contrats Madelin et PERP. Une solution souple pour se constituer un capital retraite.'
    }
  },
  {
    path: 'retraite/agirc-arrco',
    altPaths: ['retraite/retraite-complementaire'],
    title: 'Retraite complémentaire Agirc-Arrco | Azalée Patrimoine',
    seo: {
      h1: 'Retraite complémentaire Agirc-Arrco',
      metaTitle: 'Retraite complémentaire Agirc-Arrco | Azalée Patrimoine',
      metaDescription: 'Le régime de retraite complémentaire des salariés du privé. Comprendre les points Agirc-Arrco et leur valeur.'
    }
  },
  {
    path: 'retraite/reforme',
    altPaths: ['retraite/reforme-retraites'],
    title: 'Réforme des retraites : impact et âge légal | Azalée',
    seo: {
      h1: 'Réforme des retraites : les changements',
      metaTitle: 'Réforme des retraites : impact et âge légal | Azalée',
      metaDescription: 'Décryptage de la dernière réforme des retraites. Impact sur l\'âge légal de départ, la durée de cotisation et les régimes spéciaux.'
    }
  },
  {
    path: 'retraite/retraite-progressive',
    title: 'Retraite progressive : travailler à temps partiel | Azalée',
    seo: {
      h1: 'La retraite progressive',
      metaTitle: 'Retraite progressive : travailler à temps partiel | Azalée',
      metaDescription: 'Transition en douceur vers la retraite, le dispositif de retraite progressive permet de toucher une partie de sa pension tout en travaillant à temps partiel.'
    }
  },
  {
    path: 'retraite/rachat-trimestres',
    title: 'Rachat de trimestres : coût et intérêt | Azalée Patrimoine',
    seo: {
      h1: 'Rachat de trimestres retraite',
      metaTitle: 'Rachat de trimestres : coût et intérêt | Azalée Patrimoine',
      metaDescription: 'Faut-il racheter des trimestres pour partir plus tôt à la retraite ? Analyse du coût et de la rentabilité de l\'opération par nos experts.'
    }
  },
  // Outils
  {
    path: 'outils/simulations-generales',
    title: 'Simulateurs gestion de patrimoine | Azalée Patrimoine',
    seo: {
      h1: 'Simulateurs et outils de gestion de patrimoine',
      metaTitle: 'Simulateurs gestion de patrimoine | Azalée Patrimoine',
      metaDescription: 'Accédez à nos outils de simulation pour évaluer vos impôts, votre capacité d\'emprunt ou préparer votre retraite. Des résultats immédiats et précis.'
    }
  },
  {
    path: 'outils/simulateur-ir',
    altPaths: ['outils/simulateur-impots'],
    title: 'Simulateur impôt sur le revenu gratuit | Azalée Patrimoine',
    seo: {
      h1: 'Simulateur d\'impôt sur le revenu',
      metaTitle: 'Simulateur impôt sur le revenu gratuit | Azalée Patrimoine',
      metaDescription: 'Estimez rapidement le montant de votre impôt sur le revenu avec notre calculateur à jour des dernières lois de finances.'
    }
  },
  {
    path: 'outils/simulateur-pension',
    altPaths: ['outils/simulateur-retraite'],
    title: 'Simulateur retraite : calculer sa pension | Azalée',
    seo: {
      h1: 'Simulateur de retraite gratuit',
      metaTitle: 'Simulateur retraite : calculer sa pension | Azalée',
      metaDescription: 'Estimez le montant de votre future pension de retraite en quelques clics. Anticipez la baisse de revenus avec notre outil de simulation complet.'
    }
  },
  {
    path: 'outils/simulateur-ifi',
    title: 'Simulateur IFI gratuit : calcul impôt fortune | Azalée',
    seo: {
      h1: 'Simulateur IFI (impôt fortune immobilière)',
      metaTitle: 'Simulateur IFI gratuit : calcul impôt fortune | Azalée',
      metaDescription: 'Calculez rapidement si vous êtes redevable de l\'IFI et estimez le montant de votre impôt sur la fortune immobilière.'
    }
  },
  {
    path: 'outils/capacite-emprunt',
    altPaths: ['outils/calculateur-capacite-emprunt'],
    title: 'Calculateur capacité d\'emprunt immobilier | Azalée',
    seo: {
      h1: 'Calculateur de capacité d\'emprunt',
      metaTitle: 'Calculateur capacité d\'emprunt immobilier | Azalée',
      metaDescription: 'Combien pouvez-vous emprunter pour votre projet immobilier ? Calculez votre enveloppe de financement en fonction de vos revenus et charges.'
    }
  },
  {
    path: 'outils/frais-notaire',
    altPaths: ['outils/calculateur-frais-notaire'],
    title: 'Calculateur frais de notaire immobilier | Azalée',
    seo: {
      h1: 'Calculateur de frais de notaire',
      metaTitle: 'Calculateur frais de notaire immobilier | Azalée',
      metaDescription: 'Estimez les frais d\'acquisition (frais de notaire) pour votre achat immobilier dans l\'ancien ou le neuf.'
    }
  },
  // Pages légales et autres
  {
    path: 'contact',
    title: 'Contactez-nous : cabinet de gestion de patrimoine | Azalée',
    seo: {
      h1: 'Contactez Azalée Patrimoine',
      metaTitle: 'Contactez-nous : cabinet de gestion de patrimoine | Azalée',
      metaDescription: 'Prenez rendez-vous avec nos conseillers en gestion de patrimoine. Bureaux à Paris et accompagnement partout en France.'
    }
  },
  {
    path: 'qui-sommes-nous',
    title: 'Qui sommes-nous ? Cabinet Azalée Patrimoine',
    seo: {
      h1: 'Qui sommes-nous ? Le cabinet Azalée',
      metaTitle: 'Qui sommes-nous ? Cabinet Azalée Patrimoine',
      metaDescription: 'Découvrez l\'équipe d\'Azalée Patrimoine. Des experts indépendants dédiés à la gestion et l\'optimisation de votre patrimoine depuis 20 ans.'
    }
  },
  {
    path: 'mentions-legales',
    title: 'Mentions légales | Azalée Patrimoine',
    seo: {
      h1: 'Mentions légales',
      metaTitle: 'Mentions légales | Azalée Patrimoine',
      metaDescription: 'Informations légales, juridiques et réglementaires concernant le site internet et le cabinet Azalée Patrimoine.'
    }
  },
  {
    path: 'politique-confidentialite',
    title: 'Politique de confidentialité | Azalée Patrimoine',
    seo: {
      h1: 'Politique de confidentialité',
      metaTitle: 'Politique de confidentialité | Azalée Patrimoine',
      metaDescription: 'Transparence sur la collecte et le traitement de vos données personnelles. Engagement de confidentialité d\'Azalée Patrimoine.'
    }
  },
];

async function updateSEOContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let updated = 0;
    let created = 0;
    let skipped = 0;

    for (const page of seoUpdates) {
      // Try to find existing page
      let existingPage = await PageContent.findOne({ path: page.path });
      
      // If not found, try alternate paths
      if (!existingPage && page.altPaths) {
        for (const altPath of page.altPaths) {
          existingPage = await PageContent.findOne({ path: altPath });
          if (existingPage) break;
        }
      }

      if (existingPage) {
        // Update existing page
        existingPage.title = page.title;
        existingPage.content = {
          ...existingPage.content,
          seo: page.seo,
          hero: {
            ...existingPage.content?.hero,
            title: page.seo.h1
          }
        };
        existingPage.lastModified = new Date();
        await existingPage.save();
        console.log(`✅ Updated: ${page.path}`);
        updated++;
      } else {
        // Create new page
        const newPage = new PageContent({
          path: page.path,
          title: page.title,
          content: {
            hero: {
              title: page.seo.h1,
              subtitle: '',
              description: page.seo.metaDescription
            },
            seo: page.seo
          },
          published: true,
          lastModified: new Date()
        });
        await newPage.save();
        console.log(`✨ Created: ${page.path}`);
        created++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Updated: ${updated}`);
    console.log(`Created: ${created}`);
    console.log(`Total: ${updated + created}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

updateSEOContent();

