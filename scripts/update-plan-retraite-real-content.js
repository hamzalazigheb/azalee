// Script to update plan-retraite with REAL content from the page
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, trim: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now },
  modifiedBy: { type: String, default: 'admin' }
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// REAL content extracted from the actual JSX page
const realPlanRetraiteContent = {
  hero: {
    breadcrumb: ["Accueil", "Retraite", "Plans d'épargne retraite"],
    h1: "Plan d'Épargne Retraite : PER, PERP, PERCO, Madelin, Préfon - quel dispositif choisir selon votre profil ?",
    subtitle: "Découvrez les solutions d'épargne retraite adaptées à votre statut et optimisez votre préparation à la retraite."
  },
  
  section1_introduction: {
    title: "Introduction",
    paragraphs: [
      "Préparer sa retraite, c'est anticiper la baisse de revenus qui survient au moment du départ de la vie active.",
      "Pour maintenir votre niveau de vie, plusieurs solutions d'épargne retraite existent : le PER (Plan d'Épargne Retraite), l'ancien PERP, le PERCO d'entreprise, le contrat Madelin pour les indépendants, ou encore Préfon Retraite pour les fonctionnaires.",
      "Ces solutions vous permettent de transformer votre épargne en revenus durables à la retraite."
    ],
    azaleeMessage: "Chez Azalée Patrimoine, nous vous accompagnons dans le choix du dispositif le plus adapté selon votre statut (salarié, indépendant, fonctionnaire, militaire, dirigeant) pour une retraite sereine et fiscalement optimisée."
  },
  
  section2_differences: {
    sectionTitle: "PER, PERP, PERCO, Madelin, Préfon : comprendre les différences",
    sectionSubtitle: "Découvrez les caractéristiques de chaque dispositif pour faire le meilleur choix selon votre profil",
    
    per: {
      h3: "Le PER : le nouveau standard de l'épargne retraite",
      description: [
        "Depuis la loi PACTE, le PER (Plan d'Épargne Retraite) remplace progressivement les anciens dispositifs comme le PERP, le PERCO et le contrat Madelin (Article 83).",
        "Le PER offre une grande flexibilité : versements volontaires, transfert des anciens contrats, sortie en capital ou en rente."
      ],
      avantages: {
        title: "Ses principaux avantages :",
        list: [
          "Déduction fiscale sur les versements ;",
          "Choix entre gestion pilotée ou libre ;",
          "Possibilité de sortie 100% en capital ;",
          "Clause bénéficiaire souple en cas de décès ;",
          "Intégration dans votre stratégie de revenus complémentaires à la retraite."
        ]
      },
      conclusion: "Le PER est aujourd'hui le produit privilégié des cadres et dirigeants pour préparer une retraite anticipée, sécuriser la transmission et réduire la fiscalité.",
      link: {
        text: "En savoir plus sur le PER individuel",
        url: "/retraite/plan-retraite/per-individuel"
      }
    },
    
    perp_madelin: {
      h3: "Le PERP et le contrat Madelin : les anciens dispositifs encore actifs",
      description: "Les contrats PERP et Madelin restent valides pour ceux qui les détiennent déjà, mais il est souvent plus avantageux de les transférer vers un PER plus moderne.",
      perp: {
        title: "Le PERP (Plan d'Épargne Retraite Populaire)",
        description: "Permettait de constituer une rente viagère, avec des versements déductibles du revenu imposable."
      },
      madelin: {
        title: "Le contrat Madelin",
        description: "Destiné aux travailleurs indépendants et professions libérales, offrait les mêmes avantages fiscaux mais ne permettait qu'une sortie en rente."
      },
      conseil: "💡 Aujourd'hui, un transfert vers un PER permet plus de flexibilité et un meilleur rendement sur la durée."
    },
    
    perco: {
      h3: "Le PERCO et les plans d'épargne entreprise",
      description: [
        "Le PERCO (remplacé par le PERECO) est une solution d'épargne retraite d'entreprise qui permet aux salariés de placer leur participation, leur intéressement ou leurs versements volontaires, souvent abondés par l'employeur.",
        "Des entreprises comme BNP Paribas Retraite Épargne Entreprise proposent des formules collectives performantes."
      ],
      bonASavoir: "Bon à savoir : La prime de départ à la retraite dans le privé peut être investie sur un PERCO/PERECO pour capitaliser sans fiscalité immédiate."
    },
    
    prefon: {
      h3: "La Préfon Retraite : le plan des fonctionnaires",
      description: "La Préfon Retraite est un plan d'épargne retraite complémentaire destiné aux fonctionnaires et assimilés.",
      avantages: {
        title: "Ses avantages :",
        list: [
          "Compense les limites du système public, qui peut être moins avantageux pour les carrières hachées ;",
          "Permet de lisser les droits en cas de mi-temps ou d'interruption de carrière ;",
          "Versements déductibles du revenu imposable."
        ]
      },
      conclusion: "La Préfon offre une sécurité et une continuité pour ceux qui anticipent la stagnation des pensions publiques."
    }
  },
  
  section3_choisir: {
    h2: "Comment choisir son dispositif selon son profil ?",
    
    salaries: {
      h3: "Pour les salariés du privé",
      description: "Privilégiez le PER individuel si vous cherchez flexibilité et optimisation fiscale. Si votre entreprise propose un PERECO avec abondement, profitez-en : c'est de l'argent gratuit.",
      conseil: "Nos conseillers Azalée Patrimoine vous aident à combiner PER individuel et PER d'entreprise pour maximiser l'avantage fiscal et la performance."
    },
    
    independants: {
      h3: "Pour les indépendants et professions libérales",
      description: "Le PERIN (anciennement Madelin) est adapté si vous êtes TNS. Mais le PER individuel reste pertinent pour toute stratégie patrimoniale long terme.",
      conseil: "Chez Azalée Patrimoine, nous adaptons la stratégie selon la structure juridique (entreprise individuelle, SASU, SELARL, etc.)."
    },
    
    dirigeants: {
      h3: "Pour les dirigeants d'entreprise",
      description: "Vous pouvez combiner un PER obligatoire d'entreprise (PERO) pour vos salariés et un PER individuel pour vous-même.",
      avantage: "Avantage : les cotisations versées en entreprise sont déductibles du résultat."
    },
    
    fonctionnaires: {
      h3: "Pour les fonctionnaires",
      description: "La Préfon Retraite reste pertinente, mais un transfert vers un PER peut offrir plus d'options de sortie et une meilleure gestion financière."
    }
  },
  
  section4_fiscalite: {
    h2: "La fiscalité des dispositifs retraite",
    introduction: "Chaque dispositif offre une déduction fiscale à l'entrée, mais avec des limites de déduction propres à chaque profil.",
    
    deduction: {
      title: "Déduction fiscale des versements",
      description: "Les versements sur un PER sont déductibles du revenu imposable dans la limite de 10% des revenus professionnels (nets de cotisations sociales), avec un plafond maximum.",
      exemple: {
        title: "Exemple concret",
        revenus: "Revenus nets : 100 000 €/an",
        plafond: "Plafond déductible : 10 000 €",
        versement: "Versement PER : 10 000 €",
        tmi: "TMI à 41%",
        economie: "Économie d'impôt : 4 100 €",
        coutReel: "Coût réel du versement : 5 900 €"
      }
    },
    
    sortie: {
      title: "Fiscalité à la sortie",
      capital: "En cas de sortie en capital, la part issue des versements volontaires est soumise au barème de l'impôt sur le revenu.",
      rente: "En cas de sortie en rente, celle-ci est imposée selon le régime des pensions.",
      conseil: "Nos experts vous aident à piloter la fiscalité de sortie selon votre situation familiale et patrimoniale."
    }
  },
  
  section5_azalee: {
    h2: "L'accompagnement Azalée Patrimoine",
    introduction: "Chez Azalée Patrimoine, nous accompagnons nos clients dans la sélection et la gestion de leurs dispositifs retraite.",
    
    approche: {
      title: "Notre approche",
      points: [
        "Diagnostic personnalisé : analyse de votre carrière, de vos revenus et de votre fiscalité.",
        "Sélection des produits adaptés : PER, PERECO, Madelin, selon votre statut.",
        "Optimisation fiscale : maximisation des avantages fiscaux selon votre TMI.",
        "Suivi régulier : ajustement de la stratégie selon l'évolution de votre situation."
      ]
    },
    
    engagement: "Notre mission : transformer vos revenus en patrimoine, et votre patrimoine en liberté.",
    
    cta: {
      title: "Prêt à planifier votre retraite ?",
      description: "Prenez rendez-vous avec un conseiller Azalée Patrimoine pour un diagnostic retraite personnalisé.",
      buttons: [
        {
          text: "Prendre rendez-vous",
          url: "https://calendly.com/rdv-azalee-patrimoine/30min",
          style: "primary"
        },
        {
          text: "Nous contacter",
          url: "/contact",
          style: "secondary"
        }
      ]
    }
  },
  
  faq: {
    h2: "Questions fréquentes",
    questions: [
      {
        question: "Quelle différence entre PER individuel et PER d'entreprise ?",
        answer: "Le PER individuel est souscrit à titre personnel. Le PER d'entreprise (PERECO ou PERO) est proposé par votre employeur, avec des abondements possibles."
      },
      {
        question: "Puis-je transférer mon ancien PERP vers un PER ?",
        answer: "Oui, le transfert est possible et souvent avantageux pour gagner en flexibilité (sortie en capital notamment)."
      },
      {
        question: "Le PER est-il bloqué jusqu'à la retraite ?",
        answer: "Oui, sauf cas de déblocage anticipé (achat résidence principale, invalidité, décès du conjoint, fin de droits chômage, surendettement)."
      },
      {
        question: "Comment est imposée la sortie en capital ?",
        answer: "La part issue des versements volontaires est imposée au barème de l'impôt sur le revenu. Les plus-values sont soumises au PFU (flat tax) de 30%."
      }
    ]
  }
};

async function updatePlanRetraiteContent() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const path = 'retraite/plan-retraite';
    
    const existing = await PageContent.findOne({ path });
    
    if (existing) {
      console.log(`📝 Updating "${path}" with REAL content from JSX page...`);
      existing.content = realPlanRetraiteContent;
      existing.lastModified = new Date();
      existing.modifiedBy = 'admin';
      await existing.save();
      console.log(`✅ Content updated successfully!`);
    } else {
      console.log(`📝 Creating "${path}" with REAL content...`);
      const newPage = new PageContent({
        path,
        title: "Plans d'épargne retraite - PER, PERP, PERCO, Madelin",
        content: realPlanRetraiteContent,
        published: true,
        modifiedBy: 'admin'
      });
      await newPage.save();
      console.log(`✅ Page created successfully!`);
    }

    console.log('\n📊 Content structure:');
    console.log('  - Hero section ✓');
    console.log('  - Introduction ✓');
    console.log('  - PER, PERP, PERCO, Madelin, Préfon ✓');
    console.log('  - Guide by profile ✓');
    console.log('  - Fiscalité ✓');
    console.log('  - Accompagnement Azalée ✓');
    console.log('  - FAQ ✓');
    console.log('\n🎉 Real content is now in CMS and 100% editable!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

updatePlanRetraiteContent();

