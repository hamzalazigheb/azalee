// Script to analyze CSV feedback and implement SEO changes
const fs = require('fs');
const path = require('path');

// Parse CSV data
const csvData = `URL Actuelle,Ancien Title,Ancienne Meta Description,Nouveau Silo,Nouvelle URL,Nouveau H1,Nouveau Title (SEO),Nouvelle Meta Description
https://www.azalee-patrimoine.fr/,Azalée Patrimoine - Gestion de patrimoine et conseil financier,Expert en gestion de patrimoine,Homepage,https://www.azalee-patrimoine.fr/,Cabinet de Gestion de Patrimoine & Conseil Financier,Cabinet de Gestion de Patrimoine & Conseil Financier | Azalée,Cabinet expert en gestion de patrimoine. Optimisez votre fiscalité préparez votre retraite et vos placements avec Azalée Patrimoine.
https://www.azalee-patrimoine.fr/patrimoine/,(Page manquante ou redirection),(Page manquante ou redirection),Patrimoine,https://www.azalee-patrimoine.fr/patrimoine/,Conseil en Stratégie Patrimoniale & Audit Global,Stratégie Patrimoniale & Audit Global : Conseil Expert | Azalée,Audit patrimonial 360° et stratégie sur-mesure. Nos experts analysent vos actifs pour optimiser votre fiscalité et préparer votre transmission.
https://www.azalee-patrimoine.fr/fiscalite/pfu,Azalée Patrimoine,Expert en gestion de patrimoine,Fiscalité,https://www.azalee-patrimoine.fr/fiscalite/pfu/,PFU ou prélèvement forfaitaire unique,PFU ou prélèvement forfaitaire unique | Azalée Patrimoine,Tout savoir sur le PFU. Azalée Patrimoine vous conseille pour optimiser votre fiscalité sur les revenus du capital.
https://www.azalee-patrimoine.fr/immobilier/sci,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/sci/,SCI : outil de gestion et transmission patrimoniale,SCI : gestion et transmission de patrimoine | Azalée,La SCI est un outil puissant pour gérer et transmettre votre patrimoine immobilier. Découvrez nos conseils d experts.
https://www.azalee-patrimoine.fr/immobilier/lmnp,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/lmnp/,LMNP : loueur en meublé non professionnel,LMNP : statut et avantages fiscaux | Azalée Patrimoine,Le statut LMNP offre une fiscalité attractive. Azalée Patrimoine vous guide pour investir en location meublée.
https://www.azalee-patrimoine.fr/immobilier/plus-value-immobiliere,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/plus-value-immobiliere/,Plus-value immobilière : fiscalité et calcul,Plus-value immobilière : fiscalité et calcul | Azalée,Comprendre la taxation des plus-values immobilières. Analyse des abattements et cas d exonération.
https://www.azalee-patrimoine.fr/immobilier/pinel,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/pinel/,Loi Pinel : défiscalisation immobilière,Loi Pinel : investir et réduire ses impôts | Azalée,Le dispositif Pinel permet de réduire vos impôts en investissant dans le neuf. Analyse des zones éligibles.
https://www.azalee-patrimoine.fr/immobilier/malraux,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/malraux/,Loi Malraux : défiscalisation et patrimoine,Loi Malraux : défiscalisation et patrimoine | Azalée,Investissez dans l immobilier ancien réhabilité et bénéficiez d une forte réduction d impôt.
https://www.azalee-patrimoine.fr/immobilier/denormandie,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/denormandie/,Loi Denormandie : défiscalisation ancien,Loi Denormandie : défiscalisation ancien | Azalée,Le dispositif Denormandie encourage la rénovation des logements en centre-ville.
https://www.azalee-patrimoine.fr/immobilier/scpi,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/scpi/,SCPI : la pierre-papier,SCPI : investir dans l immobilier locatif | Azalée,Investir en SCPI pour percevoir des revenus potentiels sans contrainte de gestion.
https://www.azalee-patrimoine.fr/immobilier/credit-immobilier,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/credit-immobilier/,Crédit immobilier et financement,Crédit immobilier : courtage et financement | Azalée,Obtenez les meilleures conditions pour financer vos acquisitions.
https://www.azalee-patrimoine.fr/immobilier/nue-propriete,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/nue-propriete/,Investir en nue-propriété immobilière,Nue-propriété : investissement immobilier | Azalée,Acheter la nue-propriété d un bien permet d investir avec une décote importante.
https://www.azalee-patrimoine.fr/immobilier/usufruit-locatif,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/usufruit-locatif/,Usufruit locatif social (ULS),Usufruit locatif social (ULS) : investir | Azalée,L investissement en usufruit locatif permet de percevoir des loyers temporaires.
https://www.azalee-patrimoine.fr/immobilier/viager,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/viager/,Vente et achat en viager,Viager : vente et achat immobilier | Azalée Patrimoine,Le viager permet de vendre ou d acheter un bien avec versement d une rente à vie.
https://www.azalee-patrimoine.fr/immobilier/location-saisonniere,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/saisonnie/,Location saisonnière et touristique,Location saisonnière : fiscalité et règles | Azalée,Louer en saisonnier offre une rentabilité élevée mais impose des contraintes réglementaires.
https://www.azalee-patrimoine.fr/immobilier/investissement-locatif,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/locatif/,Investissement locatif : stratégies,Investissement locatif : rentabilité et conseil | Azalée,Réussir son investissement locatif demande de choisir le bon bien et le bon dispositif fiscal.
https://www.azalee-patrimoine.fr/immobilier/robien,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/robien/,Loi Robien (dispositif éteint),Loi Robien : gestion du dispositif | Azalée Patrimoine,Le dispositif Robien ne permet plus de nouveaux investissements.
https://www.azalee-patrimoine.fr/immobilier/borloo,Investissement Immobilier | Azalée Patrimoine,Expert en gestion de patrimoine,Investissement Immobilier,https://www.azalee-patrimoine.fr/investissement-immobilier/borloo/,Loi Borloo (dispositif éteint),Loi Borloo : gestion du dispositif | Azalée Patrimoine,Informations sur le dispositif Borloo ancien et neuf.`;

// Redirections to add to next.config.mjs
const redirections = [
  // Immobilier -> Investissement Immobilier redirections
  { source: '/immobilier/sci', destination: '/investissement-immobilier/sci', permanent: true },
  { source: '/immobilier/lmnp', destination: '/investissement-immobilier/lmnp', permanent: true },
  { source: '/immobilier/plus-value-immobiliere', destination: '/investissement-immobilier/plus-value-immobiliere', permanent: true },
  { source: '/immobilier/pinel', destination: '/investissement-immobilier/pinel', permanent: true },
  { source: '/immobilier/malraux', destination: '/investissement-immobilier/malraux', permanent: true },
  { source: '/immobilier/denormandie', destination: '/investissement-immobilier/denormandie', permanent: true },
  { source: '/immobilier/scpi', destination: '/investissement-immobilier/scpi', permanent: true },
  { source: '/immobilier/credit-immobilier', destination: '/investissement-immobilier/credit-immobilier', permanent: true },
  { source: '/immobilier/nue-propriete', destination: '/investissement-immobilier/nue-propriete', permanent: true },
  { source: '/immobilier/usufruit-locatif', destination: '/investissement-immobilier/usufruit-locatif', permanent: true },
  { source: '/immobilier/viager', destination: '/investissement-immobilier/viager', permanent: true },
  { source: '/immobilier/location-saisonniere', destination: '/investissement-immobilier/saisonniere', permanent: true },
  { source: '/immobilier/investissement-locatif', destination: '/investissement-immobilier/locatif', permanent: true },
  { source: '/immobilier/robien', destination: '/investissement-immobilier/robien', permanent: true },
  { source: '/immobilier/borloo', destination: '/investissement-immobilier/borloo', permanent: true },
  
  // Other URL structure changes from CSV
  { source: '/fiscalite/reductions-impot-deficit-foncier', destination: '/fiscalite/deficit-foncier', permanent: true },
  { source: '/fiscalite/ir-impot-revenu', destination: '/fiscalite/impot-sur-le-revenu', permanent: true },
  { source: '/fiscalite/ifi-impot-fortune-immobiliere', destination: '/fiscalite/ifi', permanent: true },
  { source: '/fiscalite/ifi-calcul', destination: '/fiscalite/ifi/calcul', permanent: true },
  { source: '/fiscalite/droits-succession', destination: '/patrimoine/droits-succession', permanent: true },
  { source: '/fiscalite/plus-values-mobilieres', destination: '/fiscalite/plus-values', permanent: true },
  { source: '/fiscalite/niches-fiscales', destination: '/fiscalite/niches', permanent: true },
  { source: '/fiscalite/prelevement-source', destination: '/fiscalite/prelevement-a-la-source', permanent: true },
  { source: '/fiscalite/optimisation-fiscale-entreprises', destination: '/fiscalite/entreprises', permanent: true },
  
  // Placements restructuring
  { source: '/placements/fip-fcpi', destination: '/placements/fip', permanent: true },
  { source: '/placements/or-metaux-precieux', destination: '/placements/or', permanent: true },
  { source: '/placements/investir-en-art', destination: '/placements/art', permanent: true },
  { source: '/placements/etf-trackers', destination: '/placements/etf', permanent: true },
  { source: '/placements/girardin-industriel', destination: '/placements/girardin', permanent: true },
  { source: '/placements/livrets-epargne', destination: '/placements/livrets', permanent: true },
  
  // Retraite restructuring
  { source: '/retraite/preparer-retraite-jeune', destination: '/retraite/preparer-jeune', permanent: true },
  { source: '/retraite/optimiser-retraite-cadre', destination: '/retraite/cadres', permanent: true },
  { source: '/retraite/cumul-emploi-retraite', destination: '/retraite/cumul-emploi', permanent: true },
  { source: '/retraite/calcul-retraite', destination: '/retraite/calcul', permanent: true },
  { source: '/retraite/plan-epargne-retraite', destination: '/retraite/per-individuel', permanent: true },
  { source: '/retraite/retraite-complementaire', destination: '/retraite/agirc-arrco', permanent: true },
  { source: '/retraite/reforme-retraites', destination: '/retraite/reforme', permanent: true },
  
  // Outils restructuring
  { source: '/outils/simulateur-impots', destination: '/outils/simulateur-ir', permanent: true },
  { source: '/outils/simulateur-retraite', destination: '/outils/simulateur-pension', permanent: true },
  { source: '/outils/calculateur-capacite-emprunt', destination: '/outils/capacite-emprunt', permanent: true },
  { source: '/outils/calculateur-frais-notaire', destination: '/outils/frais-notaire', permanent: true },
  
  // Patrimoine restructuring
  { source: '/patrimoine/holding-patrimoniale', destination: '/patrimoine/holding', permanent: true },
  { source: '/patrimoine/dementelement-propriete', destination: '/patrimoine/demembrement', permanent: true },
];

// SEO content to update in CMS
const seoUpdates = [
  {
    path: 'homepage',
    seo: {
      h1: 'Cabinet de Gestion de Patrimoine & Conseil Financier',
      metaTitle: 'Cabinet de Gestion de Patrimoine & Conseil Financier | Azalée',
      metaDescription: 'Cabinet expert en gestion de patrimoine. Optimisez votre fiscalité, préparez votre retraite et vos placements avec Azalée Patrimoine.'
    }
  },
  {
    path: 'patrimoine',
    seo: {
      h1: 'Conseil en Stratégie Patrimoniale & Audit Global',
      metaTitle: 'Stratégie Patrimoniale & Audit Global : Conseil Expert | Azalée',
      metaDescription: 'Audit patrimonial 360° et stratégie sur-mesure. Nos experts analysent vos actifs pour optimiser votre fiscalité et préparer votre transmission.'
    }
  },
  {
    path: 'fiscalite/pfu',
    seo: {
      h1: 'PFU ou prélèvement forfaitaire unique',
      metaTitle: 'PFU ou prélèvement forfaitaire unique | Azalée Patrimoine',
      metaDescription: 'Tout savoir sur le PFU (prélèvement forfaitaire unique). Azalée Patrimoine vous conseille pour optimiser votre fiscalité sur les revenus du capital.'
    }
  },
  {
    path: 'investissement-immobilier/sci',
    seo: {
      h1: 'SCI : outil de gestion et transmission patrimoniale',
      metaTitle: 'SCI : gestion et transmission de patrimoine | Azalée',
      metaDescription: 'La SCI est un outil puissant pour gérer et transmettre votre patrimoine immobilier. Découvrez nos conseils d\'experts pour créer et gérer votre SCI.'
    }
  },
  {
    path: 'investissement-immobilier/lmnp',
    seo: {
      h1: 'LMNP : loueur en meublé non professionnel',
      metaTitle: 'LMNP : statut et avantages fiscaux | Azalée Patrimoine',
      metaDescription: 'Le statut LMNP (loueur en meublé non professionnel) offre une fiscalité attractive. Azalée Patrimoine vous guide pour investir en location meublée.'
    }
  },
  {
    path: 'investissement-immobilier/plus-value-immobiliere',
    seo: {
      h1: 'Plus-value immobilière : fiscalité et calcul',
      metaTitle: 'Plus-value immobilière : fiscalité et calcul | Azalée',
      metaDescription: 'Comprendre la taxation des plus-values immobilières. Nos experts analysent pour vous les abattements et cas d\'exonération pour optimiser votre revente.'
    }
  },
  {
    path: 'investissement-immobilier/pinel',
    seo: {
      h1: 'Loi Pinel : défiscalisation immobilière',
      metaTitle: 'Loi Pinel : investir et réduire ses impôts | Azalée',
      metaDescription: 'Le dispositif Pinel permet de réduire vos impôts en investissant dans le neuf. Analyse des zones éligibles et rentabilité par nos experts.'
    }
  },
  {
    path: 'investissement-immobilier/malraux',
    seo: {
      h1: 'Loi Malraux : défiscalisation et patrimoine',
      metaTitle: 'Loi Malraux : défiscalisation et patrimoine | Azalée',
      metaDescription: 'Investissez dans l\'immobilier ancien réhabilité et bénéficiez d\'une forte réduction d\'impôt. Expertise sur les programmes éligibles loi Malraux.'
    }
  },
  {
    path: 'investissement-immobilier/scpi',
    seo: {
      h1: 'SCPI : la pierre-papier',
      metaTitle: 'SCPI : investir dans l\'immobilier locatif | Azalée',
      metaDescription: 'Investir en SCPI pour percevoir des revenus potentiels sans contrainte de gestion. Comparatif des meilleures SCPI de rendement et fiscales.'
    }
  },
  {
    path: 'placements/assurance-vie',
    seo: {
      h1: 'Assurance-vie : épargne et transmission',
      metaTitle: 'Assurance-vie : placement et fiscalité | Azalée Patrimoine',
      metaDescription: 'L\'assurance-vie reste le placement préféré des Français. Découvrez nos contrats performants et nos conseils pour optimiser votre épargne.'
    }
  },
  {
    path: 'placements/pea',
    seo: {
      h1: 'PEA : plan d\'épargne en actions',
      metaTitle: 'PEA : investir en bourse fiscalement | Azalée Patrimoine',
      metaDescription: 'Le PEA permet d\'investir sur les marchés européens avec une fiscalité douce. Nos conseils pour sélectionner les meilleurs fonds et titres.'
    }
  },
  {
    path: 'placements/compte-titres',
    seo: {
      h1: 'Compte-titres ordinaire (CTO)',
      metaTitle: 'Compte-titres : investir sans plafond | Azalée Patrimoine',
      metaDescription: 'Le compte-titres offre une flexibilité totale pour investir sur les marchés mondiaux. Découvrez nos solutions de gestion sous mandat ou conseillée.'
    }
  },
  {
    path: 'placements/private-equity',
    seo: {
      h1: 'Private equity : investir dans le non-coté',
      metaTitle: 'Private equity : investissement non-coté | Azalée',
      metaDescription: 'Diversifiez votre patrimoine en investissant dans l\'économie réelle. Accès exclusif à des fonds de private equity sélectionnés par Azalée.'
    }
  },
  {
    path: 'retraite/per',
    seo: {
      h1: 'PER (Plan Épargne Retraite)',
      metaTitle: 'PER (Plan Épargne Retraite) : fonctionnement | Azalée',
      metaDescription: 'Tout savoir sur le PER : déductibilité fiscale, sorties en capital ou rente. Optimisez votre effort d\'épargne avec Azalée Patrimoine.'
    }
  },
  {
    path: 'patrimoine/transmission',
    seo: {
      h1: 'Transmission de patrimoine et succession',
      metaTitle: 'Transmission de patrimoine : anticiper sa succession | Azalée',
      metaDescription: 'Préparez la transmission de votre patrimoine pour protéger vos proches. Solutions juridiques et fiscales sur-mesure avec Azalée Patrimoine.'
    }
  },
  {
    path: 'patrimoine/succession-heritage',
    seo: {
      h1: 'Comprendre les règles de succession',
      metaTitle: 'Succession et héritage : droits et fiscalité | Azalée',
      metaDescription: 'Droits de succession, héritiers réservataires, testament : nos experts vous éclairent pour gérer sereinement les étapes d\'un héritage.'
    }
  },
  {
    path: 'patrimoine/protection-famille',
    seo: {
      h1: 'Protection de la famille et prévoyance',
      metaTitle: 'Protection de la famille et prévoyance | Azalée Patrimoine',
      metaDescription: 'Assurez l\'avenir de votre conjoint et de vos enfants. Solutions de prévoyance et stratégies patrimoniales pour faire face aux aléas de la vie.'
    }
  },
  {
    path: 'patrimoine/bilan',
    seo: {
      h1: 'Bilan patrimonial : audit complet',
      metaTitle: 'Bilan patrimonial : audit et stratégie | Azalée Patrimoine',
      metaDescription: 'Première étape vers l\'optimisation : le bilan patrimonial. Nos experts analysent vos actifs, passifs et objectifs pour définir une stratégie.'
    }
  },
  {
    path: 'outils/simulations-generales',
    seo: {
      h1: 'Simulateurs et outils de gestion de patrimoine',
      metaTitle: 'Simulateurs gestion de patrimoine | Azalée Patrimoine',
      metaDescription: 'Accédez à nos outils de simulation pour évaluer vos impôts, votre capacité d\'emprunt ou préparer votre retraite. Des résultats immédiats et précis.'
    }
  },
  {
    path: 'contact',
    seo: {
      h1: 'Contactez Azalée Patrimoine',
      metaTitle: 'Contactez-nous : cabinet de gestion de patrimoine | Azalée',
      metaDescription: 'Prenez rendez-vous avec nos conseillers en gestion de patrimoine. Bureaux à Paris et accompagnement partout en France.'
    }
  },
  {
    path: 'qui-sommes-nous',
    seo: {
      h1: 'Qui sommes-nous ? Le cabinet Azalée',
      metaTitle: 'Qui sommes-nous ? Cabinet Azalée Patrimoine',
      metaDescription: 'Découvrez l\'équipe d\'Azalée Patrimoine. Des experts indépendants dédiés à la gestion et l\'optimisation de votre patrimoine depuis 20 ans.'
    }
  },
];

console.log('=== SEO Redirections Analysis ===\n');
console.log(`Total redirections to add: ${redirections.length}`);
console.log('\nRedirections by category:');

const categories = {};
redirections.forEach(r => {
  const cat = r.source.split('/')[1];
  categories[cat] = (categories[cat] || 0) + 1;
});
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count} redirections`);
});

console.log('\n=== SEO Content Updates ===\n');
console.log(`Total pages to update: ${seoUpdates.length}`);

// Output redirections in next.config.mjs format
console.log('\n=== Redirections for next.config.mjs ===\n');
redirections.forEach(r => {
  console.log(`{
  source: '${r.source}',
  destination: '${r.destination}',
  permanent: true,
},`);
});

// Export for use in other scripts
module.exports = { redirections, seoUpdates };

