# 👥 Guide de Gestion de la Section Équipe via CMS

## 📋 Initialisation de la Section

### Étape 1 : Exécuter le Script d'Initialisation

```bash
# Dans le terminal, à la racine du projet
node scripts/init-team-section.js
```

Ce script va :
- ✅ Créer ou mettre à jour la section `teamPreview` dans MongoDB
- ✅ Initialiser 3 membres d'équipe par défaut
- ✅ Rendre la section modifiable via le CMS

---

## 🎨 Modification via le CMS

### Accès au CMS

1. **Ouvrir** : `http://localhost:4028/admin/cms`
2. **Sélectionner** : Page "Accueil" ou "home"
3. **Chercher** : Section `teamPreview`

---

## 📝 Structure de la Section Équipe

### Vue d'Ensemble

```json
{
  "teamPreview": {
    "title": "Rencontrez votre équipe de gestion",
    "subtitle": "Des experts passionnés et certifiés...",
    "members": [
      {
        "name": "Jean-Marc Dupont",
        "position": "Fondateur & Directeur",
        "photo": "/images/azalee-patrimoine-jean.webp",
        "experience": "20+ ans"
      }
    ],
    "buttonText": "En savoir plus sur notre équipe"
  }
}
```

---

## 🔧 Champs Modifiables

### Section Principale

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `title` | Texte | Titre de la section | "Rencontrez votre équipe de gestion" |
| `subtitle` | Texte | Sous-titre descriptif | "Des experts passionnés..." |
| `buttonText` | Texte | Texte du bouton CTA | "En savoir plus sur notre équipe" |
| `members` | Array | Liste des membres | `[{...}, {...}]` |

### Pour Chaque Membre

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `name` | Texte | Nom complet | "Jean-Marc Dupont" |
| `position` | Texte | Poste/Fonction | "Fondateur & Directeur" |
| `photo` | URL | Chemin de la photo | "/images/prenom-nom.webp" |
| `experience` | Texte | Années d'expérience | "20+ ans" |

---

## 📸 Gestion des Images

### Option 1 : Utiliser des Images Existantes

Images disponibles dans `/public/images/` :
```
/images/azalee-patrimoine-jean.webp
/images/azalee-patrimoine-sophie.webp
/images/azalee-patrimoine-client1.webp
/images/azalee-patrimoine-client2.webp
/images/azalee-patrimoine-client3.webp
```

### Option 2 : Ajouter de Nouvelles Images

1. **Placer** l'image dans `/public/images/`
2. **Nommer** : `azalee-patrimoine-prenom-nom.webp`
3. **Format recommandé** :
   - Format : WebP (meilleure compression)
   - Dimensions : 800x600px minimum
   - Ratio : 4:3 (pour garder la cohérence)
   - Poids : < 200KB

4. **Utiliser** dans le CMS : `/images/azalee-patrimoine-prenom-nom.webp`

---

## ✏️ Exemples de Modification

### Ajouter un Nouveau Membre

Dans le CMS, ajouter dans `teamPreview.members` :

```json
{
  "name": "Marie Dubois",
  "position": "Responsable Placements",
  "photo": "/images/azalee-patrimoine-marie.webp",
  "experience": "10 ans"
}
```

### Modifier un Membre Existant

Trouver le membre dans `teamPreview.members[0]` et modifier :

```json
{
  "name": "Jean-Marc Dupont",
  "position": "CEO & Fondateur",  // ← Modifié
  "photo": "/images/azalee-patrimoine-jean-new.webp",  // ← Nouvelle photo
  "experience": "25+ ans"  // ← Mis à jour
}
```

### Supprimer un Membre

Supprimer l'objet membre du tableau `teamPreview.members`.

---

## 🎯 Cas d'Usage Fréquents

### Cas 1 : Changer Toutes les Photos

```json
{
  "teamPreview": {
    "members": [
      {
        "name": "Jean-Marc Dupont",
        "position": "Fondateur & Directeur",
        "photo": "/images/equipe/jean-marc-2024.webp",  // ← Nouvelle photo
        "experience": "20+ ans"
      },
      {
        "name": "Sophie Martin",
        "position": "Conseillère en Gestion de Patrimoine",
        "photo": "/images/equipe/sophie-2024.webp",  // ← Nouvelle photo
        "experience": "15 ans"
      }
    ]
  }
}
```

### Cas 2 : Modifier le Titre et Sous-titre

```json
{
  "teamPreview": {
    "title": "Votre équipe d'experts dédiés",  // ← Nouveau titre
    "subtitle": "Plus de 50 ans d'expérience cumulée à votre service",  // ← Nouveau sous-titre
    "members": [...]
  }
}
```

### Cas 3 : Ajouter un 4ème Membre

```json
{
  "teamPreview": {
    "members": [
      {...},  // Jean-Marc
      {...},  // Sophie
      {...},  // Thomas
      {  // ← Nouveau membre
        "name": "Élise Moreau",
        "position": "Spécialiste Retraite",
        "photo": "/images/azalee-patrimoine-elise.webp",
        "experience": "8 ans"
      }
    ]
  }
}
```

---

## 🔍 Vérification après Modification

### 1. Vérifier dans le CMS

- La section `teamPreview` doit être visible
- Tous les champs doivent être remplis
- Les chemins d'images doivent être corrects

### 2. Vérifier sur le Site

1. **Ouvrir** : `http://localhost:4028`
2. **Scroller** jusqu'à "Rencontrez votre équipe de gestion"
3. **Vérifier** :
   - ✅ Les photos s'affichent correctement
   - ✅ Les noms et postes sont corrects
   - ✅ Le badge d'expérience est visible
   - ✅ Le bouton fonctionne

### 3. Vérifier les Logs

Dans la console du navigateur (F12), chercher :
```
✅ CMS content merged successfully
```

---

## ⚠️ Erreurs Courantes et Solutions

### Erreur : Photo ne s'affiche pas

**Cause** : Chemin d'image incorrect

**Solution** :
1. Vérifier que l'image existe dans `/public/images/`
2. Vérifier le chemin : `/images/nom-fichier.webp` (pas `/public/images/`)
3. Vérifier l'extension : `.webp`, `.jpg`, `.png`

### Erreur : Modifications non visibles

**Cause** : Cache ou CMS non sauvegardé

**Solution** :
1. Cliquer sur "Sauvegarder" dans le CMS
2. Rafraîchir la page (Ctrl+F5)
3. Vérifier les logs de la console

### Erreur : Section ne s'affiche pas

**Cause** : Section non dans `sectionOrder`

**Solution** :
1. Vérifier que `teamPreview` est dans `sectionOrder`
2. Réexécuter le script d'initialisation
3. Vider le cache du navigateur

---

## 📊 Structure Complète Exemple

```json
{
  "teamPreview": {
    "title": "Rencontrez votre équipe de gestion",
    "subtitle": "Des experts passionnés et certifiés, dédiés à la réussite de vos projets patrimoniaux.",
    "members": [
      {
        "name": "Jean-Marc Dupont",
        "position": "Fondateur & Directeur",
        "photo": "/images/azalee-patrimoine-jean.webp",
        "experience": "20+ ans"
      },
      {
        "name": "Sophie Martin",
        "position": "Conseillère en Gestion de Patrimoine",
        "photo": "/images/azalee-patrimoine-sophie.webp",
        "experience": "15 ans"
      },
      {
        "name": "Thomas Bernard",
        "position": "Expert Fiscal",
        "photo": "/images/azalee-patrimoine-client1.webp",
        "experience": "12 ans"
      }
    ],
    "buttonText": "En savoir plus sur notre équipe"
  }
}
```

---

## 🚀 Checklist de Déploiement

Avant de déployer en production :

- [ ] Toutes les images sont optimisées (< 200KB)
- [ ] Les chemins d'images sont corrects
- [ ] Les noms et postes sont à jour
- [ ] Le texte est relu et corrigé
- [ ] La section s'affiche correctement en local
- [ ] Les images s'affichent sur tous les appareils (responsive)
- [ ] Le bouton CTA fonctionne

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifier** les logs : Console navigateur (F12)
2. **Réexécuter** le script : `node scripts/init-team-section.js`
3. **Vider le cache** : Ctrl+Shift+R (hard refresh)
4. **Redémarrer** le serveur : `npm run dev`

---

**Date de création** : 2026-01-19  
**Version** : 1.0





