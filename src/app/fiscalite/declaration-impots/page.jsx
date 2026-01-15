"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";

export default function DeclarationImpotsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Déclaration de revenus",
      description: "Guide complet pour déclarer vos impôts en toute sérénité. Découvrez les étapes, les documents nécessaires et nos conseils d'experts."
    },
    tabs: {
      tabs: [
        { id: "general", label: "Prélèvement à la source" },
        { id: "dates", label: "Régularisation" },
        { id: "documents", label: "Questions fréquentes" },
        { id: "erreurs", label: "Accompagnement" }
      ]
    },
    steps: {
      steps: [
        {
          step: "1",
          title: "Rassemblement des documents",
          description: "Collectez tous vos justificatifs de revenus, charges et investissements",
          details: ["Bulletins de salaire", "Attestations de loyer", "Relevés bancaires", "Quittances de charges"]
        },
        {
          step: "2",
          title: "Choix du mode de déclaration",
          description: "Optez pour la méthode qui vous convient le mieux",
          details: ["Déclaration en ligne (recommandée)", "Déclaration papier", "Déclaration par téléphone"]
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour votre déclaration ?",
      description: "Nos experts fiscaux vous accompagnent dans toutes vos démarches de déclaration d'impôts.",
      buttonText: "Demander une assistance"
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=fiscalite/declaration-impots&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            // Merge with defaultContent as fallback
            const mergedContent = { ...defaultContent, ...data.data };
            console.log('📦 CMS Content loaded for declaration-impots:', {
              sections: Object.keys(mergedContent),
              hasDeclarationSteps: !!mergedContent.declarationSteps,
              declarationStepsCount: mergedContent.declarationSteps?.length || 0,
              hasCalendarData: !!mergedContent.calendarData,
              calendarDataCount: mergedContent.calendarData?.length || 0,
              hasCommonErrors: !!mergedContent.commonErrors,
              commonErrorsCount: mergedContent.commonErrors?.length || 0,
              hasQuickStats: !!mergedContent.quickStats,
              quickStatsCount: mergedContent.quickStats?.length || 0,
              hasTabContent: !!mergedContent.tabContent,
              tabContentKeys: mergedContent.tabContent ? Object.keys(mergedContent.tabContent) : [],
              hasConclusion: !!mergedContent.conclusion
            });
            setContent(mergedContent);
          } else {
            console.warn('⚠️ No data.data in response, using defaultContent');
            setContent(defaultContent);
          }
        } else {
          console.warn('⚠️ Response not OK, using defaultContent');
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch declaration-impots content:", error);
        setContent(defaultContent);
      }
    };

    fetchContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === 'fiscalite/declaration-impots' || updatedPath.includes('declaration-impots')) {
        console.log('🔄 CMS content updated, refreshing declaration-impots page...', updatedPath);
        fetchContent();
      }
    };

    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  // Use dynamic tabs from CMS or default
  const tabs = content.tabs?.tabs || defaultContent.tabs.tabs;

  // Get content from CMS
  const declarationSteps = content.declarationSteps || [];
  const calendarData = content.calendarData || [];
  const commonErrors = content.commonErrors || [];
  const quickStats = content.quickStats || [];
  const tabContent = content.tabContent || {};

  return (
    <>
      {/* Loading indicator */}

      {/* Hero Section with Gradient Background */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block bg-[#B99066] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Guide complet
            </span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
            {content.hero?.title || defaultContent.hero.title}
          </h1>
          <p className="max-w-4xl mx-auto text-white text-base sm:text-lg leading-relaxed mb-8">
            {content.hero?.description || defaultContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="bg-[#253F60] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A2A4A] transition-colors duration-200"
              onClick={() => window.location.href = '/outils/calculatrice-impots'}
            >
              Simuler ma déclaration
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Cards */}
      <div className="relative -mt-8 sm:-mt-12">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 text-center">
                  <p className="text-white/90 text-sm uppercase tracking-wide mb-2">{stat.label}</p>
                  <p className="text-white text-2xl font-semibold mb-2">{stat.month || stat.subtitle}</p>
                  <p className="text-white/80 text-xs">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Declaration Steps Section */}
      {declarationSteps.length > 0 && (
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4">
                Les étapes de la déclaration
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-3xl mx-auto">
                Suivez ces étapes pour déclarer vos revenus en toute sérénité
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {declarationSteps.map((step, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-semibold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#4B5563] text-sm sm:text-base mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-[#686868]">
                          <div className="w-1.5 h-1.5 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendar Data Section */}
      {calendarData.length > 0 && (
        <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4">
                Calendrier des déclarations
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-3xl mx-auto">
                Dates importantes pour votre déclaration de revenus
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {calendarData.map((monthData, index) => (
                <div key={index} className="bg-white rounded-xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-all duration-300 shadow-lg hover:shadow-xl">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 text-center">
                    {monthData.month}
                  </h3>
                  <div className="space-y-4">
                    {monthData.dates && monthData.dates.map((date, dateIndex) => (
                      <div key={dateIndex} className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#253F60]/5 to-[#B99066]/5 rounded-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {date.day}
                        </div>
                        <p className="text-[#4B5563] text-sm sm:text-base font-medium">
                          {date.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Common Errors Section */}
      {commonErrors.length > 0 && (
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4">
                Erreurs fréquentes à éviter
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-3xl mx-auto">
                Découvrez les erreurs les plus courantes et comment les éviter
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {commonErrors.map((error, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 sm:p-8 border-2 border-red-200 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-red-600 text-lg sm:text-xl font-cairo font-semibold">
                      {error.error}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                      <p className="text-yellow-800 text-sm font-semibold mb-1">Impact :</p>
                      <p className="text-yellow-700 text-sm">{error.impact}</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                      <p className="text-green-800 text-sm font-semibold mb-1">Solution :</p>
                      <p className="text-green-700 text-sm">{error.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab Navigation */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white shadow-lg"
                    : "bg-white border-2 border-[#253F60] text-[#253F60] hover:bg-[#253F60] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "general" && tabContent.general && (
              <div className="space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-3 sm:mb-4">{tabContent.general.title}</h2>
                  <p className="text-[#686868] text-sm sm:text-base lg:text-lg">{tabContent.general.subtitle}</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white">
                  <h3 className="text-white text-lg sm:text-xl font-cairo font-semibold mb-3 sm:mb-4">{tabContent.general.questionTitle}</h3>
                  {tabContent.general.paragraphs && tabContent.general.paragraphs.map((paragraph, index) => (
                    <p key={index} className={`text-white/90 ${index === 0 ? 'text-sm sm:text-base leading-relaxed mb-3 sm:mb-4' : 'text-base leading-relaxed'}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {tabContent.general.cards && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {tabContent.general.cards.map((card, index) => (
                      <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${index === 1 ? 'from-[#253F60] to-[#1a2d47]' : 'from-[#B99066] to-[#A67A5A]'} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {index === 0 ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                )}
                              </svg>
                            </div>
                            <h3 className="text-white text-lg font-cairo font-semibold">{card.title}</h3>
                          </div>
                          <p className="text-white/90 text-sm mb-3">{card.description}</p>
                          {card.badge && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                              <p className="text-white font-semibold">{card.badge}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "dates" && tabContent.dates && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">{tabContent.dates.title}</h2>
                  <p className="text-[#686868] text-lg">{tabContent.dates.subtitle}</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-8 mb-8 text-white">
                  <h3 className="text-white text-xl font-cairo font-semibold mb-4">{tabContent.dates.faqTitle}</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-l-4 border-[#B99066]">
                    <p className="text-white text-lg font-semibold mb-3">{tabContent.dates.faqAnswer}</p>
                    {tabContent.dates.faqParagraphs && tabContent.dates.faqParagraphs.map((paragraph, index) => (
                      <p key={index} className={`text-white/90 text-base leading-relaxed ${index === 0 ? 'mb-4' : ''}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-4 flex items-center gap-2">
                        Calcul du taux de prélèvement
                      </h3>
                      {tabContent.dates.calculationPoints && (
                        <ul className="space-y-2 text-white/90 text-sm">
                          {tabContent.dates.calculationPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-4 flex items-center gap-2">
                        Risques d'une déclaration incomplète
                      </h3>
                      {tabContent.dates.risksPoints && (
                        <ul className="space-y-2 text-white/90 text-sm">
                          {tabContent.dates.risksPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && tabContent.documents && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">{tabContent.documents.title}</h2>
                  <p className="text-[#686868] text-lg">{tabContent.documents.subtitle}</p>
                </div>
                
                {tabContent.documents.questions && (
                  <div className="space-y-6">
                    {tabContent.documents.questions.map((item, index) => (
                      <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                        <div className="relative z-10">
                          <h3 className="text-white text-lg font-cairo font-semibold mb-3">{item.question}</h3>
                          <p className="text-white/90 text-base leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "erreurs" && tabContent.erreurs && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">{tabContent.erreurs.title}</h2>
                  <p className="text-[#686868] text-lg">{tabContent.erreurs.subtitle}</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-8 mb-8 text-white">
                  <h3 className="text-white text-xl font-cairo font-semibold mb-4">{tabContent.erreurs.questionTitle}</h3>
                  <p className="text-white/90 text-base leading-relaxed mb-6">{tabContent.erreurs.answer}</p>
                  
                  {tabContent.erreurs.benefits && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tabContent.erreurs.benefits.map((benefit, index) => (
                        <div key={index} className={`group relative rounded-2xl p-6 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                          <div className="relative z-10 text-center">
                            <div className={`w-12 h-12 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] to-[#1a2d47]' : 'from-[#B99066] to-[#A67A5A]'} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                            </div>
                            <h4 className="text-white font-cairo font-semibold mb-2">{benefit.title}</h4>
                            <p className="text-white/90 text-sm">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl p-8 text-white text-center shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-cairo font-semibold mb-4">
                      {content.cta?.title || defaultContent.cta.title}
                    </h3>
                    <p className="text-base mb-6 opacity-90">
                      {content.cta?.description || defaultContent.cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="bg-[#B99066] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A67C52] transition-colors duration-200 shadow-lg"
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      >
                        {content.cta?.buttonText || defaultContent.cta.buttonText}
                      </button>
                      <button 
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-200 shadow-lg"
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      >
                        Planifiez votre consultation gratuite
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                {content.conclusion?.title || "Conclusion : La déclaration de revenus, un moment clé"}
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {content.conclusion?.description || "La déclaration de revenus n'est pas qu'une simple formalité administrative : elle constitue un moment clé pour ajuster, comprendre et optimiser sa fiscalité. Bien réalisée, elle peut permettre de récupérer des sommes importantes et d'anticiper la charge fiscale de l'année suivante."}
              </p>
              {content.conclusion && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                  <h3 className="text-white text-xl font-cairo font-semibold mb-3">{content.conclusion.ctaTitle}</h3>
                  <p className="text-white/90 text-sm">
                    {content.conclusion.ctaDescription}
                  </p>
                </div>
              )}
              <CTAButton 
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                variant="primary"
                className="rounded-full"
              >
                Planifiez votre consultation gratuite
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 