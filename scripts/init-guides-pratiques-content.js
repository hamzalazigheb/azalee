const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

const defaultContent = {
  hero: {
    title: "Guides pratiques partenaires",
    subtitle: "Supports pédagogiques de nos partenaires",
    description: "Nous mettons à disposition les guides pédagogiques de nos partenaires assureurs et sociétés de gestion pour vous accompagner dans vos choix d'investissement."
  },
  partners: [
    {
      id: "selencia",
      name: "Selencia",
      description: "Guide complet sur les produits d'assurance-vie et de capitalisation",
      logo: "/images/azalee-patrimoine-selencia.svg",
      logoType: "svg",
      category: "assurance",
      products: ["Assurance-vie", "Capitalisation", "Épargne retraite"],
      features: ["Caractéristiques détaillées", "Tableau des frais", "Avantages fiscaux", "Modalités de souscription"]
    },
    {
      id: "cardif",
      name: "Cardif",
      description: "Supports pédagogiques sur les contrats d'assurance et d'épargne",
      logo: "/images/azalee-patrimoine-cardif-logo.svg",
      logoType: "svg",
      category: "assurance",
      products: ["Assurance-vie", "PER", "Contrats de capitalisation"],
      features: ["Fonctionnement des produits", "Fiscalité applicable", "Risques et garanties", "Conseils d'utilisation"]
    },
    {
      id: "swisslife",
      name: "SwissLife",
      description: "Guides spécialisés en gestion de patrimoine et assurance",
      logo: "/images/azalee-patrimoine-sl-logo-svg.svg",
      logoType: "svg",
      category: "patrimoine",
      products: ["Assurance-vie", "Gestion de patrimoine", "Transmission", "Retraite"],
      features: ["Stratégies patrimoniales", "Optimisation fiscale", "Transmission intergénérationnelle", "Planification retraite"]
    },
    {
      id: "vieplus",
      name: "Vie Plus",
      description: "Documentation sur les produits d'assurance-vie et d'épargne",
      logo: "/images/azalee-patrimoine-vieplus.svg",
      logoType: "svg",
      category: "assurance",
      products: ["Assurance-vie", "Épargne", "Capitalisation"],
      features: ["Présentation des contrats", "Avantages concurrentiels", "Fiscalité", "Flexibilité des versements"]
    },
    {
      id: "uaflife",
      name: "UAF Life",
      description: "Guides pratiques sur l'assurance-vie et les placements",
      logo: "🎯",
      logoType: "emoji",
      category: "assurance",
      products: ["Assurance-vie", "Placements", "Épargne"],
      features: ["Comparaison des supports", "Rendements historiques", "Frais et charges", "Conseils d'allocation"]
    },
    {
      id: "intencial",
      name: "Intencial",
      description: "Supports pédagogiques sur la gestion d'actifs et l'assurance",
      logo: "/images/azalee-patrimoine-intencial-1.webp",
      logoType: "svg",
      category: "gestion",
      products: ["Gestion d'actifs", "Assurance-vie", "OPCVM"],
      features: ["Philosophie d'investissement", "Gestion active", "Performance", "Transparence des frais"]
    }
  ],
  categories: {
    all: "Tous les partenaires",
    assurance: "Assurance",
    patrimoine: "Patrimoine",
    gestion: "Gestion d'actifs"
  },
  featured: {
    title: "Guide du mois",
    guide: {
      title: "Assurance-vie 2024 : les nouveautés réglementaires",
      description: "Découvrez les dernières évolutions réglementaires et leurs impacts sur vos contrats d'assurance-vie.",
      readTime: "25 min",
      difficulty: "Intermédiaire"
    }
  },
  benefits: {
    title: "Pourquoi consulter nos guides partenaires ?",
    benefits: [
      "Informations officielles et actualisées des émetteurs",
      "Comparaison objective des caractéristiques et frais",
      "Présentation claire des avantages et inconvénients",
      "Conseils pratiques pour optimiser vos investissements"
    ]
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const existingPage = await PageContent.findOne({ path: 'outils/guides-pratiques' });
    
    if (existingPage) {
      // Mettre à jour la page existante
      existingPage.content = { ...existingPage.content, ...defaultContent };
      existingPage.published = true;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page mise à jour avec le contenu complet');
    } else {
      // Créer une nouvelle page
      await PageContent.create({
        path: 'outils/guides-pratiques',
        title: 'Guides Pratiques',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log(`   ✅ partners (${defaultContent.partners.length} partenaires)`);
    console.log(`   ✅ categories (${Object.keys(defaultContent.categories).length} catégories)`);
    console.log('   ✅ featured');
    console.log('   ✅ benefits');

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initContent();

