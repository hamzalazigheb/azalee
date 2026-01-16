const fs = require('fs');
const path = require('path');

async function importContent(filename) {
    if (!filename) {
        console.error('❌ Please provide a filename (e.g., node scripts/import_cms_page.js lmnp_content.json)');
        process.exit(1);
    }

    try {
        const contentPath = path.join(__dirname, filename);
        if (!fs.existsSync(contentPath)) {
            console.error(`❌ File not found: ${contentPath}`);
            process.exit(1);
        }

        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        console.log(`📦 Importing content for: ${content.title} (${content.path})`);

        // Using PUT to update existing page or create if not exists (upsert logic depends on API, but generally PUT is safer for updates)
        // Actually, check if page exists first might be handled by the API upsert logic

        const apiUrl = 'http://localhost:4028/api/cms/pages';

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Success! Content updated.');
        } else {
            console.error('❌ Error updating content:', result.message);
            if (result.errors) console.error(result.errors);
        }
    } catch (error) {
        console.error('❌ Script error:', error);
    }
}

// Get filename from command line arg
const filename = process.argv[2];
importContent(filename);
