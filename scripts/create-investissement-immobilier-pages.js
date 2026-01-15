// Script to create all investissement-immobilier subpages
const fs = require('fs');
const path = require('path');

// Pages configuration
const pages = [
  {
    slug: 'lmnp',
    defaultContent: {
      hero: {
        title: "LMNP : loueur en meublé non professionnel",
        subtitle: "Le statut LMNP permet aux propriétaires de biens meublés de bénéficier d'une fiscalité avantageuse sur leurs revenus locatifs.",
      },
      avantages: {
        title: "Les avantages du LMNP",
        items: [
          { title: "Amortissement du bien", description: "Déduisez la valeur du bien de vos revenus locatifs sur plusieurs années." },
          { title: "Régime micro-BIC", description: "Abattement forfaitaire de 50% sur les revenus locatifs." },
          { title: "Récupération TVA", description: "Possibilité de récupérer la TVA sur le prix d'achat (résidences services)." }
        ]
      },
      seo: {
        metaTitle: "LMNP : statut et avantages fiscaux | Azalée Patrimoine",
        metaDescription: "Le statut LMNP offre une fiscalité attractive. Azalée Patrimoine vous guide pour investir en location meublée."
      }
    }
  },
  {
    slug: 'pinel',
    defaultContent: {
      hero: {
        title: "Loi Pinel : défiscalisation immobilière",
        subtitle: "Le dispositif Pinel permet de réduire vos impôts en investissant dans l'immobilier neuf destiné à la location.",
      },
      avantages: {
        title: "Les avantages de la loi Pinel",
        items: [
          { title: "Réduction d'impôt", description: "Jusqu'à 21% du prix du bien sur 12 ans." },
          { title: "Constitution de patrimoine", description: "Investissez dans l'immobilier neuf de qualité." },
          { title: "Revenus locatifs", description: "Percevez des loyers réguliers pendant la durée d'engagement." }
        ]
      },
      seo: {
        metaTitle: "Loi Pinel : investir et réduire ses impôts | Azalée",
        metaDescription: "Le dispositif Pinel permet de réduire vos impôts en investissant dans le neuf. Analyse des zones éligibles."
      }
    }
  },
  {
    slug: 'scpi',
    defaultContent: {
      hero: {
        title: "SCPI : la pierre-papier",
        subtitle: "Les SCPI permettent d'investir dans l'immobilier professionnel sans les contraintes de gestion directe.",
      },
      avantages: {
        title: "Les avantages des SCPI",
        items: [
          { title: "Accessibilité", description: "Investissez à partir de quelques centaines d'euros." },
          { title: "Diversification", description: "Accédez à un portefeuille immobilier diversifié." },
          { title: "Gestion déléguée", description: "Aucune contrainte de gestion locative." }
        ]
      },
      seo: {
        metaTitle: "SCPI : investir dans l'immobilier locatif | Azalée",
        metaDescription: "Investir en SCPI pour percevoir des revenus potentiels sans contrainte de gestion."
      }
    }
  },
  {
    slug: 'malraux',
    defaultContent: {
      hero: {
        title: "Loi Malraux : défiscalisation et patrimoine",
        subtitle: "La loi Malraux offre une réduction d'impôt pour la restauration d'immeubles situés dans des secteurs sauvegardés.",
      },
      avantages: {
        title: "Les avantages de la loi Malraux",
        items: [
          { title: "Réduction d'impôt", description: "22% à 30% du montant des travaux." },
          { title: "Patrimoine de qualité", description: "Investissez dans des immeubles historiques." },
          { title: "Hors plafonnement", description: "Non soumis au plafonnement des niches fiscales." }
        ]
      },
      seo: {
        metaTitle: "Loi Malraux : défiscalisation et patrimoine | Azalée",
        metaDescription: "Investissez dans l'immobilier ancien réhabilité et bénéficiez d'une forte réduction d'impôt."
      }
    }
  },
  {
    slug: 'denormandie',
    defaultContent: {
      hero: {
        title: "Loi Denormandie : défiscalisation ancien",
        subtitle: "Le dispositif Denormandie encourage la rénovation des logements anciens en centre-ville.",
      },
      avantages: {
        title: "Les avantages du Denormandie",
        items: [
          { title: "Réduction d'impôt", description: "12% à 21% selon la durée d'engagement." },
          { title: "Travaux déductibles", description: "Les travaux de rénovation sont éligibles." },
          { title: "Villes éligibles", description: "Programme Action Cœur de Ville." }
        ]
      },
      seo: {
        metaTitle: "Loi Denormandie : défiscalisation ancien | Azalée",
        metaDescription: "Le dispositif Denormandie encourage la rénovation des logements en centre-ville."
      }
    }
  },
  {
    slug: 'credit-immobilier',
    defaultContent: {
      hero: {
        title: "Crédit immobilier et financement",
        subtitle: "Optimisez le financement de vos projets immobiliers avec nos conseils d'experts.",
      },
      avantages: {
        title: "Nos services de courtage",
        items: [
          { title: "Négociation des taux", description: "Obtenez les meilleures conditions de financement." },
          { title: "Assurance emprunteur", description: "Optimisez le coût de votre assurance." },
          { title: "Montage financier", description: "Structuration adaptée à votre projet." }
        ]
      },
      seo: {
        metaTitle: "Crédit immobilier : courtage et financement | Azalée",
        metaDescription: "Obtenez les meilleures conditions pour financer vos acquisitions."
      }
    }
  },
  {
    slug: 'nue-propriete',
    defaultContent: {
      hero: {
        title: "Investir en nue-propriété immobilière",
        subtitle: "L'investissement en nue-propriété permet d'acquérir un bien avec une décote importante.",
      },
      avantages: {
        title: "Les avantages de la nue-propriété",
        items: [
          { title: "Décote à l'achat", description: "30% à 50% de réduction sur le prix." },
          { title: "Pas de fiscalité foncière", description: "Aucun impôt pendant la durée du démembrement." },
          { title: "Récupération pleine propriété", description: "Automatique à l'extinction de l'usufruit." }
        ]
      },
      seo: {
        metaTitle: "Nue-propriété : investissement immobilier | Azalée",
        metaDescription: "Acheter la nue-propriété d'un bien permet d'investir avec une décote importante."
      }
    }
  },
  {
    slug: 'plus-value-immobiliere',
    defaultContent: {
      hero: {
        title: "Plus-value immobilière : fiscalité et calcul",
        subtitle: "Comprendre la taxation des plus-values immobilières pour optimiser votre revente.",
      },
      avantages: {
        title: "Ce qu'il faut savoir",
        items: [
          { title: "Abattements pour durée", description: "Exonération totale après 22 ans (IR) et 30 ans (PS)." },
          { title: "Résidence principale", description: "Exonération totale pour la résidence principale." },
          { title: "Cas d'exonération", description: "Plusieurs cas permettent d'être exonéré." }
        ]
      },
      seo: {
        metaTitle: "Plus-value immobilière : fiscalité et calcul | Azalée",
        metaDescription: "Comprendre la taxation des plus-values immobilières. Analyse des abattements et cas d'exonération."
      }
    }
  },
  {
    slug: 'viager',
    defaultContent: {
      hero: {
        title: "Vente et achat en viager",
        subtitle: "Le viager permet de vendre ou d'acheter un bien avec versement d'une rente à vie.",
      },
      avantages: {
        title: "Les avantages du viager",
        items: [
          { title: "Décote importante", description: "Prix d'acquisition réduit (bouquet + rente)." },
          { title: "Complément de retraite", description: "Revenus réguliers pour le vendeur." },
          { title: "Fiscalité avantageuse", description: "Rente partiellement imposée selon l'âge." }
        ]
      },
      seo: {
        metaTitle: "Viager : vente et achat immobilier | Azalée Patrimoine",
        metaDescription: "Le viager permet de vendre ou d'acheter un bien avec versement d'une rente à vie."
      }
    }
  },
  {
    slug: 'usufruit-locatif',
    defaultContent: {
      hero: {
        title: "Usufruit locatif social (ULS)",
        subtitle: "L'investissement en usufruit locatif permet de percevoir des loyers temporaires.",
      },
      avantages: {
        title: "Les avantages de l'ULS",
        items: [
          { title: "Revenus immédiats", description: "Percevez des loyers dès l'acquisition." },
          { title: "Rendement optimisé", description: "Rendement supérieur à la pleine propriété." },
          { title: "Durée déterminée", description: "Usufruit temporaire de 15 à 20 ans." }
        ]
      },
      seo: {
        metaTitle: "Usufruit locatif social (ULS) : investir | Azalée",
        metaDescription: "L'investissement en usufruit locatif permet de percevoir des loyers temporaires."
      }
    }
  },
  {
    slug: 'locatif',
    defaultContent: {
      hero: {
        title: "Investissement locatif : stratégies",
        subtitle: "Réussir son investissement locatif demande de choisir le bon bien et le bon dispositif fiscal.",
      },
      avantages: {
        title: "Nos conseils pour réussir",
        items: [
          { title: "Choix du bien", description: "Emplacement, type de bien, potentiel locatif." },
          { title: "Montage fiscal", description: "LMNP, Pinel, déficit foncier, SCI..." },
          { title: "Financement", description: "Optimisez votre effet de levier." }
        ]
      },
      seo: {
        metaTitle: "Investissement locatif : rentabilité et conseil | Azalée",
        metaDescription: "Réussir son investissement locatif demande de choisir le bon bien et le bon dispositif fiscal."
      }
    }
  },
  {
    slug: 'saisonniere',
    defaultContent: {
      hero: {
        title: "Location saisonnière et touristique",
        subtitle: "Louer en saisonnier offre une rentabilité élevée mais impose des contraintes réglementaires.",
      },
      avantages: {
        title: "Ce qu'il faut savoir",
        items: [
          { title: "Rentabilité élevée", description: "Revenus potentiellement supérieurs à la location classique." },
          { title: "Réglementation stricte", description: "Autorisations, déclarations, limites de durée." },
          { title: "Gestion intensive", description: "Accueil, ménage, maintenance." }
        ]
      },
      seo: {
        metaTitle: "Location saisonnière : fiscalité et règles | Azalée",
        metaDescription: "Louer en saisonnier offre une rentabilité élevée mais impose des contraintes réglementaires."
      }
    }
  },
  {
    slug: 'robien',
    defaultContent: {
      hero: {
        title: "Loi Robien (dispositif éteint)",
        subtitle: "Le dispositif Robien ne permet plus de nouveaux investissements mais continue d'impacter les propriétaires actuels.",
      },
      avantages: {
        title: "Gestion du dispositif",
        items: [
          { title: "Fin de période", description: "Que faire à la fin de votre engagement ?" },
          { title: "Revente optimisée", description: "Stratégies de sortie du dispositif." },
          { title: "Continuité locative", description: "Options pour poursuivre la location." }
        ]
      },
      seo: {
        metaTitle: "Loi Robien : gestion du dispositif | Azalée Patrimoine",
        metaDescription: "Le dispositif Robien ne permet plus de nouveaux investissements."
      }
    }
  },
  {
    slug: 'borloo',
    defaultContent: {
      hero: {
        title: "Loi Borloo (dispositif éteint)",
        subtitle: "Informations sur le dispositif Borloo ancien et neuf pour les propriétaires concernés.",
      },
      avantages: {
        title: "Gestion du dispositif",
        items: [
          { title: "Fin de période", description: "Anticipez la fin de votre avantage fiscal." },
          { title: "Engagements", description: "Respect des engagements de location." },
          { title: "Sortie optimisée", description: "Conseils pour la revente ou la poursuite." }
        ]
      },
      seo: {
        metaTitle: "Loi Borloo : gestion du dispositif | Azalée Patrimoine",
        metaDescription: "Informations sur le dispositif Borloo ancien et neuf."
      }
    }
  }
];

// Page template
const pageTemplate = (config) => `import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '@/components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = ${JSON.stringify(config.defaultContent, null, 2)};

export async function generateMetadata() {
  const content = await getPageContent('investissement-immobilier/${config.slug}', defaultContent);
  return {
    title: content?.seo?.metaTitle || defaultContent.seo.metaTitle,
    description: content?.seo?.metaDescription || defaultContent.seo.metaDescription,
  };
}

export default async function Page() {
  const content = await getPageContent('investissement-immobilier/${config.slug}', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {content?.hero?.title || defaultContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {content?.hero?.subtitle || defaultContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {content?.avantages?.title || defaultContent.avantages.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(content?.avantages?.items || defaultContent.avantages.items).map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#253F60] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Nos experts sont là pour vous accompagner dans votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/rdv">
              Planifiez votre consultation gratuite
            </CTAButton>
            <a href="/contact" className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
`;

// Create pages
const basePath = path.join(__dirname, '..', 'src', 'app', 'investissement-immobilier');

pages.forEach(config => {
  const pagePath = path.join(basePath, config.slug);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, { recursive: true });
  }
  
  // Write page.jsx
  const pageContent = pageTemplate(config);
  fs.writeFileSync(path.join(pagePath, 'page.jsx'), pageContent);
  console.log(`✅ Created: investissement-immobilier/${config.slug}/page.jsx`);
});

console.log(`\n=== Summary ===`);
console.log(`Created ${pages.length} pages in /investissement-immobilier/`);

