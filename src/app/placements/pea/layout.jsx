export const metadata = {
  title: "PEA - Plan d'Épargne en Actions | Azalée Patrimoine",
  description: "PEA avec Azalée Patrimoine : investissement boursier, avantages fiscaux, exonération d'impôts après 5 ans. Optimisez votre PEA grâce à nos conseils.",
  keywords: "PEA, plan épargne actions, bourse, avantages fiscaux, investissement, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/placements/pea",
  },
  openGraph: {
    title: "PEA - Plan d'Épargne en Actions | Azalée Patrimoine",
    description: "PEA : investissement boursier, avantages fiscaux, exonération d'impôts après 5 ans.",
    url: "https://azalee-patrimoine.fr/placements/pea",
  },
  twitter: {
    card: "summary_large_image",
    title: "PEA - Plan d'Épargne en Actions | Azalée Patrimoine",
    description: "PEA : investissement boursier, avantages fiscaux, exonération d'impôts.",
  }
};

export default function PEALayout({ children }) {
  return <>{children}</>;
}

