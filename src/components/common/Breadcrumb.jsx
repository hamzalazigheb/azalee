'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SchemaMarkup from './SchemaMarkup';

// Mapping des slugs vers les noms d'affichage
const breadcrumbNames = {
  // Sections principales
  'fiscalite': 'Fiscalité',
  'immobilier': 'Immobilier',
  'patrimoine': 'Gestion de patrimoine',
  'placements': 'Placements',
  'retraite': 'Retraite',
  'outils': 'Outils',
  'outils-financiers': 'Outils financiers',

  // Fiscalité sous-pages
  'loi-pinel': 'Loi Pinel',
  'loi-malraux': 'Loi Malraux',
  'loi-denormandie': 'Loi Denormandie',
  'loi-girardin': 'Loi Girardin',
  'loi-cosse': 'Loi Cosse',
  'monument-historique': 'Monument historique',
  'lois-fiscales': 'Lois fiscales',
  'impot-sur-le-revenu': 'Impôt sur le revenu',
  'declaration-impots': 'Déclaration d\'impôts',
  'tranches-baremes-plafonds': 'Tranches et barèmes',
  'tmi-prelevements-sociaux': 'TMI et prélèvements sociaux',
  'pfu': 'PFU (Flat Tax)',
  'fiscalite-placements': 'Fiscalité des placements',
  'defiscalisation-cas-specifiques': 'Cas spécifiques',
  'reductions-impot-deficit-foncier': 'Déficit foncier',
  'autre-fiscalite': 'Autre fiscalité',

  // Immobilier sous-pages
  'investissement-locatif': 'Investissement locatif',
  'investissement-immobilier-rentable': 'Investissement rentable',
  'immobilier-neuf': 'Immobilier neuf',
  'faire-construire': 'Faire construire',
  'vefa': 'VEFA',
  'immeubles-de-rapport': 'Immeubles de rapport',
  'lmnp': 'LMNP',
  'lmnp-2025': 'LMNP 2025',
  'sci': 'SCI',
  'plus-value-immobiliere': 'Plus-value immobilière',
  'credit-immobilier-ptz': 'Crédit immobilier & PTZ',
  'robien': 'Robien',
  'scellier': 'Scellier',

  // Patrimoine sous-pages
  'conseils': 'Conseils patrimoniaux',
  'bilan': 'Bilan patrimonial',
  'bilan-patrimonial': 'Bilan patrimonial',
  'conseiller-patrimoine': 'Conseiller en patrimoine',
  'optimisation-patrimoine': 'Optimisation',
  'transmission': 'Transmission',
  'donation': 'Donation',
  'donation-gratuite': 'Donation gratuite',
  'donation-onereuse': 'Donation onéreuse',
  'droits-succession': 'Droits de succession',
  'demembrement-propriete': 'Démembrement',
  'protection-famille': 'Protection famille',
  'succession-heritage': 'Succession & héritage',
  'autre': 'Autres services',

  // Placements sous-pages
  'assurance-vie': 'Assurance-vie',
  'assurance-vie-luxembourg': 'Assurance-vie Luxembourg',
  'per': 'PER',
  'pea': 'PEA',
  'pea-per': 'PEA & PER',
  'per-perp': 'PER & PERP',
  'scpi': 'SCPI',
  'scpi-opci': 'SCPI & OPCI',
  'livret': 'Livret',
  'livrets-epargne': 'Livrets d\'épargne',
  'compte-titres': 'Compte-titres',
  'contrat-capitalisation': 'Contrat de capitalisation',
  'contrats-capitalisation': 'Contrats de capitalisation',
  'epargne-salariale': 'Épargne salariale',
  'bourse-actions': 'Bourse & Actions',
  'etf-produits-financiers': 'ETF & Produits financiers',
  'obligations-fonds': 'Obligations & Fonds',
  'private-equity': 'Private Equity',
  'produits-structures': 'Produits structurés',
  'placements-securises': 'Placements sécurisés',
  'investissements-alternatifs': 'Investissements alternatifs',
  'taux-interets': 'Taux d\'intérêts',
  'autres': 'Autres placements',

  // Retraite sous-pages
  'preparer-retraite': 'Préparer sa retraite',
  'plan-retraite': 'Plan retraite',
  'calcul-pension': 'Calcul pension',
  'simulation': 'Simulation retraite',
  'complement-retraite': 'Complément retraite',
  'retraite-progressive': 'Retraite progressive',
  'rachat-trimestres': 'Rachat de trimestres',
  'prevoyance': 'Prévoyance',
  'prevoyance-protection': 'Prévoyance & Protection',

  // Outils
  'calculatrice-impots': 'Calculatrice d\'impôts',
  'calculs-financiers': 'Calculs financiers',
  'guides-pratiques': 'Guides pratiques',
  'simulateur-investissement': 'Simulateur',
  'simulations-generales': 'Simulations',
  'guide-defiscalisation': 'Guide défiscalisation',
  'assurance-vie-vs-per': 'Assurance-vie vs PER',

  // Pages institutionnelles
  'qui-sommes-nous': 'Qui sommes-nous',
  'equipe': 'Notre équipe',
  'notre-approche': 'Notre approche',
  'contact': 'Contact',
};

export default function Breadcrumb({ className = '' }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ne pas afficher sur la page d'accueil
  if (pathname === '/' || !mounted) return null;

  const segments = pathname.split('/').filter(Boolean);

  // Construire les chemins cumulatifs
  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const name = breadcrumbNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    const isLast = index === segments.length - 1;

    return { path, name, isLast };
  });

  // Générer le Schema BreadcrumbList pour SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://azalee-patrimoine.fr/"
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.name,
        "item": `https://azalee-patrimoine.fr${crumb.path}`
      }))
    ]
  };

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} id="breadcrumb-schema" />
      <nav 
        aria-label="Fil d'Ariane" 
        className={`w-full bg-gradient-to-r from-[#253F60] to-[#B99066] ${className}`}
      >
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-[100px] py-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-white hover:text-[#B99066] transition-colors font-inter font-medium"
              >
                Accueil
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-2">
                <span className="text-white/70">{'>'}</span>
                {crumb.isLast ? (
                  <span className="text-[#B99066] font-bold font-inter">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-white hover:text-[#B99066] transition-colors font-inter font-medium"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}

