"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function PrevoyanceProtectionCMSPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/cms/content?path=retraite/prevoyance-protection', {
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

  const { hero, introduction, whyPrevoyance, caseConcret, focusAzalee, missionObjectives, solutions, integration, protectionTypes, accompagnement, cta } = content;

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

      {/* Introduction */}
      {introduction && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {introduction.paragraphs?.map((para, idx) => (
                <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Prevoyance */}
      {whyPrevoyance && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{whyPrevoyance.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{whyPrevoyance.intro}</p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">Elle permet de :</p>

              {whyPrevoyance.objectives && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {whyPrevoyance.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                      <span className="text-[#4B5563] text-base font-inter">{obj}</span>
                    </div>
                  ))}
                </div>
              )}

              {whyPrevoyance.note && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                  <p className="text-[#4B5563] text-sm font-inter">{whyPrevoyance.note}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Cas Concret */}
      {caseConcret && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{caseConcret.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              {caseConcret.profile && (
                <div className="mb-8">
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: `<strong class="text-[#253F60]">${caseConcret.profile.name}</strong>, ${caseConcret.profile.description}` }} />
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: caseConcret.profile.revenue }} />
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: caseConcret.profile.incident }} />
                </div>
              )}

              {caseConcret.consequences && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl mb-8">
                  <h3 className="text-[#253F60] font-cairo font-bold mb-4 text-lg">{caseConcret.consequences.title}</h3>
                  <ul className="space-y-3">
                    {caseConcret.consequences.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#253F60] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseConcret.consequences?.note && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-4 rounded mb-8">
                  <p className="text-[#4B5563] text-sm font-inter" dangerouslySetInnerHTML={{ __html: caseConcret.consequences.note }} />
                </div>
              )}

              {caseConcret.withPrevoyance && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl">
                  <h3 className="text-[#253F60] font-cairo font-bold mb-4 text-lg">{caseConcret.withPrevoyance.title}</h3>
                  <ul className="space-y-3">
                    {caseConcret.withPrevoyance.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#4B5563] text-base font-inter">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {caseConcret.withPrevoyance?.conclusion && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mt-8">
                  <p className="text-[#4B5563] text-sm font-inter">{caseConcret.withPrevoyance.conclusion}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Focus Azalee */}
      {focusAzalee && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{focusAzalee.h2}</h3>

              <div className="space-y-6">
                {focusAzalee.stats?.map((stat, idx) => (
                  <div key={idx} className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                    <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: stat }} />
                  </div>
                ))}

                {focusAzalee.reality && (
                  <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                    <p className="text-white text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: focusAzalee.reality }} />
                  </div>
                )}

                {focusAzalee.help && (
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">{focusAzalee.help}</p>
                )}

                {focusAzalee.objectives && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {focusAzalee.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{obj}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission Objectives */}
      {missionObjectives && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-6">{missionObjectives.title}</h3>
                  <ul className="space-y-4">
                    {missionObjectives.items?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-white flex items-center">
                  <div>
                    <p className="text-lg font-cairo font-bold italic">{missionObjectives.mission}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solutions */}
      {solutions && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{solutions.h2}</h2>

            <div className="space-y-12">
              {/* Chef Entreprise */}
              {solutions.chefEntreprise && (
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{solutions.chefEntreprise.h3}</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                    <div className="lg:col-span-2">
                      <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{solutions.chefEntreprise.intro}</p>
                      <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">Les solutions personnalisées permettent de :</p>
                      <ul className="space-y-3">
                        {solutions.chefEntreprise.objectives?.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#B99066] mt-1 font-bold">•</span>
                            <span className="text-[#4B5563] text-base font-inter">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-center">
                        <h4 className="text-white font-cairo font-bold mb-6 text-sm uppercase">Nos partenaires prévoyance</h4>
                        <div className="space-y-4">
                          {solutions.chefEntreprise.partners?.map((partner, idx) => (
                            <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                              <p className="text-white font-inter font-bold text-sm">{partner}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {solutions.chefEntreprise.note && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                      <p className="text-[#4B5563] text-sm font-inter">{solutions.chefEntreprise.note}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Salarie */}
              {solutions.salarie && (
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{solutions.salarie.h3}</h3>

                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{solutions.salarie.intro}</p>

                  {solutions.salarie.levels && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {solutions.salarie.levels.map((level, idx) => (
                        <div key={idx} className={`rounded-xl p-6 text-white ${
                          idx === 1 ? 'bg-gradient-to-br from-[#B99066] to-[#A67C52]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                        }`}>
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                            idx === 1 ? 'bg-white/20' : 'bg-[#B99066]'
                          }`}>
                            <span className="text-white font-bold text-xl">{level.number}</span>
                          </div>
                          <h4 className="font-cairo font-bold mb-3 text-lg">{level.title}</h4>
                          <p className="font-inter text-sm text-white/90">{level.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{solutions.salarie.audit}</p>

                  {solutions.salarie.gaps && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl mb-6">
                      <ul className="space-y-3">
                        {solutions.salarie.gaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#253F60] mt-1 font-bold">•</span>
                            <span className="text-[#4B5563] text-base font-inter">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solutions.salarie.objective && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                      <p className="text-[#4B5563] text-sm font-inter" dangerouslySetInnerHTML={{ __html: solutions.salarie.objective }} />
                    </div>
                  )}
                </div>
              )}

              {/* Conjoint */}
              {solutions.conjoint && (
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{solutions.conjoint.h3}</h3>

                  {solutions.conjoint.intro?.map((para, idx) => (
                    <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: para }} />
                  ))}

                  {solutions.conjoint.solutions && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {solutions.conjoint.solutions.map((sol, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                          <span className="text-[#4B5563] text-base font-inter" dangerouslySetInnerHTML={{ __html: sol }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {solutions.conjoint.note && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                      <p className="text-[#4B5563] text-sm font-inter">{solutions.conjoint.note}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Emprunteur */}
              {solutions.emprunteur && (
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{solutions.emprunteur.h3}</h3>

                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{solutions.emprunteur.intro}</p>
                  <ul className="space-y-3 mb-6">
                    {solutions.emprunteur.protections?.map((prot, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{prot}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: solutions.emprunteur.loiLemoine }} />

                  <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                    <p className="text-[#4B5563] text-sm font-inter" dangerouslySetInnerHTML={{ __html: solutions.emprunteur.help }} />
                  </div>
                </div>
              )}

              {/* Dependance */}
              {solutions.dependance && (
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{solutions.dependance.h3}</h3>

                  {solutions.dependance.intro?.map((para, idx) => (
                    <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{para}</p>
                  ))}

                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">Options possibles :</p>
                  <ul className="space-y-3 mb-6">
                    {solutions.dependance.options?.map((opt, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span className="text-[#4B5563] text-base font-inter">{opt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                    <p className="text-[#4B5563] text-sm font-inter">{solutions.dependance.note}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Integration */}
      {integration && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{integration.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8 text-center">{integration.intro}</p>

              {integration.pillars && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {integration.pillars.map((pillar, idx) => (
                    <div key={idx} className={`rounded-xl p-8 text-white text-center ${
                      idx === 1 ? 'bg-gradient-to-br from-[#B99066] to-[#A67C52]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                    }`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                        idx === 1 ? 'bg-white/20' : 'bg-[#B99066]'
                      }`}>
                        <span className="text-white font-bold text-2xl">{pillar.number}</span>
                      </div>
                      <h3 className="font-cairo font-bold mb-4 text-xl">{pillar.title}</h3>
                      <p className="font-inter text-white/90">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Protection Types */}
      {protectionTypes && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{protectionTypes.h2}</h2>

            {protectionTypes.types && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {protectionTypes.types.map((type, idx) => (
                  <div key={idx} className={`bg-white rounded-xl shadow-lg p-8 border-2 ${
                    type.borderColor === 'gold' ? 'border-[#B99066]/20' : 'border-[#253F60]/20'
                  }`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                      type.borderColor === 'gold' ? 'bg-[#B99066]' : 'bg-[#253F60]'
                    }`}>
                      <span className="text-white text-2xl font-bold">{type.number}</span>
                    </div>
                    <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4 text-center">{type.title}</h3>
                    <p className="text-[#4B5563] text-base font-inter leading-relaxed text-center">{type.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Accompagnement */}
      {accompagnement && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-8 sm:p-10 text-white mb-8">
              <p className="text-xl sm:text-2xl font-cairo font-bold text-center mb-8">{accompagnement.statement}</p>
            </div>

            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{accompagnement.h2}</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">Notre cabinet vous accompagne dans :</p>

              {accompagnement.services && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {accompagnement.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                      <span className="text-[#4B5563] text-base font-inter" dangerouslySetInnerHTML={{ __html: service }} />
                    </div>
                  ))}
                </div>
              )}

              {accompagnement.mission && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-center">
                  <p className="text-lg font-cairo font-bold italic text-white">{accompagnement.mission}</p>
                </div>
              )}
            </div>
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
              {cta.ctaButton && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <a href={cta.ctaButton.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto">
                    {cta.ctaButton.text}
                  </a>
                </div>
              )}
              {cta.email && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <a href={`mailto:${cta.email}`} className="text-[#253F60] hover:text-[#B99066] font-inter font-semibold text-base sm:text-lg transition-colors">
                    {cta.email}
                  </a>
                </div>
              )}
              {cta.backLink && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Link href={cta.backLink.url} className="text-[#B99066] hover:text-[#A67A5A] font-inter font-semibold text-base transition-colors">
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

