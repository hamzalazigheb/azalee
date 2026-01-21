# ✅ Bouton Calendly - Section Investment

## 🎯 Modification Appliquée

Le bouton **"Vous avez des questions, nous avons des réponses"** dans la section Investment est maintenant :
- ✅ **Connecté à Calendly**
- ✅ **Modifiable via le CMS**

---

## 📝 Changements Effectués

### 1. Ajout du champ `investmentCalendlyUrl` dans `defaultContent`

**Fichier** : `src/app/page.jsx`  
**Ligne** : ~424

```javascript
investment: {
  investmentTitle: 'Sécurisez votre avenir avec une stratégie patrimoniale sur mesure',
  investmentText: "...",
  investmentButton: 'Vous avez des questions, nous avons des réponses',
  investmentCalendlyUrl: 'https://calendly.com/rdv-azalee-patrimoine/30min', // ✅ NOUVEAU
  investmentImage1: '/images/azalee-patrimoine-investment-strategy-meeting.webp',
  investmentImage2: '/images/azalee-patrimoine-financial-strategy-planning.webp',
},
```

### 2. Connexion du bouton à Calendly

**Fichier** : `src/app/page.jsx`  
**Ligne** : ~1202

```javascript
<CTAButton 
  variant="primary"
  externalUrl={content.investment?.investmentCalendlyUrl || content.investmentCalendlyUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
>
  {content.investment?.investmentButton || content.investmentButton}
</CTAButton>
```

---

## 🎨 Modification via le CMS

### Accès au CMS

1. **URL** : `http://localhost:4028/admin/cms`
2. **Sélectionner** : Page "Accueil" ou "home"
3. **Section** : `investment`

### Champs Modifiables

| Champ | Description | Valeur par Défaut |
|-------|-------------|-------------------|
| `investmentButton` | Texte du bouton | "Vous avez des questions, nous avons des réponses" |
| `investmentCalendlyUrl` | URL Calendly | `https://calendly.com/rdv-azalee-patrimoine/30min` |

### Exemple JSON pour le CMS

```json
{
  "investment": {
    "investmentTitle": "Sécurisez votre avenir avec une stratégie patrimoniale sur mesure",
    "investmentText": "...",
    "investmentButton": "Vous avez des questions, nous avons des réponses",
    "investmentCalendlyUrl": "https://calendly.com/rdv-azalee-patrimoine/30min",
    "investmentImage1": "/images/azalee-patrimoine-investment-strategy-meeting.webp",
    "investmentImage2": "/images/azalee-patrimoine-financial-strategy-planning.webp"
  }
}
```

---

## 🧪 Test du Bouton

### Vérification Fonctionnelle

1. **Démarrer le serveur** : `npm run dev`
2. **Ouvrir** : `http://localhost:4028`
3. **Scroller** jusqu'à la section Investment
4. **Cliquer** sur le bouton "Vous avez des questions, nous avons des réponses"
5. **Vérifier** : Une nouvelle fenêtre s'ouvre vers Calendly

### Comportement Attendu

- ✅ Clic sur le bouton → Ouverture de Calendly dans un nouvel onglet
- ✅ URL par défaut : `https://calendly.com/rdv-azalee-patrimoine/30min`
- ✅ Modifiable via CMS sans toucher au code

---

## 📊 Résumé

| Élément | Statut |
|---------|--------|
| Bouton connecté à Calendly | ✅ |
| Texte modifiable CMS | ✅ |
| URL Calendly modifiable CMS | ✅ |
| Valeur par défaut définie | ✅ |
| Aucune erreur de linter | ✅ |

---

**Date** : 2026-01-19  
**Fichier modifié** : `src/app/page.jsx`  
**Lignes modifiées** : ~424, ~1202-1206





