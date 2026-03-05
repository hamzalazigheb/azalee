/**
 * Script d'audit de l'imbrication DOM
 * Identifie les fichiers avec trop de divs imbriquées
 */
const fs = require('fs');
const path = require('path');

const MAX_NESTING = 5; // Maximum recommandé de niveaux de div
const SRC_DIR = path.join(__dirname, '..', 'src');

// Couleurs pour le terminal
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function findJsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.includes('node_modules')) {
      findJsxFiles(fullPath, files);
    } else if (item.endsWith('.jsx') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function analyzeNesting(content, filePath) {
  const lines = content.split('\n');
  let maxDepth = 0;
  let currentDepth = 0;
  let maxDepthLine = 0;
  const deepNestingLocations = [];

  lines.forEach((line, index) => {
    // Count opening div tags
    const opens = (line.match(/<div/gi) || []).length;
    // Count closing div tags
    const closes = (line.match(/<\/div>/gi) || []).length;
    
    currentDepth += opens;
    
    if (currentDepth > maxDepth) {
      maxDepth = currentDepth;
      maxDepthLine = index + 1;
    }
    
    if (currentDepth > MAX_NESTING) {
      deepNestingLocations.push({
        line: index + 1,
        depth: currentDepth,
        content: line.trim().substring(0, 80)
      });
    }
    
    currentDepth -= closes;
  });

  return {
    maxDepth,
    maxDepthLine,
    deepNestingLocations,
    relativePath: path.relative(SRC_DIR, filePath)
  };
}

function countSectionDivs(content) {
  // Count <section> followed by <div> patterns
  const sectionDivPattern = /<section[^>]*>\s*<div/gi;
  const matches = content.match(sectionDivPattern) || [];
  return matches.length;
}

function main() {
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   AUDIT DOM NESTING - Azalée Patrimoine${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

  const files = findJsxFiles(SRC_DIR);
  const results = [];
  let totalIssues = 0;

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const analysis = analyzeNesting(content, file);
    const sectionDivCount = countSectionDivs(content);
    
    if (analysis.maxDepth > MAX_NESTING || sectionDivCount > 3) {
      results.push({
        ...analysis,
        sectionDivCount
      });
      totalIssues++;
    }
  });

  // Sort by max depth (descending)
  results.sort((a, b) => b.maxDepth - a.maxDepth);

  if (results.length === 0) {
    console.log(`${colors.green}✅ Aucun problème d'imbrication détecté!${colors.reset}\n`);
    return;
  }

  console.log(`${colors.yellow}⚠️  ${totalIssues} fichier(s) avec imbrication excessive détectée(s)${colors.reset}\n`);
  console.log(`Seuil maximum recommandé: ${MAX_NESTING} niveaux de <div>\n`);

  results.forEach((result, index) => {
    const color = result.maxDepth > MAX_NESTING + 2 ? colors.red : colors.yellow;
    
    console.log(`${colors.blue}───────────────────────────────────────────────────────────────${colors.reset}`);
    console.log(`${color}📁 ${result.relativePath}${colors.reset}`);
    console.log(`   └─ Profondeur max: ${color}${result.maxDepth}${colors.reset} (ligne ${result.maxDepthLine})`);
    
    if (result.sectionDivCount > 0) {
      console.log(`   └─ Patterns <section><div>: ${result.sectionDivCount}`);
    }
    
    if (result.deepNestingLocations.length > 0 && result.deepNestingLocations.length <= 5) {
      console.log(`   └─ Localisations problématiques:`);
      result.deepNestingLocations.slice(0, 3).forEach(loc => {
        console.log(`      • Ligne ${loc.line}: profondeur ${loc.depth}`);
      });
    }
  });

  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`\n${colors.yellow}💡 Recommandations:${colors.reset}`);
  console.log(`   1. Fusionnez les classes CSS sur les balises parentes`);
  console.log(`   2. Utilisez flex/grid directement sur <section>`);
  console.log(`   3. Évitez <section><div><div> - préférez <section className="...">`);
  console.log(`   4. Utilisez les balises sémantiques (article, nav, aside)\n`);
}

main();

