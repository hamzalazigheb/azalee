/**
 * Script pour initialiser le contenu CMS de la homepage et Investissement-immobilier
 */

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

const pagesContent = {
  'homepage': {
    title: 'Accueil - Azalée Patrimoine',
    content: {
      hero: {
        title: 'Gérez votre patrimoine en toute confiance',
        subtitle: 'Conseil personnalisé en gestion de patrimoine, investissement et optimisation fiscale',
        ctaText: 'Prendre rendez-vous',
        ctaLink: '/rdv'
      },
      services: {
        title: 'Nos services',
        items: [
          { title: 'Gestion de patrimoine', description: 'Stratégie globale et personnalisée', link: '/patrimoine' },
          { title: 'Investissement immobilier', description: 'Solutions immobilières adaptées', link: '/immobilier' },
          { title: 'Optimisation fiscale', description: 'Réduisez vos impôts légalement', link: '/fiscalite' },
          { title: 'Préparation retraite', description: 'Anticipez sereinement', link: '/retraite' }
        ]
      },
      seo: {
        metaTitle: 'Azalée Patrimoine - Gestion de patrimoine et conseil financier',
        metaDescription: 'Cabinet de conseil en gestion de patrimoine indépendant. Optimisation fiscale, investissement immobilier, préparation retraite. Expertise personnalisée.'
      }
    }
  },
  'investissement-immobilier': {
    title: 'Investissement Immobilier',
    content: {
      hero: {
        title: 'Investissement Immobilier',
        subtitle: 'Construisez votre patrimoine avec l\'immobilier'
      },
      sections: [
        {
          title: 'Pourquoi investir dans l\'immobilier ?',
          content: 'L\'immobilier reste une valeur refuge par excellence. Il permet de se constituer un patrimoine solide, de générer des revenus complémentaires et de bénéficier d\'avantages fiscaux.'
        },
        {
          title: 'Nos solutions',
          items: [
            { name: 'Immobilier neuf', description: 'TVA réduite, garanties constructeur, dispositifs fiscaux' },
            { name: 'LMNP', description: 'Revenus locatifs optimisés, amortissement' },
            { name: 'SCPI', description: 'Pierre-papier accessible et diversifiée' },
            { name: 'Investissement locatif', description: 'Constitution de patrimoine et revenus' }
          ]
        }
      ],
      seo: {
        metaTitle: 'Investissement Immobilier | Azalée Patrimoine',
        metaDescription: 'Solutions d\'investissement immobilier : neuf, LMNP, SCPI, locatif. Constituez votre patrimoine avec nos experts.'
      }
    }
  }
};

async function main() {
  console.log('🚀 Initialisation des pages manquantes...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    for (const [path, pageData] of Object.entries(pagesContent)) {
      try {
        const existing = await PageContent.findOne({ path });
        
        if (existing) {
          console.log(`⏭️  Page ${path} existe déjà`);
        } else {
          await PageContent.create({
            path,
            title: pageData.title,
            content: pageData.content,
            published: true,
            lastModified: new Date()
          });
          console.log(`✅ Créé: ${path}`);
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⏭️  Ignoré (doublon): ${path}`);
        } else {
          console.error(`❌ Erreur pour ${path}:`, error.message);
        }
      }
    }

    // Vérifier les entrées existantes pour home/homepage
    const homePages = await PageContent.find({ 
      path: { $in: ['home', 'homepage', 'accueil', '/'] } 
    });
    console.log('\n📋 Entrées CMS liées à la homepage:');
    homePages.forEach(p => console.log(`   - ${p.path}: ${p.title}`));

    await mongoose.disconnect();
    console.log('\n✅ Terminé');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

