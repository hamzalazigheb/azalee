import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import { getPageContent } from '@/lib/cms-server';
import CTAButton from "@/components/ui/CTAButton";

export const revalidate = 0; // SSR

const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center mb-12">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
            {data.title || 'Comprendre la succession'}
          </h1>
          <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8 text-white">
            {data.description}
          </p>
          {data.codeCivil && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {data.codeCivil.map((item, index) => (
                <div key={index} className="bg-white bg-opacity-20 border-l-4 border-white rounded-lg shadow-lg p-6">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white text-sm opacity-90">{item.description}</p>
                </div>
              ))}
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

const DefinitionSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24 text-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {data.blocks && data.blocks.map((block, index) => (
            <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`w-1 h-8 ${index % 2 === 0 ? 'bg-gradient-to-b from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-b from-[#253F60] to-[#1a2d47]'} rounded-full`}></div>
                  <h3 className="text-2xl font-cairo font-bold">{block.title}</h3>
                  <div className={`w-1 h-8 ${index % 2 === 0 ? 'bg-gradient-to-b from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-b from-[#253F60] to-[#1a2d47]'} rounded-full`}></div>
                </div>
                {block.description && (
                  <p className="text-base leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: block.description }} />
                )}
                {block.items && (
                  <div className="space-y-3 mt-4">
                    {block.items.map((li, i) => (
                      <div key={i} className="bg-white bg-opacity-20 rounded-lg p-3">
                        <p dangerouslySetInnerHTML={{ __html: li }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.example && (
          <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white text-center">
            <h3 className="text-xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: data.example.title }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.example.cards && data.example.cards.map((card, i) => (
                <div key={i} className="bg-white bg-opacity-20 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">{card.label}</h4>
                  <p className="text-sm font-bold" dangerouslySetInnerHTML={{ __html: card.value }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TaxSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
            {data.title}
          </h2>
          <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.tableTitle}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#253F60] text-white">
                    {data.tableHeaders && data.tableHeaders.map((h, i) => (
                      <th key={i} className={`px-4 py-3 ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.tableRows && data.tableRows.map((row, i) => (
                    <tr key={i} className={`border-b ${row.highlight ? 'bg-green-50' : ''}`}>
                      <td className="px-4 py-3 font-medium">{row.label}</td>
                      <td className={`px-4 py-3 text-center font-bold ${row.highlight ? 'text-green-600' : 'text-[#253F60]'}`}>{row.value}</td>
                      <td className="px-4 py-3 text-center text-xs opacity-80">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.exampleTitle}
            </h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 text-white text-white">
                <h4 className="font-semibold mb-3 text-white">{data.exampleSituationTitle}</h4>
                <p className="text-sm text-white" dangerouslySetInnerHTML={{ __html: data.exampleSituation }} />
              </div>
              <div className="space-y-4">
                {data.exampleItems && data.exampleItems.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-lg ${i === 0 ? 'bg-blue-50 text-blue-800' : i === 1 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <span className="font-medium">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
              {data.exampleNote && (
                <div className="bg-[#E8F4F8] border-l-4 border-[#253F60] p-4 rounded-r-lg">
                  <p className="text-[#112033] text-xs">
                    {data.exampleNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MatrimonialSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-[#686868] text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 flex flex-col justify-between">
              <div className="text-center mb-6">
                <h3 className="text-[#112033] text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#686868] text-sm mb-4">
                  {item.description}
                </p>
              </div>
              <div className={`border-l-4 p-4 rounded-r-lg ${index % 2 === 0 ? 'bg-[#E8F4F8] border-[#253F60]' : 'bg-[#FFF4E6] border-[#B99066]'}`}>
                <p className="text-[#112033] text-xs">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data.bottomBlock && (
          <div className="mt-12 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white text-center text-white">
            <h3 className="text-xl font-semibold mb-6 text-white" dangerouslySetInnerHTML={{ __html: data.bottomBlock.title }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.bottomBlock.cards && data.bottomBlock.cards.map((card, i) => (
                <div key={i} className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong className="text-white">{card.title}</strong><br />
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const OptimizationSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16 text-white">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-[#686868] text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${index % 4 === 0 ? 'from-[#253F60] to-[#3A5A7A]' : index % 4 === 1 ? 'from-[#B99066] to-[#253F60]' : index % 4 === 2 ? 'from-[#253F60] to-[#B99066]' : 'from-[#B99066] to-[#253F60]'} rounded-lg shadow-lg p-8 text-white group hover:shadow-2xl transition-all duration-300`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              </div>
              <p className="text-sm text-center" dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          ))}
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

        <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8 max-w-4xl mx-auto shadow-inner text-white">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {data.listTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white">
            {data.items && data.items.map((item, i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
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

export default async function SuccessionHeritagePage() {
  let content = await getPageContent('patrimoine/succession-heritage');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/succession-heritage`, { cache: 'no-store' });
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
          <p className="text-xl mb-6">La page de Succession n'est pas configurée.</p>
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
          title={content.chart.title || "Indicateurs de succession"}
          data={content.chart.data}
          chartImage={content.chart.image || "/images/azalee-patrimoine-succesion.webp"}
        />
      )}
      <DefinitionSection data={content.definition} />
      <TaxSection data={content.fiscalite} />
      <MatrimonialSection data={content.regime} />
      <OptimizationSection data={content.optimisation} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}