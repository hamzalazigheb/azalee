// Script to initialize missing CMS sections for Fiscalité pages
// Extracts hardcoded content and adds it to MongoDB

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Content for declaration-impots
const declarationImpotsContent = {
  declarationSteps: [
    {
      step: "1",
      title: "Rassemblement des documents",
      description: "Collectez tous vos justificatifs de revenus, charges et investissements",
      details: ["Bulletins de salaire", "Attestations de loyer", "Relevés bancaires", "Quittances de charges"]
    },
    {
      step: "2",
      title: "Choix du mode de déclaration",
      description: "Optez pour la méthode qui vous convient le mieux",
      details: ["Déclaration en ligne (recommandée)", "Déclaration papier", "Déclaration par téléphone"]
    },
    {
      step: "3",
      title: "Saisie des informations",
      description: "Remplissez tous les champs avec précision",
      details: ["Revenus d'activité", "Revenus du patrimoine", "Charges déductibles", "Crédits d'impôt"]
    },
    {
      step: "4",
      title: "Vérification et validation",
      description: "Relisez attentivement avant de valider définitivement",
      details: ["Contrôle des montants", "Vérification des informations", "Validation finale"]
    }
  ],
  calendarData: [
    {
      month: "Mai",
      dates: [
        { day: "15", description: "Départements 01 à 19" },
        { day: "22", description: "Départements 20 à 54" },
        { day: "29", description: "Départements 55 à 976" }
      ]
    },
    {
      month: "Juin",
      dates: [
        { day: "5", description: "Départements 01 à 19" },
        { day: "12", description: "Départements 20 à 54" },
        { day: "19", description: "Départements 55 à 976" }
      ]
    }
  ],
  commonErrors: [
    {
      error: "Oubli de déclarer des revenus",
      impact: "Risque de redressement fiscal",
      solution: "Vérifiez tous vos comptes et sources de revenus"
    },
    {
      error: "Erreur dans le calcul des charges",
      impact: "Perte d'avantages fiscaux",
      solution: "Conservez tous vos justificatifs de charges"
    },
    {
      error: "Mauvaise catégorisation des revenus",
      impact: "Taux d'imposition incorrect",
      solution: "Consultez la notice explicative ou un professionnel"
    }
  ],
  quickStats: [
    {
      label: "Régularisation",
      month: "Septembre",
      description: "Remboursement ou complément"
    },
    {
      label: "Prélèvement",
      subtitle: "À la source",
      description: "Depuis 2019"
    },
    {
      label: "Obligatoire",
      subtitle: "Déclaration",
      description: "Même avec prélèvement"
    }
  ],
  tabContent: {
    general: {
      title: "Prélèvement à la source depuis 2019",
      subtitle: "Les contribuables sont imposés au fil de l'eau, mais la déclaration reste obligatoire",
      questionTitle: "Pourquoi la déclaration reste-t-elle obligatoire ?",
      paragraphs: [
        "Depuis la mise en place du prélèvement à la source, les contribuables sont imposés au fil de l'eau. Pourtant, la déclaration reste obligatoire car elle permet de régulariser la situation.",
        "Cette régularisation s'explique par la prise en compte, lors de la déclaration, des réductions et crédits d'impôt (emploi à domicile, dons, investissements, etc.), mais aussi des revenus non soumis à prélèvement à la source (dividendes, plus-values, revenus fonciers)."
      ],
      cards: [
        {
          title: "Vous avez payé trop d'impôt",
          description: "Vous recevez un remboursement de la part du Trésor Public (généralement fin juillet ou début août).",
          badge: "Remboursement automatique"
        },
        {
          title: "Vous n'avez pas assez payé",
          description: "Vous devez verser un complément, prélevé directement en septembre, éventuellement échelonné sur plusieurs mois si le solde est important.",
          badge: "Prélèvement complémentaire"
        }
      ]
    },
    dates: {
      title: "Régularisation en septembre",
      subtitle: "Comprendre les mécanismes de régularisation et le taux de prélèvement",
      faqTitle: "Question fréquente : \"Dois-je baisser mon taux de prélèvement si je suis remboursé ?\"",
      faqAnswer: "La réponse est NON",
      faqParagraphs: [
        "Le remboursement est souvent lié aux réductions ou crédits d'impôt auxquels vous avez droit. Le taux de prélèvement à la source est calculé sur vos revenus imposables, sans anticiper ces avantages fiscaux.",
        "Ainsi, même si vous êtes remboursé, il est normal de conserver le même taux, sauf changement significatif de vos revenus ou de votre situation familiale."
      ],
      calculationPoints: [
        "Basé sur les revenus imposables",
        "Sans anticiper les avantages fiscaux",
        "Calculé sur l'année précédente",
        "Peut être ajusté sur demande"
      ],
      risksPoints: [
        "Régularisations défavorables",
        "Risque de redressement",
        "Perte d'avantages fiscaux",
        "Majorations de retard"
      ]
    },
    documents: {
      title: "Questions fréquentes sur la déclaration de revenus",
      subtitle: "Les réponses aux questions les plus courantes",
      questions: [
        {
          question: "Pourquoi dois-je encore faire une déclaration si je suis déjà prélevé à la source ?",
          answer: "Le prélèvement à la source ne prend pas en compte toutes les réductions, crédits d'impôt et revenus exceptionnels. La déclaration de revenus reste donc obligatoire afin de régulariser la situation fiscale."
        },
        {
          question: "Pourquoi suis-je remboursé alors que je paie déjà l'impôt chaque mois ?",
          answer: "Le remboursement correspond généralement à l'application de crédits et réductions d'impôt (emploi à domicile, dons, investissements, etc.) ou à des acomptes trop élevés. Le taux de prélèvement appliqué par défaut ne tient pas compte de ces avantages fiscaux."
        },
        {
          question: "Dois-je modifier mon taux de prélèvement si je reçois un remboursement ?",
          answer: "Non. Le taux de prélèvement est calculé sur vos revenus imposables avant réductions et crédits d'impôt. Être remboursé ne signifie pas que votre taux est trop élevé, mais simplement que vos avantages fiscaux sont venus réduire le montant final de l'impôt. En revanche, si vos revenus ou votre situation familiale changent (mariage, naissance, hausse ou baisse de revenus), il est nécessaire de mettre à jour votre taux sur impots.gouv.fr."
        }
      ]
    },
    erreurs: {
      title: "Accompagnement par un conseiller en gestion de patrimoine",
      subtitle: "Transformez votre déclaration en véritable outil d'optimisation patrimoniale",
      questionTitle: "Quel est l'intérêt de se faire accompagner par un CGP ?",
      answer: "Un CGP peut simuler votre impôt réel en intégrant vos réductions, déductions et investissements à venir. Cela permet d'obtenir un taux de prélèvement plus proche de votre charge fiscale effective.",
      benefits: [
        {
          title: "Taux optimisé",
          description: "Plus proche de votre charge fiscale effective"
        },
        {
          title: "Éviter les surprises",
          description: "Pas de mauvaises surprises lors de la régularisation"
        },
        {
          title: "Stratégie patrimoniale",
          description: "Anticiper et optimiser sur plusieurs années"
        }
      ]
    }
  },
  conclusion: {
    title: "Conclusion : La déclaration de revenus, un moment clé",
    description: "La déclaration de revenus n'est pas qu'une simple formalité administrative : elle constitue un moment clé pour ajuster, comprendre et optimiser sa fiscalité. Bien réalisée, elle peut permettre de récupérer des sommes importantes et d'anticiper la charge fiscale de l'année suivante.",
    ctaTitle: "Évaluez dès maintenant votre impôt réel avec un conseiller Azalée Patrimoine",
    ctaDescription: "Transformez votre déclaration en véritable outil d'optimisation patrimoniale"
  }
};

// Content for impot-sur-le-revenu
const impotSurLeRevenuContent = {
  stats: {
    stats: [
      {
        subtitle: "Depuis 2019",
        title: "Prélèvement à la source",
        description: "Collecte immédiate et continue"
      },
      {
        subtitle: "Optimisation",
        title: "Dispositifs fiscaux",
        description: "PER, Pinel, Girardin, déficit foncier"
      },
      {
        subtitle: "Stratégie",
        title: "Patrimoine",
        description: "Maîtrise de l'IR essentielle"
      }
    ]
  },
  dispositifs: {
    title: "Les 10 meilleurs dispositifs de réduction d'impôts",
    subtitle: "Après avoir compris le fonctionnement et le calcul de l'impôt sur le revenu, il est essentiel d'identifier les leviers à votre disposition pour réduire votre fiscalité.",
    ctaButton: "Je fais analyser ma situation personnelle",
    ctaLink: "https://calendly.com/rdv-azalee-patrimoine/30min",
    items: [
      {
        name: "Loi Pinel",
        description: "La loi Pinel permet d'investir dans l'immobilier locatif neuf ou réhabilité et d'obtenir une réduction d'impôt proportionnelle à la durée d'engagement locatif (6, 9 ou 12 ans). L'avantage fiscal est conditionné par le respect de plafonds de loyers et de ressources des locataires.",
        link: "/fiscalite/loi-pinel"
      },
      {
        name: "Déficit foncier",
        description: "Le déficit foncier résulte des charges déductibles liées à des travaux d'entretien, de réparation ou de rénovation sur un bien locatif. Il permet de réduire vos revenus fonciers imposables, voire votre revenu global dans certaines limites, offrant ainsi un levier efficace pour diminuer votre impôt sur le revenu.",
        link: "/fiscalite/reductions-impot-deficit-foncier"
      },
      {
        name: "Loueur en Meublé Non Professionnel",
        acronym: "LMNP",
        description: "Le statut LMNP vous permet de louer un logement meublé tout en bénéficiant d'un régime fiscal attractif. Grâce à l'amortissement du bien et du mobilier, vos loyers imposables sont largement réduits. C'est une solution appréciée pour générer des revenus complémentaires faiblement fiscalisés.",
        link: "/immobilier/lmnp"
      },
      {
        name: "Loueur en Meublé Professionnel",
        acronym: "LMP",
        description: "Le statut LMP s'adresse aux investisseurs dont les revenus locatifs dépassent la moitié des revenus du foyer. Il ouvre droit à des avantages fiscaux majeurs : exonération des plus-values après un délai de détention et imputation illimitée des déficits sur le revenu global du contribuable.",
        link: "/immobilier/lmnp"
      },
      {
        name: "Plan d'Épargne Retraite",
        acronym: "PER",
        description: "Le PER est un outil d'épargne à long terme qui permet de préparer sa retraite tout en réduisant immédiatement son impôt sur le revenu. Les versements volontaires sont déductibles, dans certaines limites, et le capital accumulé bénéficie d'un cadre fiscal avantageux au moment de la sortie.",
        link: "/retraite/plan-retraite"
      },
      {
        name: "Loi Girardin",
        subtitle: "Industriel et Logement Social",
        description: "Le dispositif Girardin s'adresse aux contribuables métropolitains investissant dans des projets productifs ou immobiliers outre-mer. Il offre une réduction d'impôt immédiate et importante, souvent supérieure au montant investi. Ce mécanisme, très encadré, permet de soutenir le développement économique des territoires ultramarins.",
        link: "/fiscalite/loi-girardin"
      },
      {
        name: "FIP et FCPI",
        description: "Les FIP et FCPI permettent d'investir dans des PME françaises. En contrepartie du risque pris, vous bénéficiez d'une réduction d'impôt sur le revenu et d'un potentiel gain à long terme.",
        link: "/placements/scpi-opci"
      },
      {
        name: "Sofica",
        description: "Les Sofica permettent de soutenir la création culturelle française. En échange de votre investissement, vous bénéficiez d'une réduction d'impôt attractive, pouvant aller jusqu'à 48 % selon les cas. Un dispositif fiscal réservé aux contribuables investis.",
        link: "/placements/scpi-opci"
      },
      {
        name: "Monuments Historiques",
        description: "Le régime Monuments Historiques encourage la restauration et la préservation de biens classés. Les travaux réalisés sont déductibles du revenu global, sans plafonnement. C'est l'un des rares dispositifs permettant de défiscaliser fortement tout en contribuant directement à la sauvegarde du patrimoine architectural français.",
        link: "/fiscalite/monument-historique"
      },
      {
        name: "Dons aux associations",
        subtitle: "et fondations",
        description: "Les dons aux associations reconnues d'utilité publique ouvrent droit à une réduction d'impôt significative : 66 % des sommes versées (75 % pour certains organismes d'aide). Ce dispositif accessible à tous permet de soutenir des causes d'intérêt général tout en optimisant sa fiscalité personnelle.",
        link: "/patrimoine/conseils"
      }
    ]
  },
  faq: {
    questions: [
      {
        question: "Puis-je cumuler plusieurs dispositifs fiscaux la même année ?",
        answer: "Oui, mais l'ensemble des avantages obtenus est plafonné à 10 000 € (ou 18 000 € selon les cas). Au-delà, les réductions ou crédits d'impôt excédentaires sont perdus."
      },
      {
        question: "Le PER est-il concerné par le plafonnement des niches fiscales à 10 000 € ?",
        answer: "Non. Le PER relève d'un plafond spécifique : 10 % des revenus imposables de l'année précédente (ou 10 % du PASS). Il n'entre pas dans le plafond global de 10 000 €."
      },
      {
        question: "Comment savoir quel dispositif utiliser en priorité ?",
        answer: "Tout dépend de votre situation fiscale et de vos objectifs patrimoniaux. Par exemple, un contribuable fortement imposé peut privilégier le PER pour réduire directement son revenu imposable, tandis qu'un investisseur immobilier pourra utiliser un dispositif comme Pinel ou le déficit foncier."
      }
    ],
    azaleeNote: "Chez Azalée Patrimoine, nous réalisons des simulations personnalisées pour optimiser l'utilisation de vos niches fiscales et hiérarchiser les dispositifs les plus pertinents selon vos revenus et vos objectifs."
  },
  optimisation: {
    title: "Comment alléger votre imposition sans prendre de risque : les bonnes pratiques fiscales à connaître après 50 ans",
    sections: [
      {
        step: "1",
        title: "Faites le point sur les abattements et déductions en 2025",
        subsections: [
          {
            letter: "a",
            title: "Profitez de l'abattement de 10% sur vos pensions de retraite",
            description: "En 2025, les retraités bénéficient encore d'un abattement automatique de 10 % sur leurs pensions (base, complémentaire, invalidité), dans la limite de 4 321 € par foyer fiscal. Cet abattement, destiné à compenser l'absence de frais professionnels, allège votre base imposable et reste cumulable avec d'autres dispositifs (comme les abattements pour plus de 65 ans ou invalidité).",
            warning: "Attention : cette disposition est amenée à évoluer. Dès l'imposition sur les revenus 2025, la réforme annoncée prévoit la suppression de l'abattement proportionnel au profit d'un abattement forfaitaire unique de 2 000 € par foyer. L'impact : les retraités aux pensions modestes seront peu affectés, mais les retraités aisés verront leur avantage fortement diminuer."
          },
          {
            letter: "b",
            title: "Vérifiez votre droit à l'abattement supplémentaire \"plus de 65 ans\"",
            description: "Si vous avez plus de 65 ans au 31 décembre de l'année d'imposition, un abattement supplémentaire de 2 796 € (ou 1 398 € selon vos ressources) peut s'appliquer à votre revenu global, dans la limite de certains plafonds."
          }
        ]
      },
      {
        step: "2",
        title: "Optez pour les bonnes stratégies défiscalisantes",
        subsections: [
          {
            letter: "a",
            title: "Anticipez la suppression de l'abattement de 10%",
            description: "Si vous êtes retraité et que vous avez encore des revenus d'activité ou du patrimoine, il peut être judicieux d'anticiper la réforme en optimisant dès maintenant votre stratégie fiscale."
          },
          {
            letter: "b",
            title: "Revoyez vos options sur la déclaration de frais réels ou forfaitaire",
            description: "Pour les revenus d'activité, vous pouvez opter pour la déduction des frais réels (justifiés) ou l'abattement forfaitaire de 10 %. Après 50 ans, selon votre situation, l'une ou l'autre option peut être plus avantageuse."
          }
        ]
      }
    ]
  }
};

async function initMissingSections() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Update declaration-impots
    console.log('📄 Updating fiscalite/declaration-impots...');
    const declPage = await PageContent.findOne({ path: 'fiscalite/declaration-impots' });
    if (declPage) {
      declPage.content = {
        ...declPage.content,
        ...declarationImpotsContent
      };
      declPage.lastModified = new Date();
      await declPage.save();
      console.log('✅ Updated declaration-impots with missing sections');
    } else {
      console.log('⚠️  Page fiscalite/declaration-impots not found in CMS');
    }

    // Update impot-sur-le-revenu
    console.log('\n📄 Updating fiscalite/impot-sur-le-revenu...');
    const irPage = await PageContent.findOne({ path: 'fiscalite/impot-sur-le-revenu' });
    if (irPage) {
      irPage.content = {
        ...irPage.content,
        ...impotSurLeRevenuContent
      };
      irPage.lastModified = new Date();
      await irPage.save();
      console.log('✅ Updated impot-sur-le-revenu with missing sections');
    } else {
      console.log('⚠️  Page fiscalite/impot-sur-le-revenu not found in CMS');
    }

    console.log('\n✅ All missing sections initialized in CMS');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

initMissingSections()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

