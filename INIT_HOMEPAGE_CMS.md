# 🏠 Initialiser la Page d'Accueil dans le CMS

## Problème
La page d'accueil n'apparaît pas dans le CMS.

## Solution

### Option 1: Script Automatique (Recommandé)

Sur EC2, exécutez :

```bash
cd ~/demo
chmod +x init-homepage-ec2.sh
./init-homepage-ec2.sh
```

### Option 2: Exécution Manuelle

```bash
cd ~/demo

# Méthode 1: Via le container backend
sudo docker exec azalee-backend node /tmp/init-accueil-cms.js

# Ou copier d'abord le script
sudo docker cp scripts/init-accueil-cms.js azalee-backend:/tmp/
sudo docker exec -e MONGODB_URI="mongodb://mongo:27017/azalee_db" azalee-backend node /tmp/init-accueil-cms.js
```

### Option 3: Via MongoDB Directement

```bash
# Entrer dans MongoDB
sudo docker exec -it azalee-mongo mongosh azalee_db

# Vérifier si la page existe
db.pagecontents.findOne({ path: "home" })

# Si elle n'existe pas, vous pouvez la créer manuellement ou exécuter le script
```

### Option 4: Via l'API (si le backend est accessible)

```bash
# Créer la page via l'API
curl -X POST http://localhost/api/cms/pages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "path": "home",
    "title": "Page d'\''accueil",
    "content": {},
    "published": true
  }'
```

## Vérification

Après l'initialisation :

1. **Rafraîchir la page CMS** (`/admin/cms`)
2. **Chercher "Page d'accueil"** dans la liste des pages
3. **Le path devrait être "home"**

## Si la Page Existe Déjà

Si la page existe mais n'apparaît pas :

1. **Vérifier qu'elle est publiée** :
   ```javascript
   // Dans MongoDB
   db.pagecontents.updateOne(
     { path: "home" },
     { $set: { published: true } }
   )
   ```

2. **Vérifier le titre** :
   ```javascript
   db.pagecontents.findOne({ path: "home" }, { title: 1 })
   ```

3. **Rafraîchir le CMS** (F5 ou Ctrl+R)

## Structure de la Page

La page d'accueil utilise :
- **Path**: `home`
- **Title**: `Page d'accueil`
- **Content**: Structure complète avec toutes les sections (hero, team, experts, stats, etc.)

## Notes

- Le script `init-accueil-cms.js` doit être exécuté au moins une fois pour créer la page
- Si la page existe déjà, le script la met à jour avec la structure complète
- La page doit avoir `published: true` pour apparaître dans le CMS

