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

// Header content structure
const headerContent = {
  topBar: {
    contact: {
      phone: {
        number: "01 53 45 85 00",
        link: "tel:+33153458500",
        icon: "/images/img_component_1.svg"
      },
      email: {
        address: "contact@azalee-patrimoine.fr",
        link: "mailto:contact@azalee-patrimoine.fr",
        icon: "/images/img_component_1_light_green_400.svg"
      }
    },
    social: {
      linkedin: {
        url: "https://www.linkedin.com/company/azalee-patrimoine",
        text: "Suivez-nous"
      }
    },
    espaceClient: {
      text: "Espace client",
      path: "/espace-client"
    }
  },
  logo: {
    src: "/images/azalee-patrimoine3.webp",
    alt: "Azalée Patrimoine Logo"
  },
  menuItems: {
    fiscalite: {
      title: "Fiscalité",
      path: "/fiscalite",
      items: [
        {
          title: "Impôt sur le revenu",
          path: "/fiscalite/impot-sur-le-revenu",
          subItems: [
            { title: "Déclaration d'impôts", path: "/fiscalite/declaration-impots" },
            { title: "Tranches, barèmes, plafonds", path: "/fiscalite/tranches-baremes-plafonds" },
            { title: "Lois fiscales", path: "/fiscalite/lois-fiscales" }
          ]
        },
        {
          title: "Réductions d'impôt / déficit foncier",
          path: "/fiscalite/reductions-impot-deficit-foncier"
        },
        {
          title: "Fiscalité des placements",
          path: "/fiscalite/fiscalite-placements",
          subItems: [
            { title: "PFU", path: "/fiscalite/pfu" },
            { title: "TMI et prélèvements sociaux", path: "/fiscalite/tmi-prelevements-sociaux" }
          ]
        }
      ]
    },
    immobilier: {
      title: "Immobilier",
      path: "/immobilier",
      items: [
        { title: "Immobilier neuf", path: "/immobilier/immobilier-neuf" },
        { title: "VEFA", path: "/immobilier/vefa" },
        { title: "Investissement locatif", path: "/immobilier/investissement-locatif" },
        { title: "SCI", path: "/immobilier/sci" }
      ]
    },
    placements: {
      title: "Placements",
      path: "/placements",
      items: [
        { title: "Assurance-vie", path: "/placements/assurance-vie" },
        { title: "Compte titres ordinaires", path: "/placements/compte-titres" },
        { title: "SCPI / OPCI", path: "/placements/scpi-opci" },
        { title: "PEA / PER", path: "/placements/pea-per" }
      ]
    },
    retraite: {
      title: "Retraite",
      path: "/retraite",
      items: [
        { title: "Plans retraite PER/PERP/PEE etc.", path: "/retraite/plan-retraite" },
        { title: "Rachat de trimestres", path: "/retraite/rachat-trimestres" },
        { title: "Simulation retraite", path: "/retraite/simulation" }
      ]
    },
    patrimoine: {
      title: "Patrimoine",
      path: "/patrimoine",
      items: [
        { title: "Succession, héritage", path: "/patrimoine/succession-heritage" },
        { title: "Donation à titre gratuit", path: "/patrimoine/donation-gratuite" },
        { title: "Bilan patrimonial", path: "/patrimoine/bilan" }
      ]
    },
    outils: {
      title: "Outils",
      path: "/outils",
      items: [
        { title: "Guide de défiscalisation", path: "/outils-financiers/guide-defiscalisation" },
        { title: "Calculatrice d'impôts", path: "/outils/calculatrice-impots" },
        { title: "Calculs financiers divers", path: "/outils/calculs-financiers" }
      ]
    }
  },
  contactButton: {
    text: "Contact",
    path: "/contact"
  }
};

// Deep merge function
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else if (Array.isArray(source[key])) {
        output[key] = source[key];
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

async function initHeaderContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    const existingPage = await PageContent.findOne({ path: 'header' });

    if (existingPage) {
      // Merge with existing content
      const mergedContent = mergeDeep(existingPage.content || {}, headerContent);
      existingPage.content = mergedContent;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Header content updated (merged with existing)');
    } else {
      // Create new page
      const newPage = new PageContent({
        path: 'header',
        title: 'Header / Navigation',
        content: headerContent,
        published: true,
        lastModified: new Date()
      });
      await newPage.save();
      console.log('✅ Header content created');
    }

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

initHeaderContent();

