const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/azalee_patrimoine";

const pageSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    published: { type: Boolean, default: false },
    lastModified: { type: Date, default: Date.now }
});

const Page = mongoose.models.PageContent || mongoose.model('PageContent', pageSchema);

async function importPage(filename) {
    try {
        const data = require(`./content/${filename}`);
        console.log(`Importing ${data.title}...`);

        const result = await Page.findOneAndUpdate(
            { path: data.path },
            {
                ...data,
                lastModified: new Date()
            },
            { upsert: true, new: true }
        );

        console.log(`✅ Successfully imported: ${result.title}`);
    } catch (error) {
        console.error(`❌ Error importing ${filename}:`, error.message);
    }
}

async function main() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const files = [
            'assurance_vie_content.json',
            'assurance_vie_luxembourg_content.json',
            'compte_titres_content.json',
            'contrat_capitalisation_content.json',
            'bourse_actions_content.json',
            'scpi_opci_content.json'
        ];

        for (const file of files) {
            await importPage(file);
        }

        console.log('All imports completed!');
    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
}

main();
