# Configuration Cloudinary et dnd-kit

## Cloudinary

### Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### Comment obtenir vos credentials Cloudinary

1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Allez dans le Dashboard
3. Copiez :
   - **Cloud Name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

### Utilisation

Le composant `CloudinaryUpload` est maintenant intégré dans le CMS pour les champs de type `image`.

## dnd-kit

### Fonctionnalités

- **Drag & Drop** activé pour tous les tableaux dans le CMS
- Réorganisez les éléments en les glissant-déposant
- Support clavier pour l'accessibilité
- Animation fluide

### Utilisation

Dans le CMS, tous les tableaux (arrays) supportent maintenant le drag & drop :
- Glissez l'icône ☰ à gauche de chaque élément
- Déposez à la position souhaitée
- L'ordre est automatiquement sauvegardé

