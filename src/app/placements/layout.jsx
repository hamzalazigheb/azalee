export const metadata = {
  title: "Placements Financiers et Épargne | Azalée Patrimoine",
  description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation. Optimisez votre épargne et préparez votre retraite grâce à nos conseils.",
  keywords: "placements financiers, assurance-vie, SCPI, PEA, PER, épargne, investissement, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/placements",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Placements Financiers et Épargne | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation.",
    url: "https://azalee-patrimoine.fr/placements",
    siteName: "Azalée Patrimoine",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Placements Financiers | Azalée Patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Placements Financiers et Épargne | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function PlacementsLayout({ children }) {
  return <>{children}</>;
}

