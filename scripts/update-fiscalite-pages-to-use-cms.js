// Script to update all Fiscalité pages to use CMS instead of hardcoded content
// This script modifies the page.jsx files to fetch from CMS

const fs = require('fs');
const path = require('path');

const fiscalitePages = [
  'fiscalite/autre-fiscalite',
  'fiscalite/declaration-impots',
  'fiscalite/defiscalisation-cas-specifiques',
  'fiscalite/fiscalite-placements',
  'fiscalite/impot-sur-le-revenu',
  'fiscalite/loi-cosse',
  'fiscalite/loi-denormandie',
  'fiscalite/loi-girardin',
  'fiscalite/loi-malraux',
  'fiscalite/loi-pinel',
  'fiscalite/lois-fiscales',
  'fiscalite/monument-historique',
  'fiscalite/pfu',
  'fiscalite/reductions-impot-deficit-foncier',
  'fiscalite/tmi-prelevements-sociaux',
  'fiscalite/tranches-baremes-plafonds'
];

function updatePageToUseCMS(filePath, pagePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already using CMS
    if (content.includes('/api/cms/content')) {
      console.log(`  ⏭️  Already using CMS, skipping...`);
      return false;
    }

    // Find the useEffect that sets content
    const useEffectPattern = /useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?setContent\s*\([^)]*\)[\s\S]*?\}\s*,\s*\[\s*\]\s*\)/;
    const useEffectMatch = content.match(useEffectPattern);
    
    if (!useEffectMatch) {
      // Try to find simpler pattern
      const simplePattern = /useEffect\s*\(\s*\(\)\s*=>\s*\{[\s\S]*?setContent\s*\(defaultContent\)[\s\S]*?\}\s*,\s*\[\s*\]\s*\)/;
      const simpleMatch = content.match(simplePattern);
      
      if (simpleMatch) {
        const replacement = `useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(\`/api/cms/content?path=${pagePath}&t=\${Date.now()}\`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            // Merge with defaultContent as fallback
            setContent({ ...defaultContent, ...data.data });
          } else {
            setContent(defaultContent);
          }
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch ${pagePath} content:", error);
        setContent(defaultContent);
      }
    };

    fetchContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === '${pagePath}' || updatedPath.includes('${pagePath.split('/').pop()}')) {
        console.log('🔄 CMS content updated, refreshing ${pagePath.split('/').pop()} page...', updatedPath);
        fetchContent();
      }
    };

    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);`;
        
        content = content.replace(simplePattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Updated to use CMS`);
        return true;
      }
    } else {
      // More complex useEffect, replace it
      const replacement = `useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(\`/api/cms/content?path=${pagePath}&t=\${Date.now()}\`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            // Merge with defaultContent as fallback
            setContent({ ...defaultContent, ...data.data });
          } else {
            setContent(defaultContent);
          }
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch ${pagePath} content:", error);
        setContent(defaultContent);
      }
    };

    fetchContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === '${pagePath}' || updatedPath.includes('${pagePath.split('/').pop()}')) {
        console.log('🔄 CMS content updated, refreshing ${pagePath.split('/').pop()} page...', updatedPath);
        fetchContent();
      }
    };

    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);`;
      
      content = content.replace(useEffectPattern, replacement);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated to use CMS`);
      return true;
    }
    
    console.log(`  ⚠️  Could not find useEffect pattern to replace`);
    return false;
  } catch (error) {
    console.error(`  ❌ Error updating file:`, error.message);
    return false;
  }
}

console.log('🔄 Updating Fiscalité pages to use CMS...\n');

let updated = 0;
let skipped = 0;
let errors = 0;

for (const pagePath of fiscalitePages) {
  const filePath = path.join('src/app', `${pagePath}/page.jsx`);
  
  console.log(`📄 Processing: ${pagePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found`);
    skipped++;
    continue;
  }

  const success = updatePageToUseCMS(filePath, pagePath);
  if (success) {
    updated++;
  } else {
    skipped++;
  }
}

console.log(`\n\n📊 SUMMARY:`);
console.log(`✅ Updated: ${updated} pages`);
console.log(`⏭️  Skipped: ${skipped} pages`);
console.log(`❌ Errors: ${errors} pages`);

