/**
 * Script pour mettre à jour toutes les pages CMS avec le contenu SEO exact du CSV
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Fonction pour parser le CSV
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length >= headers.length) {
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.replace(/"/g, '') || '';
      });
      if (row['URL Actuelle'] && row['Nouvelle URL']) {
        data.push(row);
      }
    }
  }
  
  return data;
}

// Fonction pour extraire le path depuis une URL
function extractPath(url) {
  if (!url) return null;
  let cleanUrl = url.replace('https://www.azalee-patrimoine.fr', '').replace(/\/$/, '');
  cleanUrl = cleanUrl.replace(/^\//, '');
  if (!cleanUrl || cleanUrl === '/') return 'accueil';
  return cleanUrl;
}

async function updateAllSEO() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const csvPath = path.join(process.cwd(), 'Feedback-URL-v2.csv');
    const csvData = parseCSV(csvPath);
    console.log(`📖 ${csvData.length} lignes trouvées dans le CSV\n`);

    const collection = mongoose.connection.db.collection('pagecontents');
    
    let updated = 0;
    let created = 0;
    let skipped = 0;
    const skippedPages = [];

    for (const row of csvData) {
      const newPath = extractPath(row['Nouvelle URL']);
      const newH1 = row['Nouveau H1'];
      const newTitle = row['Nouveau Title (SEO)'];
      const newDescription = row['Nouvelle Meta Description'];

      if (!newPath || !newH1 || !newTitle || !newDescription) {
        skipped++;
        continue;
      }

      // Ignorer les pages investissement-immobilier (redirigées)
      if (newPath.startsWith('investissement-immobilier/')) {
        skippedPages.push({ path: newPath, reason: 'Redirigée vers /immobilier/' });
        skipped++;
        continue;
      }

      const page = await collection.findOne({ path: newPath });
      
      if (!page) {
        // Créer la page si elle n'existe pas
        await collection.insertOne({
          path: newPath,
          title: newTitle,
          content: {
            hero: {
              h1: newH1
            },
            seo: {
              metaTitle: newTitle,
              metaDescription: newDescription
            }
          },
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        created++;
        console.log(`  ✅ Créé: ${newPath}`);
      } else {
        // Mettre à jour la page existante
        const updateData = {
          $set: {
            title: newTitle,
            updatedAt: new Date()
          }
        };

        // Mettre à jour le contenu SEO
        const currentContent = page.content || {};
        const updatedContent = {
          ...currentContent,
          hero: {
            ...currentContent.hero,
            h1: newH1
          },
          seo: {
            ...currentContent.seo,
            metaTitle: newTitle,
            metaDescription: newDescription
          }
        };

        updateData.$set.content = updatedContent;

        await collection.updateOne(
          { _id: page._id },
          updateData
        );
        updated++;
        console.log(`  ✅ Mis à jour: ${newPath}`);
      }
    }

    console.log(`\n✅ MISE À JOUR TERMINÉE!`);
    console.log(`   Pages créées: ${created}`);
    console.log(`   Pages mises à jour: ${updated}`);
    console.log(`   Pages ignorées: ${skipped}`);

    if (skippedPages.length > 0) {
      console.log(`\n📋 Pages ignorées (redirigées):`);
      skippedPages.forEach(p => console.log(`   - ${p.path}`));
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateAllSEO();

