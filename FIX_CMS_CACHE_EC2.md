# 🔄 Fix: Les modifications CMS n'apparaissent pas sur le serveur EC2

## Problème
Les modifications effectuées dans le CMS (ajout de partenaires, changement de contenu) n'apparaissent pas sur la page officielle du serveur EC2, alors qu'elles fonctionnent localement.

## Cause
Le problème est dû au cache Next.js et au cache du navigateur sur le serveur EC2.

## Solution

### Étape 1: Déployer les modifications sur EC2

```bash
# Sur votre machine locale
git add .
git commit -m "Fix: Add cache-busting for CMS content"
git push demo prod

# Sur EC2
cd ~/demo
git pull demo prod
```

### Étape 2: Forcer le rechargement du cache

**Option A: Script automatique (Recommandé)**

```bash
cd ~/demo
chmod +x fix-cms-cache-ec2.sh
./fix-cms-cache-ec2.sh
```

**Option B: Commandes manuelles**

```bash
cd ~/demo

# 1. Arrêter les containers
sudo docker-compose down

# 2. Supprimer le cache Next.js
sudo rm -rf .next

# 3. Reconstruire les containers (sans cache)
sudo docker-compose build --no-cache frontend backend

# 4. Redémarrer les containers
sudo docker-compose up -d

# 5. Attendre que les services démarrent
sleep 10

# 6. Vérifier que tout fonctionne
sudo docker-compose ps
```

### Étape 3: Vérifier que les données sont bien sauvegardées

```bash
# Vérifier dans MongoDB que les données sont bien présentes
sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.pagecontents.find({ path: 'home' }).pretty()"

# Vérifier les partenaires
sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.pagecontents.findOne({ path: 'home' }, { 'content.partners': 1 })"
```

### Étape 4: Vider le cache du navigateur

1. Ouvrez la page officielle dans votre navigateur
2. Appuyez sur **Ctrl+Shift+R** (Windows/Linux) ou **Cmd+Shift+R** (Mac) pour forcer le rechargement
3. Ou ouvrez les outils de développement (F12) et cochez "Disable cache" dans l'onglet Network

## Modifications apportées

Les pages suivantes ont été mises à jour pour forcer le rechargement du contenu CMS :

- ✅ `src/app/page.jsx` (Page d'accueil)
- ✅ `src/app/patrimoine/page.jsx`
- ✅ `src/app/placements/page.jsx`
- ✅ `src/app/immobilier/page.jsx`
- ✅ `src/app/fiscalite/page.jsx`
- ✅ `src/app/retraite/page.jsx`

Chaque page utilise maintenant :
- Un paramètre `t=${Date.now()}` pour éviter le cache
- L'option `cache: 'no-store'` dans fetch
- Les headers `Cache-Control` et `Pragma` pour désactiver le cache

## Vérification

Après avoir appliqué les modifications :

1. **Modifiez quelque chose dans le CMS** (ajoutez un partenaire, changez un texte)
2. **Sauvegardez** dans le CMS
3. **Rechargez la page officielle** avec Ctrl+Shift+R
4. **Les modifications devraient apparaître immédiatement**

## Si le problème persiste

1. **Vérifiez les logs des containers :**
   ```bash
   sudo docker-compose logs -f frontend
   ```

2. **Vérifiez que l'API retourne bien les données :**
   ```bash
   curl http://localhost/api/cms/content?path=home
   ```

3. **Vérifiez que la page est publiée :**
   ```bash
   sudo docker exec -it azalee-mongo mongosh azalee_db --eval "db.pagecontents.findOne({ path: 'home' }, { published: 1 })"
   ```

4. **Redémarrez complètement les containers :**
   ```bash
   sudo docker-compose down
   sudo docker-compose up -d --build
   ```

## Notes importantes

- Les modifications fonctionnent **localement** car le cache Next.js n'est pas activé en mode développement
- Sur le serveur de **production**, Next.js utilise le cache pour optimiser les performances
- Le script `fix-cms-cache-ec2.sh` force le rechargement en supprimant le cache et en reconstruisant les containers

