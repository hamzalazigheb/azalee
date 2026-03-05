# Commandes pour synchroniser les pages CMS de Production vers Staging

## Sur le serveur EC2

### Option 1: Utiliser mongosh (MongoDB Shell)

```bash
# Se connecter à MongoDB production
mongosh mongodb://localhost:27017/azalee_db

# Dans mongosh, exécuter:
use azalee_db
var prodPages = db.pagecontents.find({}).toArray()

# Se connecter à staging
use azalee_db_staging

# Copier toutes les pages
prodPages.forEach(function(page) {
  delete page._id; // Supprimer l'ID pour éviter les conflits
  db.pagecontents.updateOne(
    { path: page.path },
    { $set: page },
    { upsert: true }
  );
});

# Vérifier le nombre de pages
db.pagecontents.countDocuments({})

# Quitter
exit
```

### Option 2: Utiliser mongodump et mongorestore

```bash
# 1. Dumper la collection pagecontents de production
mongodump --host localhost:27017 --db azalee_db --collection pagecontents --out /tmp/mongo-dump

# 2. Restaurer dans staging (avec upsert pour ne pas écraser)
mongorestore --host localhost:27018 --db azalee_db_staging --collection pagecontents /tmp/mongo-dump/azalee_db/pagecontents.bson --drop

# 3. Nettoyer
rm -rf /tmp/mongo-dump
```

### Option 3: Commande MongoDB directe (une ligne)

```bash
mongosh mongodb://localhost:27017/azalee_db --eval "
  var pages = db.pagecontents.find({}).toArray();
  var staging = new Mongo('mongodb://localhost:27018').getDB('azalee_db_staging');
  pages.forEach(function(p) {
    delete p._id;
    staging.pagecontents.updateOne({path: p.path}, {\$set: p}, {upsert: true});
  });
  print('Synced ' + pages.length + ' pages');
"
```

### Option 4: Vérifier d'abord le nombre de pages

```bash
# Compter les pages en production
mongosh mongodb://localhost:27017/azalee_db --eval "db.pagecontents.countDocuments({})"

# Compter les pages en staging
mongosh mongodb://localhost:27018/azalee_db_staging --eval "db.pagecontents.countDocuments({})"
```

## Commande recommandée (la plus simple)

```bash
mongosh mongodb://localhost:27017/azalee_db --eval "
  var pages = db.pagecontents.find({}).toArray();
  var staging = new Mongo('mongodb://localhost:27018').getDB('azalee_db_staging');
  var synced = 0;
  pages.forEach(function(p) {
    var pageData = {
      path: p.path,
      title: p.title,
      content: p.content,
      published: p.published,
      lastModified: p.lastModified
    };
    staging.pagecontents.updateOne(
      {path: p.path},
      {\$set: pageData},
      {upsert: true}
    );
    synced++;
  });
  print('✅ Synced ' + synced + ' pages to staging');
  print('📊 Total pages in staging: ' + staging.pagecontents.countDocuments({}));
"
```

