const { exec } = require('child_process');
const path = require('path');

const files = [
    'vefa_content.json',
    'scellier_content.json',
    'faire_construire_content.json',
    'investissement_locatif_content.json',
    'credit_immobilier_content.json',
    'plus_value_content.json',
    'immeubles_de_rapport_content.json'
];

async function runImports() {
    for (const file of files) {
        await new Promise((resolve) => {
            console.log(`🚀 Starting import for ${file}...`);
            exec(`node scripts/import_cms_page.js ${file}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`❌ Error importing ${file}:`, error);
                } else {
                    console.log(stdout);
                }
                resolve();
            });
        });
    }
    console.log('✨ All imports completed!');
}

runImports();
