import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  // Base path for staging environment (only when STAGING=true)
  ...(process.env.STAGING === 'true' && { 
    basePath: '/staging',
    assetPrefix: '/staging' // Prefix static assets in public/ folder
  }),
  
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'recharts', 'framer-motion', 'lodash'],
  },
  
  // Modular imports for smaller bundles
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Compression
  compress: true,
  
  // Power by header removal
  poweredByHeader: false,
  
  // Redirects for broken Google links and SEO restructuring
  async redirects() {
    return [
      // ==================== SEO RESTRUCTURATION - Investissement Immobilier → Immobilier (garder pages existantes) ====================
      {
        source: '/investissement-immobilier/sci',
        destination: '/immobilier/sci',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/lmnp',
        destination: '/immobilier/lmnp',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/plus-value-immobiliere',
        destination: '/immobilier/plus-value-immobiliere',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/pinel',
        destination: '/fiscalite/loi-pinel',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/malraux',
        destination: '/fiscalite/loi-malraux',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/denormandie',
        destination: '/fiscalite/loi-denormandie',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/scpi',
        destination: '/placements/scpi-opci',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/credit-immobilier',
        destination: '/immobilier/credit-immobilier-ptz',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/nue-propriete',
        destination: '/immobilier/investissement-immobilier-rentable',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/usufruit-locatif',
        destination: '/immobilier/investissement-locatif',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/viager',
        destination: '/immobilier/investissement-locatif',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/saisonniere',
        destination: '/immobilier/lmnp',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/locatif',
        destination: '/immobilier/investissement-locatif',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/robien',
        destination: '/immobilier/robien',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/borloo',
        destination: '/immobilier/scellier',
        permanent: true,
      },
      
      // ==================== SEO RESTRUCTURATION - Fiscalité ====================
      {
        source: '/fiscalite/reductions-impot-deficit-foncier',
        destination: '/fiscalite/deficit-foncier',
        permanent: true,
      },
      {
        source: '/fiscalite/ir-impot-revenu',
        destination: '/fiscalite/impot-sur-le-revenu',
        permanent: true,
      },
      {
        source: '/fiscalite/ifi-impot-fortune-immobiliere',
        destination: '/fiscalite/ifi',
        permanent: true,
      },
      {
        source: '/fiscalite/droits-succession',
        destination: '/patrimoine/droits-succession',
        permanent: true,
      },
      {
        source: '/fiscalite/plus-values-mobilieres',
        destination: '/fiscalite/plus-values',
        permanent: true,
      },
      {
        source: '/fiscalite/niches-fiscales',
        destination: '/fiscalite/niches',
        permanent: true,
      },
      {
        source: '/fiscalite/prelevement-source',
        destination: '/fiscalite/prelevement-a-la-source',
        permanent: true,
      },
      {
        source: '/fiscalite/optimisation-fiscale-entreprises',
        destination: '/fiscalite/entreprises',
        permanent: true,
      },
      
      // ==================== SEO RESTRUCTURATION - Placements ====================
      {
        source: '/placements/fip-fcpi',
        destination: '/placements/fip',
        permanent: true,
      },
      {
        source: '/placements/or-metaux-precieux',
        destination: '/placements/or',
        permanent: true,
      },
      {
        source: '/placements/investir-en-art',
        destination: '/placements/art',
        permanent: true,
      },
      {
        source: '/placements/etf-trackers',
        destination: '/placements/etf',
        permanent: true,
      },
      {
        source: '/placements/girardin-industriel',
        destination: '/placements/girardin',
        permanent: true,
      },
      {
        source: '/placements/livrets-epargne',
        destination: '/placements/livrets',
        permanent: true,
      },
      
      // ==================== SEO RESTRUCTURATION - Retraite ====================
      {
        source: '/retraite/preparer-retraite-jeune',
        destination: '/retraite/preparer-jeune',
        permanent: true,
      },
      {
        source: '/retraite/optimiser-retraite-cadre',
        destination: '/retraite/cadres',
        permanent: true,
      },
      {
        source: '/retraite/cumul-emploi-retraite',
        destination: '/retraite/cumul-emploi',
        permanent: true,
      },
      {
        source: '/retraite/calcul-retraite',
        destination: '/retraite/calcul',
        permanent: true,
      },
      {
        source: '/retraite/plan-epargne-retraite',
        destination: '/retraite/per-individuel',
        permanent: true,
      },
      {
        source: '/retraite/retraite-complementaire',
        destination: '/retraite/agirc-arrco',
        permanent: true,
      },
      {
        source: '/retraite/reforme-retraites',
        destination: '/retraite/reforme',
        permanent: true,
      },
      
      // ==================== SEO RESTRUCTURATION - Outils ====================
      {
        source: '/outils/simulateur-impots',
        destination: '/outils/simulateur-ir',
        permanent: true,
      },
      {
        source: '/outils/simulateur-retraite',
        destination: '/outils/simulateur-pension',
        permanent: true,
      },
      {
        source: '/outils/calculateur-capacite-emprunt',
        destination: '/outils/capacite-emprunt',
        permanent: true,
      },
      {
        source: '/outils/calculateur-frais-notaire',
        destination: '/outils/frais-notaire',
        permanent: true,
      },
      
      // ==================== SEO RESTRUCTURATION - Patrimoine ====================
      {
        source: '/patrimoine/holding-patrimoniale',
        destination: '/patrimoine/holding',
        permanent: true,
      },
      {
        source: '/patrimoine/dementelement-propriete',
        destination: '/patrimoine/demembrement',
        permanent: true,
      },
      
      // ==================== REDIRECTIONS EXISTANTES ====================
      // 1. /qui-sommes-nous - Page dédiée créée (redirection supprimée)
      // 2. Solutions simulation de projets → Simulateur investissement
      {
        source: '/solutions-simulation-de-projets',
        destination: '/outils/simulateur-investissement',
        permanent: true,
      },
      // 2. Bien placer son argent → Placements
      {
        source: '/bien-placer-son-argent',
        destination: '/placements',
        permanent: true,
      },
      {
        source: '/bien-placer',
        destination: '/placements',
        permanent: true,
      },
      // 4. Les particuliers → Patrimoine
      {
        source: '/les-particuliers',
        destination: '/patrimoine',
        permanent: true,
      },
      {
        source: '/particuliers',
        destination: '/patrimoine',
        permanent: true,
      },
      // 5. Formulaire de contact → Contact
      {
        source: '/formulaire-de-contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/formulaire-contact',
        destination: '/contact',
        permanent: true,
      },
      // 6. Gestion de patrimoine → Patrimoine
      {
        source: '/gestion-de-patrimoine',
        destination: '/patrimoine',
        permanent: true,
      },
      {
        source: '/gestion-patrimoine',
        destination: '/patrimoine',
        permanent: true,
      },
      // Additional common redirects
      {
        source: '/nos-services',
        destination: '/patrimoine',
        permanent: true,
      },
      // Redirections pour pages 404 manquantes
      {
        source: '/retraite/independance-financiere',
        destination: '/retraite',
        permanent: true,
      },
      {
        source: '/retraite/plan-retraite/per-individuel',
        destination: '/retraite/per-perp',
        permanent: true,
      },
      {
        source: '/fiscalite/',
        destination: '/fiscalite',
        permanent: true,
      },
      {
        source: '/placements/per',
        destination: '/placements/pea-per',
        permanent: true,
      },
      // Redirect pour page LLI manquante
      {
        source: '/fiscalite/lli',
        destination: '/fiscalite/lois-fiscales',
        permanent: true,
      },
      // Redirections additionnelles SEO
      {
        source: '/placements/per-perp',
        destination: '/placements/pea-per',
        permanent: true,
      },
      {
        source: '/placements/scpi',
        destination: '/placements/scpi-opci',
        permanent: true,
      },
      {
        source: '/patrimoine/bilan-patrimonial',
        destination: '/patrimoine/bilan',
        permanent: true,
      },
      {
        source: '/patrimoine/conseiller-patrimoine',
        destination: '/patrimoine/conseils',
        permanent: true,
      },
    ];
  },
  
  webpack(config, { isServer, dev }) {
    // Configuration pour les composants Dhiwise (uniquement en développement)
    if (dev) {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: '@dhiwise/component-tagger/nextLoader',
        }],
      });
    }

    // Improve module resolution for .js files
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      },
    };

    // Performance optimizations - Bundle into optimized chunks
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,    // Minimum 20KB par chunk
          maxSize: 250000,   // Maximum 250KB par chunk (évite les gros fichiers)
          cacheGroups: {
            // Groupe pour les bibliothèques de visualisation (chargées à la demande)
            charts: {
              test: /[\\/]node_modules[\\/](recharts|d3|victory)[\\-]/,
              name: 'charts',
              chunks: 'async',
              priority: 30,
              enforce: true,
            },
            // Groupe pour React et ses dépendances core
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\-]/,
              name: 'framework',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Bundle des bibliothèques tierces
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // Code commun partagé entre plusieurs pages
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              name: 'common',
            },
          },
        },
      };
    }

    return config;
  },
};
export default nextConfig;