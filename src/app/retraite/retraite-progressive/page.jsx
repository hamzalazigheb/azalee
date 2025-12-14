"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function RetraiteProgressiveCMSPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/cms/content?path=retraite/retraite-progressive', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setContent(data.data);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Chargement...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!content) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Contenu non disponible</div>
        </div>
        <Footer />
      </>
    );
  }

  const { hero, introduction, definition, advantages, calcul, fonctionnaires, indemnites, planification, erreurs, conclusion, cta } = content;

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      {hero && (
        <section className="relative w-full min-h-[400px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              {/* Breadcrumb */}
              {hero.breadcrumb && (
                <nav className="flex items-center text-white/80 text-sm mb-6">
                  {hero.breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.href ? (
                        <Link href={item.href} className="hover:text-white transition-colors">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-[#B99066]">{item.label}</span>
                      )}
                      {index < hero.breadcrumb.length - 1 && <span className="mx-2">{'>'}</span>}
                    </React.Fragment>
                  ))}
                </nav>
              )}
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
                {hero.h1}
              </h1>
              <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      {introduction && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {introduction.intro}
              </p>
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
                <p 
                  className="text-white text-base sm:text-lg font-inter leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: introduction.azaleeMessage }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Definition */}
      {definition && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={definition.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {definition.intro?.map((para, idx) => (
                <p 
                  key={idx}
                  className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

              {definition.conditions && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
                  <h3 className="text-[#253F60] font-cairo font-bold mb-4 text-lg">
                    {definition.conditions.title}
                  </h3>
                  <ul className="space-y-3">
                    {definition.conditions.items?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {definition.note && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#4B5563] text-sm font-inter">
                      {definition.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Advantages */}
      {advantages && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={advantages.title} />

            <div className="space-y-8">
              {advantages.list?.map((advantage, idx) => (
                <div 
                  key={idx}
                  className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 sm:p-10 border-l-4 ${
                    advantage.borderColor === 'gold' ? 'border-[#B99066]' : 'border-[#253F60]'
                  } transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${
                    advantage.borderColor === 'gold' ? 'bg-[#B99066]/5' : 'bg-[#253F60]/5'
                  } rounded-bl-full`}></div>
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 relative z-10">
                    {advantage.h3}
                  </h3>
                  
                  {advantage.paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4 relative z-10">
                      {para}
                    </p>
                  ))}

                  {advantage.intro && (
                    <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6 relative z-10">
                      {advantage.intro}
                    </p>
                  )}

                  {advantage.items && (
                    <ul className="space-y-3 mb-6 relative z-10">
                      {advantage.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span 
                            className="text-[#4B5563] text-base font-inter"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {advantage.note && (
                    <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-4 rounded relative z-10">
                      <p 
                        className="text-[#253F60] text-sm font-inter font-semibold"
                        dangerouslySetInnerHTML={{ __html: advantage.note }}
                      />
                    </div>
                  )}

                  {advantage.azaleeNote && (
                    <div className="bg-gradient-to-br from-[#B99066]/10 to-[#253F60]/10 border-l-4 border-[#B99066] p-4 rounded relative z-10">
                      <p className="text-[#253F60] text-sm font-inter font-semibold">
                        {advantage.azaleeNote}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calcul */}
      {calcul && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={calcul.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {calcul.intro}
              </p>

              {calcul.examples && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {calcul.examples.map((example, idx) => (
                    <div 
                      key={idx}
                      className={`relative rounded-2xl shadow-xl hover:shadow-2xl p-6 text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                        example.gradient === 'gold' 
                          ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                          : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 ${
                        example.gradient === 'gold' ? 'bg-[#253F60]/10' : 'bg-[#B99066]/10'
                      } rounded-bl-full`}></div>
                      <h4 className="font-cairo font-bold mb-4 text-lg relative z-10">Exemple {idx + 1}</h4>
                      <p className="font-inter text-sm mb-2 relative z-10">Si vous travaillez à <strong>{example.work}</strong></p>
                      <p className="font-inter text-2xl font-bold text-[#B99066] relative z-10">{example.pension}</p>
                    </div>
                  ))}
                </div>
              )}

              {calcul.calculation && (
                <>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                    {calcul.calculation}
                  </p>
                  {calcul.factors && (
                    <ul className="space-y-3 mb-6">
                      {calcul.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span className="text-[#4B5563] text-base font-inter">
                            {factor}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {calcul.note && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                  <p className="text-[#4B5563] text-sm font-inter">
                    {calcul.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fonctionnaires */}
      {fonctionnaires && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={fonctionnaires.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {fonctionnaires.intro}
              </p>
              {fonctionnaires.modalites && (
                <ul className="space-y-3 mb-6">
                  {fonctionnaires.modalites.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold">•</span>
                      <span className="text-[#4B5563] text-base font-inter">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {fonctionnaires.liberales && (
                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                  {fonctionnaires.liberales}
                </p>
              )}
              {fonctionnaires.note && (
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-600">🌿</span>
                    <p className="text-[#4B5563] text-sm font-inter">
                      {fonctionnaires.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Indemnites */}
      {indemnites && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={indemnites.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {indemnites.intro?.map((para, idx) => (
                <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                  {para}
                </p>
              ))}
              {indemnites.avantage && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mb-6">
                  <p className="text-[#4B5563] text-sm font-inter">
                    {indemnites.avantage}
                  </p>
                </div>
              )}
              {indemnites.azaleeAnalyse && (
                <>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                    {indemnites.azaleeAnalyse}
                  </p>
                  {indemnites.impacts && (
                    <ul className="space-y-3">
                      {indemnites.impacts.map((impact, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span 
                            className="text-[#4B5563] text-base font-inter"
                            dangerouslySetInnerHTML={{ __html: impact }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Planification */}
      {planification && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={planification.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {planification.intro}
              </p>
              {planification.opportunities && (
                <ul className="space-y-4 mb-6">
                  {planification.opportunities.map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold">•</span>
                      <span 
                        className="text-[#4B5563] text-base font-inter"
                        dangerouslySetInnerHTML={{ __html: opp }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {planification.objectif && (
                <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl shadow-xl hover:shadow-2xl p-6 text-white text-center transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#253F60]/10 rounded-tr-full"></div>
                  <p 
                    className="text-lg font-cairo font-bold italic relative z-10"
                    dangerouslySetInnerHTML={{ __html: planification.objectif }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Erreurs */}
      {erreurs && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={erreurs.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <ul className="space-y-6">
                {erreurs.errors?.map((error, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-[#253F60] mt-1 font-bold">•</span>
                    <p 
                      className="text-[#4B5563] text-base font-inter leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: error }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Conclusion */}
      {conclusion && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title={conclusion.title} />

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {conclusion.paragraphs?.map((para, idx) => (
                <p 
                  key={idx}
                  className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta && (
        <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold">
                  {cta.title}
                </h2>
              </div>
              {cta.bullets && (
                <ul className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                  {cta.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {idx === 0 ? (
                        <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ) : (
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                      )}
                      <p 
                        className="text-[#4B5563] text-base font-inter"
                        dangerouslySetInnerHTML={{ __html: bullet }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {cta.ctaButton && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <a
                    href={cta.ctaButton.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
                  >
                    {cta.ctaButton.text}
                  </a>
                </div>
              )}
              {cta.email && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <a
                    href={`mailto:${cta.email}`}
                    className="text-[#253F60] hover:text-[#B99066] font-inter font-semibold text-base sm:text-lg transition-colors"
                  >
                    {cta.email}
                  </a>
                </div>
              )}
              {cta.backLink && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Link
                    href={cta.backLink.url}
                    className="text-[#B99066] hover:text-[#D4A574] font-inter font-semibold text-base transition-colors"
                  >
                    {cta.backLink.text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

