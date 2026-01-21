'use client';
import React, { useState, useEffect } from "react";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from '@/components/ui/CTAButton';
import { getApiPath } from '@/lib/paths';

export default function MonumentHistoriquePage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(getApiPath(`/cms/content?path=fiscalite/monument-historique&t=${Date.now()}`), {
          cache: 'no-store',
        });
        const data = await response.json();
        if (data.success && data.data && Object.keys(data.data).length > 0) {
          setContent(data.data);
        } else {
          // Try API fallback
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
          const res = await fetch(`${apiUrl}/api/cms/pages?path=fiscalite/monument-historique`, { cache: 'no-store' });
          const json = await res.json();
          if (json.success && json.data?.content) {
            setContent(json.data.content);
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#253F60] to-[#B99066]">
        <div className="text-center text-white p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Chargement...</p>
        </div>
      </div>
    );
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

      {/* Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4 text-center">
              {content?.overview?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto text-center">
              {content?.overview?.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.overview.keyPoints.map((point, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center text-white`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="text-lg font-semibold relative z-10 leading-relaxed">{point}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.benefits?.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.benefits.benefits.map((benefit, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center text-white`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl font-bold mb-4">
                      {benefit.percentage || benefit.amount || benefit.duration}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.conditions?.title}
            subtitle={content?.conditions?.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.conditions.points.map((point, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="flex items-start relative z-10">
                    <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                    <div className="text-lg font-semibold text-white leading-relaxed">{point}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {content?.cta?.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            {content?.cta?.description}
          </p>
          <CTAButton 
            externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
            className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold"
          >
            {content?.cta?.buttonText}
          </CTAButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
