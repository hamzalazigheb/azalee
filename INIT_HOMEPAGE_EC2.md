# 🏠 Initialiser la Page d'Accueil dans le CMS sur EC2

## Problème
La page d'accueil n'apparaît pas dans le CMS sur EC2.

## Solution

### Option 1: Script Automatique (Recommandé)

```bash
cd ~/demo
chmod +x init-homepage-ec2.sh
./init-homepage-ec2.sh
```

### Option 2: Exécution Manuelle

```bash
cd ~/demo

# 1. Vérifier que MongoDB est en cours d'exécution
sudo docker-compose ps mongo

# 2. Exécuter le script d'initialisation
# Option A: Si Node.js est installé sur EC2
node scripts/init-accueil-cms.js

# Option B: Exécuter dans le container backend
sudo docker exec azalee-backend node /app/scripts/init-accueil-cms.js

# Option C: Utiliser docker-compose run
sudo docker-compose run --rm backend node /app/scripts/init-accueil-cms.js
```

### Option 3: Via l'API MongoDB Directement

Si les scripts ne fonctionnent pas, vous pouvez créer la page directement via MongoDB :

```bash
# Entrer dans MongoDB
sudo docker exec -it azalee-mongo mongosh azalee_db

# Dans MongoDB shell, créer la page
db.pagecontents.insertOne({
  path: "home",
  title: "Page d'accueil",
  content: {},
  published: true,
  lastModified: new Date()
})

# Vérifier
db.pagecontents.find({ path: "home" })

# Sortir
exit
```

## Vérification

Après l'initialisation :

1. **Vérifier via l'API :**
   ```bash
   curl http://localhost/api/cms/pages
   ```
   Vous devriez voir la page "home" dans la réponse.

2. **Vérifier dans le CMS :**
   - Accédez à `http://your-ec2-ip/admin/cms`
   - La page "Page d'accueil" devrait apparaître dans la liste à gauche

3. **Vérifier dans MongoDB :**
   ```bash
   sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.pagecontents.find({ path: 'home' }).pretty()"
   ```

## Si la Page Existe Déjà

Si la page existe mais n'apparaît pas :

1. **Vérifier le statut published :**
   ```bash
   sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.pagecontents.updateOne({ path: 'home' }, { \$set: { published: true } })"
   ```

2. **Rafraîchir le CMS :**
   - Rechargez la page `/admin/cms` dans votre navigateur
   - Videz le cache si nécessaire (Ctrl+Shift+R)

## Structure de la Page

La page d'accueil est créée avec le path `"home"` et le titre `"Page d'accueil"`. Elle contient toutes les sections :
- Hero
- Intro
- Team
- Experts
- Stats
- Investment
- Tax
- Partners
- Final CTA

Toutes ces sections sont éditables via le CMS.

