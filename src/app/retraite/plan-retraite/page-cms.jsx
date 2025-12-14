"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function PlanRetraiteCMSPage() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/pages/retraite/plan-retraite');
        const data = await res.json();
        setPageContent(data.content);
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

  if (!pageContent) {
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

  const { hero, introduction, differences, career, specificSituations, azaleeSupport, cta } = pageContent;

  return (
    <>
      <Header />
      
      {/* ✅ SECTION 0: Hero */}
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

      {/* ✅ SECTION 1: Introduction */}
      {introduction && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {introduction.paragraphs?.map((para, idx) => (
                <p 
                  key={idx} 
                  className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
              {introduction.azaleeMessage && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mt-8">
                  <p 
                    className="text-white text-base sm:text-lg font-inter leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: introduction.azaleeMessage }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ✅ SECTION 2: Comprendre les différences (with TABLE) */}
      {differences && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title={differences.title}
              subtitle={differences.subtitle}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left Column: Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* PER */}
                {differences.per && (
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 sm:p-10 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
                    <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                      {differences.per.h3}
                    </h3>
                    {differences.per.paragraphs?.map((para, idx) => (
                      <p 
                        key={idx}
                        className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                    
                    {differences.per.advantages && (
                      <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 mb-6">
                        <h4 className="text-white text-lg font-cairo font-bold mb-4">
                          {differences.per.advantages.title}
                        </h4>
                        <ul className="space-y-3 text-white">
                          {differences.per.advantages.items?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#B99066] mt-1 font-bold">•</span>
                              <span className="font-inter">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                      {differences.per.conclusion}
                    </p>

                    {differences.per.link && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-6">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">💡</span>
                          <div>
                            <Link 
                              href={differences.per.link.url} 
                              className="text-[#253F60] font-inter font-bold hover:text-[#B99066] transition-colors underline"
                            >
                              {differences.per.link.text}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PERP et Madelin */}
                {differences.perpMadelin && (
                  <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                    <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                      {differences.perpMadelin.h3}
                    </h3>
                    <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                      {differences.perpMadelin.intro}
                    </p>
                    
                    <div className="space-y-4">
                      {differences.perpMadelin.perp && (
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#253F60]/20">
                          <h4 className="text-[#253F60] font-cairo font-bold mb-3">
                            {differences.perpMadelin.perp.title}
                          </h4>
                          <p className="text-[#4B5563] text-sm font-inter leading-relaxed">
                            {differences.perpMadelin.perp.description}
                          </p>
                        </div>
                      )}
                      
                      {differences.perpMadelin.madelin && (
                        <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#B99066]/20">
                          <h4 className="text-[#253F60] font-cairo font-bold mb-3">
                            {differences.perpMadelin.madelin.title}
                          </h4>
                          <p className="text-[#4B5563] text-sm font-inter leading-relaxed">
                            {differences.perpMadelin.madelin.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {differences.perpMadelin.note && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mt-6">
                        <p className="text-[#4B5563] text-sm font-inter italic">
                          {differences.perpMadelin.note}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* PERCO */}
                {differences.perco && (
                  <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                    <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                      {differences.perco.h3}
                    </h3>
                    {differences.perco.paragraphs?.map((para, idx) => (
                      <p 
                        key={idx}
                        className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                    
                    {differences.perco.note && (
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <span className="text-green-600 font-bold text-xl">✓</span>
                          <p 
                            className="text-[#4B5563] text-sm font-inter"
                            dangerouslySetInnerHTML={{ __html: differences.perco.note }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Préfon */}
                {differences.prefon && (
                  <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                    <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                      {differences.prefon.h3}
                    </h3>
                    <p 
                      className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: differences.prefon.description }}
                    />
                    
                    {differences.prefon.advantages && (
                      <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 mb-6">
                        <h4 className="text-white text-lg font-cairo font-bold mb-4">
                          {differences.prefon.advantages.title}
                        </h4>
                        <ul className="space-y-3 text-white">
                          {differences.prefon.advantages.items?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#B99066] mt-1 font-bold">•</span>
                              <span className="font-inter">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Right Column: Comparison TABLE */}
              {differences.comparisonTable && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20 sticky top-8">
                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 text-center">
                      {differences.comparisonTable.title}
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                            {differences.comparisonTable.headers?.map((header, idx) => (
                              <th key={idx} className="px-3 py-3 text-left font-cairo font-bold text-xs">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {differences.comparisonTable.rows?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                              <td className="px-3 py-4 font-cairo font-bold text-[#253F60]">{row.dispositif}</td>
                              <td className="px-3 py-4 text-[#4B5563] text-xs font-inter">{row.public}</td>
                              <td className="px-3 py-4 text-[#4B5563] text-xs font-inter">{row.fiscalite}</td>
                              <td className="px-3 py-4 text-[#4B5563] text-xs font-inter">{row.sortie}</td>
                              <td className="px-3 py-4 text-[#4B5563] text-xs font-inter">{row.avantage}</td>
                              <td className="px-3 py-4">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  row.statusColor === 'green' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {row.statut}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ✅ SECTION 3: Reconstituer sa carrière */}
      {career && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {career.h2}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {career.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {career.steps?.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-xl p-6 text-white ${
                      idx === 1 
                        ? 'bg-gradient-to-br from-[#B99066] to-[#A67C52]' 
                        : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      idx === 1 ? 'bg-white/20' : 'bg-[#B99066]'
                    }`}>
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <h3 className="font-cairo font-bold mb-3 text-lg">{step.title}</h3>
                    <p className="font-inter text-sm text-white/90">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              {career.audit && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 text-white">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl"></span>
                    <div>
                      <h3 className="font-cairo font-bold mb-3 text-lg">{career.audit.title}</h3>
                      <p className="font-inter leading-relaxed text-white/90">
                        {career.audit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ✅ SECTION 4: Situations spécifiques */}
      {specificSituations && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {specificSituations.h2}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specificSituations.situations?.map((situation, idx) => (
                <div 
                  key={idx}
                  className={`bg-white rounded-xl shadow-lg p-8 border-2 ${
                    situation.borderColor === 'gold' 
                      ? 'border-[#B99066]/20' 
                      : 'border-[#253F60]/20'
                  }`}
                >
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
                    {situation.title}
                  </h3>
                  {situation.paragraphs?.map((para, pIdx) => (
                    <p 
                      key={pIdx}
                      className="text-[#4B5563] text-sm font-inter leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ✅ SECTION 5: L'accompagnement Azalée Patrimoine */}
      {azaleeSupport && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {azaleeSupport.h2}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                {azaleeSupport.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {azaleeSupport.profiles?.map((profile, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-xl p-6 text-white ${
                      profile.gradient === 'gold'
                        ? 'bg-gradient-to-r from-[#B99066] to-[#A67C52]'
                        : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47]'
                    }`}
                  >
                    <h3 className="font-cairo font-bold mb-4 text-lg">{profile.title}</h3>
                    <p className="font-inter text-sm text-white/90">
                      {profile.description}
                    </p>
                  </div>
                ))}
              </div>

              {azaleeSupport.mission && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-8 text-white text-center">
                  <p className="text-xl sm:text-2xl font-cairo font-bold mb-4">
                    {azaleeSupport.mission.title}
                  </p>
                  <p className="text-lg font-inter text-white/90 italic">
                    {azaleeSupport.mission.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ✅ SECTION 6: CTA Final */}
      {cta && (
        <section className="w-full bg-gradient-to-r from-[#253F60] via-[#1e3a5a] to-[#253F60] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4 sm:mb-6">
                {cta.h2}
              </h2>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                {cta.description}
              </p>
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
              <div className="border-t border-gray-200 pt-6 mt-6">
                <a
                  href={`mailto:${cta.email}`}
                  className="text-[#253F60] hover:text-[#B99066] font-inter font-semibold text-base sm:text-lg transition-colors"
                >
                  📧 {cta.email}
                </a>
              </div>
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
