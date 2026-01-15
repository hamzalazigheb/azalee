# 📊 Rapport d'Audit CMS - Catégorie Fiscalité

## ✅ Résumé Global

- **Total pages**: 17
- **Pages avec CMS**: 17/17 (100%)
- **Pages 100% éditables**: 11/17 (65%)
- **Pages avec contenu hardcodé**: 6/17 (35%)
- **Sections CMS totales**: 103
- **Problèmes hardcodés**: 97

---

## 📄 Pages 100% Éditables via CMS (11 pages)

✅ **Pages parfaites** - Toutes les sections sont éditables :

1. `fiscalite/autre-fiscalite` - SSR (getPageContent)
2. `fiscalite/defiscalisation-cas-specifiques` - SSR
3. `fiscalite/fiscalite-placements` - SSR (2 problèmes mineurs)
4. `fiscalite/loi-cosse` - SSR
5. `fiscalite/loi-denormandie` - SSR
6. `fiscalite/loi-girardin` - SSR
7. `fiscalite/loi-malraux` - SSR
8. `fiscalite/loi-pinel` - SSR
9. `fiscalite/monument-historique` - SSR
10. `fiscalite/reductions-impot-deficit-foncier` - SSR
11. `fiscalite/tmi-prelevements-sociaux` - CSR
12. `fiscalite/tranches-baremes-plafonds` - CSR

---

## ⚠️ Pages avec Contenu Hardcodé (6 pages)

### 1. `fiscalite/page.jsx` (Page principale)
- **Statut CMS**: ✅ CSR avec listener
- **Sections CMS**: 17 sections
- **Ratio CMS**: 98.1%
- **Problèmes**: 2 textes hardcodés dans fallback
  - Ligne 388: "barème progressif..." (dans fallback)
  - Ligne 390: "investissement immobilier..." (dans fallback)
- **Action**: ✅ Acceptable (fallbacks uniquement)

### 2. `fiscalite/declaration-impots/page.jsx` ⚠️⚠️
- **Statut CMS**: ✅ CSR avec listener
- **Sections CMS**: 4 sections (hero, tabs, cta, steps)
- **Ratio CMS**: 18.2% ❌
- **Problèmes**: 36 textes hardcodés

**Sections manquantes dans CMS:**
- ❌ `declarationSteps` (array, ligne ~104) - Étapes de déclaration
- ❌ `calendarData` (array, ligne ~131) - Calendrier des dates
- ❌ `commonErrors` (array, ligne ~150) - Erreurs fréquentes
- ❌ `tabContent.general` - Contenu onglet "Prélèvement à la source"
- ❌ `tabContent.dates` - Contenu onglet "Régularisation"
- ❌ `tabContent.documents` - Contenu onglet "Questions fréquentes"
- ❌ `tabContent.erreurs` - Contenu onglet "Accompagnement"
- ❌ Tous les textes dans les cartes (lignes 204-224, 250-587)

**Textes hardcodés identifiés:**
- "Régularisation", "Septembre", "Remboursement ou complément"
- "Prélèvement", "À la source", "Depuis 2019"
- "Obligatoire", "Déclaration", "Même avec prélèvement"
- Tous les contenus des onglets (lignes 250-587)

### 3. `fiscalite/impot-sur-le-revenu/page.jsx` ⚠️⚠️⚠️
- **Statut CMS**: ✅ CSR avec listener
- **Sections CMS**: 1 section (data seulement)
- **Ratio CMS**: 3.6% ❌❌❌
- **Problèmes**: 53 textes hardcodés

**Sections manquantes dans CMS:**
- ❌ `stats` - Cartes statistiques (lignes 151-168)
- ❌ `sommaire` - Liste du sommaire
- ❌ `dispositifs` - Section "Les 10 meilleurs dispositifs" (lignes 186-400+)
  - Bloc 1: Loi Pinel (ligne 208-221)
  - Bloc 2: Déficit foncier (ligne 224-237)
  - Bloc 3: LMNP (ligne 240-254)
  - Bloc 4: LMP (ligne 257-271)
  - Bloc 5: PER (ligne 274-288)
  - Bloc 6: Loi Girardin (ligne 291-305)
  - Bloc 7: FIP et FCPI (ligne 308-321)
  - Bloc 8: Sofica (ligne 324-337)
  - Bloc 9: Monuments Historiques
  - Bloc 10: Autres dispositifs
- ❌ `content.sections` - Contenu détaillé de chaque section
- ❌ `optimisation` - Section optimisation fiscale (lignes 466+)

**Textes hardcodés identifiés:**
- "DEPUIS 2019", "Prélèvement à la source", "Collecte immédiate et continue"
- "OPTIMISATION", "Dispositifs fiscaux", "PER, Pinel, Girardin, déficit foncier"
- "STRATÉGIE", "Patrimoine", "Maîtrise de l'IR essentielle"
- Tous les textes des 10 blocs dispositifs
- Tous les textes de la section optimisation

### 4. `fiscalite/lois-fiscales/page.jsx`
- **Statut CMS**: ✅ CSR avec listener
- **Sections CMS**: 4 sections
- **Ratio CMS**: 81.3%
- **Problèmes**: 3 textes hardcodés
  - Ligne 217: "Dispositifs disponibles..."
  - Ligne 301: "Taux de réduction..."
  - Ligne 319: "Plafonds applicables..."
- **Action**: ⚠️ Ajouter ces textes au CMS

### 5. `fiscalite/pfu/page.jsx`
- **Statut CMS**: ✅ SSR (getPageContent)
- **Sections CMS**: 9 sections
- **Ratio CMS**: 96.4%
- **Problèmes**: 1 texte hardcodé
  - Ligne 139: "Taux unique..."
- **Action**: ⚠️ Ajouter ce texte au CMS

---

## 🎯 Actions Prioritaires

### Priorité 1 - Pages critiques (beaucoup de contenu hardcodé)

#### `fiscalite/impot-sur-le-revenu/page.jsx`
**Sections à ajouter au CMS:**
```javascript
{
  stats: {
    stats: [
      { subtitle: "...", title: "...", description: "..." },
      // ... 3 cartes
    ]
  },
  sommaire: {
    title: "...",
    items: ["1. ...", "2. ...", ...]
  },
  dispositifs: {
    title: "Les 10 meilleurs dispositifs...",
    subtitle: "...",
    items: [
      {
        name: "Loi Pinel",
        description: "...",
        link: "/fiscalite/loi-pinel"
      },
      // ... 10 dispositifs
    ]
  },
  content: {
    sections: [
      { title: "...", content: "..." },
      // ... sections détaillées
    ]
  },
  optimisation: {
    title: "...",
    steps: [
      { step: "1", title: "...", description: "...", details: [...] },
      // ... étapes
    ]
  }
}
```

#### `fiscalite/declaration-impots/page.jsx`
**Sections à ajouter au CMS:**
```javascript
{
  declarationSteps: [
    {
      step: "1",
      title: "...",
      description: "...",
      details: [...]
    },
    // ... étapes
  ],
  calendarData: [
    {
      month: "Mai",
      dates: [
        { day: "15", description: "..." },
        // ...
      ]
    },
    // ... mois
  ],
  commonErrors: [
    {
      error: "...",
      impact: "...",
      solution: "..."
    },
    // ... erreurs
  ],
  tabContent: {
    general: {
      title: "...",
      description: "...",
      cards: [...],
      // ... contenu onglet
    },
    dates: { /* ... */ },
    documents: { /* ... */ },
    erreurs: { /* ... */ }
  }
}
```

### Priorité 2 - Pages avec problèmes mineurs

- `fiscalite/lois-fiscales` - Ajouter 3 textes au CMS
- `fiscalite/pfu` - Ajouter 1 texte au CMS
- `fiscalite/page.jsx` - Les 2 textes sont dans fallback (acceptable)

---

## 📋 Checklist de Migration

### Pour `fiscalite/impot-sur-le-revenu`:
- [ ] Ajouter section `stats` au CMS
- [ ] Ajouter section `sommaire` au CMS
- [ ] Ajouter section `dispositifs` au CMS (10 blocs)
- [ ] Ajouter section `content` au CMS
- [ ] Ajouter section `optimisation` au CMS
- [ ] Remplacer tous les textes hardcodés par `pageContent.section.field`

### Pour `fiscalite/declaration-impots`:
- [ ] Ajouter section `declarationSteps` au CMS
- [ ] Ajouter section `calendarData` au CMS
- [ ] Ajouter section `commonErrors` au CMS
- [ ] Ajouter section `tabContent` au CMS (4 onglets)
- [ ] Remplacer tous les textes hardcodés par `pageContent.section.field`

---

## ✅ Conclusion

**11 pages sur 17 (65%) sont 100% éditables via CMS.**

**6 pages nécessitent des corrections:**
- 2 pages critiques (`impot-sur-le-revenu`, `declaration-impots`)
- 4 pages avec problèmes mineurs

**Action recommandée**: Migrer les sections manquantes vers le CMS pour permettre l'édition complète de tous les contenus.

