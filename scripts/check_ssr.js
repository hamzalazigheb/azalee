const http = require('http');

const urls = [
    'http://localhost:4028/retraite/rachat-trimestres',
    'http://localhost:4028/retraite/simulation',
    'http://localhost:4028/retraite/prevoyance-protection',
    'http://localhost:4028/retraite/retraite-progressive',
    'http://localhost:4028/retraite/plan-retraite'
];

async function checkUrl(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                // Check for specific content that should be there
                const isSSR = data.includes("Azalée Patrimoine") && (
                    data.includes("Rachat de trimestres") ||
                    data.includes("Simulateur Retraite") ||
                    data.includes("Prévoyance") ||
                    data.includes("Retraite progressive") ||
                    data.includes("Plans d'épargne retraite")
                );

                console.log(`Checking ${url}... Status: ${res.statusCode}`);
                if (isSSR) {
                    console.log("✅ SSR Confirmed (Content found in HTML)");
                } else {
                    console.log("❌ SSR Failed or Content missing");
                    // console.log("Snippet:", data.substring(0, 200)); 
                }
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error checking ${url}: ${err.message}`);
            resolve();
        });
    });
}

async function main() {
    for (const url of urls) {
        await checkUrl(url);
    }
}

main();
