/**
 * Script pour convertir les pages client-side au pattern SCI
 * Pour les pages avec interactivité complexe, crée un composant client séparé
 */

const fs = require('fs');
const path = require('path');

// Pages à convertir (client-side → SSR)
const pagesToConvert = [
  { path: 'src/app/fiscalite/impot-sur-le-revenu/page.jsx', cmsPath: 'fiscalite/impot-sur-le-revenu' },
  { path: 'src/app/fiscalite/declaration-impots/page.jsx', cmsPath: 'fiscalite/declaration-impots' },
  { path: 'src/app/fiscalite/tranches-baremes-plafonds/page.jsx', cmsPath: 'fiscalite/tranches-baremes-plafonds' },
  { path: 'src/app/fiscalite/lois-fiscales/page.jsx', cmsPath: 'fiscalite/lois-fiscales' },
  { path: 'src/app/fiscalite/tmi-prelevements-sociaux/page.jsx', cmsPath: 'fiscalite/tmi-prelevements-sociaux' },
  { path: 'src/app/placements/pea-per/page.jsx', cmsPath: 'placements/pea-per' },
  { path: 'src/app/placements/taux-interets/page.jsx', cmsPath: 'placements/taux-interets' },
  { path: 'src/app/placements/etf-produits-financiers/page.jsx', cmsPath: 'placements/etf-produits-financiers' },
  { path: 'src/app/outils-financiers/guide-defiscalisation/page.jsx', cmsPath: 'outils-financiers/guide-defiscalisation' },
  { path: 'src/app/outils/calculatrice-impots/page.jsx', cmsPath: 'outils/calculatrice-impots' },
  { path: 'src/app/outils/calculs-financiers/page.jsx', cmsPath: 'outils/calculs-financiers' },
  { path: 'src/app/outils-financiers/assurance-vie-vs-per/page.jsx', cmsPath: 'outils-financiers/assurance-vie-vs-per' },
  { path: 'src/app/outils/simulateur-investissement/page.jsx', cmsPath: 'outils/simulateur-investissement' },
  { path: 'src/app/outils/guides-pratiques/page.jsx', cmsPath: 'outils/guides-pratiques' },
];

function generateSSRPage(cmsPath, hasInteractivity, clientComponentName) {
  const pageName = cmsPath.split('/').pop().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const functionName = pageName.charAt(0).toUpperCase() + pageName.slice(1) + 'Page';
  
  if (hasInteractivity) {
    return `import { getPageContent } from '@/lib/cms-server';
import Footer from '@/components/common/Footer';
import ${clientComponentName} from './${clientComponentName}';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('${cmsPath}');
  
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(\`\${apiUrl}/api/cms/pages?path=${cmsPath}\`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  
  return {
    title: content?.seo?.metaTitle || "${pageName} | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Découvrez nos conseils et services pour ${pageName.toLowerCase()}.",
  };
}

export default async function ${functionName}() {
  let content = await getPageContent('${cmsPath}');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(\`\${apiUrl}/api/cms/pages?path=${cmsPath}\`, { cache: 'no-store' });
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
      <${clientComponentName} content={content} />
      <Footer />
    </>
  );
}
`;
  } else {
    return `import { getPageContent } from '@/lib/cms-server';
import Footer from '@/components/common/Footer';

export const revalidate = 0;

export async function generateMetadata() {
  let content = await getPageContent('${cmsPath}');
  
  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(\`\${apiUrl}/api/cms/pages?path=${cmsPath}\`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data?.content) {
        content = json.data.content;
      }
    } catch (e) {
      console.error('API fallback failed:', e);
    }
  }
  
  return {
    title: content?.seo?.metaTitle || "${pageName} | Azalée Patrimoine",
    description: content?.seo?.metaDescription || "Découvrez nos conseils et services.",
  };
}

export default async function ${functionName}() {
  let content = await getPageContent('${cmsPath}');

  if (!content || Object.keys(content).length === 0) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
      const res = await fetch(\`\${apiUrl}/api/cms/pages?path=${cmsPath}\`, { cache: 'no-store' });
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
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">
            {content?.hero?.title}
          </h1>
          {content?.hero?.subtitle && (
            <p className="text-white text-lg mb-8">{content.hero.subtitle}</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
`;
  }
}

function checkHasInteractivity(content) {
  return content.includes('useState') || 
         content.includes('useEffect') || 
         content.includes('onClick') ||
         content.includes('activeTab') ||
         content.includes('setActive');
}

function convertPage(pageInfo) {
  const { path: filePath, cmsPath } = pageInfo;
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  // Check if already SSR
  if (content.includes('export default async function') && content.includes('getPageContent')) {
    console.log(`✓ Already SSR: ${filePath}`);
    return true;
  }
  
  // Check if has interactivity
  const hasInteractivity = checkHasInteractivity(content);
  
  if (hasInteractivity) {
    console.log(`🔧 Converting with client component: ${filePath}`);
    
    // Generate client component name
    const pageName = cmsPath.split('/').pop();
    const clientComponentName = pageName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Client';
    
    // Create client component (rename original)
    const clientComponentPath = path.join(path.dirname(fullPath), `${clientComponentName}.jsx`);
    
    // Modify original to receive content as prop
    let clientContent = content;
    
    // Remove useEffect that fetches content
    clientContent = clientContent.replace(/useEffect\(\s*\(\)\s*=>\s*\{[\s\S]*?fetchContent[\s\S]*?\}\s*,\s*\[\]\s*\);?/g, '');
    clientContent = clientContent.replace(/const fetchContent[\s\S]*?catch[\s\S]*?\}\s*\};?/g, '');
    
    // Remove useState for content
    clientContent = clientContent.replace(/const \[content, setContent\] = useState\({}\);?/g, '');
    
    // Change function signature to receive content as prop
    clientContent = clientContent.replace(
      /export default function \w+\(\)\s*\{/,
      `export default function ${clientComponentName}({ content }) {`
    );
    
    // Remove Footer import if present (will be in SSR page)
    clientContent = clientContent.replace(/import Footer from[^;]+;?\n?/g, '');
    
    // Remove <Footer /> from JSX
    clientContent = clientContent.replace(/<Footer\s*\/>/g, '');
    
    // Write client component
    fs.writeFileSync(clientComponentPath, clientContent, 'utf-8');
    console.log(`   ✓ Created client component: ${clientComponentName}.jsx`);
    
    // Generate new SSR page
    const newPageContent = generateSSRPage(cmsPath, true, clientComponentName);
    fs.writeFileSync(fullPath, newPageContent, 'utf-8');
    console.log(`   ✓ Created SSR page: page.jsx`);
    
    return true;
  } else {
    console.log(`🔧 Converting simple page: ${filePath}`);
    
    // Generate new SSR page
    const newPageContent = generateSSRPage(cmsPath, false, null);
    fs.writeFileSync(fullPath, newPageContent, 'utf-8');
    
    return true;
  }
}

function main() {
  console.log('🚀 Converting client-side pages to SCI pattern...\n');
  
  let converted = 0;
  let failed = 0;
  
  for (const page of pagesToConvert) {
    try {
      if (convertPage(page)) {
        converted++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ Error converting ${page.path}:`, error.message);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Results: ${converted} converted, ${failed} failed`);
  console.log('='.repeat(60));
}

main();

