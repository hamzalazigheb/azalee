// Check migration status of Fiscalité pages
const fs = require('fs');

const fiscalitePages = [
  'fiscalite/autre-fiscalite',
  'fiscalite/declaration-impots',
  'fiscalite/defiscalisation-cas-specifiques',
  'fiscalite/fiscalite-placements',
  'fiscalite/impot-sur-le-revenu',
  'fiscalite/loi-cosse',
  'fiscalite/loi-denormandie',
  'fiscalite/loi-girardin',
  'fiscalite/loi-malraux',
  'fiscalite/loi-pinel',
  'fiscalite/lois-fiscales',
  'fiscalite/monument-historique',
  'fiscalite/pfu',
  'fiscalite/reductions-impot-deficit-foncier',
  'fiscalite/tmi-prelevements-sociaux',
  'fiscalite/tranches-baremes-plafonds'
];

console.log('📊 Status de migration des pages Fiscalité:\n');

const status = {
  ssr: [], // Utilise getPageContent (SSR - déjà migré)
  csr: [], // Utilise /api/cms/content (CSR - déjà migré)
  hardcode: [] // Utilise setContent(defaultContent) (hardcodé - à migrer)
};

fiscalitePages.forEach(pagePath => {
  const filePath = `src/app/${pagePath}/page.jsx`;
  
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const hasSSR = content.includes('getPageContent');
  const hasCSR = content.includes('/api/cms/content');
  const hasHardcode = content.includes('setContent(defaultContent)') && !hasCSR;
  
  if (hasSSR) {
    status.ssr.push(pagePath);
    console.log(`✅ ${pagePath} - SSR (getPageContent)`);
  } else if (hasCSR) {
    status.csr.push(pagePath);
    console.log(`✅ ${pagePath} - CSR (/api/cms/content)`);
  } else if (hasHardcode) {
    status.hardcode.push(pagePath);
    console.log(`⚠️  ${pagePath} - HARDCODÉ (à migrer)`);
  } else {
    console.log(`❓ ${pagePath} - Statut inconnu`);
  }
});

console.log(`\n\n📊 RÉSUMÉ:`);
console.log(`✅ SSR (getPageContent): ${status.ssr.length} pages`);
console.log(`✅ CSR (/api/cms/content): ${status.csr.length} pages`);
console.log(`⚠️  Hardcodé: ${status.hardcode.length} pages`);

if (status.hardcode.length > 0) {
  console.log(`\n\n⚠️  Pages à migrer:`);
  status.hardcode.forEach(p => console.log(`   - ${p}`));
}

