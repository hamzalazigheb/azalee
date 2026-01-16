import EquipeClient from './client';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../components/common/Footer';

export const revalidate = 0; // SSR

export async function generateMetadata() {
  const content = await getPageContent('equipe');
  
  return {
    title: content?.seo?.metaTitle || 'Notre Équipe | Azalée Patrimoine',
    description: content?.seo?.metaDescription || 'Rencontrez les experts d\'Azalée Patrimoine : des conseillers certifiés et passionnés, dédiés à la réussite de vos projets financiers et patrimoniaux.',
  };
}

export default async function EquipePage() {
  let content = await getPageContent('equipe');

  // Fallback: Try fetching via API if direct DB access returns nothing
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(`${apiUrl}/api/cms/pages?path=equipe`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }

  // If still no content, use empty object (client component will handle it)
  if (!content || Object.keys(content).length === 0) {
    content = {};
  }

  return (
    <>
      <EquipeClient content={content} />
      <Footer />
    </>
  );
}
