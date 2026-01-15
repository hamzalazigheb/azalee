export default function sitemap() {
  const baseUrl = 'https://azalee-patrimoine.fr';

  const routes = [
    '',
    '/patrimoine',
    '/placements',
    '/fiscalite',
    '/immobilier',
    '/retraite',
    '/contact',
    '/qui-sommes-nous',
    '/equipe',
    '/notre-approche',
    '/outils/simulateur-investissement',

    // Fiscalite subpages
    '/fiscalite/loi-pinel',
    '/fiscalite/loi-malraux',
    '/fiscalite/loi-denormandie',
    '/fiscalite/loi-girardin',
    '/fiscalite/loi-cosse',
    '/fiscalite/monument-historique',
    '/fiscalite/impot-sur-le-revenu',
    '/fiscalite/declaration-impots',
    '/fiscalite/reductions-impot-deficit-foncier',
    '/fiscalite/fiscalite-placements',
    '/fiscalite/pfu',
    '/fiscalite/tmi-prelevements-sociaux',
    '/fiscalite/tranches-baremes-plafonds',
    '/fiscalite/lois-fiscales',
    '/fiscalite/autre-fiscalite',
    '/fiscalite/defiscalisation-cas-specifiques',

    // Immobilier subpages
    '/immobilier/lmnp',
    '/immobilier/sci',
    '/immobilier/vefa',
    '/immobilier/immobilier-neuf',
    '/immobilier/investissement-locatif',
    '/immobilier/credit-immobilier-ptz',
    '/immobilier/faire-construire',
    '/immobilier/scellier',
    '/immobilier/robien',
    '/immobilier/plus-value-immobiliere',
    '/immobilier/immeubles-de-rapport',
    '/immobilier/investissement-immobilier-rentable',
    '/immobilier/lmnp-2025',

    // Placements subpages
    '/placements/assurance-vie',
    '/placements/scpi',
    '/placements/per-perp',
    '/placements/pea',
    '/placements/private-equity',
    '/placements/livrets-epargne',
    '/placements/contrats-capitalisation',
    '/placements/investissements-alternatifs',
    '/placements/bourse-actions',
    '/placements/obligations-fonds',
    '/placements/epargne-salariale',
    '/placements/placements-securises',

    // Patrimoine subpages
    '/patrimoine/succession-heritage',
    '/patrimoine/donation',
    '/patrimoine/demembrement-propriete',
    '/patrimoine/protection-famille',
    '/patrimoine/bilan-patrimonial',
    '/patrimoine/conseiller-patrimoine',
    '/patrimoine/droits-succession',
    '/patrimoine/optimisation-patrimoine',

    // Retraite subpages
    '/retraite/preparer-retraite',
    '/retraite/per-perp',
    '/retraite/complement-retraite',
    '/retraite/prevoyance',
    '/retraite/calcul-pension',
    '/retraite/rachat-trimestres',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('/') && route.split('/').length === 2 ? 0.8 : 0.6,
  }));
}


