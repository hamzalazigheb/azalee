// Script to initialize retraite sub-pages in MongoDB CMS
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define PageContent schema
const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, trim: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String, default: 'admin' }
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Retraite sub-pages content
const retraiteSubPages = [
  {
    path: 'retraite/plan-retraite',
    title: "Plans d'épargne retraite - PER, PERP, PERCO, Madelin",
    content: {
      hero: {
        h1: "Plan d'Épargne Retraite : PER, PERP, PERCO, Madelin, Préfon",
        subtitle: "Quel dispositif choisir selon votre profil ?",
        description: "Découvrez les solutions d'épargne retraite adaptées à votre statut et optimisez votre préparation à la retraite.",
        ctaButton: "Demander un diagnostic gratuit",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Comprendre les différents dispositifs",
        description: "Préparer sa retraite, c'est anticiper la baisse de revenus qui survient au moment du départ de la vie active. Plusieurs solutions d'épargne retraite existent : le PER, l'ancien PERP, le PERCO d'entreprise, le contrat Madelin pour les indépendants, ou encore Préfon Retraite pour les fonctionnaires."
      },
      section2: {
        h2: "Le PER : le nouveau standard",
        description: "Depuis la loi PACTE, le PER (Plan d'Épargne Retraite) remplace progressivement les anciens dispositifs. Il offre une grande flexibilité : versements volontaires, transfert des anciens contrats, sortie en capital ou en rente."
      },
      section3: {
        h2: "Les anciens dispositifs",
        perp: {
          title: "Le PERP",
          description: "Le Plan d'Épargne Retraite Populaire permettait de se constituer une rente viagère. Il n'est plus commercialisé depuis 2020 mais les contrats existants restent actifs."
        },
        perco: {
          title: "Le PERCO",
          description: "Le Plan d'Épargne pour la Retraite Collectif était un dispositif d'entreprise permettant de capitaliser avec abondement de l'employeur."
        },
        madelin: {
          title: "Le contrat Madelin",
          description: "Destiné aux travailleurs non-salariés (TNS), il permettait de déduire les cotisations du revenu imposable."
        }
      },
      ctaFinal: {
        h2: "Besoin d'aide pour choisir ?",
        description: "Nos experts Azalée Patrimoine vous accompagnent dans le choix du dispositif le plus adapté à votre situation.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  {
    path: 'retraite/prevoyance-protection',
    title: "Prévoyance et Protection Familiale",
    content: {
      hero: {
        h1: "Prévoyance et Protection Familiale",
        subtitle: "Protégez vos proches face aux aléas de la vie",
        description: "Les contrats de prévoyance individuelle couvrent le décès, l'invalidité ou la perte de revenus, garantissant à vos proches une stabilité financière.",
        ctaButton: "Demander un diagnostic gratuit",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Pourquoi la prévoyance est essentielle",
        description: "L'un des piliers essentiels d'une retraite réussie, c'est la protection de la famille face aux aléas de la vie. Un accident, une maladie grave ou un décès peuvent mettre en péril l'équilibre financier de vos proches."
      },
      section2: {
        h2: "Les solutions de prévoyance",
        garanties: [
          { title: "Garantie décès", description: "Versement d'un capital ou d'une rente au conjoint et aux enfants" },
          { title: "Garantie invalidité", description: "Compensation de la perte de revenus en cas d'incapacité de travail" },
          { title: "Garantie incapacité", description: "Maintien de revenus pendant une période d'arrêt de travail" }
        ]
      },
      section3: {
        h2: "Adapter la prévoyance à votre statut",
        salarie: "Les salariés bénéficient souvent d'une prévoyance d'entreprise, mais elle peut être insuffisante.",
        tns: "Les travailleurs non-salariés (TNS) doivent souscrire une prévoyance individuelle adaptée à leur situation.",
        dirigeant: "Les dirigeants peuvent optimiser leur prévoyance via des contrats spécifiques (homme-clé, garantie croisée)."
      },
      ctaFinal: {
        h2: "Protégez votre famille",
        description: "Azalée Patrimoine vous accompagne dans la mise en place de solutions de prévoyance personnalisées.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  {
    path: 'retraite/rachat-trimestres',
    title: "Rachat de trimestres - Optimiser sa fin de carrière",
    content: {
      hero: {
        h1: "Rachat de trimestres",
        subtitle: "Optimiser sa fin de carrière et éviter la décote",
        description: "Le rachat de trimestres peut être avantageux pour réduire la décote appliquée en cas de carrière incomplète.",
        ctaButton: "Demander un diagnostic gratuit",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Qu'est-ce que le rachat de trimestres ?",
        description: "Le rachat de trimestres consiste à verser une somme à l'administration pour compléter des années incomplètes (études supérieures, années à l'étranger, début de carrière) et atteindre le taux plein plus tôt."
      },
      section2: {
        h2: "Est-ce rentable ?",
        description: "L'intérêt du rachat dépend de votre âge, de votre taux marginal d'imposition et de votre durée d'activité restante. Le coût peut être déductible fiscalement.",
        avantages: [
          "Éviter une décote sur la pension de base",
          "Partir plus tôt à la retraite",
          "Bénéficier d'une déduction fiscale immédiate"
        ],
        inconvenients: [
          "Coût parfois élevé selon l'âge",
          "Aucune flexibilité une fois le rachat effectué",
          "Rentabilité à calculer au cas par cas"
        ]
      },
      section3: {
        h2: "Rachat vs PER : quelle stratégie ?",
        description: "Pour les profils patrimoniaux, il est souvent plus judicieux de maximiser d'abord les versements PER, puis de racheter seulement les trimestres manquants si cela permet un départ anticipé sans décote."
      },
      ctaFinal: {
        h2: "Besoin d'une étude personnalisée ?",
        description: "Nos conseillers vous aident à déterminer si un rachat de trimestres est fiscalement et financièrement pertinent.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  {
    path: 'retraite/retraite-progressive',
    title: "La Retraite Progressive",
    content: {
      hero: {
        h1: "La Retraite Progressive",
        subtitle: "Réduire son activité tout en percevant une partie de sa pension",
        description: "La retraite progressive permet de combiner temps partiel et pension de retraite pour une transition en douceur.",
        ctaButton: "Demander un diagnostic gratuit",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Qu'est-ce que la retraite progressive ?",
        description: "La retraite progressive est un dispositif qui permet aux salariés et indépendants de réduire leur activité professionnelle tout en percevant une fraction de leur pension de retraite."
      },
      section2: {
        h2: "Les conditions d'accès",
        conditions: [
          "Avoir au moins 60 ans",
          "Justifier d'au moins 150 trimestres de cotisation",
          "Exercer une activité à temps partiel (entre 40% et 80% du temps complet)"
        ]
      },
      section3: {
        h2: "Les avantages",
        avantages: [
          "Transition en douceur vers la retraite",
          "Maintien d'une activité professionnelle à temps réduit",
          "Continuité des cotisations pour améliorer la pension définitive",
          "Complément de revenus immédiat"
        ]
      },
      ctaFinal: {
        h2: "La retraite progressive est-elle faite pour vous ?",
        description: "Nos experts analysent votre situation pour déterminer si ce dispositif est adapté à vos objectifs.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  {
    path: 'retraite/simulation',
    title: "Simulation Retraite - Estimez votre future pension",
    content: {
      hero: {
        h1: "Simulation Retraite",
        subtitle: "Estimez votre future pension et anticipez vos besoins",
        description: "Avant toute stratégie, il est essentiel de connaître le montant prévisionnel de votre pension de retraite.",
        ctaButton: "Demander une simulation personnalisée",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Pourquoi simuler sa retraite ?",
        description: "Connaître sa future pension permet d'anticiper l'écart de revenus et de mettre en place les solutions adaptées pour maintenir son niveau de vie."
      },
      section2: {
        h2: "Ce que nous analysons",
        elements: [
          "Votre relevé de carrière complet",
          "Vos droits acquis dans chaque régime",
          "L'impact des réformes sur votre situation",
          "Le taux de remplacement prévu"
        ]
      },
      section3: {
        h2: "Notre accompagnement",
        description: "Azalée Patrimoine vous accompagne dans la lecture de vos relevés de carrière et la simulation personnalisée de votre retraite. Nous identifions les leviers d'optimisation possibles."
      },
      ctaFinal: {
        h2: "Obtenez votre simulation personnalisée",
        description: "Prenez rendez-vous avec un conseiller pour une analyse complète de votre situation retraite.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  },
  {
    path: 'retraite/autre',
    title: "Autres Solutions Retraite",
    content: {
      hero: {
        h1: "Autres Solutions Retraite",
        subtitle: "Découvrez les alternatives pour préparer votre retraite",
        description: "Au-delà des dispositifs classiques, d'autres solutions peuvent compléter votre stratégie retraite.",
        ctaButton: "Demander un diagnostic gratuit",
        ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      section1: {
        h2: "Le cumul emploi-retraite",
        description: "Le cumul emploi-retraite permet de cumuler une pension de retraite avec des revenus d'activité professionnelle, sous certaines conditions."
      },
      section2: {
        h2: "La retraite à l'étranger",
        description: "Partir vivre à l'étranger à la retraite implique des choix fiscaux et patrimoniaux importants. Nous vous accompagnons dans cette transition."
      },
      section3: {
        h2: "Les solutions alternatives",
        solutions: [
          { title: "Immobilier locatif", description: "Générer des revenus complémentaires durables" },
          { title: "SCPI", description: "Investir dans l'immobilier sans gestion" },
          { title: "Assurance-vie", description: "Capitaliser avec flexibilité" },
          { title: "Produits structurés", description: "Optimiser le rendement avec protection du capital" }
        ]
      },
      ctaFinal: {
        h2: "Explorez toutes les options",
        description: "Nos experts vous présentent l'ensemble des solutions adaptées à votre profil.",
        button: "Prendre rendez-vous",
        link: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    }
  }
];

async function initRetraiteSubPages() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📝 Initializing retraite sub-pages...\n');

    for (const page of retraiteSubPages) {
      const existing = await PageContent.findOne({ path: page.path });
      
      if (existing) {
        console.log(`⚠️  Page "${page.path}" already exists - skipping`);
      } else {
        const newPage = new PageContent({
          path: page.path,
          title: page.title,
          content: page.content,
          published: true,
          modifiedBy: 'admin'
        });
        
        await newPage.save();
        console.log(`✅ Created: ${page.path}`);
      }
    }

    console.log('\n📋 All retraite pages in database:');
    const allRetraitePages = await PageContent.find({ path: /^retraite/ });
    allRetraitePages.forEach((page, index) => {
      console.log(`   ${index + 1}. ${page.path} - ${page.title}`);
    });

    console.log('\n🎉 Retraite sub-pages initialization complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

initRetraiteSubPages();

