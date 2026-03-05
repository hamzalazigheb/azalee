const fs = require('fs');
const path = require('path');

// Pages réelles existantes dans le codebase
const existingPages = [
  '',  // Homepage
  'accueil',
  'conditions-generales',
  'contact',
  'equipe',
  'espace-client',
  'mentions-legales',
  'nos-courtiers',
  'notre-approche',
  'qui-sommes-nous',
  'politique-confidentialite',
  
  // Fiscalité
  'fiscalite',
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
  'fiscalite/tranches-baremes-plafonds',
  
  // Immobilier
  'immobilier',
  'immobilier/credit-immobilier-ptz',
  'immobilier/faire-construire',
  'immobilier/immeubles-de-rapport',
  'immobilier/immobilier-neuf',
  'immobilier/investissement-immobilier-rentable',
  'immobilier/investissement-locatif',
  'immobilier/lmnp',
  'immobilier/lmnp-2025',
  'immobilier/plus-value-immobiliere',
  'immobilier/robien',
  'immobilier/scellier',
  'immobilier/sci',
  'immobilier/vefa',
  
  // Outils
  'outils/autres',
  'outils/calculatrice-impots',
  'outils/calculs-financiers',
  'outils/guides-pratiques',
  'outils/simulateur-investissement',
  'outils/simulations-generales',
  
  // Outils-financiers
  'outils-financiers',
  'outils-financiers/assurance-vie-vs-per',
  'outils-financiers/guide-defiscalisation',
  
  // Patrimoine
  'patrimoine',
  'patrimoine/autre',
  'patrimoine/bilan',
  'patrimoine/conseils',
  'patrimoine/donation-gratuite',
  'patrimoine/donation-onereuse',
  'patrimoine/protection-famille',
  'patrimoine/succession-heritage',
  'patrimoine/transmission',
  
  // Placements
  'placements',
  'placements/assurance-vie',
  'placements/assurance-vie-luxembourg',
  'placements/autres',
  'placements/bourse-actions',
  'placements/compte-titres',
  'placements/contrat-capitalisation',
  'placements/etf-produits-financiers',
  'placements/livret',
  'placements/pea-per',
  'placements/scpi-opci',
  'placements/taux-interets',
  
  // Retraite
  'retraite',
  'retraite/autre',
  'retraite/plan-retraite',
  'retraite/prevoyance-protection',
  'retraite/rachat-trimestres',
  'retraite/retraite-progressive',
  'retraite/simulation',
];

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Skip header (line 0)
  const redirects = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Parse CSV line with quoted fields - improved regex
    const regex = /"([^"]*)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      matches.push(match[1]);
    }
    
    // Need at least "URL Actuelle" (0) and "Nouvelle URL" (4)
    if (matches.length >= 5 && matches[0] && matches[4]) {
      let currentUrl = matches[0].replace('https://www.azalee-patrimoine.fr', '').trim();
      let newUrl = matches[4].replace('https://www.azalee-patrimoine.fr', '').trim();
      
      // Skip empty URLs or non-URL content
      if (!currentUrl || !newUrl || !currentUrl.startsWith('/') || !newUrl.startsWith('/')) {
        continue;
      }
      
      // Normalize: remove trailing slashes for comparison
      const currentPath = currentUrl.replace(/\/$/, '');
      const newPath = newUrl.replace(/\/$/, '');
      
      // Skip if URLs are the same
      if (currentPath === newPath) {
        continue;
      }
      
      redirects.push({
        line: i + 1,
        source: currentPath,
        destination: newPath,
        currentUrl,
        newUrl
      });
    }
  }
  
  return redirects;
}

function findBestMatch(path, existingPages) {
  // Remove leading slash
  const cleanPath = path.replace(/^\//, '').replace(/\/$/, '');
  
  // Exact match
  if (existingPages.includes(cleanPath)) {
    return { found: true, page: cleanPath, type: 'exact' };
  }
  
  // Try with trailing slash variations
  const variations = [
    cleanPath,
    cleanPath + '/',
    cleanPath.replace(/\/$/, '')
  ];
  
  for (const variant of variations) {
    if (existingPages.includes(variant)) {
      return { found: true, page: variant, type: 'variant' };
    }
  }
  
  // Try parent page
  const parts = cleanPath.split('/');
  if (parts.length > 1) {
    parts.pop();
    const parentPath = parts.join('/');
    if (existingPages.includes(parentPath)) {
      return { found: true, page: parentPath, type: 'parent' };
    }
  }
  
  return { found: false, page: null, type: 'none' };
}

// Parse CSV
console.log('📊 Analyse du fichier CSV...\n');
const csvPath = path.join(__dirname, '..', 'Feedback-URL-v2.csv');
const redirects = parseCSV(csvPath);

console.log(`Total de lignes dans le CSV : ${redirects.length + 1}`);
console.log(`Redirections nécessaires : ${redirects.length}\n`);

// Analyze redirects
const validRedirects = [];
const missingPages = [];

console.log('🔍 Vérification des pages...\n');

redirects.forEach(redirect => {
  // Check if destination exists
  const destMatch = findBestMatch(redirect.destination, existingPages);
  
  // Check if source exists (maybe we need to reverse the redirect)
  const sourceMatch = findBestMatch(redirect.source, existingPages);
  
  if (destMatch.found) {
    // Normal case: redirect source to existing destination
    validRedirects.push({
      ...redirect,
      finalSource: redirect.source,
      finalDestination: '/' + destMatch.page,
      matchType: destMatch.type,
      reversed: false
    });
  } else if (sourceMatch.found) {
    // Reversed case: the CSV wants to redirect from existing page to non-existing page
    // We'll create the opposite redirect: from new URL to existing page
    validRedirects.push({
      ...redirect,
      finalSource: redirect.destination,
      finalDestination: '/' + sourceMatch.page,
      matchType: sourceMatch.type,
      reversed: true
    });
  } else {
    missingPages.push({
      ...redirect,
      reason: 'Ni source ni destination n\'existent dans le codebase'
    });
  }
});

// Generate statistics
console.log('═══════════════════════════════════════════════════════════');
console.log('📈 STATISTIQUES');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`✅ Redirections valides : ${validRedirects.length}/${redirects.length} (${Math.round(validRedirects.length / redirects.length * 100)}%)`);
console.log(`❌ URLs sans page : ${missingPages.length}/${redirects.length} (${Math.round(missingPages.length / redirects.length * 100)}%)\n`);

// Group valid redirects by category
const categories = {
  immobilier: [],
  fiscalite: [],
  placements: [],
  retraite: [],
  outils: [],
  patrimoine: [],
  autres: []
};

validRedirects.forEach(redirect => {
  const source = redirect.finalSource;
  const dest = redirect.finalDestination;
  
  // Categorize by destination
  if (dest.includes('/immobilier') || dest.includes('/investissement-immobilier') || source.includes('/immobilier') || source.includes('/investissement-immobilier')) {
    categories.immobilier.push(redirect);
  } else if (dest.includes('/fiscalite') || source.includes('/fiscalite')) {
    categories.fiscalite.push(redirect);
  } else if (dest.includes('/placements') || source.includes('/placements')) {
    categories.placements.push(redirect);
  } else if (dest.includes('/retraite') || source.includes('/retraite')) {
    categories.retraite.push(redirect);
  } else if (dest.includes('/outils') || source.includes('/outils')) {
    categories.outils.push(redirect);
  } else if (dest.includes('/patrimoine') || source.includes('/patrimoine')) {
    categories.patrimoine.push(redirect);
  } else {
    categories.autres.push(redirect);
  }
});

console.log('📦 Redirections par catégorie :');
Object.entries(categories).forEach(([cat, items]) => {
  if (items.length > 0) {
    console.log(`   ${cat} : ${items.length}`);
  }
});

// Write valid redirects to file
console.log('\n📝 Génération du fichier de redirections...\n');

let output = `// ==================== REDIRECTIONS SEO - Générées depuis Feedback-URL-v2.csv ====================\n`;
output += `// Total: ${validRedirects.length} redirections valides\n`;
output += `// Couverture: ${Math.round(validRedirects.length / redirects.length * 100)}%\n\n`;

Object.entries(categories).forEach(([catName, items]) => {
  if (items.length > 0) {
    output += `// ==================== ${catName.toUpperCase()} (${items.length}) ====================\n`;
    items.forEach(redirect => {
      if (redirect.reversed) {
        output += `// Inversé: CSV demandait ${redirect.source} → ${redirect.destination} mais seul ${redirect.finalDestination} existe\n`;
      }
      output += `{\n`;
      output += `  source: '${redirect.finalSource}',\n`;
      output += `  destination: '${redirect.finalDestination}',\n`;
      output += `  permanent: true,\n`;
      output += `},\n`;
    });
    output += `\n`;
  }
});

fs.writeFileSync(
  path.join(__dirname, 'redirects-output.txt'),
  output
);

console.log('✅ Fichier généré : scripts/redirects-output.txt\n');

// Write missing pages to file
console.log('📝 Génération de la liste des URLs sans page...\n');

let missingOutput = `# URLs du CSV sans page correspondante\n\n`;
missingOutput += `Total: ${missingPages.length} URLs\n\n`;
missingOutput += `| Ligne | URL Source | URL Destination Demandée | Raison |\n`;
missingOutput += `|-------|------------|---------------------------|--------|\n`;

missingPages.forEach(page => {
  missingOutput += `| ${page.line} | ${page.source} | ${page.destination} | ${page.reason} |\n`;
});

fs.writeFileSync(
  path.join(__dirname, 'missing-pages.md'),
  missingOutput
);

console.log('✅ Fichier généré : scripts/missing-pages.md\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('🎯 RÉSUMÉ');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`✅ ${validRedirects.length} redirections prêtes à être ajoutées`);
console.log(`❌ ${missingPages.length} URLs nécessitent la création de pages\n`);

console.log('📋 Actions suivantes :');
console.log('   1. Vérifier scripts/redirects-output.txt');
console.log('   2. Copier les redirections dans next.config.mjs');
console.log('   3. Consulter scripts/missing-pages.md pour les URLs sans page\n');

