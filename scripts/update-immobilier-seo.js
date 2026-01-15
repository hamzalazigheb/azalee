// Script to update SEO content for existing /immobilier/ pages
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String }
}, { collection: 'pagecontents' });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// SEO updates for existing /immobilier/ pages based on CSV feedback
const seoUpdates = [
  {
    path: 'immobilier',
    title: 'Investissement Immobilier | Azalée Patrimoine',
    seo: {
      h1: 'Investissement Immobilier',
      metaTitle: 'Investissement Immobilier | Azalée Patrimoine - LMNP, SCI, SCPI, Crédit',
      metaDescription: 'Découvrez comment Azalée Patrimoine transforme vos projets immobiliers en stratégies patrimoniales : LMNP, SCI, SCPI, crédit et transmission.'
    }
  },
  {
    path: 'immobilier/sci',
    title: 'SCI : gestion et transmission de patrimoine | Azalée',
    seo: {
      h1: 'SCI : outil de gestion et transmission patrimoniale',
      metaTitle: 'SCI : gestion et transmission de patrimoine | Azalée',
      metaDescription: 'La SCI est un outil puissant pour gérer et transmettre votre patrimoine immobilier. Découvrez nos conseils d\'experts pour créer et gérer votre SCI.'
    }
  },
  {
    path: 'immobilier/lmnp',
    title: 'LMNP : statut et avantages fiscaux | Azalée Patrimoine',
    seo: {
      h1: 'LMNP : loueur en meublé non professionnel',
      metaTitle: 'LMNP : statut et avantages fiscaux | Azalée Patrimoine',
      metaDescription: 'Le statut LMNP (loueur en meublé non professionnel) offre une fiscalité attractive. Azalée Patrimoine vous guide pour investir en location meublée.'
    }
  },
  {
    path: 'immobilier/plus-value-immobiliere',
    title: 'Plus-value immobilière : fiscalité et calcul | Azalée',
    seo: {
      h1: 'Plus-value immobilière : fiscalité et calcul',
      metaTitle: 'Plus-value immobilière : fiscalité et calcul | Azalée',
      metaDescription: 'Comprendre la taxation des plus-values immobilières. Nos experts analysent pour vous les abattements et cas d\'exonération pour optimiser votre revente.'
    }
  },
  {
    path: 'immobilier/investissement-locatif',
    title: 'Investissement locatif : rentabilité et conseil | Azalée',
    seo: {
      h1: 'Investissement locatif : stratégies',
      metaTitle: 'Investissement locatif : rentabilité et conseil | Azalée',
      metaDescription: 'Réussir son investissement locatif demande de choisir le bon bien et le bon dispositif fiscal. Nos conseils pour maximiser votre rentabilité.'
    }
  },
  {
    path: 'immobilier/credit-immobilier-ptz',
    title: 'Crédit immobilier : courtage et financement | Azalée',
    seo: {
      h1: 'Crédit immobilier et financement',
      metaTitle: 'Crédit immobilier : courtage et financement | Azalée',
      metaDescription: 'Obtenez les meilleures conditions pour financer vos acquisitions. Nos courtiers négocient taux et assurances pour optimiser votre investissement.'
    }
  },
  {
    path: 'immobilier/robien',
    title: 'Loi Robien : gestion du dispositif | Azalée Patrimoine',
    seo: {
      h1: 'Loi Robien (dispositif éteint)',
      metaTitle: 'Loi Robien : gestion du dispositif | Azalée Patrimoine',
      metaDescription: 'Le dispositif Robien ne permet plus de nouveaux investissements mais continue d\'impacter les propriétaires actuels. Gestion et sortie du dispositif.'
    }
  },
  {
    path: 'immobilier/scellier',
    title: 'Dispositifs Fiscaux Pinel, Scellier, Robien | Azalée',
    seo: {
      h1: 'Les dispositifs fiscaux : Pinel, Scellier, Robien',
      metaTitle: 'Dispositifs Fiscaux Pinel, Scellier, Robien | Azalée Patrimoine',
      metaDescription: 'Découvrez les dispositifs fiscaux immobiliers : Pinel, Scellier, Robien. Conseils pour optimiser votre sortie de dispositif.'
    }
  },
  {
    path: 'immobilier/immobilier-neuf',
    title: 'Investir dans l\'immobilier neuf | Azalée Patrimoine',
    seo: {
      h1: 'Investir dans l\'immobilier neuf',
      metaTitle: 'Investir dans l\'immobilier neuf | Azalée Patrimoine',
      metaDescription: 'Tous les avantages d\'investir dans l\'immobilier neuf : garanties, frais de notaire réduits, performances énergétiques. Accompagnement personnalisé.'
    }
  },
  {
    path: 'immobilier/vefa',
    title: 'VEFA : Vente en l\'État Futur d\'Achèvement | Azalée',
    seo: {
      h1: 'VEFA : Vente en l\'État Futur d\'Achèvement',
      metaTitle: 'VEFA : Vente en l\'État Futur d\'Achèvement | Azalée',
      metaDescription: 'Comprendre la VEFA (Vente en l\'État Futur d\'Achèvement) : étapes, garanties, avantages. Conseil expert pour votre achat sur plan.'
    }
  },
  {
    path: 'immobilier/faire-construire',
    title: 'Faire construire votre projet immobilier | Azalée',
    seo: {
      h1: 'Faire construire votre projet immobilier',
      metaTitle: 'Faire construire votre projet immobilier | Azalée',
      metaDescription: 'De la recherche du terrain à la livraison de votre bien, nous vous accompagnons dans toutes les étapes de votre projet de construction.'
    }
  },
  {
    path: 'immobilier/immeubles-de-rapport',
    title: 'Immeubles de rapport : investissement rentable | Azalée',
    seo: {
      h1: 'Immeubles de rapport',
      metaTitle: 'Immeubles de rapport : investissement rentable | Azalée',
      metaDescription: 'L\'immeuble de rapport est un investissement locatif optimisé. Découvrez nos conseils pour acquérir et gérer un immeuble de rapport.'
    }
  },
  {
    path: 'immobilier/investissement-immobilier-rentable',
    title: 'Investissement immobilier rentable | Azalée Patrimoine',
    seo: {
      h1: 'Investissement immobilier rentable',
      metaTitle: 'Investissement immobilier rentable | Azalée Patrimoine',
      metaDescription: 'Stratégies pour un investissement immobilier rentable. Analyse de rendement, choix du bien, optimisation fiscale. Conseils d\'experts.'
    }
  },
  {
    path: 'immobilier/lmnp-2025',
    title: 'LMNP 2025 : nouveautés et évolutions | Azalée Patrimoine',
    seo: {
      h1: 'LMNP 2025 : nouveautés et évolutions',
      metaTitle: 'LMNP 2025 : nouveautés et évolutions | Azalée Patrimoine',
      metaDescription: 'Tout savoir sur le LMNP en 2025 : évolutions fiscales, plafonds, conditions. Nos experts vous accompagnent dans votre investissement.'
    }
  },
  // Fiscalité - Lois fiscales immobilières
  {
    path: 'fiscalite/loi-pinel',
    title: 'Loi Pinel : investir et réduire ses impôts | Azalée',
    seo: {
      h1: 'Loi Pinel : défiscalisation immobilière',
      metaTitle: 'Loi Pinel : investir et réduire ses impôts | Azalée',
      metaDescription: 'Le dispositif Pinel permet de réduire vos impôts en investissant dans le neuf. Analyse des zones éligibles et rentabilité par nos experts.'
    }
  },
  {
    path: 'fiscalite/loi-malraux',
    title: 'Loi Malraux : défiscalisation et patrimoine | Azalée',
    seo: {
      h1: 'Loi Malraux : défiscalisation et patrimoine',
      metaTitle: 'Loi Malraux : défiscalisation et patrimoine | Azalée',
      metaDescription: 'Investissez dans l\'immobilier ancien réhabilité et bénéficiez d\'une forte réduction d\'impôt. Expertise sur les programmes éligibles loi Malraux.'
    }
  },
  {
    path: 'fiscalite/loi-denormandie',
    title: 'Loi Denormandie : défiscalisation ancien | Azalée',
    seo: {
      h1: 'Loi Denormandie : défiscalisation ancien',
      metaTitle: 'Loi Denormandie : défiscalisation ancien | Azalée',
      metaDescription: 'Le dispositif Denormandie encourage la rénovation des logements en centre-ville. Bénéficiez d\'une réduction d\'impôt similaire au Pinel.'
    }
  },
  // Placements - SCPI
  {
    path: 'placements/scpi-opci',
    title: 'SCPI : investir dans l\'immobilier locatif | Azalée',
    seo: {
      h1: 'SCPI : la pierre-papier',
      metaTitle: 'SCPI : investir dans l\'immobilier locatif | Azalée',
      metaDescription: 'Investir en SCPI pour percevoir des revenus potentiels sans contrainte de gestion. Comparatif des meilleures SCPI de rendement et fiscales.'
    }
  },
];

async function updateSEOContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let updated = 0;
    let created = 0;

    for (const page of seoUpdates) {
      // Try to find existing page
      let existingPage = await PageContent.findOne({ path: page.path });

      if (existingPage) {
        // Update existing page
        existingPage.title = page.title;
        existingPage.content = {
          ...existingPage.content,
          seo: page.seo,
          hero: {
            ...existingPage.content?.hero,
            title: page.seo.h1
          }
        };
        existingPage.lastModified = new Date();
        await existingPage.save();
        console.log(`✅ Updated: ${page.path}`);
        updated++;
      } else {
        // Create new page
        const newPage = new PageContent({
          path: page.path,
          title: page.title,
          content: {
            hero: {
              title: page.seo.h1,
              subtitle: '',
              description: page.seo.metaDescription
            },
            seo: page.seo
          },
          published: true,
          lastModified: new Date()
        });
        await newPage.save();
        console.log(`✨ Created: ${page.path}`);
        created++;
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Updated: ${updated}`);
    console.log(`Created: ${created}`);
    console.log(`Total: ${updated + created}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

updateSEOContent();

