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
  let content = {};
  
  try {
    // Try direct DB access first
    content = await getPageContent('equipe');
  } catch (e) {
    console.error('[Equipe Page] getPageContent failed:', e);
  }

  // Always try API as fallback (works in both local and production)
  if (!content || Object.keys(content).length === 0) {
    try {
      // Use environment variable or construct from request
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                     process.env.NEXT_PUBLIC_API_URL || 
                     'https://azalee-patrimoine.fr';
      
      // Try /api/cms/content first (more reliable)
      const res = await fetch(`${baseUrl}/api/cms/content?path=equipe`, { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          content = json.data;
          console.log('[Equipe Page] Content loaded from API /api/cms/content');
        }
      } else {
        // Fallback to /api/cms/pages
        const res2 = await fetch(`${baseUrl}/api/cms/pages?path=equipe`, { 
          cache: 'no-store' 
        });
        if (res2.ok) {
          const json2 = await res2.json();
          if (json2.success && json2.data?.content) {
            content = json2.data.content;
            console.log('[Equipe Page] Content loaded from API /api/cms/pages');
          }
        }
      }
    } catch (e) {
      console.error('[Equipe Page] API fallback failed:', e);
    }
  } else {
    console.log('[Equipe Page] Content loaded from getPageContent');
  }

  // If still no content, use empty object (client component will handle it)
  if (!content || Object.keys(content).length === 0) {
    console.warn('[Equipe Page] No content found, using empty object');
    content = {};
  }

  return (
    <>
      <EquipeClient content={content} />
      <Footer />
    </>
  );
}
