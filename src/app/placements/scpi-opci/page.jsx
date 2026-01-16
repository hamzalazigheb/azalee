import React from "react";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';
import ScpiOpciContent from './ScpiOpciContent';
import ScpiOpciHeroButtons from './ScpiOpciHeroButtons';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/scpi-opci');
  
  // Fallback API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/scpi-opci`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  
  return {
    title: content?.seo?.metaTitle || "SCPI / OPCI : investissement immobilier collectif | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Découvrez les SCPI et OPCI : avantages, fiscalité, types, liquidité. Solution marché secondaire Azalée Patrimoine pour retrouver de la liquidité.",
  };
}

export default async function ScpiOpciPage() {
  let content = await getPageContent('placements/scpi-opci');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      console.log('Using API fallback for SCPI content...');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/scpi-opci`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }

  // Error state if no content
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
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              {content.hero?.title && (
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
                  {content.hero.title}
              </h1>
              )}
              {content.hero?.subtitle && (
                <p className="text-white text-lg font-inter leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.hero.subtitle }} />
              )}
              {content.hero?.description && (
                <p className="text-white text-base font-inter leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: content.hero.description }} />
              )}
              {content.hero?.note && (
              <div className="bg-white/20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                  <p className="text-white text-sm font-inter" dangerouslySetInnerHTML={{ __html: content.hero.note }} />
              </div>
              )}
              <ScpiOpciHeroButtons content={content} />
            </div>
            
            {/* Right: SCPI/OPCI Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* SCPI Card */}
                {content.heroCards?.scpi && (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#253F60] rounded-lg flex items-center justify-center mx-auto mb-4 hover:bg-[#1A2F4A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">SCPI</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">SCPI</h3>
                    <p className="text-[#686868] text-sm mb-2">{content.heroCards.scpi.description}</p>
                    <p className="text-[#B99066] text-xl font-bold">{content.heroCards.scpi.yield}</p>
                    <p className="text-[#686868] text-xs">{content.heroCards.scpi.yieldLabel}</p>
                </div>
                )}

                {/* OPCI Card */}
                {content.heroCards?.opci && (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#B99066] rounded-lg flex items-center justify-center mx-auto mb-4 hover:bg-[#A67A5A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">OPCI</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">OPCI</h3>
                    <p className="text-[#686868] text-sm mb-2">{content.heroCards.opci.description}</p>
                    <p className="text-[#B99066] text-xl font-bold">{content.heroCards.opci.yield}</p>
                    <p className="text-[#686868] text-xs">{content.heroCards.opci.yieldLabel}</p>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Component for Interactive Content */}
      <ScpiOpciContent content={content} />
      
      <Footer />
    </>
  );
} 
