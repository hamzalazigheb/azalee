// Check migration status of ALL pages
const fs = require('fs');
const path = require('path');

const categories = {
  fiscalite: [
    'fiscalite/autre-fiscalite', 'fiscalite/declaration-impots', 'fiscalite/defiscalisation-cas-specifiques',
    'fiscalite/fiscalite-placements', 'fiscalite/impot-sur-le-revenu', 'fiscalite/loi-cosse',
    'fiscalite/loi-denormandie', 'fiscalite/loi-girardin', 'fiscalite/loi-malraux',
    'fiscalite/loi-pinel', 'fiscalite/lois-fiscales', 'fiscalite/monument-historique',
    'fiscalite/pfu', 'fiscalite/reductions-impot-deficit-foncier',
    'fiscalite/tmi-prelevements-sociaux', 'fiscalite/tranches-baremes-plafonds'
  ],
  immobilier: [
    'immobilier/credit-immobilier-ptz', 'immobilier/faire-construire', 'immobilier/immeubles-de-rapport',
    'immobilier/immobilier-neuf', 'immobilier/investissement-immobilier-rentable',
    'immobilier/investissement-locatif', 'immobilier/lmnp', 'immobilier/lmnp-2025',
    'immobilier/plus-value-immobiliere', 'immobilier/robien', 'immobilier/scellier',
    'immobilier/sci', 'immobilier/vefa', 'Investissement-immobilier'
  ],
  retraite: [
    'retraite/autre', 'retraite/plan-retraite', 'retraite/prevoyance-protection',
    'retraite/rachat-trimestres', 'retraite/retraite-progressive', 'retraite/simulation'
  ],
  patrimoine: [
    'patrimoine/autre', 'patrimoine/conseils', 'patrimoine/donation-gratuite',
    'patrimoine/donation-onereuse'
  ],
  placements: [
    'placements/assurance-vie-luxembourg', 'placements/autres', 'placements/compte-titres',
    'placements/livret', 'placements/produits-structures'
  ]
};

function checkPage(pagePath) {
  const filePath = `src/app/${pagePath}/page.jsx`;
  
  if (!fs.existsSync(filePath)) {
    return { status: 'not-found' };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const hasSSR = content.includes('getPageContent');
  const hasCSR = content.includes('/api/cms/content');
  const hasHardcode = (content.includes('setContent(defaultContent)') || 
                       content.includes('const defaultContent') && !hasSSR && !hasCSR);
  const hasListener = content.includes('cmsContentUpdated');
  
  if (hasSSR) {
    return { status: 'ssr', hasListener: false }; // SSR doesn't need listener
  } else if (hasCSR) {
    return { status: 'csr', hasListener };
  } else if (hasHardcode) {
    return { status: 'hardcode', hasListener: false };
  }
  
  return { status: 'unknown' };
}

console.log('📊 Status de migration de toutes les pages:\n');

const summary = {
  fiscalite: { ssr: 0, csr: 0, hardcode: 0, csrWithoutListener: 0 },
  immobilier: { ssr: 0, csr: 0, hardcode: 0, csrWithoutListener: 0 },
  retraite: { ssr: 0, csr: 0, hardcode: 0, csrWithoutListener: 0 },
  patrimoine: { ssr: 0, csr: 0, hardcode: 0, csrWithoutListener: 0 },
  placements: { ssr: 0, csr: 0, hardcode: 0, csrWithoutListener: 0 }
};

Object.keys(categories).forEach(category => {
  console.log(`\n📁 ${category.toUpperCase()}:`);
  const pages = categories[category];
  
  pages.forEach(pagePath => {
    const result = checkPage(pagePath);
    const pageName = pagePath.split('/').pop();
    
    if (result.status === 'ssr') {
      summary[category].ssr++;
      console.log(`  ✅ ${pageName} - SSR`);
    } else if (result.status === 'csr') {
      summary[category].csr++;
      if (!result.hasListener) {
        summary[category].csrWithoutListener++;
        console.log(`  ⚠️  ${pageName} - CSR (sans listener)`);
      } else {
        console.log(`  ✅ ${pageName} - CSR (avec listener)`);
      }
    } else if (result.status === 'hardcode') {
      summary[category].hardcode++;
      console.log(`  ❌ ${pageName} - HARDCODÉ`);
    } else {
      console.log(`  ❓ ${pageName} - Inconnu`);
    }
  });
});

console.log(`\n\n📊 RÉSUMÉ PAR CATÉGORIE:\n`);
Object.keys(summary).forEach(category => {
  const s = summary[category];
  console.log(`${category.toUpperCase()}:`);
  console.log(`  ✅ SSR: ${s.ssr}`);
  console.log(`  ✅ CSR: ${s.csr} (${s.csrWithoutListener} sans listener)`);
  console.log(`  ❌ Hardcodé: ${s.hardcode}`);
  console.log('');
});

