# 📋 URLs du CSV sans Page Correspondante

## ❌ Total: 2 URLs (9%)

Ces URLs nécessiteraient la création de nouvelles pages, ce qui n'a pas été fait selon la consigne "ne creer aucun pages".

---

## Détail des URLs Manquantes

### 1. Outils de Calcul d'Emprunt

**Ligne CSV**: 63  
**URL Source**: `/outils/calculateur-capacite-emprunt`  
**URL Destination demandée**: `/outils/capacite-emprunt`  
**Raison**: Ni la source ni la destination n'existent dans le codebase  

**Contenu demandé dans le CSV**:
- **H1**: "Calculateur de capacité d'emprunt"
- **Title**: "Calculateur capacité d'emprunt immobilier | Azalée"
- **Meta Description**: "Combien pouvez-vous emprunter pour votre projet immobilier ? Calculez votre enveloppe de financement en fonction de vos revenus et charges."

**Pages existantes similaires**:
- `/outils/calculs-financiers` ✅ (existe)
- `/outils/simulations-generales` ✅ (existe)
- `/outils` ✅ (existe)

**Solutions possibles**:
1. Créer la page `/outils/capacite-emprunt` avec un calculateur
2. Rediriger vers `/outils/calculs-financiers`
3. Rediriger vers `/outils/simulations-generales`

---

### 2. Outils de Calcul de Frais de Notaire

**Ligne CSV**: 70  
**URL Source**: `/outils/calculateur-frais-notaire`  
**URL Destination demandée**: `/outils/frais-notaire`  
**Raison**: Ni la source ni la destination n'existent dans le codebase  

**Contenu demandé dans le CSV**:
- **H1**: "Calculateur de frais de notaire"
- **Title**: "Calculateur frais de notaire immobilier | Azalée"
- **Meta Description**: "Estimez les frais d'acquisition (frais de notaire) pour votre achat immobilier dans l'ancien ou le neuf."

**Pages existantes similaires**:
- `/outils/calculs-financiers` ✅ (existe)
- `/outils/simulations-generales` ✅ (existe)
- `/outils` ✅ (existe)

**Solutions possibles**:
1. Créer la page `/outils/frais-notaire` avec un calculateur
2. Rediriger vers `/outils/calculs-financiers`
3. Rediriger vers `/outils/simulations-generales`

---

## 📊 Statistiques

| Statut | Nombre | Pourcentage |
|--------|--------|-------------|
| ✅ URLs avec redirection | 20 | 91% |
| ❌ URLs sans page | 2 | 9% |

---

## 🎯 Recommandations

### Option 1: Rediriger vers les pages parent existantes

Ajouter ces redirections temporaires dans `next.config.mjs`:

```javascript
// Redirections temporaires vers pages existantes
{
  source: '/outils/calculateur-capacite-emprunt',
  destination: '/outils/calculs-financiers',
  permanent: false, // temporary (302)
},
{
  source: '/outils/capacite-emprunt',
  destination: '/outils/calculs-financiers',
  permanent: false,
},
{
  source: '/outils/calculateur-frais-notaire',
  destination: '/outils/calculs-financiers',
  permanent: false,
},
{
  source: '/outils/frais-notaire',
  destination: '/outils/calculs-financiers',
  permanent: false,
},
```

### Option 2: Créer les pages manquantes

Si vous décidez de créer ces outils:

1. **Créer `/outils/capacite-emprunt`**
   - Calculateur de capacité d'emprunt
   - Formulaire: revenus, charges, taux, durée
   - Résultat: montant empruntable

2. **Créer `/outils/frais-notaire`**
   - Calculateur de frais de notaire
   - Formulaire: prix d'achat, type (neuf/ancien), département
   - Résultat: frais d'acquisition estimés

### Option 3: Ne rien faire

Laisser ces URLs retourner une 404. Les utilisateurs arrivant sur ces URLs non existantes verront la page d'erreur 404.

---

## ✅ Conclusion

**91% de couverture** sans créer aucune nouvelle page. Les 2 URLs restantes (9%) sont des outils de calcul qui nécessiteraient du développement pour être fonctionnels.





