// Script to check what's actually in MongoDB for declaration-impots
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function checkContent() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const page = await PageContent.findOne({ path: 'fiscalite/declaration-impots' });
    
    if (!page) {
      console.log('❌ Page not found in MongoDB');
      return;
    }

    console.log('📄 Page found:', page.path);
    console.log('📋 Title:', page.title);
    console.log('✅ Published:', page.published);
    console.log('\n📦 Content sections:');
    
    const sections = Object.keys(page.content || {});
    console.log(`   Total sections: ${sections.length}`);
    sections.forEach(section => {
      const value = page.content[section];
      if (Array.isArray(value)) {
        console.log(`   - ${section}: Array[${value.length}]`);
      } else if (typeof value === 'object' && value !== null) {
        const subKeys = Object.keys(value);
        console.log(`   - ${section}: Object with keys: ${subKeys.join(', ')}`);
      } else {
        console.log(`   - ${section}: ${typeof value}`);
      }
    });

    console.log('\n🔍 Checking specific sections:');
    const requiredSections = [
      'declarationSteps',
      'calendarData',
      'commonErrors',
      'quickStats',
      'tabContent',
      'conclusion'
    ];

    requiredSections.forEach(section => {
      if (page.content[section]) {
        console.log(`   ✅ ${section}: EXISTS`);
        if (section === 'tabContent' && typeof page.content[section] === 'object') {
          const tabs = Object.keys(page.content[section]);
          console.log(`      Tabs: ${tabs.join(', ')}`);
        }
      } else {
        console.log(`   ❌ ${section}: MISSING`);
      }
    });

    // Show sample of tabContent
    if (page.content.tabContent) {
      console.log('\n📋 TabContent structure:');
      Object.keys(page.content.tabContent).forEach(tab => {
        console.log(`   ${tab}:`);
        const tabData = page.content.tabContent[tab];
        if (typeof tabData === 'object') {
          Object.keys(tabData).forEach(key => {
            const val = tabData[key];
            if (Array.isArray(val)) {
              console.log(`      - ${key}: Array[${val.length}]`);
            } else if (typeof val === 'string') {
              console.log(`      - ${key}: "${val.substring(0, 50)}..."`);
            } else {
              console.log(`      - ${key}: ${typeof val}`);
            }
          });
        }
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkContent()
  .then(() => {
    console.log('\n✅ Check completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error);
    process.exit(1);
  });

