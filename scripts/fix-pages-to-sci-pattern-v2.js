/**
 * Script v2 pour corriger automatiquement les pages vers le pattern SCI
 * - Supprime defaultContent
 * - Ajoute la gestion d'erreur complète
 * - Ajoute optional chaining pour content
 */

const fs = require('fs');
const path = require('path');

// Pages à corriger (celles avec getPageContent mais avec defaultContent)
const pagesToFix = [
  'src/app/fiscalite/autre-fiscalite/page.jsx',
  'src/app/fiscalite/defiscalisation-cas-specifiques/page.jsx',
  'src/app/fiscalite/fiscalite-placements/page.jsx',
  'src/app/fiscalite/loi-cosse/page.jsx',
  'src/app/fiscalite/loi-denormandie/page.jsx',
  'src/app/fiscalite/loi-girardin/page.jsx',
  'src/app/fiscalite/loi-malraux/page.jsx',
  'src/app/fiscalite/loi-pinel/page.jsx',
  'src/app/fiscalite/monument-historique/page.jsx',
  'src/app/fiscalite/pfu/page.jsx',
  'src/app/fiscalite/reductions-impot-deficit-foncier/page.jsx',
  'src/app/immobilier/investissement-immobilier-rentable/page.jsx',
  'src/app/patrimoine/autre/page.jsx',
  'src/app/patrimoine/conseils/page.jsx',
  'src/app/placements/assurance-vie/page.jsx',
  'src/app/placements/assurance-vie-luxembourg/page.jsx',
  'src/app/placements/autres/page.jsx',
  'src/app/placements/compte-titres/page.jsx',
  'src/app/placements/contrat-capitalisation/page.jsx',
  'src/app/placements/livret/page.jsx',
  'src/app/placements/produits-structures/page.jsx',
  'src/app/retraite/autre/page.jsx',
];

function extractCMSPath(content) {
  const match = content.match(/getPageContent\(['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

function fixPage(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const cmsPath = extractCMSPath(content);
  
  if (!cmsPath) {
    console.log(`⚠️  No CMS path found in: ${filePath}`);
    return false;
  }
  
  console.log(`🔧 Fixing: ${filePath} (CMS path: ${cmsPath})`);
  
  let modified = false;
  
  // 1. Remove defaultContent declaration (both const and export const)
  const defaultContentPatterns = [
    /\/\/ Default content[^\n]*\n(?:export )?const defaultContent = \{[\s\S]*?\n\};\n\n?/g,
    /(?:export )?const defaultContent = \{[\s\S]*?\n\};\n\n?/g,
  ];
  
  for (const pattern of defaultContentPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, '');
      modified = true;
      console.log(`   ✓ Removed defaultContent`);
      break;
    }
  }
  
  // 2. Add error handling after API fallback if not present
  const errorStateHTML = `
  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#253F60] to-[#B99066]">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-cairo font-bold mb-4">⚠️ Contenu non disponible</h1>
          <p className="text-xl mb-6">Cette page n'a pas encore été configurée dans le CMS.</p>
        </div>
      </div>
    );
  }`;
  
  // Check if error handling exists
  if (!content.includes('Contenu non disponible')) {
    // Find the return statement after the API fallback
    const returnPattern = /(\s*}\s*catch \(e\) \{\s*console\.error\('API fallback failed:', e\);\s*\}\s*\}\s*)\n\s*return \(/;
    if (returnPattern.test(content)) {
      content = content.replace(returnPattern, `$1\n${errorStateHTML}\n\n  return (`);
      modified = true;
      console.log(`   ✓ Added error handling`);
    }
  }
  
  // 3. Add optional chaining for content properties
  // Replace content.property with content?.property
  const propertyPatterns = [
    /\{content\.(\w+)\.(\w+)\}/g,
    /\{content\.(\w+)\}/g,
  ];
  
  // Replace content.property.subproperty with content?.property?.subproperty
  content = content.replace(/\{content\.(\w+)\.(\w+)\}/g, '{content?.$1?.$2}');
  content = content.replace(/\{content\.(\w+)\}/g, '{content?.$1}');
  
  // Also handle content.property?.items patterns
  content = content.replace(/content\.(\w+)\?\./g, 'content?.$1?.');
  
  // Handle || defaultContent.xxx fallbacks - remove them
  content = content.replace(/\s*\|\|\s*defaultContent\.\w+(?:\.\w+)*/g, '');
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`   ✅ Fixed!`);
    return true;
  } else {
    console.log(`   ⚠️  No changes needed or manual review required`);
    return false;
  }
}

function main() {
  console.log('🚀 Starting automatic page fixes (v2)...\n');
  
  let fixed = 0;
  let failed = 0;
  
  for (const page of pagesToFix) {
    if (fixPage(page)) {
      fixed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Results: ${fixed} fixed, ${failed} need manual review`);
  console.log('='.repeat(60));
}

main();

