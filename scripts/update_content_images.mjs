import mongoose from 'mongoose';
// Manually define schema and connection to avoid Next.js env var issues in standalone script
const MONGODB_URI = 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    published: { type: Boolean, default: true },
}, { timestamps: true });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const REPLACEMENTS = {
    'home.webp': 'paris-luxury-office.webp',
    'image2.webp': 'family-trust-meeting.webp',
    'image3.webp': 'private-banking-consultation.webp',
    'quiss.jpg': 'azalee-team-meeting.jpg',
    'img_image_1221.png': 'consultation-needs-assessment.png',
    'img_image_1222.png': 'investment-strategy-meeting.png',
    'img_image_1220.png': 'financial-strategy-planning.png',
    'img_image_1223.png': 'lmnp-fiscal-advantage.png',
    'img_image_1224.png': 'lmp-professional-status.png',
    'img_image_1225.png': 'pinel-law-investment.png',
    'img_image_1227.png': 'wealth-management-agreement.png',
    'img_image_1233.png': 'office-consultation.png',
    'separwebp.webp': 'azalee-garden-separator.webp'
};

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        const pages = await PageContent.find({});
        console.log(`Found ${pages.length} pages.`);

        for (const page of pages) {
            let contentStr = JSON.stringify(page.content);
            let modified = false;

            for (const [oldName, newName] of Object.entries(REPLACEMENTS)) {
                if (contentStr.includes(oldName)) {
                    console.log(`[${page.path}] Replacing ${oldName} -> ${newName}`);
                    // Global replace
                    contentStr = contentStr.split(oldName).join(newName);
                    modified = true;
                }
            }

            if (modified) {
                page.content = JSON.parse(contentStr);
                page.markModified('content');
                await page.save();
                console.log(`[${page.path}] ✅ Updated and saved.`);
            } else {
                console.log(`[${page.path}] No changes needed.`);
            }
        }

        console.log('🎉 Migration complete.');
        process.exit(0);
    } catch (e) {
        console.error('❌ Error:', e);
        process.exit(1);
    }
}

run();
