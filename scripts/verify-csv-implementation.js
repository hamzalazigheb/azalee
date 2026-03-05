/**
 * Script pour vérifier si les changements du CSV Feedback-URL-v2.csv ont été implémentés
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Fonction pour parser le CSV manuellement (sans dépendance externe)
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
  // Enlever le "/" au début si présent
  cleanUrl = cleanUrl.replace(/^\//, '');
  // Homepage
  if (!cleanUrl || cleanUrl === '/') return 'accueil';
  return cleanUrl;
}

async function verifyImplementation() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    const csvPath = path.join(process.cwd(), 'Feedback-URL-v2.csv');
    if (!fs.existsSync(csvPath)) {
      console.error('❌ Fichier CSV non trouvé:', csvPath);
      process.exit(1);
    }

    console.log('📖 Lecture du CSV...');
    const csvData = parseCSV(csvPath);
    console.log(`   ${csvData.length} lignes trouvées\n`);

    const collection = mongoose.connection.db.collection('pagecontents');
    
    const results = {
      implemented: [],
      missing: [],
      incorrect: [],
      redirects: []
    };

    // Vérifier les redirections dans next.config.mjs
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    const configContent = fs.readFileSync(configPath, 'utf-8');

    for (const row of csvData) {
      const oldPath = extractPath(row['URL Actuelle']);
      const newPath = extractPath(row['Nouvelle URL']);
      const newH1 = row['Nouveau H1'];
      const newTitle = row['Nouveau Title (SEO)'];
      const newDescription = row['Nouvelle Meta Description'];

      if (!newPath) continue;

      // Vérifier la redirection (chercher avec et sans /)
      const oldPathWithSlash = `/${oldPath}`;
      const hasRedirect = configContent.includes(`source: '${oldPathWithSlash}'`) || 
                         configContent.includes(`source: "${oldPathWithSlash}"`) ||
                         configContent.includes(`'${oldPathWithSlash}'`) ||
                         configContent.includes(`"${oldPathWithSlash}"`);
      
      if (hasRedirect) {
        results.redirects.push({ oldPath, newPath });
      }

      // Vérifier le contenu CMS
      const page = await collection.findOne({ path: newPath });
      
      if (!page) {
        results.missing.push({ 
          path: newPath, 
          h1: newH1,
          title: newTitle,
          description: newDescription,
          reason: 'Page non trouvée dans CMS'
        });
        continue;
      }

      // Vérifier les champs SEO (chercher dans différentes structures)
      const actualH1 = page.content?.hero?.h1 || 
                       page.content?.hero?.title ||
                       page.content?.seo?.h1 || 
                       page.content?.h1 ||
                       page.content?.hero?.heroTitle;
      const actualTitle = page.content?.seo?.metaTitle || 
                         page.content?.seo?.title ||
                         page.title;
      const actualDescription = page.content?.seo?.metaDescription ||
                               page.content?.seo?.description;

      if (!actualH1 && !actualTitle && !actualDescription) {
        results.missing.push({ 
          path: newPath, 
          expected: { h1: newH1, title: newTitle, description: newDescription },
          reason: 'Aucun champ SEO trouvé dans le CMS'
        });
        continue;
      }

      // Comparer les valeurs (tolérance pour les variations mineures)
      const normalize = (str) => str ? str.trim().toLowerCase().replace(/\s+/g, ' ') : '';
      const h1Match = actualH1 && (
        normalize(actualH1) === normalize(newH1) || 
        normalize(actualH1).includes(normalize(newH1).split(':')[0]) ||
        normalize(newH1).includes(normalize(actualH1).split(':')[0])
      );
      const titleMatch = actualTitle && (
        normalize(actualTitle) === normalize(newTitle) || 
        normalize(actualTitle).includes(normalize(newTitle).split('|')[0]) ||
        normalize(newTitle).includes(normalize(actualTitle).split('|')[0])
      );
      const descMatch = actualDescription && (
        normalize(actualDescription) === normalize(newDescription) || 
        normalize(actualDescription).substring(0, 80) === normalize(newDescription).substring(0, 80)
      );

      if (h1Match && titleMatch && descMatch) {
        results.implemented.push({ 
          path: newPath,
          h1: actualH1,
          title: actualTitle,
          description: actualDescription
        });
      } else {
        results.incorrect.push({ 
          path: newPath,
          expected: { h1: newH1, title: newTitle, description: newDescription },
          actual: { h1: actualH1, title: actualTitle, description: actualDescription }
        });
      }
    }

    // Afficher les résultats
    console.log('=== RÉSULTATS DE VÉRIFICATION ===\n');
    console.log(`✅ Pages implémentées correctement: ${results.implemented.length}`);
    console.log(`❌ Pages manquantes ou incomplètes: ${results.missing.length}`);
    console.log(`⚠️  Pages avec contenu incorrect: ${results.incorrect.length}`);
    console.log(`🔄 Redirections configurées: ${results.redirects.length}\n`);

    if (results.missing.length > 0) {
      console.log('\n📋 PAGES MANQUANTES OU INCOMPLÈTES:');
      console.log('─'.repeat(60));
      results.missing.slice(0, 10).forEach(p => {
        console.log(`  ❌ ${p.path}`);
        if (p.reason) console.log(`     Raison: ${p.reason}`);
      });
      if (results.missing.length > 10) {
        console.log(`  ... et ${results.missing.length - 10} autres`);
      }
    }

    if (results.incorrect.length > 0) {
      console.log('\n⚠️  PAGES AVEC CONTENU INCORRECT:');
      console.log('─'.repeat(60));
      results.incorrect.slice(0, 5).forEach(p => {
        console.log(`  ⚠️  ${p.path}`);
        if (p.expected.h1 !== p.actual.h1) {
          console.log(`     H1 attendu: "${p.expected.h1}"`);
          console.log(`     H1 actuel:  "${p.actual.h1}"`);
        }
        if (p.expected.title !== p.actual.title) {
          console.log(`     Title attendu: "${p.expected.title.substring(0, 60)}..."`);
          console.log(`     Title actuel:  "${p.actual.title?.substring(0, 60) || 'N/A'}..."`);
        }
      });
      if (results.incorrect.length > 5) {
        console.log(`  ... et ${results.incorrect.length - 5} autres`);
      }
    }

    if (results.implemented.length > 0) {
      console.log('\n✅ EXEMPLES DE PAGES CORRECTEMENT IMPLÉMENTÉES:');
      console.log('─'.repeat(60));
      results.implemented.slice(0, 5).forEach(p => {
        console.log(`  ✅ ${p.path}`);
      });
      if (results.implemented.length > 5) {
        console.log(`  ... et ${results.implemented.length - 5} autres`);
      }
    }

    // Résumé final
    const total = csvData.length;
    const successRate = ((results.implemented.length / total) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 TAUX DE RÉUSSITE: ${successRate}%`);
    console.log(`   Total pages CSV: ${total}`);
    console.log(`   Implémentées: ${results.implemented.length}`);
    console.log(`   À corriger: ${results.missing.length + results.incorrect.length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
  }
}

verifyImplementation();

