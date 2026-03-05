/**
 * Script to verify that public pages display CMS content correctly
 * Tests actual page rendering by checking for key content elements
 */

const http = require('http');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function verifyPublicPages() {
  console.log('🌐 Verifying public pages display CMS content...\n');

  const pages = [
    { path: 'immobilier/immobilier-neuf', keyContent: 'Immobilier neuf' },
    { path: 'immobilier/lmnp', keyContent: 'LMNP' },
    { path: 'immobilier/vefa', keyContent: 'VEFA' },
    { path: 'immobilier/sci', keyContent: 'SCI' },
    { path: 'immobilier/scellier', keyContent: 'Pinel' },
    { path: 'immobilier/investissement-locatif', keyContent: 'Investissement locatif' },
    { path: 'immobilier/faire-construire', keyContent: 'Faire construire' },
    { path: 'immobilier/credit-immobilier-ptz', keyContent: 'Crédit immobilier' },
    { path: 'immobilier/plus-value-immobiliere', keyContent: 'Plus-value' },
    { path: 'immobilier/immeubles-de-rapport', keyContent: 'Immeubles de rapport' },
  ];

  const results = {
    accessible: [],
    notAccessible: [],
    noContent: []
  };

  for (const page of pages) {
    try {
      const url = `http://localhost:4028/${page.path}`;
      console.log(`🔍 Checking ${page.path}...`);
      
      const html = await fetchHTML(url);
      
      if (html.includes('404') || html.includes('Not Found')) {
        results.notAccessible.push(page.path);
        console.log(`   ❌ Page not found (404)`);
      } else if (html.includes(page.keyContent)) {
        results.accessible.push(page.path);
        console.log(`   ✅ Page accessible and contains key content: "${page.keyContent}"`);
      } else {
        results.noContent.push(page.path);
        console.log(`   ⚠️  Page accessible but key content not found: "${page.keyContent}"`);
      }
    } catch (error) {
      results.notAccessible.push(page.path);
      console.log(`   ❌ Error accessing page: ${error.message}`);
    }
    console.log('');
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   ✅ Accessible with content: ${results.accessible.length} pages`);
  console.log(`   ⚠️  Accessible but no content: ${results.noContent.length} pages`);
  console.log(`   ❌ Not accessible: ${results.notAccessible.length} pages`);

  if (results.accessible.length === pages.length) {
    console.log('\n✅ All pages are accessible and display content correctly!');
    process.exit(0);
  } else {
    if (results.notAccessible.length > 0) {
      console.log('\n❌ Pages not accessible:');
      results.notAccessible.forEach(p => console.log(`   - ${p}`));
    }
    if (results.noContent.length > 0) {
      console.log('\n⚠️  Pages accessible but missing content:');
      results.noContent.forEach(p => console.log(`   - ${p}`));
    }
    process.exit(1);
  }
}

verifyPublicPages();


