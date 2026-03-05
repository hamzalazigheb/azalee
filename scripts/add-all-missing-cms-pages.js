// Add ALL missing pages to CMS database
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

// ALL MISSING PAGES
const pagesToAdd = [
  // ==================== FISCALITE PAGES ====================
  {
    path: 'fiscalite/autre-fiscalite',
    title: 'Autres Solutions Fiscales',
    content: {
      hero: { title: "Autres solutions fiscales", subtitle: "Découvrez toutes les solutions pour optimiser votre fiscalité" },
      seo: { metaTitle: "Autres Solutions Fiscales | Azalée Patrimoine", metaDescription: "Découvrez toutes les solutions fiscales pour optimiser votre patrimoine." }
    }
  },
  {
    path: 'fiscalite/declaration-impots',
    title: 'Déclaration d\'Impôts',
    content: {
      hero: { title: "Déclaration d'impôts", subtitle: "Guides et conseils pour votre déclaration fiscale" },
      seo: { metaTitle: "Déclaration d'Impôts | Azalée Patrimoine", metaDescription: "Guides et conseils pour optimiser votre déclaration d'impôts." }
    }
  },
  {
    path: 'fiscalite/defiscalisation-cas-specifiques',
    title: 'Défiscalisation Cas Spécifiques',
    content: {
      hero: { title: "Défiscalisation pour cas spécifiques", subtitle: "Solutions adaptées à votre situation particulière" },
      seo: { metaTitle: "Défiscalisation Cas Spécifiques | Azalée Patrimoine", metaDescription: "Solutions de défiscalisation adaptées aux cas particuliers." }
    }
  },
  {
    path: 'fiscalite/fiscalite-placements',
    title: 'Fiscalité des Placements',
    content: {
      hero: { title: "Fiscalité des placements", subtitle: "Comprendre la fiscalité de vos investissements financiers" },
      seo: { metaTitle: "Fiscalité des Placements | Azalée Patrimoine", metaDescription: "Tout sur la fiscalité de vos placements financiers." }
    }
  },
  {
    path: 'fiscalite/impot-sur-le-revenu',
    title: 'Impôt sur le Revenu',
    content: {
      hero: { title: "Impôt sur le revenu", subtitle: "Comprendre et optimiser votre IR" },
      seo: { metaTitle: "Impôt sur le Revenu | Azalée Patrimoine", metaDescription: "Comprendre l'impôt sur le revenu et optimiser votre fiscalité." }
    }
  },
  {
    path: 'fiscalite/loi-cosse',
    title: 'Loi Cosse',
    content: {
      hero: { title: "Loi Cosse", subtitle: "Réduction d'impôt pour location à loyer modéré" },
      seo: { metaTitle: "Loi Cosse | Azalée Patrimoine", metaDescription: "Découvrez la loi Cosse pour défiscaliser en louant à loyer modéré." }
    }
  },
  {
    path: 'fiscalite/loi-denormandie',
    title: 'Loi Denormandie',
    content: {
      hero: { title: "Loi Denormandie", subtitle: "Rénovation dans l'ancien avec avantages fiscaux" },
      seo: { metaTitle: "Loi Denormandie | Azalée Patrimoine", metaDescription: "La loi Denormandie pour investir dans l'ancien avec des avantages fiscaux." }
    }
  },
  {
    path: 'fiscalite/loi-girardin',
    title: 'Loi Girardin',
    content: {
      hero: { title: "Loi Girardin", subtitle: "Défiscalisation dans les DOM-TOM" },
      seo: { metaTitle: "Loi Girardin | Azalée Patrimoine", metaDescription: "La loi Girardin pour défiscaliser en investissant dans les DOM-TOM." }
    }
  },
  {
    path: 'fiscalite/loi-pinel',
    title: 'Loi Pinel',
    content: {
      hero: { title: "Loi Pinel", subtitle: "Réduction d'impôt pour investissement locatif neuf" },
      benefits: {
        title: "Avantages de la loi Pinel",
        items: [
          { duration: "6 ans", reduction: "12%" },
          { duration: "9 ans", reduction: "18%" },
          { duration: "12 ans", reduction: "21%" }
        ]
      },
      seo: { metaTitle: "Loi Pinel | Azalée Patrimoine", metaDescription: "Tout sur la loi Pinel : réduction d'impôt jusqu'à 21% pour votre investissement locatif neuf." }
    }
  },
  {
    path: 'fiscalite/lois-fiscales',
    title: 'Lois Fiscales',
    content: {
      hero: { title: "Lois fiscales", subtitle: "Panorama des dispositifs fiscaux immobiliers" },
      seo: { metaTitle: "Lois Fiscales | Azalée Patrimoine", metaDescription: "Découvrez toutes les lois fiscales pour optimiser vos investissements." }
    }
  },
  {
    path: 'fiscalite/pfu',
    title: 'PFU - Prélèvement Forfaitaire Unique',
    content: {
      hero: { title: "PFU - Prélèvement Forfaitaire Unique", subtitle: "La flat tax de 30% sur les revenus du capital" },
      seo: { metaTitle: "PFU - Flat Tax | Azalée Patrimoine", metaDescription: "Comprendre le Prélèvement Forfaitaire Unique (PFU) ou flat tax de 30%." }
    }
  },
  {
    path: 'fiscalite/tmi-prelevements-sociaux',
    title: 'TMI et Prélèvements Sociaux',
    content: {
      hero: { title: "TMI et prélèvements sociaux", subtitle: "Comprendre votre tranche marginale d'imposition" },
      seo: { metaTitle: "TMI et Prélèvements Sociaux | Azalée Patrimoine", metaDescription: "Comprendre la TMI et les prélèvements sociaux pour optimiser votre fiscalité." }
    }
  },
  {
    path: 'fiscalite/tranches-baremes-plafonds',
    title: 'Tranches, Barèmes et Plafonds',
    content: {
      hero: { title: "Tranches, barèmes et plafonds fiscaux", subtitle: "Les chiffres clés de la fiscalité" },
      seo: { metaTitle: "Tranches, Barèmes, Plafonds | Azalée Patrimoine", metaDescription: "Les tranches d'imposition, barèmes et plafonds fiscaux à connaître." }
    }
  },

  // ==================== PLACEMENTS PAGES ====================
  {
    path: 'placements/autres',
    title: 'Autres Placements',
    content: {
      hero: { title: "Autres placements", subtitle: "Découvrez nos solutions d'investissement alternatives" },
      seo: { metaTitle: "Autres Placements | Azalée Patrimoine", metaDescription: "Solutions d'investissement alternatives pour diversifier votre patrimoine." }
    }
  },
  {
    path: 'placements/bourse-actions',
    title: 'Bourse et Actions',
    content: {
      hero: { title: "Bourse et actions", subtitle: "Investir sur les marchés financiers" },
      seo: { metaTitle: "Bourse et Actions | Azalée Patrimoine", metaDescription: "Tout sur l'investissement en bourse et en actions." }
    }
  },
  {
    path: 'placements/compte-titres',
    title: 'Compte-Titres',
    content: {
      hero: { title: "Compte-titres ordinaire (CTO)", subtitle: "Liberté totale pour vos investissements boursiers" },
      seo: { metaTitle: "Compte-Titres | Azalée Patrimoine", metaDescription: "Le compte-titres ordinaire pour investir librement en bourse." }
    }
  },
  {
    path: 'placements/contrat-capitalisation',
    title: 'Contrat de Capitalisation',
    content: {
      hero: { title: "Contrat de capitalisation", subtitle: "L'alternative patrimoniale à l'assurance-vie" },
      seo: { metaTitle: "Contrat de Capitalisation | Azalée Patrimoine", metaDescription: "Le contrat de capitalisation : avantages et différences avec l'assurance-vie." }
    }
  },
  {
    path: 'placements/etf-produits-financiers',
    title: 'ETF et Produits Financiers',
    content: {
      hero: { title: "ETF et produits financiers", subtitle: "Investir via des fonds indiciels à faibles frais" },
      seo: { metaTitle: "ETF et Produits Financiers | Azalée Patrimoine", metaDescription: "Tout sur les ETF et produits financiers pour votre portefeuille." }
    }
  },
  {
    path: 'placements/taux-interets',
    title: 'Taux et Intérêts',
    content: {
      hero: { title: "Taux et intérêts", subtitle: "Comprendre les taux pour optimiser vos placements" },
      seo: { metaTitle: "Taux et Intérêts | Azalée Patrimoine", metaDescription: "Comprendre les taux d'intérêt pour vos placements." }
    }
  },

  // ==================== PRODUITS STRUCTURES SUBPAGES ====================
  {
    path: 'placements/produits-structures/ambition-pharma-2026',
    title: 'Ambition Pharma 2026',
    content: {
      hero: { title: "Ambition Pharma 2026", subtitle: "Produit structuré sur le secteur pharmaceutique" },
      seo: { metaTitle: "Ambition Pharma 2026 | Azalée Patrimoine", metaDescription: "Découvrez le produit structuré Ambition Pharma 2026." }
    }
  },
  {
    path: 'placements/produits-structures/athena-ia-robotique-2025',
    title: 'Athena IA Robotique 2025',
    content: {
      hero: { title: "Athena IA Robotique 2025", subtitle: "Produit structuré sur l'intelligence artificielle et la robotique" },
      seo: { metaTitle: "Athena IA Robotique 2025 | Azalée Patrimoine", metaDescription: "Découvrez le produit structuré Athena IA Robotique 2025." }
    }
  },
  {
    path: 'placements/produits-structures/athena-luxe-2025',
    title: 'Athena Luxe 2025',
    content: {
      hero: { title: "Athena Luxe 2025", subtitle: "Produit structuré sur le secteur du luxe" },
      seo: { metaTitle: "Athena Luxe 2025 | Azalée Patrimoine", metaDescription: "Découvrez le produit structuré Athena Luxe 2025." }
    }
  },
  {
    path: 'placements/produits-structures/autocall-credit-agricole-2025',
    title: 'Autocall Crédit Agricole 2025',
    content: {
      hero: { title: "Autocall Crédit Agricole 2025", subtitle: "Produit structuré adossé au Crédit Agricole" },
      seo: { metaTitle: "Autocall Crédit Agricole 2025 | Azalée Patrimoine", metaDescription: "Découvrez le produit structuré Autocall Crédit Agricole 2025." }
    }
  },
  {
    path: 'placements/produits-structures/energie-degressive-2025',
    title: 'Énergie Dégressive 2025',
    content: {
      hero: { title: "Énergie Dégressive 2025", subtitle: "Produit structuré sur le secteur énergétique" },
      seo: { metaTitle: "Énergie Dégressive 2025 | Azalée Patrimoine", metaDescription: "Découvrez le produit structuré Énergie Dégressive 2025." }
    }
  },

  // ==================== OUTILS PAGES ====================
  {
    path: 'outils',
    title: 'Outils et Calculateurs',
    content: {
      hero: { title: "Outils et calculateurs", subtitle: "Des outils pratiques pour gérer votre patrimoine" },
      seo: { metaTitle: "Outils Patrimoniaux | Azalée Patrimoine", metaDescription: "Calculateurs et outils pour votre gestion patrimoniale." }
    }
  },
  {
    path: 'outils-financiers',
    title: 'Outils Financiers',
    content: {
      hero: { title: "Outils financiers", subtitle: "Simulateurs et calculateurs financiers" },
      seo: { metaTitle: "Outils Financiers | Azalée Patrimoine", metaDescription: "Simulateurs et calculateurs pour vos décisions financières." }
    }
  },

  // ==================== MAIN PAGES ====================
  {
    path: 'contact',
    title: 'Contact',
    content: {
      hero: { title: "Contactez-nous", subtitle: "Nos experts sont à votre disposition" },
      seo: { metaTitle: "Contact | Azalée Patrimoine", metaDescription: "Contactez Azalée Patrimoine pour un conseil patrimonial personnalisé." }
    }
  },
  {
    path: 'notre-approche',
    title: 'Notre Approche',
    content: {
      hero: { title: "Notre approche", subtitle: "Un accompagnement sur-mesure pour votre patrimoine" },
      seo: { metaTitle: "Notre Approche | Azalée Patrimoine", metaDescription: "Découvrez l'approche personnalisée d'Azalée Patrimoine." }
    }
  },
  {
    path: 'nos-courtiers',
    title: 'Nos Courtiers',
    content: {
      hero: { title: "Nos courtiers partenaires", subtitle: "Un réseau d'experts à votre service" },
      seo: { metaTitle: "Nos Courtiers | Azalée Patrimoine", metaDescription: "Découvrez notre réseau de courtiers partenaires." }
    }
  },
  {
    path: 'mentions-legales',
    title: 'Mentions Légales',
    content: {
      hero: { title: "Mentions légales", subtitle: "Informations légales du site" },
      seo: { metaTitle: "Mentions Légales | Azalée Patrimoine", metaDescription: "Mentions légales du site Azalée Patrimoine." }
    }
  },
  {
    path: 'conditions-generales',
    title: 'Conditions Générales',
    content: {
      hero: { title: "Conditions générales", subtitle: "Conditions générales d'utilisation" },
      seo: { metaTitle: "CGU | Azalée Patrimoine", metaDescription: "Conditions générales d'utilisation du site Azalée Patrimoine." }
    }
  },
  {
    path: 'espace-client',
    title: 'Espace Client',
    content: {
      hero: { title: "Espace client", subtitle: "Accédez à votre espace personnel" },
      seo: { metaTitle: "Espace Client | Azalée Patrimoine", metaDescription: "Connectez-vous à votre espace client Azalée Patrimoine." }
    }
  }
];

async function addPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    let added = 0;
    let updated = 0;
    let errors = 0;
    
    for (const page of pagesToAdd) {
      try {
        const existingPage = await PageContent.findOne({ path: page.path });
        
        if (existingPage) {
          existingPage.title = page.title;
          existingPage.content = page.content;
          existingPage.lastModified = new Date();
          await existingPage.save();
          console.log(`📝 Updated: /${page.path}`);
          updated++;
        } else {
          const newPage = new PageContent({
            path: page.path,
            title: page.title,
            content: page.content,
            published: true,
            lastModified: new Date()
          });
          await newPage.save();
          console.log(`✅ Added: /${page.path}`);
          added++;
        }
      } catch (error) {
        console.log(`❌ Error with /${page.path}: ${error.message}`);
        errors++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Added: ${added} pages`);
    console.log(`   Updated: ${updated} pages`);
    console.log(`   Errors: ${errors}`);
    
    const allPages = await PageContent.find({}).sort({ path: 1 });
    console.log(`\n📋 Total CMS Pages: ${allPages.length}`);
    
    // Summary by category
    const categories = {};
    allPages.forEach(page => {
      const category = page.path.split('/')[0] || 'root';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    console.log('\n📁 By Category:');
    for (const [cat, count] of Object.entries(categories).sort()) {
      console.log(`   ${cat}: ${count} pages`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addPages();


