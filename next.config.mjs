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
  
  // Remove console.log in production (keep error and warn)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
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
      // ==================== REDIRECTIONS SEO - Générées depuis Feedback-URL-v2.csv ====================
      // Total: 20 redirections validées vers des pages existantes
      // Couverture CSV: 91% (20/22 redirections nécessaires)
      
      // ==================== IMMOBILIER → PAGES EXISTANTES ====================
      // Note: Le CSV demandait /immobilier/* → /investissement-immobilier/*
      // mais seules les pages /immobilier/* existent, donc les redirections sont inversées
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
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/malraux',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/scpi',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/denormandie',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/credit-immobilier',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/usufruit-locatif',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/nue-propriete',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/robien',
        destination: '/immobilier/robien',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/borloo',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/locatif',
        destination: '/immobilier/investissement-locatif',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/viager',
        destination: '/immobilier',
        permanent: true,
      },
      {
        source: '/investissement-immobilier/saisonnie',
        destination: '/immobilier',
        permanent: true,
      },
      
      // ==================== PLACEMENTS → PAGES EXISTANTES ====================
      {
        source: '/placements/livrets-epargne',
        destination: '/placements',
        permanent: true,
      },
      
      // ==================== RETRAITE → PAGES EXISTANTES ====================
      {
        source: '/retraite/plan-epargne-retraite',
        destination: '/retraite',
        permanent: true,
      },
      {
        source: '/retraite/retraite-complementaire',
        destination: '/retraite',
        permanent: true,
      },
      
      // ==================== PATRIMOINE → PAGES EXISTANTES ====================
      {
        source: '/patrimoine/holding-patrimoniale',
        destination: '/patrimoine',
        permanent: true,
      },
      {
        source: '/patrimoine/dementelement-propriete',
        destination: '/patrimoine',
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