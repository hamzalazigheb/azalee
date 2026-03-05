/**
 * Test complet de la page CMS d'accueil
 * Vérifie le flux complet : CMS Admin -> API -> Frontend
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:4028';

console.log('🧪 TEST COMPLET - PAGE CMS D\'ACCUEIL');
console.log('======================================\n');

async function testCompleteFlow() {
  console.log('📋 CHECKLIST DE TESTS');
  console.log('======================\n');
  
  const results = {
    api: false,
    structure: false,
    rendering: false,
    cmsAdmin: false
  };
  
  // Test 1: API CMS
  console.log('1️⃣  Test API CMS');
  console.log('   ──────────────────────');
  try {
    const response = await fetch(`${BASE_URL}/api/cms/content?path=home&t=${Date.now()}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        console.log('   ✅ API répond correctement');
        console.log('   ✅ Données présentes');
        results.api = true;
        
        // Vérifier la structure
        const hasHero = data.data.hero !== undefined;
        const hasPartners = Array.isArray(data.data.partners);
        const hasStats = Array.isArray(data.data.stats);
        
        console.log(`   📊 Structure:`);
        console.log(`      - Section hero: ${hasHero ? '✅' : '❌'}`);
        console.log(`      - Partners (array): ${hasPartners ? '✅' : '❌'}`);
        console.log(`      - Stats (array): ${hasStats ? '✅' : '❌'}`);
        
        results.structure = hasHero || hasPartners || hasStats;
        
        // Vérifier le rendu
        const contentStr = JSON.stringify(data.data);
        const hasObjectString = contentStr.includes('[object Object]');
        console.log(`   🎨 Rendu:`);
        console.log(`      - Pas de [object Object]: ${!hasObjectString ? '✅' : '❌'}`);
        results.rendering = !hasObjectString;
        
      } else {
        console.log('   ⚠️  Page "home" non trouvée dans CMS');
        console.log('   💡 La page utilisera le contenu par défaut');
      }
    } else {
      console.log(`   ❌ Erreur HTTP: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }
  
  console.log('\n2️⃣  Test CMS Admin');
  console.log('   ──────────────────────');
  console.log('   💡 Testez manuellement:');
  console.log('      1. Allez sur /admin/cms');
  console.log('      2. Sélectionnez la page "home" ou "Page d\'accueil"');
  console.log('      3. Vérifiez que toutes les sections sont visibles');
  console.log('      4. Modifiez un champ (ex: heroTitle)');
  console.log('      5. Cliquez sur "Enregistrer"');
  console.log('      6. Vérifiez sur / que les modifications apparaissent');
  results.cmsAdmin = true; // À tester manuellement
  
  console.log('\n3️⃣  Test Frontend');
  console.log('   ──────────────────────');
  console.log('   💡 Testez manuellement:');
  console.log('      1. Allez sur http://localhost:4028');
  console.log('      2. Vérifiez que la page se charge correctement');
  console.log('      3. Vérifiez qu\'il n\'y a pas d\'erreurs dans la console');
  console.log('      4. Vérifiez que les partenaires s\'affichent');
  console.log('      5. Vérifiez que les stats s\'affichent');
  
  console.log('\n📊 RÉSUMÉ');
  console.log('==========');
  console.log(`   API CMS: ${results.api ? '✅' : '⚠️'}`);
  console.log(`   Structure: ${results.structure ? '✅' : '⚠️'}`);
  console.log(`   Rendu: ${results.rendering ? '✅' : '❌'}`);
  console.log(`   CMS Admin: 💡 Test manuel requis`);
  
  if (results.api && results.structure && results.rendering) {
    console.log('\n✅ Les tests automatiques sont passés !');
    console.log('💡 Testez manuellement le CMS Admin pour valider complètement\n');
  } else {
    console.log('\n⚠️  Certains tests ont échoué');
    console.log('💡 Vérifiez les détails ci-dessus\n');
  }
}

testCompleteFlow().catch(console.error);

