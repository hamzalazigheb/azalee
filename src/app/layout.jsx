import { Inter } from "next/font/google";
import "../styles/index.css";
import ClientProviders from "../components/common/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Azalée Patrimoine - Gestion de patrimoine et conseil financier",
  description: "Azalée Patrimoine : expert en gestion de patrimoine, optimisation fiscale et conseil financier. Solutions personnalisées pour sécuriser et faire croître votre patrimoine partout en France.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
