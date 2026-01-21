import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('immobilier/plus-value-immobiliere');
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function PlusValueImmobilierePage() {
  let content = await getPageContent('immobilier/plus-value-immobiliere');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/plus-value-immobiliere`, { cache: 'no-store' });
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
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.title}
              </h1>

              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left" dangerouslySetInnerHTML={{ __html: (content.hero?.subtitle || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left" dangerouslySetInnerHTML={{ __html: (content.hero?.subtitle2 || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

              <div className="flex justify-center lg:justify-start">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.hero?.button}
                </CTAButton>
              </div>
            </div>

            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative overflow-visible">
              <div className="flex items-center gap-4 mb-4 sm:mb-6 relative z-10">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {content.rightCard?.title}
                </h2>
              </div>

              {content.rightCard?.floatingText && (
                <div className="absolute -top-8 sm:-top-12 lg:-top-16 -right-8 sm:-right-12 lg:-right-16 w-[35px] h-[35px] sm:w-[130px] sm:h-[130px] lg:w-[160px] lg:h-[160px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center z-0">
                  <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-sm lg:text-base leading-tight px-1 sm:px-0">
                    {content.rightCard.floatingText.split('\n').map((line, index, arr) => (
                      <span key={index}>{line}{index < arr.length - 1 && <br />}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 sm:mt-12 relative z-10">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  {(content.rightCard?.benefits || []).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.definition?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.definition?.subtitle}</p>
          </div>

          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-lg font-inter leading-relaxed text-center">{content.definition?.description}</p>
          </div>
        </div>
      </section>

      {/* Calcul */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.calcul?.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.calcul?.etapes || []).map((etape, index) => (
              <div key={index} className={`rounded-2xl p-6 shadow-lg text-white ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'}`}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-cairo font-bold text-lg mb-3 text-center">{etape.titre}</h3>
                <p className="text-white/90 text-sm font-inter text-center">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abattements */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.abattements?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.abattements?.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="font-cairo font-bold text-xl mb-4">Impôt sur le revenu (IR)</h3>
              <p className="text-white/90 font-inter">{content.abattements?.ir}</p>
            </div>
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="font-cairo font-bold text-xl mb-4">Prélèvements sociaux (PS)</h3>
              <p className="text-white/90 font-inter">{content.abattements?.ps}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exonérations */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.exonerations?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.exonerations?.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(content.exonerations?.items || []).map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#B99066] hover:shadow-xl transition-all duration-300">
                <p className="text-[#253F60] font-inter font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conseil */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.conseil?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.conseil?.subtitle}</p>
          </div>

          <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-lg font-inter leading-relaxed text-center">{content.conseil?.content}</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-br from-[#253F60] to-[#1a2d47] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">{content.finalCta?.title}</h2>
          <p className="text-white/90 text-lg sm:text-xl font-inter mb-8 max-w-2xl mx-auto">{content.finalCta?.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
              {content.finalCta?.primaryButton}
            </CTAButton>
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="secondary">
              {content.finalCta?.secondaryButton}
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
