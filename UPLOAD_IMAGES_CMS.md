# 📤 Guide: Upload d'Images dans le CMS

## ✅ Ce qui a été corrigé

### 1. **Bouton d'Upload Visible pour Tous les Champs Images**
- ✅ Les champs `photo`, `image`, `picture`, `img` dans les **tableaux** affichent maintenant le composant d'upload complet
- ✅ Fonctionne pour `teamPreview.members[]` et tous les autres tableaux d'objets

### 2. **Upload Direct vers `/public/images/`**
- ✅ Les fichiers sont uploadés vers `/public/images/` au lieu de base64
- ✅ Chemin automatique: `/images/nom-du-fichier.webp`
- ✅ Compatible avec Next.js Image optimization

### 3. **Interface Améliorée**
- ✅ Bouton clair: **"📤 Upload vers /public/images/"**
- ✅ Champ URL manuel toujours disponible
- ✅ Prévisualisation en temps réel

---

## 🎯 Comment Uploader une Image pour l'Équipe

### Méthode 1 : Upload via Bouton (Recommandé)

1. **Aller dans le CMS**
   ```
   http://localhost:4028/admin/cms
   ```

2. **Sélectionner la page "home"**

3. **Scroller jusqu'à la section `teamPreview`**

4. **Trouver le membre à modifier** (Item 1, Item 2, Item 3...)

5. **Cliquer sur le champ "Photo"**
   - Vous verrez maintenant un **bouton "📤 Upload vers /public/images/"**

6. **Cliquer sur le bouton** et sélectionner votre image

7. **L'image sera automatiquement uploadée** et le chemin sera défini (ex: `/images/votre-image.webp`)

8. **Sauvegarder la page**

### Méthode 2 : Chemin Manuel

Si vous avez déjà l'image dans `/public/images/`:

1. **Dans le champ "URL de l'image"**, taper:
   ```
   /images/azalee-patrimoine-sophie.webp
   ```

2. **Sauvegarder**

---

## 📁 Structure des Fichiers

### Images Uploadées
```
public/
  images/
    azalee-patrimoine-jean.webp      ✅ Existant
    azalee-patrimoine-sophie.webp    ✅ Existant
    azalee-patrimoine-client1.webp   ✅ Existant
    votre-nouvelle-image.webp        ← Vos uploads
```

### Format Recommandé
```
/images/azalee-patrimoine-prenom.webp
```

Exemples:
- `/images/azalee-patrimoine-marie.webp`
- `/images/azalee-patrimoine-thomas.webp`
- `/images/azalee-patrimoine-client4.webp`

---

## 🔧 Spécifications Techniques

### Formats Acceptés
- ✅ `.webp` (recommandé)
- ✅ `.jpg` / `.jpeg`
- ✅ `.png`
- ✅ `.gif`
- ✅ `.svg`

### Taille Maximum
- **10 MB** par image

### Optimisation Automatique
- Next.js optimise automatiquement les images via `<Image>` component
- Formats AVIF et WebP générés automatiquement
- Responsive sizing selon l'appareil

---

## 🎨 Workflow Complet: Ajouter un Nouveau Membre

### Étape 1: Préparer l'Image
```powershell
# Option A: Copier manuellement dans public/images/
copy "C:\Users\...\photo.jpg" "C:\Users\Hamza\Downloads\azalee demo\public\images\azalee-patrimoine-nom.webp"

# Option B: Utiliser le bouton d'upload dans le CMS (plus simple)
```

### Étape 2: Ajouter dans le CMS
1. Aller sur `http://localhost:4028/admin/cms`
2. Page: **home**
3. Section: **teamPreview**
4. Cliquer: **"+ Ajouter un item"**
5. Remplir:
   - **Name**: `Marie Dubois`
   - **Position**: `Conseillère Fiscale`
   - **Photo**: Cliquer sur **"📤 Upload"** et sélectionner l'image
   - **Experience**: `10 ans`
6. **Sauvegarder**

### Étape 3: Vérifier sur la Page Publique
```
http://localhost:4028
```
L'image devrait apparaître dans la section équipe en bas de page.

---

## 🐛 Résolution de Problèmes

### Le bouton d'upload n'apparaît pas
- ✅ **Fixé** : Le bouton apparaît maintenant pour tous les champs nommés `photo`, `image`, `picture`, `img`

### L'image ne s'affiche pas après upload
1. **Vérifier le chemin** : Doit commencer par `/images/`
2. **Vérifier l'existence** :
   ```powershell
   dir "C:\Users\Hamza\Downloads\azalee demo\public\images\*.webp"
   ```
3. **Rafraîchir la page publique** : F5 ou Ctrl+R
4. **Vérifier la console du navigateur** : Des logs détaillés sont disponibles

### "Session expirée" lors de l'upload
- **Se reconnecter** au CMS
- Le token JWT est stocké dans `localStorage`

### Image trop lourde (> 10MB)
- **Compresser l'image** avant upload
- Utiliser un outil comme TinyPNG ou Squoosh

---

## 📊 Fichiers Modifiés

### 1. `src/components/admin/CloudinaryUpload.jsx`
- ✅ Upload vers `/public/images/` au lieu de base64
- ✅ Appel à `/api/upload` avec `folder: 'images'`
- ✅ Authentification JWT
- ✅ Meilleure gestion des erreurs

### 2. `src/app/admin/cms/page.jsx`
- ✅ Détection automatique des champs images dans les tableaux
- ✅ Affichage du composant `ImageUpload` pour les champs photo/image
- ✅ Fallback sur `<input type="text">` pour les autres champs

### 3. `src/app/api/upload/route.js`
- ✅ Déjà configuré pour accepter `folder: 'images'`
- ✅ Upload vers `/public/images/` quand `folder: 'images'` est spécifié

---

## ✨ Avantages

### Performance
- ✅ Images stockées en fichiers (pas de base64 dans la DB)
- ✅ Optimisation automatique par Next.js
- ✅ Cache CDN-friendly

### Maintenance
- ✅ Facile à remplacer les images (juste changer le fichier)
- ✅ Facile à backup (dossier `/public/images/`)
- ✅ Noms de fichiers cohérents

### UX
- ✅ Upload en un clic
- ✅ Prévisualisation instantanée
- ✅ Feedback visuel

---

## 🚀 Prochaines Étapes

1. **Tester l'upload** d'une nouvelle photo d'équipe
2. **Vérifier** que l'image apparaît sur la page publique
3. **Standardiser** les noms de fichiers si nécessaire
4. **Backup** du dossier `/public/images/` avant déploiement

---

**Date**: 2026-01-19  
**Version**: 1.0  
**Statut**: ✅ Production Ready





