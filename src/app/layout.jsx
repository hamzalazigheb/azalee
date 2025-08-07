import '../styles/index.css';
import { TranslationProvider } from '../contexts/TranslationContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Azalee Patrimonial',
  description: 'Votre partenaire de confiance en gestion de patrimoine, fiscalité et conseil en investissement depuis plus de 30 ans.',
  icons: {
    icon: [
      { url: '/images/responsive-header-logo-4ee7fd.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/images/responsive-header-logo-4ee7fd.png', type: 'image/png', sizes: '180x180' }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fhamzasap1949back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.6"></script>
      </body>
    </html>
  );
}
