import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0; // Ensure fresh content on every request (SSR)

// Block-based section renderers
const HeroSection = ({ data, content }) => {
  if (!data) return null;

  // Support both structures: hero.rightCard (nested) or content.rightCard (root level)
  const rightCard = data.rightCard || (content && content.rightCard);

  return (
    <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
              {data.title || 'SCI : un outil de gestion patrimoniale'}
            </h1>
            {data.subtitle && (
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {data.subtitle}
              </p>
            )}
            {data.subtitle2 && (
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {data.subtitle2}
              </p>
            )}
          </div>

          {rightCard && (
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-2">
                {rightCard.title}
              </h2>
              {rightCard.subtitle && (
                <p className="text-sm opacity-90 mb-4">{rightCard.subtitle}</p>
              )}
              {rightCard.benefits && (
                <ul className="space-y-2 text-sm font-source-sans font-semibold">
                  {rightCard.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span>✓</span><span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              {rightCard.button1 && (
                <div className="mt-6">
                  <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                    {rightCard.button1}
                  </CTAButton>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const AvantagesSection = ({ data }) => {
  if (!data?.items) return null;

  const iconPaths = [
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  ];

  return (
    <section id="avantages" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Les avantages'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.items.map((item, index) => {
            const isEven = index % 2 === 0;
            const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
            const bgClass = isEven ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';
            const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';

            return (
              <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-20 h-20 ${bgClass} rounded-bl-full`}></div>
                <div className={`w-16 h-16 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[index] || iconPaths[0]} />
                  </svg>
                </div>
                <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                <p className="text-[#686868] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const InconvenientsSection = ({ data }) => {
  if (!data?.items) return null;

  const iconPaths = [
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Les inconvénients'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.items.map((item, index) => {
            const isEven = index % 2 === 0;
            const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
            const bgClass = isEven ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';
            const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';

            return (
              <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-20 h-20 ${bgClass} rounded-bl-full`}></div>
                <div className={`w-16 h-16 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[index] || iconPaths[0]} />
                  </svg>
                </div>
                <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                <p className="text-[#686868] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FiscaliteSection = ({ data }) => {
  if (!data) return null;

  return (
    <section id="fiscalite" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Fiscalité'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {data.ir && (
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">{data.ir.title}</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">{data.ir.description}</p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Avantages :</strong> {data.ir.avantages}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Inconvénients :</strong> {data.ir.inconvenients}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {data.is && (
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">{data.is.title}</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">{data.is.description}</p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Avantages :</strong> {data.is.avantages}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Inconvénients :</strong> {data.is.inconvenients}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ExempleSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Exemple concret'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
          {data.description && (
            <p className="text-xl sm:text-2xl font-cairo font-bold mb-8 text-center">{data.description}</p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {data.sansSci && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-cairo font-bold mb-4 text-[#B99066]">❌ Sans SCI (indivision)</h4>
                <ul className="space-y-3">
                  {data.sansSci.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B99066]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.avecSci && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-cairo font-bold mb-4 text-green-400">✓ Avec SCI</h4>
                <ul className="space-y-3">
                  {data.avecSci.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {data.conclusion && (
            <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6">
              <p className="text-white font-inter">{data.conclusion}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ConseilSection = ({ data }) => {
  if (!data) return null;

  return (
    <section id="conseil" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Conseil'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="space-y-6">
          {data.paragraphs && data.paragraphs.map((p, i) => (
            <div key={i} className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-xl">
              <p className="text-lg font-inter leading-relaxed">{p}</p>
            </div>
          ))}

          {data.items && (
            <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-xl">
              <ul className="space-y-4">
                {data.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#B99066] text-xl">✓</span>
                    <span className="text-lg font-inter">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.conclusion && (
            <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
              <p className="text-lg font-inter leading-relaxed italic">{data.conclusion}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">
          {data.title || 'Prêt à commencer ?'}
        </h2>
        {data.subtitle && (
          <p className="text-white/90 text-lg sm:text-xl font-inter mb-8 max-w-2xl mx-auto">{data.subtitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {data.primaryButton && (
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
              {data.primaryButton}
            </CTAButton>
          )}
          {data.secondaryButton && (
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="secondary">
              {data.secondaryButton}
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  );
};

// Server Component (SSR)
export default async function SCIPage() {
  let content = await getPageContent('immobilier/sci');

  // Fallback: Try fetching via API if direct DB access returns nothing or empty object
  if (!content || Object.keys(content).length === 0) {
    try {
      console.log('Using API fallback for SCI content...');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/sci`, { cache: 'no-store' });
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
      <HeroSection data={content.hero} content={content} />
      <AvantagesSection data={content.avantages} />
      <InconvenientsSection data={content.inconvenients} />
      <FiscaliteSection data={content.fiscalite} />
      <ExempleSection data={content.exemple} />
      <ConseilSection data={content.conseil} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}
