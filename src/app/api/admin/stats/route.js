import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import PageContent from '../../../../lib/models/PageContent';

export const dynamic = 'force-dynamic';

// Liste exacte des chemins présents dans la navigation (Navbar) - même que dans CMS
const navbarPaths = new Set([
  'accueil', 'home', '/',
  // Fiscalité
  'fiscalite', 'fiscalite/impot-sur-le-revenu', 'fiscalite/declaration-impots', 'fiscalite/tranches-baremes-plafonds', 'fiscalite/lois-fiscales',
  'fiscalite/loi-pinel', 'fiscalite/loi-girardin', 'fiscalite/loi-denormandie', 'fiscalite/loi-malraux', 'fiscalite/loi-cosse',
  'fiscalite/monument-historique', 'fiscalite/reductions-impot-deficit-foncier', 'fiscalite/fiscalite-placements', 'fiscalite/pfu',
  'fiscalite/tmi-prelevements-sociaux', 'fiscalite/defiscalisation-cas-specifiques', 'fiscalite/autre-fiscalite',
  // Immobilier
  'immobilier', 'immobilier/immobilier-neuf', 'immobilier/vefa', 'immobilier/scellier', 'immobilier/faire-construire',
  'immobilier/investissement-locatif', 'immobilier/sci', 'immobilier/credit-immobilier-ptz', 'immobilier/plus-value-immobiliere',
  'immobilier/lmnp', 'immobilier/immeubles-de-rapport',
  // Placements
  'placements', 'placements/assurance-vie', 'placements/assurance-vie-luxembourg', 'placements/compte-titres',
  'placements/contrat-capitalisation', 'placements/livret', 'placements/bourse-actions', 'placements/scpi-opci',
  'placements/pea-per', 'placements/taux-interets', 'placements/etf-produits-financiers', 'placements/autres',
  // Retraite
  'retraite', 'retraite/plan-retraite', 'retraite/rachat-trimestres', 'retraite/simulation', 'retraite/prevoyance-protection',
  'retraite/retraite-progressive', 'retraite/autre',
  // Patrimoine
  'patrimoine', 'patrimoine/succession-heritage', 'patrimoine/donation-gratuite', 'patrimoine/donation-onereuse',
  'patrimoine/transmission', 'patrimoine/protection-famille', 'patrimoine/bilan', 'patrimoine/conseils', 'patrimoine/autre',
  // Outils
  'outils-financiers', 'outils-financiers/guide-defiscalisation', 'outils/calculatrice-impots', 'outils/calculs-financiers',
  'outils-financiers/assurance-vie-vs-per', 'outils/simulateur-investissement', 'outils/guides-pratiques',
  // Institutionnel
  'qui-sommes-nous', 'equipe', 'notre-approche', 'contact',
  // Blog et Ressources
  'blog', 'ressources'
]);

// Fonction pour vérifier si une page doit être incluse (même logique que CMS)
const shouldIncludePage = (path) => {
  if (!path) return false;
  const normalizedPath = path.toLowerCase().replace(/^\//, '');
  return navbarPaths.has(normalizedPath) || navbarPaths.has(path);
};

export async function GET() {
  try {
    await connectDB();

    // Get total users
    const totalUsers = await User.countDocuments({});

    // Get all pages
    const allPages = await PageContent.find({}).select('path published').lean();

    // Filter pages to only include navbar pages
    const filteredPages = allPages.filter(page => shouldIncludePage(page.path));
    
    // Get total pages (filtered)
    const totalPages = filteredPages.length;

    // Get published pages (filtered)
    const publishedPages = filteredPages.filter(page => page.published).length;

    // Get total content items (filtered pages)
    const totalContentItems = totalPages;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalPages,
        publishedPages,
        totalContentItems
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

