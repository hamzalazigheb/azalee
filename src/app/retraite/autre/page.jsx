import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

export async function generateMetadata() {
  let content = await getPageContent('retraite/autre');
  
  // Fallback: Try fetching via API
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/autre`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function AutreRetraitePage() {
  let content = await getPageContent('retraite/autre');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=retraite/autre`, { cache: 'no-store' });
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
          <div className="text-center mb-12">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-6">
              {content?.hero?.title}
            </h1>
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed max-w-4xl mx-auto">
              {content?.hero?.subtitle}
            </p>
          </div>
          
          {/* Solutions Grid */}
          {content?.solutions?.solutions && content.solutions.solutions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {content.solutions.solutions.map((solution, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">{solution.title}</h3>
                  <p className="text-[#686868] text-sm">{solution.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/80 text-sm mb-12">
              Aucune solution disponible
            </div>
          )}
        </div>
      </section>

      {/* Solutions détaillées Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content?.solutions?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Découvrez les alternatives pour diversifier votre épargne retraite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content?.solutions?.solutions || []).map((solution, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10">
                <div className="flex items-start gap-6">
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-3">{solution.title}</h3>
                      <p className="text-white text-lg mb-3 font-semibold">{solution.description}</p>
                      <p className="text-white/90 text-base leading-relaxed">{solution.details}</p>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectif Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                <h2 className="text-white text-2xl sm:text-3xl font-cairo font-bold">
              {content?.objectif?.title}
            </h2>
                <div className="w-1 h-12 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
              </div>
              <p className="text-white text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              {content?.objectif?.description}
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
            {content?.cta?.title}
          </h2>
              <p className="text-white text-base sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {content?.cta?.subtitle}
          </p>
          <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
            Planifiez votre consultation gratuite
          </CTAButton>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
