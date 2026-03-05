const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

function extractPath(url) {
  if (!url) return null;
  let cleanUrl = url.replace('https://www.azalee-patrimoine.fr', '').replace(/\/$/, '');
  cleanUrl = cleanUrl.replace(/^\//, '');
  if (!cleanUrl || cleanUrl === '/') return 'home';
  return cleanUrl;
}

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

async function checkFeedbackPercentage() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const csvPath = path.join(process.cwd(), 'Feedback-URL-v2.csv');
    if (!fs.existsSync(csvPath)) {
      console.error('❌ Fichier CSV non trouvé:', csvPath);
      process.exit(1);
    }

    const csvData = parseCSV(csvPath);
    console.log(`📊 ${csvData.length} pages dans le CSV\n`);

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const stats = {
      total: csvData.length,
      completed: 0,
      partial: 0,
      missing: 0,
      details: {
        hasPage: 0,
        hasH1: 0,
        hasTitle: 0,
        hasDescription: 0,
        allCorrect: 0
      },
      missingPages: [],
      incorrectPages: []
    };

    for (const row of csvData) {
      const newPath = extractPath(row['Nouvelle URL']);
      const expectedH1 = row['Nouveau H1'];
      const expectedTitle = row['Nouveau Title (SEO)'];
      const expectedDesc = row['Nouvelle Meta Description'];

      if (!newPath) continue;

      const page = await PageContent.findOne({ path: newPath });
      
      if (!page) {
        stats.missing++;
        stats.missingPages.push({ path: newPath, expected: { h1: expectedH1, title: expectedTitle } });
        continue;
      }

      stats.details.hasPage++;
      
      const actualH1 = page.content?.hero?.h1 || page.content?.hero?.title;
      const actualTitle = page.content?.seo?.metaTitle || page.title;
      const actualDesc = page.content?.seo?.metaDescription;

      const hasH1 = actualH1 && actualH1.trim().length > 0;
      const hasTitle = actualTitle && actualTitle.trim().length > 0;
      const hasDesc = actualDesc && actualDesc.trim().length > 0;

      if (hasH1) stats.details.hasH1++;
      if (hasTitle) stats.details.hasTitle++;
      if (hasDesc) stats.details.hasDescription++;

      // Vérifier si tout correspond (tolérance pour variations)
      const normalize = (str) => str ? str.trim().toLowerCase().replace(/\s+/g, ' ') : '';
      const h1Match = hasH1 && (
        normalize(actualH1) === normalize(expectedH1) || 
        normalize(actualH1).includes(normalize(expectedH1).split(':')[0]) ||
        normalize(expectedH1).includes(normalize(actualH1).split(':')[0])
      );
      const titleMatch = hasTitle && (
        normalize(actualTitle) === normalize(expectedTitle) || 
        normalize(actualTitle).includes(normalize(expectedTitle).split('|')[0]) ||
        normalize(expectedTitle).includes(normalize(actualTitle).split('|')[0])
      );
      const descMatch = hasDesc && (
        normalize(actualDesc) === normalize(expectedDesc) || 
        normalize(actualDesc).substring(0, 80) === normalize(expectedDesc).substring(0, 80)
      );

      if (h1Match && titleMatch && descMatch) {
        stats.completed++;
        stats.details.allCorrect++;
      } else if (hasH1 || hasTitle || hasDesc) {
        stats.partial++;
        stats.incorrectPages.push({ 
          path: newPath, 
          expected: { h1: expectedH1, title: expectedTitle, desc: expectedDesc },
          actual: { h1: actualH1, title: actualTitle, desc: actualDesc }
        });
      } else {
        stats.missing++;
        stats.missingPages.push({ path: newPath, expected: { h1: expectedH1, title: expectedTitle } });
      }
    }

    // Calculer les pourcentages
    const completedPct = ((stats.completed / stats.total) * 100).toFixed(1);
    const partialPct = ((stats.partial / stats.total) * 100).toFixed(1);
    const missingPct = ((stats.missing / stats.total) * 100).toFixed(1);

    console.log('='.repeat(70));
    console.log('📊 RAPPORT DE COMPLÉTION - FEEDBACK URL CSV');
    console.log('='.repeat(70));
    console.log('');
    console.log(`📈 PROGRESSION GLOBALE: ${completedPct}%`);
    console.log('');
    console.log(`✅ Complètes (H1 + Title + Description corrects): ${stats.completed} (${completedPct}%)`);
    console.log(`⚠️  Partielles (au moins un champ): ${stats.partial} (${partialPct}%)`);
    console.log(`❌ Manquantes ou vides: ${stats.missing} (${missingPct}%)`);
    console.log('');
    console.log('📋 DÉTAILS PAR CHAMP:');
    console.log(`   Pages existantes: ${stats.details.hasPage} (${((stats.details.hasPage/stats.total)*100).toFixed(1)}%)`);
    console.log(`   Avec H1: ${stats.details.hasH1} (${((stats.details.hasH1/stats.total)*100).toFixed(1)}%)`);
    console.log(`   Avec Title SEO: ${stats.details.hasTitle} (${((stats.details.hasTitle/stats.total)*100).toFixed(1)}%)`);
    console.log(`   Avec Description: ${stats.details.hasDescription} (${((stats.details.hasDescription/stats.total)*100).toFixed(1)}%)`);
    console.log(`   Tous les champs corrects: ${stats.details.allCorrect} (${((stats.details.allCorrect/stats.total)*100).toFixed(1)}%)`);
    console.log('');

    if (stats.missingPages.length > 0) {
      console.log(`\n❌ PAGES MANQUANTES (${stats.missingPages.length}):`);
      console.log('─'.repeat(70));
      stats.missingPages.slice(0, 10).forEach(p => {
        console.log(`   ${p.path}`);
      });
      if (stats.missingPages.length > 10) {
        console.log(`   ... et ${stats.missingPages.length - 10} autres`);
      }
    }

    if (stats.incorrectPages.length > 0) {
      console.log(`\n⚠️  PAGES AVEC CONTENU INCORRECT (${stats.incorrectPages.length}):`);
      console.log('─'.repeat(70));
      stats.incorrectPages.slice(0, 5).forEach(p => {
        console.log(`   ${p.path}`);
        if (p.expected.h1 !== p.actual.h1) {
          console.log(`      H1 attendu: "${p.expected.h1?.substring(0, 50)}..."`);
          console.log(`      H1 actuel:  "${p.actual.h1?.substring(0, 50) || 'N/A'}..."`);
        }
      });
      if (stats.incorrectPages.length > 5) {
        console.log(`   ... et ${stats.incorrectPages.length - 5} autres`);
      }
    }

    console.log('');
    console.log('='.repeat(70));

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

checkFeedbackPercentage();

