/**
 * Script d'initialisation complète du CMS
 * Crée toutes les entrées manquantes avec du contenu professionnel réel
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Contenu CMS pour toutes les pages manquantes
const allPagesContent = {
  // ========== PAGES INSTITUTIONNELLES ==========
  'conditions-generales': {
    title: 'Conditions Générales d\'Utilisation',
    content: {
      hero: {
        title: 'Conditions Générales d\'Utilisation',
        subtitle: 'Cadre juridique et modalités d\'utilisation de nos services'
      },
      sections: [
        {
          title: 'Article 1 - Objet',
          content: 'Les présentes conditions générales d\'utilisation (CGU) régissent l\'accès et l\'utilisation du site internet Azalée Patrimoine. En accédant à ce site, vous acceptez sans réserve les présentes CGU.'
        },
        {
          title: 'Article 2 - Services proposés',
          content: 'Azalée Patrimoine propose des services de conseil en gestion de patrimoine, incluant la planification financière, l\'optimisation fiscale, la préparation à la retraite et les investissements immobiliers et financiers.'
        },
        {
          title: 'Article 3 - Propriété intellectuelle',
          content: 'L\'ensemble des contenus présents sur ce site (textes, images, logos, graphismes) sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.'
        },
        {
          title: 'Article 4 - Protection des données',
          content: 'Conformément au RGPD, vos données personnelles sont collectées et traitées dans le respect de votre vie privée. Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.'
        },
        {
          title: 'Article 5 - Responsabilité',
          content: 'Les informations présentes sur ce site ont un caractère informatif. Elles ne constituent pas un conseil personnalisé. Nous vous recommandons de consulter nos conseillers pour une analyse adaptée à votre situation.'
        }
      ],
      seo: {
        metaTitle: 'Conditions Générales d\'Utilisation | Azalée Patrimoine',
        metaDescription: 'Consultez les conditions générales d\'utilisation du site Azalée Patrimoine, cabinet de conseil en gestion de patrimoine.'
      }
    }
  },

  'mentions-legales': {
    title: 'Mentions Légales',
    content: {
      hero: {
        title: 'Mentions Légales',
        subtitle: 'Informations légales et réglementaires'
      },
      sections: [
        {
          title: 'Éditeur du site',
          content: 'Azalée Patrimoine - Cabinet de conseil en gestion de patrimoine. Société immatriculée au RCS. Siège social : Paris, France.'
        },
        {
          title: 'Directeur de la publication',
          content: 'Le directeur de la publication est le représentant légal de la société Azalée Patrimoine.'
        },
        {
          title: 'Hébergement',
          content: 'Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.'
        },
        {
          title: 'Statut réglementaire',
          content: 'Azalée Patrimoine exerce en tant que Conseiller en Investissements Financiers (CIF), membre d\'une association agréée par l\'AMF. Courtier en assurance immatriculé à l\'ORIAS.'
        },
        {
          title: 'Contact',
          content: 'Pour toute question, vous pouvez nous contacter via notre formulaire de contact ou prendre rendez-vous avec l\'un de nos conseillers.'
        }
      ],
      seo: {
        metaTitle: 'Mentions Légales | Azalée Patrimoine',
        metaDescription: 'Mentions légales du site Azalée Patrimoine - Conseil en gestion de patrimoine, statut réglementaire et informations légales.'
      }
    }
  },

  'contact': {
    title: 'Contactez-nous',
    content: {
      hero: {
        title: 'Contactez-nous',
        subtitle: 'Notre équipe est à votre disposition pour répondre à toutes vos questions'
      },
      contactInfo: {
        title: 'Nos coordonnées',
        items: [
          { label: 'Téléphone', value: '01 XX XX XX XX' },
          { label: 'Email', value: 'contact@azalee-patrimoine.fr' },
          { label: 'Adresse', value: 'Paris, France' }
        ]
      },
      form: {
        title: 'Envoyez-nous un message',
        fields: ['Nom', 'Email', 'Téléphone', 'Sujet', 'Message'],
        submitButton: 'Envoyer'
      },
      cta: {
        title: 'Préférez un rendez-vous ?',
        description: 'Prenez rendez-vous directement avec l\'un de nos conseillers pour un échange personnalisé.',
        buttonText: 'Prendre rendez-vous'
      },
      seo: {
        metaTitle: 'Contact | Azalée Patrimoine - Conseil en gestion de patrimoine',
        metaDescription: 'Contactez Azalée Patrimoine pour un conseil personnalisé en gestion de patrimoine. Notre équipe d\'experts vous accompagne dans vos projets.'
      }
    }
  },

  'notre-approche': {
    title: 'Notre Approche',
    content: {
      hero: {
        title: 'Notre Approche',
        subtitle: 'Une méthodologie éprouvée pour optimiser votre patrimoine'
      },
      methodology: {
        title: 'Notre méthodologie en 4 étapes',
        steps: [
          {
            number: '01',
            title: 'Analyse complète',
            description: 'Nous réalisons un bilan patrimonial détaillé pour comprendre votre situation actuelle, vos objectifs et vos contraintes.'
          },
          {
            number: '02',
            title: 'Stratégie personnalisée',
            description: 'Nous élaborons une stratégie sur-mesure adaptée à votre profil de risque, votre horizon d\'investissement et vos objectifs.'
          },
          {
            number: '03',
            title: 'Mise en œuvre',
            description: 'Nous vous accompagnons dans la mise en place des solutions sélectionnées avec un suivi rigoureux.'
          },
          {
            number: '04',
            title: 'Suivi continu',
            description: 'Nous assurons un suivi régulier de votre patrimoine et ajustons la stratégie selon l\'évolution de votre situation.'
          }
        ]
      },
      values: {
        title: 'Nos valeurs',
        items: [
          { title: 'Indépendance', description: 'Nous sélectionnons les meilleures solutions du marché sans contrainte.' },
          { title: 'Transparence', description: 'Nos honoraires et nos recommandations sont clairs et explicites.' },
          { title: 'Expertise', description: 'Notre équipe est composée de professionnels certifiés et expérimentés.' },
          { title: 'Proximité', description: 'Nous construisons une relation de confiance durable avec nos clients.' }
        ]
      },
      seo: {
        metaTitle: 'Notre Approche | Azalée Patrimoine - Méthodologie de conseil patrimonial',
        metaDescription: 'Découvrez notre approche personnalisée en gestion de patrimoine. Analyse, stratégie sur-mesure et suivi continu pour optimiser votre patrimoine.'
      }
    }
  },

  'nos-courtiers': {
    title: 'Nos Courtiers Partenaires',
    content: {
      hero: {
        title: 'Nos Courtiers Partenaires',
        subtitle: 'Un réseau de partenaires de confiance pour vous offrir les meilleures solutions'
      },
      introduction: {
        text: 'Azalée Patrimoine collabore avec un réseau sélectionné de courtiers et partenaires pour vous proposer les meilleures solutions du marché en assurance-vie, crédit immobilier et placements financiers.'
      },
      partners: {
        title: 'Nos partenaires',
        categories: [
          {
            title: 'Assurance-vie',
            description: 'Partenariats avec les principaux assureurs français et luxembourgeois pour des contrats performants et flexibles.'
          },
          {
            title: 'Crédit immobilier',
            description: 'Accès aux meilleures offres de financement grâce à notre réseau de courtiers en crédit.'
          },
          {
            title: 'SCPI et immobilier',
            description: 'Sélection rigoureuse des meilleures SCPI et opportunités d\'investissement immobilier.'
          }
        ]
      },
      seo: {
        metaTitle: 'Nos Courtiers Partenaires | Azalée Patrimoine',
        metaDescription: 'Découvrez notre réseau de courtiers et partenaires sélectionnés pour vous offrir les meilleures solutions en gestion de patrimoine.'
      }
    }
  },

  // ========== FISCALITÉ ==========
  'fiscalite/declaration-impots': {
    title: 'Déclaration d\'Impôts',
    content: {
      hero: {
        title: 'Accompagnement Déclaration d\'Impôts',
        subtitle: 'Optimisez votre déclaration et réduisez votre imposition légalement'
      },
      services: {
        title: 'Nos services',
        items: [
          {
            title: 'Vérification de votre déclaration',
            description: 'Nous vérifions l\'ensemble de votre déclaration pour identifier les erreurs et optimisations possibles.'
          },
          {
            title: 'Identification des déductions',
            description: 'Nous identifions toutes les déductions et réductions d\'impôt auxquelles vous avez droit.'
          },
          {
            title: 'Accompagnement personnalisé',
            description: 'Nos experts vous accompagnent pas à pas dans votre déclaration.'
          }
        ]
      },
      calendar: {
        title: 'Calendrier fiscal',
        dates: [
          { event: 'Ouverture déclaration en ligne', period: 'Avril' },
          { event: 'Date limite zone 1', period: 'Mai' },
          { event: 'Date limite zone 2', period: 'Mai' },
          { event: 'Date limite zone 3', period: 'Juin' }
        ]
      },
      seo: {
        metaTitle: 'Déclaration d\'Impôts - Accompagnement | Azalée Patrimoine',
        metaDescription: 'Faites-vous accompagner pour votre déclaration d\'impôts. Nos experts vous aident à optimiser votre fiscalité et identifier toutes les déductions.'
      }
    }
  },

  'fiscalite/impot-sur-le-revenu': {
    title: 'Impôt sur le Revenu',
    content: {
      hero: {
        title: 'Impôt sur le Revenu',
        subtitle: 'Comprendre et optimiser votre imposition'
      },
      understanding: {
        title: 'Comprendre l\'impôt sur le revenu',
        content: 'L\'impôt sur le revenu (IR) est calculé selon un barème progressif. Plus vos revenus sont élevés, plus votre taux marginal d\'imposition (TMI) est important.'
      },
      brackets: {
        title: 'Tranches d\'imposition 2024',
        items: [
          { range: 'Jusqu\'à 11 294 €', rate: '0%' },
          { range: 'De 11 294 € à 28 797 €', rate: '11%' },
          { range: 'De 28 797 € à 82 341 €', rate: '30%' },
          { range: 'De 82 341 € à 177 106 €', rate: '41%' },
          { range: 'Au-delà de 177 106 €', rate: '45%' }
        ]
      },
      optimization: {
        title: 'Stratégies d\'optimisation',
        items: [
          'Investissements défiscalisants (Pinel, FCPI, FIP)',
          'Épargne retraite (PER)',
          'Dons aux associations',
          'Emploi à domicile'
        ]
      },
      seo: {
        metaTitle: 'Impôt sur le Revenu - Guide complet | Azalée Patrimoine',
        metaDescription: 'Tout savoir sur l\'impôt sur le revenu : barème, tranches, calcul et stratégies d\'optimisation fiscale avec Azalée Patrimoine.'
      }
    }
  },

  'fiscalite/lois-fiscales': {
    title: 'Lois Fiscales',
    content: {
      hero: {
        title: 'Les Lois de Défiscalisation',
        subtitle: 'Panorama des dispositifs fiscaux pour réduire vos impôts'
      },
      introduction: {
        text: 'La France propose de nombreux dispositifs de défiscalisation permettant de réduire votre impôt tout en constituant un patrimoine. Découvrez les principales lois fiscales.'
      },
      laws: {
        title: 'Les principaux dispositifs',
        items: [
          {
            name: 'Loi Pinel',
            description: 'Réduction d\'impôt pour l\'investissement locatif dans le neuf',
            reduction: 'Jusqu\'à 21% du montant investi'
          },
          {
            name: 'Loi Malraux',
            description: 'Réduction pour la rénovation de biens dans les secteurs sauvegardés',
            reduction: 'Jusqu\'à 30% des travaux'
          },
          {
            name: 'Loi Denormandie',
            description: 'Défiscalisation pour la rénovation dans l\'ancien',
            reduction: 'Jusqu\'à 21% du montant'
          },
          {
            name: 'Loi Girardin',
            description: 'Investissement dans les DOM-TOM',
            reduction: 'Jusqu\'à 120% de l\'investissement'
          }
        ]
      },
      seo: {
        metaTitle: 'Lois Fiscales et Défiscalisation | Azalée Patrimoine',
        metaDescription: 'Guide complet des lois de défiscalisation : Pinel, Malraux, Denormandie, Girardin. Réduisez vos impôts avec les dispositifs fiscaux.'
      }
    }
  },

  'fiscalite/tmi-prelevements-sociaux': {
    title: 'TMI et Prélèvements Sociaux',
    content: {
      hero: {
        title: 'TMI et Prélèvements Sociaux',
        subtitle: 'Comprendre votre taux marginal d\'imposition et les cotisations sociales'
      },
      tmi: {
        title: 'Le Taux Marginal d\'Imposition (TMI)',
        content: 'Le TMI correspond au taux d\'imposition appliqué à la dernière tranche de vos revenus. Il est essentiel pour évaluer l\'impact fiscal de vos décisions financières.'
      },
      socialContributions: {
        title: 'Les prélèvements sociaux',
        items: [
          { name: 'CSG', rate: '9,2%' },
          { name: 'CRDS', rate: '0,5%' },
          { name: 'Prélèvement de solidarité', rate: '7,5%' },
          { name: 'Total', rate: '17,2%' }
        ]
      },
      application: {
        title: 'Application aux revenus',
        content: 'Les prélèvements sociaux s\'appliquent aux revenus du patrimoine : plus-values, dividendes, intérêts, revenus fonciers...'
      },
      seo: {
        metaTitle: 'TMI et Prélèvements Sociaux | Azalée Patrimoine',
        metaDescription: 'Comprendre le TMI (taux marginal d\'imposition) et les prélèvements sociaux. Guide fiscal complet pour optimiser votre patrimoine.'
      }
    }
  },

  'fiscalite/tranches-baremes-plafonds': {
    title: 'Tranches, Barèmes et Plafonds',
    content: {
      hero: {
        title: 'Tranches, Barèmes et Plafonds Fiscaux',
        subtitle: 'Tous les chiffres clés de la fiscalité française'
      },
      brackets: {
        title: 'Barème de l\'impôt sur le revenu 2024',
        items: [
          { range: 'Jusqu\'à 11 294 €', rate: '0%' },
          { range: 'De 11 294 € à 28 797 €', rate: '11%' },
          { range: 'De 28 797 € à 82 341 €', rate: '30%' },
          { range: 'De 82 341 € à 177 106 €', rate: '41%' },
          { range: 'Au-delà de 177 106 €', rate: '45%' }
        ]
      },
      ceilings: {
        title: 'Plafonds importants',
        items: [
          { name: 'Plafond Sécurité sociale (PASS)', value: '46 368 €' },
          { name: 'Plafond niches fiscales', value: '10 000 €' },
          { name: 'Plafond PER', value: '10% des revenus ou PASS' },
          { name: 'Quotient familial', value: '1 759 € par demi-part' }
        ]
      },
      seo: {
        metaTitle: 'Tranches, Barèmes et Plafonds Fiscaux 2024 | Azalée Patrimoine',
        metaDescription: 'Tous les barèmes fiscaux 2024 : tranches d\'imposition, plafonds niches fiscales, PASS, quotient familial. Guide complet.'
      }
    }
  },

  // ========== IMMOBILIER ==========
  'immobilier/investissement-immobilier-rentable': {
    title: 'Investissement Immobilier Rentable',
    content: {
      hero: {
        title: 'Investissement Immobilier Rentable',
        subtitle: 'Les clés pour réussir votre investissement locatif'
      },
      criteria: {
        title: 'Les critères d\'un investissement rentable',
        items: [
          {
            title: 'L\'emplacement',
            description: 'Privilégiez les zones dynamiques avec une forte demande locative : proximité transports, commerces, écoles.'
          },
          {
            title: 'Le rendement',
            description: 'Visez un rendement brut minimum de 5-6% pour couvrir les charges et dégager du cashflow.'
          },
          {
            title: 'La fiscalité',
            description: 'Optimisez votre fiscalité grâce aux dispositifs adaptés : LMNP, Pinel, déficit foncier.'
          },
          {
            title: 'La plus-value',
            description: 'Anticipez la valorisation du bien sur le long terme.'
          }
        ]
      },
      types: {
        title: 'Types d\'investissement',
        items: [
          { name: 'Location nue', description: 'Simplicité de gestion, revenus fonciers' },
          { name: 'Location meublée (LMNP)', description: 'Avantages fiscaux, amortissement' },
          { name: 'Colocation', description: 'Rendement optimisé, plusieurs locataires' },
          { name: 'Immobilier de rapport', description: 'Plusieurs lots, économies d\'échelle' }
        ]
      },
      seo: {
        metaTitle: 'Investissement Immobilier Rentable | Azalée Patrimoine',
        metaDescription: 'Guide complet pour réussir votre investissement immobilier rentable. Critères de sélection, types d\'investissement et optimisation fiscale.'
      }
    }
  },

  'immobilier/lmnp-2025': {
    title: 'LMNP 2025',
    content: {
      hero: {
        title: 'LMNP 2025 : Guide Complet',
        subtitle: 'Tout savoir sur la Location Meublée Non Professionnelle en 2025'
      },
      changes2025: {
        title: 'Les évolutions du LMNP en 2025',
        items: [
          {
            title: 'Maintien du régime',
            description: 'Le statut LMNP reste attractif avec ses avantages fiscaux préservés.'
          },
          {
            title: 'Amortissement',
            description: 'La possibilité d\'amortir le bien et les meubles est maintenue.'
          },
          {
            title: 'Régimes fiscaux',
            description: 'Choix entre micro-BIC (abattement 50%) et réel (déduction des charges).'
          }
        ]
      },
      advantages: {
        title: 'Avantages du LMNP',
        items: [
          'Amortissement du bien et des meubles',
          'Déduction de toutes les charges',
          'Revenus peu ou pas imposés',
          'Pas de cotisations sociales sur les revenus'
        ]
      },
      conditions: {
        title: 'Conditions à respecter',
        content: 'Recettes annuelles inférieures à 23 000 € ou représentant moins de 50% des revenus du foyer fiscal.'
      },
      seo: {
        metaTitle: 'LMNP 2025 - Guide Location Meublée | Azalée Patrimoine',
        metaDescription: 'Guide complet LMNP 2025 : évolutions, avantages fiscaux, conditions et stratégies pour optimiser votre investissement en location meublée.'
      }
    }
  },

  'immobilier/robien': {
    title: 'Loi Robien',
    content: {
      hero: {
        title: 'Dispositif Robien',
        subtitle: 'Comprendre l\'ancien dispositif de défiscalisation immobilière'
      },
      history: {
        title: 'Historique du dispositif',
        content: 'Le dispositif Robien, créé en 2003 et clôturé en 2009, permettait d\'amortir un bien immobilier neuf destiné à la location. Il a été remplacé par le dispositif Scellier puis Pinel.'
      },
      functioning: {
        title: 'Fonctionnement',
        items: [
          {
            title: 'Amortissement',
            description: 'Amortissement de 8% du prix d\'achat les 5 premières années, puis 2,5% les 4 années suivantes.'
          },
          {
            title: 'Durée d\'engagement',
            description: 'Location pendant 9 ans minimum.'
          },
          {
            title: 'Plafonds de loyers',
            description: 'Respect des plafonds de loyers selon la zone géographique.'
          }
        ]
      },
      current: {
        title: 'Situation actuelle',
        content: 'Ce dispositif n\'est plus accessible aux nouveaux investisseurs. Les biens acquis sous ce régime continuent de bénéficier de l\'amortissement jusqu\'à son terme.'
      },
      seo: {
        metaTitle: 'Dispositif Robien | Azalée Patrimoine',
        metaDescription: 'Guide sur le dispositif Robien : historique, fonctionnement et situation actuelle de cet ancien dispositif de défiscalisation immobilière.'
      }
    }
  },

  // ========== OUTILS ==========
  'outils/autres': {
    title: 'Autres Outils',
    content: {
      hero: {
        title: 'Nos Outils Complémentaires',
        subtitle: 'Des ressources supplémentaires pour gérer votre patrimoine'
      },
      tools: {
        title: 'Outils disponibles',
        items: [
          {
            title: 'Calculatrice de rendement',
            description: 'Calculez le rendement brut et net de vos investissements immobiliers.'
          },
          {
            title: 'Simulateur de crédit',
            description: 'Estimez vos mensualités et le coût total de votre emprunt.'
          },
          {
            title: 'Comparateur d\'assurance-vie',
            description: 'Comparez les performances des principaux contrats du marché.'
          }
        ]
      },
      seo: {
        metaTitle: 'Outils Patrimoniaux | Azalée Patrimoine',
        metaDescription: 'Découvrez nos outils de simulation et calculateurs pour optimiser votre patrimoine : rendement, crédit, assurance-vie.'
      }
    }
  },

  'outils/calculatrice-impots': {
    title: 'Calculatrice d\'Impôts',
    content: {
      hero: {
        title: 'Calculatrice d\'Impôts',
        subtitle: 'Estimez votre impôt sur le revenu en quelques clics'
      },
      description: {
        text: 'Notre calculatrice d\'impôts vous permet d\'estimer votre imposition en fonction de vos revenus, de votre situation familiale et de vos charges déductibles.'
      },
      features: {
        title: 'Fonctionnalités',
        items: [
          'Calcul selon le barème 2024',
          'Prise en compte du quotient familial',
          'Simulation des réductions d\'impôt',
          'Estimation du taux marginal d\'imposition'
        ]
      },
      disclaimer: {
        text: 'Cette simulation est fournie à titre indicatif. Pour une analyse précise de votre situation fiscale, consultez nos experts.'
      },
      seo: {
        metaTitle: 'Calculatrice d\'Impôts 2024 | Azalée Patrimoine',
        metaDescription: 'Simulez votre impôt sur le revenu avec notre calculatrice fiscale. Estimation rapide selon le barème 2024.'
      }
    }
  },

  'outils/calculs-financiers': {
    title: 'Calculs Financiers',
    content: {
      hero: {
        title: 'Calculs Financiers',
        subtitle: 'Outils de calcul pour vos projets d\'investissement'
      },
      calculators: {
        title: 'Nos calculateurs',
        items: [
          {
            title: 'Intérêts composés',
            description: 'Calculez la croissance de votre épargne avec les intérêts composés.'
          },
          {
            title: 'Tableau d\'amortissement',
            description: 'Générez le tableau d\'amortissement de votre crédit.'
          },
          {
            title: 'Rendement net',
            description: 'Calculez le rendement net après impôts de vos placements.'
          },
          {
            title: 'Capacité d\'emprunt',
            description: 'Estimez votre capacité d\'emprunt selon vos revenus.'
          }
        ]
      },
      seo: {
        metaTitle: 'Calculs Financiers - Simulateurs | Azalée Patrimoine',
        metaDescription: 'Outils de calculs financiers : intérêts composés, amortissement, rendement net, capacité d\'emprunt. Simulez vos projets.'
      }
    }
  },

  'outils/guides-pratiques': {
    title: 'Guides Pratiques',
    content: {
      hero: {
        title: 'Guides Pratiques',
        subtitle: 'Des ressources pour mieux comprendre la gestion de patrimoine'
      },
      guides: {
        title: 'Nos guides',
        items: [
          {
            title: 'Guide de la défiscalisation',
            description: 'Comprendre les différents dispositifs de réduction d\'impôt.',
            downloadable: true
          },
          {
            title: 'Guide de l\'investissement immobilier',
            description: 'Les clés pour réussir votre premier investissement locatif.',
            downloadable: true
          },
          {
            title: 'Guide de la retraite',
            description: 'Préparer sereinement votre retraite étape par étape.',
            downloadable: true
          },
          {
            title: 'Guide de l\'assurance-vie',
            description: 'Tout savoir sur ce placement incontournable.',
            downloadable: true
          }
        ]
      },
      cta: {
        title: 'Recevez nos guides',
        description: 'Inscrivez-vous pour recevoir nos guides pratiques directement dans votre boîte mail.',
        buttonText: 'S\'inscrire'
      },
      seo: {
        metaTitle: 'Guides Pratiques Patrimoine | Azalée Patrimoine',
        metaDescription: 'Téléchargez nos guides pratiques gratuits : défiscalisation, immobilier, retraite, assurance-vie. Ressources pour gérer votre patrimoine.'
      }
    }
  },

  'outils/simulateur-investissement': {
    title: 'Simulateur d\'Investissement',
    content: {
      hero: {
        title: 'Simulateur d\'Investissement',
        subtitle: 'Projetez la croissance de votre patrimoine'
      },
      description: {
        text: 'Notre simulateur vous permet de visualiser l\'évolution de votre patrimoine selon différents scénarios d\'investissement.'
      },
      parameters: {
        title: 'Paramètres de simulation',
        items: [
          'Capital initial',
          'Versements mensuels',
          'Horizon d\'investissement',
          'Taux de rendement estimé',
          'Profil de risque'
        ]
      },
      results: {
        title: 'Résultats',
        items: [
          'Capital final estimé',
          'Plus-value totale',
          'Graphique d\'évolution',
          'Comparaison des scénarios'
        ]
      },
      seo: {
        metaTitle: 'Simulateur d\'Investissement | Azalée Patrimoine',
        metaDescription: 'Simulez l\'évolution de votre patrimoine avec notre outil de projection. Visualisez la croissance de vos investissements.'
      }
    }
  },

  'outils/simulations-generales': {
    title: 'Simulations Générales',
    content: {
      hero: {
        title: 'Simulations Financières',
        subtitle: 'Tous nos outils de simulation en un seul endroit'
      },
      simulations: {
        title: 'Nos simulateurs',
        categories: [
          {
            category: 'Fiscalité',
            items: ['Impôt sur le revenu', 'IFI', 'Plus-values']
          },
          {
            category: 'Investissement',
            items: ['Rendement locatif', 'Épargne mensuelle', 'Intérêts composés']
          },
          {
            category: 'Crédit',
            items: ['Capacité d\'emprunt', 'Mensualités', 'Amortissement']
          },
          {
            category: 'Retraite',
            items: ['Estimation pension', 'Épargne nécessaire', 'PER']
          }
        ]
      },
      seo: {
        metaTitle: 'Simulations Financières | Azalée Patrimoine',
        metaDescription: 'Accédez à tous nos simulateurs financiers : fiscalité, investissement, crédit, retraite. Outils gratuits pour gérer votre patrimoine.'
      }
    }
  },

  // ========== OUTILS FINANCIERS ==========
  'outils-financiers': {
    title: 'Outils Financiers',
    content: {
      hero: {
        title: 'Outils Financiers',
        subtitle: 'Des ressources pour optimiser vos finances'
      },
      categories: {
        title: 'Nos outils',
        items: [
          {
            title: 'Simulateurs',
            description: 'Simulateurs d\'investissement, de crédit et de fiscalité.',
            link: '/outils/simulations-generales'
          },
          {
            title: 'Guides',
            description: 'Guides pratiques sur la gestion de patrimoine.',
            link: '/outils/guides-pratiques'
          },
          {
            title: 'Calculatrices',
            description: 'Calculatrices d\'impôts et de rendement.',
            link: '/outils/calculs-financiers'
          },
          {
            title: 'Comparatifs',
            description: 'Comparatifs des solutions d\'investissement.',
            link: '/outils-financiers/assurance-vie-vs-per'
          }
        ]
      },
      seo: {
        metaTitle: 'Outils Financiers | Azalée Patrimoine',
        metaDescription: 'Découvrez nos outils financiers : simulateurs, guides, calculatrices et comparatifs pour optimiser votre patrimoine.'
      }
    }
  },

  'outils-financiers/assurance-vie-vs-per': {
    title: 'Assurance-vie vs PER',
    content: {
      hero: {
        title: 'Assurance-vie vs PER',
        subtitle: 'Quel placement choisir pour votre épargne ?'
      },
      comparison: {
        title: 'Comparatif détaillé',
        criteria: [
          {
            criterion: 'Objectif',
            assuranceVie: 'Épargne polyvalente',
            per: 'Préparation retraite'
          },
          {
            criterion: 'Disponibilité',
            assuranceVie: 'Totale',
            per: 'Bloquée jusqu\'à la retraite (sauf exceptions)'
          },
          {
            criterion: 'Avantage fiscal à l\'entrée',
            assuranceVie: 'Non',
            per: 'Oui (déduction du revenu imposable)'
          },
          {
            criterion: 'Fiscalité à la sortie',
            assuranceVie: 'Avantageuse après 8 ans',
            per: 'Imposition sur le revenu'
          },
          {
            criterion: 'Transmission',
            assuranceVie: 'Très avantageuse',
            per: 'Moins avantageuse'
          }
        ]
      },
      recommendation: {
        title: 'Notre recommandation',
        content: 'Les deux placements sont complémentaires. L\'assurance-vie offre plus de flexibilité, le PER est idéal pour réduire vos impôts si vous êtes dans une tranche élevée.'
      },
      seo: {
        metaTitle: 'Assurance-vie vs PER - Comparatif | Azalée Patrimoine',
        metaDescription: 'Comparatif complet entre assurance-vie et PER : fiscalité, disponibilité, transmission. Quel placement choisir pour votre épargne ?'
      }
    }
  },

  'outils-financiers/guide-defiscalisation': {
    title: 'Guide de la Défiscalisation',
    content: {
      hero: {
        title: 'Guide de la Défiscalisation',
        subtitle: 'Tout comprendre pour réduire légalement vos impôts'
      },
      introduction: {
        text: 'La défiscalisation regroupe l\'ensemble des dispositifs légaux permettant de réduire le montant de vos impôts. Ce guide vous présente les principales solutions.'
      },
      devices: {
        title: 'Les dispositifs de défiscalisation',
        categories: [
          {
            title: 'Immobilier',
            items: ['Loi Pinel', 'LMNP', 'Déficit foncier', 'Malraux', 'Monument historique']
          },
          {
            title: 'Épargne retraite',
            items: ['PER individuel', 'Article 83', 'Madelin']
          },
          {
            title: 'Investissement entreprise',
            items: ['FCPI', 'FIP', 'Sofica', 'Girardin industriel']
          },
          {
            title: 'Autres',
            items: ['Dons aux associations', 'Emploi à domicile', 'Frais de garde']
          }
        ]
      },
      ceiling: {
        title: 'Plafonnement des niches fiscales',
        content: 'L\'avantage fiscal global est plafonné à 10 000 € par an (18 000 € avec Sofica et Girardin).'
      },
      seo: {
        metaTitle: 'Guide de la Défiscalisation | Azalée Patrimoine',
        metaDescription: 'Guide complet de la défiscalisation : tous les dispositifs pour réduire vos impôts (Pinel, PER, FCPI, dons...). Plafonds et stratégies.'
      }
    }
  },

  // ========== PATRIMOINE ==========
  'patrimoine/bilan': {
    title: 'Bilan Patrimonial',
    content: {
      hero: {
        title: 'Bilan Patrimonial',
        subtitle: 'L\'étape essentielle pour optimiser votre patrimoine'
      },
      description: {
        text: 'Le bilan patrimonial est une analyse complète de votre situation financière, familiale et professionnelle. Il permet d\'identifier vos forces, vos faiblesses et de définir une stratégie adaptée.'
      },
      elements: {
        title: 'Les éléments analysés',
        items: [
          {
            title: 'Actifs',
            description: 'Immobilier, placements financiers, épargne, entreprise...'
          },
          {
            title: 'Passifs',
            description: 'Crédits, dettes, engagements financiers...'
          },
          {
            title: 'Revenus',
            description: 'Salaires, revenus fonciers, dividendes, pension...'
          },
          {
            title: 'Charges',
            description: 'Dépenses courantes, impôts, assurances...'
          },
          {
            title: 'Protection',
            description: 'Assurances, prévoyance, régimes matrimoniaux...'
          }
        ]
      },
      benefits: {
        title: 'Les bénéfices',
        items: [
          'Vision claire de votre patrimoine',
          'Identification des opportunités d\'optimisation',
          'Stratégie personnalisée et actionnable',
          'Suivi régulier de l\'évolution'
        ]
      },
      cta: {
        title: 'Demandez votre bilan',
        description: 'Nos conseillers réalisent votre bilan patrimonial complet gratuitement.',
        buttonText: 'Prendre rendez-vous'
      },
      seo: {
        metaTitle: 'Bilan Patrimonial Gratuit | Azalée Patrimoine',
        metaDescription: 'Réalisez votre bilan patrimonial complet avec nos experts. Analyse de votre situation, identification des opportunités et stratégie personnalisée.'
      }
    }
  },

  'patrimoine/protection-famille': {
    title: 'Protection de la Famille',
    content: {
      hero: {
        title: 'Protection de la Famille',
        subtitle: 'Protégez vos proches face aux aléas de la vie'
      },
      importance: {
        title: 'Pourquoi protéger sa famille ?',
        content: 'Anticiper les risques de la vie (décès, invalidité, dépendance) permet de garantir la sécurité financière de vos proches en toutes circonstances.'
      },
      solutions: {
        title: 'Les solutions de protection',
        items: [
          {
            title: 'Assurance décès',
            description: 'Capital versé à vos bénéficiaires en cas de décès.',
            benefit: 'Sécurité financière immédiate pour votre famille'
          },
          {
            title: 'Prévoyance',
            description: 'Maintien de revenus en cas d\'arrêt de travail ou invalidité.',
            benefit: 'Préservation de votre niveau de vie'
          },
          {
            title: 'Assurance dépendance',
            description: 'Rente mensuelle en cas de perte d\'autonomie.',
            benefit: 'Financement des soins sans impacter le patrimoine'
          },
          {
            title: 'Clause bénéficiaire',
            description: 'Optimisation de la transmission via l\'assurance-vie.',
            benefit: 'Transmission avantageuse hors succession'
          }
        ]
      },
      seo: {
        metaTitle: 'Protection de la Famille | Azalée Patrimoine',
        metaDescription: 'Protégez votre famille avec les bonnes solutions : assurance décès, prévoyance, dépendance. Garantissez leur sécurité financière.'
      }
    }
  },

  'patrimoine/succession-heritage': {
    title: 'Succession et Héritage',
    content: {
      hero: {
        title: 'Succession et Héritage',
        subtitle: 'Anticipez la transmission de votre patrimoine'
      },
      rules: {
        title: 'Les règles successorales',
        items: [
          {
            title: 'Réserve héréditaire',
            description: 'Part minimale revenant aux héritiers réservataires (enfants, conjoint).'
          },
          {
            title: 'Quotité disponible',
            description: 'Part dont vous pouvez disposer librement.'
          },
          {
            title: 'Droits de succession',
            description: 'Impôt calculé selon le lien de parenté et le montant transmis.'
          }
        ]
      },
      optimization: {
        title: 'Optimiser la transmission',
        items: [
          'Donations de son vivant (abattements renouvelables)',
          'Assurance-vie (fiscalité avantageuse)',
          'Démembrement de propriété',
          'Pacte Dutreil pour les entreprises'
        ]
      },
      abatements: {
        title: 'Abattements en vigueur',
        items: [
          { beneficiary: 'Enfant', amount: '100 000 €' },
          { beneficiary: 'Petit-enfant', amount: '31 865 €' },
          { beneficiary: 'Frère/Sœur', amount: '15 932 €' },
          { beneficiary: 'Neveu/Nièce', amount: '7 967 €' }
        ]
      },
      seo: {
        metaTitle: 'Succession et Héritage | Azalée Patrimoine',
        metaDescription: 'Anticipez votre succession : règles successorales, droits de succession, optimisation de la transmission. Conseil en héritage.'
      }
    }
  },

  'patrimoine/transmission': {
    title: 'Transmission du Patrimoine',
    content: {
      hero: {
        title: 'Transmission du Patrimoine',
        subtitle: 'Transmettez votre patrimoine dans les meilleures conditions'
      },
      strategies: {
        title: 'Stratégies de transmission',
        items: [
          {
            title: 'Donation simple',
            description: 'Transmission directe avec abattement fiscal renouvelable tous les 15 ans.'
          },
          {
            title: 'Donation-partage',
            description: 'Répartition équitable entre héritiers, évitant les conflits futurs.'
          },
          {
            title: 'Démembrement',
            description: 'Transmission de la nue-propriété en conservant l\'usufruit.'
          },
          {
            title: 'Assurance-vie',
            description: 'Transmission hors succession avec fiscalité avantageuse.'
          },
          {
            title: 'SCI familiale',
            description: 'Transmission progressive des parts de la société.'
          }
        ]
      },
      timeline: {
        title: 'Quand agir ?',
        content: 'Plus vous anticipez, plus vous optimisez. Les abattements se renouvellent tous les 15 ans, profitez-en !'
      },
      seo: {
        metaTitle: 'Transmission du Patrimoine | Azalée Patrimoine',
        metaDescription: 'Stratégies de transmission patrimoniale : donation, démembrement, assurance-vie, SCI. Optimisez la transmission à vos héritiers.'
      }
    }
  },

  // ========== PLACEMENTS ==========
  'placements/assurance-vie-luxembourg': {
    title: 'Assurance-vie Luxembourg',
    content: {
      hero: {
        title: 'Assurance-vie Luxembourgeoise',
        subtitle: 'La référence pour les patrimoines importants'
      },
      advantages: {
        title: 'Avantages du Luxembourg',
        items: [
          {
            title: 'Triangle de sécurité',
            description: 'Protection maximale de vos avoirs grâce au super-privilège luxembourgeois.'
          },
          {
            title: 'Neutralité fiscale',
            description: 'Fiscalité applicable selon votre pays de résidence.'
          },
          {
            title: 'Diversification',
            description: 'Accès à un univers d\'investissement élargi (fonds, titres vifs, private equity).'
          },
          {
            title: 'Sur-mesure',
            description: 'Fonds dédiés et mandats de gestion personnalisés.'
          }
        ]
      },
      forWho: {
        title: 'Pour qui ?',
        content: 'L\'assurance-vie luxembourgeoise s\'adresse aux patrimoines à partir de 250 000 € recherchant sécurité et flexibilité.'
      },
      seo: {
        metaTitle: 'Assurance-vie Luxembourg | Azalée Patrimoine',
        metaDescription: 'Découvrez l\'assurance-vie luxembourgeoise : sécurité maximale, neutralité fiscale, diversification. La solution pour les patrimoines importants.'
      }
    }
  },

  'placements/bourse-actions': {
    title: 'Bourse et Actions',
    content: {
      hero: {
        title: 'Investir en Bourse',
        subtitle: 'Diversifiez votre patrimoine avec les marchés financiers'
      },
      introduction: {
        text: 'L\'investissement en bourse permet de bénéficier de la croissance des entreprises sur le long terme. Bien accompagné, c\'est un puissant levier de création de richesse.'
      },
      vehicles: {
        title: 'Véhicules d\'investissement',
        items: [
          {
            title: 'PEA',
            description: 'Enveloppe fiscalement avantageuse pour les actions européennes.',
            advantage: 'Exonération d\'impôt après 5 ans'
          },
          {
            title: 'Compte-titres',
            description: 'Accès à tous les marchés mondiaux sans restriction.',
            advantage: 'Flexibilité maximale'
          },
          {
            title: 'Assurance-vie',
            description: 'Investissement en unités de compte (OPCVM, ETF).',
            advantage: 'Fiscalité avantageuse et transmission'
          }
        ]
      },
      approach: {
        title: 'Notre approche',
        items: [
          'Définition de votre profil de risque',
          'Allocation d\'actifs diversifiée',
          'Sélection rigoureuse des supports',
          'Suivi et rééquilibrage régulier'
        ]
      },
      seo: {
        metaTitle: 'Investir en Bourse | Azalée Patrimoine',
        metaDescription: 'Investissez en bourse avec accompagnement : PEA, compte-titres, assurance-vie. Stratégie personnalisée et diversification.'
      }
    }
  },

  'placements/compte-titres': {
    title: 'Compte-Titres',
    content: {
      hero: {
        title: 'Compte-Titres Ordinaire',
        subtitle: 'L\'accès le plus large aux marchés financiers'
      },
      description: {
        text: 'Le compte-titres ordinaire (CTO) permet d\'investir sur tous les marchés financiers mondiaux sans limitation. C\'est l\'enveloppe la plus flexible pour vos investissements boursiers.'
      },
      advantages: {
        title: 'Avantages',
        items: [
          'Aucun plafond de versement',
          'Accès mondial (actions, obligations, ETF, fonds)',
          'Pas de durée de détention minimale',
          'Possibilité de vente à découvert'
        ]
      },
      taxation: {
        title: 'Fiscalité',
        content: 'Les plus-values et dividendes sont soumis au PFU (30%) ou au barème de l\'IR + prélèvements sociaux sur option.'
      },
      comparison: {
        title: 'CTO vs PEA',
        items: [
          { criterion: 'Plafond', cto: 'Illimité', pea: '150 000 €' },
          { criterion: 'Univers', cto: 'Mondial', pea: 'Europe principalement' },
          { criterion: 'Fiscalité', cto: 'PFU 30%', pea: '17,2% après 5 ans' }
        ]
      },
      seo: {
        metaTitle: 'Compte-Titres Ordinaire | Azalée Patrimoine',
        metaDescription: 'Guide du compte-titres : avantages, fiscalité, comparaison avec le PEA. Investissez sur tous les marchés mondiaux.'
      }
    }
  },

  'placements/contrat-capitalisation': {
    title: 'Contrat de Capitalisation',
    content: {
      hero: {
        title: 'Contrat de Capitalisation',
        subtitle: 'L\'alternative méconnue à l\'assurance-vie'
      },
      description: {
        text: 'Le contrat de capitalisation partage de nombreuses caractéristiques avec l\'assurance-vie mais offre des avantages spécifiques, notamment pour la transmission et les personnes morales.'
      },
      specificities: {
        title: 'Spécificités',
        items: [
          {
            title: 'Pas de dénouement au décès',
            description: 'Le contrat entre dans la succession et peut être conservé par les héritiers.'
          },
          {
            title: 'Conservation de l\'antériorité',
            description: 'Les héritiers bénéficient de l\'antériorité fiscale du contrat.'
          },
          {
            title: 'Accessible aux personnes morales',
            description: 'Idéal pour la trésorerie d\'entreprise.'
          },
          {
            title: 'Donation possible',
            description: 'Le contrat peut être donné de son vivant.'
          }
        ]
      },
      forWho: {
        title: 'Pour qui ?',
        content: 'Idéal pour ceux qui souhaitent transmettre l\'antériorité fiscale à leurs héritiers ou pour les entreprises souhaitant placer leur trésorerie.'
      },
      seo: {
        metaTitle: 'Contrat de Capitalisation | Azalée Patrimoine',
        metaDescription: 'Découvrez le contrat de capitalisation : alternative à l\'assurance-vie, avantages successoraux et placement pour personnes morales.'
      }
    }
  },

  'placements/etf-produits-financiers': {
    title: 'ETF et Produits Financiers',
    content: {
      hero: {
        title: 'ETF et Produits Financiers',
        subtitle: 'Investir simplement et à moindre coût'
      },
      etfDescription: {
        title: 'Qu\'est-ce qu\'un ETF ?',
        content: 'Un ETF (Exchange Traded Fund) est un fonds coté en bourse qui réplique la performance d\'un indice (CAC 40, S&P 500, MSCI World...). Il combine les avantages des fonds et des actions.'
      },
      advantages: {
        title: 'Avantages des ETF',
        items: [
          'Frais réduits (0,1% à 0,5% par an)',
          'Diversification immédiate',
          'Liquidité (achat/vente en continu)',
          'Transparence (composition connue)'
        ]
      },
      types: {
        title: 'Types d\'ETF',
        items: [
          { type: 'Actions', description: 'Indices actions (CAC 40, S&P 500, MSCI World)' },
          { type: 'Obligations', description: 'Obligations d\'État ou d\'entreprises' },
          { type: 'Sectoriels', description: 'Secteurs spécifiques (technologie, santé...)' },
          { type: 'Thématiques', description: 'Tendances (ESG, IA, eau...)' }
        ]
      },
      seo: {
        metaTitle: 'ETF et Produits Financiers | Azalée Patrimoine',
        metaDescription: 'Guide des ETF : fonctionnement, avantages, types. Investissez à moindre coût avec les fonds indiciels cotés.'
      }
    }
  },

  'placements/pea-per': {
    title: 'PEA et PER',
    content: {
      hero: {
        title: 'PEA et PER',
        subtitle: 'Les enveloppes fiscales incontournables'
      },
      pea: {
        title: 'Plan d\'Épargne en Actions (PEA)',
        description: 'Enveloppe fiscalement avantageuse pour investir en actions européennes.',
        advantages: [
          'Exonération d\'impôt sur les plus-values après 5 ans',
          'Seuls les prélèvements sociaux (17,2%) s\'appliquent',
          'Plafond de versement : 150 000 €'
        ]
      },
      per: {
        title: 'Plan d\'Épargne Retraite (PER)',
        description: 'Produit d\'épargne retraite avec avantage fiscal à l\'entrée.',
        advantages: [
          'Déduction des versements du revenu imposable',
          'Plafond : 10% des revenus N-1 ou 10% PASS',
          'Sortie en capital ou rente à la retraite'
        ]
      },
      comparison: {
        title: 'PEA vs PER',
        items: [
          { criterion: 'Objectif', pea: 'Épargne actions', per: 'Retraite' },
          { criterion: 'Avantage fiscal', pea: 'À la sortie', per: 'À l\'entrée' },
          { criterion: 'Disponibilité', pea: 'Après 5 ans', per: 'À la retraite' }
        ]
      },
      seo: {
        metaTitle: 'PEA et PER - Comparatif | Azalée Patrimoine',
        metaDescription: 'Comparatif PEA et PER : fiscalité, plafonds, avantages. Choisissez la bonne enveloppe pour votre épargne.'
      }
    }
  },

  'placements/scpi-opci': {
    title: 'SCPI et OPCI',
    content: {
      hero: {
        title: 'SCPI et OPCI',
        subtitle: 'L\'immobilier pierre-papier accessible à tous'
      },
      scpi: {
        title: 'SCPI (Société Civile de Placement Immobilier)',
        description: 'Investissement collectif dans l\'immobilier professionnel.',
        advantages: [
          'Mutualisation du risque (nombreux immeubles)',
          'Rendement attractif (4-6% en moyenne)',
          'Gestion déléguée',
          'Accessibilité (à partir de quelques centaines d\'euros)'
        ],
        types: ['Bureaux', 'Commerces', 'Logistique', 'Santé', 'Résidentiel']
      },
      opci: {
        title: 'OPCI (Organisme de Placement Collectif Immobilier)',
        description: 'Fonds mixte alliant immobilier et actifs financiers.',
        composition: '60% minimum en immobilier, le reste en actifs financiers et liquidités.',
        advantages: [
          'Plus liquide que les SCPI',
          'Diversification immobilier/financier',
          'Accessible via assurance-vie'
        ]
      },
      seo: {
        metaTitle: 'SCPI et OPCI - Pierre Papier | Azalée Patrimoine',
        metaDescription: 'Investissez en immobilier avec les SCPI et OPCI : rendement, diversification, gestion déléguée. La pierre-papier accessible.'
      }
    }
  },

  'placements/taux-interets': {
    title: 'Taux et Intérêts',
    content: {
      hero: {
        title: 'Taux et Intérêts',
        subtitle: 'Comprendre les taux pour optimiser vos placements'
      },
      types: {
        title: 'Les différents types de taux',
        items: [
          {
            title: 'Taux nominal',
            description: 'Taux affiché d\'un placement ou d\'un crédit.'
          },
          {
            title: 'Taux réel',
            description: 'Taux nominal diminué de l\'inflation.'
          },
          {
            title: 'TAEG',
            description: 'Taux annuel effectif global incluant tous les frais d\'un crédit.'
          },
          {
            title: 'Taux directeurs',
            description: 'Taux fixés par les banques centrales (BCE, Fed).'
          }
        ]
      },
      currentRates: {
        title: 'Taux actuels (indicatifs)',
        items: [
          { product: 'Livret A', rate: '3%' },
          { product: 'Fonds euros', rate: '2,5% - 4%' },
          { product: 'Crédit immobilier 20 ans', rate: '3,5% - 4%' }
        ]
      },
      seo: {
        metaTitle: 'Taux et Intérêts | Azalée Patrimoine',
        metaDescription: 'Comprendre les taux d\'intérêt : taux nominal, réel, TAEG. Taux actuels et impact sur vos placements.'
      }
    }
  },

  // ========== PRODUITS STRUCTURÉS ==========
  'placements/produits-structures/ambition-pharma-2026': {
    title: 'Ambition Pharma 2026',
    content: {
      hero: {
        title: 'Ambition Pharma 2026',
        subtitle: 'Produit structuré sur le secteur pharmaceutique'
      },
      characteristics: {
        title: 'Caractéristiques',
        items: [
          { label: 'Sous-jacent', value: 'Indice panier pharma européen' },
          { label: 'Durée', value: '6 ans maximum' },
          { label: 'Coupon', value: '8% par an' },
          { label: 'Protection capital', value: '-40% à l\'échéance' }
        ]
      },
      mechanism: {
        title: 'Mécanisme',
        content: 'Versement d\'un coupon annuel de 8% si le sous-jacent est au-dessus de son niveau initial. Remboursement anticipé possible si performance positive aux dates anniversaires.'
      },
      risks: {
        title: 'Risques',
        items: [
          'Perte en capital possible si baisse supérieure à 40%',
          'Absence de garantie du capital',
          'Risque de crédit de l\'émetteur'
        ]
      },
      seo: {
        metaTitle: 'Ambition Pharma 2026 - Produit Structuré | Azalée Patrimoine',
        metaDescription: 'Produit structuré Ambition Pharma 2026 : coupon 8%/an, protection -40%. Investissement secteur pharmaceutique.'
      }
    }
  },

  'placements/produits-structures/athena-ia-robotique-2025': {
    title: 'Athena IA Robotique 2025',
    content: {
      hero: {
        title: 'Athena IA & Robotique 2025',
        subtitle: 'Produit structuré sur les leaders de l\'intelligence artificielle'
      },
      characteristics: {
        title: 'Caractéristiques',
        items: [
          { label: 'Sous-jacent', value: 'Panier actions IA/Robotique' },
          { label: 'Durée', value: '5 ans maximum' },
          { label: 'Coupon', value: '10% par an' },
          { label: 'Protection capital', value: '-30% à l\'échéance' }
        ]
      },
      mechanism: {
        title: 'Mécanisme',
        content: 'Observation trimestrielle avec possibilité de remboursement anticipé si le panier est stable ou en hausse. Coupon mémorisé en cas de baisse temporaire.'
      },
      seo: {
        metaTitle: 'Athena IA Robotique 2025 | Azalée Patrimoine',
        metaDescription: 'Produit structuré Athena IA Robotique : coupon 10%/an sur les leaders de l\'intelligence artificielle et robotique.'
      }
    }
  },

  'placements/produits-structures/athena-luxe-2025': {
    title: 'Athena Luxe 2025',
    content: {
      hero: {
        title: 'Athena Luxe 2025',
        subtitle: 'Produit structuré sur les valeurs du luxe'
      },
      characteristics: {
        title: 'Caractéristiques',
        items: [
          { label: 'Sous-jacent', value: 'Panier luxe (LVMH, Hermès, Kering)' },
          { label: 'Durée', value: '6 ans maximum' },
          { label: 'Coupon', value: '7,5% par an' },
          { label: 'Protection capital', value: '-35% à l\'échéance' }
        ]
      },
      mechanism: {
        title: 'Mécanisme',
        content: 'Coupon annuel conditionnel versé si le panier est au-dessus de 70% de son niveau initial. Remboursement anticipé à partir de l\'année 2.'
      },
      seo: {
        metaTitle: 'Athena Luxe 2025 - Produit Structuré | Azalée Patrimoine',
        metaDescription: 'Produit structuré Athena Luxe 2025 : exposition au secteur du luxe français, coupon 7,5%/an.'
      }
    }
  },

  'placements/produits-structures/autocall-credit-agricole-2025': {
    title: 'Autocall Crédit Agricole 2025',
    content: {
      hero: {
        title: 'Autocall Crédit Agricole 2025',
        subtitle: 'Produit structuré sur l\'action Crédit Agricole'
      },
      characteristics: {
        title: 'Caractéristiques',
        items: [
          { label: 'Sous-jacent', value: 'Action Crédit Agricole SA' },
          { label: 'Durée', value: '8 ans maximum' },
          { label: 'Coupon', value: '9% par an' },
          { label: 'Protection capital', value: '-50% à l\'échéance' }
        ]
      },
      mechanism: {
        title: 'Mécanisme autocall',
        content: 'Remboursement automatique (autocall) si l\'action est au-dessus de 100% de son niveau initial aux dates d\'observation annuelles, avec versement des coupons cumulés.'
      },
      seo: {
        metaTitle: 'Autocall Crédit Agricole 2025 | Azalée Patrimoine',
        metaDescription: 'Produit structuré Autocall sur Crédit Agricole : coupon 9%/an, mécanisme de remboursement automatique.'
      }
    }
  },

  'placements/produits-structures/energie-degressive-2025': {
    title: 'Énergie Dégressive 2025',
    content: {
      hero: {
        title: 'Énergie Dégressive 2025',
        subtitle: 'Produit structuré sur le secteur énergétique avec barrière dégressive'
      },
      characteristics: {
        title: 'Caractéristiques',
        items: [
          { label: 'Sous-jacent', value: 'Indice secteur énergie européen' },
          { label: 'Durée', value: '10 ans maximum' },
          { label: 'Coupon', value: '6,5% par an' },
          { label: 'Barrière', value: 'Dégressive de 100% à 80%' }
        ]
      },
      mechanism: {
        title: 'Mécanisme dégressif',
        content: 'La barrière de remboursement anticipé diminue chaque année (100%, 95%, 90%...), facilitant le rappel du produit même en cas de légère baisse du sous-jacent.'
      },
      seo: {
        metaTitle: 'Énergie Dégressive 2025 | Azalée Patrimoine',
        metaDescription: 'Produit structuré Énergie avec barrière dégressive : coupon 6,5%/an, secteur énergétique européen.'
      }
    }
  },

  // ========== RETRAITE ==========
  'retraite/plan-retraite': {
    title: 'Plan Retraite',
    content: {
      hero: {
        title: 'Planifier sa Retraite',
        subtitle: 'Anticipez pour vivre sereinement vos années retraite'
      },
      importance: {
        title: 'Pourquoi planifier ?',
        content: 'Les régimes obligatoires ne couvrent en moyenne que 50% de vos revenus. Anticiper permet de maintenir votre niveau de vie.'
      },
      steps: {
        title: 'Les étapes d\'une bonne planification',
        items: [
          {
            number: '01',
            title: 'Estimer sa pension',
            description: 'Évaluez vos droits acquis et projetez votre pension future.'
          },
          {
            number: '02',
            title: 'Définir ses besoins',
            description: 'Calculez le montant mensuel nécessaire pour votre retraite.'
          },
          {
            number: '03',
            title: 'Identifier l\'écart',
            description: 'Mesurez la différence entre pension estimée et besoins.'
          },
          {
            number: '04',
            title: 'Mettre en place les solutions',
            description: 'PER, assurance-vie, immobilier locatif...'
          }
        ]
      },
      solutions: {
        title: 'Solutions d\'épargne retraite',
        items: [
          { name: 'PER', description: 'Avantage fiscal immédiat, sortie à la retraite' },
          { name: 'Assurance-vie', description: 'Flexibilité, fiscalité avantageuse après 8 ans' },
          { name: 'Immobilier locatif', description: 'Revenus complémentaires réguliers' }
        ]
      },
      seo: {
        metaTitle: 'Planifier sa Retraite | Azalée Patrimoine',
        metaDescription: 'Préparez votre retraite efficacement : estimation pension, solutions d\'épargne (PER, assurance-vie), accompagnement personnalisé.'
      }
    }
  },

  'retraite/prevoyance-protection': {
    title: 'Prévoyance et Protection',
    content: {
      hero: {
        title: 'Prévoyance et Protection',
        subtitle: 'Sécurisez vos revenus face aux aléas de la vie'
      },
      risks: {
        title: 'Les risques à couvrir',
        items: [
          {
            title: 'Arrêt de travail',
            description: 'Maladie ou accident empêchant de travailler temporairement.',
            solution: 'Garantie incapacité temporaire de travail'
          },
          {
            title: 'Invalidité',
            description: 'Réduction permanente de la capacité de travail.',
            solution: 'Rente d\'invalidité'
          },
          {
            title: 'Décès',
            description: 'Protection financière des proches.',
            solution: 'Capital décès ou rente éducation'
          }
        ]
      },
      coverage: {
        title: 'Les couvertures obligatoires',
        content: 'La Sécurité sociale et les régimes complémentaires couvrent partiellement ces risques. Une prévoyance individuelle complète cette protection.'
      },
      profiles: {
        title: 'Selon votre profil',
        items: [
          { profile: 'Salarié', recommendation: 'Vérifiez votre couverture entreprise et complétez si besoin' },
          { profile: 'TNS/Indépendant', recommendation: 'Prévoyance Madelin indispensable' },
          { profile: 'Dirigeant', recommendation: 'Contrat homme-clé et prévoyance personnelle' }
        ]
      },
      seo: {
        metaTitle: 'Prévoyance et Protection | Azalée Patrimoine',
        metaDescription: 'Protégez vos revenus : arrêt de travail, invalidité, décès. Solutions de prévoyance adaptées à votre profil.'
      }
    }
  },

  'retraite/rachat-trimestres': {
    title: 'Rachat de Trimestres',
    content: {
      hero: {
        title: 'Rachat de Trimestres',
        subtitle: 'Complétez votre carrière pour partir plus tôt ou avec une meilleure pension'
      },
      description: {
        text: 'Le rachat de trimestres permet de valider des périodes non cotisées (études, années incomplètes) pour améliorer ses droits à la retraite.'
      },
      types: {
        title: 'Types de rachat',
        items: [
          {
            type: 'Années d\'études supérieures',
            description: 'Jusqu\'à 12 trimestres rachetables.',
            condition: 'Diplôme obtenu'
          },
          {
            type: 'Années incomplètes',
            description: 'Trimestres manquants dans une année.',
            condition: 'Au moins 1 trimestre validé dans l\'année'
          },
          {
            type: 'Stage en entreprise',
            description: 'Stages effectués sous certaines conditions.',
            condition: 'Stage de plus de 2 mois'
          }
        ]
      },
      calculation: {
        title: 'Coût du rachat',
        content: 'Le coût dépend de votre âge, vos revenus et l\'option choisie (taux seul ou taux + durée). Déductible des revenus imposables.'
      },
      seo: {
        metaTitle: 'Rachat de Trimestres | Azalée Patrimoine',
        metaDescription: 'Rachetez des trimestres pour votre retraite : études, années incomplètes. Coût, déductibilité et stratégie optimale.'
      }
    }
  },

  'retraite/retraite-progressive': {
    title: 'Retraite Progressive',
    content: {
      hero: {
        title: 'Retraite Progressive',
        subtitle: 'Aménagez votre fin de carrière en douceur'
      },
      principle: {
        title: 'Principe',
        content: 'La retraite progressive permet de réduire son activité professionnelle tout en percevant une partie de sa pension de retraite.'
      },
      conditions: {
        title: 'Conditions d\'accès',
        items: [
          'Avoir au moins 60 ans',
          'Justifier de 150 trimestres cotisés tous régimes',
          'Exercer une activité à temps partiel (40-80% d\'un temps plein)',
          'Accord de l\'employeur'
        ]
      },
      advantages: {
        title: 'Avantages',
        items: [
          'Transition en douceur vers la retraite',
          'Maintien des revenus (salaire + pension)',
          'Acquisition de trimestres supplémentaires',
          'Amélioration de la pension définitive'
        ]
      },
      calculation: {
        title: 'Calcul de la pension provisoire',
        content: 'La fraction de pension versée est proportionnelle à la réduction d\'activité : 50% de temps partiel = 50% de la pension.'
      },
      seo: {
        metaTitle: 'Retraite Progressive | Azalée Patrimoine',
        metaDescription: 'Retraite progressive : conditions, avantages et calcul. Aménagez votre fin de carrière en cumulant salaire et pension.'
      }
    }
  },

  'retraite/simulation': {
    title: 'Simulation Retraite',
    content: {
      hero: {
        title: 'Simulation Retraite',
        subtitle: 'Estimez votre future pension en quelques minutes'
      },
      simulator: {
        title: 'Notre simulateur',
        description: 'Renseignez vos informations pour obtenir une estimation de votre pension de retraite et identifier l\'écart à combler.'
      },
      inputs: {
        title: 'Informations nécessaires',
        items: [
          'Date de naissance',
          'Situation professionnelle actuelle',
          'Revenus annuels bruts',
          'Nombre de trimestres validés',
          'Âge de départ souhaité'
        ]
      },
      outputs: {
        title: 'Résultats de la simulation',
        items: [
          'Pension estimée (base + complémentaire)',
          'Taux de remplacement',
          'Âge de départ possible au taux plein',
          'Écart avec vos besoins'
        ]
      },
      cta: {
        title: 'Allez plus loin',
        description: 'Notre simulation vous donne une première estimation. Pour une analyse approfondie, prenez rendez-vous avec nos experts.',
        buttonText: 'Prendre rendez-vous'
      },
      seo: {
        metaTitle: 'Simulation Retraite | Azalée Patrimoine',
        metaDescription: 'Simulez votre pension de retraite gratuitement. Estimation personnalisée de vos droits et stratégies d\'optimisation.'
      }
    }
  },

  // ========== PAGES INSTITUTIONNELLES COMPLÉMENTAIRES ==========
  'equipe': {
    title: 'Notre Équipe',
    content: {
      hero: {
        title: 'Notre Équipe de Conseillers',
        subtitle: 'Des experts passionnés à votre service'
      },
      introduction: {
        text: 'Notre équipe réunit des professionnels expérimentés et certifiés, unis par une même passion : vous accompagner dans la réalisation de vos projets patrimoniaux.'
      },
      team: {
        members: [
          {
            name: 'Alexandre Dupont',
            position: 'Directeur Associé - Conseiller en Gestion de Patrimoine',
            photo: '/images/team/alexandre.webp',
            bio: 'Fort de 15 ans d\'expérience dans la gestion de patrimoine, Alexandre accompagne une clientèle diversifiée dans l\'optimisation de leur patrimoine.',
            certifications: ['Master Gestion de Patrimoine', 'CIF membre ANACOFI'],
            experience: '15 ans'
          },
          {
            name: 'Marie Leroy',
            position: 'Conseillère en Investissements Financiers',
            photo: '/images/team/marie.webp',
            bio: 'Spécialiste des marchés financiers, Marie accompagne nos clients dans leurs stratégies d\'investissement et d\'épargne.',
            certifications: ['Master Finance', 'AMF - Conseil en investissement'],
            experience: '10 ans'
          },
          {
            name: 'Thomas Bernard',
            position: 'Expert Immobilier et Défiscalisation',
            photo: '/images/team/thomas.webp',
            bio: 'Thomas met son expertise immobilière au service de nos clients pour des investissements locatifs rentables et optimisés fiscalement.',
            certifications: ['Expert immobilier certifié', 'Carte T'],
            experience: '12 ans'
          },
          {
            name: 'Sophie Martin',
            position: 'Conseillère Retraite et Prévoyance',
            photo: '/images/team/sophie.webp',
            bio: 'Sophie accompagne nos clients dans la préparation de leur retraite et la mise en place de solutions de prévoyance adaptées.',
            certifications: ['DU Retraite et Prévoyance', 'Courtier IAS'],
            experience: '8 ans'
          }
        ]
      },
      expertise: {
        title: 'Notre expertise',
        areas: [
          { title: 'Gestion de patrimoine', description: 'Conseil global et stratégie personnalisée' },
          { title: 'Investissements', description: 'Immobilier, financier et diversification' },
          { title: 'Fiscalité', description: 'Optimisation et défiscalisation' },
          { title: 'Retraite', description: 'Préparation et solutions d\'épargne' }
        ]
      },
      seo: {
        metaTitle: 'Notre Équipe | Azalée Patrimoine - Conseillers en Patrimoine',
        metaDescription: 'Découvrez l\'équipe d\'experts Azalée Patrimoine. Des conseillers certifiés et expérimentés pour vous accompagner dans vos projets.'
      }
    }
  },

  'qui-sommes-nous': {
    title: 'Qui Sommes-Nous',
    content: {
      hero: {
        title: 'Qui Sommes-Nous',
        subtitle: 'Votre partenaire de confiance en gestion de patrimoine'
      },
      story: {
        title: 'Notre histoire',
        content: 'Azalée Patrimoine est née de la conviction qu\'une gestion de patrimoine de qualité doit être accessible à tous. Fondé par des professionnels passionnés, notre cabinet s\'est construit autour de valeurs fortes : indépendance, transparence et excellence du conseil.'
      },
      mission: {
        title: 'Notre mission',
        content: 'Accompagner nos clients dans la construction, la protection et la transmission de leur patrimoine, en leur offrant un conseil personnalisé et des solutions adaptées à leurs objectifs et leur situation.'
      },
      values: {
        title: 'Nos valeurs',
        items: [
          {
            title: 'Indépendance',
            description: 'Nous sélectionnons les meilleures solutions du marché sans contrainte ni pression commerciale.'
          },
          {
            title: 'Transparence',
            description: 'Nos honoraires, notre méthodologie et nos recommandations sont clairs et explicites.'
          },
          {
            title: 'Excellence',
            description: 'Nous nous engageons à fournir un conseil de haute qualité, fondé sur une expertise solide.'
          },
          {
            title: 'Proximité',
            description: 'Nous construisons des relations durables avec nos clients, basées sur l\'écoute et la confiance.'
          }
        ]
      },
      figures: {
        title: 'Azalée en chiffres',
        items: [
          { value: '500+', label: 'Clients accompagnés' },
          { value: '15 ans', label: 'D\'expérience' },
          { value: '200M€', label: 'D\'encours gérés' },
          { value: '98%', label: 'De clients satisfaits' }
        ]
      },
      seo: {
        metaTitle: 'Qui Sommes-Nous | Azalée Patrimoine - Cabinet de Conseil',
        metaDescription: 'Découvrez Azalée Patrimoine : notre histoire, mission et valeurs. Un cabinet indépendant dédié à l\'accompagnement patrimonial.'
      }
    }
  }
};

async function main() {
  console.log('🚀 Initialisation complète du CMS...\n');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const [path, pageData] of Object.entries(allPagesContent)) {
      try {
        const existing = await PageContent.findOne({ path });
        
        if (existing) {
          // Mise à jour si le contenu existant est vide ou minimal
          const existingContentKeys = Object.keys(existing.content || {});
          const newContentKeys = Object.keys(pageData.content || {});
          
          if (existingContentKeys.length < newContentKeys.length) {
            await PageContent.updateOne(
              { path },
              { 
                $set: { 
                  title: pageData.title,
                  content: pageData.content,
                  lastModified: new Date()
                }
              }
            );
            console.log(`📝 Mis à jour: ${path}`);
            updated++;
          } else {
            console.log(`⏭️  Ignoré (existe déjà): ${path}`);
            skipped++;
          }
        } else {
          await PageContent.create({
            path,
            title: pageData.title,
            content: pageData.content,
            lastModified: new Date()
          });
          console.log(`✅ Créé: ${path}`);
          created++;
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⏭️  Ignoré (doublon): ${path}`);
          skipped++;
        } else {
          console.error(`❌ Erreur pour ${path}:`, error.message);
        }
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSUMÉ');
    console.log('='.repeat(50));
    console.log(`✅ Créées: ${created}`);
    console.log(`📝 Mises à jour: ${updated}`);
    console.log(`⏭️  Ignorées: ${skipped}`);
    console.log(`📄 Total traité: ${Object.keys(allPagesContent).length}`);

    await mongoose.disconnect();
    console.log('\n✅ Déconnecté de MongoDB');
    console.log('\n🎉 Initialisation CMS terminée !');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

