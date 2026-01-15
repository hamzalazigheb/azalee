// List all CMS pages in MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function listPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
    
    const pages = await PageContent.find({}).sort({ path: 1 }).select('path title published lastModified');
    
    console.log(`📋 Total CMS Pages: ${pages.length}\n`);
    console.log('=' .repeat(80));
    
    pages.forEach((page, index) => {
      const status = page.published ? '✅' : '❌';
      const date = page.lastModified ? new Date(page.lastModified).toLocaleDateString('fr-FR') : 'N/A';
      console.log(`${(index + 1).toString().padStart(2)}. ${status} /${page.path}`);
      console.log(`    Title: ${page.title}`);
      console.log(`    Last Modified: ${date}`);
      console.log('');
    });
    
    console.log('=' .repeat(80));
    console.log(`\n📊 Summary: ${pages.length} pages in CMS database`);
    
    // Group by category
    const categories = {};
    pages.forEach(page => {
      const category = page.path.split('/')[0] || 'root';
      if (!categories[category]) categories[category] = [];
      categories[category].push(page.path);
    });
    
    console.log('\n📁 By Category:');
    Object.entries(categories).forEach(([cat, paths]) => {
      console.log(`   ${cat}: ${paths.length} pages`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

listPages();


