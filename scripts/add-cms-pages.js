// Add multiple pages to CMS database
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

// Pages to add to CMS
const pagesToAdd = [
  // Fiscalite pages
  {
    path: 'fiscalite/loi-malraux',
    title: 'Loi Malraux - Défiscalisation immobilière',
    content: {
      hero: {
        title: "Loi Malraux",
        subtitle: "Restaurer des biens immobiliers situés dans des secteurs historiques",
        description: "La loi Malraux offre une réduction d'impôt sur le montant des travaux engagés (22 à 30%). Un dispositif fiscal d'excellence pour investisseurs hauts revenus amateurs de pierre de caractère, avec une stratégie de conservation long terme."
      },
      overview: {
        title: "Présentation de la loi Malraux",
        description: "La loi Malraux est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits.",
        keyPoints: [
          "Réduction d'impôt de 22 à 30%",
          "Sur le montant des travaux engagés",
          "Immeuble situé en SPR, PSMV ou QAD",
          "Travaux encadrés par architecte des Bâtiments de France"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "22 à 30% du montant des travaux", percentage: "22-30%" },
          { title: "Plafond de travaux", description: "400 000€ par période de 4 ans", amount: "400k€" },
          { title: "Durée d'engagement", description: "9 ans minimum", duration: "9 ans" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier de la Loi Malraux, plusieurs conditions doivent être respectées :",
        points: [
          "Immeuble situé en SPR, PSMV ou QAD",
          "Travaux encadrés par architecte des Bâtiments de France",
          "Engagement de location de 9 ans minimum",
          "Respect des normes patrimoniales"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Malraux.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Loi Malraux | Azalée Patrimoine",
        metaDescription: "La loi Malraux offre une réduction d'impôt sur le montant des travaux engagés (22 à 30%). Dispositif fiscal d'excellence pour investisseurs hauts revenus."
      }
    }
  },
  {
    path: 'fiscalite/monument-historique',
    title: 'Monument Historique - Défiscalisation',
    content: {
      hero: {
        title: "Monument Historique",
        subtitle: "Investir dans le patrimoine historique français",
        description: "Le dispositif Monument Historique permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits."
      },
      overview: {
        title: "Présentation du dispositif Monument Historique",
        description: "Le dispositif Monument Historique est un mécanisme de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits.",
        keyPoints: [
          "Réduction d'impôt de 22 à 30%",
          "Sur le montant des travaux engagés",
          "Monument classé ou inscrit",
          "Travaux encadrés par architecte des Bâtiments de France"
        ]
      },
      benefits: {
        title: "Avantages fiscaux",
        benefits: [
          { title: "Réduction d'impôt", description: "22 à 30% du montant des travaux", percentage: "22-30%" },
          { title: "Plafond de travaux", description: "400 000€ par période de 4 ans", amount: "400k€" },
          { title: "Durée d'engagement", description: "9 ans minimum", duration: "9 ans" }
        ]
      },
      conditions: {
        title: "Conditions d'éligibilité",
        description: "Pour bénéficier du dispositif Monument Historique, plusieurs conditions doivent être respectées :",
        points: [
          "Monument classé ou inscrit",
          "Travaux encadrés par architecte des Bâtiments de France",
          "Engagement de location de 9 ans minimum",
          "Respect des normes patrimoniales"
        ]
      },
      cta: {
        title: "Besoin d'aide pour votre investissement ?",
        description: "Nos experts vous accompagnent dans votre projet d'investissement Monument Historique.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Monument Historique | Azalée Patrimoine",
        metaDescription: "Le dispositif Monument Historique permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits."
      }
    }
  },
  {
    path: 'fiscalite/reductions-impot-deficit-foncier',
    title: 'Déficit Foncier et Réductions d\'Impôt',
    content: {
      hero: {
        title: "Déficit foncier et réductions d'impôt",
        subtitle: "Un levier fiscal puissant pour investisseurs avertis",
        description: "Pour les investisseurs disposant de revenus fonciers imposables ou d'une tranche marginale d'imposition (TMI) élevée, le déficit foncier permet une double optimisation."
      },
      quickStats: {
        title: "Chiffres clés",
        stats: [
          { label: "Déficit foncier", value: "10 700€", description: "Plafond annuel déductible" },
          { label: "Report", value: "10 ans", description: "Sur revenus fonciers" },
          { label: "Rendement fiscal", value: "58%", description: "TMI 41% + CSG/CRDS" }
        ]
      },
      comparison: {
        title: "Réduction d'impôt ou déduction du revenu ?",
        description: "Comprendre la différence entre les deux mécanismes fiscaux"
      },
      investorProfile: {
        title: "Qui peut en profiter ?",
        description: "Le déficit foncier s'adresse à des investisseurs spécifiques",
        profiles: [
          "Propriétaires de biens locatifs déjà imposables au régime réel",
          "Contribuables avec une TMI élevée (30% ou plus)",
          "Investisseurs souhaitant valoriser des biens anciens avec travaux"
        ]
      },
      conditions: {
        title: "Conditions pour créer un déficit foncier",
        description: "Les conditions spécifiques à respecter pour bénéficier du déficit foncier",
        conditions: [
          "Bien en location nue (non meublée), soumis au régime réel",
          "Travaux éligibles : entretien, réparation, amélioration",
          "Pas d'agrandissement ni de construction neuve",
          "Travaux réellement payés et effectués avant d'être mis en location"
        ]
      },
      cta: {
        title: "Besoin d'aide pour optimiser votre fiscalité ?",
        description: "Nos experts vous accompagnent dans votre stratégie de déficit foncier et réductions d'impôt.",
        buttonText: "Demander une consultation gratuite"
      },
      seo: {
        metaTitle: "Déficit Foncier et Réductions d'Impôt | Azalée Patrimoine",
        metaDescription: "Le déficit foncier permet une double optimisation : réduction de l'impôt sur le revenu et diminution des prélèvements sociaux sur les revenus fonciers."
      }
    }
  },
  // Patrimoine pages
  {
    path: 'patrimoine/conseils',
    title: 'Conseils Patrimoniaux',
    content: {
      hero: {
        title: "Conseils patrimoniaux",
        subtitle: "Le patrimoine n'est pas qu'une addition de biens immobiliers et financiers.",
        description: "C'est un ensemble cohérent qui doit être construit, protégé, optimisé fiscalement et transmis."
      },
      pillars: {
        title: "Les piliers d'une stratégie patrimoniale réussie",
        subtitle: "Découvrez les 4 piliers fondamentaux d'une gestion patrimoniale optimale",
        items: [
          { title: "L'immobilier", description: "Résidence principale, secondaire, locatif" },
          { title: "L'assurance-vie", description: "Placement préféré des Français, souple et polyvalent" },
          { title: "Les produits financiers", description: "PEA / CTO, PER, allocation dynamique ou sécurisée" },
          { title: "La transmission et la fiscalité", description: "Anticiper les droits de succession" }
        ]
      },
      example: {
        title: "Exemple concret d'arbitrage patrimonial",
        description: "Un couple de 55 ans, 2 enfants, patrimoine de 1,8 M€"
      },
      value: {
        title: "La valeur ajoutée Azalée Patrimoine",
        description: "Chez Azalée Patrimoine, nos conseils vont au-delà du produit"
      },
      cta: {
        title: "Prêt à optimiser votre patrimoine ?",
        description: "Nos experts vous accompagnent pour construire une stratégie patrimoniale cohérente et durable."
      },
      seo: {
        metaTitle: "Conseils Patrimoniaux | Azalée Patrimoine",
        metaDescription: "Bénéficiez de conseils patrimoniaux personnalisés pour construire, protéger et transmettre votre patrimoine."
      }
    }
  },
  {
    path: 'patrimoine/donation-onereuse',
    title: 'Donation à titre onéreux',
    content: {
      hero: {
        title: "Donation à titre onéreux & donation de la nue-propriété",
        subtitle: "Une donation à titre onéreux est une donation assortie de charges ou contreparties pour le bénéficiaire.",
        description: "Ce mécanisme permet de transmettre tout en conservant un contrôle ou en fixant des conditions adaptées à la situation familiale et patrimoniale."
      },
      forms: {
        title: "Les formes de donations à titre onéreux",
        subtitle: "Découvrez les 2 principales formes de donations à titre onéreux",
        items: [
          { title: "Donation avec charges", description: "Obligations pour le bénéficiaire" },
          { title: "Donation de la nue-propriété", description: "Conservation de l'usufruit" }
        ]
      },
      bareme: {
        title: "Barème fiscal (article 669 CGI)",
        subtitle: "La valeur de la nue-propriété dépend de l'âge du donateur"
      },
      avantages: {
        title: "Intérêts de la donation à titre onéreux",
        subtitle: "Découvrez les 4 principaux avantages",
        items: [
          { title: "Transmission progressive", description: "Sans tout donner d'un coup" },
          { title: "Optimisation fiscale", description: "Grâce au démembrement" },
          { title: "Maîtrise du bien", description: "Loyers, usage, décisions" },
          { title: "Sécurise la transmission", description: "Évite les conflits" }
        ]
      },
      cta: {
        title: "Prêt à optimiser votre transmission patrimoniale ?",
        description: "Nos experts vous accompagnent pour mettre en place la stratégie de donation la plus adaptée."
      },
      seo: {
        metaTitle: "Donation à titre onéreux | Azalée Patrimoine",
        metaDescription: "Découvrez la donation à titre onéreux et la donation de la nue-propriété pour optimiser votre transmission patrimoniale."
      }
    }
  },
  // Placements pages
  {
    path: 'placements/produits-structures',
    title: 'Produits Structurés',
    content: {
      hero: {
        title: "Comprendre les produits structurés",
        subtitle: "Un contrat à géométrie maîtrisée pour votre patrimoine"
      },
      definition: {
        title: "Définition d'une UCS",
        description: "Une UCS est un engagement contractuel définissant à l'avance le sous-jacent, le rendement, l'horizon de placement, la protection du capital et les règles de liquidité."
      },
      elements: {
        title: "Les éléments clés d'un produit structuré",
        items: [
          { title: "Le sous-jacent", description: "La référence sur laquelle repose la performance" },
          { title: "Le rendement", description: "Fixe ou conditionnel" },
          { title: "L'horizon de placement", description: "3 à 8 ans généralement" },
          { title: "La protection du capital", description: "Totale, partielle ou conditionnelle" },
          { title: "Les règles de liquidité", description: "Conditions de sortie anticipée" }
        ]
      },
      families: {
        title: "Les principales familles de produits structurés",
        items: [
          { title: "Le Phoenix", description: "Rendement conditionnel avec coupons périodiques" },
          { title: "L'Athena", description: "Rendement capitalisé versé à l'échéance" },
          { title: "L'Autocall", description: "Sortie automatique si performance cible atteinte" }
        ]
      },
      selection: {
        title: "La sélection de produits structurés d'AZALEE pour le 2025/2026"
      },
      seo: {
        metaTitle: "Produits Structurés | Azalée Patrimoine",
        metaDescription: "Découvrez les produits structurés : UCS, Phoenix, Athena, Autocall. Un contrat à géométrie maîtrisée pour votre patrimoine."
      }
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
          // Update existing page
          existingPage.title = page.title;
          existingPage.content = page.content;
          existingPage.lastModified = new Date();
          await existingPage.save();
          console.log(`📝 Updated: /${page.path}`);
          updated++;
        } else {
          // Create new page
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
    
    console.log('\n' + '='.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   Added: ${added} pages`);
    console.log(`   Updated: ${updated} pages`);
    console.log(`   Errors: ${errors}`);
    
    // List all pages
    const allPages = await PageContent.find({}).sort({ path: 1 }).select('path title');
    console.log(`\n📋 Total CMS Pages: ${allPages.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addPages();


