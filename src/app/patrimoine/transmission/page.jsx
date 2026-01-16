import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import { getPageContent } from '@/lib/cms-server';
import CTAButton from "@/components/ui/CTAButton";

export const revalidate = 0; // SSR

const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
            {data.title || 'Transmission de patrimoine'}
          </h1>
          <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
            {data.description}
          </p>
          {data.aspects && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {data.aspects.map((aspect, index) => (
                <div key={index} className="bg-white bg-opacity-20 border-l-4 border-white rounded-lg shadow-lg p-6 group hover:bg-opacity-30 transition-all duration-300">
                  <h3 className="text-white font-semibold mb-2">{aspect.title}</h3>
                  <p className="text-white text-sm opacity-90">{aspect.description}</p>
                </div>
              ))}
            </div>
          )}
          {data.highlight && (
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto mb-8">
              <p className="text-white text-sm font-inter">
                {data.highlight}
              </p>
            </div>
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

const ReasonsSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title}
          </h2>
          <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-white text-xl font-cairo font-bold mb-2">{item.title}</h3>
                <p className="text-white/90 text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolsSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${index % 4 === 0 ? 'from-[#253F60] to-[#3A5A7A]' : index % 4 === 1 ? 'from-[#B99066] to-[#253F60]' : index % 4 === 2 ? 'from-[#253F60] to-[#B99066]' : 'from-[#B99066] to-[#A67C52]'} rounded-lg shadow-lg p-8 text-white group hover:shadow-2xl transition-all duration-300`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              </div>
              <div className="space-y-4">
                {item.content && (
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                )}
                {item.list && (
                  <ul className="space-y-2 text-sm opacity-90">
                    {item.list.map((li, i) => (
                      <li key={i}>• {li}</li>
                    ))}
                  </ul>
                )}
                {item.note && (
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-xs text-center font-medium">
                      {item.note}
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

const ExpertsSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.experts && data.experts.map((expert, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center border-l-4 border-[#253F60] hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-[#112033] text-xl font-semibold mb-3">
                {expert.role}
              </h3>
              <p className="text-sm leading-relaxed">
                {expert.description}
              </p>
            </div>
          ))}
        </div>

        {data.bottomHighlight && (
          <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white text-center">
            <h3 className="text-xl font-semibold">
              <strong>{data.bottomHighlight}</strong>
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

const PracticalExample = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-[#686868] text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.leftTitle}
            </h3>
            <div className="space-y-4">
              {data.leftItems && data.leftItems.map((item, i) => (
                <div key={i} className={`flex justify-between items-center p-4 ${i === data.leftItems.length - 1 ? 'bg-gradient-to-r from-[#253F60] to-[#B99066] text-white' : 'bg-[#E8F4F8]'} rounded-lg`}>
                  <span className="font-medium">{item.label}</span>
                  <span className="font-bold text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.rightTitle}
            </h3>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h4 className="text-red-800 font-semibold mb-2">{data.beforeTitle}</h4>
                <p className="text-red-700 text-sm" dangerouslySetInnerHTML={{ __html: data.beforeText }} />
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <h4 className="text-green-800 font-semibold mb-2">{data.afterTitle}</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  {data.afterList && data.afterList.map((li, i) => (
                    <li key={i}>• {li}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-4 text-white text-center">
                <p className="font-semibold">
                  {data.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VisionSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.points && data.points.map((point, index) => (
            <div key={index} className="text-center">
              <h3 className="text-[#112033] text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-xl font-semibold mb-6">
            {data.bottomTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {data.bottomCards && data.bottomCards.map((card, i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm">
                  {card}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white bg-opacity-20 border-l-4 border-white p-6 rounded-r-lg">
            <p className="text-white text-center font-semibold">
              <strong>{data.ctaText}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20 text-white">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6 text-white">
          {data.title}
        </h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90 text-white">
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
    </section>
  );
};

export default async function TransmissionPage() {
  let content = await getPageContent('patrimoine/transmission');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/transmission`, { cache: 'no-store' });
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
          <p className="text-xl mb-6">La page de Transmission n'est pas configurée.</p>
          <CTAButton externalUrl="/" variant="white">Retour à l'accueil</CTAButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={content.hero} />
      {content.chart && (
        <PlacementChart
          title={content.chart.title || "Indicateurs de transmission patrimoniale"}
          data={content.chart.data}
          chartImage={content.chart.image || "/images/azalee-patrimoine-transmission.webp"}
        />
      )}
      <ReasonsSection data={content.pourquoi} />
      <ToolsSection data={content.outils} />
      <ExpertsSection data={content.experts} />
      <PracticalExample data={content.exemple} />
      <VisionSection data={content.vision} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}