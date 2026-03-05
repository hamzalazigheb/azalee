/**
 * Script de vérification complète : Toutes les pages publiques doivent utiliser le CMS
 * Vérifie :
 * 1. Si la page utilise le CMS (fetch ou getPageContent)
 * 2. Si la page a du contenu hardcodé (defaultContent)
 * 3. Si la page a une entrée CMS correspondante dans MongoDB
 * 4. Si le contenu CMS est réel (non vide)
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Dossiers à ignorer
const IGNORE_DIRS = [
  'admin',
  'api',
  'auth',
  'login',
  'register',
  'dashboard',
  'espace-client',
  'rdv',
  'confirmation',
  'calendly'
];

// Pages spéciales (non CMS)
const SPECIAL_PAGES = [
  'not-found',
  'error',
  'loading',
  'layout',
  'global-error',
  'sitemap'
];

async function getAllPublicPages(dir, basePath = '') {
  const pages = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Ignorer les dossiers spéciaux
      if (IGNORE_DIRS.includes(item) || item.startsWith('_') || item.startsWith('.')) {
        continue;
      }
      
      const subPages = await getAllPublicPages(fullPath, path.join(basePath, item));
      pages.push(...subPages);
    } else if (item === 'page.jsx' || item === 'page.tsx') {
      const pagePath = basePath || '/';
      pages.push({
        filePath: fullPath,
        urlPath: pagePath.replace(/\\/g, '/'),
        cmsPath: pagePath.replace(/\\/g, '/').replace(/^\//, '') || 'homepage'
      });
    }
  }

  return pages;
}

function analyzePageFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const analysis = {
    usesCMS: false,
    hasDefaultContent: false,
    usesGetPageContent: false,
    usesFetchCMS: false,
    hardcodedStrings: [],
    cmsPath: null
  };

  // Check for CMS usage patterns
  if (content.includes('getPageContent') || content.includes('fetchContent')) {
    analysis.usesCMS = true;
    analysis.usesGetPageContent = true;
  }
  
  if (content.includes('/api/cms/content') || content.includes("api/cms")) {
    analysis.usesCMS = true;
    analysis.usesFetchCMS = true;
  }

  // Check for defaultContent
  if (content.includes('defaultContent')) {
    analysis.hasDefaultContent = true;
  }

  // Extract CMS path if present
  const pathMatch = content.match(/getPageContent\(['"]([^'"]+)['"]\)|path:\s*['"]([^'"]+)['"]/);
  if (pathMatch) {
    analysis.cmsPath = pathMatch[1] || pathMatch[2];
  }

  // Check for hardcoded content patterns
  const hardcodedPatterns = [
    /title:\s*['"][^'"]{20,}['"]/g,
    /description:\s*['"][^'"]{50,}['"]/g,
    /text:\s*['"][^'"]{100,}['"]/g
  ];

  for (const pattern of hardcodedPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      analysis.hardcodedStrings.push(...matches.slice(0, 3));
    }
  }

  return analysis;
}

async function main() {
  console.log('🔍 Vérification des pages publiques et du contenu CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const appDir = path.join(process.cwd(), 'src', 'app');
    const publicPages = await getAllPublicPages(appDir);

    console.log(`📄 ${publicPages.length} pages publiques trouvées\n`);

    // Get all CMS entries
    const cmsEntries = await PageContent.find({});
    const cmsPathsSet = new Set(cmsEntries.map(e => e.path));

    const results = {
      withCMS: [],
      withoutCMS: [],
      withDefaultContent: [],
      missingCMSEntry: [],
      emptyCMSContent: []
    };

    for (const page of publicPages) {
      const analysis = analyzePageFile(page.filePath);
      
      const pageInfo = {
        url: page.urlPath || '/',
        file: page.filePath.replace(process.cwd(), ''),
        cmsPath: analysis.cmsPath || page.cmsPath,
        ...analysis
      };

      if (analysis.usesCMS) {
        results.withCMS.push(pageInfo);
      } else {
        results.withoutCMS.push(pageInfo);
      }

      if (analysis.hasDefaultContent) {
        results.withDefaultContent.push(pageInfo);
      }

      // Check if CMS entry exists
      const expectedCmsPath = analysis.cmsPath || page.cmsPath;
      if (!cmsPathsSet.has(expectedCmsPath) && !cmsPathsSet.has(page.urlPath.replace(/^\//, ''))) {
        results.missingCMSEntry.push(pageInfo);
      }

      // Check for empty CMS content
      const cmsEntry = cmsEntries.find(e => e.path === expectedCmsPath || e.path === page.urlPath.replace(/^\//, ''));
      if (cmsEntry && (!cmsEntry.content || Object.keys(cmsEntry.content).length === 0)) {
        results.emptyCMSContent.push(pageInfo);
      }
    }

    // Print results
    console.log('=' .repeat(80));
    console.log('📊 RAPPORT DE VÉRIFICATION');
    console.log('=' .repeat(80));

    console.log(`\n✅ Pages utilisant le CMS: ${results.withCMS.length}`);
    
    console.log(`\n⚠️  Pages SANS intégration CMS: ${results.withoutCMS.length}`);
    if (results.withoutCMS.length > 0) {
      results.withoutCMS.forEach(p => {
        console.log(`   - ${p.url} (${p.file})`);
      });
    }

    console.log(`\n⚠️  Pages avec defaultContent (hardcodé): ${results.withDefaultContent.length}`);
    if (results.withDefaultContent.length > 0) {
      results.withDefaultContent.forEach(p => {
        console.log(`   - ${p.url}`);
      });
    }

    console.log(`\n❌ Pages sans entrée CMS dans MongoDB: ${results.missingCMSEntry.length}`);
    if (results.missingCMSEntry.length > 0) {
      results.missingCMSEntry.forEach(p => {
        console.log(`   - ${p.url} (attendu: ${p.cmsPath})`);
      });
    }

    console.log(`\n❌ Entrées CMS avec contenu vide: ${results.emptyCMSContent.length}`);
    if (results.emptyCMSContent.length > 0) {
      results.emptyCMSContent.forEach(p => {
        console.log(`   - ${p.url}`);
      });
    }

    // Summary
    console.log('\n' + '=' .repeat(80));
    console.log('📋 RÉSUMÉ');
    console.log('=' .repeat(80));
    
    const totalIssues = results.withoutCMS.length + results.missingCMSEntry.length + results.emptyCMSContent.length;
    
    if (totalIssues === 0) {
      console.log('\n✅ Toutes les pages sont correctement intégrées au CMS !');
    } else {
      console.log(`\n⚠️  ${totalIssues} problèmes à corriger`);
    }

    // Generate fix script paths
    if (results.missingCMSEntry.length > 0) {
      console.log('\n📝 Pages nécessitant une initialisation CMS:');
      results.missingCMSEntry.forEach(p => {
        console.log(`   ${p.cmsPath}`);
      });
    }

    await mongoose.disconnect();
    console.log('\n✅ Déconnecté de MongoDB');

    return results;

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

