// Script to compare content in MongoDB vs what's returned by APIs
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

function compareObjects(obj1, obj2, path = '') {
  const differences = [];
  
  // Get all keys from both objects
  const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
  
  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const val1 = obj1?.[key];
    const val2 = obj2?.[key];
    
    if (val1 === undefined && val2 !== undefined) {
      differences.push({ path: currentPath, type: 'missing_in_first', value: val2 });
    } else if (val1 !== undefined && val2 === undefined) {
      differences.push({ path: currentPath, type: 'missing_in_second', value: val1 });
    } else if (typeof val1 !== typeof val2) {
      differences.push({ path: currentPath, type: 'type_mismatch', value1: typeof val1, value2: typeof val2 });
    } else if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) {
        differences.push({ path: currentPath, type: 'array_length_mismatch', length1: val1.length, length2: val2.length });
      }
      // Compare array items
      const maxLength = Math.max(val1.length, val2.length);
      for (let i = 0; i < maxLength; i++) {
        if (i >= val1.length) {
          differences.push({ path: `${currentPath}[${i}]`, type: 'missing_in_first', value: val2[i] });
        } else if (i >= val2.length) {
          differences.push({ path: `${currentPath}[${i}]`, type: 'missing_in_second', value: val1[i] });
        } else if (typeof val1[i] === 'object' && val1[i] !== null) {
          differences.push(...compareObjects(val1[i], val2[i], `${currentPath}[${i}]`));
        } else if (val1[i] !== val2[i]) {
          differences.push({ path: `${currentPath}[${i}]`, type: 'value_mismatch', value1: val1[i], value2: val2[i] });
        }
      }
    } else if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      differences.push(...compareObjects(val1, val2, currentPath));
    } else if (val1 !== val2) {
      differences.push({ path: currentPath, type: 'value_mismatch', value1: val1, value2: val2 });
    }
  }
  
  return differences;
}

async function checkContent() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const testPath = 'fiscalite/declaration-impots';
    const page = await PageContent.findOne({ path: testPath });
    
    if (!page) {
      console.log('❌ Page not found:', testPath);
      return;
    }

    console.log(`📄 Checking: ${testPath}\n`);
    console.log('='.repeat(80));
    
    // Get content from MongoDB
    const mongoContent = page.content || {};
    
    console.log('\n📦 MongoDB Content Structure:');
    console.log(`   Total sections: ${Object.keys(mongoContent).length}`);
    Object.keys(mongoContent).forEach(section => {
      const value = mongoContent[section];
      if (Array.isArray(value)) {
        console.log(`   - ${section}: Array[${value.length}]`);
      } else if (typeof value === 'object' && value !== null) {
        const subKeys = Object.keys(value);
        console.log(`   - ${section}: Object with ${subKeys.length} keys: ${subKeys.join(', ')}`);
      } else {
        console.log(`   - ${section}: ${typeof value}`);
      }
    });

    // Check specific sections
    console.log('\n🔍 Checking Key Sections:');
    const keySections = ['declarationSteps', 'calendarData', 'commonErrors', 'quickStats', 'tabContent', 'conclusion'];
    
    keySections.forEach(section => {
      if (mongoContent[section]) {
        if (Array.isArray(mongoContent[section])) {
          console.log(`   ✅ ${section}: Array with ${mongoContent[section].length} items`);
          if (mongoContent[section].length > 0) {
            console.log(`      First item keys: ${Object.keys(mongoContent[section][0]).join(', ')}`);
          }
        } else if (typeof mongoContent[section] === 'object') {
          const keys = Object.keys(mongoContent[section]);
          console.log(`   ✅ ${section}: Object with keys: ${keys.join(', ')}`);
          if (section === 'tabContent') {
            keys.forEach(tab => {
              const tabData = mongoContent[section][tab];
              if (typeof tabData === 'object') {
                const tabKeys = Object.keys(tabData);
                console.log(`      - ${tab}: ${tabKeys.join(', ')}`);
              }
            });
          }
        } else {
          console.log(`   ✅ ${section}: ${typeof mongoContent[section]}`);
        }
      } else {
        console.log(`   ❌ ${section}: MISSING`);
      }
    });

    // Show sample data
    console.log('\n📋 Sample Data:');
    if (mongoContent.quickStats && mongoContent.quickStats.length > 0) {
      console.log('   quickStats[0]:', JSON.stringify(mongoContent.quickStats[0], null, 2));
    }
    if (mongoContent.tabContent && mongoContent.tabContent.general) {
      console.log('   tabContent.general.title:', mongoContent.tabContent.general.title);
      console.log('   tabContent.general.cards:', mongoContent.tabContent.general.cards?.length || 0);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Content check completed');
    console.log('\n💡 Note: The CMS admin should show ALL these sections.');
    console.log('   If a section is missing in the CMS admin, it means it\'s not being rendered properly.');

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
    console.log('\n✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

