/**
 * Deep merge utility for merging CMS content with defaultContent
 * Handles nested objects and arrays correctly
 */

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects, with source taking precedence
 * Arrays are replaced (not merged) unless explicitly handled
 * @param {object} target - Default content (fallback)
 * @param {object} source - CMS content (overrides)
 * @returns {object} Merged content
 */
export function deepMerge(target, source) {
  if (!source) return target;
  if (!target) return source;
  
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key]) && !Array.isArray(source[key])) {
        // Recursively merge nested objects
        if (!(key in target) || !isObject(target[key])) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else if (Array.isArray(source[key])) {
        // For arrays, use source if it has items, otherwise keep target
        if (source[key].length > 0) {
          output[key] = source[key];
        } else if (target[key] && Array.isArray(target[key])) {
          output[key] = target[key];
        } else {
          output[key] = source[key];
        }
      } else {
        // Primitive values: source overrides target
        output[key] = source[key];
      }
    });
  }
  
  return output;
}

/**
 * Specialized merge for CMS pages that need array preservation
 * This handles cases where we want to preserve arrays from CMS if they exist
 * @param {object} defaultContent - Default content
 * @param {object} cmsContent - CMS content
 * @param {object} mergeRules - Rules for specific fields (e.g., { 'credit.advantages': 'preserve-array' })
 * @returns {object} Merged content
 */
export function smartMerge(defaultContent, cmsContent, mergeRules = {}) {
  const merged = deepMerge(defaultContent, cmsContent);
  
  // Apply special rules for specific fields
  Object.keys(mergeRules).forEach(fieldPath => {
    const rule = mergeRules[fieldPath];
    const keys = fieldPath.split('.');
    
    if (rule === 'preserve-array') {
      let target = merged;
      let source = cmsContent;
      
      // Navigate to the nested field
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
        source = source?.[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      if (source && Array.isArray(source[lastKey]) && source[lastKey].length > 0) {
        target[lastKey] = source[lastKey];
      } else if (target[lastKey] && Array.isArray(target[lastKey])) {
        // Keep default array
      }
    }
  });
  
  return merged;
}


