const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, '../public/images');
const maxSizeKB = 300;

// Images à optimiser (celles qui dépassent 300KB)
const largeImages = [
  { name: 'architecte.webp', size: 336.11 },
  { name: 'calc.webp', size: 412.77 },
  { name: 'reunion.jpg', size: 414.65 }, // Il existe déjà reunion.webp
  { name: 'hero_vector_1-432706.svg', size: 612.43 }, // SVG, peut être optimisé
];

console.log('📸 Images à optimiser (>300KB):\n');
largeImages.forEach(img => {
  console.log(`  - ${img.name}: ${img.size} KB`);
});

console.log('\n💡 Recommandations:');
console.log('  1. Utiliser sharp ou imagemin pour compresser les images WebP');
console.log('  2. Pour reunion.jpg, utiliser déjà reunion.webp (119.74 KB)');
console.log('  3. Pour hero_vector_1-432706.svg, optimiser avec SVGO');
console.log('  4. Vérifier que toutes les références utilisent les versions optimisées\n');

// Vérifier si sharp est installé
try {
  require('sharp');
  console.log('✅ sharp est installé - vous pouvez utiliser ce script pour compresser');
} catch (e) {
  console.log('⚠️  sharp n\'est pas installé. Installez-le avec: npm install sharp');
  console.log('   Ou utilisez un outil en ligne comme: https://squoosh.app/\n');
}

// Liste des fichiers avec espaces dans le nom (à renommer)
const filesWithSpaces = [];
fs.readdirSync(imagesDir).forEach(file => {
  if (file.includes(' ')) {
    filesWithSpaces.push(file);
  }
});

if (filesWithSpaces.length > 0) {
  console.log('📝 Fichiers avec espaces dans le nom (à renommer):');
  filesWithSpaces.forEach(file => {
    const newName = file.replace(/\s+/g, '-').toLowerCase();
    console.log(`  - "${file}" → "${newName}"`);
  });
}

console.log('\n✅ Script d\'analyse terminé');

