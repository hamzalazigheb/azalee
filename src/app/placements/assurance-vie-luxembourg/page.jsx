import React from "react";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/assurance-vie-luxembourg');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/assurance-vie-luxembourg`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle || "Assurance-vie Luxembourgeoise : expatriation | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Tout savoir sur l'assurance-vie luxembourgeoise : neutralité fiscale, sécurité, multi-devises. Idéal pour les expatriés.",
  };
}

export default async function AssuranceVieLuxembourgPage() {
  let content = await getPageContent('placements/assurance-vie-luxembourg');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/assurance-vie-luxembourg`, { cache: 'no-store' });
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
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Main Title */}
              <h1 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content?.hero?.title}
              </h1>

              {/* Description */}
              <p className="text-[#374151] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                {content?.hero?.subtitle}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <button className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200">
                  {content?.hero?.button}
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-9 sm:h-9">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  Version haut de gamme
                </h2>
              </div>

              {/* Floating Price Card */}
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">250k€ →<br /></span>
                  <span className="sm:hidden">250k€</span>
                  <span className="hidden sm:block">Ticket d'entrée</span>
                </div>
              </div>

              {/* Services List */}
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Neutralité fiscale internationale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Multi-devises et fonds dédiés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Transmission internationale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Protection renforcée</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
            {content?.fonctionnement?.title}
          </h2>
          <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.fonctionnement?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(content?.fonctionnement?.points || []).map((point, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#374151] text-sm font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
            <p className="text-lg font-medium">{content?.fonctionnement?.difference}</p>
          </div>
        </div>
      </section>

      {/* Neutralité Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
            {content?.neutralite?.title}
          </h2>
          <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.neutralite?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(content?.neutralite?.points || []).map((point, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#374151] text-sm font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#253F60]">
            <h3 className="text-[#253F60] text-lg font-semibold mb-4">{content?.neutralite?.exemple?.titre}</h3>
            <p className="text-[#374151] text-sm mb-4">{content?.neutralite?.exemple?.description}</p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-4 text-white">
              <p className="text-sm font-medium">{content?.neutralite?.exemple?.conclusion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Souplesse Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
            {content?.souplesse?.title}
          </h2>
          <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.souplesse?.description}
          </p>

          <div className="space-y-6 mb-8">
            {(content?.souplesse?.avantages || []).map((avantage, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#374151] text-sm font-medium">{avantage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-8 text-white text-center">
            <p className="text-lg font-medium">{content?.souplesse?.exemple}</p>
          </div>
        </div>
      </section>

      {/* Avantages & Inconvénients Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#253F60] text-2xl font-semibold mb-8">
                {content?.avantages?.title}
              </h2>
              <div className="space-y-6">
                {(content?.avantages?.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#374151] text-sm font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[#253F60] text-2xl font-semibold mb-8">
                {content?.inconvenients?.title}
              </h2>
              <div className="space-y-6">
                {(content?.inconvenients?.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-[#374151] text-sm font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl font-semibold text-center mb-8">
            {content?.conseil?.title}
          </h2>
          <p className="text-[#374151] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.conseil?.description}
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-[#253F60] text-lg font-semibold mb-6 text-center">
              Elle s'adresse principalement aux :
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content?.conseil?.cibles || []).map((cible, index) => (
                <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[#374151] text-sm font-medium">{cible}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-[#253F60] text-lg font-semibold mb-6 text-center">
              {content?.conseil?.accompagnement}
            </h3>
            <div className="space-y-4">
              {(content?.conseil?.services || []).map((service, index) => (
                <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#B99066] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[#374151] text-sm font-medium">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
            <p className="text-lg font-medium">{content?.conseil?.conclusion}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F2F2F2] to-[#E5E5E5]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <h2 className="text-[#253F60] text-2xl lg:text-3xl font-semibold mb-4">
              {content?.cta?.title}
            </h2>
            <p className="text-[#374151] text-lg mb-8 max-w-3xl mx-auto">
              {content?.cta?.subtitle}
            </p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-semibold mb-3">
                <a
                  href={`mailto:${content?.cta?.email}`}
                  className="hover:text-[#B99066] transition-colors duration-200 underline decoration-2 underline-offset-4"
                >
                  {content?.cta?.email}
                </a>
              </h3>
              <p className="text-sm opacity-90">Stratégie patrimoniale internationale</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 text-lg">
                {content?.cta?.primaryButton}
              </button>
              <button className="border-2 border-[#B99066] text-[#B99066] px-8 py-4 rounded-lg font-medium hover:bg-[#B99066] hover:text-white transition-colors duration-200 text-lg">
                {content?.cta?.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}