import Breadcrumb from '@/components/common/Breadcrumb';
import Header from '@/components/common/Header';

export const metadata = {
  title: "Retraite et Préparation de l'Avenir | Azalée Patrimoine",
  description: "Azalée Patrimoine vous accompagne pour préparer votre retraite : PER, PERP, rachat de trimestres, simulation retraite, prévoyance. Anticipez sereinement votre avenir grâce à nos experts.",
  keywords: "retraite, PER, PERP, rachat de trimestres, simulation retraite, prévoyance, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/retraite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Retraite et Préparation de l'Avenir | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne pour préparer votre retraite : PER, PERP, rachat de trimestres, simulation retraite, prévoyance.",
    url: "https://azalee-patrimoine.fr/retraite",
    siteName: "Azalée Patrimoine",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Retraite et Préparation | Azalée Patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Retraite et Préparation de l'Avenir | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne pour préparer votre retraite : PER, PERP, rachat de trimestres, simulation retraite, prévoyance.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function RetraiteLayout({ children }) {
  return (
    <>
      <Header />
      <Breadcrumb />
      {children}
    </>
  );
}

