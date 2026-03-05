import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

export const revalidate = 0;

export async function generateMetadata() {
  const content = await getPageContent('immobilier/vefa');
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
    keywords: content?.seo?.keywords?.join(', '),
  };
}

export default async function VEFAPage() {
  let content = await getPageContent('immobilier/vefa');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/vefa`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) content = json.data.content;
    } catch (e) { console.error('API Fallback failed', e); }
  }

  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
                {content.hero?.title}
              </h1>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.hero?.subtitle}
              </p>
            </div>

            {/* Right card */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-2">{content.rightCard?.title}</h2>
              <p className="text-sm opacity-90 mb-4">{content.rightCard?.subtitle}</p>
              <ul className="space-y-2 text-sm font-source-sans font-semibold">
                {(content.rightCard?.benefits || []).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2"><span>✓</span><span>{benefit}</span></li>
                ))}
              </ul>
              <div className="mt-6">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.rightCard?.button1}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'essentiel */}
      <section id="lessentiel" className="w-full bg-[#F9FAFB] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.essentiel?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.essentiel?.items || []).map((item, i) => {
              const isBlue = i % 2 === 0;
              const bgGradient = isBlue
                ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'
                : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';

              return (
                <div key={i} className={`${bgGradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 border-transparent hover:border-white/20`}>
                  <p className="text-white text-sm font-inter leading-relaxed">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Définition */}
      <section id="definition" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h3 className="text-[#253F60] text-2xl font-cairo font-semibold mb-4">{content.definition?.title}</h3>
            <p className="text-[#686868] font-inter mb-4">{content.definition?.text1}</p>
            <p className="text-[#686868] font-inter">{content.definition?.text2}</p>
          </div>

          <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 sm:p-8 border-l-4 border-[#B99066]">
            <h4 className="text-[#253F60] text-lg font-source-sans font-semibold mb-4">{content.definition?.savoirTitle}</h4>
            <ul className="space-y-2 text-[#686868] font-inter">
              {(content.definition?.savoirItems || []).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#B99066] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.avantages?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.avantages?.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {(content.avantages?.items || []).map((item, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                  <p className="text-white text-base font-inter leading-relaxed text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inconvénients */}
      <section id="inconvenients" className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.inconvenients?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.inconvenients?.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {(content.inconvenients?.items || []).map((item, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4 justify-center">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">{item.title}</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemple concret */}
      <section id="exemple" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.exemple?.title}</h2>
            <div className="bg-[#B99066] rounded-lg p-6 text-white">
              <p className="text-white text-base font-inter leading-relaxed">{content.exemple?.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Financement */}
      <section id="financement" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-8 text-center">{content.financement?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.financement?.steps || []).map((step, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-[#253F60] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-[#253F60] text-lg font-source-sans font-semibold mb-3">{step.title}</h3>
                <p className="text-[#686868] text-sm font-inter">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fiscalité */}
      <section id="fiscalite" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.fiscalite?.title}</h2>
            <p className="text-[#686868] text-base font-inter leading-relaxed">{content.fiscalite?.content}</p>
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine */}
      <section id="conseil" className="w-full bg-[#253F60] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">{content.conseil?.title}</h2>
            <div className="bg-[#B99066] rounded-lg p-6 text-white">
              <p className="text-white text-base font-inter leading-relaxed">{content.conseil?.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risques */}
      <section id="risques" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.risques?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(content.risques?.items || []).map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-5 border-l-4 border-[#B99066]">
                <p className="text-[#686868] text-sm font-inter font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison */}
      <section id="comparaison" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">{content.comparaison?.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#253F60] text-white">
                    <th className="border border-[#1a2d47] p-3 text-left font-source-sans font-semibold">Critère</th>
                    <th className="border border-[#1a2d47] p-3 text-center font-source-sans font-semibold">VEFA</th>
                    <th className="border border-[#1a2d47] p-3 text-center font-source-sans font-semibold">Existant</th>
                  </tr>
                </thead>
                <tbody>
                  {(content.comparaison?.data || []).map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}>
                      <td className="border border-[#E5E7EB] p-3 font-inter font-medium text-[#253F60]">{row.critere}</td>
                      <td className="border border-[#E5E7EB] p-3 text-center font-inter text-[#253F60] font-semibold">{row.vefa}</td>
                      <td className="border border-[#E5E7EB] p-3 text-center font-inter text-[#686868]">{row.existant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="w-full bg-[#253F60] py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            {content.finalCta?.title}
          </h2>
          <p className="text-white text-lg font-inter mb-8 max-w-2xl mx-auto">
            {content.finalCta?.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton
              externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
              variant="primary"
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
      </section>

      <Footer />
    </>
  );
}
