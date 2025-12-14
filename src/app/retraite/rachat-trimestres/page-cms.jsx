"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function RachatTrimestresCMSPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/cms/content?path=retraite/rachat-trimestres', {
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

  const { hero, definition, whyRachat, bareme2025, rentabilite, demarches, quandEnvisager, pointsCles, resume, perConjugal, cta } = content;

  return (
    <>
      <Header />
      
      {/* Hero */}
      {hero && (
        <section className="relative w-full min-h-[400px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              {hero.breadcrumb && (
                <nav className="flex items-center text-white/80 text-sm mb-6">
                  {hero.breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.href ? (
                        <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                      ) : (
                        <span className="text-[#B99066]">{item.label}</span>
                      )}
                      {index < hero.breadcrumb.length - 1 && <span className="mx-2">{'>'}</span>}
                    </React.Fragment>
                  ))}
                </nav>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">{hero.h1}</h1>
              <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl">{hero.subtitle}</p>
            </div>
          </div>
        </section>
      )}

      {/* Definition */}
      {definition && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-12">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: definition.intro }} />
              
              {definition.objectives && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mb-6">
                  <h2 className="text-xl sm:text-2xl font-cairo font-bold mb-4">{definition.objectives.title}</h2>
                  <ul className="space-y-3 text-base font-inter">
                    {definition.objectives.items?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {definition.target && (
                <div className="bg-[#F9FAFB] rounded-xl p-6 sm:p-8 border-l-4 border-[#B99066]">
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">{definition.target}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Rachat */}
      {whyRachat && (
        <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{whyRachat.h2}</h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{whyRachat.subtitle}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">Plusieurs situations peuvent justifier un rachat de trimestres :</p>
              
              {whyRachat.situations && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {whyRachat.situations.map((situation, idx) => (
                    <div key={idx} className={`rounded-xl p-6 text-white ${
                      situation.gradient === 'gold' 
                        ? 'bg-gradient-to-br from-[#B99066] to-[#A67C52]'
                        : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          situation.gradient === 'gold' ? 'bg-white/20' : 'bg-[#B99066]/20'
                        }`}>
                          <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-cairo font-bold mb-2">{situation.title}</h3>
                          <p className="text-sm font-inter text-white/90">{situation.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {whyRachat.important && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-[#253F60] font-cairo font-bold mb-2">Important : Simulation obligatoire</h3>
                      <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: whyRachat.important }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Bareme 2025 - Simplified due to complexity */}
      {bareme2025 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{bareme2025.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: bareme2025.intro }} />

              {bareme2025.factors && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {bareme2025.factors.map((factor, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center">
                      <div className="w-16 h-16 bg-[#B99066]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-cairo font-bold mb-2">{factor.title}</h3>
                      <p className="text-sm font-inter text-white/90">{factor.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {bareme2025.options && (
                <div className="space-y-6">
                  {bareme2025.options.map((option, idx) => (
                    <div key={idx} className={`rounded-xl p-6 sm:p-8 ${
                      option.color === 'gold' 
                        ? 'bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white'
                        : 'bg-[#F9FAFB] border-2 border-[#253F60]/20'
                    }`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-cairo font-bold ${
                          option.color === 'gold' ? 'bg-white/20 text-white' : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                        }`}>
                          {option.number}
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-cairo font-bold ${option.color === 'gold' ? 'text-white' : 'text-[#253F60]'}`}>
                          {option.title}
                        </h3>
                      </div>
                      <p className={`font-inter leading-relaxed ${option.color === 'gold' ? 'text-base text-white/90' : 'text-[#4B5563] text-base'}`} dangerouslySetInnerHTML={{ __html: option.description }} />
                      {option.note && (
                        <p className="text-sm font-inter text-white/80 mt-3 italic">{option.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {bareme2025.pass && (
                <div className="mt-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4 text-[#B99066]">{bareme2025.pass.title}</h3>
                  <p className="text-2xl sm:text-3xl font-cairo font-bold mb-6">{bareme2025.pass.amount}</p>
                  <p className="text-base font-inter text-white/90 mb-6">Trois tranches de revenus sont retenues :</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {bareme2025.pass.tranches?.map((tranche, idx) => (
                      <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-sm font-inter text-white/80 mb-2">{tranche.label}</p>
                        <p className="font-cairo font-bold text-lg">{tranche.range}</p>
                        <p className="text-xs font-inter text-white/70 mt-1">{tranche.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bareme2025.examples && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">Exemple chiffré pour un rachat d'un trimestre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bareme2025.examples.map((example, idx) => (
                      <div key={idx} className={`bg-[#F9FAFB] rounded-xl p-6 border-2 ${idx === 0 ? 'border-[#253F60]/20' : 'border-[#B99066]/20'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-cairo font-bold ${idx === 0 ? 'bg-[#253F60]' : 'bg-[#B99066]'}`}>
                            {idx + 1}
                          </div>
                          <h4 className="text-[#253F60] font-cairo font-bold">{example.option}</h4>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-3">{example.age}</p>
                        <p className="text-2xl font-cairo font-bold text-[#B99066] mb-2">{example.cost}</p>
                        <p className="text-xs text-[#6B7280]">{example.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                    <p className="text-sm text-[#4B5563] font-inter italic">{bareme2025.reminder}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Rentabilite */}
      {rentabilite && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{rentabilite.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
                <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: rentabilite.fiscalite }} />
              </div>

              {rentabilite.conditions && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
                  <h3 className="text-[#253F60] font-cairo font-bold mb-4">Toutefois :</h3>
                  <ul className="space-y-4 text-[#4B5563] text-base font-inter">
                    {rentabilite.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#253F60] mt-1 font-bold">•</span>
                        <span dangerouslySetInnerHTML={{ __html: condition }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Demarches */}
      {demarches && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{demarches.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {demarches.conditions && (
                <div className="space-y-6">
                  {demarches.conditions.map((condition, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                      <div>
                        <h3 className="text-[#253F60] font-cairo font-bold mb-2">{condition.title}</h3>
                        <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: condition.description }} />
                      </div>
                    </div>
                  ))}

                  {demarches.irreversible && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-[#253F60] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h3 className="text-[#253F60] font-cairo font-bold mb-2">Opération irréversible</h3>
                          <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: demarches.irreversible }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Quand Envisager */}
      {quandEnvisager && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{quandEnvisager.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {quandEnvisager.rules && (
                <div className="space-y-6">
                  {quandEnvisager.rules.map((rule, idx) => (
                    <div key={idx} className={`rounded-xl p-6 ${
                      rule.gradient === 'gold' ? 'bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white' : 
                      rule.gradient === 'gray' ? 'bg-[#F9FAFB] border-2 border-[#E5E7EB]' :
                      'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          rule.gradient === 'gray' ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-[#B99066]/20'
                        }`}>
                          <span className="text-white font-cairo font-bold text-xl">{rule.number}</span>
                        </div>
                        <div>
                          <h3 className={`font-cairo font-bold mb-3 text-lg ${rule.gradient === 'gray' ? 'text-[#253F60]' : ''}`}>
                            {rule.title}
                          </h3>
                          <p className={`font-inter leading-relaxed ${rule.gradient === 'gray' ? 'text-[#4B5563]' : 'text-white/90'}`}>
                            {rule.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Points Cles */}
      {pointsCles && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{pointsCles.h2}</h2>

            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]">
              {pointsCles.points && (
                <div className="space-y-6">
                  {pointsCles.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                      <p className="text-white text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Resume */}
      {resume && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{resume.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{resume.intro}</p>

              {resume.requirements && (
                <ul className="space-y-4 mb-8">
                  {resume.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                      <span className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: req }} />
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{resume.conclusion}</p>

              <div className="mt-8 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-center">
                <p className="text-white text-base sm:text-lg font-inter mb-4" dangerouslySetInnerHTML={{ __html: resume.ctaText }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PER Conjugal - Large section */}
      {perConjugal && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{perConjugal.h2}</h2>

            {/* Why Desequilibre */}
            {perConjugal.whyDesequilibre && (
              <div className="mb-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{perConjugal.whyDesequilibre.h3}</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  {perConjugal.whyDesequilibre.intro?.map((para, idx) => (
                    <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{para}</p>
                  ))}
                  <p className="text-[#253F60] font-cairo font-bold mb-4 text-lg">Résultat :</p>
                  <ul className="space-y-3 mb-6">
                    {perConjugal.whyDesequilibre.consequences?.map((consequence, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{consequence}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">{perConjugal.whyDesequilibre.reversion}</p>
                  <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mt-6">
                    <p className="text-[#4B5563] text-base font-inter">{perConjugal.whyDesequilibre.conclusion}</p>
                  </div>
                </div>
              </div>
            )}

            {/* PER Conjugal Solution */}
            {perConjugal.perConjugalSolution && (
              <div className="mb-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{perConjugal.perConjugalSolution.h3}</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-6">
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{perConjugal.perConjugalSolution.intro}</p>
                  <p className="text-[#253F60] font-cairo font-bold mb-6 text-lg">Cette solution présente plusieurs atouts majeurs :</p>
                </div>

                {perConjugal.perConjugalSolution.advantages?.map((advantage, idx) => (
                  <div key={idx} className={`shadow-lg p-8 sm:p-10 mb-6 rounded-xl ${
                    advantage.gradient === 'gold' 
                      ? 'bg-gradient-to-r from-[#B99066] to-[#A67C52]'
                      : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47]'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        advantage.gradient === 'gold' ? 'bg-white/20' : 'bg-[#B99066]'
                      }`}>
                        <span className="text-white font-bold text-xl">{advantage.number}</span>
                      </div>
                      <h4 className="text-white text-xl sm:text-2xl font-cairo font-bold">{advantage.title}</h4>
                    </div>
                    <div className="ml-16">
                      {advantage.description?.map((desc, dIdx) => (
                        <p key={dIdx} className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mb-4">{desc}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Exemple Concret */}
            {perConjugal.exempleConcret && (
              <div className="mb-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{perConjugal.exempleConcret.h3}</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {perConjugal.exempleConcret.profiles?.map((profile, idx) => (
                      <div key={idx} className={`bg-[#F9FAFB] rounded-xl p-6 border-2 ${
                        profile.borderColor === 'gold' ? 'border-[#B99066]/20' : 'border-[#253F60]/20'
                      }`}>
                        <h4 className="text-[#253F60] font-cairo font-bold mb-3">{profile.name}</h4>
                        <p className="text-[#4B5563] text-sm font-inter">{profile.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 mb-6">
                    <p className="text-white font-cairo font-bold mb-4 text-lg">{perConjugal.exempleConcret.decision}</p>
                    <div className="space-y-3 text-white">
                      {perConjugal.exempleConcret.results?.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="font-bold">•</span>
                          <span className="font-inter" dangerouslySetInnerHTML={{ __html: result }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-4 rounded">
                    <p className="text-[#4B5563] text-base font-inter">{perConjugal.exempleConcret.conclusion}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Strategie */}
            {perConjugal.strategie && (
              <div className="mb-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{perConjugal.strategie.h3}</h3>
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{perConjugal.strategie.intro}</p>
                  <ul className="space-y-4 mb-6">
                    {perConjugal.strategie.objectives?.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{obj}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">{perConjugal.strategie.conclusion}</p>
                </div>
              </div>
            )}

            {/* Azalee Approach */}
            {perConjugal.azaleeApproach && (
              <div className="mb-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{perConjugal.azaleeApproach.h3}</h3>
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 text-white">
                  <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mb-6">{perConjugal.azaleeApproach.intro}</p>
                  <ul className="space-y-3 mb-6">
                    {perConjugal.azaleeApproach.factors?.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-white/90 text-base font-inter">{factor}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#B99066]/20 rounded-xl p-6 mt-6 border border-[#B99066]/30">
                    <p className="text-white font-cairo font-bold text-lg italic text-center">{perConjugal.azaleeApproach.mission}</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Prendre Rdv */}
            {perConjugal.ctaPrendreRdv && (
              <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl shadow-2xl p-8 sm:p-10 text-center">
                <h3 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">{perConjugal.ctaPrendreRdv.h3}</h3>
                <p className="text-white/90 text-base sm:text-lg font-inter mb-6">{perConjugal.ctaPrendreRdv.description}</p>
                <p className="text-white text-lg sm:text-xl font-inter font-bold mb-6">{perConjugal.ctaPrendreRdv.ctaText}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {perConjugal.ctaPrendreRdv.ctaButtons?.map((button, idx) => (
                    <a key={idx} href={button.url} target="_blank" rel="noopener noreferrer" className={`px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto ${
                      button.color === 'white' 
                        ? 'bg-white text-[#253F60] hover:bg-[#F9FAFB]'
                        : 'bg-[#253F60] text-white hover:bg-[#1a2d47]'
                    }`}>
                      {button.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      {cta && (
        <section className="w-full bg-gradient-to-r from-[#253F60] via-[#1e3a5a] to-[#253F60] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4 sm:mb-6">{cta.h2}</h2>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">{cta.description}</p>
              {cta.ctaButtons && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {cta.ctaButtons.map((button, idx) => (
                    button.gradient === 'gold' ? (
                      <Link key={idx} href={button.url} className="bg-gradient-to-r from-[#B99066] to-[#A67C52] hover:from-[#A67C52] hover:to-[#B99066] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto">
                        {button.text}
                      </Link>
                    ) : (
                      <a key={idx} href={button.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto">
                        {button.text}
                      </a>
                    )
                  ))}
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

