// Script to remove <em> tags from retraite page content in MongoDB
// Can be run from Docker container: docker-compose exec backend node scripts/remove-em-tags.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection string - try multiple options
const MONGODB_URI = process.env.MONGODB_URI || 
                    process.env.MONGODB_URI || 
                    'mongodb://mongo:27017/azalee_db' || 
                    'mongodb://localhost:27017/azalee_db';

// Define PageContent schema
const PageContentSchema = new mongoose.Schema({
  path: String,
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: Boolean,
  lastModified: Date,
  modifiedBy: String
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Function to remove <em> tags from strings recursively
function removeEmTags(obj) {
  if (typeof obj === 'string') {
    // Remove <em> and </em> tags (case insensitive)
    return obj.replace(/<em>/gi, '').replace(/<\/em>/gi, '').trim();
  } else if (Array.isArray(obj)) {
    return obj.map(item => removeEmTags(item));
  } else if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const key in obj) {
      cleaned[key] = removeEmTags(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

async function removeEmTagsFromRetraite() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log(`   URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const path = 'retraite';
    
    // Find the retraite page
    const page = await PageContent.findOne({ path });
    
    if (!page) {
      console.log(`❌ Page with path "${path}" not found!`);
      return;
    }

    console.log(`📄 Found page: ${page.title}`);
    console.log('🧹 Removing <em> tags from content...\n');

    // Remove <em> tags from content
    const cleanedContent = removeEmTags(page.content);
    
    // Update the page
    page.content = cleanedContent;
    page.lastModified = new Date();
    page.modifiedBy = 'admin';
    
    await page.save();
    
    console.log('✅ All <em> tags removed successfully!');
    console.log('   Content has been updated in the database.\n');
    
    // Show example of cleaned content
    if (cleanedContent.hero && cleanedContent.hero.description1) {
      console.log('📝 Example - Hero description1:');
      console.log(`   Before: ${page.content.hero?.description1 || 'N/A'}`);
      console.log(`   After:  ${cleanedContent.hero.description1}`);
    }

  } catch (error) {
    console.error('❌ Error removing <em> tags:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 MongoDB connection failed!');
      console.error('   Make sure MongoDB is running and accessible.');
      console.error('   Try: docker-compose ps (to check if mongo container is running)');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  }
}

// Run the script
removeEmTagsFromRetraite();

