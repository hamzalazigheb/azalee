/**
 * Helper pour gérer les chemins avec basePath automatique
 * Détecte automatiquement si on est sur staging et préfixe les chemins
 */

/**
 * Obtient le chemin d'une image avec le préfixe staging si nécessaire
 * @param {string} path - Chemin de l'image (ex: "/images/logo.webp")
 * @returns {string} - Chemin avec préfixe si nécessaire
 */
export function getImagePath(path) {
  // Si path est vide/undefined, retourner une chaîne vide (éviter les chemins invalides)
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return '';
  }
  
  // Nettoyer le chemin
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Valider que le chemin contient un nom de fichier (pas juste un dossier)
  // Si le chemin se termine par '/', c'est invalide
  if (cleanPath.endsWith('/') || cleanPath === '/images' || cleanPath === '/images/') {
    console.warn('Invalid image path:', path, '- returning empty string');
    return '';
  }
  
  // Côté client : détecter depuis l'URL
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/staging')) {
      return `/staging${cleanPath}`;
    }
    return cleanPath;
  }
  
  // Côté serveur : utiliser la variable d'environnement
  const basePath = process.env.STAGING === 'true' ? '/staging' : '';
  return `${basePath}${cleanPath}`;
}

/**
 * Obtient le chemin d'une API avec le préfixe staging si nécessaire
 * @param {string} path - Chemin de l'API (ex: "/cms/content?path=header")
 * @returns {string} - Chemin complet avec préfixe si nécessaire
 */
export function getApiPath(path) {
  if (!path) return path;
  
  // Nettoyer le chemin (enlever /api si présent)
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.startsWith('/api/')) {
    cleanPath = cleanPath.replace('/api/', '/');
  }
  
  // Côté client
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/staging')) {
      return `/staging/api${cleanPath}`;
    }
    return `/api${cleanPath}`;
  }
  
  // Côté serveur
  const basePath = process.env.STAGING === 'true' ? '/staging' : '';
  return `${basePath}/api${cleanPath}`;
}

/**
 * Obtient le basePath actuel
 * @returns {string} - "/staging" ou ""
 */
export function getBasePath() {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith('/staging') ? '/staging' : '';
  }
  return process.env.STAGING === 'true' ? '/staging' : '';
}

