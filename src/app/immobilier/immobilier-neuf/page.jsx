import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0; // Ensure fresh content on every request (SSR)

// Hero Section
const HeroSection = ({ data, content }) => {
  if (!data) return null;

  const rightCard = data.rightCard || (content && content.rightCard);

  return (
    <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
              {data.title || 'Immobilier Neuf'}
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

// Dispositifs Fiscaux Section
const DispositifsFiscauxSection = ({ data }) => {
  if (!data?.dispositifs) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Les dispositifs fiscaux'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.dispositifs.map((dispositif, index) => {
            const isEven = index % 2 === 0;
            const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
            const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';

            return (
              <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2`}>
                <div className={`w-16 h-16 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{dispositif.icon || '📋'}</span>
                </div>
                <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-2 text-center">{dispositif.title}</h3>
                <p className="text-[#686868] text-sm font-inter leading-relaxed mb-4 text-center">{dispositif.description}</p>
                {dispositif.features && (
                  <ul className="space-y-2 mb-4">
                    {dispositif.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#686868]">
                        <span className="text-[#B99066]">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {dispositif.linkUrl && (
                  <div className="text-center mt-4">
                    <a href={dispositif.linkUrl} className="text-[#B99066] hover:text-[#253F60] font-semibold text-sm transition-colors">
                      {dispositif.linkText || 'En savoir plus'} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// VEFA Section
const VefaSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'VEFA'}
          </h2>
          {data.subtitle && (
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{data.subtitle}</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
          {data.description && (
            <p className="text-lg mb-8 leading-relaxed">{data.description}</p>
          )}

          {data.advantages && (
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-cairo font-bold mb-4">Avantages :</h3>
              <ul className="space-y-3">
                {data.advantages.map((advantage, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#B99066] text-xl">✓</span>
                    <span className="text-base">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.linkUrl && (
            <div className="text-center">
              <a href={data.linkUrl} className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {data.linkText || 'En savoir plus'}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Advantages Section
const AdvantagesSection = ({ data }) => {
  if (!data?.advantages) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title || 'Les avantages'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.advantages.map((advantage, index) => (
            <div key={index} className="bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
              <div className="text-5xl mb-4 text-center">{advantage.icon || '⭐'}</div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">{advantage.title}</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed text-center">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Conclusion Section
const ConclusionSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
            {data.title || 'Conclusion'}
          </h2>
          {data.content && (
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8" dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </div>

        {data.objectives && Array.isArray(data.objectives) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {data.objectives.map((objective, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#E5E7EB]">
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                  {typeof objective === 'string' ? objective : objective.title || ''}
                </h3>
                {typeof objective === 'object' && objective.description && (
                  <p className="text-[#686868]">{objective.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center space-y-4">
          {data.primaryCta && (
            <div>
              <CTAButton externalUrl={data.primaryCta.url || "https://calendly.com/rdv-azalee-patrimoine/30min"} variant="primary">
                {data.primaryCta.text || 'Demander un bilan gratuit'}
              </CTAButton>
            </div>
          )}
          {data.secondaryCta && (
            <div>
              <CTAButton externalUrl={data.secondaryCta.url || "https://calendly.com/rdv-azalee-patrimoine/30min"} variant="secondary">
                {data.secondaryCta.text || 'Planifiez votre consultation'}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Server Component (SSR)
export default async function ImmobilierNeufPage() {
  let content = await getPageContent('immobilier/immobilier-neuf');

  // Fallback: Try fetching via API if direct DB access returns nothing or empty object
  if (!content || Object.keys(content).length === 0) {
    try {
      console.log('Using API fallback for immobilier-neuf content...');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=immobilier/immobilier-neuf`, { cache: 'no-store' });
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
      <DispositifsFiscauxSection data={content.dispositifsFiscaux} />
      <VefaSection data={content.vefa} />
      <AdvantagesSection data={content.advantages} />
      <ConclusionSection data={content.conclusion} />
      <Footer />
    </>
  );
}
