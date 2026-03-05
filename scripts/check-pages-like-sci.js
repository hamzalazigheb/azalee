/**
 * Script de vérification : Toutes les pages utilisant le CMS comme la page SCI
 * Vérifie :
 * 1. Si la page utilise getPageContent
 * 2. Si elle suit le pattern SCI (SSR + API fallback + pas de defaultContent)
 * 3. Si elle a une entrée CMS dans MongoDB
 * 4. Si le contenu CMS existe et n'est pas vide
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Pattern SCI : SSR + API fallback + pas de defaultContent
function checkSCIPattern(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const checks = {
    usesGetPageContent: /getPageContent/.test(content),
    isSSR: /export\s+default\s+async\s+function/.test(content),
    hasAPIFallback: /api\/cms\/pages\?path=/.test(content),
    hasNoDefaultContent: !/const\s+defaultContent\s*=\s*\{/.test(content),
    hasErrorState: /Contenu non disponible|notFound\(\)/.test(content),
    usesRevalidate: /export\s+const\s+revalidate\s*=/.test(content)
  };
  
  // Calculer le score de conformité
  const score = Object.values(checks).filter(Boolean).length;
  const isLikeSCI = checks.usesGetPageContent && 
                    checks.isSSR && 
                    checks.hasAPIFallback && 
                    checks.hasNoDefaultContent &&
                    checks.hasErrorState;
  
  return {
    ...checks,
    score,
    isLikeSCI,
    needsFix: !isLikeSCI && checks.usesGetPageContent
  };
}

async function getAllPagesWithCMS() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const pages = [];
  
  function walkDir(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (item.startsWith('_') || item.startsWith('.') || 
            ['admin', 'api', 'auth', 'login', 'register'].includes(item)) {
          continue;
        }
        walkDir(fullPath, path.join(basePath, item));
      } else if (item === 'page.jsx' || item === 'page.tsx') {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        if (/getPageContent/.test(fileContent)) {
          const urlPath = basePath.replace(/\\/g, '/') || '/';
          const cmsPath = urlPath.replace(/^\//, '') || 'homepage';
          
          pages.push({
            filePath: fullPath,
            urlPath,
            cmsPath,
            ...checkSCIPattern(fullPath)
          });
        }
      }
    }
  }
  
  walkDir(appDir);
  return pages;
}

async function main() {
  try {
    console.log('🔍 Vérification de toutes les pages CMS (pattern SCI)...\n');
    
    // Connexion MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI non trouvé dans .env.local');
      process.exit(1);
    }
    
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');
    
    // Récupérer toutes les pages CMS
    const pages = await getAllPagesWithCMS();
    console.log(`📄 ${pages.length} pages utilisant getPageContent trouvées\n`);
    
    // Récupérer toutes les entrées CMS
    const cmsEntries = await PageContent.find({});
    const cmsPathsSet = new Set(cmsEntries.map(e => e.path ? e.path.toLowerCase() : '').filter(Boolean));
    const cmsEntriesMap = new Map();
    cmsEntries.forEach(e => {
      if (e.path) {
        cmsEntriesMap.set(e.path.toLowerCase(), e);
      }
    });
    
    // Catégoriser les pages
    const results = {
      likeSCI: [],           // Conformes au pattern SCI
      needsFix: [],          // Utilisent CMS mais pas comme SCI
      missingCMS: [],       // Pas d'entrée dans MongoDB
      hasCMS: [],           // Ont une entrée CMS
      emptyCMS: []          // Ont une entrée CMS mais contenu vide
    };
    
    for (const page of pages) {
      // Vérifier si existe dans MongoDB
      const cmsEntry = cmsEntriesMap.get(page.cmsPath.toLowerCase());
      const hasCMS = !!cmsEntry;
      const hasContent = hasCMS && cmsEntry.content && Object.keys(cmsEntry.content).length > 0;
      
      if (page.isLikeSCI) {
        results.likeSCI.push({ ...page, hasCMS, hasContent });
        if (hasCMS) {
          results.hasCMS.push(page.cmsPath);
          if (!hasContent) {
            results.emptyCMS.push(page.cmsPath);
          }
        } else {
          results.missingCMS.push(page.cmsPath);
        }
      } else if (page.needsFix) {
        results.needsFix.push({ ...page, hasCMS, hasContent });
      }
    }
    
    // Afficher les résultats
    console.log('='.repeat(80));
    console.log('📊 RAPPORT DE VÉRIFICATION');
    console.log('='.repeat(80));
    console.log('');
    
    // Pages conformes au pattern SCI
    console.log(`✅ Pages conformes au pattern SCI: ${results.likeSCI.length}`);
    if (results.likeSCI.length > 0) {
      results.likeSCI.forEach(page => {
        let status = '✅';
        let details = [];
        if (!page.hasCMS) {
          status = '⚠️';
          details.push('Manque dans MongoDB');
        } else if (!page.hasContent) {
          status = '⚠️';
          details.push('Contenu vide');
        }
        console.log(`   ${status} ${page.cmsPath}`);
        if (details.length > 0) {
          console.log(`      → ${details.join(', ')}`);
        }
      });
    }
    console.log('');
    
    // Pages à corriger
    console.log(`⚠️  Pages à corriger (utilisent CMS mais pas comme SCI): ${results.needsFix.length}`);
    if (results.needsFix.length > 0) {
      results.needsFix.forEach(page => {
        console.log(`   ${page.cmsPath}`);
        const issues = [];
        if (!page.isSSR) issues.push('Pas SSR');
        if (!page.hasAPIFallback) issues.push('Pas de fallback API');
        if (!page.hasNoDefaultContent) issues.push('A du defaultContent');
        if (!page.hasErrorState) issues.push('Pas de gestion d\'erreur');
        console.log(`      → Problèmes: ${issues.join(', ')}`);
        console.log(`      → Score: ${page.score}/6`);
      });
    }
    console.log('');
    
    // Pages manquantes dans MongoDB
    console.log(`❌ Pages conformes SCI mais manquantes dans MongoDB: ${results.missingCMS.length}`);
    if (results.missingCMS.length > 0) {
      results.missingCMS.forEach(path => {
        console.log(`   - ${path}`);
      });
    }
    console.log('');
    
    // Pages avec contenu vide
    console.log(`⚠️  Pages avec contenu CMS vide: ${results.emptyCMS.length}`);
    if (results.emptyCMS.length > 0) {
      results.emptyCMS.forEach(path => {
        console.log(`   - ${path}`);
      });
    }
    console.log('');
    
    // Statistiques
    console.log('📈 Statistiques:');
    console.log(`   - Total pages CMS: ${pages.length}`);
    console.log(`   - Conformes SCI: ${results.likeSCI.length} (${Math.round(results.likeSCI.length / pages.length * 100)}%)`);
    console.log(`   - À corriger: ${results.needsFix.length}`);
    console.log(`   - Avec contenu MongoDB: ${results.hasCMS.length}`);
    console.log(`   - Sans contenu MongoDB: ${results.missingCMS.length}`);
    console.log(`   - Contenu vide: ${results.emptyCMS.length}`);
    console.log('');
    
    await mongoose.disconnect();
    console.log('✅ Déconnecté de MongoDB\n');
    console.log('✨ Vérification terminée !\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();

