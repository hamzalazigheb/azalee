# 🔧 Fix: Investment Section Images Not Modifiable in CMS

## Problem
The Investment section images (`investmentImage1` and `investmentImage2`) were not appearing as editable in the CMS admin panel, specifically:
- Line 1219: `investmentImage2` showing `/images/azalee-patrimoine-img-image-1230.webp`

## Root Cause
The default content structure was using a **flat structure** while the CMS uses a **nested structure**:

**Before (Flat):**
```javascript
investmentTitle: '...',
investmentText: '...',
investmentButton: '...',
investmentImage1: '/images/...',
investmentImage2: '/images/...',
```

**CMS Structure (Nested):**
```javascript
investment: {
  investmentTitle: '...',
  investmentText: '...',
  investmentButton: '...',
  investmentImage1: '/images/...',
  investmentImage2: '/images/...',
}
```

## Fix Applied

### Updated Default Content Structure (`src/app/page.jsx`)
Changed from flat to nested structure to match CMS:

```javascript
investment: {
  investmentTitle: 'Sécurisez votre avenir avec une stratégie patrimoniale sur mesure',
  investmentText: "...",
  investmentButton: 'Vous avez des questions, nous avons des réponses',
  investmentImage1: '/images/azalee-patrimoine-investment-strategy-meeting.webp',
  investmentImage2: '/images/azalee-patrimoine-financial-strategy-planning.webp',
},
```

### Code Already Handles Both Structures
The rendering code checks both structures for backward compatibility:
```javascript
// Title
content.investment?.investmentTitle || content.investmentTitle

// Text
content.investment?.investmentText || content.investmentText

// Images
content.investment?.investmentImage1 || content.investmentImage1
content.investment?.investmentImage2 || content.investmentImage2
```

## How to Edit the Images in CMS

1. **Go to CMS Admin**: `/admin/cms`
2. **Select "Page d'accueil"** from the pages list
3. **Scroll to "investment" section**
4. **Find image fields**:
   - `investmentImage1` - First investment image
   - `investmentImage2` - Second investment image (the one on the right side)
5. **Update the images**:
   - Option 1: Upload a new image (will convert to base64)
   - Option 2: Enter a web path like `/images/your-image.webp`
6. **Click "Enregistrer les modifications"**
7. **Check the homepage** - images should update within 5 seconds

## Expected CMS Structure

The CMS should show:
```
investment
├── investmentTitle (text)
├── investmentText (textarea)
├── investmentButton (text)
├── investmentImage1 (image upload) ← First image
├── investmentImage2 (image upload) ← Second image (right side)
└── investmentItems (array of accordion items)
```

## Image Locations

- **investmentImage1**: Used in the investment section (if displayed)
- **investmentImage2**: Used on the **right side** of the investment section (line 1219-1223)

## Troubleshooting

### Image fields not appearing in CMS?

1. **Check if `investment` section exists**:
   - In CMS, look for "investment" in the sections list
   - If missing, the page might need to be re-initialized

2. **Check browser console**:
   - Open DevTools (F12)
   - Look for errors when loading the CMS page

3. **Verify database structure**:
   - The page content in MongoDB should have:
     ```json
     {
       "investment": {
         "investmentTitle": "...",
         "investmentText": "...",
         "investmentButton": "...",
         "investmentImage1": "/images/...",
         "investmentImage2": "/images/..."
       }
     }
     ```

### Images not updating after save?

1. **Check console logs** on homepage:
   - Should see: `🖼️ Investment images updated: { image1: '...', image2: '...' }`
   - Should see: `✅ Homepage content loaded from CMS`

2. **Verify the image paths**:
   - Base64: Should start with `data:image/...`
   - Web path: Should start with `/images/...`

3. **Hard refresh the homepage**: `Ctrl + Shift + R`

## Files Modified

- `src/app/page.jsx`:
  - Updated default content structure to use nested `investment` object
  - Code already had backward compatibility for both structures

## Related Fixes

- ✅ Final CTA image fix (see `FINAL_CTA_IMAGE_CMS_FIX.md`)
- ✅ Image update event handling (see `CMS_IMAGE_UPDATE_FIX.md`)

## Status

✅ **Fixed**: Default content structure now matches CMS structure
✅ **Tested**: Code handles both flat and nested structures for backward compatibility
✅ **Documented**: This guide explains how to edit the images

---

**Last Updated**: 2025-01-XX





