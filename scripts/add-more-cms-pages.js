// Add more pages to CMS database
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
  // Placements pages
  {
    path: 'placements/livret',
    title: 'Livrets Réglementés',
    content: {
      hero: {
        title: "Livrets réglementés (Livret A, LDDS, LEP, PEL…) : utiles mais pas suffisants",
        description: "Les livrets réglementés font partie des placements préférés des Français. Sécurisés, liquides et garantis par l'État."
      },
      types: {
        title: "Les différents livrets",
        items: [
          { title: "Livret A", description: "Le plus populaire des livrets d'épargne" },
          { title: "LDDS", description: "Livret de Développement Durable et Solidaire" },
          { title: "LEP", description: "Livret d'Épargne Populaire" },
          { title: "PEL", description: "Plan Épargne Logement" }
        ]
      },
      seo: {
        metaTitle: "Livrets Réglementés | Azalée Patrimoine",
        metaDescription: "Découvrez les livrets réglementés : Livret A, LDDS, LEP, PEL. Avantages, limites et stratégie patrimoniale."
      }
    }
  },
  {
    path: 'placements/assurance-vie',
    title: 'Assurance-Vie',
    content: {
      hero: {
        title: "Assurance-vie : l'enveloppe incontournable",
        subtitle: "L'assurance-vie est le placement préféré des Français, avec près de 1 900 milliards d'euros d'encours.",
        description: "Son intérêt dépasse le rendement financier : il tient surtout à sa fiscalité avantageuse et à sa souplesse en matière de transmission."
      },
      enveloppe: {
        title: "L'assurance-vie comme enveloppe fiscale",
        description: "Une assurance-vie n'est pas un placement en soi mais une enveloppe qui peut contenir différents supports.",
        contenus: [
          "un fonds en euros sécurisé (capital garanti)",
          "des unités de compte (UC) : actions, ETF, SCPI, obligations, produits structurés…"
        ]
      },
      fiscalite: {
        title: "La fiscalité des rachats (retraits)",
        description: "Lorsque vous retirez de l'argent de votre contrat, seule la part des gains est imposée."
      },
      seo: {
        metaTitle: "Assurance-Vie | Azalée Patrimoine",
        metaDescription: "Tout savoir sur l'assurance-vie : fiscalité, succession, rendement. L'enveloppe incontournable pour votre patrimoine."
      }
    }
  },
  {
    path: 'placements/scpi-opci',
    title: 'SCPI / OPCI - Pierre Papier',
    content: {
      hero: {
        title: "SCPI / OPCI : l'immobilier papier accessible",
        description: "Investir dans l'immobilier sans les contraintes de gestion grâce aux SCPI et OPCI."
      },
      avantages: {
        title: "Les avantages de la pierre papier",
        items: [
          "Mutualisation des risques",
          "Revenus réguliers (trimestriels)",
          "Accessibilité (dès quelques milliers d'euros)",
          "Aucune gestion locative"
        ]
      },
      comparaison: {
        title: "SCPI vs OPCI",
        scpi: "Société Civile de Placement Immobilier - investissement 100% immobilier",
        opci: "Organisme de Placement Collectif Immobilier - mix immobilier + financier"
      },
      seo: {
        metaTitle: "SCPI OPCI | Azalée Patrimoine",
        metaDescription: "Investir en SCPI et OPCI : rendement moyen 5.8%, diversification immobilière sans gestion."
      }
    }
  },
  {
    path: 'placements/assurance-vie-luxembourg',
    title: 'Assurance-Vie Luxembourg',
    content: {
      hero: {
        title: "Assurance-vie luxembourgeoise : l'enveloppe premium",
        description: "L'assurance-vie luxembourgeoise offre une protection et des options supérieures aux contrats français."
      },
      avantages: {
        title: "Avantages clés",
        items: [
          "Super-privilège (priorité sur tous les créanciers)",
          "Triangle de sécurité",
          "Neutralité fiscale",
          "Multi-devises"
        ]
      },
      seo: {
        metaTitle: "Assurance-Vie Luxembourg | Azalée Patrimoine",
        metaDescription: "Assurance-vie luxembourgeoise : protection supérieure, triangle de sécurité, multi-devises."
      }
    }
  },
  {
    path: 'placements/pea-per',
    title: 'PEA et PER',
    content: {
      hero: {
        title: "PEA et PER : les enveloppes fiscales stratégiques",
        description: "Optimisez votre fiscalité avec le PEA (actions européennes) et le PER (épargne retraite)."
      },
      pea: {
        title: "Plan d'Épargne en Actions (PEA)",
        description: "Enveloppe dédiée aux actions européennes avec exonération d'impôt après 5 ans."
      },
      per: {
        title: "Plan Épargne Retraite (PER)",
        description: "Déduction des versements du revenu imposable + capitalisation jusqu'à la retraite."
      },
      seo: {
        metaTitle: "PEA et PER | Azalée Patrimoine",
        metaDescription: "PEA et PER : optimisez votre fiscalité avec ces enveloppes stratégiques pour votre patrimoine."
      }
    }
  },
  // More patrimoine pages
  {
    path: 'patrimoine/bilan',
    title: 'Bilan Patrimonial',
    content: {
      hero: {
        title: "Bilan patrimonial complet",
        description: "Faites le point sur votre situation patrimoniale avec nos experts."
      },
      elements: {
        title: "Ce que comprend un bilan patrimonial",
        items: [
          "Inventaire de vos actifs",
          "Analyse de votre fiscalité",
          "Étude de votre situation familiale",
          "Recommandations personnalisées"
        ]
      },
      seo: {
        metaTitle: "Bilan Patrimonial | Azalée Patrimoine",
        metaDescription: "Réalisez votre bilan patrimonial complet avec Azalée Patrimoine. Analyse personnalisée et recommandations."
      }
    }
  },
  {
    path: 'patrimoine/donation-gratuite',
    title: 'Donation à titre gratuit',
    content: {
      hero: {
        title: "Donation à titre gratuit",
        description: "Transmettre de son vivant sans contrepartie : les règles et stratégies optimales."
      },
      types: {
        title: "Les différentes formes de donations gratuites",
        items: [
          "Don manuel",
          "Donation simple",
          "Donation-partage",
          "Donation entre époux"
        ]
      },
      seo: {
        metaTitle: "Donation Gratuite | Azalée Patrimoine",
        metaDescription: "Tout savoir sur la donation à titre gratuit : types, fiscalité, stratégies de transmission."
      }
    }
  },
  {
    path: 'patrimoine/transmission',
    title: 'Transmission de Patrimoine',
    content: {
      hero: {
        title: "Transmission de patrimoine : anticipez pour mieux transmettre",
        description: "Optimiser la transmission de votre patrimoine à vos proches."
      },
      strategies: {
        title: "Les leviers de la transmission",
        items: [
          "Donations avec abattements",
          "Assurance-vie",
          "Démembrement de propriété",
          "Pacte Dutreil"
        ]
      },
      seo: {
        metaTitle: "Transmission de Patrimoine | Azalée Patrimoine",
        metaDescription: "Anticipez la transmission de votre patrimoine. Donations, assurance-vie, démembrement."
      }
    }
  },
  {
    path: 'patrimoine/succession-heritage',
    title: 'Succession et Héritage',
    content: {
      hero: {
        title: "Succession et héritage : comprendre pour mieux anticiper",
        description: "Règles de succession, droits des héritiers et optimisation fiscale."
      },
      regles: {
        title: "Les règles de la succession en France",
        description: "Ordre des héritiers, réserve héréditaire, quotité disponible."
      },
      seo: {
        metaTitle: "Succession et Héritage | Azalée Patrimoine",
        metaDescription: "Comprendre la succession en France : règles, droits des héritiers, optimisation fiscale."
      }
    }
  },
  {
    path: 'patrimoine/protection-famille',
    title: 'Protection de la Famille',
    content: {
      hero: {
        title: "Protection de la famille",
        description: "Protéger vos proches : assurance décès, mandat de protection, prévoyance."
      },
      outils: {
        title: "Les outils de protection",
        items: [
          "Assurance décès",
          "Mandat de protection future",
          "Donation au dernier vivant",
          "Contrats de prévoyance"
        ]
      },
      seo: {
        metaTitle: "Protection de la Famille | Azalée Patrimoine",
        metaDescription: "Protégez votre famille : assurance décès, prévoyance, mandats de protection."
      }
    }
  },
  {
    path: 'patrimoine/autre',
    title: 'Autres Services Patrimoniaux',
    content: {
      hero: {
        title: "Autres services patrimoniaux",
        description: "Découvrez nos autres services de gestion et conseil patrimonial."
      },
      seo: {
        metaTitle: "Autres Services Patrimoniaux | Azalée Patrimoine",
        metaDescription: "Découvrez tous nos services de gestion et conseil patrimonial."
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
    
    console.log('\n' + '='.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   Added: ${added} pages`);
    console.log(`   Updated: ${updated} pages`);
    console.log(`   Errors: ${errors}`);
    
    const allPages = await PageContent.find({}).sort({ path: 1 }).select('path title');
    console.log(`\n📋 Total CMS Pages: ${allPages.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

addPages();


