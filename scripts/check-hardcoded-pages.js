// Script to check which pages use hardcoded content instead of CMS
// Run with: node scripts/check-hardcoded-pages.js

const fs = require('fs');
const path = require('path');

const pagesWithCMS = [];
const pagesWithHardcode = [];
const pagesWithBoth = [];
const pagesWithoutContent = [];

function checkPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = filePath.replace(/\\/g, '/').replace('src/app/', '');
  
  // Skip admin pages
  if (relativePath.includes('admin/')) {
    return;
  }
  
  // Skip layout files
  if (relativePath.includes('layout.jsx') || relativePath.includes('layout.js')) {
    return;
  }
  
  // Skip API routes
  if (relativePath.includes('api/')) {
    return;
  }
  
  const hasCMS = content.includes('/api/cms/content');
  const hasDefaultContent = /defaultContent\s*=|const\s+\w+Content\s*=\s*\{|const\s+\w+\s*=\s*\{[\s\S]{200,}/.test(content);
  const hasLargeObject = /const\s+\w+\s*=\s*\{[\s\S]{500,}/.test(content);
  const hasStaticContent = content.includes('setContent(defaultContent)') || 
                          content.includes('setContent({') ||
                          (hasDefaultContent && !hasCMS);
  
  const pageInfo = {
    path: relativePath,
    hasCMS,
    hasDefaultContent: hasDefaultContent || hasLargeObject,
    hasStaticContent,
    lineCount: content.split('\n').length
  };
  
  if (hasCMS && hasDefaultContent) {
    pagesWithBoth.push(pageInfo);
  } else if (hasCMS) {
    pagesWithCMS.push(pageInfo);
  } else if (hasDefaultContent || hasStaticContent) {
    pagesWithHardcode.push(pageInfo);
  } else {
    pagesWithoutContent.push(pageInfo);
  }
}

function findPages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules') {
          findPages(fullPath);
        }
      } else if (file === 'page.jsx' || file === 'page.js') {
        checkPage(fullPath);
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
}

console.log('🔍 Scanning pages for hardcoded content...\n');
findPages('src/app');

console.log(`\n📊 SUMMARY:\n`);
console.log(`✅ Pages using CMS: ${pagesWithCMS.length}`);
console.log(`⚠️  Pages with HARDCODED content (no CMS): ${pagesWithHardcode.length}`);
console.log(`🔄 Pages with BOTH (CMS + fallback): ${pagesWithBoth.length}`);
console.log(`📄 Pages without content: ${pagesWithoutContent.length}`);

console.log(`\n\n⚠️  PAGES WITH HARDCODED CONTENT (${pagesWithHardcode.length}):\n`);
pagesWithHardcode.forEach((page, index) => {
  console.log(`${index + 1}. ${page.path}`);
  console.log(`   Lines: ${page.lineCount}`);
});

console.log(`\n\n✅ PAGES USING CMS (${pagesWithCMS.length}):\n`);
pagesWithCMS.forEach((page, index) => {
  console.log(`${index + 1}. ${page.path}`);
});

console.log(`\n\n🔄 PAGES WITH BOTH (${pagesWithBoth.length}):\n`);
pagesWithBoth.forEach((page, index) => {
  console.log(`${index + 1}. ${page.path}`);
});

// Save to file
const report = {
  summary: {
    total: pagesWithCMS.length + pagesWithHardcode.length + pagesWithBoth.length + pagesWithoutContent.length,
    withCMS: pagesWithCMS.length,
    withHardcode: pagesWithHardcode.length,
    withBoth: pagesWithBoth.length,
    withoutContent: pagesWithoutContent.length
  },
  hardcoded: pagesWithHardcode,
  withCMS: pagesWithCMS,
  withBoth: pagesWithBoth
};

fs.writeFileSync('hardcoded-pages-report.json', JSON.stringify(report, null, 2));
console.log(`\n\n📄 Full report saved to: hardcoded-pages-report.json`);

