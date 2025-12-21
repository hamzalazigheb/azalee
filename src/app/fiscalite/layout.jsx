export const metadata = {
  title: "Fiscalité et Optimisation Fiscale | Azalée Patrimoine",
  description: "Azalée Patrimoine optimise votre fiscalité : défiscalisation immobilière, réduction d'impôts, dispositifs Pinel, Malraux, Girardin. Pour vous, un conseil fiscal personnalisé.",
  keywords: "fiscalité, défiscalisation, réduction d'impôts, loi Pinel, loi Malraux, loi Girardin, optimisation fiscale, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/fiscalite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Fiscalité et Optimisation Fiscale | Azalée Patrimoine",
    description: "Azalée Patrimoine optimise votre fiscalité : défiscalisation immobilière, réduction d'impôts, dispositifs Pinel, Malraux, Girardin.",
    url: "https://azalee-patrimoine.fr/fiscalite",
    siteName: "Azalée Patrimoine",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Fiscalité et Optimisation Fiscale | Azalée Patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiscalité et Optimisation Fiscale | Azalée Patrimoine",
    description: "Azalée Patrimoine optimise votre fiscalité : défiscalisation immobilière, réduction d'impôts, dispositifs Pinel, Malraux, Girardin.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function FiscaliteLayout({ children }) {
  return <>{children}</>;
}

