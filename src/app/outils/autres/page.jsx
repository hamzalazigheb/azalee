"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import SectionHeader from '../../../components/common/SectionHeader';

export default function AutresPage() {
  const [cmsContent, setCmsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load CMS content from database
  useEffect(() => {
    const loadCmsContent = async () => {
      try {
        const response = await fetch(`/api/pages/content?path=/outils/autres&type=cms`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.content) {
            setCmsContent(JSON.parse(data.content.content));
          }
        }
      } catch (error) {
        console.log('No CMS content found, using defaults');
      } finally {
        setIsLoading(false);
      }
    };

    loadCmsContent();
  }, []);

  // Default content if CMS content is not available
  const content = cmsContent || {
    hero: {
      title: "Autres Outils",
      subtitle: "Ressources complémentaires pour vos finances",
      description: "Découvrez notre collection d'outils spécialisés, ressources et services pour optimiser votre gestion patrimoniale."
    },
    categories: {
      all: "Tous les outils",
      calculatrices: "Calculatrices",
      simulateurs: "Simulateurs",
      ressources: "Ressources",
      services: "Services"
    },
    tools: [
      {
        id: 1,
        category: "calculatrices",
        title: "Calculateur de capacité d'emprunt",
        description: "Calculez votre capacité d'emprunt immobilier en fonction de vos revenus et charges.",
        icon: "🏠",
        features: ["Capacité d'emprunt", "Mensualités", "Taux d'endettement"],
        link: "/outils/calculatrice-capacite-emprunt"
      },
      {
        id: 2,
        category: "calculatrices",
        title: "Calculateur de rentabilité locative",
        description: "Évaluez la rentabilité d'un investissement immobilier locatif.",
        icon: "📊",
        features: ["Rentabilité brute", "Rentabilité nette", "Cash-flow"],
        link: "/outils/calculatrice-rentabilite-locative"
      },
      {
        id: 3,
        category: "simulateurs",
        title: "Simulateur de crédit immobilier",
        description: "Simulez différents scénarios de crédit immobilier avec tableaux d'amortissement.",
        icon: "💰",
        features: ["Tableau d'amortissement", "Coût total", "Comparaison"],
        link: "/outils/simulateur-credit-immobilier"
      },
      {
        id: 4,
        category: "simulateurs",
        title: "Simulateur de retraite",
        description: "Projetez vos revenus de retraite selon différents scénarios d'épargne.",
        icon: "👴",
        features: ["Revenus futurs", "Écart de pension", "Recommandations"],
        link: "/outils/simulateur-retraite"
      },
      {
        id: 5,
        category: "ressources",
        title: "Lexique financier",
        description: "Définitions et explications des termes financiers et fiscaux.",
        icon: "📚",
        features: ["Définitions", "Exemples", "Liens utiles"],
        link: "/ressources/lexique-financier"
      },
      {
        id: 6,
        category: "ressources",
        title: "Calendrier fiscal",
        description: "Dates importantes et échéances fiscales à retenir.",
        icon: "📅",
        features: ["Échéances", "Rappels", "Notifications"],
        link: "/ressources/calendrier-fiscal"
      },
      {
        id: 7,
        category: "services",
        title: "Conseil personnalisé",
        description: "Bénéficiez d'un conseil personnalisé avec nos experts financiers.",
        icon: "👨‍💼",
        features: ["Analyse personnalisée", "Recommandations", "Suivi"],
        link: "/services/conseil-personnalise"
      },
      {
        id: 8,
        category: "services",
        title: "Audit patrimonial",
        description: "Analyse complète de votre situation patrimoniale et fiscale.",
        icon: "🔍",
        features: ["Analyse complète", "Rapport détaillé", "Plan d'action"],
        link: "/services/audit-patrimonial"
      },
      {
        id: 9,
        category: "calculatrices",
        title: "Calculateur de plus-value immobilière",
        description: "Calculez les plus-values sur la vente d'un bien immobilier.",
        icon: "📈",
        features: ["Plus-value brute", "Plus-value nette", "Fiscalité"],
        link: "/outils/calculatrice-plus-value-immobiliere"
      },
      {
        id: 10,
        category: "simulateurs",
        title: "Simulateur d'assurance-vie",
        description: "Simulez la croissance de votre contrat d'assurance-vie.",
        icon: "🛡️",
        features: ["Projections", "Comparaisons", "Optimisations"],
        link: "/outils/simulateur-assurance-vie"
      },
      {
        id: 11,
        category: "ressources",
        title: "FAQ Financière",
        description: "Réponses aux questions les plus fréquentes sur la finance et la fiscalité.",
        icon: "❓",
        features: ["Questions fréquentes", "Réponses expertes", "Recherche"],
        link: "/ressources/faq-financiere"
      },
      {
        id: 12,
        category: "services",
        title: "Formation financière",
        description: "Formations en ligne pour améliorer vos connaissances financières.",
        icon: "🎓",
        features: ["Cours en ligne", "Certifications", "Suivi"],
        link: "/services/formation-financiere"
      }
    ],
    featured: {
      title: "Outil recommandé",
      tool: {
        title: "Calculateur de capacité d'emprunt",
        description: "L'outil le plus utilisé par nos clients pour évaluer leur capacité d'emprunt immobilier.",
        icon: "🏠",
        users: "15,000+ utilisateurs"
      }
    },
    stats: {
      title: "Nos outils en chiffres",
      stats: [
        { number: "50+", label: "Outils disponibles" },
        { number: "100K+", label: "Utilisateurs mensuels" },
        { number: "98%", label: "Satisfaction client" },
        { number: "24/7", label: "Disponibilité" }
      ]
    },
    newsletter: {
      title: "Restez informé",
      description: "Recevez les nouveautés et améliorations de nos outils",
      placeholder: "Votre adresse email"
    }
  };

  const filteredTools = selectedCategory === 'all' 
    ? content.tools 
    : content.tools.filter(tool => tool.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#253F60] border-t-transparent mx-auto mb-6"></div>
            <p className="text-[#686868] text-lg">Chargement des outils...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-32 translate-y-32"></div>
        
        <div className="relative max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#B99066] rounded-full mr-2"></span>
              Outils spécialisés
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl font-light mb-8 text-white/90">
              {content.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              {content.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-16 -mt-10">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-cairo font-bold">{content.featured.title}</h2>
                <p className="text-sm text-white/90">{content.featured.tool.users}</p>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-4">{content.featured.tool.title}</h3>
            <p className="text-lg text-white/90 mb-6">{content.featured.tool.description}</p>
            <button className="px-8 py-3 bg-[#B99066] text-white font-semibold rounded-xl hover:bg-[#A67A5A] transition-colors">
              Utiliser l'outil →
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.stats.title}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {content.stats.stats.map((stat, index) => (
              <div key={index} className={`text-center p-6 rounded-2xl ${
                index % 4 === 0 || index % 4 === 2 
                  ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47] text-white' 
                  : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A] text-white'
              }`}>
                <div className="text-3xl sm:text-4xl font-cairo font-bold mb-2">{stat.number}</div>
                <div className="font-inter font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(content.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === key
                    ? 'bg-[#B99066] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTools.map((tool, index) => (
              <div key={tool.id} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${
                index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 
                index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 
                'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'
              }`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index % 3 === 0 || index % 3 === 2 
                        ? 'bg-[#B99066]/30 text-white' 
                        : 'bg-[#253F60]/30 text-white'
                    }`}>
                      {content.categories[tool.category]}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-cairo font-bold mb-3 line-clamp-2">
                    {tool.title}
                  </h3>
                  
                  <p className="text-white/90 mb-6 line-clamp-3">
                    {tool.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-cairo font-semibold mb-2 text-white">Fonctionnalités :</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                    index % 3 === 0 || index % 3 === 2 
                      ? 'bg-[#B99066] hover:bg-[#A67A5A] text-white' 
                      : 'bg-[#253F60] hover:bg-[#1a2d47] text-white'
                  }`}>
                    Accéder à l'outil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Accès rapide"
            subtitle="Accédez rapidement aux outils les plus utilisés"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {content.tools.slice(0, 8).map((tool, index) => (
              <div key={tool.id} className={`group relative rounded-xl p-6 text-white overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                index % 4 === 0 || index % 4 === 2 
                  ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' 
                  : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'
              }`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                <h3 className="font-cairo font-semibold text-sm mb-2 relative z-10">{tool.title}</h3>
                <p className="text-xs text-white/90 line-clamp-2 relative z-10">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full bg-gradient-to-br from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-white mb-4">
                {content.newsletter.title}
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {content.newsletter.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={content.newsletter.placeholder}
                  className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-4 focus:ring-[#B99066] focus:ring-opacity-30 text-[#253F60]"
                />
                <button className="px-8 py-3 bg-[#B99066] text-white font-semibold rounded-xl hover:bg-[#A67A5A] transition-colors shadow-lg">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Besoin d'aide ?"
            subtitle="Notre équipe d'experts est là pour vous accompagner"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`group relative rounded-2xl p-8 text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cairo font-bold mb-4">Chat en direct</h3>
                <p className="text-white/90 mb-6">Obtenez une réponse immédiate à vos questions</p>
                <button className="px-6 py-3 bg-[#B99066] text-white font-semibold rounded-xl hover:bg-[#A67A5A] transition-colors">
                  Démarrer le chat
                </button>
              </div>
            </div>
            
            <div className={`group relative rounded-2xl p-8 text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cairo font-bold mb-4">Appel téléphonique</h3>
                <p className="text-white/90 mb-6">Parlez directement avec un conseiller</p>
                <button className="px-6 py-3 bg-[#253F60] text-white font-semibold rounded-xl hover:bg-[#1a2d47] transition-colors">
                  Appeler maintenant
                </button>
              </div>
            </div>
            
            <div className={`group relative rounded-2xl p-8 text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-cairo font-bold mb-4">Rendez-vous</h3>
                <p className="text-white/90 mb-6">Planifiez un entretien personnalisé</p>
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#B99066] text-white font-semibold rounded-xl hover:bg-[#A67A5A] transition-colors"
                >
                  Prendre RDV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}











