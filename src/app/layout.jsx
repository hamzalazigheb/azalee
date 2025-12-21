import { Inter } from "next/font/google";
import Script from "next/script";
import "../styles/index.css";
import ClientProviders from "../components/common/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
  description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
  keywords: "gestion de patrimoine, optimisation fiscale, conseil financier, investissement immobilier, placements financiers, retraite, fiscalité",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://azalee-patrimoine.fr",
    siteName: "Azalée Patrimoine",
    title: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
    description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine.",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Azalée Patrimoine - Gestion de patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
    description: "Expert en gestion de patrimoine, optimisation fiscale et conseil financier.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Azalée Patrimoine",
              "url": "https://azalee-patrimoine.fr",
              "logo": "https://azalee-patrimoine.fr/logo.png",
              "description": "Expert en gestion de patrimoine, optimisation fiscale et conseil financier",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR"
              },
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
