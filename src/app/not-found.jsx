import Link from 'next/link';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#253F60] to-[#1a2d47] px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Page introuvable
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="bg-[#B99066] hover:bg-[#A67C52] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-[#B99066] text-[#B99066] hover:bg-[#B99066] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Nous contacter
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/patrimoine" className="text-gray-300 hover:text-[#B99066] transition-colors">
              Patrimoine
            </Link>
            <Link href="/placements" className="text-gray-300 hover:text-[#B99066] transition-colors">
              Placements
            </Link>
            <Link href="/fiscalite" className="text-gray-300 hover:text-[#B99066] transition-colors">
              Fiscalité
            </Link>
            <Link href="/immobilier" className="text-gray-300 hover:text-[#B99066] transition-colors">
              Immobilier
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

