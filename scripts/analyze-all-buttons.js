// Script to analyze all buttons and links in the project
const fs = require('fs');
const path = require('path');

const results = {
  buttons: [],
  links: [],
  calendlyLinks: [],
  internalLinks: [],
  externalLinks: [],
  anchors: []
};

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'out', 'build', '.git'].includes(file)) {
        scanDirectory(filePath, fileList);
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Extract buttons with onClick router.push
  const buttonOnClickRegex = /<button[^>]*onClick\s*=\s*{?[^}]*?push\(['"`]([^'"`]+)['"`]\)/g;
  let match;
  while ((match = buttonOnClickRegex.exec(content)) !== null) {
    results.buttons.push({
      file: relativePath,
      type: 'button-onClick-router',
      destination: match[1],
      line: content.substring(0, match.index).split('\n').length
    });
  }
  
  // Extract buttons with window.open
  const buttonWindowOpenRegex = /<button[^>]*onClick\s*=\s*{?[^}]*?window\.open\(['"`]([^'"`]+)['"`]/g;
  while ((match = buttonWindowOpenRegex.exec(content)) !== null) {
    results.buttons.push({
      file: relativePath,
      type: 'button-onClick-window.open',
      destination: match[1],
      line: content.substring(0, match.index).split('\n').length
    });
    if (match[1].includes('calendly')) {
      results.calendlyLinks.push({
        file: relativePath,
        destination: match[1],
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
  
  // Extract Link components
  const linkRegex = /<Link[^>]*href\s*=\s*{?['"`]([^'"`]+)['"`]/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const dest = match[1];
    results.links.push({
      file: relativePath,
      type: 'Link',
      destination: dest,
      line: content.substring(0, match.index).split('\n').length
    });
    
    if (dest.startsWith('/') || dest.startsWith('#')) {
      results.internalLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
    } else if (dest.startsWith('http')) {
      results.externalLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
      if (dest.includes('calendly')) {
        results.calendlyLinks.push({
          file: relativePath,
          destination: dest,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }
  }
  
  // Extract anchor tags
  const anchorRegex = /<a[^>]*href\s*=\s*{?['"`]([^'"`]+)['"`]/g;
  while ((match = anchorRegex.exec(content)) !== null) {
    const dest = match[1];
    results.anchors.push({
      file: relativePath,
      type: 'anchor',
      destination: dest,
      line: content.substring(0, match.index).split('\n').length
    });
    
    if (dest.startsWith('/') || dest.startsWith('#')) {
      results.internalLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
    } else if (dest.startsWith('http')) {
      results.externalLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
      if (dest.includes('calendly')) {
        results.calendlyLinks.push({
          file: relativePath,
          destination: dest,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }
  }
  
  // Extract CTAButton components with externalUrl
  const ctaButtonRegex = /<CTAButton[^>]*externalUrl\s*=\s*{?['"`]([^'"`]+)['"`]/g;
  while ((match = ctaButtonRegex.exec(content)) !== null) {
    const dest = match[1];
    results.buttons.push({
      file: relativePath,
      type: 'CTAButton-externalUrl',
      destination: dest,
      line: content.substring(0, match.index).split('\n').length
    });
    if (dest.includes('calendly')) {
      results.calendlyLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
  
  // Extract CTAButton components with href
  const ctaButtonHrefRegex = /<CTAButton[^>]*href\s*=\s*{?['"`]([^'"`]+)['"`]/g;
  while ((match = ctaButtonHrefRegex.exec(content)) !== null) {
    const dest = match[1];
    results.buttons.push({
      file: relativePath,
      type: 'CTAButton-href',
      destination: dest,
      line: content.substring(0, match.index).split('\n').length
    });
    if (dest.startsWith('/')) {
      results.internalLinks.push({
        file: relativePath,
        destination: dest,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
}

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
const files = scanDirectory(srcDir);

console.log(`📊 Analyzing ${files.length} files...\n`);

files.forEach(file => {
  try {
    analyzeFile(file);
  } catch (error) {
    console.error(`Error analyzing ${file}:`, error.message);
  }
});

// Generate report
console.log('='.repeat(80));
console.log('📋 RAPPORT COMPLET DES BOUTONS ET LIENS');
console.log('='.repeat(80));

// Group by destination
const destinationMap = {};

[...results.buttons, ...results.links, ...results.anchors].forEach(item => {
  const dest = item.destination;
  if (!destinationMap[dest]) {
    destinationMap[dest] = [];
  }
  destinationMap[dest].push({
    file: item.file,
    type: item.type,
    line: item.line
  });
});

// Sort destinations
const sortedDestinations = Object.keys(destinationMap).sort();

console.log('\n📌 BOUTONS ET LIENS PAR DESTINATION:\n');
sortedDestinations.forEach(dest => {
  const items = destinationMap[dest];
  console.log(`\n🔗 ${dest}`);
  console.log(`   Utilisé ${items.length} fois:`);
  items.forEach(item => {
    console.log(`   - ${item.type} dans ${item.file}:${item.line}`);
  });
});

// Summary
console.log('\n\n' + '='.repeat(80));
console.log('📊 RÉSUMÉ');
console.log('='.repeat(80));
console.log(`\nTotal boutons: ${results.buttons.length}`);
console.log(`Total liens (Link): ${results.links.length}`);
console.log(`Total ancres (<a>): ${results.anchors.length}`);
console.log(`Total liens internes: ${results.internalLinks.length}`);
console.log(`Total liens externes: ${results.externalLinks.length}`);
console.log(`Total liens Calendly: ${results.calendlyLinks.length}`);

// Calendly links summary
const calendlyUrls = [...new Set(results.calendlyLinks.map(l => l.destination))];
console.log(`\n📅 Liens Calendly uniques: ${calendlyUrls.length}`);
calendlyUrls.forEach(url => {
  const count = results.calendlyLinks.filter(l => l.destination === url).length;
  console.log(`   - ${url} (${count} fois)`);
});

// Internal links summary
const internalPaths = [...new Set(results.internalLinks.map(l => l.destination))].filter(p => p.startsWith('/'));
console.log(`\n🏠 Pages internes référencées: ${internalPaths.length}`);
internalPaths.sort().forEach(path => {
  const count = results.internalLinks.filter(l => l.destination === path).length;
  console.log(`   - ${path} (${count} fois)`);
});

// Save to file
const reportPath = path.join(process.cwd(), 'BUTTONS_ANALYSIS_REPORT.md');
const reportContent = `# Analyse Complète des Boutons et Liens

Généré le: ${new Date().toISOString()}

## Résumé

- Total boutons: ${results.buttons.length}
- Total liens (Link): ${results.links.length}
- Total ancres (<a>): ${results.anchors.length}
- Total liens internes: ${results.internalLinks.length}
- Total liens externes: ${results.externalLinks.length}
- Total liens Calendly: ${results.calendlyLinks.length}

## Boutons et Liens par Destination

${sortedDestinations.map(dest => {
  const items = destinationMap[dest];
  return `### ${dest}\n\nUtilisé ${items.length} fois:\n\n${items.map(item => `- **${item.type}** dans \`${item.file}:${item.line}\``).join('\n')}`;
}).join('\n\n')}

## Liens Calendly

${calendlyUrls.map(url => {
  const count = results.calendlyLinks.filter(l => l.destination === url).length;
  const items = results.calendlyLinks.filter(l => l.destination === url);
  return `### ${url}\n\nUtilisé ${count} fois:\n\n${items.map(item => `- \`${item.file}:${item.line}\``).join('\n')}`;
}).join('\n\n')}

## Pages Internes Référencées

${internalPaths.map(p => {
  const count = results.internalLinks.filter(l => l.destination === p).length;
  const items = results.internalLinks.filter(l => l.destination === p);
  return `### ${p}\n\nUtilisé ${count} fois:\n\n${items.map(item => `- **${item.type}** dans \`${item.file}:${item.line}\``).join('\n')}`;
}).join('\n\n')}
`;

fs.writeFileSync(reportPath, reportContent, 'utf8');
console.log(`\n✅ Rapport sauvegardé dans: ${reportPath}`);

