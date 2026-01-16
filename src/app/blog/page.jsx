import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { SchemaOrg, ArticleSchema } from '@/components/seo/SchemaOrg';
import Link from 'next/link';
import { getImagePath } from '@/lib/paths';

export const metadata = {
  title: 'Blog Gestion de Patrimoine | Conseils & Actualités - Azalée Patrimoine',
  description: 'Découvrez nos articles experts sur la gestion de patrimoine, l\'optimisation fiscale, les placements financiers et la préparation de la retraite. Conseils personnalisés par nos experts.',
  keywords: 'blog gestion patrimoine, conseils fiscalité, actualités placements, articles retraite, expertise patrimoniale',
  alternates: {
    canonical: 'https://www.azalee-patrimoine.fr/blog',
  },
  openGraph: {
    title: 'Blog Gestion de Patrimoine | Azalée Patrimoine',
    description: 'Articles experts sur la gestion de patrimoine, fiscalité et placements.',
    url: 'https://www.azalee-patrimoine.fr/blog',
    type: 'website',
  },
};

// Articles de blog statiques (à terme, ces données viendront du CMS)
const blogArticles = [
  {
    id: 1,
    slug: 'optimisation-fiscale-2025',
    title: 'Optimisation Fiscale 2025 : Les Stratégies Gagnantes',
    excerpt: 'Découvrez les meilleures stratégies pour réduire votre imposition en 2025. Notre guide complet sur les dispositifs fiscaux les plus avantageux.',
    category: 'Fiscalité',
    author: 'Équipe Azalée',
    date: '2025-01-15',
    readTime: '8 min',
    image: '/images/azalee-patrimoine-fiscalite.webp',
    featured: true,
  },
  {
    id: 2,
    slug: 'preparer-retraite-50-ans',
    title: 'Préparer sa Retraite à 50 ans : Le Guide Complet',
    excerpt: 'À 50 ans, il est encore temps d\'optimiser votre préparation retraite. Découvrez les leviers à activer pour sécuriser vos revenus futurs.',
    category: 'Retraite',
    author: 'Équipe Azalée',
    date: '2025-01-10',
    readTime: '12 min',
    image: '/images/azalee-patrimoine-retraite.webp',
    featured: true,
  },
  {
    id: 3,
    slug: 'scpi-2025-guide-investissement',
    title: 'SCPI en 2025 : Guide de l\'Investissement Immobilier Pierre-Papier',
    excerpt: 'Les SCPI restent un placement attractif en 2025. Analyse des rendements, des risques et des meilleures opportunités du marché.',
    category: 'Placements',
    author: 'Équipe Azalée',
    date: '2025-01-05',
    readTime: '10 min',
    image: '/images/azalee-patrimoine-scpi.webp',
    featured: false,
  },
  {
    id: 4,
    slug: 'transmission-patrimoine-famille',
    title: 'Transmission de Patrimoine : Protéger sa Famille',
    excerpt: 'Comment transmettre son patrimoine dans les meilleures conditions fiscales ? Les clés pour préparer votre succession.',
    category: 'Patrimoine',
    author: 'Équipe Azalée',
    date: '2024-12-28',
    readTime: '15 min',
    image: '/images/azalee-patrimoine-transmission.webp',
    featured: false,
  },
  {
    id: 5,
    slug: 'assurance-vie-luxembourg-avantages',
    title: 'Assurance-Vie Luxembourg : Les Avantages pour les Patrimoines Importants',
    excerpt: 'L\'assurance-vie luxembourgeoise offre des garanties uniques. Découvrez pourquoi elle séduit les investisseurs fortunés.',
    category: 'Placements',
    author: 'Équipe Azalée',
    date: '2024-12-20',
    readTime: '9 min',
    image: '/images/azalee-patrimoine-assurance-vie.webp',
    featured: false,
  },
  {
    id: 6,
    slug: 'investissement-immobilier-lmnp',
    title: 'Investissement LMNP : Optimiser sa Fiscalité Immobilière',
    excerpt: 'Le statut LMNP reste un outil puissant de défiscalisation. Guide complet pour maximiser vos avantages fiscaux.',
    category: 'Immobilier',
    author: 'Équipe Azalée',
    date: '2024-12-15',
    readTime: '11 min',
    image: '/images/azalee-patrimoine-lmnp.webp',
    featured: false,
  },
];

const categories = ['Tous', 'Fiscalité', 'Retraite', 'Placements', 'Patrimoine', 'Immobilier'];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const featuredArticles = blogArticles.filter(article => article.featured);
  const recentArticles = blogArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-20 lg:py-28">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-1 bg-[#B99066] mx-auto mb-6"></div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">
              Blog & Actualités
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-inter max-w-3xl mx-auto leading-relaxed">
              Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser 
              la gestion de votre patrimoine.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-1 bg-[#B99066]"></div>
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold">
              Articles à la Une
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-[#253F60] to-[#B99066]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-6xl">📰</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#B99066] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  <h3 className="text-[#253F60] text-xl lg:text-2xl font-cairo font-semibold mb-3 group-hover:text-[#B99066] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.author}</span>
                    <span className="text-[#B99066] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Lire l'article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter & Recent Articles */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-[#253F60]/80 to-[#B99066]/80">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-4xl">📄</span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-[#253F60] text-xs font-semibold px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-cairo font-semibold mb-2 group-hover:text-[#B99066] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-inter leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">
              Restez Informé
            </h2>
            <p className="text-white/80 font-inter mb-8">
              Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 py-3 rounded-lg font-inter text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B99066]"
              />
              <button className="bg-[#B99066] hover:bg-[#a17d54] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

