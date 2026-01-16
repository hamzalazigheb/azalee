const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function checkHomepageContent() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const page = await PageContent.findOne({ path: 'home' });

    if (!page) {
      console.log('❌ Page "home" not found in MongoDB');
      await mongoose.disconnect();
      return;
    }

    console.log('📋 Page "home" found in MongoDB:');
    console.log(`   Title: ${page.title}`);
    console.log(`   Published: ${page.published}`);
    console.log(`   Last Modified: ${page.lastModified}\n`);

    // Check hero backgrounds
    if (page.content.hero && page.content.hero.heroBackgrounds) {
      console.log('🖼️  Hero Backgrounds:');
      page.content.hero.heroBackgrounds.forEach((bg, i) => {
        console.log(`   ${i + 1}. ${bg}`);
      });
    } else {
      console.log('⚠️  Hero backgrounds not found');
    }

    // Check team image
    if (page.content.team && page.content.team.teamImage) {
      console.log(`\n👥 Team Image: ${page.content.team.teamImage}`);
    }

    // Check investment images
    if (page.content.investment) {
      console.log('\n💰 Investment Images:');
      if (page.content.investment.investmentImage1) {
        console.log(`   1. ${page.content.investment.investmentImage1}`);
      }
      if (page.content.investment.investmentImage2) {
        console.log(`   2. ${page.content.investment.investmentImage2}`);
      }
    }

    // Check partners
    if (page.content.partners && Array.isArray(page.content.partners)) {
      console.log(`\n🤝 Partners (${page.content.partners.length}):`);
      page.content.partners.forEach((partner, i) => {
        console.log(`   ${i + 1}. ${partner.name}: ${partner.image}`);
      });
    } else {
      console.log('\n⚠️  Partners not found or not an array');
    }

    // Check final CTA image
    if (page.content.finalCta && page.content.finalCta.finalCtaImage) {
      console.log(`\n📞 Final CTA Image: ${page.content.finalCta.finalCtaImage}`);
    }

    // Check for old image paths
    const oldPaths = [
      '/images/home.webp',
      '/images/image2.webp',
      '/images/image3.webp',
      '/images/quiss.jpg',
      '/images/img_image_1220.png',
      '/images/img_image_1222.png',
      '/images/img_image_1227.png',
      '/images/selencia.svg',
      '/images/cardif-logo.svg',
      '/images/SL-Logo-svg.svg',
      '/images/vieplus.svg',
      '/images/intencial-1.png',
      '/images/img_header_logo.png'
    ];

    const contentStr = JSON.stringify(page.content);
    const foundOldPaths = oldPaths.filter(path => contentStr.includes(path));

    if (foundOldPaths.length > 0) {
      console.log('\n⚠️  OLD IMAGE PATHS FOUND:');
      foundOldPaths.forEach(path => {
        console.log(`   ❌ ${path}`);
      });
    } else {
      console.log('\n✅ No old image paths found - all paths are updated!');
    }

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkHomepageContent();

