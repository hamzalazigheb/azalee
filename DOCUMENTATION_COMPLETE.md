# 📚 DOCUMENTATION COMPLÈTE - AZALÉE PATRIMOINE

## 🎯 VUE D'ENSEMBLE DU PROJET

**Azalée Patrimoine** est une plateforme web complète de gestion de patrimoine et conseil financier développée avec **Next.js 14**, **MongoDB** et **React**. Elle offre un système CMS headless, un dashboard admin complet, et de nombreuses fonctionnalités pour les clients.

---

## 🏗️ ARCHITECTURE GLOBALE

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Pages Publiques│  │ Admin Panel  │  │   Chatbot    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↕ API Routes
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Next.js API)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   CMS API    │  │  Auth API    │  │ Contact API  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ pagecontents │  │    users     │  │  contacts    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐                                         │
│  │chatbotsessions│                                         │
│  └──────────────┘                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 FONCTIONNALITÉS PRINCIPALES

### 1. 🎨 SYSTÈME CMS (Content Management System)

#### Description
Système de gestion de contenu headless permettant de modifier le contenu de toutes les pages sans redémarrage du serveur.

#### Fonctionnalités
- ✅ **Édition visuelle** : Interface intuitive pour modifier le contenu
- ✅ **Gestion hiérarchique** : Support des structures imbriquées (objets dans objets)
- ✅ **Tableaux dynamiques** : Ajout/suppression/réorganisation d'éléments
- ✅ **Upload d'images** : Gestion des images via CloudinaryUpload
- ✅ **Drag & Drop** : Réorganisation des éléments avec @dnd-kit
- ✅ **Cache-busting** : Mise à jour immédiate sur les pages publiques
- ✅ **Édition de texte riche** : Support HTML dans les champs texte

#### Pages CMS disponibles
- `home` - Page d'accueil
- `patrimoine` - Gestion de patrimoine
- `placements` - Placements financiers
- `immobilier` - Investissement immobilier
- `fiscalite` - Fiscalité et optimisation fiscale
- `retraite` - Planification retraite
- `header` - En-tête du site
- `footer` - Pied de page

#### Comment sauvegarder les données CMS

**1. Via l'interface Admin (`/admin/cms`)**
```
1. Se connecter à /admin/login
2. Aller dans "Gestion du contenu" (/admin/cms)
3. Sélectionner une page dans la liste
4. Modifier les sections souhaitées
5. Cliquer sur "Enregistrer les modifications"
```

**2. Via l'API (`/api/cms/pages`)**
```javascript
// PUT - Mettre à jour une page
PUT /api/cms/pages
Body: {
  path: "patrimoine",
  content: {
    hero: { title: "Nouveau titre", ... },
    section1: { ... }
  }
}
```

**3. Structure de sauvegarde dans MongoDB**
```javascript
{
  _id: ObjectId("..."),
  path: "patrimoine",           // Chemin unique (lowercase)
  title: "Gestion de Patrimoine",
  content: {                    // Objet JSON flexible
    hero: {
      title: "Titre",
      description: "Description",
      image: "/images/hero.jpg"
    },
    section1: { ... },
    stats: [
      { value: "30+", label: "Années d'expérience" },
      { value: "1000+", label: "Clients satisfaits" }
    ]
  },
  published: true,
  lastModified: ISODate("2025-12-08T..."),
  modifiedBy: "admin",
  createdAt: ISODate("2025-12-08T..."),
  updatedAt: ISODate("2025-12-08T...")
}
```

**Collection MongoDB** : `pagecontents`

---

### 2. 👥 GESTION DES UTILISATEURS ADMIN

#### Description
Système d'authentification et gestion des utilisateurs administrateurs.

#### Fonctionnalités
- ✅ **Authentification JWT** : Connexion sécurisée avec tokens
- ✅ **Gestion des rôles** : admin, editor, viewer
- ✅ **CRUD utilisateurs** : Créer, lire, modifier, supprimer
- ✅ **Hachage des mots de passe** : bcryptjs avec salt
- ✅ **Sessions persistantes** : Tokens JWT valides 7 jours

#### Modèle de données User

```javascript
{
  _id: ObjectId("..."),
  email: "admin@azalee.com",     // Unique, lowercase
  password: "$2a$10$...",        // Hash bcrypt
  name: "Administrator",
  role: "admin",                 // admin | editor | viewer
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

**Collection MongoDB** : `users`

#### Comment sauvegarder les utilisateurs

**1. Création via API**
```javascript
POST /api/auth/users
Body: {
  email: "nouveau@azalee.com",
  password: "motdepasse123",
  name: "Nouvel Admin",
  role: "admin"
}
```

**2. Modification**
```javascript
PUT /api/auth/users/[id]
Body: {
  name: "Nom modifié",
  role: "editor"
}
```

**3. Suppression**
```javascript
DELETE /api/auth/users/[id]
```

**4. Connexion**
```javascript
POST /api/auth/login
Body: {
  email: "admin@azalee.com",
  password: "admin123"
}
Response: {
  success: true,
  token: "eyJhbGciOiJIUzI1NiIs...",
  user: { id: "...", email: "...", name: "...", role: "..." }
}
```

---

### 3. 📧 GESTION DES DEMANDES DE CONTACT

#### Description
Système de gestion des formulaires de contact soumis par les visiteurs.

#### Fonctionnalités
- ✅ **Formulaire de contact** : Page publique `/contact`
- ✅ **Gestion des statuts** : new, read, contacted, archived
- ✅ **Notifications** : Badge avec nombre de nouvelles demandes
- ✅ **Filtrage** : Par statut (Tous, Nouveaux, Lus, Contactés, Archivés)
- ✅ **Mise à jour optimiste** : Changement de statut instantané
- ✅ **Notes** : Ajout de notes pour chaque contact

#### Modèle de données Contact

```javascript
{
  _id: ObjectId("..."),
  nom: "Jean Dupont",
  email: "jean.dupont@example.com",
  telephone: "01 23 45 67 89",
  ville: "Paris",
  profession: "Profession libérale",
  patrimoine: "1 M€ – 5 M€",
  message: "Je souhaite un rendez-vous...",
  status: "new",                // new | read | contacted | archived
  notes: "",                    // Notes internes
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

**Collection MongoDB** : `contacts`

#### Comment sauvegarder les contacts

**1. Soumission via formulaire public**
```javascript
POST /api/contact/submit
Body: {
  nom: "Jean Dupont",
  email: "jean.dupont@example.com",
  telephone: "01 23 45 67 89",
  ville: "Paris",
  profession: "Profession libérale",
  patrimoine: "1 M€ – 5 M€",
  message: "Message du client"
}
```

**2. Mise à jour du statut**
```javascript
PUT /api/contact/update
Body: {
  id: "contact_id",
  status: "contacted",          // new | read | contacted | archived
  notes: "Client contacté le 08/12/2025"
}
```

**3. Récupération de la liste**
```javascript
GET /api/contact/list?filter=new
Response: {
  success: true,
  contacts: [
    { _id: "...", nom: "...", email: "...", status: "new", ... }
  ]
}
```

**4. Comptage des nouveaux contacts**
```javascript
GET /api/contact/count
Response: {
  success: true,
  count: 5
}
```

---

### 4. 🤖 CHATBOT SARA

#### Description
Assistant virtuel intelligent pour guider les visiteurs et collecter leurs informations.

#### Fonctionnalités
- ✅ **Conversation interactive** : Questions/réponses dynamiques
- ✅ **Collecte de profil** : Nom, prénom, téléphone, email, situation
- ✅ **Gestion des rendez-vous** : Prise de rendez-vous intégrée
- ✅ **Sessions persistantes** : Sauvegarde des conversations
- ✅ **Statistiques** : Dashboard avec métriques

#### Modèle de données ChatbotSession

```javascript
{
  _id: ObjectId("..."),
  sessionId: "unique_session_id",
  status: "active",             // active | completed | abandoned
  currentStep: "welcome",
  profile: {
    nom: "Jean",
    prenom: "Dupont",
    telephone: "01 23 45 67 89",
    email: "jean@example.com",
    age: 45,
    situationMatrimoniale: "marié",
    enfants: true,
    nombreEnfants: 2,
    situationProfessionnelle: "Salarié",
    tmi: "30%",
    placementsFinanciers: "Assurance-vie",
    placementsImmobiliers: "Résidence principale",
    montantProjet: "500K€ - 1M€"
  },
  intention: "Optimiser placements",
  thematique: "Placements financiers",
  questionPosee: "Comment optimiser mes placements ?",
  actionFinale: "rdv",          // pdf | rdv | rappel | null
  rendezVous: {
    date: ISODate("2025-12-15T..."),
    heure: "14:00",
    canal: "Visio",
    statut: "en_cours"          // en_cours | done | canceled
  },
  messages: [
    {
      role: "user",
      content: "Bonjour",
      timestamp: ISODate("...")
    },
    {
      role: "assistant",
      content: "Bonjour ! Comment puis-je vous aider ?",
      timestamp: ISODate("...")
    }
  ],
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

**Collection MongoDB** : `chatbotsessions`

#### Comment sauvegarder les sessions chatbot

**1. Création d'une session**
```javascript
POST /api/chatbot/sessions
Body: {
  sessionId: "unique_id",
  profile: { ... },
  messages: [ ... ]
}
```

**2. Mise à jour d'une session**
```javascript
PUT /api/chatbot/sessions
Body: {
  sessionId: "unique_id",
  currentStep: "collect_info",
  profile: { ... },
  messages: [ ... ]
}
```

**3. Mise à jour du statut de rendez-vous**
```javascript
PUT /api/chatbot/rendezvous
Body: {
  sessionId: "unique_id",
  statut: "done"                // en_cours | done | canceled
}
```

---

### 5. 📊 DASHBOARD ADMIN

#### Description
Interface d'administration complète pour gérer tous les aspects du site.

#### Pages Admin disponibles

**1. Dashboard Principal (`/admin`)**
- Vue d'ensemble des statistiques
- Actions rapides
- Liens vers les différentes sections

**2. Gestion CMS (`/admin/cms`)**
- Liste de toutes les pages
- Édition visuelle du contenu
- Création de nouvelles pages
- Suppression de pages

**3. Gestion des Contacts (`/admin/contacts`)**
- Liste de toutes les demandes
- Filtrage par statut
- Modification du statut
- Ajout de notes

**4. Gestion des Utilisateurs (`/admin/users`)**
- Liste des utilisateurs
- Création de nouveaux utilisateurs
- Modification des rôles
- Suppression d'utilisateurs

**5. Chatbot (`/admin/chatbot`)**
- Liste des sessions
- Détails des conversations
- Gestion des rendez-vous
- Statistiques

**6. SEO (`/admin/seo`)**
- Gestion du référencement
- Métadonnées des pages

**7. Paramètres (`/admin/settings`)**
- Configuration générale
- Paramètres système

---

### 6. 🌐 PAGES PUBLIQUES

#### Pages principales

**1. Page d'accueil (`/`)**
- Hero carousel avec backgrounds dynamiques
- Section introduction
- Section équipe
- Section expertises
- Section investissement
- Carousel partenaires
- Section statistiques
- CTA final

**2. Patrimoine (`/patrimoine`)**
- Hero section
- Définition gestion de patrimoine
- Services patrimoniaux
- Avantages
- CTA

**3. Placements (`/placements`)**
- Hero section
- Types de placements
- Avantages
- FAQ
- Articles et guides

**4. Immobilier (`/immobilier`)**
- Hero section
- Pourquoi investir
- Leviers d'investissement
- Profils investisseurs
- FAQ

**5. Fiscalité (`/fiscalite`)**
- Hero section
- Profils fiscaux
- Solutions fiscales
- FAQ

**6. Retraite (`/retraite`)**
- Hero section
- Planification retraite
- Solutions retraite
- FAQ

#### Pages spécialisées

**Fiscalité** :
- `/fiscalite/loi-pinel`
- `/fiscalite/loi-malraux`
- `/fiscalite/loi-denormandie`
- `/fiscalite/loi-cosse`
- `/fiscalite/loi-girardin`
- `/fiscalite/monument-historique`
- `/fiscalite/pfu`
- `/fiscalite/impot-sur-le-revenu`
- Etc.

**Immobilier** :
- `/immobilier/lmnp`
- `/immobilier/lmnp-2025`
- `/immobilier/robien`
- `/immobilier/scellier`
- `/immobilier/credit-immobilier-ptz`
- `/immobilier/investissement-locatif`
- Etc.

**Placements** :
- `/placements/assurance-vie`
- `/placements/assurance-vie-luxembourg`
- `/placements/pea-per`
- `/placements/scpi-opci`
- `/placements/bourse-actions`
- Etc.

**Patrimoine** :
- `/patrimoine/bilan`
- `/patrimoine/transmission`
- `/patrimoine/succession-heritage`
- `/patrimoine/donation-gratuite`
- Etc.

**Retraite** :
- `/retraite/plan-retraite`
- `/retraite/rachat-trimestres`
- `/retraite/retraite-progressive`
- Etc.

**Outils** :
- `/outils/calculatrice-impots`
- `/outils/simulateur-investissement`
- `/outils/guides-pratiques`
- Etc.

---

### 7. 🔐 SYSTÈME D'AUTHENTIFICATION

#### Flux d'authentification

```
1. Utilisateur → POST /api/auth/login
   Body: { email, password }
   
2. Backend vérifie :
   - Email existe dans MongoDB
   - Mot de passe correspond (bcrypt.compare)
   
3. Si valide :
   - Génère JWT token (valide 7 jours)
   - Retourne { success: true, token, user }
   
4. Frontend stocke :
   - Token dans localStorage ('adminToken')
   - User dans localStorage ('adminUser')
   
5. Requêtes suivantes :
   - Header: Authorization: Bearer <token>
   - Backend vérifie via /api/auth/verify
```

#### Routes API Auth

- `POST /api/auth/login` - Connexion
- `GET /api/auth/verify` - Vérification du token
- `GET /api/auth/init` - Initialisation admin par défaut
- `POST /api/auth/users` - Créer un utilisateur
- `GET /api/auth/users` - Lister les utilisateurs
- `PUT /api/auth/users/[id]` - Modifier un utilisateur
- `DELETE /api/auth/users/[id]` - Supprimer un utilisateur
- `POST /api/auth/change-password` - Changer le mot de passe

---

## 💾 SYSTÈME DE SAUVEGARDE DES DONNÉES

### Architecture de sauvegarde

```
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (React Components)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Form Submit│  │  CMS Editor  │  │  Chatbot UI │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │ fetch()          │ fetch()          │ fetch()
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│              API ROUTES (Next.js API)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │/api/contact/ │  │/api/cms/     │  │/api/chatbot/│  │
│  │  submit      │  │  pages      │  │  sessions   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │ Mongoose         │ Mongoose         │ Mongoose
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│              MONGODB COLLECTIONS                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  contacts    │  │ pagecontents │  │chatbotsessions│ │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐                                     │
│  │    users      │                                     │
│  └──────────────┘                                     │
└─────────────────────────────────────────────────────────┘
```

### Détails de sauvegarde par fonctionnalité

#### 1. CMS - Sauvegarde du contenu

**Méthode 1 : Via Interface Admin**
```javascript
// Dans /admin/cms/page.jsx
const handleSave = async () => {
  const response = await fetch('/api/cms/pages', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: selectedPage.path,
      content: formData  // Objet JSON complet
    })
  });
};
```

**Méthode 2 : Via API directe**
```javascript
// PUT /api/cms/pages
// Route: src/app/api/cms/pages/route.js
const page = await PageContent.findOneAndUpdate(
  { path: path.toLowerCase() },
  { 
    $set: {
      content: content,           // Remplace tout le contenu
      lastModified: new Date(),
      modifiedBy: 'admin'
    }
  },
  { new: true, runValidators: true }
);
```

**Structure sauvegardée** :
- Collection : `pagecontents`
- Format : Document MongoDB avec `content` de type `Mixed` (JSON flexible)
- Index : `path` (unique), `published`

#### 2. Contacts - Sauvegarde des formulaires

**Soumission formulaire** :
```javascript
// POST /api/contact/submit
// Route: src/app/api/contact/submit/route.js
const contact = new Contact({
  nom: data.nom,
  email: data.email,
  telephone: data.telephone,
  ville: data.ville,
  profession: data.profession,
  patrimoine: data.patrimoine,
  message: data.message,
  status: 'new'  // Par défaut
});
await contact.save();
```

**Mise à jour statut** :
```javascript
// PUT /api/contact/update
const contact = await Contact.findByIdAndUpdate(
  id,
  { $set: { status: newStatus, notes: notes } },
  { new: true }
);
```

**Structure sauvegardée** :
- Collection : `contacts`
- Champs : nom, email, telephone, ville, profession, patrimoine, message, status, notes
- Timestamps : createdAt, updatedAt (automatiques)

#### 3. Utilisateurs - Sauvegarde des admins

**Création utilisateur** :
```javascript
// POST /api/auth/users
// Route: src/app/api/auth/users/route.js
const user = new User({
  email: data.email.toLowerCase(),
  password: data.password,  // Sera hashé par le pre-save hook
  name: data.name,
  role: data.role || 'admin'
});
await user.save();
```

**Hachage automatique** :
```javascript
// Dans User.js - Pre-save hook
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  if (/^\$2[ayb]\$/.test(this.password)) return; // Déjà hashé
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

**Structure sauvegardée** :
- Collection : `users`
- Password : Hashé avec bcrypt (salt rounds: 10)
- Index : `email` (unique)

#### 4. Chatbot - Sauvegarde des sessions

**Création session** :
```javascript
// POST /api/chatbot/sessions
const session = new ChatbotSession({
  sessionId: uniqueId,
  status: 'active',
  currentStep: 'welcome',
  profile: { ... },
  messages: [ ... ]
});
await session.save();
```

**Mise à jour session** :
```javascript
// PUT /api/chatbot/sessions
await ChatbotSession.findOneAndUpdate(
  { sessionId: sessionId },
  { 
    $set: {
      currentStep: newStep,
      profile: updatedProfile,
      messages: updatedMessages
    }
  },
  { new: true }
);
```

**Structure sauvegardée** :
- Collection : `chatbotsessions`
- Index : `sessionId` (unique)
- Structure complexe avec objets imbriqués

---

## 🔄 FLUX DE DONNÉES COMPLET

### Exemple 1 : Modification CMS

```
1. Admin ouvre /admin/cms
   ↓
2. Sélectionne page "patrimoine"
   ↓
3. Modifie le titre dans l'interface
   ↓
4. Clique sur "Enregistrer"
   ↓
5. Frontend → PUT /api/cms/pages
   Body: { path: "patrimoine", content: { hero: { title: "Nouveau titre" } } }
   ↓
6. API Route → PageContent.findOneAndUpdate()
   ↓
7. MongoDB → Mise à jour document dans collection "pagecontents"
   ↓
8. API retourne success: true
   ↓
9. Frontend rafraîchit le contenu
   ↓
10. Page publique /patrimoine récupère via GET /api/cms/content?path=patrimoine
    ↓
11. Affichage immédiat du nouveau titre
```

### Exemple 2 : Soumission formulaire contact

```
1. Visiteur remplit /contact
   ↓
2. Soumet le formulaire
   ↓
3. Frontend → POST /api/contact/submit
   Body: { nom, email, telephone, ville, profession, patrimoine, message }
   ↓
4. API Route → new Contact({ ... }).save()
   ↓
5. MongoDB → Insertion dans collection "contacts"
   ↓
6. API retourne success: true
   ↓
7. Frontend affiche message de confirmation
   ↓
8. Admin voit notification dans /admin (badge avec count)
   ↓
9. Admin ouvre /admin/contacts
   ↓
10. Liste affiche le nouveau contact avec status "new"
```

### Exemple 3 : Connexion admin

```
1. Admin saisit email/password dans /admin/login
   ↓
2. Frontend → POST /api/auth/login
   Body: { email: "admin@azalee.com", password: "admin123" }
   ↓
3. API Route → User.findOne({ email })
   ↓
4. Vérifie password avec bcrypt.compare()
   ↓
5. Si valide → Génère JWT token
   ↓
6. API retourne { success: true, token, user }
   ↓
7. Frontend stocke dans localStorage
   ↓
8. Redirection vers /admin
   ↓
9. Layout admin vérifie token via GET /api/auth/verify
   ↓
10. Si valide → Affichage du dashboard
```

---

## 📊 COLLECTIONS MONGODB

### 1. Collection `pagecontents`

**Schéma** :
```javascript
{
  _id: ObjectId,
  path: String (unique, lowercase),
  title: String,
  content: Mixed (JSON flexible),
  published: Boolean (default: true),
  lastModified: Date,
  modifiedBy: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Index** :
- `path` : Unique index
- `published` : Index pour filtrage

**Exemples de documents** :
```javascript
// Page d'accueil
{
  path: "home",
  title: "Page d'accueil",
  content: {
    heroTitle: "Préserver. Optimiser. Transmettre.",
    heroSubtitle: "Depuis plus de 20 ans...",
    heroBackgrounds: ["/images/home.webp", ...],
    partners: ["/images/partner1.png", ...],
    stats: [
      { value: "30+", label: "Années d'expérience" },
      { value: "1000+", label: "Clients satisfaits" }
    ]
  }
}
```

### 2. Collection `users`

**Schéma** :
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashé bcrypt),
  name: String,
  role: String (enum: ['admin', 'editor', 'viewer']),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Index** :
- `email` : Unique index

### 3. Collection `contacts`

**Schéma** :
```javascript
{
  _id: ObjectId,
  nom: String,
  email: String (lowercase),
  telephone: String,
  ville: String,
  profession: String,
  patrimoine: String,
  message: String,
  status: String (enum: ['new', 'read', 'contacted', 'archived']),
  notes: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Index** :
- `email` : Index pour recherche
- `status` : Index pour filtrage
- `createdAt` : Index pour tri chronologique

### 4. Collection `chatbotsessions`

**Schéma** :
```javascript
{
  _id: ObjectId,
  sessionId: String (unique),
  status: String (enum: ['active', 'completed', 'abandoned']),
  currentStep: String,
  profile: Mixed (objet JSON),
  intention: String,
  thematique: String,
  questionPosee: String,
  actionFinale: String (enum: ['pdf', 'rdv', 'rappel', null]),
  rendezVous: Mixed (objet JSON),
  messages: Array,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Index** :
- `sessionId` : Unique index
- `status` : Index pour filtrage

---

## 🔧 CONFIGURATION ET VARIABLES D'ENVIRONNEMENT

### Fichier `.env.local` (développement)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/azalee_db
# Ou MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/azalee_db

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Application
NEXT_PUBLIC_APP_URL=http://localhost:4028
NODE_ENV=development

# Cloudinary (optionnel)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Fichier `.env.production` (production EC2)

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret-key-very-secure
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NODE_ENV=production
```

---

## 🚀 DÉPLOIEMENT

### Déploiement EC2 avec Docker

**1. Préparation**
```bash
# Sur EC2
cd ~/demo
git pull demo prod
```

**2. Configuration**
```bash
# Créer .env.production avec les bonnes valeurs
nano .env.production
```

**3. Build et démarrage**
```bash
sudo docker-compose down
sudo docker-compose build --no-cache frontend backend
sudo docker-compose up -d
```

**4. Vérification**
```bash
sudo docker-compose logs -f frontend
```

---

## 📈 STATISTIQUES ET MÉTRIQUES

### API Stats disponibles

- `GET /api/admin/stats` - Statistiques générales
- `GET /api/chatbot/stats` - Statistiques chatbot
- `GET /api/contact/count` - Nombre de nouveaux contacts

---

## 🔒 SÉCURITÉ

### Mesures de sécurité implémentées

1. **Authentification JWT** : Tokens sécurisés avec expiration
2. **Hachage des mots de passe** : bcrypt avec salt rounds 10
3. **Validation des données** : Mongoose schemas avec validation
4. **Protection des routes** : Middleware d'authentification
5. **Sanitization** : Nettoyage des inputs utilisateur
6. **CORS** : Configuration appropriée pour les API

---

## 📝 NOTES IMPORTANTES

1. **Cache-busting** : Toutes les pages CMS utilisent `&t=${Date.now()}` pour éviter le cache
2. **Dynamic rendering** : Toutes les routes API ont `export const dynamic = 'force-dynamic'`
3. **MongoDB connection** : Connexion gérée via `src/lib/mongodb.js` avec réutilisation
4. **Error handling** : Toutes les routes API gèrent les erreurs avec try/catch
5. **Logging** : Console.log pour debugging en développement

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2025  
**Auteur** : Équipe Azalée Patrimoine

