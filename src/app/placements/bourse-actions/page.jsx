import React from "react";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';
import BourseActionsContent from './BourseActionsContent';
import CTAButton from "@/components/ui/CTAButton";

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('placements/bourse-actions');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/bourse-actions`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  
  return {
    title: content?.seo?.metaTitle || "La Bourse (actions, CAC 40, indices, ETF) : guide pour débuter | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Découvrez comment investir en Bourse : actions, indices, ETF, PEA, CTO. Guide complet pour débuter avec Azalée Patrimoine.",
  };
}

export default async function BourseActionsPage() {
  let content = await getPageContent('placements/bourse-actions');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=placements/bourse-actions`, { cache: 'no-store' });
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
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              {content.hero?.title}
            </h1>
            {content.hero?.subtitle && (
              <p className="text-white text-lg font-inter leading-relaxed mb-8 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: content.hero.subtitle }} />
            )}
            {content.hero?.note && (
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8 max-w-4xl mx-auto">
                <p className="text-white text-sm font-inter" dangerouslySetInnerHTML={{ __html: content.hero.note }} />
            </div>
            )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton 
              externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
              variant="primary"
            >
                {content.hero?.primaryButton || "Commencer à investir"}
            </CTAButton>
            <CTAButton 
              externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
              variant="secondary"
            >
                {content.hero?.secondaryButton || "Voir nos analyses"}
            </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Client Component for Interactive Content */}
      <BourseActionsContent content={content} />
      
      <Footer />
    </>
  );
} 
