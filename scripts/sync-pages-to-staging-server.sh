#!/bin/bash

# Script to sync CMS pages from production to staging database on EC2 server
# Usage: ./scripts/sync-pages-to-staging-server.sh

set -e

echo "🔄 Syncing CMS pages from Production to Staging..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi

# Create a temporary Node.js script to sync pages
cat > /tmp/sync-pages-staging.js << 'EOF'
const mongoose = require('mongoose');

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

async function syncPages() {
  try {
    // Production MongoDB URI (localhost:27017)
    const prodUri = 'mongodb://localhost:27017/azalee_db';
    
    // Staging MongoDB URI (localhost:27018)
    const stagingUri = 'mongodb://localhost:27018/azalee_db_staging';
    
    console.log('📍 Production:', prodUri);
    console.log('📍 Staging:', stagingUri);
    console.log('');

    // Connect to production
    console.log('🔗 Connecting to Production MongoDB...');
    await mongoose.connect(prodUri);
    console.log('✅ Connected to Production\n');

    const ProdPageContent = mongoose.model('PageContent', PageContentSchema, 'pagecontents');
    
    // Get all pages from production
    const prodPages = await ProdPageContent.find({}).select('path title content published lastModified');
    console.log(`📊 Found ${prodPages.length} pages in Production\n`);

    // Disconnect from production
    await mongoose.disconnect();
    console.log('✅ Disconnected from Production\n');

    // Connect to staging
    console.log('🔗 Connecting to Staging MongoDB...');
    await mongoose.connect(stagingUri);
    console.log('✅ Connected to Staging\n');

    const StagingPageContent = mongoose.model('PageContent', PageContentSchema, 'pagecontents');

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    // Copy each page to staging
    for (const prodPage of prodPages) {
      try {
        const existingPage = await StagingPageContent.findOne({ path: prodPage.path });
        
        if (existingPage) {
          // Update existing page
          existingPage.title = prodPage.title;
          existingPage.content = prodPage.content;
          existingPage.published = prodPage.published;
          existingPage.lastModified = prodPage.lastModified;
          await existingPage.save();
          updated++;
          if (updated % 10 === 0) {
            process.stdout.write('.');
          }
        } else {
          // Create new page
          const newPage = new StagingPageContent({
            path: prodPage.path,
            title: prodPage.title,
            content: prodPage.content,
            published: prodPage.published,
            lastModified: prodPage.lastModified
          });
          await newPage.save();
          created++;
          if (created % 10 === 0) {
            process.stdout.write('.');
          }
        }
      } catch (error) {
        if (error.code === 11000) {
          skipped++;
        } else {
          errors++;
          console.error(`\n  ❌ Error with /${prodPage.path}: ${error.message}`);
        }
      }
    }

    // Final count
    const stagingCount = await StagingPageContent.countDocuments({});

    console.log('\n');
    console.log('='.repeat(80));
    console.log('📊 SYNC SUMMARY:');
    console.log('='.repeat(80));
    console.log(`   Production pages: ${prodPages.length}`);
    console.log(`   Created in staging: ${created}`);
    console.log(`   Updated in staging: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total in staging: ${stagingCount}`);
    console.log('='.repeat(80));

    await mongoose.disconnect();
    console.log('\n✅ Sync completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

syncPages();
EOF

echo -e "${BLUE}📦 Installing mongoose if needed...${NC}"
npm install mongoose --no-save --silent 2>/dev/null || true

echo -e "${BLUE}🚀 Running sync script...${NC}"
echo ""

node /tmp/sync-pages-staging.js

# Cleanup
rm -f /tmp/sync-pages-staging.js

echo ""
echo -e "${GREEN}✅ Done!${NC}"

