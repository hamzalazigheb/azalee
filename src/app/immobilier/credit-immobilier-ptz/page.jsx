import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('immobilier/credit-immobilier-ptz');
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function CreditImmobilierPTZPage() {
  let content = await getPageContent('immobilier/credit-immobilier-ptz');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/credit-immobilier-ptz`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) content = json.data.content;
    } catch (e) { console.error('API Fallback failed', e); }
  }

  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#112033] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.title}
              </h1>

              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.subtitle}
              </p>

              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.subtitle2}
              </p>

              <div className="flex justify-center lg:justify-start">
                <CTAButton
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                >
                  {content.hero?.button}
                </CTAButton>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative overflow-visible">
              <div className="flex items-center gap-4 mb-4 sm:mb-6 relative z-10">
                <div className="w-8 h-8 sm:w-9 sm:h-9">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {content.rightCard?.title}
                </h2>
              </div>

              {content.rightCard?.floatingText && (
                <div className="absolute -top-8 sm:-top-12 lg:-top-16 -right-8 sm:-right-12 lg:-right-16 w-[35px] h-[35px] sm:w-[130px] sm:h-[130px] lg:w-[160px] lg:h-[160px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center z-0">
                  <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-sm lg:text-base leading-tight px-1 sm:px-0">
                    {content.rightCard.floatingText.split('\n').map((line, index, arr) => (
                      <span key={index} className={index === 0 && arr.length > 1 ? "hidden sm:block" : index === 1 ? "sm:hidden" : "hidden sm:block"}>
                        {line}
                        {index < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.rightCard?.benefits && (
                <div className="mt-8 sm:mt-12 relative z-10">
                  <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                    {(content.rightCard.benefits || []).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-white mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Les avantages du crédit immobilier */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                {content.credit?.title}
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                {content.credit?.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {(content.credit?.advantages || []).map((advantage, index) => {
                const isEven = index % 2 === 0;
                const gradientClass = isEven
                  ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'
                  : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]';
                const iconGradientClass = isEven
                  ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'
                  : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]';
                const bgClass = isEven ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20';

                return (
                  <div key={index} className={`group relative ${gradientClass} rounded-2xl p-8 shadow-xl text-white overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 ${bgClass} rounded-bl-full`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 ${iconGradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-2xl font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">{advantage.title}</h3>
                      <p className="text-white text-base font-inter leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Les inconvénients et risques */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.inconvenientsSection?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.inconvenientsSection?.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content.inconvenientsSection?.items || []).map((item, index) => {
              const isEven = index % 2 === 0;
              const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
              const bgClass = isEven ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';

              return (
                <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 ${bgClass} rounded-bl-full`}></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">{item.title}</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Le PTZ */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.ptz?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.ptz?.subtitle}
            </p>
          </div>
          <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg border-2 border-[#E5E7EB] overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
            <p className="text-[#686868] text-lg sm:text-xl font-inter leading-relaxed mb-8 text-center" dangerouslySetInnerHTML={{ __html: (content.ptz?.description || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {(content.ptz?.cards || []).map((card, index) => {
                const isEven = index % 2 === 0;
                const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
                const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';

                return (
                  <div key={index} className={`group bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-[#E5E7EB] ${borderClass} transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className={`w-20 h-20 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon === "house" ? (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      ) : (
                        <span className="text-white text-2xl font-bold">{card.icon}</span>
                      )}
                    </div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-2">{card.title}</h3>
                    <p className="text-[#686868] text-base font-inter">{card.description}</p>
                  </div>
                );
              })}
            </div>

            {content.ptz?.exempleContent && (
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-6 sm:p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-2xl sm:text-3xl font-cairo font-bold">{content.ptz.exempleTitle}</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <p className="text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content.ptz.exempleContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exemple concret d'effet de levier */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.exempleSection?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.exempleSection?.subtitle}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">
              {content.exempleSection?.description}
            </h3>

            {content.exempleSection?.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {content.exempleSection.metrics.map((metric, index) => (
                  <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                    <h4 className="font-semibold mb-2">{metric.label}</h4>
                    <p className="text-lg font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {content.exempleSection?.resultTitle && (
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">{content.exempleSection.resultTitle}</h4>
                {content.exempleSection.resultText1 && (
                  <p className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: content.exempleSection.resultText1.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                )}
                {content.exempleSection.resultText2 && (
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: content.exempleSection.resultText2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              {content.conseil?.title}
            </h2>
            <div className="space-y-6">
              {content.conseil?.introText && (
                <p className="text-[#686868] text-lg" dangerouslySetInnerHTML={{ __html: content.conseil.introText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              )}

              {content.conseil?.introText2 && (
                <p className="text-[#686868] text-lg" dangerouslySetInnerHTML={{ __html: content.conseil.introText2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              )}

              {content.conseil?.services && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.conseil.services.map((service, index) => (
                    <div key={index} className="bg-[#253F60] rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-white">{service.title}</h3>
                      <p className="text-sm text-white">{service.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {content.conseil?.conclusionText && (
                <div className="bg-[#253F60] rounded-lg p-4 text-center">
                  <p className="text-sm text-white" dangerouslySetInnerHTML={{ __html: content.conseil.conclusionText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center shadow-xl">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              {content.finalCta?.title}
            </h2>
            {content.finalCta?.subtitle && (
              <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
                {content.finalCta.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                variant="white"
              >
                {content.finalCta?.primaryButton}
              </CTAButton>
              <CTAButton
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                variant="secondary"
              >
                {content.finalCta?.secondaryButton}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
