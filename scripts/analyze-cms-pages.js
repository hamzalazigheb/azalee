// Analyze CMS pages to identify duplicates, non-pages, and issues
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function analyzePages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    const pages = await PageContent.find({}).sort({ path: 1 });
    
    console.log(`📋 Total CMS Pages: ${pages.length}\n`);
    
    // 1. Check for duplicates (same path with different cases)
    const pathMap = {};
    const duplicates = [];
    pages.forEach(page => {
      const lowerPath = page.path.toLowerCase();
      if (pathMap[lowerPath]) {
        duplicates.push({ original: pathMap[lowerPath], duplicate: page.path });
      } else {
        pathMap[lowerPath] = page.path;
      }
    });
    
    if (duplicates.length > 0) {
      console.log('⚠️  DUPLICATES FOUND:');
      duplicates.forEach(({ original, duplicate }) => {
        console.log(`   - ${original} vs ${duplicate}`);
      });
      console.log('');
    }
    
    // 2. Check for non-page entries (components, etc.)
    const nonPages = pages.filter(page => {
      const path = page.path.toLowerCase();
      return path === 'header' || 
             path === 'footer' || 
             path === 'sara' ||
             path.startsWith('component-') ||
             path.startsWith('_');
    });
    
    if (nonPages.length > 0) {
      console.log('⚠️  NON-PAGE ENTRIES:');
      nonPages.forEach(page => {
        console.log(`   - ${page.path} (${page.title})`);
      });
      console.log('');
    }
    
    // 3. Check for empty content pages
    const emptyPages = pages.filter(page => {
      const content = page.content || {};
      return Object.keys(content).length === 0;
    });
    
    if (emptyPages.length > 0) {
      console.log(`⚠️  EMPTY PAGES (${emptyPages.length}):`);
      emptyPages.slice(0, 10).forEach(page => {
        console.log(`   - ${page.path} (${page.title})`);
      });
      if (emptyPages.length > 10) {
        console.log(`   ... and ${emptyPages.length - 10} more`);
      }
      console.log('');
    }
    
    // 4. Group by category
    const categories = {};
    pages.forEach(page => {
      const category = page.path.split('/')[0] || 'root';
      if (!categories[category]) categories[category] = [];
      categories[category].push(page);
    });
    
    console.log('📁 By Category:');
    Object.entries(categories).sort((a, b) => b[1].length - a[1].length).forEach(([cat, catPages]) => {
      console.log(`   ${cat}: ${catPages.length} pages`);
    });
    
    // 5. Check for pages that should be redirected
    const redirectedPages = pages.filter(page => {
      const path = page.path.toLowerCase();
      return path.startsWith('investissement-immobilier/') && path !== 'investissement-immobilier';
    });
    
    if (redirectedPages.length > 0) {
      console.log(`\n⚠️  REDIRECTED PAGES (should be removed): ${redirectedPages.length}`);
      redirectedPages.forEach(page => {
        console.log(`   - ${page.path}`);
      });
    }
    
    // 6. Check for multiple homepages
    const homePages = pages.filter(page => {
      const path = page.path.toLowerCase();
      return path === 'home' || path === 'homepage' || path === 'accueil' || path === '' || path === '/';
    });
    
    if (homePages.length > 1) {
      console.log(`\n⚠️  MULTIPLE HOMEPAGES (${homePages.length}):`);
      homePages.forEach(page => {
        console.log(`   - ${page.path} (${page.title})`);
      });
    }
    
    // Summary
    const totalIssues = duplicates.length + nonPages.length + redirectedPages.length;
    const expectedPages = pages.length - totalIssues;
    
    console.log('\n' + '='.repeat(80));
    console.log(`📊 SUMMARY:`);
    console.log(`   Total pages: ${pages.length}`);
    console.log(`   Duplicates: ${duplicates.length}`);
    console.log(`   Non-page entries: ${nonPages.length}`);
    console.log(`   Redirected pages: ${redirectedPages.length}`);
    console.log(`   Empty pages: ${emptyPages.length}`);
    console.log(`   Multiple homepages: ${homePages.length > 1 ? homePages.length : 0}`);
    console.log(`   Expected pages (after cleanup): ~${expectedPages}`);
    console.log('='.repeat(80));
    
    // Return data for cleanup script
    return {
      duplicates,
      nonPages,
      redirectedPages,
      emptyPages,
      homePages: homePages.length > 1 ? homePages : [],
      allPages: pages
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  analyzePages();
}

module.exports = analyzePages;

