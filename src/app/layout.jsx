import { Inter } from "next/font/google";
import Script from "next/script";
import "../styles/index.css";
import ClientProviders from "../components/common/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

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
      { url: '/images/azalee-patrimoine3.webp', type: 'image/png', sizes: '32x32' },
      { url: '/images/azalee-patrimoine3.webp', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/images/azalee-patrimoine3.webp', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/azalee-patrimoine3.webp',
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://azalee-patrimoine.fr",
    siteName: "Azalée Patrimoine",
    title: "Azalée Patrimoine - Votre partenaire de confiance",
    description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
    images: [{
      url: "/images/og-image.jpg", // Ensure this image exists or use a fallback
      width: 1200,
      height: 630,
      alt: "Azalée Patrimoine - Gestion de patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Azalée Patrimoine - Gestion de patrimoine",
    description: "Expert en gestion de patrimoine et optimisation fiscale.",
    images: ["/images/og-image.jpg"],
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
        <link rel="icon" type="image/png" href="/images/azalee-patrimoine3.webp" />
        <link rel="shortcut icon" type="image/png" href="/images/azalee-patrimoine3.webp" />
        <link rel="apple-touch-icon" href="/images/azalee-patrimoine3.webp" />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["FinancialService", "LocalBusiness", "Organization"],
              "name": "Azalée Patrimoine",
              "url": "https://azalee-patrimoine.fr",
              "logo": "https://azalee-patrimoine.fr/images/azalee-patrimoine3.webp",
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
            })
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Azalée Patrimoine",
              "url": "https://azalee-patrimoine.fr",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://azalee-patrimoine.fr/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
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
