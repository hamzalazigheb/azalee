import React from "react";
import Footer from "../../../components/common/Footer";
import Accordion from "@/components/ui/Accordion";
import CompteTitresButtons from "./CompteTitresButtons";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/compte-titres');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/compte-titres`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle || "Compte-Titres Ordinaire (CTO) : définition et fiscalité | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Tout savoir sur le Compte-Titres Ordinaire (CTO) : fiscalité (PFU), avantages, inconvénients et comparaison avec le PEA.",
  };
}

export default async function CompteTitresPage() {
  let content = await getPageContent('placements/compte-titres');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/compte-titres`, { cache: 'no-store' });
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
      <section className="relative w-full min-h-[500px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              {content?.hero?.title}
            </h1>
            <p className="text-white text-lg font-inter leading-relaxed mb-8">
              {content?.hero?.subtitle}
            </p>
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8 max-w-3xl mx-auto">
              <p className="text-white text-sm font-inter">
                {content?.hero?.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CompteTitresButtons content={content} variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Définition Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content?.definition?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content?.definition?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {(content?.definition?.contenus || []).map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                  <p className="text-[#112033] font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center shadow-lg">
            <p className="text-lg font-medium">{content?.definition?.conclusion}</p>
          </div>
        </div>
      </section>

      {/* Fiscalité Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl lg:text-3xl font-semibold text-center mb-8">
            {content?.fiscalite?.title}
          </h2>
          <p className="text-[#686868] text-lg text-center mb-12 max-w-3xl mx-auto">
            {content?.fiscalite?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {(content?.fiscalite?.points || []).map((point, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#253F60]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#253F60] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#374151] text-lg font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center border-l-4 border-[#B99066]">
            <p className="text-[#112033] font-semibold">{content?.fiscalite?.conclusion}</p>
          </div>
        </div>
      </section>

      {/* Avantages & Inconvénients Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[#253F60] text-2xl font-semibold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                {content?.avantages?.title}
              </h2>
              <div className="space-y-4">
                {(content?.avantages?.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#374151] text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[#253F60] text-2xl font-semibold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">✕</span>
                {content?.inconvenients?.title}
              </h2>
              <div className="space-y-4">
                {(content?.inconvenients?.points || []).map((point, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#374151] text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spéculation Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#112033] text-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">{content?.speculation?.title}</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{content?.speculation?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {(content?.speculation?.produits || []).map((produit, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <p className="font-medium text-center">{produit}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#B99066] rounded-xl p-8 mb-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Mise en garde</h3>
              <p className="mb-4">{content?.speculation?.avantage}</p>
              <p className="mb-2 font-semibold">Profil requis :</p>
              <ul className="list-disc list-inside space-y-1 text-sm opacity-90 ml-4">
                {(content?.speculation?.conditions || []).map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm italic">{content?.speculation?.conclusion}</p>
        </div>
      </section>

      {/* Utilisation Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl font-semibold text-center mb-12">
            {content?.utilisation?.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content?.utilisation?.cas || []).map((cas, index) => (
              <div key={index} className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-8 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#253F60] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-md">
                  {index + 1}
                </div>
                <p className="text-[#374151] font-medium leading-relaxed">{cas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl font-semibold text-center mb-12">
            {content?.comparaison?.title}
          </h2>

          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#253F60] text-white">
                  <th className="p-4 sm:p-6 text-lg font-semibold border-b border-[#3A5A7A] whitespace-nowrap">Critères</th>
                  <th className="p-4 sm:p-6 text-lg font-semibold border-b border-[#3A5A7A] whitespace-nowrap">Compte-Titres (CTO)</th>
                  <th className="p-4 sm:p-6 text-lg font-semibold border-b border-[#3A5A7A] whitespace-nowrap">Assurance-vie</th>
                </tr>
              </thead>
              <tbody>
                {(content?.comparaison?.tableau || []).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 sm:p-6 font-semibold text-[#253F60] border-b border-gray-100">{row.critere}</td>
                    <td className="p-4 sm:p-6 text-[#374151] border-b border-gray-100">{row.cto}</td>
                    <td className="p-4 sm:p-6 text-[#374151] border-b border-gray-100">{row.assurance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {(content?.comparaison?.tableau || []).map((row, index) => (
              <div key={index} className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-[#253F60]">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">Critères</h3>
                    <p className="text-base font-semibold text-[#253F60]">{row.critere}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">Compte-Titres (CTO)</h3>
                    <p className="text-sm text-[#374151]">{row.cto}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#253F60] mb-1">Assurance-vie</h3>
                    <p className="text-sm text-[#374151]">{row.assurance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#253F60] rounded-xl p-6 text-center text-white">
            <p className="text-lg font-medium">{content?.comparaison?.conclusion}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl font-semibold text-center mb-12">{content?.faq?.title}</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {(content?.faq?.questions || []).map((item, index) => (
              <Accordion key={index} title={item.question}>
                <div className="prose text-gray-600 max-w-none">
                  <p>{item.answer}</p>
                  {/* Render optional extended content if present */}
                  {item.precision && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm"><strong>Précision :</strong> {item.precision}</p>
                    </div>
                  )}
                  {item.exemple && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg italic">
                      <p className="text-sm">{item.exemple}</p>
                    </div>
                  )}
                  {item.points && (
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {item.points.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  )}
                  {item.produits && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Produits disponibles :</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.produits.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* Conseil & CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#253F60] to-[#1a2d47] text-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-6">{content?.conseil?.title}</h2>
          <p className="text-lg opacity-90 mb-4 max-w-3xl mx-auto">{content?.conseil?.description}</p>
          <p className="text-lg font-medium text-[#B99066] mb-12">{content?.conseil?.strategie}</p>

          <div className="bg-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm max-w-3xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold mb-4">{content?.cta?.title}</h3>
            <p className="opacity-90 mb-8">{content?.cta?.subtitle}</p>
            <CompteTitresButtons content={content} variant="cta" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}