import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('retraite/simulation');
  if (!content) return { title: "Simulateur Retraite | Azalée Patrimoine" };
  return {
    title: content.seo?.metaTitle || "Simulateur Retraite | Azalée Patrimoine",
    description: content.seo?.metaDescription || "Estimez vos droits et optimisez votre futur revenu.",
  };
}

export default async function SimulationRetraitePage() {
  let content = await getPageContent('retraite/simulation');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/simulation`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }

  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#253F60] to-[#B99066]">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-cairo font-bold mb-4">⚠️ Contenu non disponible</h1>
          <p className="text-xl mb-6">Cette page n'a pas encore été configurée dans le CMS.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <nav className="flex items-center text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span className="mx-2">{'>'}</span>
              <Link href="/retraite" className="hover:text-white transition-colors">Retraite</Link>
              <span className="mx-2">{'>'}</span>
              <span className="text-[#B99066]">Simulateur Retraite</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
              {content.hero?.title}
            </h1>
            <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl">
              {content.hero?.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      {content.introduction && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              {content.introduction.paragraphs?.map((p, i) => (
                <p key={i} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                  {p}
                </p>
              ))}
              {content.introduction.highlight && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
                  <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                    {content.introduction.highlight.split('**').map((part, k) => (
                      k % 2 === 1 ? <strong key={k} className="text-[#B99066]">{part}</strong> : part
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pourquoi Section */}
      {content.pourquoi && (
        <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.pourquoi.title}</h2>
            <p className="text-[#6B7280] text-center mb-8 text-lg font-inter">{content.pourquoi.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {content.pourquoi.items?.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">{item.title}</h3>
                  <p className="text-[#4B5563] font-inter text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            {content.pourquoi.note && (
              <div className="bg-[#fff1e6] p-4 rounded text-center">
                <p className="text-[#B99066] font-bold font-inter text-lg">
                  {content.pourquoi.note.replace(/\*\*/g, '')}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Meilleurs Simulateurs */}
      {content.meilleursSimulateurs && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.meilleursSimulateurs.title}</h2>
            <p className="text-[#4B5563] text-center mb-8 text-lg font-inter">{content.meilleursSimulateurs.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {content.meilleursSimulateurs.items?.map((tool, i) => (
                <div key={i} className="bg-[#F9FAFB] rounded-xl p-6 hover:shadow-lg transition-shadow border border-[#E5E7EB]">
                  <h3 className="text-[#253F60] font-bold font-cairo mb-2">{tool.name}</h3>
                  <p className="text-[#6B7280] text-sm font-inter mb-4">{tool.desc}</p>
                  <div className="text-[#B99066] font-bold text-sm">{tool.url}</div>
                </div>
              ))}
            </div>
            {content.meilleursSimulateurs.note && (
              <div className="text-center text-[#4B5563] font-inter italic">
                {content.meilleursSimulateurs.note.split('**').map((part, k) => (
                  k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Taux Remplacement Table */}
      {content.tauxRemplacement && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 text-center">{content.tauxRemplacement.title}</h2>
            <p className="text-center mb-12 text-[#4B5563] text-lg font-inter">{content.tauxRemplacement.intro}</p>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white mb-8">
              <table className="w-full text-sm font-inter">
                <thead className="bg-[#253F60] text-white">
                  <tr>
                    {content.tauxRemplacement.headers?.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-left font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {content.tauxRemplacement.rows?.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-[#253F60]">{row.statut}</td>
                      <td className="px-6 py-4 text-[#B99066] font-bold">{row.taux}</td>
                      <td className="px-6 py-4 text-[#4B5563]">{row.comm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center font-inter text-[#4B5563]">
              {content.tauxRemplacement.note.split('**').map((part, k) => (
                k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
              ))}
            </p>
          </div>
        </section>
      )}

      {/* Infographie Table */}
      {content.infographie && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4 text-center">{content.infographie.title}</h2>
            <p className="text-center mb-12 text-[#4B5563] text-lg font-inter">{content.infographie.intro}</p>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
              <table className="w-full text-sm font-inter">
                <thead className="bg-[#B99066] text-white">
                  <tr>
                    {content.infographie.headers?.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-left font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {content.infographie.rows?.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold text-[#253F60]">{row.profil}</td>
                      <td className="px-6 py-4">{row.revenu}</td>
                      <td className="px-6 py-4">{row.pension}</td>
                      <td className="px-6 py-4 text-[#B99066] font-bold">{row.taux}</td>
                      <td className="px-6 py-4 text-[#4B5563]">{row.comm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Leviers */}
      {content.leviers && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-12 text-center">{content.leviers.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.leviers.items?.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-[#253F60] hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center text-white font-bold mb-4">{i + 1}</div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-3 h-12">{item.title}</h3>
                  <p className="text-[#4B5563] text-sm font-inter leading-relaxed">
                    {item.text.split('**').map((part, k) => (
                      k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fiscalite & Approche */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {content.fiscalite && (
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">{content.fiscalite.title}</h2>
              <p className="text-[#4B5563] text-lg font-inter">
                {content.fiscalite.content.split('**').map((part, k) => (
                  k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>
            </div>
          )}

          {content.approche && (
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 sm:p-12 text-white">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold mb-6 text-center">{content.approche.title}</h2>
              <p className="text-center text-white/90 mb-8">{content.approche.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {content.approche.steps?.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                    <div className="w-6 h-6 bg-[#B99066] rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-inter">
                      {step.split('**').map((part, k) => (
                        k % 2 === 1 ? <strong key={k} className="text-[#B99066]">{part}</strong> : part
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center font-cairo font-bold text-xl italic text-[#B99066]">"{content.approche.mission}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f4f7f6] py-16 sm:py-20 lg:py-24 border-t border-gray-200">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-[#e5e7eb]">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">{content.cta?.title}</h2>
            <p className="text-[#6B7280] mb-8 font-inter">{content.cta?.subtitle}</p>
            <a
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#B99066] hover:bg-[#A67C52] text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {content.cta?.buttonText || "Simulez votre retraite gratuitement"}
            </a>
            {content.cta?.contact && (
              <div className="mt-6">
                <a href={`mailto:${content.cta.contact}`} className="text-[#253F60] hover:underline font-medium">
                  {content.cta.contact}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
