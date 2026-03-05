/**
 * Script de test pour vérifier la page CMS d'accueil
 * Teste le flux complet : CMS -> API -> Frontend
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:4028';

console.log('🧪 TEST DE LA PAGE CMS D\'ACCUEIL');
console.log('==================================\n');

// Test 1: Vérifier que l'API retourne les données
async function testCMSAPI() {
  console.log('📡 Test 1: API CMS pour la page "home"');
  console.log('--------------------------------------');
  
  try {
    const response = await fetch(`${BASE_URL}/api/cms/content?path=home&t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    
    const httpStatus = response.status;
    console.log(`   Status HTTP: ${httpStatus}`);
    
    if (httpStatus === 200) {
      const data = await response.json();
      console.log(`   ✅ API répond correctement`);
      console.log(`   Success: ${data.success}`);
      
      if (data.success && data.data) {
        console.log(`   ✅ Données présentes`);
        console.log(`   Sections disponibles: ${Object.keys(data.data).length}`);
        
        // Vérifier les sections importantes
        const requiredSections = ['heroTitle', 'heroSubtitle', 'partners', 'stats'];
        const missingSections = requiredSections.filter(section => !(section in data.data));
        
        if (missingSections.length === 0) {
          console.log(`   ✅ Toutes les sections requises sont présentes`);
        } else {
          console.log(`   ⚠️  Sections manquantes: ${missingSections.join(', ')}`);
        }
        
        // Vérifier le type des données importantes
        if (data.data.partners) {
          const isArray = Array.isArray(data.data.partners);
          console.log(`   Partners est un tableau: ${isArray ? '✅ OUI' : '❌ NON'}`);
          if (isArray) {
            console.log(`   Nombre de partenaires: ${data.data.partners.length}`);
          }
        }
        
        if (data.data.stats) {
          const isArray = Array.isArray(data.data.stats);
          console.log(`   Stats est un tableau: ${isArray ? '✅ OUI' : '❌ NON'}`);
          if (isArray) {
            console.log(`   Nombre de stats: ${data.data.stats.length}`);
          }
        }
        
        return { success: true, data: data.data };
      } else {
        console.log(`   ⚠️  Pas de données dans la réponse`);
        return { success: false, reason: 'No data in response' };
      }
    } else if (httpStatus === 404) {
      console.log(`   ⚠️  Page "home" non trouvée dans le CMS`);
      console.log(`   💡 La page utilisera le contenu par défaut`);
      return { success: false, reason: 'Page not found (will use default content)' };
    } else {
      console.log(`   ❌ Erreur HTTP: ${httpStatus}`);
      return { success: false, reason: `HTTP ${httpStatus}` };
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

// Test 2: Vérifier la structure des données
function testDataStructure(data) {
  console.log('\n📊 Test 2: Structure des données');
  console.log('----------------------------------');
  
  if (!data) {
    console.log('   ⚠️  Pas de données à vérifier');
    return false;
  }
  
  const checks = [
    { key: 'heroTitle', type: 'string', required: true },
    { key: 'heroSubtitle', type: 'string', required: true },
    { key: 'partners', type: 'array', required: true },
    { key: 'stats', type: 'array', required: false },
    { key: 'introTitle', type: 'string', required: false },
    { key: 'teamTitle', type: 'string', required: false }
  ];
  
  let allPassed = true;
  
  checks.forEach(check => {
    const value = data[check.key];
    const exists = value !== undefined && value !== null;
    const correctType = exists && (
      check.type === 'array' ? Array.isArray(value) : typeof value === check.type
    );
    
    if (check.required && !exists) {
      console.log(`   ❌ ${check.key}: MANQUANT (requis)`);
      allPassed = false;
    } else if (exists && !correctType) {
      console.log(`   ⚠️  ${check.key}: Type incorrect (attendu: ${check.type}, reçu: ${typeof value})`);
      allPassed = false;
    } else if (exists) {
      console.log(`   ✅ ${check.key}: ${check.type === 'array' ? `Tableau (${value.length} éléments)` : 'OK'}`);
    } else {
      console.log(`   ⚠️  ${check.key}: Non présent (optionnel)`);
    }
  });
  
  return allPassed;
}

// Test 3: Vérifier le rendu des données
function testRendering(data) {
  console.log('\n🎨 Test 3: Vérification du rendu');
  console.log('----------------------------------');
  
  if (!data) {
    console.log('   ⚠️  Pas de données à tester');
    return false;
  }
  
  const issues = [];
  
  // Vérifier qu'il n'y a pas de [object Object]
  const checkForObjectString = (obj, path = '') => {
    for (const key in obj) {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && value.includes('[object Object]')) {
        issues.push(`[object Object] trouvé dans: ${currentPath}`);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        checkForObjectString(value, currentPath);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            checkForObjectString(item, `${currentPath}[${index}]`);
          }
        });
      }
    }
  };
  
  checkForObjectString(data);
  
  if (issues.length === 0) {
    console.log('   ✅ Aucun problème de rendu [object Object] détecté');
    return true;
  } else {
    console.log('   ❌ Problèmes détectés:');
    issues.forEach(issue => console.log(`      - ${issue}`));
    return false;
  }
}

// Test 4: Vérifier la sauvegarde CMS
async function testCMSSave() {
  console.log('\n💾 Test 4: Test de sauvegarde CMS');
  console.log('----------------------------------');
  console.log('   ⚠️  Ce test nécessite une authentification admin');
  console.log('   💡 Testez manuellement dans /admin/cms');
  console.log('   💡 Sélectionnez la page "home" et modifiez un champ');
  console.log('   💡 Cliquez sur "Enregistrer"');
  console.log('   💡 Vérifiez que les modifications apparaissent sur la page publique');
}

// Exécution des tests
async function runTests() {
  console.log(`🌐 URL de base: ${BASE_URL}\n`);
  
  const apiResult = await testCMSAPI();
  
  if (apiResult.success && apiResult.data) {
    const structureOk = testDataStructure(apiResult.data);
    const renderingOk = testRendering(apiResult.data);
    
    console.log('\n📋 RÉSUMÉ DES TESTS');
    console.log('===================');
    console.log(`   API CMS: ${apiResult.success ? '✅ OK' : '❌ ÉCHEC'}`);
    console.log(`   Structure: ${structureOk ? '✅ OK' : '⚠️  PROBLÈMES'}`);
    console.log(`   Rendu: ${renderingOk ? '✅ OK' : '❌ PROBLÈMES'}`);
    
    if (apiResult.success && structureOk && renderingOk) {
      console.log('\n✅ TOUS LES TESTS SONT PASSÉS !');
      console.log('✅ La page CMS d\'accueil fonctionne correctement\n');
    } else {
      console.log('\n⚠️  CERTAINS TESTS ONT ÉCHOUÉ');
      console.log('⚠️  Vérifiez les détails ci-dessus\n');
    }
  } else {
    console.log('\n📋 RÉSUMÉ DES TESTS');
    console.log('===================');
    console.log(`   API CMS: ${apiResult.success ? '✅ OK' : '⚠️  PAGE NON TROUVÉE'}`);
    console.log(`   Raison: ${apiResult.reason || 'Unknown'}`);
    console.log('\n💡 La page utilisera le contenu par défaut');
    console.log('💡 Pour activer le CMS, créez la page "home" dans /admin/cms\n');
  }
  
  testCMSSave();
}

// Exécuter les tests
runTests().catch(error => {
  console.error('\n❌ Erreur lors des tests:', error);
  process.exit(1);
});

