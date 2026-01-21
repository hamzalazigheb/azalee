const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const tranchesBaremesPlafondsContent = {
  title: 'Tranches, Barèmes et Plafonds | Azalée Patrimoine',
  content: {
    hero: {
      title: "Tranches, Barèmes et Plafonds",
      subtitle: "Comprendre la fiscalité française",
      description: "Les tranches d'imposition, barèmes et plafonds sont les éléments fondamentaux du système fiscal français. Ils déterminent le montant de vos impôts et influencent vos stratégies d'investissement.",
      button: "Calculer mes impôts",
      image: "/images/azalee-patrimoine-tranche.webp"
    },
    tranches: {
      title: "Tranches d'imposition 2025",
      description: "Les tranches d'imposition déterminent le taux appliqué à chaque partie de vos revenus",
      tableau: {
        headers: ["Revenu imposable", "Taux d'imposition"],
        rows: [
          { revenu: "Jusqu'à 11 294 €", taux: "0 %" },
          { revenu: "De 11 295 à 28 797 €", taux: "11 %" },
          { revenu: "De 28 798 à 82 341 €", taux: "30 %" },
          { revenu: "De 82 342 à 177 106 €", taux: "41 %" },
          { revenu: "Au-delà de 177 106 €", taux: "45 %" }
        ]
      }
    },
    plafonds: {
      title: "Plafonds fiscaux 2025",
      description: "Les plafonds limitent les avantages fiscaux de certains dispositifs",
      items: [
        {
          name: "Loi Pinel",
          plafond: "300 000€",
          description: "Plafond annuel d'investissement"
        },
        {
          name: "PER",
          plafond: "10% du revenu",
          description: "Plafond de versement annuel"
        },
        {
          name: "Déficit foncier",
          plafond: "10 700€",
          description: "Plafond annuel déductible"
        },
        {
          name: "Donations",
          plafond: "100 000€",
          description: "Abattement par parent et par enfant"
        },
        {
          name: "Assurance-vie",
          plafond: "152 500€",
          description: "Abattement par bénéficiaire"
        }
      ]
    },
    calculatrice: {
      title: "Calculateur d'impôts",
      description: "Estimez le montant de vos impôts selon votre situation",
      fields: [
        { id: "revenus", label: "Revenus annuels", placeholder: "50000" },
        { id: "parts", label: "Nombre de parts", placeholder: "1" }
      ]
    },
    baremes: {
      title: "Barèmes d'imposition",
      description: "Les barèmes fiscaux varient selon votre situation familiale",
      situations: [
        {
          label: "Célibataire",
          parts: 1,
          description: "1 part fiscale"
        },
        {
          label: "Marié(e)/Pacsé(e)",
          parts: 2,
          description: "2 parts fiscales"
        },
        {
          label: "Avec enfants",
          parts: 2.5,
          description: "2,5 parts fiscales et plus selon le nombre d'enfants"
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts vous accompagnent pour comprendre et optimiser votre situation fiscale.",
      buttonText: "Demander une consultation gratuite"
    },
    seo: {
      metaTitle: "Tranches, Barèmes et Plafonds fiscaux 2025 | Azalée Patrimoine",
      metaDescription: "Comprendre les tranches d'imposition, barèmes fiscaux et plafonds 2025. Guide complet de la fiscalité française. Calculateur d'impôts gratuit."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'fiscalite/tranches-baremes-plafonds';
    
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: tranchesBaremesPlafondsContent.title,
            content: tranchesBaremesPlafondsContent.content,
            published: true,
            lastModified: new Date()
          }
        },
        { new: true }
      );
      
      console.log('✅ Contenu mis à jour avec succès\n');
    } else {
      console.log(`📝 Création de la page "${path}"...`);
      
      const newPage = new PageContent({
        path,
        title: tranchesBaremesPlafondsContent.title,
        content: tranchesBaremesPlafondsContent.content,
        published: true,
        lastModified: new Date()
      });
      
      await newPage.save();
      console.log('✅ Page créée avec succès\n');
    }

    const page = await PageContent.findOne({ path });
    console.log('📋 Vérification du contenu:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Hero: ${page.content.hero ? '✅' : '❌'}`);
    console.log(`   - Hero Title: ${page.content.hero?.title || '❌'}`);
    console.log(`   - Tranches: ${page.content.tranches ? '✅' : '❌'}`);
    console.log(`   - Plafonds: ${page.content.plafonds ? `✅ (${page.content.plafonds.items?.length || 0})` : '❌'}`);
    console.log(`   - Baremes: ${page.content.baremes ? '✅' : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();

