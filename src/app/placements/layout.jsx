export const metadata = {
  title: "Placements Financiers et Épargne | Azalée Patrimoine",
  description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation. Optimisez votre épargne et préparez votre retraite grâce à nos conseils.",
  keywords: "placements financiers, assurance-vie, SCPI, PEA, PER, épargne, investissement, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/placements",
  },
  openGraph: {
    title: "Placements Financiers et Épargne | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation.",
    url: "https://azalee-patrimoine.fr/placements",
  },
  twitter: {
    card: "summary_large_image",
    title: "Placements Financiers et Épargne | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans vos placements financiers : assurance-vie, SCPI, PEA, PER, contrats de capitalisation.",
  }
};

export default function PlacementsLayout({ children }) {
  return <>{children}</>;
}

