/**
 * Script pour initialiser toutes les pages CMS vides avec leur defaultContent
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
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Function to extract defaultContent from a page file
function extractDefaultContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the defaultContent object (multiple patterns)
    // Pattern 1: const defaultContent = {...}
    let match = content.match(/const\s+defaultContent\s*=\s*(\{[\s\S]*?\});?\s*(?:export|function|const|useEffect|$)/m);
    
    if (!match) {
      // Pattern 2: export const defaultContent = {...}
      match = content.match(/export\s+const\s+defaultContent\s*=\s*(\{[\s\S]*?\});?\s*(?:export|function|const|useEffect|$)/m);
    }
    
    if (!match) {
      // Pattern 3: Inside component function (client components)
      // Look for const defaultContent = {...} inside function body
      match = content.match(/(?:function\s+\w+|export\s+default\s+function\s+\w+)[\s\S]*?const\s+defaultContent\s*=\s*(\{[\s\S]*?\});/m);
    }
    
    if (!match) {
      return null;
    }
    
    let objectStr = match[1];
    
    // Try to find the closing brace properly (handle nested objects)
    let braceCount = 0;
    let endIndex = 0;
    for (let i = 0; i < objectStr.length; i++) {
      if (objectStr[i] === '{') braceCount++;
      if (objectStr[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
    }
    
    if (endIndex > 0) {
      objectStr = objectStr.substring(0, endIndex);
    }
    
    objectStr = objectStr.replace(/;\s*$/, '');
    
    try {
      const fn = new Function(`return ${objectStr}`);
      const result = fn();
      // Validate it's an object
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        return result;
      }
      return null;
    } catch (evalError) {
      return null;
    }
  } catch (error) {
    return null;
  }
}

// Function to find all page.jsx files
function findAllPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findAllPageFiles(filePath, fileList);
    } else if (file === 'page.jsx' || file === 'page.js') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Convert file path to CMS path
function filePathToCMSPath(filePath) {
  // Remove src/app/ prefix and /page.jsx suffix
  let cmsPath = filePath
    .replace(/\\/g, '/')
    .replace(/^.*\/src\/app\//, '')
    .replace(/\/page\.(jsx|js)$/, '');
  
  // Handle homepage
  if (cmsPath === '' || cmsPath === 'page') {
    return 'accueil';
  }
  
  return cmsPath;
}

async function initAllEmptyPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const collection = mongoose.connection.db.collection('pagecontents');
    
    // Find all empty pages
    const allPages = await collection.find({}).toArray();
    const emptyPages = allPages.filter(p => !p.content || Object.keys(p.content).length === 0);
    
    console.log(`📊 Pages vides trouvées: ${emptyPages.length}\n`);

    // Find all page.jsx files
    const appDir = path.join(process.cwd(), 'src/app');
    const pageFiles = findAllPageFiles(appDir);
    
    console.log(`📁 Fichiers page.jsx trouvés: ${pageFiles.length}\n`);

    let initialized = 0;
    let skipped = 0;
    let notFound = 0;

    for (const emptyPage of emptyPages) {
      // Find corresponding page.jsx file
      const matchingFile = pageFiles.find(file => {
        const cmsPath = filePathToCMSPath(file);
        return cmsPath === emptyPage.path;
      });

      if (!matchingFile) {
        console.log(`  ⚠️  Pas de fichier trouvé pour: ${emptyPage.path}`);
        notFound++;
        continue;
      }

      const defaultContent = extractDefaultContent(matchingFile);
      
      if (!defaultContent || Object.keys(defaultContent).length === 0) {
        console.log(`  ⏭️  Pas de defaultContent pour: ${emptyPage.path}`);
        skipped++;
        continue;
      }

      // Update page with defaultContent
      await collection.updateOne(
        { _id: emptyPage._id },
        { 
          $set: { 
            content: defaultContent,
            updatedAt: new Date()
          } 
        }
      );

      const sections = Object.keys(defaultContent);
      console.log(`  ✅ Initialisé: ${emptyPage.path} (${sections.length} sections)`);
      initialized++;
    }

    console.log(`\n✅ INITIALISATION TERMINÉE!`);
    console.log(`   Pages initialisées: ${initialized}`);
    console.log(`   Pages ignorées: ${skipped}`);
    console.log(`   Pages non trouvées: ${notFound}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initAllEmptyPages();

