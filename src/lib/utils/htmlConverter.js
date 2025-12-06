/**
 * Convert JSX className attributes to HTML class attributes
 * This is needed because dangerouslySetInnerHTML expects standard HTML,
 * not JSX syntax
 */
export function convertJSXToHTML(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') {
    return htmlString;
  }
  
  // Replace className="..." with class="..."
  return htmlString.replace(/className=/g, 'class=');
}

/**
 * Process HTML content for dangerouslySetInnerHTML
 * Converts JSX syntax to standard HTML
 */
export function processHTMLForRender(htmlString) {
  if (!htmlString) return '';
  if (typeof htmlString !== 'string') return String(htmlString);
  
  return convertJSXToHTML(htmlString);
}

