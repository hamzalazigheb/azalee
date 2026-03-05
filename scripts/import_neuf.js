const fs = require('fs');
const path = require('path');

async function importContent() {
    try {
        const contentPath = path.join(__dirname, 'immobilier_neuf_content.json');
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

        console.log('📦 Updating content for:', content.title);

        // Using PUT to update existing page
        const response = await fetch('http://localhost:4028/api/cms/pages', {
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
        }
    } catch (error) {
        console.error('❌ Script error:', error);
    }
}

importContent();
