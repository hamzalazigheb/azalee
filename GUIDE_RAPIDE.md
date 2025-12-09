# 🚀 GUIDE RAPIDE - AZALÉE PATRIMOINE

## 📋 RÉSUMÉ DES FONCTIONNALITÉS

### ✅ 1. SYSTÈME CMS
**Où** : `/admin/cms`  
**Fonction** : Modifier le contenu de toutes les pages  
**Sauvegarde** : MongoDB → Collection `pagecontents`  
**Comment** : Interface visuelle → Cliquer "Enregistrer" → Sauvegarde automatique

### ✅ 2. GESTION DES CONTACTS
**Où** : `/admin/contacts`  
**Fonction** : Voir et gérer les demandes de contact  
**Sauvegarde** : MongoDB → Collection `contacts`  
**Comment** : Formulaire `/contact` → Sauvegarde automatique → Visible dans admin

### ✅ 3. GESTION DES UTILISATEURS
**Où** : `/admin/users`  
**Fonction** : Créer/modifier/supprimer des admins  
**Sauvegarde** : MongoDB → Collection `users`  
**Comment** : Interface admin → Création/modification → Mot de passe hashé automatiquement

### ✅ 4. CHATBOT SARA
**Où** : `/admin/chatbot`  
**Fonction** : Voir les conversations et rendez-vous  
**Sauvegarde** : MongoDB → Collection `chatbotsessions`  
**Comment** : Conversation automatique → Sauvegarde en temps réel

---

## 💾 COMMENT LES DONNÉES SONT SAUVEGARDÉES

### 📝 CMS - Modification de contenu

```
1. Admin modifie dans /admin/cms
2. Clique "Enregistrer"
3. → PUT /api/cms/pages
4. → MongoDB collection "pagecontents"
5. → Page publique mise à jour immédiatement
```

**Exemple** :
- Modifier le titre de la page "Patrimoine"
- Sauvegarde dans MongoDB : `{ path: "patrimoine", content: { hero: { title: "Nouveau titre" } } }`
- Visible sur `/patrimoine` immédiatement

### 📧 Contacts - Formulaire de contact

```
1. Visiteur remplit /contact
2. Soumet le formulaire
3. → POST /api/contact/submit
4. → MongoDB collection "contacts"
5. → Notification dans admin (badge)
```

**Exemple** :
- Formulaire soumis avec nom, email, téléphone, etc.
- Sauvegarde dans MongoDB : `{ nom: "...", email: "...", status: "new" }`
- Visible dans `/admin/contacts` avec statut "Nouveau"

### 👥 Utilisateurs - Création admin

```
1. Admin crée utilisateur dans /admin/users
2. → POST /api/auth/users
3. → MongoDB collection "users"
4. → Mot de passe hashé automatiquement (bcrypt)
```

**Exemple** :
- Création avec email "nouveau@azalee.com" et password "motdepasse123"
- Sauvegarde dans MongoDB : `{ email: "nouveau@azalee.com", password: "$2a$10$..." }`
- Password hashé avec bcrypt (salt rounds: 10)

### 🤖 Chatbot - Session de conversation

```
1. Visiteur parle avec chatbot
2. → POST /api/chatbot/sessions
3. → MongoDB collection "chatbotsessions"
4. → Mise à jour en temps réel
```

**Exemple** :
- Conversation avec collecte de profil
- Sauvegarde dans MongoDB : `{ sessionId: "...", profile: { nom: "...", email: "..." }, messages: [...] }`
- Visible dans `/admin/chatbot`

---

## 🗄️ COLLECTIONS MONGODB

| Collection | Description | Exemples de champs |
|------------|-------------|-------------------|
| `pagecontents` | Contenu CMS | path, title, content (JSON), published |
| `contacts` | Demandes de contact | nom, email, telephone, status, message |
| `users` | Utilisateurs admin | email, password (hashé), name, role |
| `chatbotsessions` | Sessions chatbot | sessionId, profile, messages, rendezVous |

---

## 🔄 FLUX DE SAUVEGARDE RAPIDE

### CMS
```
Interface Admin → API PUT /api/cms/pages → MongoDB pagecontents → Page publique
```

### Contacts
```
Formulaire public → API POST /api/contact/submit → MongoDB contacts → Admin panel
```

### Utilisateurs
```
Admin panel → API POST /api/auth/users → MongoDB users (password hashé)
```

### Chatbot
```
Conversation → API POST /api/chatbot/sessions → MongoDB chatbotsessions → Admin panel
```

---

## 📊 STATISTIQUES

- **Pages CMS** : 8+ pages principales (home, patrimoine, placements, etc.)
- **Pages publiques** : 80+ pages thématiques
- **Collections MongoDB** : 4 collections principales
- **API Routes** : 20+ endpoints

---

## 🔐 SÉCURITÉ

- ✅ **Mots de passe** : Hashés avec bcrypt (salt rounds: 10)
- ✅ **Authentification** : JWT tokens (valides 7 jours)
- ✅ **Validation** : Mongoose schemas avec validation
- ✅ **Protection** : Routes admin protégées

---

## 📖 DOCUMENTATION COMPLÈTE

Pour plus de détails, voir **`DOCUMENTATION_COMPLETE.md`**

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2025

