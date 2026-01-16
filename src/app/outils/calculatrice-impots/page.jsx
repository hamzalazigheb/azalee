import { getPageContent } from '@/lib/cms-server';
import Footer from '@/components/common/Footer';
import CalculatriceImpotsClient from './CalculatriceImpotsClient';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('outils/calculatrice-impots');
  
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=outils/calculatrice-impots`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  
  return {
    title: content?.seo?.metaTitle || "calculatriceImpots | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Découvrez nos conseils et services pour calculatriceimpots.",
  };
}

export default async function CalculatriceImpotsPage() {
  let content = await getPageContent('outils/calculatrice-impots');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=outils/calculatrice-impots`, { cache: 'no-store' });
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
      <CalculatriceImpotsClient content={content} />
      <Footer />
    </>
  );
}
