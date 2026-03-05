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

const etfProduitsFinanciersContent = {
  title: 'ETF et Produits Financiers | Azalée Patrimoine',
  content: {
    hero: {
      title: "Produits financiers : actions, ETF, produits structurés",
      subtitle: "Les supports dynamiques disponibles dans les enveloppes fiscales pour accéder à la croissance des marchés financiers avec une diversification optimale.",
      note: "La réussite d'un placement dépend autant du support que de l'enveloppe fiscale choisie.",
      primaryButton: "Analyser mes placements",
      secondaryButton: "Découvrez nos solutions ETF"
    },
    productTypes: [
      {
        title: "Actions",
        subtitle: "Titres vifs d'entreprises",
        value: "Volatilité élevée",
        description: "Croissance potentielle"
      },
      {
        title: "ETF",
        subtitle: "Fonds indiciels",
        value: "Diversification",
        description: "Frais réduits"
      },
      {
        title: "Structurés",
        subtitle: "Produits sur-mesure",
        value: "Protection",
        description: "Rendement conditionnel"
      },
      {
        title: "OPCVM",
        subtitle: "Fonds gérés",
        value: "Gestion active",
        description: "Expertise professionnelle"
      }
    ],
    actions: {
      title: "Les actions : investir directement dans les entreprises",
      subtitle: "Les actions représentent une part du capital d'une entreprise cotée en bourse",
      avantages: {
        title: "Avantages",
        items: [
          "Potentiel de croissance élevé",
          "Dividendes réguliers possibles",
          "Liquidité importante",
          "Droits de vote en assemblée"
        ]
      },
      risques: {
        title: "Risques",
        items: [
          "Volatilité importante",
          "Risque de perte en capital",
          "Nécessite une analyse approfondie",
          "Concentration sur un seul titre"
        ]
      }
    },
    etf: {
      title: "Les ETF : la diversification simplifiée",
      subtitle: "Les ETF (Exchange Traded Funds) répliquent la performance d'un indice boursier",
      types: [
        {
          name: "ETF Actions",
          description: "Répliquent des indices comme le CAC 40, S&P 500, MSCI World",
          icon: "📈"
        },
        {
          name: "ETF Obligations",
          description: "Exposent aux marchés obligataires avec diversification",
          icon: "📊"
        },
        {
          name: "ETF Thématiques",
          description: "Ciblent des secteurs spécifiques : tech, santé, ESG",
          icon: "🎯"
        }
      ],
      avantage: {
        title: "Pourquoi choisir les ETF ?",
        items: [
          {
            label: "Frais",
            value: "0.1% - 0.5%",
            description: "Beaucoup moins que les fonds actifs"
          },
          {
            label: "Diversification",
            value: "Automatique",
            description: "Exposition à des centaines de titres"
          },
          {
            label: "Liquidité",
            value: "Élevée",
            description: "Achat/vente en temps réel"
          },
          {
            label: "Transparence",
            value: "Totale",
            description: "Composition connue en permanence"
          }
        ]
      }
    },
    structures: {
      title: "Les produits structurés : rendement et protection",
      subtitle: "Des solutions sur-mesure combinant performance et gestion du risque",
      fonctionnement: {
        title: "Comment ça fonctionne ?",
        description: "Un produit structuré combine plusieurs instruments financiers pour offrir un profil de rendement/risque spécifique.",
        items: [
          "Sous-jacent : action, indice, panier d'actions",
          "Barrière de protection : limite les pertes",
          "Coupon : rendement potentiel défini à l'avance",
          "Durée : généralement 1 à 10 ans"
        ]
      },
      exemple: {
        title: "Exemple de produit",
        sousjacent: "CAC 40",
        protection: "-30%",
        coupon: "8%",
        duree: "5 ans"
      }
    },
    cta: {
      title: "Besoin d'aide pour choisir vos supports ?",
      description: "Nos experts vous accompagnent pour sélectionner les produits financiers adaptés à votre profil et vos objectifs.",
      buttonText: "Demander une analyse gratuite"
    },
    seo: {
      metaTitle: "ETF et Produits Financiers | Azalée Patrimoine",
      metaDescription: "Découvrez les ETF, actions et produits structurés pour diversifier votre patrimoine. Guide complet des produits financiers disponibles dans les enveloppes fiscales."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'placements/etf-produits-financiers';
    
    // Vérifier si la page existe déjà
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: etfProduitsFinanciersContent.title,
            content: etfProduitsFinanciersContent.content,
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
        title: etfProduitsFinanciersContent.title,
        content: etfProduitsFinanciersContent.content,
        published: true,
        lastModified: new Date()
      });
      
      await newPage.save();
      console.log('✅ Page créée avec succès\n');
    }

    // Vérification
    const page = await PageContent.findOne({ path });
    console.log('📋 Vérification du contenu:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Hero: ${page.content.hero ? '✅' : '❌'}`);
    console.log(`   - Hero Title: ${page.content.hero?.title || '❌'}`);
    console.log(`   - Product Types: ${page.content.productTypes ? `✅ (${page.content.productTypes.length})` : '❌'}`);
    console.log(`   - Actions: ${page.content.actions ? '✅' : '❌'}`);
    console.log(`   - ETF: ${page.content.etf ? '✅' : '❌'}`);
    console.log(`   - Structures: ${page.content.structures ? '✅' : '❌'}`);
    console.log(`   - CTA: ${page.content.cta ? '✅' : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();





