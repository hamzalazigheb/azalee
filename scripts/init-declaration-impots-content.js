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

const declarationImpotsContent = {
  title: 'Déclaration d\'impôts | Azalée Patrimoine',
  content: {
    hero: {
      title: "Déclaration de revenus",
      description: "Guide complet pour déclarer vos impôts en toute sérénité. Découvrez les étapes, les documents nécessaires et nos conseils d'experts."
    },
    tabs: {
      tabs: [
        { id: "general", label: "Prélèvement à la source" },
        { id: "dates", label: "Régularisation" },
        { id: "documents", label: "Questions fréquentes" },
        { id: "erreurs", label: "Accompagnement" }
      ]
    },
    quickStats: [
      {
        label: "DATE LIMITE",
        month: "Mai 2025",
        description: "Déclaration en ligne"
      },
      {
        label: "MODE",
        subtitle: "En ligne",
        description: "Recommandé par l'administration"
      },
      {
        label: "DOCUMENTS",
        subtitle: "À préparer",
        description: "Justificatifs de revenus"
      }
    ],
    declarationSteps: [
      {
        step: "1",
        title: "Rassemblement des documents",
        description: "Collectez tous vos justificatifs de revenus, charges et investissements",
        details: [
          "Bulletins de salaire",
          "Attestations de loyer",
          "Relevés bancaires",
          "Quittances de charges"
        ]
      },
      {
        step: "2",
        title: "Choix du mode de déclaration",
        description: "Optez pour la méthode qui vous convient le mieux",
        details: [
          "Déclaration en ligne (recommandée)",
          "Déclaration papier",
          "Déclaration par téléphone"
        ]
      },
      {
        step: "3",
        title: "Saisie des informations",
        description: "Renseignez vos revenus, charges et investissements",
        details: [
          "Revenus professionnels",
          "Revenus fonciers",
          "Charges déductibles",
          "Réductions d'impôts"
        ]
      },
      {
        step: "4",
        title: "Vérification et validation",
        description: "Contrôlez toutes les informations avant validation",
        details: [
          "Vérification des montants",
          "Contrôle des justificatifs",
          "Validation finale",
          "Réception de l'avis d'imposition"
        ]
      }
    ],
    calendarData: [
      {
        month: "Avril",
        events: [
          {
            date: "15 avril",
            title: "Début de la déclaration en ligne",
            description: "Ouverture du service de déclaration en ligne"
          }
        ]
      },
      {
        month: "Mai",
        events: [
          {
            date: "23 mai",
            title: "Date limite déclaration en ligne",
            description: "Dernier jour pour déclarer en ligne"
          },
          {
            date: "31 mai",
            title: "Date limite déclaration papier",
            description: "Dernier jour pour envoyer votre déclaration papier"
          }
        ]
      }
    ],
    commonErrors: [
      {
        title: "Oubli de déclarer des revenus",
        description: "Tous les revenus doivent être déclarés, même s'ils ont déjà été soumis au prélèvement à la source",
        solution: "Vérifiez tous vos relevés bancaires et contrats"
      },
      {
        title: "Erreur dans le calcul des charges",
        description: "Les charges déductibles doivent être justifiées et dans les limites légales",
        solution: "Conservez tous vos justificatifs et vérifiez les plafonds"
      },
      {
        title: "Oubli de déclarer des investissements",
        description: "Certains investissements génèrent des revenus imposables",
        solution: "Déclarez tous vos placements et investissements"
      }
    ],
    tabContent: {
      general: {
        title: "Prélèvement à la source",
        content: "Le prélèvement à la source permet de payer l'impôt au fur et à mesure de la perception des revenus. Il peut être ajusté selon votre situation."
      },
      dates: {
        title: "Régularisation",
        content: "La régularisation intervient après la déclaration pour ajuster le prélèvement à la source selon vos revenus réels."
      },
      documents: {
        title: "Questions fréquentes",
        content: "Retrouvez les réponses aux questions les plus fréquentes sur la déclaration d'impôts."
      },
      erreurs: {
        title: "Accompagnement",
        content: "Nos experts fiscaux vous accompagnent dans toutes vos démarches de déclaration."
      }
    },
    cta: {
      title: "Besoin d'aide pour votre déclaration ?",
      description: "Nos experts fiscaux vous accompagnent dans toutes vos démarches de déclaration d'impôts.",
      buttonText: "Demander une assistance"
    },
    seo: {
      metaTitle: "Déclaration d'impôts | Guide complet | Azalée Patrimoine",
      metaDescription: "Guide complet pour déclarer vos impôts. Dates limites, documents nécessaires, prélèvement à la source. Accompagnement par nos experts fiscaux."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'fiscalite/declaration-impots';
    
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: declarationImpotsContent.title,
            content: declarationImpotsContent.content,
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
        title: declarationImpotsContent.title,
        content: declarationImpotsContent.content,
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
    console.log(`   - Tabs: ${page.content.tabs ? '✅' : '❌'}`);
    console.log(`   - Declaration Steps: ${page.content.declarationSteps ? `✅ (${page.content.declarationSteps.length})` : '❌'}`);
    console.log(`   - Quick Stats: ${page.content.quickStats ? `✅ (${page.content.quickStats.length})` : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();

