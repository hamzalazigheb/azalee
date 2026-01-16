import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('retraite/prevoyance-protection');
  if (!content) return { title: "Prévoyance et Protection | Azalée Patrimoine" };
  return {
    title: content.seo?.metaTitle || "Prévoyance et Protection | Azalée Patrimoine",
    description: content.seo?.metaDescription || "Sécurisez votre avenir et celui de vos proches.",
  };
}

export default async function PrevoyancePage() {
  let content = await getPageContent('retraite/prevoyance-protection');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/prevoyance-protection`, { cache: 'no-store' });
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
              <span className="text-[#B99066]">{content.hero?.breadcrumb?.current || "Prévoyance"}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
              {content.hero?.title}
            </h1>
            <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl mb-6">
              {content.hero?.subtitle}
            </p>
            {content.hero?.highlight && (
              <div className="bg-white/10 p-4 rounded-lg inline-block border-l-4 border-[#B99066]">
                <p className="text-sm sm:text-base font-inter">{content.hero.highlight}</p>
              </div>
            )}
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
                  {p.split('**').map((part, k) => (
                    k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pourquoi */}
      {content.pourquoi && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-8 text-center">{content.pourquoi.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#4B5563] text-lg font-inter mb-6">{content.pourquoi.intro}</p>
                <ul className="space-y-4">
                  {content.pourquoi.items?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#B99066] rounded-full flex-shrink-0 mt-1"></div>
                      <span className="text-[#4B5563] font-inter">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#253F60]">
                <p className="text-[#253F60] font-bold font-cairo text-xl mb-4">Note :</p>
                <p className="text-[#4B5563] italic">{content.pourquoi.note}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cas Concret */}
      {content.casConcret && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-12 text-center">{content.casConcret.title}</h2>
            <div className="bg-[#F9FAFB] p-6 rounded-xl border border-gray-200 mb-8 max-w-2xl mx-auto text-center">
              <p className="text-[#4B5563] font-inter font-bold">
                {content.casConcret.scenario.split('**').map((part, k) => (
                  k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                <h3 className="text-red-800 font-bold font-cairo text-xl mb-4">{content.casConcret.sansPrevoyance?.title}</h3>
                <ul className="list-disc pl-5 mb-4 text-red-900/80">
                  {content.casConcret.sansPrevoyance?.consequences?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <p className="font-bold text-red-900">{content.casConcret.sansPrevoyance?.conclusion}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400">
                <h3 className="text-green-800 font-bold font-cairo text-xl mb-4">{content.casConcret.avecPrevoyance?.title}</h3>
                <ul className="list-disc pl-5 mb-4 text-green-900/80">
                  {content.casConcret.avecPrevoyance?.solutions?.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <p className="font-bold text-green-900">{content.casConcret.avecPrevoyance?.conclusion}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Focus & Objectifs */}
      <section className="w-full bg-[#253F60] py-16 sm:py-20 lg:py-24 text-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {content.focus && (
              <div>
                <h2 className="text-3xl font-cairo font-bold mb-6">{content.focus.title}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {content.focus.stats?.map((stat, i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-[#B99066]">{stat.value}</p>
                      <p className="text-sm font-inter">{stat.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mb-4">
                  {content.focus.constat.split('**').map((part, k) => (
                    k % 2 === 1 ? <strong key={k} className="text-[#B99066]">{part}</strong> : part
                  ))}
                </p>
                <ul className="space-y-2">
                  {content.focus.accompagnement?.map((acc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#B99066]">→</span> {acc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.objectifs && (
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-cairo font-bold mb-6">{content.objectifs.title}</h3>
                <ul className="space-y-4 mb-8">
                  {content.objectifs.items?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-[#B99066] rounded-full mt-2.5"></div>
                      <span className="text-lg text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-cairo font-bold text-xl text-[#B99066] italic">"{content.objectifs.mission}"</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions */}
      {content.solutions && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-12 text-center">{content.solutions.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.solutions.items?.map((sol, i) => (
                <div key={i} className={`rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all ${i === 0 ? 'bg-[#253F60] text-white md:col-span-2 lg:col-span-1' : 'bg-white'}`}>
                  <h3 className={`font-cairo font-bold text-xl mb-4 ${i === 0 ? 'text-white' : 'text-[#253F60]'}`}>{sol.title}</h3>
                  <p className={`font-inter text-sm mb-4 ${i === 0 ? 'text-white/80' : 'text-[#4B5563]'}`}>
                    {sol.text.split('**').map((part, k) => (
                      k % 2 === 1 ? <strong key={k} className={i === 0 ? "text-[#B99066]" : "text-[#253F60]"}>{part}</strong> : part
                    ))}
                  </p>
                  {sol.partenaires && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-xs text-[#B99066] uppercase font-bold mb-2">Partenaires</p>
                      <div className="flex flex-wrap gap-2">
                        {sol.partenaires.map((p, j) => (
                          <span key={j} className="bg-white/20 px-2 py-1 rounded text-xs">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accompagnement Azalee */}
      {content.accompagnementSection && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-6">{content.accompagnementSection.title}</h2>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto mb-12">{content.accompagnementSection.intro}</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {content.accompagnementSection.approches?.map((app, i) => (
                <div key={i} className="bg-white px-8 py-4 rounded-full shadow-md text-[#253F60] font-bold border border-[#253F60]/10 flex items-center gap-2">
                  <span className="text-[#B99066] text-xl">•</span> {app}
                </div>
              ))}
            </div>

            <p className="text-2xl font-cairo font-bold text-[#253F60]">
              {content.accompagnementSection.conclusion}
            </p>
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
              {content.cta?.buttonText || "Demander une évaluation gratuite"}
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