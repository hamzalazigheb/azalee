# Guide CMS - Finalisation des 5 Pages Principales

## 📋 Vue d'ensemble

Ce guide explique comment finaliser et gérer les 5 principales pages du site via le CMS admin.

## 🎯 Les 5 Pages Principales

1. **Placements** (`/placements`)
2. **Patrimoine** (`/patrimoine`)
3. **Immobilier** (`/immobilier`)
4. **Fiscalité** (`/fiscalite`)
5. **Retraite** (`/retraite`)

## 🚀 Initialisation des Pages dans le CMS

### Étape 1 : Exécuter le Script d'Initialisation

Le script `scripts/init-main-pages-cms.js` initialise automatiquement toutes les pages avec leur structure de contenu complète.

```bash
# Depuis la racine du projet
node scripts/init-main-pages-cms.js
```

Ce script :
- ✅ Crée les 5 pages dans MongoDB si elles n'existent pas
- ✅ Initialise toutes les sections de contenu pour chaque page
- ✅ Préserve le contenu existant (merge intelligent)
- ✅ Met à jour la date de modification

### Étape 2 : Vérifier dans le CMS Admin

1. Connectez-vous à `/admin`
2. Allez dans **"Gestion du contenu"** (CMS)
3. Vous devriez voir les 5 pages listées :
   - Placements
   - Patrimoine
   - Immobilier
   - Fiscalité
   - Retraite

## ✏️ Modifier le Contenu d'une Page

### Dans le CMS Admin

1. **Sélectionner une page** : Cliquez sur une page dans la liste
2. **Naviguer dans les sections** : Toutes les sections sont organisées hiérarchiquement
3. **Modifier les champs** :
   - **Texte simple** : Champs de saisie standard
   - **Texte long** : Zones de texte (textarea)
   - **Tableaux** : Ajouter/supprimer des éléments
   - **Objets imbriqués** : Sections avec sous-sections

4. **Enregistrer** : Cliquez sur "Enregistrer les modifications"

### Structure des Sections

Chaque page contient plusieurs sections principales :

#### Page Placements
- `hero` : Titre, introduction, objectifs
- `section1` : Comprendre les placements
- `section2` : Placements sans risque
- `section3` : Questions fréquentes
- `articles` : Articles et guides

#### Page Patrimoine
- `hero` : Cartes gauche/droite
- `enQuelquesMots` : Introduction
- `definition` : Définition de la gestion de patrimoine
- `pourquoiCGP` : Pourquoi faire appel à un CGP
- `auditPatrimonial` : L'inventaire patrimonial
- `expertises` : Nos expertises
- `casConcrets` : Cas concrets
- `faq` : Questions fréquentes

#### Page Immobilier
- `hero` : Section hero avec cartes
- `section1` : Pourquoi investir
- `section2` : Les leviers de l'investissement

#### Page Fiscalité
- `hero` : Cartes gauche/droite

#### Page Retraite
- `hero` : Section hero

## 🔧 Fonctionnalités du CMS

### Gestion des Champs Imbriqués

Le CMS gère automatiquement les structures imbriquées :
- **Niveau 1** : `hero.h1`
- **Niveau 2** : `section2.h3_inflation.title`
- **Niveau 3+** : Support complet de la récursivité

### Gestion des Tableaux

- **Tableaux simples** : Liste de chaînes
- **Tableaux d'objets** : Liste d'objets avec propriétés multiples
- **Ajouter/Supprimer** : Boutons pour gérer les éléments

### Synchronisation Automatique

- Les modifications dans le CMS sont immédiatement disponibles sur les pages publiques
- L'API `/api/cms/content` et `/api/cms/pages` sont synchronisées
- Pas besoin de redémarrer le serveur

## ✅ Vérification

### Vérifier qu'une Page Peut Modifier Tout son Contenu

1. **Ouvrir une page** dans le CMS (`/admin/cms`)
2. **Vérifier toutes les sections** :
   - Toutes les sections doivent être visibles
   - Tous les champs doivent être éditables
   - Les tableaux doivent être modifiables

3. **Tester une modification** :
   - Modifier un champ
   - Enregistrer
   - Vérifier sur la page publique que le changement est visible

### Checklist de Vérification

Pour chaque page, vérifier :
- [ ] Hero section (titre, description, boutons)
- [ ] Toutes les sections principales
- [ ] Tous les textes sont éditables
- [ ] Tous les liens sont modifiables
- [ ] Tous les tableaux sont modifiables
- [ ] Les objets imbriqués sont accessibles
- [ ] Les modifications sont sauvegardées correctement
- [ ] Les modifications apparaissent sur la page publique

## 🐛 Dépannage

### Page non trouvée dans le CMS

```bash
# Réinitialiser la page
node scripts/init-main-pages-cms.js
```

### Modifications non visibles

1. Vérifier que la page est publiée (`published: true`)
2. Vérifier le cache du navigateur
3. Vérifier que l'API `/api/cms/content` retourne les bonnes données

### Erreur de sauvegarde

1. Vérifier la console du navigateur
2. Vérifier les logs du serveur
3. Vérifier la connexion MongoDB

## 📝 Notes Importantes

- **Structure flexible** : Le CMS s'adapte automatiquement à la structure de contenu
- **Rétrocompatibilité** : Les pages existantes conservent leur contenu
- **Merge intelligent** : Le script d'initialisation ne supprime pas le contenu existant
- **Édition en temps réel** : Les modifications sont immédiates

## 🎨 Personnalisation

Pour ajouter de nouvelles sections à une page :

1. Modifier le script `scripts/init-main-pages-cms.js`
2. Ajouter la nouvelle section dans `pagesContent[pageName].content`
3. Réexécuter le script
4. La nouvelle section apparaîtra automatiquement dans le CMS

---

**Dernière mise à jour** : Après finalisation des 5 pages principales

