"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function SimulationsGeneralesPage() {
  const [cmsContent, setCmsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCmsContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=outils/simulations-generales&t=${Date.now()}`);
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
      title: "Simulations générales",
      subtitle: "Outils de simulation financière et patrimoniale",
      description: "Découvrez nos simulateurs professionnels pour planifier vos investissements, optimiser votre fiscalité et construire votre patrimoine. Des outils précis et adaptés à vos besoins.",
      ctaPrimary: "Commencer une simulation",
      ctaSecondary: "Découvrir nos outils"
    },
    tools: {
      title: "Nos outils de simulation",
      description: "Choisissez l'outil adapté à votre situation",
      items: [
        {
          id: "investissement",
          title: "Simulation d'investissement",
          description: "Calculez la rentabilité de vos placements et optimisez votre stratégie d'investissement",
          icon: "📈",
          features: ["Capitalisation composée", "Comparaison de supports", "Impact fiscal", "Projections long terme"]
        },
        {
          id: "patrimoine",
          title: "Simulation patrimoniale",
          description: "Planifiez la transmission de votre patrimoine et optimisez votre fiscalité",
          icon: "🏛️",
          features: ["Transmission successorale", "Optimisation fiscale", "Stratégies patrimoniales", "Conseils personnalisés"]
        },
        {
          id: "retraite",
          title: "Simulation retraite",
          description: "Préparez votre retraite avec nos outils de projection et d'optimisation",
          icon: "🎯",
          features: ["Projections de retraite", "Optimisation des versements", "Comparaison des produits", "Planification long terme"]
        },
        {
          id: "immobilier",
          title: "Simulation immobilière",
          description: "Évaluez vos investissements immobiliers et optimisez votre rendement",
          icon: "🏠",
          features: ["Rentabilité locative", "Défiscalisation", "Plus-values", "Optimisation fiscale"]
        }
      ]
    },
    methodology: {
      title: "Méthodologie",
      description: "Nos simulations sont basées sur des calculs précis et des données actualisées",
      content: [
        "Tous nos calculs respectent la réglementation française en vigueur",
        "Les taux et barèmes sont mis à jour régulièrement",
        "Les simulations tiennent compte de la fiscalité applicable",
        "Les résultats sont fournis à titre indicatif et ne constituent pas des conseils personnalisés"
      ]
    },
    faq: {
      title: "Questions fréquentes",
      questions: [
        {
          question: "Les simulations sont-elles gratuites ?",
          answer: "Oui, tous nos outils de simulation sont entièrement gratuits et accessibles sans inscription."
        },
        {
          question: "Les résultats sont-ils fiables ?",
          answer: "Nos simulations sont basées sur des calculs précis et des données actualisées, mais restent indicatives."
        },
        {
          question: "Puis-je obtenir des conseils personnalisés ?",
          answer: "Nos simulations vous donnent une base de réflexion. Pour des conseils personnalisés, nous vous recommandons de consulter un professionnel."
        }
      ]
    }
  };

  // Ensure content structure is complete with fallbacks
  const safeContent = {
    hero: {
      title: content.hero?.title || "Simulations générales",
      subtitle: content.hero?.subtitle || "Outils de simulation financière et patrimoniale",
      description: content.hero?.description || "Découvrez nos simulateurs professionnels pour planifier vos investissements et optimiser votre patrimoine.",
      ctaPrimary: content.hero?.ctaPrimary || "Commencer une simulation",
      ctaSecondary: content.hero?.ctaSecondary || "Découvrir nos outils"
    },
    tools: {
      title: content.tools?.title || "Nos outils de simulation",
      description: content.tools?.description || "Choisissez l'outil adapté à votre situation",
      items: content.tools?.items || []
    },
    methodology: {
      title: content.methodology?.title || "Méthodologie",
      description: content.methodology?.description || "Nos simulations sont basées sur des calculs précis",
      content: content.methodology?.content || []
    },
    faq: {
      title: content.faq?.title || "Questions fréquentes",
      questions: content.faq?.questions || []
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60] mx-auto mb-4"></div>
            <p className="text-[#686868]">Chargement du contenu...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
            {safeContent.hero.title}
          </h1>
          <p className="max-w-3xl mx-auto text-white text-base sm:text-lg font-inter leading-relaxed mb-6">
            {safeContent.hero.description}
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="#outils" className="inline-flex items-center justify-center bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200">
              {safeContent.hero.ctaPrimary}
            </a>
            <a href="#methodologie" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200">
              {safeContent.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="outils" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={safeContent.tools.title}
            subtitle={safeContent.tools.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {safeContent.tools.items.map((tool, index) => (
              <div key={tool.id || index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${
                index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
              }`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {tool.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {tool.features && tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          index % 2 === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'
                        }`}></div>
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    index % 2 === 0 
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

      {/* Methodology and FAQ Section */}
      <section id="methodologie" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#253F60]/20 lg:col-span-2">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
                {safeContent.methodology.title}
              </h3>
              <p className="text-[#686868] text-base leading-relaxed mb-4">
                {safeContent.methodology.description}
              </p>
              <ul className="space-y-3">
                {safeContent.methodology.content.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#B99066] mt-1 font-bold">•</span>
                    <span className="text-[#686868] text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-6">
                {safeContent.faq.title}
              </h3>
              <div className="space-y-6">
                {safeContent.faq.questions.map((item, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-0 last:pb-0">
                    <p className="text-white font-cairo font-semibold mb-2">{item.question}</p>
                    <p className="text-white/90 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-gradient-to-br from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">
                Prêt à optimiser votre patrimoine ?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Utilisez nos outils professionnels pour prendre les meilleures décisions financières et patrimoniales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/outils"
                  className="bg-[#B99066] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A67A5A] transition-colors shadow-lg"
                >
                  Découvrir tous nos outils
                </a>
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#253F60] transition-colors"
                >
                  Planifiez votre consultation gratuite
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
