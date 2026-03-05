const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:4028/api/cms/pages';

async function importPage(filename) {
    const filePath = path.join(__dirname, filename);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filename}`);
        return;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`Importing ${content.title} (${content.path})...`);

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (response.ok) {
            console.log(`✅ Successfully imported: ${content.title}`);
        } else {
            const errorText = await response.text();
            console.error(`❌ Failed to import ${content.title}: ${response.status} ${response.statusText}`);
            console.error(errorText);
        }
    } catch (error) {
        console.error(`❌ Error importing ${content.title}:`, error);
    }
}

async function main() {
    const files = [
        'plan_retraite_content.json',
        'rachat_trimestres_content.json',
        'simulation_content.json',
        'prevoyance_protection_content.json',
        'retraite_progressive_content.json'
    ];

    console.log('Starting batch import for Retraite pages...');

    for (const file of files) {
        await importPage(file);
    }

    console.log('Batch import completed.');
}

main();
