// Script to audit if ALL content in Fiscalité pages is editable via CMS
// Checks if every section, every word can be changed through CMS

const fs = require('fs');
const path = require('path');

const fiscalitePages = [
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
  'fiscalite/tranches-baremes-plafonds'
];

function findHardcodedStrings(content, filePath) {
  const issues = [];
  
  // Patterns to detect hardcoded content
  const patterns = [
    // Hardcoded text in JSX (not using pageContent or content)
    /(?:<h[1-6]|title|p|span|div|li)[^>]*>([^<{]+)<\/(?:h[1-6]|title|p|span|div|li)>/g,
    // Hardcoded strings in JSX attributes
    /(?:alt|title|placeholder|aria-label)="([^"]{20,})"/g,
    // Hardcoded arrays/lists
    /\["([^"]{20,})"\]/g,
    // Hardcoded object properties with long text
    /(?:title|description|text|content|subtitle|label):\s*"([^"]{30,})"/g,
  ];
  
  // Check for hardcoded fallback values (these are OK if they have CMS fallback)
  const fallbackPattern = /pageContent\.\w+|content\.\w+|data\.\w+/;
  
  // Find all text nodes that don't use CMS
  const lines = content.split('\n');
  lines.forEach((line, lineNum) => {
    // Skip comments and imports
    if (line.trim().startsWith('//') || line.trim().startsWith('import') || line.trim().startsWith('export')) {
      return;
    }
    
    // Check for hardcoded text in JSX that's not using CMS
    if (line.includes('>') && !line.includes('pageContent') && !line.includes('content.') && !line.includes('data.')) {
      // Extract text between tags
      const textMatch = line.match(/>([^<{]+)</);
      if (textMatch && textMatch[1].trim().length > 10 && !textMatch[1].includes('className') && !textMatch[1].includes('{')) {
        // Check if it's not a fallback (has || operator)
        if (!line.includes('||') && !line.includes('?')) {
          issues.push({
            type: 'hardcoded-text',
            line: lineNum + 1,
            text: textMatch[1].trim().substring(0, 50),
            fullLine: line.trim()
          });
        }
      }
    }
  });
  
  return issues;
}

function analyzePage(pagePath) {
  const filePath = `src/app/${pagePath}/page.jsx`;
  
  if (!fs.existsSync(filePath)) {
    return { exists: false };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const pageName = pagePath.split('/').pop();
  
  // Check CMS integration
  const hasSSR = content.includes('getPageContent');
  const hasCSR = content.includes('/api/cms/content');
  const usesCMS = hasSSR || hasCSR;
  
  // Find all sections used
  const cmsSections = [];
  const cmsPattern = /(?:pageContent|content|data)\.(\w+)/g;
  let match;
  while ((match = cmsPattern.exec(content)) !== null) {
    if (!cmsSections.includes(match[1])) {
      cmsSections.push(match[1]);
    }
  }
  
  // Find hardcoded strings
  const hardcodedIssues = findHardcodedStrings(content, filePath);
  
  // Check for defaultContent usage (fallback is OK)
  const hasDefaultContent = content.includes('defaultContent');
  const usesDefaultAsFallback = content.includes('|| defaultContent') || content.includes('|| defaultContent.');
  
  // Count CMS usage vs hardcoded
  const cmsUsageCount = (content.match(/pageContent\.|content\.|data\./g) || []).length;
  const hardcodedCount = hardcodedIssues.length;
  
  return {
    exists: true,
    pageName,
    usesCMS,
    hasSSR,
    hasCSR,
    cmsSections: cmsSections.sort(),
    hardcodedIssues,
    hasDefaultContent,
    usesDefaultAsFallback,
    cmsUsageCount,
    hardcodedCount,
    cmsRatio: cmsUsageCount / (cmsUsageCount + hardcodedCount) || 0
  };
}

console.log('🔍 Audit complet des pages Fiscalité - Éditabilité CMS\n');
console.log('='.repeat(80));

const results = {};
let totalIssues = 0;

fiscalitePages.forEach(pagePath => {
  const result = analyzePage(pagePath);
  results[pagePath] = result;
  
  if (!result.exists) {
    console.log(`\n❌ ${pagePath} - Fichier non trouvé`);
    return;
  }
  
  console.log(`\n📄 ${result.pageName || pagePath}`);
  console.log(`   CMS: ${result.usesCMS ? '✅' : '❌'} ${result.hasSSR ? '(SSR)' : result.hasCSR ? '(CSR)' : 'NON'}`);
  console.log(`   Sections CMS: ${result.cmsSections.length} (${result.cmsSections.join(', ')})`);
  console.log(`   Utilisation CMS: ${result.cmsUsageCount} références`);
  console.log(`   Contenu hardcodé: ${result.hardcodedIssues.length} problèmes`);
  console.log(`   Ratio CMS: ${(result.cmsRatio * 100).toFixed(1)}%`);
  
  if (result.hardcodedIssues.length > 0) {
    console.log(`   ⚠️  Problèmes détectés:`);
    result.hardcodedIssues.slice(0, 5).forEach(issue => {
      console.log(`      Ligne ${issue.line}: ${issue.text}...`);
    });
    if (result.hardcodedIssues.length > 5) {
      console.log(`      ... et ${result.hardcodedIssues.length - 5} autres`);
    }
    totalIssues += result.hardcodedIssues.length;
  }
});

console.log(`\n\n${'='.repeat(80)}`);
console.log(`📊 RÉSUMÉ GLOBAL:\n`);

const stats = {
  total: fiscalitePages.length,
  withCMS: 0,
  withoutCMS: 0,
  totalSections: 0,
  totalIssues: 0,
  pagesWithIssues: 0
};

Object.values(results).forEach(result => {
  if (result.exists) {
    if (result.usesCMS) stats.withCMS++;
    else stats.withoutCMS++;
    stats.totalSections += result.cmsSections.length;
    stats.totalIssues += result.hardcodedIssues.length;
    if (result.hardcodedIssues.length > 0) stats.pagesWithIssues++;
  }
});

console.log(`✅ Pages avec CMS: ${stats.withCMS}/${stats.total}`);
console.log(`❌ Pages sans CMS: ${stats.withoutCMS}/${stats.total}`);
console.log(`📋 Sections CMS totales: ${stats.totalSections}`);
console.log(`⚠️  Problèmes hardcodés: ${stats.totalIssues}`);
console.log(`📄 Pages avec problèmes: ${stats.pagesWithIssues}/${stats.total}`);

// Generate detailed report
const report = {
  summary: stats,
  pages: results
};

fs.writeFileSync('fiscalite-cms-audit-report.json', JSON.stringify(report, null, 2));
console.log(`\n📄 Rapport détaillé sauvegardé: fiscalite-cms-audit-report.json`);

