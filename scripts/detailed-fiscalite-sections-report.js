// Detailed report of missing CMS sections in Fiscalité pages
const fs = require('fs');

const fiscalitePages = [
  'fiscalite',
  'fiscalite/declaration-impots',
  'fiscalite/impot-sur-le-revenu',
  'fiscalite/lois-fiscales',
  'fiscalite/fiscalite-placements',
  'fiscalite/pfu'
];

function extractHardcodedSections(content, pageName) {
  const sections = [];
  
  // Find hardcoded arrays/objects
  const arrayPattern = /const\s+(\w+)\s*=\s*\[[\s\S]{50,}?\];/g;
  let match;
  while ((match = arrayPattern.exec(content)) !== null) {
    const varName = match[1];
    // Skip if it's used with CMS
    if (!content.includes(`content.${varName}`) && !content.includes(`pageContent.${varName}`) && !content.includes(`data.${varName}`)) {
      sections.push({
        type: 'array',
        name: varName,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
  
  // Find hardcoded JSX text blocks (not using CMS)
  const lines = content.split('\n');
  const hardcodedTexts = [];
  lines.forEach((line, index) => {
    // Skip comments, imports, and CMS references
    if (line.trim().startsWith('//') || line.trim().startsWith('import') || line.includes('pageContent') || line.includes('content.') || line.includes('data.')) {
      return;
    }
    
    // Find text in JSX that's longer than 20 chars and not a fallback
    const textMatch = line.match(/>([^<{]{30,})</);
    if (textMatch && !line.includes('||') && !line.includes('?')) {
      hardcodedTexts.push({
        line: index + 1,
        text: textMatch[1].trim().substring(0, 60)
      });
    }
  });
  
  return { sections, hardcodedTexts };
}

console.log('📋 RAPPORT DÉTAILLÉ - Sections manquantes dans Fiscalité\n');
console.log('='.repeat(80));

fiscalitePages.forEach(pagePath => {
  const filePath = `src/app/${pagePath}/page.jsx`;
  
  if (!fs.existsSync(filePath)) {
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const pageName = pagePath.split('/').pop() || 'fiscalite';
  const { sections, hardcodedTexts } = extractHardcodedSections(content, pageName);
  
  console.log(`\n📄 ${pageName.toUpperCase()}`);
  console.log(`   Path: ${pagePath}`);
  
  if (sections.length > 0) {
    console.log(`\n   ⚠️  SECTIONS HARDCODÉES (${sections.length}):`);
    sections.forEach(section => {
      console.log(`      - ${section.name} (${section.type}, ligne ~${section.line})`);
    });
  }
  
  if (hardcodedTexts.length > 0) {
    console.log(`\n   ⚠️  TEXTES HARDCODÉS (${hardcodedTexts.length}):`);
    hardcodedTexts.slice(0, 10).forEach(item => {
      console.log(`      Ligne ${item.line}: "${item.text}..."`);
    });
    if (hardcodedTexts.length > 10) {
      console.log(`      ... et ${hardcodedTexts.length - 10} autres textes hardcodés`);
    }
  }
  
  if (sections.length === 0 && hardcodedTexts.length === 0) {
    console.log(`   ✅ Toutes les sections sont éditables via CMS`);
  }
});

// Specific analysis for problematic pages
console.log(`\n\n${'='.repeat(80)}`);
console.log(`🔍 ANALYSE DÉTAILLÉE DES PAGES PROBLÉMATIQUES\n`);

// declaration-impots
const declContent = fs.readFileSync('src/app/fiscalite/declaration-impots/page.jsx', 'utf8');
console.log(`📄 declaration-impots:`);
console.log(`   Sections hardcodées identifiées:`);
console.log(`   - declarationSteps (array, ~ligne 104)`);
console.log(`   - calendarData (array, ~ligne 131)`);
console.log(`   - commonErrors (array, ~ligne 150)`);
console.log(`   - Tous les textes dans les cartes (lignes 204-224, etc.)`);
console.log(`   - Contenu des onglets (lignes 250-587)`);

// impot-sur-le-revenu
const irContent = fs.readFileSync('src/app/fiscalite/impot-sur-le-revenu/page.jsx', 'utf8');
console.log(`\n📄 impot-sur-le-revenu:`);
console.log(`   Sections hardcodées identifiées:`);
console.log(`   - Tous les textes dans les cartes stats (lignes 151-168)`);
console.log(`   - Section "Les 10 meilleurs dispositifs" (lignes 186-400+)`);
console.log(`   - Tous les textes des blocs dispositifs (Pinel, Déficit foncier, etc.)`);
console.log(`   - Section sommaire et contenu détaillé`);

console.log(`\n\n💡 RECOMMANDATIONS:`);
console.log(`   1. Ajouter ces sections au CMS:`);
console.log(`      - declaration-impots: declarationSteps, calendarData, commonErrors, tabContent`);
console.log(`      - impot-sur-le-revenu: dispositifs, stats, sommaire, content`);
console.log(`   2. Remplacer tous les textes hardcodés par des références CMS`);
console.log(`   3. Utiliser pageContent.sectionName || defaultContent.sectionName pour fallback`);

