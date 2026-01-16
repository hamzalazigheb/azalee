const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/azalee_patrimoine";

const pageSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Page = mongoose.models.PageContent || mongoose.model('PageContent', pageSchema);

async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
        const page = await Page.findOne({ path: 'placements/scpi-opci' });
        if (page) {
            console.log(JSON.stringify(page.content, null, 2));
        } else {
            console.log('Page not found');
        }
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

main();
