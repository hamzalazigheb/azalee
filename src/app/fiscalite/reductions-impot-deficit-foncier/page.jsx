import React from "react";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from '@/components/ui/CTAButton';
import { getPageContent } from '@/lib/cms-server';

export async function generateMetadata() {
  let content = await getPageContent('fiscalite/reductions-impot-deficit-foncier');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=fiscalite/reductions-impot-deficit-foncier`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle || "Déficit Foncier et Réductions d'Impôt | Azalée Patrimoine",
    description: "Le déficit foncier permet une double optimisation : réduction de l'impôt sur le revenu et diminution des prélèvements sociaux sur les revenus fonciers.",
  };
}

export default async function ReductionsImpotDeficitFoncierPage() {
  let content = {};
  
  try {
    content = await getPageContent('fiscalite/reductions-impot-deficit-foncier');
  } catch (e) {
    console.error('[Deficit Foncier] getPageContent failed:', e);
  }

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                     process.env.NEXT_PUBLIC_API_URL || 
                     'http://localhost:4028';
      
      // Try /api/cms/content first
      const res = await fetch(`${baseUrl}/api/cms/content?path=fiscalite/reductions-impot-deficit-foncier`, { 
        cache: 'no-store' 
      });
      
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          content = json.data;
        }
      } else {
        // Fallback to /api/cms/pages
        const res2 = await fetch(`${baseUrl}/api/cms/pages?path=fiscalite/reductions-impot-deficit-foncier`, { 
          cache: 'no-store' 
        });
        if (res2.ok) {
          const json2 = await res2.json();
          if (json2.success && json2.data?.content) {
            content = json2.data.content;
          }
        }
      }
    } catch (e) {
      console.error('[Deficit Foncier] API fallback failed:', e);
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
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {content?.hero?.title}
              </h1>
              <p className="text-lg text-white mb-4 leading-relaxed">
                {content?.hero?.subtitle}
              </p>
              <p className="text-white mb-8">
                {content?.hero?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.quickStats?.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.quickStats.stats.map((stat, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="text-3xl sm:text-4xl font-bold mb-2 relative z-10">{stat.value}</div>
                <div className="text-base sm:text-lg font-semibold mb-2 relative z-10">{stat.label}</div>
                <div className="text-sm sm:text-base text-white/90 relative z-10">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.comparison?.title}
            subtitle={content?.comparison?.description}
          />
          
          {/* Desktop: Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#253F60] to-[#1a2d47]">
                  <tr>
                    {content.comparison?.table?.headers?.map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison?.table?.rows?.map((row, index) => (
                    <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-[#253F60]">{row.mecanisme}</td>
                      <td className="px-6 py-4 text-sm text-[#686868]">{row.effet}</td>
                      <td className="px-6 py-4 text-sm text-[#686868]">{row.benefice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {content.comparison?.table?.rows?.map((row, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#253F60]">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">
                      {content.comparison?.table?.headers?.[0] || 'Mécanisme'}
                    </h3>
                    <p className="text-base font-medium text-[#253F60]">{row.mecanisme}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">
                      {content.comparison?.table?.headers?.[1] || 'Effet'}
                    </h3>
                    <p className="text-sm text-[#686868]">{row.effet}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">
                      {content.comparison?.table?.headers?.[2] || 'Bénéfice'}
                    </h3>
                    <p className="text-sm text-[#686868]">{row.benefice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Profile Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.investorProfile?.title}
            subtitle={content?.investorProfile?.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.investorProfile?.profiles?.map((profile, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-lg sm:text-xl font-bold">✓</div>
                  <div className="text-base sm:text-lg font-semibold text-white leading-relaxed">{profile}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.conditions?.title}
            subtitle={content?.conditions?.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.conditions?.conditions?.map((condition, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-lg sm:text-xl font-bold">✓</div>
                  <div className="text-base sm:text-lg font-semibold text-white leading-relaxed">{condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
            {content?.cta?.title}
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            {content?.cta?.description}
          </p>
          <CTAButton 
            externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
            className="px-8 py-3"
          >
            Planifiez votre consultation gratuite
          </CTAButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
