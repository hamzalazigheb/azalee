import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

// Force dynamic rendering for SSR
export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('retraite/plan-retraite');

  if (!content) {
    return {
      title: "Plans d'Épargne Retraite | Azalée Patrimoine",
      description: "Découvrez les solutions d'épargne retraite PER, PERP, PERCO, Madelin, Préfon adaptées à votre statut.",
    };
  }

  return {
    title: content.seo?.metaTitle || "Plans d'Épargne Retraite | Azalée Patrimoine",
    description: content.seo?.metaDescription || "Découvrez les solutions d'épargne retraite PER, PERP, PERCO, Madelin, Préfon adaptées à votre statut.",
  };
}

export default async function PlanRetraitePage() {
  let content = await getPageContent('retraite/plan-retraite');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/plan-retraite`, { cache: 'no-store' });
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
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            {content.introduction?.paragraphs && content.introduction.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {paragraph.split('**').map((part, i) => (
                  i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>
            ))}

            {content.introduction?.highlight && (
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mt-8">
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                  {content.introduction.highlight.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-[#B99066]">{part}</strong> : part
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Differences Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl font-cairo font-bold mb-4 text-center">
            {content.differencesSection?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-12 font-inter">
            {content.differencesSection?.subtitle}
          </p>

          <div className="space-y-12">

            {/* PER */}
            {content.differencesSection?.per && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-2xl font-cairo font-bold mb-6">
                  {content.differencesSection.per.title}
                </h3>
                <p className="text-[#4B5563] text-lg font-inter leading-relaxed mb-6 whitespace-pre-line">
                  {content.differencesSection.per.description.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                  ))}
                </p>

                <div className="bg-[#F9FAFB] rounded-xl p-6 mb-8">
                  <h4 className="font-cairo font-bold text-[#253F60] mb-4">
                    {content.differencesSection.per.advantagesTitle}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.differencesSection.per.advantages?.map((adv, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#B99066] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-[#4B5563] font-inter text-sm">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <Link href={content.differencesSection.per.linkUrl || '#'} className="inline-flex items-center gap-2 text-[#B99066] font-bold underline hover:text-[#253F60] transition-colors">
                    {content.differencesSection.per.linkText}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            )}

            {/* PERP Madelin */}
            {content.differencesSection?.perpMadelin && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#B99066]/20">
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
                    {content.differencesSection.perpMadelin.items?.[0].title}
                  </h3>
                  <p className="text-[#4B5563] font-inter leading-relaxed">
                    {content.differencesSection.perpMadelin.items?.[0].description}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#B99066]/20">
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
                    {content.differencesSection.perpMadelin.items?.[1].title}
                  </h3>
                  <p className="text-[#4B5563] font-inter leading-relaxed">
                    {content.differencesSection.perpMadelin.items?.[1].description}
                  </p>
                </div>
                {content.differencesSection.perpMadelin.note && (
                  <div className="lg:col-span-2 bg-[#fff1e6] border-l-4 border-[#B99066] p-4 rounded text-[#4B5563] font-inter italic">
                    {content.differencesSection.perpMadelin.note}
                  </div>
                )}
              </div>
            )}

            {/* PERCO */}
            {content.differencesSection?.perco && (
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">{content.differencesSection.perco.title}</h3>
                <p className="text-[#4B5563] text-lg font-inter leading-relaxed mb-6 whitespace-pre-line">
                  {content.differencesSection.perco.description.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                  ))}
                </p>
                {content.differencesSection.perco.note && (
                  <div className="bg-[#F9FAFB] p-4 rounded text-sm text-[#4B5563] font-inter">
                    {content.differencesSection.perco.note.split('**').map((part, i) => (
                      i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PREFON */}
            {content.differencesSection?.prefon && (
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-cairo font-bold mb-4">{content.differencesSection.prefon.title}</h3>
                <p className="text-white/90 text-lg font-inter mb-6">
                  {content.differencesSection.prefon.description.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-[#B99066]">{part}</strong> : part
                  ))}
                </p>
                <ul className="space-y-3">
                  {content.differencesSection.prefon.advantages?.map((adv, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#B99066] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="font-inter text-sm">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparison Table */}
            {content.differencesSection?.comparisonTable && (
              <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="p-6 bg-[#F9FAFB] border-b border-gray-200">
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl">{content.differencesSection.comparisonTable.title}</h3>
                </div>
                <table className="w-full text-sm font-inter">
                  <thead className="bg-[#253F60] text-white">
                    <tr>
                      {content.differencesSection.comparisonTable.headers?.map((h, i) => (
                        <th key={i} className="px-6 py-4 text-left font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {content.differencesSection.comparisonTable.rows?.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#253F60]">{row.dispositif}</td>
                        <td className="px-6 py-4 text-[#4B5563]">{row.public}</td>
                        <td className="px-6 py-4 text-[#4B5563]">{row.fiscalite}</td>
                        <td className="px-6 py-4 text-[#4B5563]">{row.sortie}</td>
                        <td className="px-6 py-4 text-[#B99066] font-semibold">{row.avantage}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.statutColor === 'green' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                            {row.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Career Section */}
      {content.careerSection && (
        <section className="w-full bg-[#253F60] py-16 sm:py-20 lg:py-24 text-white">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-cairo font-bold mb-8 text-center">{content.careerSection.title}</h2>
            <p className="text-center text-white/80 max-w-2xl mx-auto mb-16">{content.careerSection.intro}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {content.careerSection.steps?.map((step, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center text-xl font-bold mb-4">{i + 1}</div>
                  <h3 className="font-cairo font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-white/80 text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            {content.careerSection.audit && (
              <div className="bg-white rounded-xl p-8 text-[#253F60] max-w-3xl mx-auto text-center">
                <h3 className="font-cairo font-bold text-2xl mb-4">{content.careerSection.audit.title}</h3>
                <p className="font-inter text-[#4B5563]">{content.careerSection.audit.description}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Situations Section */}
      {content.situationsSection && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-12 text-center">{content.situationsSection.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.situationsSection.items?.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6 border-t-4 border-[#B99066]">
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-[#4B5563] font-inter text-sm leading-relaxed">
                    {item.content.split('**').map((part, i) => (
                      i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accompagnement Section */}
      {content.accompagnementSection && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-4">{content.accompagnementSection.title}</h2>
              <p className="text-[#4B5563]">{content.accompagnementSection.intro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {content.accompagnementSection.cards?.map((card, i) => (
                <div key={i} className="bg-[#F9FAFB] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-[#B99066] font-cairo font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-[#4B5563] text-sm">{card.description}</p>
                </div>
              ))}
            </div>

            {content.accompagnementSection.mission && (
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-8 text-white text-center shadow-lg">
                <h3 className="font-cairo font-bold text-2xl mb-2">{content.accompagnementSection.mission.title}</h3>
                <p className="text-white/90 text-lg italic">"{content.accompagnementSection.mission.description}"</p>
              </div>
            )}
          </div>
        </section>
      )}

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
              {content.cta?.buttonText || "Construisez votre plan retraite personnalisé"}
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
