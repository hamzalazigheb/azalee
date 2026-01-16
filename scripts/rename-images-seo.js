/**
 * Script pour renommer les images avec des noms SEO-friendly
 * 
 * Ce script:
 * 1. Parcourt le dossier public/images
 * 2. Renomme les fichiers avec le préfixe "azalee-patrimoine-"
 * 3. Remplace les espaces par des tirets
 * 4. Met tout en minuscules
 * 5. Met à jour les références dans le code
 * 
 * Usage: node scripts/rename-images-seo.js --dry-run (pour voir les changements sans les appliquer)
 *        node scripts/rename-images-seo.js (pour appliquer les changements)
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SRC_DIR = path.join(__dirname, '..', 'src');
const DRY_RUN = process.argv.includes('--dry-run');

// Préfixe SEO à ajouter
const SEO_PREFIX = 'azalee-patrimoine-';

// Extensions d'images à traiter
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

// Extensions de fichiers source à mettre à jour
const SOURCE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'];

function sanitizeFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  let name = path.basename(filename, ext);
  
  // Déjà préfixé? Ne pas modifier
  if (name.toLowerCase().startsWith('azalee-patrimoine')) {
    return filename;
  }
  
  // Nettoyer le nom
  name = name
    .toLowerCase()
    .replace(/\s+/g, '-')           // Espaces -> tirets
    .replace(/_/g, '-')             // Underscores -> tirets
    .replace(/[^a-z0-9-]/g, '')     // Supprimer caractères spéciaux
    .replace(/-+/g, '-')            // Multiples tirets -> un seul
    .replace(/^-|-$/g, '');         // Supprimer tirets en début/fin
  
  // Ajouter le préfixe si pas déjà présent
  if (!name.startsWith('azalee-patrimoine')) {
    name = SEO_PREFIX + name;
  }
  
  return name + ext;
}

function getFilesToRename() {
  const files = [];
  
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Dossier images non trouvé:', IMAGES_DIR);
    return files;
  }
  
  const items = fs.readdirSync(IMAGES_DIR);
  
  for (const item of items) {
    const ext = path.extname(item).toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      const newName = sanitizeFilename(item);
      if (newName !== item) {
        files.push({
          oldName: item,
          newName: newName,
          oldPath: path.join(IMAGES_DIR, item),
          newPath: path.join(IMAGES_DIR, newName)
        });
      }
    }
  }
  
  return files;
}

function findSourceFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        findSourceFiles(fullPath, files);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (SOURCE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

function updateReferences(filesToRename) {
  const sourceFiles = findSourceFiles(SRC_DIR);
  const updates = [];
  
  for (const sourceFile of sourceFiles) {
    let content = fs.readFileSync(sourceFile, 'utf8');
    let modified = false;
    
    for (const file of filesToRename) {
      // Chercher les références à l'ancien nom
      const oldRef = `/images/${file.oldName}`;
      const newRef = `/images/${file.newName}`;
      
      if (content.includes(oldRef)) {
        content = content.replace(new RegExp(oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newRef);
        modified = true;
        updates.push({
          file: sourceFile,
          from: oldRef,
          to: newRef
        });
      }
    }
    
    if (modified && !DRY_RUN) {
      fs.writeFileSync(sourceFile, content, 'utf8');
    }
  }
  
  return updates;
}

function main() {
  console.log('🖼️  Script de renommage SEO des images');
  console.log('=====================================');
  console.log(DRY_RUN ? '⚠️  Mode DRY RUN - Aucun changement ne sera appliqué\n' : '✅ Mode LIVE - Les changements seront appliqués\n');
  
  // 1. Trouver les fichiers à renommer
  const filesToRename = getFilesToRename();
  
  if (filesToRename.length === 0) {
    console.log('✅ Aucune image à renommer. Tous les fichiers sont déjà conformes.');
    return;
  }
  
  console.log(`📁 ${filesToRename.length} image(s) à renommer:\n`);
  
  for (const file of filesToRename) {
    console.log(`  ${file.oldName}`);
    console.log(`  → ${file.newName}\n`);
  }
  
  // 2. Mettre à jour les références dans le code
  console.log('\n📝 Mise à jour des références dans le code...\n');
  const updates = updateReferences(filesToRename);
  
  if (updates.length > 0) {
    console.log(`  ${updates.length} référence(s) mise(s) à jour:\n`);
    for (const update of updates) {
      console.log(`  ${path.relative(process.cwd(), update.file)}`);
      console.log(`    ${update.from} → ${update.to}\n`);
    }
  } else {
    console.log('  Aucune référence trouvée dans le code.\n');
  }
  
  // 3. Renommer les fichiers
  if (!DRY_RUN) {
    console.log('\n🔄 Renommage des fichiers...\n');
    
    for (const file of filesToRename) {
      try {
        fs.renameSync(file.oldPath, file.newPath);
        console.log(`  ✅ ${file.oldName} → ${file.newName}`);
      } catch (error) {
        console.log(`  ❌ Erreur: ${file.oldName} - ${error.message}`);
      }
    }
  }
  
  console.log('\n=====================================');
  console.log(DRY_RUN 
    ? '⚠️  Exécutez sans --dry-run pour appliquer les changements' 
    : '✅ Terminé!'
  );
}

main();

