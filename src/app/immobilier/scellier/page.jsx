import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import SectionHeader from '../../../components/common/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('immobilier/scellier');
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function ScellierPage() {
  let content = await getPageContent('immobilier/scellier');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/scellier`, { cache: 'no-store' });
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
              <h1 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
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

            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {content.rightCard?.title}
                </h2>
              </div>

              {content.rightCard?.floatingText && (
                <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                  <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
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
                <div className="mt-8 sm:mt-12">
                  <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                    {(content.rightCard.benefits || []).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-white mt-1">✓</span>
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
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* La loi Pinel */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <SectionHeader
              title={content.pinel?.title}
              className="mb-8"
            />
            <div className="space-y-6">
              <p className="text-white text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                {content.pinel?.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(content.pinel?.durees || []).map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md text-center border border-gray-100">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md ${index === 1 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'}`}>
                      <span className="text-white text-xl font-bold">{item.pourcentage}</span>
                    </div>
                    <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-2">{item.ans}</h3>
                    <p className="text-[#686868] text-sm font-inter">{item.pourcentage} du prix du bien</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Exemple</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm">{content.pinel?.exemple}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">Avantages</h3>
                  <ul className="text-[#686868] text-sm font-inter space-y-2">
                    {(content.pinel?.avantages || []).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4">Inconvénients</h3>
                  <ul className="text-[#686868] text-sm font-inter space-y-2">
                    {(content.pinel?.inconvenients || []).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Les anciens dispositifs */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <SectionHeader
              title={content.anciens?.title}
              className="mb-8"
            />
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                {content.anciens?.description}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 shadow-lg text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-white font-cairo font-semibold text-lg mb-4 text-center">{content.anciens?.robien?.titre}</h3>
                  <p className="text-white text-sm font-inter text-center opacity-90">{content.anciens?.robien?.description}</p>
                </div>

                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 shadow-lg text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-white font-cairo font-semibold text-lg mb-4 text-center">{content.anciens?.scellier?.titre}</h3>
                  <p className="text-white text-sm font-inter text-center opacity-90">{content.anciens?.scellier?.description}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center shadow-lg">
                <p className="text-sm">{content.anciens?.note}</p>
              </div>
            </div>
          </div>

          {/* Pourquoi vendre */}
          <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border-l-4 border-[#B99066]">
            <SectionHeader
              title={content.venteApresEngagement?.title}
              className="mb-6"
            />
            <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
              {content.venteApresEngagement?.description}
            </p>
          </div>

          {/* Conseil Azalée Patrimoine */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <SectionHeader
              title={content.conseil?.title}
              className="mb-6"
            />
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-white">
              <p className="text-base font-inter leading-relaxed">{content.conseil?.content}</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 text-center">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
              {content.finalCta?.title}
            </h2>
            <p className="text-white/90 text-lg font-inter mb-8 max-w-2xl mx-auto">
              {content.finalCta?.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
                {content.finalCta?.primaryButton}
              </CTAButton>
              <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="secondary">
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