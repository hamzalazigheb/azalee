import Footer from "../../../components/common/Footer";
import CTAButton from "@/components/ui/CTAButton";
import { getPageContent } from '@/lib/cms-server';
import BilanCalculator from "./BilanCalculator";

export const revalidate = 0; // Ensure SSR

const HeroSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
            {data.title || 'Bilan patrimonial'}
          </h1>
          <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
            {data.subtitle}
          </p>
          {data.highlight && (
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto mb-8">
              <p className="text-white text-sm font-inter">
                {data.highlight}
              </p>
            </div>
          )}

          {data.image && (
            <div className="flex justify-center mb-8">
              <img
                src={data.image}
                alt={data.title}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {data.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {data.stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-[#686868] text-sm font-medium mb-2">{stat.label}</h3>
                <p className={`${index % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'} text-3xl font-bold`}>{stat.value}</p>
                <p className="text-[#686868] text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        )}

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

// Icons for the process steps
const stepIcons = [
  // Step 1: Listening/Understanding
  <svg key="1" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // Step 2: Analysis
  <svg key="2" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  // Step 3: Objectives/Target
  <svg key="3" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Step 4: Resources/Allocation
  <svg key="4" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Step 5: Strategy/Deployment
  <svg key="5" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  // Step 6: Follow-up/Monitoring
  <svg key="6" className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
];

const ContentSection = ({ data }) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[#112033] text-xl font-semibold mb-8">
              {data.listTitle}
            </h3>

            <div className="space-y-8">
              {data.items && data.items.map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#253F60]' : 'bg-[#B99066]'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {stepIcons[index] || <span className="text-white font-bold text-xl">{index + 1}</span>}
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-3">
                      {item.title}
                    </h4>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BilanCalculator data={data.calculator} />
        </div>
      </div>
    </section>
  );
};

// Component icons for the cards
const componentIcons = [
  // Assets/Patrimoine
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  // Family/Protection
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  // Taxes/Fiscalité
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
  </svg>,
  // Retirement
  <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Investments
  <svg key="5" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>,
  // Insurance/Protection
  <svg key="6" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

const ComponentsSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20 text-[#686868]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-[#686868]">
          {data.items && data.items.map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] to-[#3A5A7A]' : 'from-[#B99066] to-[#A67C52]'} rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className={`${index % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'}`}>
                    {componentIcons[index] || <span className="text-2xl font-bold">{index + 1}</span>}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              </div>
              <p className="text-sm mb-4 relative z-10 opacity-90">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-[#F2F2F2] py-16 sm:py-20">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.plans && data.plans.map((plan, index) => (
            <div key={index} className={`bg-gradient-to-br ${index === 0 ? 'from-[#253F60] to-[#3A5A7A]' : index === 1 ? 'from-[#B99066] to-[#A67C52]' : 'from-[#253F60] to-[#B99066]'} rounded-lg shadow-lg p-8 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className={`${index === 1 ? 'text-[#B99066]' : 'text-[#253F60]'} text-2xl font-bold`}>{index + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-lg font-bold mb-4">{plan.price}</p>
              </div>
              <div className="space-y-4 relative z-10">
                {plan.features && plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-green-300 text-xl font-bold">✓</span>
                    <p className="text-sm opacity-90">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {data.bottomNote && (
          <div className="mt-12 bg-white border-l-4 border-[#253F60] p-6 rounded-r-lg">
            <p className="text-[#112033] text-center font-semibold text-lg">
              {data.bottomNote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ExampleSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#112033] text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            {data.title}
          </h2>
          <p className="text-[#686868] text-lg max-w-4xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.leftTitle}
            </h3>

            <div className="space-y-4 mb-6">
              {data.leftItems && data.leftItems.map((item, i) => (
                <div key={i} className={`flex justify-between items-center p-4 ${i % 2 === 0 ? 'bg-[#F0F9FF]' : 'bg-[#FFF8E1]'} rounded-lg`}>
                  <span className="text-[#112033] font-medium">{item.label}</span>
                  <span className={`${i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'} font-bold text-lg`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <h4 className="text-orange-800 font-semibold mb-2">{data.leftNoteTitle}</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                {data.leftNotes && data.leftNotes.map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              {data.rightTitle}
            </h3>

            <div className="space-y-4 mb-6">
              {data.rightItems && data.rightItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl font-bold">{i + 1}</span>
                  <div>
                    <p className="text-green-800 font-medium text-sm">{item.title}</p>
                    <p className="text-green-700 text-xs">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h4 className="text-green-800 font-semibold mb-2">{data.rightNoteTitle}</h4>
              <p className="text-green-700 text-sm">
                {data.rightNote}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-xl font-semibold mb-6">
            {data.conclusion}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.conclusionCards && data.conclusionCards.map((card, i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm">
                  <strong>{card.title}</strong><br />
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = ({ data }) => {
  if (!data) return null;
  return (
    <section className="w-full bg-gradient-to-br from-[#253F60] to-[#B99066] py-16 sm:py-20">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
          {data.title}
        </h2>
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
          {data.subtitle}
        </p>

        <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            {data.listTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {data.items && data.items.map((item, i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-white text-center font-medium">
                  {item}
                </p>
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

        {data.bottomNote && (
          <div className="mt-8 bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto">
            <p className="text-white text-center font-semibold">
              <strong>{data.bottomNote}</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default async function BilanPage() {
  let content = await getPageContent('patrimoine/bilan');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/bilan`, { cache: 'no-store' });
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
          <p className="text-xl mb-6">La page de Bilan Patrimonial n'est pas configurée.</p>
          <CTAButton externalUrl="/" variant="white">Retour à l'accueil</CTAButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={content.hero} />
      <ContentSection data={content.pourquoi} />
      <ComponentsSection data={content.contenu} />
      <PricingSection data={content.tarifs} />
      <ExampleSection data={content.exemple} />
      <FinalCtaSection data={content.finalCta} />
      <Footer />
    </>
  );
}