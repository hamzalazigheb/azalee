/**
 * Script pour ajouter l'entrée CMS pour Investissement-immobilier (avec majuscule)
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

async function main() {
  console.log('🔧 Ajout entrée CMS pour Investissement-immobilier...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Créer avec le path exactement comme détecté (majuscule)
    const pageData = {
      path: 'investissement-immobilier', // lowercase as per schema
      title: 'Investissement Immobilier - Guide Complet',
      content: {
        hero: {
          title: 'Investissement Immobilier',
          subtitle: 'Votre guide complet pour investir dans l\'immobilier',
          description: 'Découvrez les meilleures stratégies d\'investissement immobilier pour constituer et valoriser votre patrimoine.'
        },
        services: {
          title: 'Nos solutions d\'investissement',
          items: [
            {
              title: 'Analyse patrimoniale',
              description: 'Étude approfondie de votre situation pour définir la meilleure stratégie.',
              image: '/images/investissement-immobilier-responsive-analysis-image-45db43.webp'
            },
            {
              title: 'Optimisation fiscale',
              description: 'Solutions de défiscalisation adaptées à votre profil.',
              image: '/images/investissement-immobilier-responsive-tax-image-74349c.webp'
            },
            {
              title: 'Gestion locative',
              description: 'Accompagnement complet dans la gestion de vos biens.',
              image: '/images/investissement-immobilier-responsive-management-image-67c728.webp'
            },
            {
              title: 'Stratégie patrimoniale',
              description: 'Construction d\'une stratégie globale pour votre patrimoine.',
              image: '/images/investissement-immobilier-responsive-strategy-image-6274ef.webp'
            }
          ]
        },
        expertise: {
          title: 'Notre expertise',
          items: [
            { title: 'Optimisation fiscale', description: 'Réduisez vos impôts' },
            { title: 'Défiscalisation', description: 'Dispositifs Pinel, LMNP, Malraux' },
            { title: 'Conseil professionnel', description: 'Accompagnement personnalisé' },
            { title: 'Transmission', description: 'Préparez l\'avenir de votre patrimoine' }
          ]
        },
        fiscalDevices: {
          title: 'Dispositifs fiscaux',
          items: [
            { title: 'Loi Pinel', description: 'Réduction d\'impôt jusqu\'à 21%' },
            { title: 'LMNP', description: 'Revenus locatifs optimisés' },
            { title: 'Déficit foncier', description: 'Imputation sur le revenu global' },
            { title: 'Valorisation', description: 'Plus-value à long terme' }
          ]
        },
        seo: {
          metaTitle: 'Investissement Immobilier | Azalée Patrimoine',
          metaDescription: 'Guide complet de l\'investissement immobilier : stratégies, fiscalité, dispositifs de défiscalisation. Conseil personnalisé.'
        }
      },
      published: true,
      lastModified: new Date()
    };

    // Essayer de créer ou mettre à jour
    const existing = await PageContent.findOne({ path: 'investissement-immobilier' });
    
    if (existing) {
      await PageContent.updateOne(
        { path: 'investissement-immobilier' },
        { $set: { content: pageData.content, lastModified: new Date() } }
      );
      console.log('📝 Mis à jour: investissement-immobilier');
    } else {
      await PageContent.create(pageData);
      console.log('✅ Créé: investissement-immobilier');
    }

    await mongoose.disconnect();
    console.log('\n✅ Terminé');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

