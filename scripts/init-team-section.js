/**
 * Script pour initialiser/mettre à jour la section équipe (teamPreview) dans le CMS
 * Usage: node scripts/init-team-section.js
 */

const mongoose = require('mongoose');
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

// Contenu de la section équipe
const teamPreviewContent = {
  title: "Rencontrez votre équipe de gestion",
  subtitle: "Des experts passionnés et certifiés, dédiés à la réussite de vos projets patrimoniaux.",
  members: [
    {
      name: "Jean-Marc Dupont",
      position: "Fondateur & Directeur",
      photo: "/images/azalee-patrimoine-jean.webp",
      experience: "20+ ans"
    },
    {
      name: "Sophie Martin",
      position: "Conseillère en Gestion de Patrimoine",
      photo: "/images/azalee-patrimoine-sophie.webp",
      experience: "15 ans"
    },
    {
      name: "Thomas Bernard",
      position: "Expert Fiscal",
      photo: "/images/azalee-patrimoine-client1.webp",
      experience: "12 ans"
    }
  ],
  buttonText: "En savoir plus sur notre équipe"
};

async function initTeamSection() {
  console.log('🚀 Initialisation de la section équipe dans le CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Chemins possibles pour la homepage
    const possiblePaths = ['home', 'accueil', 'homepage', '/', 'page d\'accueil'];
    
    let homePage = null;
    
    // Chercher la page d'accueil
    for (const path of possiblePaths) {
      homePage = await PageContent.findOne({ path: path.toLowerCase() });
      if (homePage) {
        console.log(`✅ Page d'accueil trouvée: ${homePage.path}`);
        break;
      }
    }

    if (!homePage) {
      // Créer la page d'accueil si elle n'existe pas
      console.log('⚠️  Page d\'accueil non trouvée, création...');
      homePage = await PageContent.create({
        path: 'accueil',
        title: 'Page d\'Accueil - Azalée Patrimoine',
        content: {
          teamPreview: teamPreviewContent
        },
        published: true
      });
      console.log('✅ Page d\'accueil créée avec la section équipe');
    } else {
      // Mettre à jour la section teamPreview
      if (!homePage.content) {
        homePage.content = {};
      }
      
      // Utiliser markModified pour forcer la sauvegarde du champ Mixed
      homePage.content.teamPreview = teamPreviewContent;
      homePage.markModified('content');
      homePage.markModified('content.teamPreview');
      homePage.lastModified = new Date();
      
      const result = await homePage.save();
      console.log('✅ Section équipe mise à jour et sauvegardée');
      console.log('   ID:', result._id);
      console.log('   Path:', result.path);
    }

    console.log('\n📋 Structure de la section équipe:');
    console.log(JSON.stringify(teamPreviewContent, null, 2));

    console.log('\n✅ Section équipe initialisée avec succès!');
    console.log('\n📝 Vous pouvez maintenant modifier cette section dans le CMS:');
    console.log('   1. Aller sur http://localhost:4028/admin/cms');
    console.log('   2. Sélectionner la page "Accueil" ou "home"');
    console.log('   3. Chercher la section "teamPreview"');
    console.log('   4. Modifier les membres, images, textes');
    console.log('   5. Sauvegarder\n');

    await mongoose.disconnect();
    console.log('✅ Déconnecté de MongoDB');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error(error);
    process.exit(1);
  }
}

initTeamSection();

