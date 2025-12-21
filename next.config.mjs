import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'recharts'],
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
  
  // Redirects for broken Google links
  async redirects() {
    return [
      // 1. Qui sommes-nous → Notre approche
      {
        source: '/qui-sommes-nous',
        destination: '/notre-approche',
        permanent: true,
      },
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
      // 3. Espace client → Dashboard login
      {
        source: '/espace-client',
        destination: '/espace-client',
        permanent: false,
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

    // Performance optimizations
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};
export default nextConfig;