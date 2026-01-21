# 🐛 Debug: Images Not Updating After CMS Save

## Quick Test Steps

### Step 1: Open Browser Console

1. **Open homepage** in one tab: `http://localhost:4028/`
2. **Open DevTools** (F12)
3. **Go to Console tab**

### Step 2: Save Image in CMS

1. **Open CMS** in another tab: `http://localhost:4028/admin/cms`
2. **Select "Page d'accueil"**
3. **Change an image** (e.g., `finalCtaImage` or `investmentImage2`)
4. **Click "Enregistrer les modifications"**

### Step 3: Check Console Logs

**In Homepage Console, you should see:**

```
📢 CMS update event dispatched: { path: 'home', timestamp: ... }
🔄 CMS content updated, refreshing homepage...
📡 Fetching homepage content from: /api/cms/content?path=home&t=...
🖼️ Final CTA image updated: { image: '...', fullImage: '...' }
📸 All image fields in content: { ... }
✅ Homepage content loaded from CMS
```

## Common Issues & Solutions

### Issue 1: No Event Received

**Symptom:** No `📢 CMS update event dispatched` log

**Cause:** Event not being dispatched from CMS

**Solution:**
1. Check CMS console for errors
2. Verify `selectedPage.path` is correct
3. Check if save was successful

### Issue 2: Event Received But Wrong Path

**Symptom:** See `ℹ️ CMS update received but not for homepage: [path]`

**Cause:** Path doesn't match homepage paths

**Solution:**
1. Check what path is being sent:
   ```javascript
   // In CMS console, after save:
   console.log('Page path:', selectedPage.path);
   ```
2. The path should be one of:
   - `home`
   - `accueil`
   - `page d'accueil`
   - `page d accueil`

### Issue 3: Event Received But Image Not Updated

**Symptom:** See `🔄 CMS content updated` but image is old

**Cause:** 
- Database not updated
- Cache issue
- Image path not in response

**Solution:**
1. Check API response:
   ```javascript
   // In homepage console, look for:
   📸 All image fields in content: {
     investmentImage2: '...',  // Should show NEW image
     finalCtaImage: '...'      // Should show NEW image
   }
   ```
2. If image is old, check database:
   - Verify image was saved in MongoDB
   - Check if path is correct

### Issue 4: Base64 Image Not Displaying

**Symptom:** Image path is base64 but not showing

**Cause:** Base64 images might be too large or invalid

**Solution:**
1. Check if base64 is valid:
   ```javascript
   // In console:
   const img = new Image();
   img.src = 'YOUR_BASE64_STRING';
   img.onerror = () => console.error('Invalid image!');
   img.onload = () => console.log('Image valid!');
   ```
2. **Better:** Convert base64 to file (see `FIX_PIXELATED_IMAGES.md`)

### Issue 5: Image Updates But Page Doesn't Refresh

**Symptom:** See logs but visual doesn't change

**Cause:** React state not updating or browser cache

**Solution:**
1. **Hard refresh:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Check React DevTools:
   - Verify `content` state is updated
   - Check if component re-rendered

## Manual Refresh Test

If automatic update doesn't work, test manually:

```javascript
// In homepage console:
window.dispatchEvent(new CustomEvent('cmsContentUpdated', {
  detail: { path: 'home', timestamp: Date.now() }
}));
```

This should trigger a refresh immediately.

## Check Database Directly

If nothing works, check MongoDB:

```javascript
// In MongoDB shell or via API:
db.pagecontents.findOne({ path: 'home' }, { 
  'content.finalCta.finalCtaImage': 1,
  'content.investment.investmentImage2': 1
})
```

## Expected Behavior

✅ **Working correctly:**
1. Save in CMS → Event dispatched
2. Homepage receives event → Fetches new content
3. Content merged → State updated
4. Component re-renders → Image changes
5. **Total time: < 5 seconds**

❌ **Not working:**
- No event after save
- Event received but wrong path
- Event received but no API call
- API call but old data returned
- New data but image doesn't change

## Debug Checklist

- [ ] CMS console shows: `📢 CMS update event dispatched`
- [ ] Homepage console shows: `🔄 CMS content updated`
- [ ] API call is made: `📡 Fetching homepage content`
- [ ] Image data is in response: `📸 All image fields`
- [ ] React state updates (check DevTools)
- [ ] Component re-renders
- [ ] Image src changes in DOM

## Still Not Working?

1. **Check network tab:**
   - Is API call successful? (200 status)
   - What data is returned?
   - Is image field in response?

2. **Check React state:**
   - Open React DevTools
   - Find HomePage component
   - Check `content` state
   - Verify image fields are updated

3. **Check DOM:**
   - Inspect image element
   - Check `src` attribute
   - Is it the new image path?

4. **Restart server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

**Last Updated**: 2025-01-XX





