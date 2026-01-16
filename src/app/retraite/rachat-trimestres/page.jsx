import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('retraite/rachat-trimestres');
  if (!content) return { title: "Rachat de Trimestres | Azalée Patrimoine" };
  return {
    title: content.seo?.metaTitle || "Rachat de Trimestres | Azalée Patrimoine",
    description: content.seo?.metaDescription || "Optimisez votre retraite en complétant votre carrière.",
  };
}

export default async function RachatTrimestresPage() {
  let content = await getPageContent('retraite/rachat-trimestres');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/rachat-trimestres`, { cache: 'no-store' });
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
              <span className="text-[#B99066]">Rachat de trimestres</span>
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

      {/* Definition Section */}
      {content.definition && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-12">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.definition.text.split('**').map((part, i) => (
                  i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>

              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mb-6">
                <h2 className="text-xl sm:text-2xl font-cairo font-bold mb-4">
                  {content.definition.objectivesTitle}
                </h2>
                <ul className="space-y-3 text-base font-inter">
                  {content.definition.objectives?.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F9FAFB] rounded-xl p-6 sm:p-8 border-l-4 border-[#B99066]">
                <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                  {content.definition.note}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pourquoi Section */}
      {content.pourquoi && (
        <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                {content.pourquoi.title}
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                {content.pourquoi.subtitle}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.pourquoi.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.pourquoi.items?.map((item, i) => (
                  <div key={i} className={`rounded-xl p-6 text-white ${i < 2 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67C52]'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        {/* Simple generic icon */}
                        <span className="font-bold text-xl">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-cairo font-bold mb-2">{item.title}</h3>
                        <p className="text-sm font-inter text-white/90">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {content.pourquoi.important && (
                <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-[#253F60] font-cairo font-bold mb-2">{content.pourquoi.important.title}</h3>
                      <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                        {content.pourquoi.important.text.split('**').map((part, i) => (
                          i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Bareme Section */}
      {content.bareme && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {content.bareme.title}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                {content.bareme.factorsTitle.split('**').map((part, i) => (
                  i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {content.bareme.factors?.map((factor, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center">
                    <h3 className="font-cairo font-bold mb-2">{factor.title}</h3>
                    <p className="text-sm font-inter text-white/90">{factor.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {content.bareme.options?.map((opt, i) => (
                  <div key={i} className={`${i === 0 ? 'bg-[#F9FAFB] border-2 border-[#253F60]/20' : 'bg-gradient-to-r from-[#B99066] to-[#A67C52] text-white'} rounded-xl p-6 sm:p-8`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 ${i === 0 ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white' : 'bg-white/20 text-white'} rounded-full flex items-center justify-center font-cairo font-bold`}>
                        {i + 1}
                      </div>
                      <h3 className={`${i === 0 ? 'text-[#253F60]' : 'text-white'} text-xl sm:text-2xl font-cairo font-bold`}>
                        {opt.title}
                      </h3>
                    </div>
                    <p className={`${i === 0 ? 'text-[#4B5563]' : 'text-white/90'} text-base font-inter leading-relaxed whitespace-pre-line`}>
                      {opt.description.split('**').map((part, k) => (
                        k % 2 === 1 ? <strong key={k} className={i === 0 ? "text-[#253F60]" : "font-bold"}>{part}</strong> : part
                      ))}
                    </p>
                  </div>
                ))}
              </div>

              {/* PASS */}
              {content.bareme.pass && (
                <div className="mt-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4 text-[#B99066]">
                    Le Plafond Annuel de la Sécurité Sociale (PASS) {content.bareme.pass.year}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-cairo font-bold mb-6">
                    {content.bareme.pass.value}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.bareme.pass.tranches?.map((tranche, i) => (
                      <div key={i} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-sm font-inter text-white/80 mb-2">{tranche.label}</p>
                        <p className="font-cairo font-bold text-lg">{tranche.value}</p>
                        <p className="text-xs font-inter text-white/70 mt-1">{tranche.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {content.bareme.examples && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                    {content.bareme.examples.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.bareme.examples.items?.map((ex, i) => (
                      <div key={i} className={`bg-[#F9FAFB] rounded-xl p-6 border-2 ${i === 0 ? 'border-[#253F60]/20' : 'border-[#B99066]/20'}`}>
                        <h4 className="text-[#253F60] font-cairo font-bold mb-2">{ex.option}</h4>
                        <p className="text-sm text-[#6B7280] mb-3">{ex.context}</p>
                        <p className="text-2xl font-cairo font-bold text-[#B99066] mb-2">{ex.cost}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                    <p className="text-sm text-[#4B5563] font-inter italic">{content.bareme.examples.note}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* Rentabilite Section */}
      {content.rentabilite && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.rentabilite.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
                <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                  {content.rentabilite.deductibility.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="text-[#253F60]">{part}</strong> : part
                  ))}
                </p>
              </div>
              <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
                <h3 className="text-[#253F60] font-cairo font-bold mb-4">{content.rentabilite.caveatsTitle}</h3>
                <ul className="space-y-4 text-[#4B5563] text-base font-inter">
                  {content.rentabilite.caveats?.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#253F60] mt-1 font-bold">•</span>
                      <span>{c.split('**').map((part, k) => (
                        k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                      ))}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demarches Section */}
      {content.demarches && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.demarches.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <div className="space-y-6">
                {content.demarches.conditions?.map((cond, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-cairo font-bold mb-2">{cond.title}</h3>
                      <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                        {cond.description.split('**').map((part, k) => (
                          k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                        ))}
                      </p>
                    </div>
                  </div>
                ))}

                {content.demarches.warning && (
                  <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#253F60] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <div>
                        <h3 className="text-[#253F60] font-cairo font-bold mb-2">{content.demarches.warning.title}</h3>
                        <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                          {content.demarches.warning.description.split('**').map((part, k) => (
                            k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Moment Section */}
      {content.moment && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.moment.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">{content.moment.intro}</p>
              <div className="space-y-6">
                {content.moment.rules?.map((rule, i) => (
                  <div key={i} className={`rounded-xl p-6 ${i % 2 === 0 ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white' : 'bg-[#F9FAFB] border-2 border-[#E5E7EB]'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${i % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'}`}>
                        <span className={`font-cairo font-bold text-xl ${i % 2 === 0 ? 'text-white' : 'text-white'}`}>{i + 1}</span>
                      </div>
                      <div>
                        <h3 className={`font-cairo font-bold mb-3 text-lg ${i % 2 !== 0 ? 'text-[#253F60]' : ''}`}>{rule.title}</h3>
                        <p className={`font-inter leading-relaxed ${i % 2 === 0 ? 'text-white/90' : 'text-[#4B5563]'}`}>
                          {rule.description.split('**').map((part, k) => (
                            k % 2 === 1 ? <strong key={k} className={i % 2 !== 0 ? "text-[#253F60]" : ""}>{part}</strong> : part
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Points Cles */}
      {content.pointsCles && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.pointsCles.title}</h2>
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]">
              <div className="space-y-6">
                {content.pointsCles.items?.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-base sm:text-lg font-inter leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resume */}
      {content.resume && (
        <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.resume.title}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.resume.description.split('**').map((part, k) => (
                  k % 2 === 1 ? <strong key={k} className="text-[#253F60]">{part}</strong> : part
                ))}
              </p>
              <div className="mt-8 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-center">
                <p className="text-white text-base sm:text-lg font-inter mb-4">
                  {content.resume.ctaText}
                  <a href={content.resume.ctaLink} target="_blank" rel="noopener noreferrer" className="ml-1 text-white font-bold underline hover:text-[#253F60] transition-colors">
                    cliquez ici
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reequilibrer Section */}
      {content.reequilibrer && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">{content.reequilibrer.title}</h2>

            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{content.reequilibrer.introTitle}</h3>
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <p className="text-[#4B5563] font-inter mb-6">{content.reequilibrer.introText}</p>
                <ul className="space-y-3">
                  {content.reequilibrer.consequences?.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold">•</span>
                      <span className="text-[#4B5563] text-base font-inter">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">{content.reequilibrer.solutionTitle}</h3>
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-6">
                <p className="text-[#4B5563] text-lg font-inter mb-8">{content.reequilibrer.solutionIntro}</p>
                <div className="grid gap-6">
                  {content.reequilibrer.benefits?.map((benefit, i) => (
                    <div key={i} className={`rounded-xl shadow-lg p-6 sm:p-8 ${i === 1 ? 'bg-gradient-to-r from-[#B99066] to-[#A67C52]' : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47]'}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">{i + 1}</div>
                        <h4 className="text-white text-xl font-cairo font-bold">{benefit.title}</h4>
                      </div>
                      <p className="text-white/90 text-lg font-inter ml-16">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {content.reequilibrer.example && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6 text-center">{content.reequilibrer.example.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#253F60]/20">
                    <h4 className="text-[#253F60] font-cairo font-bold mb-3">Sophie</h4>
                    <p className="text-[#4B5563] text-sm font-inter">{content.reequilibrer.example.sophie}</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#B99066]/20">
                    <h4 className="text-[#253F60] font-cairo font-bold mb-3">Marc</h4>
                    <p className="text-[#4B5563] text-sm font-inter">{content.reequilibrer.example.marc}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 text-white">
                  <p className="font-bold text-lg mb-4">{content.reequilibrer.example.action}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {content.reequilibrer.example.result?.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
