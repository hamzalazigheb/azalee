"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import SectionHeader from '../../../components/common/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';

export default function GuidesPratiquesClient({ content }) {
  const [cmsContent, setCmsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load CMS content from database
  useEffect(() => {
    const loadCmsContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=outils/guides-pratiques&t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setCmsContent(data.content);
          }
        }
      } catch (error) {
        console.log('No CMS content found, using defaults');
      } finally {
        setIsLoading(false);
      }
    };

    loadCmsContent();

    // Listen for CMS updates
    const handleCMSUpdate = () => {
      loadCmsContent();
    };
    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadCmsContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  // Default content if CMS content is not available
  const content = cmsContent || {
    hero: {
      title: "Guides pratiques partenaires",
      subtitle: "Supports pédagogiques de nos partenaires",
      description: "Nous mettons à disposition les guides pédagogiques de nos partenaires assureurs et sociétés de gestion pour vous accompagner dans vos choix d'investissement."
    },
    partners: [
      {
        id: "selencia",
        name: "Selencia",
        description: "Guide complet sur les produits d'assurance-vie et de capitalisation",
        logo: "/images/azalee-patrimoine-selencia.svg",
        logoType: "svg",
        category: "assurance",
        products: ["Assurance-vie", "Capitalisation", "Épargne retraite"],
        features: ["Caractéristiques détaillées", "Tableau des frais", "Avantages fiscaux", "Modalités de souscription"]
      },
      {
        id: "cardif",
        name: "Cardif",
        description: "Supports pédagogiques sur les contrats d'assurance et d'épargne",
        logo: "/images/azalee-patrimoine-cardif-logo.svg",
        logoType: "svg",
        category: "assurance",
        products: ["Assurance-vie", "PER", "Contrats de capitalisation"],
        features: ["Fonctionnement des produits", "Fiscalité applicable", "Risques et garanties", "Conseils d'utilisation"]
      },
      {
        id: "swisslife",
        name: "SwissLife",
        description: "Guides spécialisés en gestion de patrimoine et assurance",
        logo: "/images/azalee-patrimoine-sl-logo-svg.svg",
        logoType: "svg",
        category: "patrimoine",
        products: ["Assurance-vie", "Gestion de patrimoine", "Transmission", "Retraite"],
        features: ["Stratégies patrimoniales", "Optimisation fiscale", "Transmission intergénérationnelle", "Planification retraite"]
      },
      {
        id: "vieplus",
        name: "Vie Plus",
        description: "Documentation sur les produits d'assurance-vie et d'épargne",
        logo: "/images/azalee-patrimoine-vieplus.svg",
        logoType: "svg",
        category: "assurance",
        products: ["Assurance-vie", "Épargne", "Capitalisation"],
        features: ["Présentation des contrats", "Avantages concurrentiels", "Fiscalité", "Flexibilité des versements"]
      },
      {
        id: "uaflife",
        name: "UAF Life",
        description: "Guides pratiques sur l'assurance-vie et les placements",
        logo: "🎯",
        logoType: "emoji",
        category: "assurance",
        products: ["Assurance-vie", "Placements", "Épargne"],
        features: ["Comparaison des supports", "Rendements historiques", "Frais et charges", "Conseils d'allocation"]
      },
      {
        id: "intencial",
        name: "Intencial",
        description: "Supports pédagogiques sur la gestion d'actifs et l'assurance",
        logo: "/images/azalee-patrimoine-intencial-1.webp",
        logoType: "svg",
        category: "gestion",
        products: ["Gestion d'actifs", "Assurance-vie", "OPCVM"],
        features: ["Philosophie d'investissement", "Gestion active", "Performance", "Transparence des frais"]
      }
    ],
    categories: {
      all: "Tous les partenaires",
      assurance: "Assurance",
      patrimoine: "Patrimoine",
      gestion: "Gestion d'actifs"
    },
    featured: {
      title: "Guide du mois",
      guide: {
        title: "Assurance-vie 2024 : les nouveautés réglementaires",
        description: "Découvrez les dernières évolutions réglementaires et leurs impacts sur vos contrats d'assurance-vie.",
        readTime: "25 min",
        difficulty: "Intermédiaire"
      }
    },
    benefits: {
      title: "Pourquoi consulter nos guides partenaires ?",
      benefits: [
        "Informations officielles et actualisées des émetteurs",
        "Comparaison objective des caractéristiques et frais",
        "Présentation claire des avantages et inconvénients",
        "Conseils pratiques pour optimiser vos investissements"
      ]
    }
  };

  const filteredPartners = selectedCategory === 'all' 
    ? content.partners 
    : content.partners.filter(partner => partner.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-[#253F60]/10 text-[#253F60]';
      case 'Intermédiaire': return 'bg-[#B99066]/10 text-[#B99066]';
      case 'Avancé': return 'bg-[#253F60]/20 text-[#253F60]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#253F60] border-t-transparent mx-auto mb-6"></div>
            <p className="text-[#686868] text-lg">Chargement des guides...</p>
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
              Guides pratiques
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

      {/* Featured Guide */}
      <section className="py-16 -mt-10">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-cairo font-bold">{content.featured.title}</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {content.featured.guide.readTime}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(content.featured.guide.difficulty)}`}>
                  {content.featured.guide.difficulty}
                </span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-4">{content.featured.guide.title}</h3>
            <p className="text-lg text-white/90 mb-6">{content.featured.guide.description}</p>
            <CTAButton variant="primary">
              Lire le guide →
            </CTAButton>
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

      {/* Partners Grid */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Nos partenaires"
            subtitle="Ces supports présentent de façon claire les caractéristiques, frais et avantages des produits disponibles."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPartners.map((partner, index) => (
              <div key={partner.id} className={`relative rounded-2xl p-8 shadow-xl text-white overflow-hidden flex flex-col ${
                index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 
                index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 
                'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'
              }`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      partner.logoType === 'svg' 
                        ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-lg' 
                        : `bg-gradient-to-br ${index % 3 === 0 || index % 3 === 2 ? 'from-[#B99066] to-[#A67A5A]' : 'from-[#253F60] to-[#1a2d47]'}`
                    }`}>
                      {partner.logoType === 'svg' ? (
                        <img 
                          src={partner.logo} 
                          alt={`Logo ${partner.name}`}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-white text-2xl">{partner.logo}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-cairo font-bold mb-1">
                        {partner.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]/30 text-white' : 'bg-[#253F60]/30 text-white'
                      }`}>
                        {content.categories[partner.category]}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-white/90 mb-6">
                    {partner.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-cairo font-semibold mb-3 text-white">Produits disponibles :</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {partner.products.map((product, productIndex) => (
                        <span key={productIndex} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded text-xs">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6 flex-grow">
                    <h4 className="text-sm font-cairo font-semibold mb-3 text-white">Contenu des guides :</h4>
                    <ul className="space-y-1">
                      {partner.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-white/90">
                          <div className={`w-1.5 h-1.5 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-200 mt-auto hover:scale-105 ${
                    index % 3 === 0 || index % 3 === 2 
                      ? 'bg-[#B99066] hover:bg-[#A67A5A] text-white' 
                      : 'bg-[#253F60] hover:bg-[#1a2d47] text-white'
                  }`}>
                    Consulter les guides
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.benefits.title}
            subtitle="Découvrez pourquoi nos guides partenaires sont essentiels pour vos décisions d'investissement"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.benefits.benefits.map((benefit, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${
                index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
              }`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-8 h-8 ${index % 2 === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-white font-cairo font-medium">{benefit}</p>
                </div>
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
                Restez informé des nouveaux guides partenaires
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Recevez les dernières documentations de nos partenaires et nos analyses comparatives directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-4 focus:ring-[#B99066] focus:ring-opacity-30 text-[#253F60]"
                />
                <CTAButton variant="primary">
                  S'abonner
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}




