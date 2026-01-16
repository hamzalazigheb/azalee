/**
 * Script de test des liens uniques
 * Vérifie que les boutons/liens ne mènent pas vers la même destination de manière redondante
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Couleurs pour le terminal
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
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

function extractLinks(content, filePath) {
  const links = [];
  
  // Extract href links
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push({
      type: 'href',
      url: match[1],
      file: filePath
    });
  }
  
  // Extract window.open links
  const windowOpenRegex = /window\.open\(['"]([^'"]+)['"]/g;
  while ((match = windowOpenRegex.exec(content)) !== null) {
    links.push({
      type: 'window.open',
      url: match[1],
      file: filePath
    });
  }
  
  // Extract Link component to props
  const linkToRegex = /<Link[^>]*to=["']([^"']+)["']/g;
  while ((match = linkToRegex.exec(content)) !== null) {
    links.push({
      type: 'Link',
      url: match[1],
      file: filePath
    });
  }
  
  return links;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const links = extractLinks(content, filePath);
  const relativePath = path.relative(SRC_DIR, filePath);
  
  // Group links by URL within this file
  const urlCounts = {};
  links.forEach(link => {
    const url = link.url;
    if (!urlCounts[url]) {
      urlCounts[url] = 0;
    }
    urlCounts[url]++;
  });
  
  // Find duplicates (same URL appearing more than 3 times in same file)
  const duplicates = [];
  Object.entries(urlCounts).forEach(([url, count]) => {
    // Ignore internal anchors and common patterns
    if (url.startsWith('#') || url === '/' || url === '') return;
    
    if (count > 3) {
      duplicates.push({
        url,
        count,
        file: relativePath
      });
    }
  });
  
  return {
    totalLinks: links.length,
    duplicates,
    relativePath
  };
}

function main() {
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}   TEST DES LIENS UNIQUES - Azalée Patrimoine${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

  const files = findJsxFiles(SRC_DIR);
  const allDuplicates = [];
  let totalLinks = 0;

  files.forEach(file => {
    const analysis = analyzeFile(file);
    totalLinks += analysis.totalLinks;
    
    if (analysis.duplicates.length > 0) {
      allDuplicates.push(...analysis.duplicates);
    }
  });

  console.log(`${colors.cyan}📊 Statistiques:${colors.reset}`);
  console.log(`   └─ Fichiers analysés: ${files.length}`);
  console.log(`   └─ Total liens trouvés: ${totalLinks}\n`);

  if (allDuplicates.length === 0) {
    console.log(`${colors.green}✅ Aucun lien dupliqué excessif détecté!${colors.reset}\n`);
    return;
  }

  console.log(`${colors.yellow}⚠️  ${allDuplicates.length} lien(s) dupliqué(s) détecté(s)${colors.reset}\n`);

  // Group by URL
  const groupedByUrl = {};
  allDuplicates.forEach(dup => {
    if (!groupedByUrl[dup.url]) {
      groupedByUrl[dup.url] = [];
    }
    groupedByUrl[dup.url].push(dup);
  });

  Object.entries(groupedByUrl).forEach(([url, occurrences]) => {
    console.log(`${colors.blue}───────────────────────────────────────────────────────────────${colors.reset}`);
    console.log(`${colors.yellow}🔗 ${url}${colors.reset}`);
    
    occurrences.forEach(occ => {
      const color = occ.count > 5 ? colors.red : colors.yellow;
      console.log(`   └─ ${color}${occ.count}x${colors.reset} dans ${occ.file}`);
    });
  });

  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`\n${colors.yellow}💡 Recommandations:${colors.reset}`);
  console.log(`   1. Gardez un seul CTA principal par section`);
  console.log(`   2. Utilisez des ancres différentes pour différentes sections`);
  console.log(`   3. Variez les liens Calendly si plusieurs rendez-vous types existent`);
  console.log(`   4. Utilisez des composants réutilisables avec props pour les liens\n`);
  
  // Exit with error if critical duplicates found
  const criticalDuplicates = allDuplicates.filter(d => d.count > 5);
  if (criticalDuplicates.length > 0) {
    console.log(`${colors.red}❌ ${criticalDuplicates.length} liens critiquement dupliqués (>5x)${colors.reset}\n`);
    process.exit(1);
  }
}

main();

