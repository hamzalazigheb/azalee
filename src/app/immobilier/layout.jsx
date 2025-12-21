export const metadata = {
  title: "Investissement Immobilier | Azalée Patrimoine - LMNP, SCI, SCPI, Crédit",
  description: "Azalée Patrimoine transforme vos projets immobiliers en stratégies patrimoniales : immobilier neuf, LMNP, SCI, SCPI, crédit. Pour vous, des solutions d'investissement sur-mesure.",
  keywords: "investissement immobilier, LMNP, SCI, SCPI, crédit immobilier, défiscalisation, immobilier neuf, VEFA, location meublée, Azalée Patrimoine, gestion de patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/immobilier",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Investissement Immobilier | Azalée Patrimoine",
    description: "Azalée Patrimoine transforme vos projets immobiliers en stratégies patrimoniales : immobilier neuf, LMNP, SCI, SCPI, crédit.",
    url: "https://azalee-patrimoine.fr/immobilier",
    siteName: "Azalée Patrimoine",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Investissement Immobilier | Azalée Patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Investissement Immobilier | Azalée Patrimoine",
    description: "Azalée Patrimoine transforme vos projets immobiliers en stratégies patrimoniales : immobilier neuf, LMNP, SCI, SCPI, crédit.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function ImmobilierLayout({ children }) {
  return <>{children}</>;
}

