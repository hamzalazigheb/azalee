import React from "react";
import Footer from "../../../components/common/Footer";
import Accordion from "@/components/ui/Accordion";
import { getPageContent } from '@/lib/cms-server';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/contrat-capitalisation');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/contrat-capitalisation`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle || "Contrat de Capitalisation : Fonctionnement et Avantages | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Tout savoir sur le contrat de capitalisation : avantages successoraux, fiscalité, et intérêt pour les sociétés (SCI).",
  };
}

export default async function ContratCapitalisationPage() {
  let content = await getPageContent('placements/contrat-capitalisation');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/contrat-capitalisation`, { cache: 'no-store' });
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
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 transform skew-x-12 translate-x-20 bg-white" />
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold font-cairo leading-tight">
                {content?.hero?.title}
              </h1>
              <p className="text-lg opacity-90 leading-relaxed font-inter">
                {content?.hero?.subtitle}
              </p>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-sm font-medium">
                  {content?.hero?.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-[#B99066] hover:bg-[#A67A5A] text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {content?.hero?.button}
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#253F60] text-white rounded-lg font-semibold transition-all duration-300">
                  {content?.hero?.secondaryButton}
                </button>
              </div>
            </div>

            {/* Features Grid - Right Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(content.features || []).map((feature, idx) => (
                <div key={idx} className="bg-white/95 backdrop-blur rounded-xl p-6 shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-[#253F60]">
                  <h3 className="text-[#253F60] font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-xs font-semibold text-[#B99066] uppercase tracking-wider mb-3">{feature.subtitle}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium text-gray-800">{feature.value}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{feature.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Points Communs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#253F60] mb-6">{content?.pointsCommuns?.title}</h2>
            <p className="text-gray-600 text-lg">{content?.pointsCommuns?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(content?.pointsCommuns?.points || []).map((point, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#E8F4F8] rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl text-[#253F60] font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#253F60] mb-4">{point.title}</h3>
                <ul className="space-y-3">
                  {(point.items || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B99066] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#253F60] rounded-xl p-6 text-center text-white max-w-2xl mx-auto shadow-lg">
            <p className="font-medium text-lg">{content?.pointsCommuns?.conclusion}</p>
          </div>
        </div>
      </section>

      {/* Différences Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 sticky top-24">
              <h2 className="text-3xl md:text-4xl font-bold text-[#253F60] leading-tight mb-8">
                {content?.differences?.title}
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#B99066]">
                <h4 className="font-bold text-[#253F60] mb-4">En résumé :</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Assurance-vie</p>
                    <p className="text-sm font-semibold text-gray-800">{content?.differences?.resume?.assuranceVie}</p>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contrat de Capitalisation</p>
                    <p className="text-sm font-semibold text-gray-800">{content?.differences?.resume?.contratCapi}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-8">
              {(content?.differences?.points || []).map((point, index) => (
                <div key={index} className="group bg-white border border-gray-100 rounded-2xl p-8 hover:border-[#B99066] transition-colors duration-300 shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#F0F5F9] text-[#253F60] text-xs font-bold rounded-full uppercase tracking-wider">Différence {index + 1}</span>
                    <h3 className="text-xl font-bold text-[#253F60]">{point.title}</h3>
                  </div>
                  <h4 className="text-[#B99066] font-semibold mb-3">{point.subtitle}</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{point.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#253F60] bg-gray-50 p-3 rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {point.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCI Section */}
      <section className="py-20 bg-[#112033] text-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{content?.sci?.title}</h2>
              <p className="text-gray-300 text-lg mb-8">{content?.sci?.description}</p>

              <div className="space-y-6">
                {(content?.sci?.avantages || []).map((av, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                      <span className="text-xl font-bold text-[#B99066]">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{av.title}</h3>
                      <p className="text-gray-400 text-sm">{av.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066] rounded-full filter blur-[100px] opacity-20" />
              <div className="relative z-10">
                <span className="px-3 py-1 bg-[#B99066] text-white text-xs font-bold rounded-full uppercase mb-6 inline-block">Cas pratique</span>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Contexte</p>
                    <p className="font-medium text-lg leading-relaxed">{content?.sci?.exemple?.contexte}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Stratégie</p>
                    <p className="text-gray-300 leading-relaxed">{content?.sci?.exemple?.action}</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mt-4">
                    <p className="text-green-300 font-semibold text-sm">✓ {content?.sci?.exemple?.resultat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple Concret Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">{content?.exempleConcret?.title}</h2>
            <p className="text-xl text-[#B99066] font-medium">{content?.exempleConcret?.scenario}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {(content?.exempleConcret?.comparaison || []).map((comp, idx) => (
              <div key={idx} className={`bg-white rounded-2xl p-8 shadow-xl ${idx === 0 ? 'border-t-4 border-[#253F60]' : 'border-t-4 border-[#B99066]'}`}>
                <h3 className="text-2xl font-bold text-[#253F60] text-center mb-8">{comp.type}</h3>
                <div className="space-y-4">
                  {comp.data.map((d, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 text-sm font-medium">{d.label}</span>
                      <span className="text-gray-900 font-bold text-right">{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-8 p-4 rounded-xl text-center text-sm font-medium ${idx === 0 ? 'bg-[#E8F4F8] text-[#253F60]' : 'bg-[#FFF4E6] text-[#B99066]'}`}>
                  {content?.exempleConcret?.resultat[idx].description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages/Inconvénients Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#253F60] mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                Avantages
              </h3>
              <div className="space-y-6">
                {(content?.avantagesInconvenients?.avantages || []).map((adv, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800">{adv.title}</p>
                      {adv.detail && <p className="text-sm text-gray-500 mt-1">{adv.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#253F60] mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 font-bold">✕</span>
                </div>
                Inconvénients
              </h3>
              <div className="space-y-6">
                {(content?.avantagesInconvenients?.inconvenients || []).map((inc, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800">{inc.title}</p>
                      {inc.detail && <p className="text-sm text-gray-500 mt-1">{inc.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil & CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#253F60] mb-8">{content?.conseil?.title}</h2>

          <div className="bg-[#253F60] text-white rounded-2xl p-8 lg:p-12 shadow-2xl overflow-hidden relative">

            <div className="relative z-10">
              <p className="text-lg mb-8 opacity-90">{content?.conseil?.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {(content?.conseil?.points || []).map((pt, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur font-medium text-sm">
                    {pt.title}
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-4">{content?.cta?.title}</h3>
              <p className="mb-8 opacity-90">{content?.cta?.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-[#B99066] hover:bg-[#A67A5A] text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  {content?.cta?.primaryButton}
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#253F60] text-white rounded-lg font-bold transition-all">
                  {content?.cta?.secondaryButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}