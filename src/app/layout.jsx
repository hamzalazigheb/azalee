import { Inter } from "next/font/google";
import Script from "next/script";
import "../styles/index.css";
import ClientProviders from "../components/common/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

// Helper pour obtenir le basePath côté serveur
function getBasePath() {
  return process.env.STAGING === 'true' ? '/staging' : '';
}

const basePath = getBasePath();
const faviconPath = `${basePath}/images/azalee-patrimoine3.webp`;

export const metadata = {
  metadataBase: new URL('https://azalee-patrimoine.fr'),
  title: {
    default: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
    template: "%s | Azalée Patrimoine"
  },
  description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
  keywords: ["gestion de patrimoine", "optimisation fiscale", "conseil financier", "investissement immobilier", "placements financiers", "retraite", "fiscalité", "Paris", "France"],
  authors: [{ name: "Azalée Patrimoine" }],
  creator: "Azalée Patrimoine",
  publisher: "Azalée Patrimoine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://azalee-patrimoine.fr",
  },
  icons: {
    icon: [
      { url: faviconPath, type: 'image/webp', sizes: '32x32' },
      { url: faviconPath, type: 'image/webp', sizes: '16x16' },
    ],
    apple: [
      { url: faviconPath, sizes: '180x180', type: 'image/webp' },
    ],
    shortcut: faviconPath,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://azalee-patrimoine.fr",
    siteName: "Azalée Patrimoine",
    title: "Azalée Patrimoine - Votre partenaire de confiance",
    description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
    images: [{
      url: `${basePath}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "Azalée Patrimoine - Gestion de patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Azalée Patrimoine - Gestion de patrimoine",
    description: "Expert en gestion de patrimoine et optimisation fiscale.",
    images: [`${basePath}/images/og-image.jpg`],
    creator: "@azalee_patrimoine"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Disable Google Translate auto-translation */}
        <meta name="google" content="notranslate" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="icon" type="image/webp" href={faviconPath} />
        <link rel="shortcut icon" type="image/webp" href={faviconPath} />
        <link rel="apple-touch-icon" href={faviconPath} />
        {/* Scripts Schema.org combinés - Chargés après le rendu initial pour ne pas bloquer */}
        <Script
          id="schema-markup"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": ["FinancialService", "LocalBusiness", "Organization"],
                "name": "Azalée Patrimoine",
                "url": "https://azalee-patrimoine.fr",
                "logo": `https://azalee-patrimoine.fr${faviconPath}`,
                "description": "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "106 rue de Richelieu",
                  "addressLocality": "Paris",
                  "postalCode": "75002",
                  "addressCountry": "FR"
                },
                "telephone": "+33153458500",
                "email": "contact@azalee-patrimoine.fr",
                "priceRange": "$$",
                "areaServed": {
                  "@type": "Country",
                  "name": "France"
                },
                "serviceType": [
                  "Gestion de patrimoine",
                  "Conseil en investissement",
                  "Optimisation fiscale",
                  "Investissement immobilier",
                  "Préparation retraite"
                ],
                "sameAs": []
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Azalée Patrimoine",
                "url": "https://azalee-patrimoine.fr",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://azalee-patrimoine.fr/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
