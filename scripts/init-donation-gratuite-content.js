const mongoose = require('mongoose');
require('dotenv').config();

const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date
});

const defaultContent = {
  hero: {
    title: "Donation à titre gratuit",
    subtitle: "La donation à titre gratuit permet de <strong>transmettre de son vivant</strong> une partie de son patrimoine à ses proches, tout en <strong>optimisant la fiscalité successorale</strong> et en <strong>préparant la transmission</strong>.",
    highlight: "Avantage principal : réduire les droits de succession en transmettant progressivement.",
    cards: [
      {
        title: "Abattement",
        subtitle: "Par parent et par enfant",
        value: "100 000 €",
        footer: "Tous les 15 ans"
      },
      {
        title: "Taux",
        subtitle: "Droits de donation",
        value: "5% à 45%",
        footer: "Selon le lien de parenté"
      }
    ],
    buttons: [
      {
        text: "Simuler ma donation",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      {
        text: "En savoir plus",
        url: "#formes"
      }
    ]
  },
  chart: {
    title: "Caractéristiques des donations à titre gratuit",
    subtitle: "Comparaison des différents types de donations",
    data: [
      { label: "Abattement parent-enfant", value: "100 000 €" },
      { label: "Abattement entre époux", value: "80 724 €" },
      { label: "Abattement frères/sœurs", value: "15 932 €" },
      { label: "Abattement neveux/nièces", value: "7 967 €" },
      { label: "Fréquence", value: "Tous les 15 ans" }
    ],
    image: "/images/azalee-patrimoine-donation.webp"
  },
  formes: {
    title: "Les différentes formes de donation",
    subtitle: "Chaque type de donation répond à des objectifs spécifiques",
    items: [
      {
        title: "Donation simple",
        subtitle: "Transmission immédiate",
        descriptions: [
          "Transmission immédiate et définitive du bien",
          "Le donataire devient propriétaire dès l'acte",
          "Idéal pour transmettre des liquidités ou des biens mobiliers"
        ],
        note: "Attention : le bien sort définitivement du patrimoine du donateur"
      },
      {
        title: "Donation avec réserve d'usufruit",
        subtitle: "Conserver l'usage",
        descriptions: [
          "Le donateur conserve l'usufruit (droit d'usage et de jouissance)",
          "Le donataire reçoit la nue-propriété",
          "Réduction des droits de donation (calcul sur la nue-propriété uniquement)"
        ],
        note: "Avantage fiscal : les droits sont calculés uniquement sur la valeur de la nue-propriété"
      }
    ]
  },
  fiscalite: {
    title: "Fiscalité des donations",
    subtitle: "Les droits de donation varient selon le lien de parenté et le montant transmis",
    rows: [
      { label: "Entre parents et enfants", value: "5% à 45%" },
      { label: "Entre époux", value: "0% (exonération totale)" },
      { label: "Entre frères et sœurs", value: "35% ou 45%" },
      { label: "Entre oncles/tantes et neveux/nièces", value: "55%" },
      { label: "Entre personnes non parentes", value: "60%" }
    ],
    example: {
      title: "Exemple concret : donation de 150 000 € à un enfant",
      cards: [
        { label: "Abattement", value: "100 000 €" },
        { label: "Part taxable", value: "50 000 €" },
        { label: "Droits de donation", value: "2 500 €" }
      ],
      result: "Soit un taux effectif de <strong>1,67%</strong> sur la donation totale"
    }
  },
  demembrement: {
    title: "Donation avec démembrement",
    subtitle: "Optimiser la transmission en séparant usufruit et nue-propriété",
    leftTitle: "Barème de l'usufruit",
    leftItems: [
      { age: "Moins de 21 ans", rate: "90%", description: "de la valeur du bien" },
      { age: "21 à 30 ans", rate: "80%", description: "de la valeur du bien" },
      { age: "31 à 40 ans", rate: "70%", description: "de la valeur du bien" },
      { age: "41 à 50 ans", rate: "60%", description: "de la valeur du bien" },
      { age: "51 à 60 ans", rate: "50%", description: "de la valeur du bien" },
      { age: "Plus de 60 ans", rate: "40%", description: "de la valeur du bien" }
    ],
    rightTitle: "Exemple : donation d'un bien de 200 000 €",
    rightSubtitle: "Donateur de 55 ans (usufruit = 50%)",
    rightItems: [
      { label: "Valeur totale", value: "200 000 €" },
      { label: "Usufruit (50%)", value: "100 000 €" },
      { label: "Nue-propriété (50%)", value: "100 000 €" }
    ],
    rightResult: "Droits calculés uniquement sur la nue-propriété : <strong>5 000 €</strong> au lieu de 10 000 €",
    rightResultNote: "Économie de 50% sur les droits de donation"
  },
  strategie: {
    title: "Stratégie de donation progressive",
    subtitle: "Planifier plusieurs donations pour optimiser la transmission",
    leftTitle: "Avantages de la donation progressive",
    leftItems: [
      {
        title: "Utiliser plusieurs abattements",
        description: "Profiter de l'abattement tous les 15 ans pour transmettre progressivement"
      },
      {
        title: "Réduire les droits",
        description: "Étaler la transmission sur plusieurs années pour minimiser la fiscalité"
      },
      {
        title: "Anticiper la succession",
        description: "Préparer la transmission de son vivant plutôt que de laisser faire la loi"
      }
    ],
    rightTitle: "Exemple : transmission de 300 000 €",
    rightSubtitle: "Stratégie sur 30 ans (2 donations)",
    rightItems: [
      { label: "1ère donation (année 0)", value: "150 000 €" },
      { label: "2ème donation (année 15)", value: "150 000 €" },
      { label: "Total transmis", value: "300 000 €" }
    ],
    rightResult: "Droits totaux : <strong>10 000 €</strong> au lieu de 20 000 € en une seule fois",
    rightResultNote: "Économie de 50% grâce à l'utilisation de 2 abattements"
  },
  vision: {
    title: "Pourquoi faire une donation ?",
    subtitle: "Les avantages de la transmission de son vivant",
    items: [
      {
        title: "Réduire les droits",
        description: "Profiter de l'abattement tous les 15 ans pour minimiser la fiscalité"
      },
      {
        title: "Anticiper la transmission",
        description: "Préparer la succession et éviter les conflits familiaux"
      },
      {
        title: "Aider ses proches",
        description: "Transmettre de son vivant pour aider financièrement ses enfants"
      }
    ],
    highlight: "La donation permet de <strong>transmettre progressivement</strong> tout en <strong>optimisant la fiscalité</strong> et en <strong>préparant sereinement la succession</strong>.",
    cards: [
      {
        title: "Abattement",
        description: "100 000 € par parent et par enfant tous les 15 ans"
      },
      {
        title: "Taux réduit",
        description: "5% à 45% selon le lien de parenté et le montant"
      },
      {
        title: "Exonération",
        description: "0% entre époux (exonération totale)"
      }
    ],
    ctaText: "Besoin de conseils pour optimiser votre donation ? <strong>Nos experts vous accompagnent</strong> pour structurer votre transmission dans les meilleures conditions."
  },
  finalCta: {
    title: "Optimisez votre donation avec Azalée Patrimoine",
    subtitle: "Nos conseillers en gestion de patrimoine vous accompagnent pour structurer votre transmission et réduire votre fiscalité.",
    buttons: [
      {
        text: "Prendre rendez-vous",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      },
      {
        text: "En savoir plus",
        url: "/patrimoine"
      }
    ]
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const PageContent = mongoose.model('PageContent', PageContentSchema);
    
    const existingPage = await PageContent.findOne({ path: 'patrimoine/donation-gratuite' });
    
    if (existingPage) {
      // Mettre à jour la page existante
      existingPage.content = { ...existingPage.content, ...defaultContent };
      existingPage.published = true;
      existingPage.lastModified = new Date();
      await existingPage.save();
      console.log('✅ Page mise à jour avec le contenu complet');
    } else {
      // Créer une nouvelle page
      await PageContent.create({
        path: 'patrimoine/donation-gratuite',
        title: 'Donation à titre gratuit : donner de son vivant | Azalée',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log('   ✅ chart');
    console.log('   ✅ formes');
    console.log('   ✅ fiscalite');
    console.log('   ✅ demembrement');
    console.log('   ✅ strategie');
    console.log('   ✅ vision');
    console.log('   ✅ finalCta');

    await mongoose.disconnect();
    console.log('\n✅ Terminé');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

initContent();

