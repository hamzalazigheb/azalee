'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mapping des chemins admin vers les noms d'affichage
const adminBreadcrumbNames = {
  'admin': 'Tableau de bord',
  'cms': 'Gestion du contenu',
  'contacts': 'Demandes de contact',
  'users': 'Gestion des utilisateurs',
  'chatbot': 'Chatbot SARAH',
  'seo': 'Gestion SEO',
  'settings': 'Paramètres',
  'newsletter': 'Newsletter - Abonnés',
  'login': 'Connexion'
};

export default function AdminBreadcrumb() {
  const pathname = usePathname();

  // Ne pas afficher sur la page de login
  if (pathname === '/admin/login') return null;

  const segments = pathname.split('/').filter(Boolean);

  // Construire les breadcrumbs
  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const name = adminBreadcrumbNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    const isLast = index === segments.length - 1;

    return { path, name, isLast };
  });

  return (
    <nav 
      aria-label="Fil d'Ariane Admin" 
      className="w-full bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm border-b border-[#253F60]/20 dark:border-gray-700"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-white transition-colors font-inter font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tableau de bord
            </Link>
          </li>
          {breadcrumbs.length > 1 && breadcrumbs.slice(1).map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-500">/</span>
              {crumb.isLast ? (
                <span className="text-[#B99066] font-bold font-inter">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-gray-300 hover:text-[#B99066] transition-colors font-inter font-medium"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

