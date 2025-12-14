"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function SimulationCMSPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/cms/content?path=retraite/simulation', {
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

  const { hero, introduction, whySimulator, simulateurs, tauxRemplacement, infographie, leviers, fiscalite, approche, cta } = content;

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
                <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">{para}</p>
              ))}
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mt-8">
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: introduction.azaleeMessage }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Simulator */}
      {whySimulator && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{whySimulator.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{whySimulator.intro}</p>

              {whySimulator.points && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {whySimulator.points.map((point, idx) => (
                    <div key={idx} className={`rounded-xl p-6 text-white ${
                      point.gradient === 'gold' 
                        ? 'bg-gradient-to-br from-[#B99066] to-[#A67C52]'
                        : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          point.gradient === 'gold' ? 'bg-white/20' : 'bg-[#B99066]'
                        }`}>
                          <span className="text-white font-bold text-xl">{point.number}</span>
                        </div>
                        <div>
                          <h3 className="font-cairo font-bold mb-3 text-lg">{point.title}</h3>
                          <p className="font-inter leading-relaxed text-white/90 text-sm">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {whySimulator.warning && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl">
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: whySimulator.warning.highlight }} />
                  <p className="text-[#4B5563] text-sm font-inter leading-relaxed">{whySimulator.warning.detail}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Simulateurs */}
      {simulateurs && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{simulateurs.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{simulateurs.intro}</p>

              {simulateurs.list && (
                <div className="space-y-4 mb-8">
                  {simulateurs.list.map((sim, idx) => (
                    <div key={idx} className={`rounded-xl p-6 text-white ${
                      sim.gradient === 'gold' 
                        ? 'bg-gradient-to-r from-[#B99066] to-[#A67C52]'
                        : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47]'
                    }`}>
                      <h3 className="font-cairo font-bold mb-2 text-lg">{sim.title}</h3>
                      <p className="font-inter text-sm text-white/90 mb-2"><strong>Spécificité :</strong> {sim.specificite}</p>
                      <a href={sim.url} target="_blank" rel="noopener noreferrer" className={`font-inter text-sm underline ${
                        sim.gradient === 'gold' ? 'text-white hover:text-[#253F60]' : 'text-[#B99066] hover:text-[#D4A574]'
                      }`}>
                        {sim.url.replace('https://', '')}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {simulateurs.note && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                  <p className="text-[#4B5563] text-sm font-inter" dangerouslySetInnerHTML={{ __html: simulateurs.note }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Taux Remplacement */}
      {tauxRemplacement && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{tauxRemplacement.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{tauxRemplacement.intro}</p>

              {tauxRemplacement.table && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                        {tauxRemplacement.table.headers.map((header, idx) => (
                          <th key={idx} className="px-4 py-3 text-left font-cairo font-bold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tauxRemplacement.table.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-4 py-4 font-cairo font-bold text-[#253F60]">{row.statut}</td>
                          <td className="px-4 py-4 text-[#4B5563] font-inter">{row.taux}</td>
                          <td className="px-4 py-4 text-[#4B5563] text-xs font-inter">{row.commentaire}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tauxRemplacement.conclusion && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mt-8">
                  <p className="text-[#4B5563] text-sm font-inter" dangerouslySetInnerHTML={{ __html: tauxRemplacement.conclusion }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Infographie  - Simplified rendering for large table */}
      {infographie && infographie.table && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">{infographie.h2}</h2>
              <p className="text-[#4B5563] text-lg sm:text-xl font-inter max-w-3xl mx-auto">{infographie.subtitle}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                      {infographie.table.headers.map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left font-cairo font-bold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {infographie.table.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-4 py-4"><span className="font-cairo font-bold text-[#253F60]">{row.profil}</span></td>
                        <td className="px-4 py-4 text-[#4B5563] font-inter font-semibold">{row.revenu}</td>
                        <td className="px-4 py-4 text-[#4B5563] font-inter font-semibold">{row.pension}</td>
                        <td className="px-4 py-4">
                          <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                            row.tauxColor === 'gold' ? 'bg-[#B99066] text-white' : 'bg-[#253F60] text-white'
                          }`}>{row.taux}</span>
                        </td>
                        <td className="px-4 py-4 text-[#4B5563] text-xs font-inter">{row.commentaire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {infographie.lecture && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 mt-8 text-white">
                  <h3 className="font-cairo font-bold mb-4 text-lg">Lecture Azalée Patrimoine</h3>
                  <p className="font-inter leading-relaxed text-white/90 text-sm">{infographie.lecture}</p>
                </div>
              )}

              {infographie.conseil && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 mt-6 text-white text-center">
                  <h3 className="font-cairo font-bold mb-4 text-lg">{infographie.conseil.title}</h3>
                  <p className="font-inter leading-relaxed mb-4 text-white/90">{infographie.conseil.description}</p>
                  <a href={infographie.conseil.ctaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#253F60] px-6 py-3 rounded-lg font-inter font-bold hover:bg-[#F9FAFB] transition-colors">
                    Prendre rendez-vous avec un conseiller Azalée Patrimoine
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Leviers - Simplified for token efficiency */}
      {leviers && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{leviers.h2}</h2>

            <div className="space-y-8">
              {leviers.list?.map((levier, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">{levier.h3}</h3>
                  {levier.paragraphs?.map((para, pIdx) => (
                    <p key={pIdx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                  {levier.intro && <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">{levier.intro}</p>}
                  {levier.items && (
                    <ul className="space-y-3 mb-6">
                      {levier.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span className="text-[#4B5563] text-base font-inter">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {levier.strategie && (
                    <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                      <p className="text-[#4B5563] text-sm font-inter">{levier.strategie}</p>
                    </div>
                  )}
                  {levier.link && (
                    <Link href={levier.link.url} className="text-[#B99066] hover:text-[#D4A574] font-inter font-bold underline transition-colors">
                      {levier.link.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fiscalite */}
      {fiscalite && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{fiscalite.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-6">{fiscalite.h3}</h3>
              {fiscalite.paragraphs?.map((para, idx) => (
                <p key={idx} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: para }} />
              ))}
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: fiscalite.azaleeMessage }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Approche */}
      {approche && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{approche.h2}</h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{approche.intro}</p>

              {approche.services && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {approche.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                      <span className="text-[#4B5563] text-base font-inter" dangerouslySetInnerHTML={{ __html: service }} />
                    </div>
                  ))}
                </div>
              )}

              {approche.mission && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-8 text-white text-center">
                  <p className="text-xl sm:text-2xl font-cairo font-bold italic">{approche.mission}</p>
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
              <p className="text-[#4B5563] text-base sm:text-lg font-inter mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: cta.description }} />
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
                  <Link href={cta.backLink.url} className="text-[#B99066] hover:text-[#D4A574] font-inter font-semibold text-base transition-colors">
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

