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

const successionHeritageContent = {
  title: 'Succession et héritage : droits et fiscalité | Azalée Patrimoine',
  content: {
    hero: {
      title: "Succession et héritage",
      description: "Comprendre les droits de succession et optimiser la transmission de votre patrimoine. Anticipez la transmission de votre patrimoine avec nos experts en gestion successorale.",
      codeCivil: [
        {
          title: "Réserve héréditaire",
          description: "Part minimale réservée aux héritiers réservataires (enfants, conjoint)"
        },
        {
          title: "Quotité disponible",
          description: "Part dont vous pouvez disposer librement par testament ou donation"
        }
      ],
      buttons: [
        { text: "Simuler ma succession", url: "https://calendly.com/rdv-azalee-patrimoine/30min" },
        { text: "En savoir plus", url: "/patrimoine" }
      ]
    },
    chart: {
      title: "Indicateurs de succession",
      data: [
        { label: "Abattement parent-enfant", value: "100 000 €" },
        { label: "Abattement entre époux", value: "80 724 €" },
        { label: "Taux droits de succession", value: "5% à 45%" }
      ],
      image: "/images/azalee-patrimoine-succesion.webp"
    },
    definition: {
      title: "Qu'est-ce que la succession ?",
      subtitle: "La succession est l'ensemble des règles qui régissent la transmission du patrimoine après le décès",
      blocks: [
        {
          title: "Réserve héréditaire",
          description: "Part minimale du patrimoine réservée aux héritiers réservataires (enfants, conjoint survivant). Cette part varie selon le nombre d'enfants.",
          items: [
            "1 enfant : 50% de la succession",
            "2 enfants : 66% de la succession",
            "3 enfants ou plus : 75% de la succession"
          ]
        },
        {
          title: "Quotité disponible",
          description: "Part du patrimoine dont vous pouvez disposer librement par testament ou donation. Elle complète la réserve héréditaire.",
          items: [
            "1 enfant : 50% disponible",
            "2 enfants : 33% disponible",
            "3 enfants ou plus : 25% disponible"
          ]
        }
      ],
      example: {
        title: "Exemple concret",
        cards: [
          { label: "Patrimoine total", value: "500 000 €" },
          { label: "Réserve (2 enfants)", value: "330 000 €" },
          { label: "Quotité disponible", value: "170 000 €" }
        ]
      }
    },
    fiscalite: {
      title: "Fiscalité des successions",
      subtitle: "Les droits de succession varient selon le lien de parenté et le montant transmis",
      tableTitle: "Barème des droits de succession 2024",
      tableHeaders: ["Lien de parenté", "Abattement", "Taux"],
      tableRows: [
        { label: "Conjoint / Partenaire PACS", value: "Exonéré", rate: "0%", highlight: true },
        { label: "Enfant / Parent", value: "100 000 €", rate: "5% à 45%" },
        { label: "Petit-enfant", value: "31 865 €", rate: "5% à 45%" },
        { label: "Frère / Sœur", value: "15 932 €", rate: "35% à 45%" },
        { label: "Neveu / Nièce", value: "7 967 €", rate: "55%" },
        { label: "Autres", value: "1 594 €", rate: "60%" }
      ],
      exampleTitle: "Exemple de calcul",
      exampleSituationTitle: "Situation",
      exampleSituation: "Transmission de 200 000 € à un enfant (abattement de 100 000 € applicable)",
      exampleItems: [
        { label: "Montant transmis", value: "200 000 €" },
        { label: "Abattement", value: "- 100 000 €" },
        { label: "Base taxable", value: "100 000 €" },
        { label: "Droits de succession", value: "5 000 €" }
      ],
      exampleNote: "Taux effectif : 2,5% sur le montant total transmis"
    },
    regime: {
      title: "Régime matrimonial et succession",
      subtitle: "Votre régime matrimonial influence la transmission de votre patrimoine",
      items: [
        {
          title: "Communauté universelle",
          description: "En communauté universelle, tous les biens sont communs. Le conjoint survivant hérite de la totalité.",
          note: "Avantage : transmission intégrale au conjoint sans droits de succession"
        },
        {
          title: "Séparation de biens",
          description: "Chaque époux conserve ses biens propres. La succession suit les règles légales.",
          note: "Attention : les enfants héritent de leur part réservataire"
        },
        {
          title: "Communauté réduite aux acquêts",
          description: "Régime légal : biens propres + biens communs. Le conjoint peut hériter de l'usufruit.",
          note: "Le conjoint survivant peut bénéficier de l'usufruit sur la part des enfants"
        }
      ],
      bottomBlock: {
        title: "Conseil important",
        cards: [
          {
            title: "Anticiper",
            description: "La planification successorale permet d'optimiser la transmission"
          },
          {
            title: "Protéger",
            description: "Le conjoint survivant peut être protégé par le choix du régime matrimonial"
          },
          {
            title: "Optimiser",
            description: "Les donations et l'assurance-vie permettent de réduire les droits de succession"
          }
        ]
      }
    },
    optimisation: {
      title: "Comment optimiser votre succession ?",
      subtitle: "Plusieurs stratégies permettent de réduire les droits de succession et de mieux transmettre",
      items: [
        {
          title: "Donations",
          description: "Profiter de l'abattement de 100 000 € par parent et par enfant tous les 15 ans pour transmettre progressivement"
        },
        {
          title: "Assurance-vie",
          description: "Bénéficier d'un abattement de 152 500 € par bénéficiaire (versements avant 70 ans) pour transmettre hors succession"
        },
        {
          title: "Démembrement",
          description: "Transmettre la nue-propriété de son vivant et conserver l'usufruit pour réduire les droits de donation"
        },
        {
          title: "Testament",
          description: "Organiser la transmission selon vos souhaits tout en respectant la réserve héréditaire"
        }
      ]
    },
    finalCta: {
      title: "Prêt à optimiser votre succession ?",
      subtitle: "Nos experts en gestion de patrimoine vous accompagnent pour structurer votre transmission et réduire votre fiscalité successorale.",
      listTitle: "Ce que nous vous proposons",
      items: [
        "Analyse de votre situation successorale",
        "Stratégie d'optimisation personnalisée",
        "Accompagnement dans la mise en œuvre"
      ],
      buttons: [
        { text: "Prendre rendez-vous", url: "https://calendly.com/rdv-azalee-patrimoine/30min" },
        { text: "En savoir plus", url: "/patrimoine" }
      ]
    },
    seo: {
      metaTitle: "Succession et héritage : droits et fiscalité | Azalée Patrimoine",
      metaDescription: "Comprendre les droits de succession, optimiser la transmission de votre patrimoine. Conseils experts en succession et héritage. Abattements, fiscalité, régimes matrimoniaux."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'patrimoine/succession-heritage';
    
    // Vérifier si la page existe déjà
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: successionHeritageContent.title,
            content: successionHeritageContent.content,
            published: true,
            lastModified: new Date()
          }
        },
        { new: true }
      );
      
      console.log('✅ Contenu mis à jour avec succès\n');
    } else {
      console.log(`📝 Création de la page "${path}"...`);
      
      const newPage = new PageContent({
        path,
        title: successionHeritageContent.title,
        content: successionHeritageContent.content,
        published: true,
        lastModified: new Date()
      });
      
      await newPage.save();
      console.log('✅ Page créée avec succès\n');
    }

    // Vérification
    const page = await PageContent.findOne({ path });
    console.log('📋 Vérification du contenu:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Hero: ${page.content.hero ? '✅' : '❌'}`);
    console.log(`   - Chart: ${page.content.chart ? '✅' : '❌'}`);
    console.log(`   - Definition: ${page.content.definition ? '✅' : '❌'}`);
    console.log(`   - Fiscalite: ${page.content.fiscalite ? '✅' : '❌'}`);
    console.log(`   - Regime: ${page.content.regime ? '✅' : '❌'}`);
    console.log(`   - Optimisation: ${page.content.optimisation ? '✅' : '❌'}`);
    console.log(`   - FinalCta: ${page.content.finalCta ? '✅' : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();





