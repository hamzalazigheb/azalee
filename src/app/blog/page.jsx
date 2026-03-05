'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { getApiPath } from '@/lib/paths';

// Default articles fallback
const defaultBlogArticles = [
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

const defaultCategories = ['Tous', 'Fiscalité', 'Retraite', 'Placements', 'Patrimoine', 'Immobilier'];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Helper to get correct image URL for display
function getImageSrc(imagePath) {
  if (!imagePath) return null;
  
  // If it starts with /images/, use API route for dynamic serving
  if (imagePath.startsWith('/images/')) {
    return `/api${imagePath}`;
  }
  
  // External URLs or other paths stay as-is
  return imagePath;
}

// Helper function to get article URL (external or internal)
function getArticleUrl(slug) {
  if (!slug) return '#';
  
  // If it's already a full URL (http:// or https://)
  if (slug.startsWith('http://') || slug.startsWith('https://')) {
    return slug;
  }
  
  // If it starts with www., add https://
  if (slug.startsWith('www.')) {
    return `https://${slug}`;
  }
  
  // Otherwise, it's an internal blog article
  return `/blog/${slug}`;
}

// Helper to check if URL is external
function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

// Component to handle both external and internal links
function ArticleLink({ article, children, className }) {
  const articleUrl = getArticleUrl(article.slug);
  const isExternal = isExternalUrl(articleUrl);
  
  const commonProps = {
    className,
    ...(isExternal && { target: "_blank", rel: "noopener noreferrer" })
  };
  
  if (isExternal) {
    return (
      <a href={articleUrl} {...commonProps}>
        {children}
      </a>
    );
  }
  
  return (
    <Link href={articleUrl} {...commonProps}>
      {children}
    </Link>
  );
}

export default function BlogPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    fetchContent();
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === 'blog') {
        fetchContent();
      }
    };
    window.addEventListener('cmsContentUpdated', handleCMSUpdate);
    return () => window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(getApiPath(`/cms/content?path=blog&t=${Date.now()}`), {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success && data.data && Object.keys(data.data).length > 0) {
        setContent(data.data);
      } else {
        // Fallback to default content
        setContent({
          hero: {
            title: "Blog & Actualités",
            subtitle: "Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser la gestion de votre patrimoine."
          },
          articles: defaultBlogArticles,
          categories: defaultCategories,
          newsletter: {
            title: "Restez Informé",
            description: "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.",
            buttonText: "S'abonner"
          }
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setContent({
        hero: {
          title: "Blog & Actualités",
          subtitle: "Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser la gestion de votre patrimoine."
        },
        articles: defaultBlogArticles,
        categories: defaultCategories,
        newsletter: {
          title: "Restez Informé",
          description: "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail.",
          buttonText: "S'abonner"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B99066] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const articles = content?.articles || defaultBlogArticles;
  const categories = content?.categories || defaultCategories;
  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles.filter(article => !article.featured);
  const filteredArticles = selectedCategory === 'Tous' 
    ? recentArticles 
    : recentArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-20 lg:py-28">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-1 bg-[#B99066] mx-auto mb-6"></div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">
              {content?.hero?.title || "Blog & Actualités"}
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-inter max-w-3xl mx-auto leading-relaxed">
              {content?.hero?.subtitle || "Conseils d'experts, analyses de marché et stratégies patrimoniales pour optimiser la gestion de votre patrimoine."}
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
              <ArticleLink
                key={article.id}
                article={article}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-[#253F60] to-[#B99066]">
                  {article.image ? (
                    <img 
                      src={getImageSrc(article.image)} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-6xl">📰</span>
                    </div>
                  )}
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
                  
                  {/* Social Links */}
                  {article.socialLinks && (article.socialLinks.linkedin || article.socialLinks.facebook || article.socialLinks.twitter || article.socialLinks.instagram) && (
                    <div className="flex items-center gap-3 mb-4">
                      {article.socialLinks.linkedin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (article.socialLinks.linkedin) {
                              window.open(article.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-[#0077b5] hover:text-[#005885] transition-colors cursor-pointer"
                          aria-label="Voir sur LinkedIn"
                          type="button"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </button>
                      )}
                      {article.socialLinks.facebook && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (article.socialLinks.facebook) {
                              window.open(article.socialLinks.facebook, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-[#1877f2] hover:text-[#1565c0] transition-colors cursor-pointer"
                          aria-label="Voir sur Facebook"
                          type="button"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                      )}
                      {article.socialLinks.twitter && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (article.socialLinks.twitter) {
                              window.open(article.socialLinks.twitter, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-[#1da1f2] hover:text-[#0d8bd9] transition-colors cursor-pointer"
                          aria-label="Voir sur Twitter/X"
                          type="button"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </button>
                      )}
                      {article.socialLinks.instagram && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (article.socialLinks.instagram) {
                              window.open(article.socialLinks.instagram, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="text-[#e4405f] hover:text-[#c13584] transition-colors cursor-pointer"
                          aria-label="Voir sur Instagram"
                          type="button"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                  
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
              </ArticleLink>
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
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-inter text-sm font-medium transition-all duration-200 ${
                  category === selectedCategory
                    ? 'bg-[#253F60] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#253F60] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleLink
                  key={article.id}
                  article={article}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#B99066]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-[#253F60]/80 to-[#B99066]/80">
                    {article.image ? (
                      <img 
                        src={getImageSrc(article.image)} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/30 text-4xl">📄</span>
                      </div>
                    )}
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
                    
                    {/* Social Links */}
                    {article.socialLinks && (article.socialLinks.linkedin || article.socialLinks.facebook || article.socialLinks.twitter || article.socialLinks.instagram) && (
                      <div className="flex items-center gap-2 mt-3">
                        {article.socialLinks.linkedin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (article.socialLinks.linkedin) {
                                window.open(article.socialLinks.linkedin, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="text-[#0077b5] hover:text-[#005885] transition-colors cursor-pointer"
                            aria-label="LinkedIn"
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </button>
                        )}
                        {article.socialLinks.facebook && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (article.socialLinks.facebook) {
                                window.open(article.socialLinks.facebook, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="text-[#1877f2] hover:text-[#1565c0] transition-colors cursor-pointer"
                            aria-label="Facebook"
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </button>
                        )}
                        {article.socialLinks.twitter && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (article.socialLinks.twitter) {
                                window.open(article.socialLinks.twitter, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="text-[#1da1f2] hover:text-[#0d8bd9] transition-colors cursor-pointer"
                            aria-label="Twitter/X"
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          </button>
                        )}
                        {article.socialLinks.instagram && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (article.socialLinks.instagram) {
                                window.open(article.socialLinks.instagram, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="text-[#e4405f] hover:text-[#c13584] transition-colors cursor-pointer"
                            aria-label="Instagram"
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </ArticleLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun article disponible dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">
              {content?.newsletter?.title || "Restez Informé"}
            </h2>
            <p className="text-white/80 font-inter mb-8">
              {content?.newsletter?.description || "Recevez nos derniers articles et conseils patrimoniaux directement dans votre boîte mail."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 py-3 rounded-lg font-inter text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B99066]"
              />
              <button className="bg-[#B99066] hover:bg-[#a17d54] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {content?.newsletter?.buttonText || "S'abonner"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

