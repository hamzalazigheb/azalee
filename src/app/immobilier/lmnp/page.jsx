import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

const HeroSection = ({ data, content }) => {
  if (!data) return null;
  const rightCard = data.rightCard || (content && content.rightCard);

  return (
    <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h1 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
              {data.title}
            </h1>
            {data.subtitle && (
              <p className="text-[#686868] text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                {data.subtitle}
              </p>
            )}
            {data.description && (
              <p className="text-[#686868] text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                {data.description}
              </p>
            )}
            {data.example && (
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <p className="text-white text-sm font-inter">{data.example}</p>
              </div>
            )}
            <div className="flex justify-center lg:justify-start">
              <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                {data.button || "Optimisez votre fiscalité LMNP"}
              </CTAButton>
            </div>
          </div>

          {rightCard && (
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative mt-8 lg:mt-0">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {rightCard.title}
                </h2>
              </div>

              {rightCard.floatingText && (
                <div className="absolute -top-6 -right-4 sm:-top-16 sm:-right-8 w-[80px] h-[80px] sm:w-[160px] sm:h-[160px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center p-2 z-10">
                  <p className="text-center text-white font-source-sans font-semibold text-xs sm:text-lg leading-tight">
                    {rightCard.floatingText}
                  </p>
                </div>
              )}

              <div className="mt-8">
                <ul className="space-y-3 text-white text-sm font-source-sans font-semibold leading-relaxed">
                  {(rightCard.benefits || []).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const AvantagesSection = ({ data }) => {
  if (!data?.cards) return null;
  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4"><div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div></div>
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.cards.map((card, i) => (
            <div key={i} className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${i % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'}`}>
              <h3 className="font-cairo font-bold text-xl sm:text-2xl mb-6 relative z-10">{card.title}</h3>
              <ul className="space-y-3 sm:space-y-4 relative z-10">
                {(card.bullets || []).map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className={`mt-1 font-bold text-xl ${i % 2 === 0 ? 'text-[#B99066]' : 'text-[#253F60]'}`}>•</span>
                    <span className="text-base sm:text-lg font-inter leading-relaxed flex-1">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InconvenientsSection = ({ data }) => {
  if (!data?.cards) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4"><div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div></div>
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.cards.map((card, i) => (
            <div key={i} className={`relative rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-l-4 ${i % 2 === 0 ? 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#253F60]' : 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#B99066]'}`}>
              <h3 className={`font-cairo font-bold text-xl sm:text-2xl mb-6 relative z-10 ${i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'}`}>{card.title}</h3>
              <ul className="space-y-3 sm:space-y-4 relative z-10">
                {(card.bullets || []).map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className={`mt-1 font-bold text-xl ${i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'}`}>•</span>
                    <span className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed flex-1">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlusValueSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4"><div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div></div>
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-l-4 border-[#253F60] overflow-hidden">
          <div className="space-y-6 sm:space-y-8 text-[#686868] font-inter relative z-10">
            {(data.paragraphs || []).map((p, i) => (
              <p key={i} className="text-lg sm:text-xl leading-relaxed">{p}</p>
            ))}
            {(data.bullets || []).length > 0 && (
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-8 sm:p-10 mt-8 shadow-lg overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">{data.bulletsSectionTitle}</h3>
                  <ul className="space-y-4 sm:space-y-5">
                    {data.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                        <span className="text-white text-lg sm:text-xl leading-relaxed flex-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExempleSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 mb-6 sm:mb-8 border border-white/20 shadow-lg">
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed">{data.description}</p>
          </div>
          <div className="relative bg-gradient-to-r from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-xl p-8 sm:p-10 border-l-4 border-white shadow-lg overflow-hidden">
            <p className="text-white text-base sm:text-lg lg:text-xl font-inter leading-relaxed font-medium">{data.conclusion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparaisonSection = ({ data }) => {
  if (!data?.options) return null;
  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {data.options.map((option, i) => (
            <div key={i} className={`relative rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${i === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'}`}>
              <h3 className="font-cairo font-bold text-2xl sm:text-3xl mb-6 relative z-10">{option.title}</h3>
              <ul className="space-y-4 sm:space-y-5 relative z-10">
                {(option.bullets || []).map((b, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <span className="text-lg sm:text-xl font-inter leading-relaxed flex-1 pt-0.5">• {b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConseilSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>}
        </div>
        <div className="space-y-6 sm:space-y-8">
          {(data.paragraphs || []).map((p, i) => (
            <div key={i} className="relative rounded-2xl p-8 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white">
              <p className="text-lg sm:text-xl leading-relaxed relative z-10 font-light">{p}</p>
            </div>
          ))}
          {(data.bullets || []).length > 0 && (
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl">
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">{data.bulletsSectionTitle}</h3>
                <ul className="space-y-4 sm:space-y-5">
                  {data.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-white text-lg sm:text-xl font-inter leading-relaxed flex-1 pt-0.5">• {b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {data.conclusion && (
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8">
              <p className="text-white text-lg sm:text-xl font-inter leading-relaxed font-medium italic">{data.conclusion}</p>
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
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-10 text-center shadow-2xl">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">{data.title}</h2>
          <p className="text-white/90 text-lg sm:text-xl font-inter mb-8 max-w-3xl mx-auto leading-relaxed">{data.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {data.primaryButton && <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">{data.primaryButton}</CTAButton>}
            {data.secondaryButton && <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="secondary">{data.secondaryButton}</CTAButton>}
          </div>
        </div>
      </div>
    </section>
  );
};

// SSR Component
export default async function LMNPPage() {
  let content = await getPageContent('immobilier/lmnp');

  if (!content || Object.keys(content).length === 0) {
    // Fallback API fetch
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/lmnp`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) content = json.data.content;
    } catch (e) { console.error('API Fallback failed', e); }
  }

  if (!content) return <div className="p-20 text-center">Contenu non disponible</div>;

  return (
    <>
      <HeroSection data={content.hero} content={content} />
      <AvantagesSection data={content.avantages} />
      <InconvenientsSection data={content.inconvenients} />
      <PlusValueSection data={content.plusValue} />
      <ExempleSection data={content.exemple} />
      <ComparaisonSection data={content.comparaison} />
      <ConseilSection data={content.conseil} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}
