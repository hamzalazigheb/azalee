import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Ressources & Guides PDF | Azalée Patrimoine',
  description: 'Téléchargez nos guides gratuits sur la gestion de patrimoine, l\'optimisation fiscale, les placements financiers et la préparation de la retraite.',
  keywords: 'guides patrimoine PDF, ressources financières, téléchargement gratuit, conseils patrimoniaux',
  alternates: {
    canonical: 'https://www.azalee-patrimoine.fr/ressources',
  },
  openGraph: {
    title: 'Ressources & Guides PDF | Azalée Patrimoine',
    description: 'Guides gratuits sur la gestion de patrimoine et l\'optimisation fiscale.',
    url: 'https://www.azalee-patrimoine.fr/ressources',
    type: 'website',
  },
};

const guides = [
  {
    id: 1,
    title: 'Guide Complet de la Gestion de Patrimoine',
    description: 'Tout ce que vous devez savoir pour organiser, optimiser et transmettre votre patrimoine. Un guide de 45 pages rédigé par nos experts.',
    category: 'Patrimoine',
    pages: 45,
    icon: '📊',
    color: 'from-[#253F60] to-[#1a2d47]',
    featured: true,
  },
  {
    id: 2,
    title: 'Optimisation Fiscale 2025',
    description: 'Les meilleures stratégies pour réduire votre imposition en toute légalité. Dispositifs PER, SCPI, LMNP et plus.',
    category: 'Fiscalité',
    pages: 28,
    icon: '💰',
    color: 'from-[#B99066] to-[#8a6b4d]',
    featured: true,
  },
  {
    id: 3,
    title: 'Préparer sa Retraite : Le Guide Pratique',
    description: 'De 40 à 65 ans, les étapes clés pour sécuriser vos revenus futurs et profiter sereinement de votre retraite.',
    category: 'Retraite',
    pages: 32,
    icon: '🏖️',
    color: 'from-[#4a6b8a] to-[#253F60]',
    featured: false,
  },
  {
    id: 4,
    title: 'Investir en SCPI : Mode d\'Emploi',
    description: 'Comprendre les SCPI, choisir les meilleures, et optimiser votre investissement pierre-papier.',
    category: 'Placements',
    pages: 24,
    icon: '🏢',
    color: 'from-[#6b8a4a] to-[#4a6b3a]',
    featured: false,
  },
  {
    id: 5,
    title: 'Transmission de Patrimoine : Anticiper pour Protéger',
    description: 'Donation, succession, assurance-vie : les outils pour transmettre dans les meilleures conditions.',
    category: 'Patrimoine',
    pages: 36,
    icon: '👨‍👩‍👧‍👦',
    color: 'from-[#8a4a6b] to-[#6b3a4a]',
    featured: false,
  },
  {
    id: 6,
    title: 'L\'Assurance-Vie : Guide Complet',
    description: 'Fonctionnement, fiscalité, gestion : maîtrisez l\'assurance-vie pour optimiser votre épargne.',
    category: 'Placements',
    pages: 30,
    icon: '🛡️',
    color: 'from-[#4a8a6b] to-[#3a6b4a]',
    featured: false,
  },
];

const categories = ['Tous', 'Patrimoine', 'Fiscalité', 'Placements', 'Retraite'];

export default function RessourcesPage() {
  const featuredGuides = guides.filter(g => g.featured);
  const otherGuides = guides.filter(g => !g.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-20 lg:py-28">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-1 bg-[#B99066] mx-auto mb-6"></div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">
              Ressources & Guides
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-inter max-w-3xl mx-auto leading-relaxed">
              Téléchargez gratuitement nos guides experts pour maîtriser la gestion 
              de votre patrimoine et optimiser votre fiscalité.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-[#B99066]"></div>
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold">
              Guides Essentiels
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredGuides.map((guide) => (
              <div
                key={guide.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-48 bg-gradient-to-br ${guide.color} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    {guide.icon}
                  </span>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      {guide.pages} pages
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-[#253F60] text-xl lg:text-2xl font-cairo font-semibold mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed mb-6">
                    {guide.description}
                  </p>
                  <button className="w-full bg-[#253F60] hover:bg-[#1a2d47] text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger Gratuitement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full font-inter text-sm font-medium transition-all duration-200 ${
                  category === 'Tous'
                    ? 'bg-[#253F60] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#253F60] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherGuides.map((guide) => (
              <div
                key={guide.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-32 bg-gradient-to-br ${guide.color} flex items-center justify-center relative`}>
                  <span className="text-5xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                    {guide.icon}
                  </span>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                      {guide.pages} pages
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[#B99066] text-xs font-semibold uppercase">
                    {guide.category}
                  </span>
                  <h3 className="text-[#253F60] text-lg font-cairo font-semibold mt-2 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-inter leading-relaxed mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  <button className="w-full bg-gray-100 hover:bg-[#253F60] text-[#253F60] hover:text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">
              Recevez Nos Nouveaux Guides
            </h2>
            <p className="text-white/80 font-inter mb-8">
              Soyez informé en avant-première de la publication de nos nouveaux guides et ressources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 py-3 rounded-lg font-inter text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B99066]"
              />
              <button className="bg-[#B99066] hover:bg-[#a17d54] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">
              Besoin d'un Accompagnement Personnalisé ?
            </h2>
            <p className="text-gray-600 font-inter max-w-2xl mx-auto mb-8">
              Nos guides vous donnent les bases, mais chaque situation est unique. 
              Rencontrez nos experts pour un conseil sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B99066] hover:bg-[#a17d54] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Prendre Rendez-vous
              </a>
              <Link
                href="/contact"
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

