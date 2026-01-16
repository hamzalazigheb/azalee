import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";
import { getPageContent } from '@/lib/cms-server';
import CTAButton from "@/components/ui/CTAButton";

export const revalidate = 0; // SSR

const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24 text-white">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center mb-12">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
            {data.title || 'Protection de la famille'}
          </h1>
          <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8 text-white">
            {data.description}
          </p>
          {data.highlight && (
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto mb-8">
              <p className="text-white text-sm font-inter">
                {data.highlight}
              </p>
            </div>
          )}
          {data.guarantees && (
            <>
              <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
                {data.guaranteesSubtitle || "La protection familiale, c'est garantir à ses proches :"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {data.guarantees.map((item, index) => (
                  <div key={index} className={`relative rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${index % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'}`}></div>
                    <div className="relative z-10 text-center">
                      <h3 className="font-cairo font-bold mb-2 text-lg sm:text-xl text-white">{item.title}</h3>
                      <p className="text-sm text-white opacity-90">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.buttons && data.buttons.map((btn, i) => (
            <CTAButton
              key={i}
              externalUrl={btn.url || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
              variant={i === 0 ? "primary" : "secondary"}
            >
              {btn.text}
            </CTAButton>
          ))}
        </div>
      </div>
    </section>
  );
};

const PreventionSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {data.blocks && data.blocks.map((block, index) => (
            <div key={index} className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${index % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'}`}></div>
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {block.title}
                </h3>
                <div className="space-y-4">
                  {block.items && block.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-white mt-1 font-bold">•</span>
                      <p className="text-white opacity-90 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                  ))}
                </div>
                {block.note && (
                  <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-4 rounded-lg mt-6">
                    <p className="text-white opacity-90 text-xs sm:text-sm text-center italic">
                      {block.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConcreteExample = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {data.blocks && data.blocks.map((block, index) => (
            <div key={index} className={`relative rounded-2xl p-8 sm:p-10 shadow-xl overflow-hidden border-l-4 ${index % 2 === 0 ? 'bg-gradient-to-br from-amber-50 to-white border-amber-500' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] border-[#B99066]'}`}>
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-bl-full ${index % 2 === 0 ? 'bg-amber-200/20' : 'bg-[#B99066]/10'}`}></div>
              <div className="relative z-10">
                <h3 className={`text-xl sm:text-2xl font-cairo font-bold mb-6 text-center ${index % 2 === 0 ? 'text-[#112033]' : 'text-white'}`}>
                  {block.title}
                </h3>

                <div className="space-y-4 mb-6">
                  {block.items && block.items.map((item, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 rounded-lg border ${index % 2 === 0 ? 'bg-white/60 border-amber-200' : 'bg-white/10 border-white/20'}`}>
                      <span className={index % 2 === 0 ? 'text-[#112033] font-medium' : 'text-white font-medium'}>{item.label}</span>
                      <span className={`${index % 2 === 0 ? (i === block.items.length - 1 ? 'text-[#B99066]' : 'text-[#253F60]') : 'text-white'} font-bold text-lg`}>{item.value}</span>
                    </div>
                  ))}
                  {block.highlight && (
                    <div className={`flex justify-between items-center p-4 rounded-lg border-2 ${index % 2 === 0 ? 'bg-amber-100 border-amber-300' : 'bg-gradient-to-r from-[#B99066] to-[#A67A5A] border-white/30'}`}>
                      <span className={index % 2 === 0 ? 'text-amber-900 font-bold' : 'text-white font-bold'}>{block.highlight.label}</span>
                      <span className={index % 2 === 0 ? 'text-amber-900 font-bold text-xl' : 'text-white font-bold text-xl'}>{block.highlight.value}</span>
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-r-lg ${index % 2 === 0 ? 'bg-red-50 border-l-4 border-red-500' : 'bg-white/10 backdrop-blur-sm border-2 border-white/20'}`}>
                  <h4 className={`font-semibold mb-2 ${index % 2 === 0 ? 'text-red-800' : 'text-white'}`}>{block.resultTitle}:</h4>
                  {block.resultList ? (
                    <ul className={`text-sm space-y-2 ${index % 2 === 0 ? 'text-red-700' : 'text-white opacity-90'}`}>
                      {block.resultList.map((li, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 font-bold">•</span>
                          <span dangerouslySetInnerHTML={{ __html: li }} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`text-sm ${index % 2 === 0 ? 'text-red-700' : 'text-white opacity-90'}`} dangerouslySetInnerHTML={{ __html: block.resultText }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeversSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${index % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'}`}></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VisionSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`relative rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${index % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'}`}></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-cairo font-bold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6 text-white" dangerouslySetInnerHTML={{ __html: data.highlight }} />

            <div className="mt-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 p-6 rounded-lg max-w-4xl mx-auto">
              <p className="text-white text-center font-semibold text-base sm:text-lg">
                <strong>{data.ctaText}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24 text-white">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>

          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6 text-white">
              {data.title}
            </h2>
            <p className="text-white opacity-90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.buttons && data.buttons.map((btn, i) => (
                <CTAButton
                  key={i}
                  externalUrl={btn.url || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
                  variant={i === 0 ? "primary" : "secondary"}
                >
                  {btn.text}
                </CTAButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default async function ProtectionFamillePage() {
  let content = await getPageContent('patrimoine/protection-famille');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/protection-famille`, { cache: 'no-store' });
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
          <p className="text-xl mb-6">La page de Protection Famille n'est pas configurée.</p>
          <CTAButton externalUrl="/" variant="white">Retour à l'accueil</CTAButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={content.hero} />
      {content.chart && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title={content.chart.title || "Indicateurs de protection familiale"}
              subtitle={content.chart.subtitle}
            />
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border-2 border-[#253F60]/20">
              <PlacementChart
                title={content.chart.title || "Indicateurs de protection familiale"}
                data={content.chart.data}
                chartImage={content.chart.image || "/images/azalee-patrimoine-protection.webp"}
              />
            </div>
          </div>
        </section>
      )}
      <PreventionSection data={content.prevention} />
      <ConcreteExample data={content.exemple} />
      <LeversSection data={content.leviers} />
      <VisionSection data={content.vision} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}