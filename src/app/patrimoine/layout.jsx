import Breadcrumb from '@/components/common/Breadcrumb';
import Header from '@/components/common/Header';

export const metadata = {
  title: "Gestion de Patrimoine et Transmission | Azalée Patrimoine",
  description: "Azalée Patrimoine vous accompagne dans la gestion de votre patrimoine : succession, héritage, donation, bilan patrimonial. Protégez et transmettez votre patrimoine grâce à nos experts.",
  keywords: "gestion de patrimoine, transmission, succession, héritage, donation, bilan patrimonial, Azalée Patrimoine",
  alternates: {
    canonical: "https://azalee-patrimoine.fr/patrimoine",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Gestion de Patrimoine et Transmission | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans la gestion de votre patrimoine : succession, héritage, donation, bilan patrimonial.",
    url: "https://azalee-patrimoine.fr/patrimoine",
    siteName: "Azalée Patrimoine",
    images: [{
      url: "https://azalee-patrimoine.fr/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Gestion de Patrimoine | Azalée Patrimoine"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestion de Patrimoine et Transmission | Azalée Patrimoine",
    description: "Azalée Patrimoine vous accompagne dans la gestion de votre patrimoine : succession, héritage, donation, bilan patrimonial.",
    images: ["https://azalee-patrimoine.fr/og-image.jpg"]
  }
};

export default function PatrimoineLayout({ children }) {
  return (
    <>
      <Header />
      <Breadcrumb />
      {children}
    </>
  );
}

