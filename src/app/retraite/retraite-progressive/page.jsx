import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('retraite/retraite-progressive');
  if (!content) return { title: "Retraite Progressive | Azalée Patrimoine" };
  return {
    title: content.seo?.metaTitle || "Retraite Progressive | Azalée Patrimoine",
    description: content.seo?.metaDescription || "Travaillez moins pour partir mieux.",
  };
}

export default async function RetraiteProgressivePage() {
  let content = await getPageContent('retraite/retraite-progressive');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/retraite-progressive`, { cache: 'no-store' });
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
              <span className="text-[#B99066]">{content.hero?.breadcrumb?.current || "Retraite progressive"}</span>
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

      {/* Intro */}
      {content.introduction && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-lg font-inter mb-6">{content.introduction.text}</p>
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] p-6 rounded-xl text-white">
                <p className="font-inter text-lg">
                  {content.introduction.highlight.split('**').map((part, k) => (
                    k % 2 === 1 ? <strong key={k} className="text-[#B99066]">{part}</strong> : part
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Definition / Qu'est ce que */}
      {content.definition && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-8 text-center">{content.definition.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-lg font-inter mb-8">
                {content.definition.text.split('**').map((part, k) => (
                  k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>

              <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
                <h3 className="text-[#253F60] font-bold font-cairo text-lg mb-4">{content.definition.conditionsTitle}</h3>
                <ul className="space-y-3">
                  {content.definition.conditions?.map((cond, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#B99066] font-bold">•</span>
                      <span className="text-[#4B5563]">{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                <p className="text-yellow-800 text-sm font-inter">{content.definition.note}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Avantages */}
      {content.avantages && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-12 text-center">{content.avantages.title}</h2>
            <div className="space-y-8">
              {content.avantages.items?.map((item, i) => (
                <div key={i} className={`relative bg-white rounded-2xl shadow-xl p-8 border-l-4 ${i === 1 ? 'border-[#B99066]' : 'border-[#253F60]'} overflow-hidden`}>
                  <h3 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">{item.title}</h3>
                  <p className="text-[#4B5563] text-lg font-inter leading-relaxed">
                    {item.description.split('**').map((part, k) => (
                      k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calcul */}
      {content.calcul && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-8 text-center">{content.calcul.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-lg mb-8">{content.calcul.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.calcul.examples?.map((ex, i) => (
                  <div key={i} className={`rounded-xl p-6 text-white ${i === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67C52]'}`}>
                    <h4 className="font-bold font-cairo text-lg mb-2">{ex.title}</h4>
                    <p className="font-inter">
                      {ex.desc.split('**').map((part, k) => (
                        k % 2 === 1 ? <strong key={k} className="text-white font-bold">{part}</strong> : part
                      ))}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[#4B5563] mb-4">{content.calcul.base}</p>
              <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded text-sm text-[#4B5563]">
                {content.calcul.note}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fonctionnaires */}
      {content.fonctionnaires && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-8 text-center">{content.fonctionnaires.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-lg mb-6 leading-relaxed">{content.fonctionnaires.text}</p>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-400">
                <p className="text-[#4B5563] italic">{content.fonctionnaires.note}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Indemnités */}
      {content.indemnites && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-3xl font-cairo font-bold mb-8 text-center">{content.indemnites.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-lg leading-relaxed">{content.indemnites.text}</p>
            </div>
          </div>
        </section>
      )}

      {/* Planification & Erreurs & Conclusion */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {content.planification && (
              <div>
                <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-6">{content.planification.title}</h2>
                <p className="text-[#4B5563] mb-4">{content.planification.intro}</p>
                <ul className="space-y-3 mb-6">
                  {content.planification.items?.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#4B5563]">
                      <span className="text-[#B99066] font-bold">•</span> {it}
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] p-6 rounded-xl text-white">
                  <p className="font-bold italic">
                    {content.planification.objectif.split('**').map((part, k) => (
                      k % 2 === 1 ? <strong key={k} className="font-extrabold">{part}</strong> : part
                    ))}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-12">
              {content.erreurs && (
                <div>
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-6">{content.erreurs.title}</h2>
                  <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                    <ul className="space-y-3 text-red-900">
                      {content.erreurs.items?.map((err, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span>⚠️</span> {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {content.conclusion && (
                <div>
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-6">{content.conclusion.title}</h2>
                  <p className="text-[#4B5563] text-lg leading-relaxed">{content.conclusion.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#f4f7f6] py-16 sm:py-20 lg:py-24 border-t border-gray-200">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-[#e5e7eb]">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">{content.cta?.title}</h2>
            <p className="text-[#6B7280] mb-8 font-inter">{content.cta?.subtitle}</p>
            <ul className="inline-block text-left text-[#4B5563] mb-8 space-y-2">
              {content.cta?.list?.map((l, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#B99066] font-bold">✓</span> {l}
                </li>
              ))}
            </ul>
            <div className="block mt-4">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B99066] hover:bg-[#A67C52] text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {content.cta?.buttonText || "Évaluez vos options de retraite progressive"}
              </a>
            </div>
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
