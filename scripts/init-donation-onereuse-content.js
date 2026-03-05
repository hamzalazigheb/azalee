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
    title: "Donation à titre onéreux",
    subtitle: "La donation à titre onéreux permet de <strong>transmettre un bien</strong> en échange d'une <strong>contrepartie financière</strong>, offrant des <strong>avantages fiscaux</strong> par rapport à une vente classique.",
    highlight: "Avantage principal : réduire les droits de mutation et optimiser la transmission.",
    cards: [
      {
        title: "Réduction",
        subtitle: "Droits de mutation",
        value: "Jusqu'à 50%",
        footer: "Par rapport à une vente"
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
        url: "#definition"
      }
    ]
  },
  chart: {
    title: "Données clés - Donation onéreuse",
    subtitle: "Comparaison avec la donation gratuite",
    data: [
      { label: "Réduction droits de mutation", value: "Jusqu'à 50%" },
      { label: "Taux droits de donation", value: "5% à 45%" },
      { label: "Contrepartie", value: "Obligatoire" },
      { label: "Avantage fiscal", value: "Significatif" }
    ],
    image: "/images/azalee-patrimoine-donation.webp"
  },
  definition: {
    title: "Qu'est-ce qu'une donation à titre onéreux ?",
    subtitle: "Comprendre le mécanisme et les avantages",
    content: [
      "La donation à titre onéreux est un <strong>acte de transmission</strong> par lequel le donateur cède un bien à un donataire en échange d'une <strong>contrepartie financière</strong> (prix de vente).",
      "Contrairement à la donation gratuite, cette forme de donation permet de <strong>combiner transmission et rémunération</strong>, tout en bénéficiant d'<strong>avantages fiscaux</strong> par rapport à une vente classique.",
      "Le prix de vente doit être <strong>réel et sérieux</strong>, mais peut être inférieur à la valeur vénale du bien, ce qui permet de transmettre une partie du patrimoine tout en recevant une contrepartie."
    ],
    features: [
      {
        title: "Contrepartie obligatoire",
        description: "Le donataire doit verser un prix de vente réel et sérieux"
      },
      {
        title: "Avantages fiscaux",
        description: "Réduction des droits de mutation par rapport à une vente classique"
      },
      {
        title: "Transmission progressive",
        description: "Permet de transmettre tout en conservant une partie de la valeur"
      }
    ]
  },
  casUsage: {
    title: "Cas d'usage de la donation onéreuse",
    subtitle: "Quand utiliser cette forme de donation ?",
    items: [
      {
        title: "Transmission d'un bien immobilier",
        description: "Transmettre un bien immobilier à un enfant tout en recevant une contrepartie financière, réduisant ainsi les droits de mutation."
      },
      {
        title: "Optimisation fiscale",
        description: "Bénéficier d'une réduction des droits de mutation tout en transmettant progressivement le patrimoine."
      },
      {
        title: "Aide financière",
        description: "Aider un enfant à acquérir un bien tout en optimisant la fiscalité de la transmission."
      }
    ]
  },
  fiscalite: {
    title: "Fiscalité de la donation onéreuse",
    subtitle: "Les avantages fiscaux par rapport à une vente classique",
    points: [
      {
        title: "Réduction des droits de mutation",
        description: "Les droits de mutation sont réduits par rapport à une vente classique, pouvant atteindre jusqu'à 50% de réduction."
      },
      {
        title: "Droits de donation",
        description: "Les droits de donation s'appliquent sur la différence entre la valeur vénale et le prix de vente, permettant une optimisation fiscale."
      },
      {
        title: "Abattements applicables",
        description: "Les abattements de donation (100 000 € par parent et par enfant tous les 15 ans) s'appliquent sur la part gratuite."
      }
    ],
    exampleTitle: "Exemple concret : donation d'un bien de 300 000 €",
    exampleItems: [
      { label: "Valeur vénale", value: "300 000 €" },
      { label: "Prix de vente", value: "200 000 €" },
      { label: "Part gratuite", value: "100 000 €" }
    ],
    exampleResult: "Droits de donation calculés uniquement sur la part gratuite : <strong>5 000 €</strong> au lieu de droits de mutation de 20 000 €"
  },
  comparaison: {
    title: "Donation gratuite vs donation onéreuse",
    subtitle: "Comparaison des deux formes de donation",
    rows: [
      {
        feature: "Contrepartie",
        gratuite: "Aucune",
        onereuse: "Obligatoire (prix de vente)"
      },
      {
        feature: "Droits de mutation",
        gratuite: "Non applicables",
        onereuse: "Réduits (jusqu'à 50%)"
      },
      {
        feature: "Droits de donation",
        gratuite: "Sur la totalité",
        onereuse: "Sur la part gratuite uniquement"
      },
      {
        feature: "Avantage fiscal",
        gratuite: "Abattements tous les 15 ans",
        onereuse: "Réduction droits de mutation + abattements"
      }
    ]
  },
  vision: {
    title: "Pourquoi choisir la donation onéreuse ?",
    subtitle: "Les avantages de cette forme de transmission",
    items: [
      {
        title: "Optimisation fiscale",
        description: "Réduire les droits de mutation tout en transmettant progressivement"
      },
      {
        title: "Contrepartie financière",
        description: "Recevoir une contrepartie tout en optimisant la fiscalité"
      },
      {
        title: "Transmission progressive",
        description: "Transmettre le patrimoine tout en conservant une partie de la valeur"
      }
    ],
    ctaText: "La donation onéreuse permet de <strong>combiner transmission et rémunération</strong> tout en <strong>optimisant la fiscalité</strong>. <strong>Nos experts vous accompagnent</strong> pour structurer votre donation dans les meilleures conditions."
  },
  finalCta: {
    title: "Optimisez votre donation onéreuse avec Azalée Patrimoine",
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
    
    const existingPage = await PageContent.findOne({ path: 'patrimoine/donation-onereuse' });
    
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
        path: 'patrimoine/donation-onereuse',
        title: 'Donation à titre onéreux : transmission | Azalée Patrimoine',
        content: defaultContent,
        published: true,
        lastModified: new Date()
      });
      console.log('✅ Page créée avec le contenu complet');
    }

    console.log('\n📋 Sections initialisées:');
    console.log('   ✅ hero');
    console.log('   ✅ chart');
    console.log('   ✅ definition');
    console.log('   ✅ casUsage');
    console.log('   ✅ fiscalite');
    console.log('   ✅ comparaison');
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

