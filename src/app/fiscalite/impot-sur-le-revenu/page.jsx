"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function Page() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Impôt sur le revenu",
      description: "L'impôt sur le revenu (IR) est l'un des piliers du système fiscal français. Depuis 2019, il est prélevé à la source, ce qui permet une collecte immédiate et continue. Il s'applique aux revenus d'activité, fonciers, financiers et exceptionnels.",
      button1Text: "Accéder au simulateur",
      button1Link: "#simulateur",
      button2Text: "Voir le sommaire",
      button2Link: "#sommaire"
    },
    stats: {
      stats: [
        {
          subtitle: "Depuis 2019",
          title: "Prélèvement à la source",
          description: "Collecte immédiate et continue"
        },
        {
          subtitle: "Optimisation",
          title: "Dispositifs fiscaux",
          description: "PER, Pinel, Girardin, déficit foncier"
        },
        {
          subtitle: "Stratégie",
          title: "Patrimoine",
          description: "Maîtrise de l'IR essentielle"
        }
      ]
    },
    sommaire: {
      title: "Sommaire",
      items: [
        "1. Qu'est-ce que l'impôt sur le revenu ?",
        "2. Calcul de l'impôt sur le revenu",
        "3. Quotient familial et parts",
        "4. Prélèvement à la source",
        "5. Optimisation fiscale",
        "6. Déclaration et paiement"
      ]
    },
    content: {
      sections: [
        {
          title: "Qu'est-ce que l'impôt sur le revenu ?",
          content: "L'impôt sur le revenu est un impôt direct qui frappe le revenu net des personnes physiques. Il s'applique aux revenus de source française et étrangère des personnes domiciliées en France."
        },
        {
          title: "Calcul de l'impôt sur le revenu",
          content: "Le calcul de l'IR se fait selon un barème progressif par tranches. Le taux d'imposition varie de 0% à 45% selon le niveau de revenus."
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts en fiscalité vous accompagnent pour réduire votre impôt sur le revenu et optimiser votre situation fiscale.",
      buttonText: "Demander une consultation gratuite"
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=fiscalite/impot-sur-le-revenu&t=${Date.now()}`, {
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
            console.log('📦 CMS Content loaded for impot-sur-le-revenu:', {
              sections: Object.keys(mergedContent),
              hasStats: !!mergedContent.stats?.stats,
              statsCount: mergedContent.stats?.stats?.length || 0,
              hasDispositifs: !!mergedContent.dispositifs,
              dispositifsCount: mergedContent.dispositifs?.items?.length || 0,
              hasFaq: !!mergedContent.faq,
              faqCount: mergedContent.faq?.questions?.length || 0,
              hasOptimisation: !!mergedContent.optimisation
            });
            setContent(mergedContent);
          } else {
            setContent(defaultContent);
          }
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch fiscalite/impot-sur-le-revenu content:", error);
        setContent(defaultContent);
      }
    };

    fetchContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === 'fiscalite/impot-sur-le-revenu' || updatedPath.includes('impot-sur-le-revenu')) {
        console.log('🔄 CMS content updated, refreshing impot-sur-le-revenu page...', updatedPath);
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

  // Get content from CMS
  const stats = content.stats?.stats || [];
  const dispositifs = content.dispositifs || {};
  const faq = content.faq || {};
  const optimisation = content.optimisation || {};

  return (
    <>

       {/* Hero Section */}
       <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24 overflow-hidden">
         <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
           {/* Main content */}
           <div className="text-center mb-12">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
               {content.hero?.title || defaultContent.hero.title}
             </h1>
             <p className="text-lg sm:text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
               {content.hero?.description || defaultContent.hero.description}
             </p>
             
             {/* Action buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href={content.hero?.button1Link || "/outils/calculatrice-impots"} className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A67C52] transition-colors duration-200">
                 {content.hero?.button1Text || defaultContent.hero.button1Text}
               </a>
               <a href={content.hero?.button2Link || "/fiscalite/declaration-impots"} className="bg-white text-[#B99066] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
                 {content.hero?.button2Text || defaultContent.hero.button2Text}
               </a>
             </div>
           </div>

           {/* Feature cards */}
           {stats.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {stats.map((stat, index) => (
                 <div key={index} className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-24 h-24 ${index === 1 ? 'bg-[#B99066]/10' : 'bg-[#253F60]/10'} rounded-bl-full`}></div>
                   <p className="text-[#686868] text-sm uppercase mb-2 font-semibold">{stat.subtitle}</p>
                   <h3 className="text-[#253F60] text-xl font-semibold mb-2">{stat.title}</h3>
                   <p className="text-[#686868] text-sm">{stat.description}</p>
                 </div>
               ))}
             </div>
           )}
         </div>
       </section>

      {/* Bouton Guide Défiscalisation */}
      <section className="w-full py-6 sm:py-8 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href="/outils-financiers/guide-defiscalisation"
            className="inline-block bg-gradient-to-r from-[#253F60] to-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Je comprends les dispositifs et j'optimise mon imposition
          </a>
        </div>
      </section>

      {/* Section Les 10 meilleurs dispositifs */}
      {dispositifs.items && dispositifs.items.length > 0 && (
        <section className="w-full py-8 sm:py-10 lg:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title={dispositifs.title || "Les 10 meilleurs dispositifs de réduction d'impôts"}
              subtitle={dispositifs.subtitle || "Après avoir compris le fonctionnement et le calcul de l'impôt sur le revenu, il est essentiel d'identifier les leviers à votre disposition pour réduire votre fiscalité."}
            />
            {dispositifs.ctaButton && (
              <div className="mb-8">
                <div className="text-left">
                  <a 
                    href={dispositifs.ctaLink || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#B99066] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#A67C52] transition-colors duration-200 border border-[#A67C52]"
                  >
                    {dispositifs.ctaButton}
                  </a>
                </div>
              </div>
            )}

            {/* 10 blocs dispositifs fiscaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
              {dispositifs.items && dispositifs.items.map((item, index) => {
                const borderColor = index % 2 === 0 ? 'border-[#253F60]' : 'border-[#B99066]';
                const bgColor = index % 2 === 0 ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';
                
                return (
                  <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 ${borderColor} border-l-4 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 w-20 h-20 ${bgColor} rounded-bl-full`}></div>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l2.293 2.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                      </div>
                      <h3 className="text-[#B99066] font-bold text-lg uppercase">{item.name}</h3>
                      {item.acronym && <p className="text-[#686868] text-xs mt-1">({item.acronym})</p>}
                      {item.subtitle && <p className="text-[#686868] text-xs mt-1">{item.subtitle}</p>}
                    </div>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {item.link ? (
                        <>
                          <a href={item.link} className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">{item.name}</a>
                          {' '}
                          {item.description.replace(item.name, '').trim()}
                        </>
                      ) : (
                        item.description
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section FAQ */}
      {faq.questions && faq.questions.length > 0 && (
        <section className="w-full py-8 sm:py-10 lg:py-16 bg-white">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {faq.questions.slice(0, 2).map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">
                        {item.question}
                      </h3>
                      <p className="text-[#374151] text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Question 3 - Full width */}
            {faq.questions.length > 2 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">
                      {faq.questions[2].question}
                    </h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {faq.questions[2].answer}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Section Azalée Patrimoine */}
            {faq.azaleeNote && (
              <div className="text-center">
                <p className="text-[#374151] text-base leading-relaxed mb-6">
                  {faq.azaleeNote}
                </p>
                <div className="flex justify-center">
                  <a 
                    href="https://calendly.com/azalee-patrimoine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white border-2 border-[#253F60] text-[#253F60] px-6 py-3 rounded-lg font-semibold hover:bg-[#253F60] hover:text-white transition-colors duration-200"
                  >
                    SIMULATION PERSONNALISÉE
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Article - Optimisation fiscale après 50 ans */}
      {optimisation.sections && optimisation.sections.length > 0 && (
        <section className="w-full py-8 sm:py-10 lg:py-16 bg-gray-50">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                {optimisation.title || "Comment alléger votre imposition sans prendre de risque : les bonnes pratiques fiscales à connaître après 50 ans"}
              </h2>

              {optimisation.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">
                    {section.step}. {section.title}
                  </h3>
                  
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="ml-4 space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">
                            {subsection.letter}. {subsection.title}
                          </h4>
                          <p className="text-[#374151] text-sm leading-relaxed mb-3">
                            {subsection.description}
                          </p>
                          {subsection.warning && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
                              <p className="text-[#374151] text-sm">
                                <strong>Attention :</strong> {subsection.warning}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Témoignage */}
      <section className="w-full py-8 sm:py-10 lg:py-16 bg-gradient-to-r from-[#B99066] to-[#253F60]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            TÉMOIGNAGE
          </h2>

          {/* Encadré principal */}
          <div className="bg-white border-2 border-dashed border-white rounded-lg p-8 mb-8 text-center">
            <p className="text-2xl sm:text-3xl text-[#253F60] leading-tight">
              4500€ de pouvoir d'achat supplémentaire<br/>
              grâce à un accompagnement fiscal uniquement administratif
            </p>
          </div>

          {/* Témoignage client */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Témoignage client – Famille D.
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <blockquote className="text-[#374151] text-base leading-relaxed italic">
                « Avec trois enfants et des revenus autour de 200 000 € par an, nous pensions que le rattachement de nos enfants majeurs au foyer fiscal était toujours la meilleure solution. Notre conseiller Azalée Patrimoine nous a proposé de simuler les deux options. Résultat : en détachant notre fils aîné et en lui versant une pension alimentaire, notre impôt a baissé d'environ 1 000 € par an, tout en lui permettant d'accéder à une aide au logement de 300 € par mois.
                <br/><br/>
                Au total, c'est plus de 4 500 € d'économie et de soutien financier pour nos enfants chaque année. Nous n'aurions jamais imaginé qu'un simple arbitrage administratif pouvait avoir un tel impact. C'est rassurant de savoir que notre situation est optimisée et suivie par un expert ».
              </blockquote>
            </div>
          </div>

          {/* Bouton CTA */}
          <div className="text-center">
            <a 
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#253F60] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 mb-2"
            >
              Analyser ma déclaration de revenus
            </a>
            <p className="text-white text-sm font-medium">
              Satisfait ou Remboursé (250€HT)
            </p>
          </div>
        </div>
      </section>

      {/* Dispositifs fiscaux */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-10 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">Dispositifs de défiscalisation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">PER</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Plan d'Épargne Retraite pour optimiser la fiscalité</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Loi Pinel</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Investissement locatif avec réduction d'impôt</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Girardin</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Investissement outre-mer avec avantages fiscaux</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Déficit foncier</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Réduction d'impôt via travaux immobiliers</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 
