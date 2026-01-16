// Test script to check if the succession-heritage page content is accessible via API
const fetch = require('node-fetch');

async function testAPI() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028';
  
  console.log('🔍 Test de l\'API pour patrimoine/succession-heritage\n');
  
  try {
    // Test 1: API /api/cms/pages
    console.log('1️⃣ Test /api/cms/pages?path=patrimoine/succession-heritage');
    const res1 = await fetch(`${apiUrl}/api/cms/pages?path=patrimoine/succession-heritage`);
    const json1 = await res1.json();
    
    if (json1.success && json1.data) {
      console.log('   ✅ Page trouvée');
      console.log(`   - Published: ${json1.data.published}`);
      console.log(`   - Title: ${json1.data.title}`);
      console.log(`   - Content sections: ${json1.data.content ? Object.keys(json1.data.content).join(', ') : 'Aucun'}`);
    } else {
      console.log('   ❌ Page non trouvée ou erreur');
      console.log('   Response:', JSON.stringify(json1, null, 2));
    }
    
    console.log('\n');
    
    // Test 2: API /api/cms/content
    console.log('2️⃣ Test /api/cms/content?path=patrimoine/succession-heritage');
    const res2 = await fetch(`${apiUrl}/api/cms/content?path=patrimoine/succession-heritage`);
    const json2 = await res2.json();
    
    if (json2.success && json2.content) {
      console.log('   ✅ Contenu trouvé');
      console.log(`   - Sections: ${Object.keys(json2.content).join(', ')}`);
    } else {
      console.log('   ❌ Contenu non trouvé ou erreur');
      console.log('   Response:', JSON.stringify(json2, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testAPI();

