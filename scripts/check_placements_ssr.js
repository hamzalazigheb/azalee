const http = require('http');

const pages = [
    { url: 'http://localhost:4028/placements/assurance-vie', check: '1 900 milliards' },
    { url: 'http://localhost:4028/placements/assurance-vie-luxembourg', check: 'Version haut de gamme' },
    { url: 'http://localhost:4028/placements/compte-titres', check: 'Compte-Titres Ordinaire (CTO)' },
    { url: 'http://localhost:4028/placements/contrat-capitalisation', check: 'Contrat de Capitalisation' }
];

async function checkUrl(url, checkString) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (data.includes(checkString)) {
                    console.log(`✅ SSR Verified for ${url}`);
                    resolve(true);
                } else {
                    console.error(`❌ SSR Failed for ${url}. Expected "${checkString}" not found.`);
                    if (data.includes("Chargement du contenu")) {
                        console.log("⚠️ Found 'Chargement du contenu...' in response.");
                    }
                    const bodyIndex = data.indexOf('<body');
                    if (bodyIndex !== -1) {
                        console.log(`Received content snippet (from body): ${data.substring(bodyIndex, bodyIndex + 600)}...`);
                    } else {
                        console.log(`Received content start: ${data.substring(0, 500)}...`);
                    }

                    resolve(false);
                }
            });
        }).on('error', (err) => {
            console.error(`❌ Error fetching ${url}:`, err.message);
            resolve(false);
        });
    });
}

async function main() {
    console.log('Starting SSR verification for Placements pages...');

    // Wait a bit for the dev server to reload changes if needed
    await new Promise(r => setTimeout(r, 2000));

    for (const page of pages) {
        await checkUrl(page.url, page.check);
    }
}

main();
