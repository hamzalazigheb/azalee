import React from "react";
import Footer from "../../../components/common/Footer";
import Accordion from "@/components/ui/Accordion";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/assurance-vie');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/assurance-vie`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle || "Assurance-vie : fiscalité et transmission | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Tout savoir sur l'assurance-vie : fiscalité, transmission, clause bénéficiaire. L'outil patrimonial incontournable.",
  };
}

export default async function AssuranceViePage() {
  let content = await getPageContent('placements/assurance-vie');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/assurance-vie`, { cache: 'no-store' });
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
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <span className="inline-block bg-[#B99066] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                1 900 milliards d'encours
              </span>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                {content?.hero?.title}
              </h1>
              <p className="text-white text-lg leading-relaxed mb-4">
                {content?.hero?.subtitle}
              </p>
              <p className="text-white text-lg leading-relaxed mb-8">
                {content?.hero?.description}
              </p>
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67C52] transition-colors duration-200 text-lg"
              >
                {content?.hero?.button}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enveloppe Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content?.enveloppe?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content?.enveloppe?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {(content?.enveloppe?.contenus || []).map((contenu, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white text-base font-inter leading-relaxed">{contenu}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                <p className="text-xl sm:text-2xl font-cairo font-bold">{content?.enveloppe?.particularite}</p>
                <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiscalité Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
            {content?.fiscalite?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.fiscalite?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(content?.fiscalite?.criteres || []).map((critere, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#112033] text-sm font-medium">{critere}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-4">{content?.fiscalite?.avant2017?.title}</h3>
              <ul className="space-y-2">
                {(content?.fiscalite?.avant2017?.options || []).map((option, index) => (
                  <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                    {option}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-4">{content?.fiscalite?.depuis2017?.title}</h3>
              <ul className="space-y-2">
                {(content?.fiscalite?.depuis2017?.options || []).map((option, index) => (
                  <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
            <p className="text-lg font-medium">{content?.fiscalite?.abattement}</p>
          </div>
        </div>
      </section>

      {/* Transmission Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
            {content?.transmission?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.transmission?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {content?.transmission?.avant70 && (
              <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.transmission.avant70.title}</h3>
                <p className="text-[#112033] text-sm">{content.transmission.avant70.description}</p>
              </div>
            )}

            {content?.transmission?.apres70 && (
              <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.transmission.apres70.title}</h3>
                <p className="text-[#112033] text-sm">{content.transmission.apres70.description}</p>
              </div>
            )}
          </div>

          {content?.transmission?.attention && (
            <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-8 text-white text-center">
              <p className="text-lg font-medium">{content?.transmission?.attention}</p>
            </div>
          )}
        </div>
      </section>

      {/* Clause Maint Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content?.clause?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content?.clause?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {(content?.clause?.avantages || []).map((avantage, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white text-base font-inter leading-relaxed">{avantage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-cairo font-bold">Exemple concret</h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed">{content?.clause?.exemple}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jurisprudence Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
            {content?.jurisprudence?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.jurisprudence?.description}
          </p>

          <div className="space-y-6 mb-8">
            {(content?.jurisprudence?.points || []).map((point, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#112033] text-sm font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
            <p className="text-lg font-medium">{content?.jurisprudence?.resultat}</p>
          </div>
        </div>
      </section>

      {/* Conseil Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
            {content?.conseil?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
            {content?.conseil?.description}
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-[#112033] text-lg font-semibold mb-6 text-center">
              {content?.conseil?.accompagnement}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(content?.conseil?.services || []).map((service, index) => (
                <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[#112033] text-sm font-medium">{service}</p>
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
            <h2 className="text-[#112033] text-2xl lg:text-3xl font-semibold mb-4">
              {content?.cta?.title}
            </h2>
            <p className="text-[#686868] text-lg mb-8 max-w-3xl mx-auto">
              {content?.cta?.subtitle}
            </p>
            {content?.cta?.email && (
              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white mb-8">
                <h3 className="text-xl font-semibold mb-3">
                  <a
                    href={`mailto:${content?.cta?.email}`}
                    className="hover:text-[#B99066] transition-colors duration-200 underline decoration-2 underline-offset-4"
                  >
                    {content?.cta?.email}
                  </a>
                </h3>
                <p className="text-sm opacity-90">Audit gratuit de vos contrats d'assurance-vie</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67C52] transition-colors duration-200 text-lg"
              >
                {content?.cta?.primaryButton}
              </a>
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#253F60] text-[#253F60] px-8 py-4 rounded-lg font-medium hover:bg-[#253F60] hover:text-white transition-colors duration-200 text-lg"
              >
                {content?.cta?.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}