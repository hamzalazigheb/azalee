import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0; // SSR

const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24 text-white">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              {data.title || 'Donation à titre onéreux'}
            </h1>
            {data.subtitle && typeof data.subtitle === 'string' ? (
              <p className="text-white text-lg font-inter leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
            ) : (
              <p className="text-white text-lg font-inter leading-relaxed mb-8">{data.subtitle}</p>
            )}
            {data.highlight && (
              <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  {data.highlight}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
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

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#686868]">
              {data.cards && data.cards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className={`w-16 h-16 ${index % 2 === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center mx-auto mb-4 hover:opacity-90 transition-colors duration-300 relative overflow-hidden`}>
                    <span className="text-white text-2xl font-bold relative z-10">{index + 1}</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-[#686868] text-sm mb-2">{card.subtitle}</p>
                  <p className="text-[#B99066] text-xl font-bold">{card.value}</p>
                  <p className="text-[#686868] text-xs">{card.footer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DefinitionSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-[#4B5563]">
          {data.content && data.content.map((p, i) => (
            p && typeof p === 'string' ? (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ) : (
              <p key={i}>{p}</p>
            )
          ))}

          {data.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {data.features.map((feature, i) => (
                <div key={i} className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-[#253F60]">
                  <h4 className="font-bold text-[#253F60] mb-2">{feature.title}</h4>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const UseCasesSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-l-4 ${index % 2 === 0 ? 'border-[#253F60]' : 'border-[#B99066]'} transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${index % 2 === 0 ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5'} rounded-bl-full`}></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] to-[#1a2d47]' : 'from-[#B99066] to-[#A67A5A]'} rounded-lg flex items-center justify-center shadow-lg text-white`}>
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-[#253F60] text-xl font-semibold">{item.title}</h3>
              </div>
              {item.description && typeof item.description === 'string' ? (
                <p className="text-[#686868] text-sm leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: item.description }} />
              ) : (
                <p className="text-[#686868] text-sm leading-relaxed relative z-10">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TaxSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-[#686868]">
          <div className="space-y-6 text-[#686868]">
            {data.points && data.points.map((point, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                  <span className="font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-[#112033] font-semibold mb-2">{point.title}</h4>
                  <p className="text-[#686868] text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-8 text-white overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            {data.exampleTitle && typeof data.exampleTitle === 'string' ? (
              <h3 className="text-xl font-semibold mb-6 text-center relative z-10 text-white" dangerouslySetInnerHTML={{ __html: data.exampleTitle }} />
            ) : (
              <h3 className="text-xl font-semibold mb-6 text-center relative z-10 text-white">{data.exampleTitle}</h3>
            )}

            <div className="space-y-4 relative z-10 text-white">
              {data.exampleItems && data.exampleItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-white">
                  <span className="text-white">{item.label}</span>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 relative z-10 text-white">
              <p className="text-lg text-white">
                {data.exampleResult && typeof data.exampleResult === 'string' ? (
                  <strong dangerouslySetInnerHTML={{ __html: data.exampleResult }} />
                ) : (
                  <strong>{data.exampleResult}</strong>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* Desktop: Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-[#686868]">
              <thead>
                <tr className="bg-[#253F60] text-white">
                  <th className="px-6 py-4 text-left whitespace-nowrap">Caractéristique</th>
                  <th className="px-6 py-4 text-center whitespace-nowrap">Donation Gratuite</th>
                  <th className="px-6 py-4 text-center whitespace-nowrap">Donation Onéreuse</th>
                </tr>
              </thead>
              <tbody>
                {data.rows && data.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 font-bold">{row.feature}</td>
                    <td className="px-6 py-4 text-center">{row.gratuite}</td>
                    <td className="px-6 py-4 text-center font-semibold text-[#B99066]">{row.onereuse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: Cards */}
        <div className="md:hidden space-y-4">
          {data.rows && data.rows.map((row, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#253F60]">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#253F60] mb-1">Caractéristique</h3>
                  <p className="text-base font-bold text-[#253F60]">{row.feature}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#253F60] mb-1">Donation Gratuite</h3>
                  <p className="text-sm text-[#686868]">{row.gratuite}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#253F60] mb-1">Donation Onéreuse</h3>
                  <p className="text-sm font-semibold text-[#B99066]">{row.onereuse}</p>
                </div>
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
    <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-white">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`relative bg-gradient-to-br ${index === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-8 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-white`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
              <h3 className="text-xl font-semibold mb-3 relative z-10 text-white">{item.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed relative z-10 text-white">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-2xl shadow-2xl p-8 text-white overflow-hidden text-center text-white">
          {data.ctaText && typeof data.ctaText === 'string' ? (
            <p className="text-lg font-semibold relative z-10 text-white" dangerouslySetInnerHTML={{ __html: data.ctaText }} />
          ) : (
            <p className="text-lg font-semibold relative z-10 text-white">{data.ctaText}</p>
          )}
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6 text-white">
          {data.title}
        </h2>
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto leading-relaxed text-white text-white">
          {data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {data.buttons && data.buttons.map((btn, i) => (
            <CTAButton
              key={i}
              externalUrl={btn.url || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
              variant={i === 0 ? "primary" : "secondary"}
              className={i === 1 ? "bg-white/20 border-white/30 hover:bg-white/30" : ""}
            >
              {btn.text}
            </CTAButton>
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function DonationOnereusePage() {
  let content = await getPageContent('patrimoine/donation-onereuse');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/donation-onereuse`, { cache: 'no-store' });
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
          <p className="text-xl mb-6">La page de Donation Onéreuse n'est pas configurée.</p>
          <CTAButton externalUrl="/" variant="white">Retour à l'accueil</CTAButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={content.hero} />
      {content.chart && (
        <section className="w-full bg-white py-16 sm:py-20 text-[#686868]">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title={content.chart.title || "Données clés - Donation onéreuse"}
              subtitle={content.chart.subtitle}
            />
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <PlacementChart
                title={content.chart.title || "Données clés - Donation onéreuse"}
                data={content.chart.data}
                chartImage={content.chart.image || "/images/azalee-patrimoine-donation.webp"}
              />
            </div>
          </div>
        </section>
      )}
      <DefinitionSection data={content.definition} />
      <UseCasesSection data={content.casUsage} />
      <TaxSection data={content.fiscalite} />
      <ComparisonSection data={content.comparaison} />
      <VisionSection data={content.vision} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}
