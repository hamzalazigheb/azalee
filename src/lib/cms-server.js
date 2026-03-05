import connectDB from './mongodb';
import PageContent from './models/PageContent';
import { deepMerge } from './merge-content';

/**
 * Server-side function to fetch CMS content for a page
 * @param {string} path - Page path (e.g., 'immobilier/credit-immobilier-ptz')
 * @param {object} defaultContent - Default content fallback
 * @returns {Promise<object|null>} Merged content or null if not found
 */
export async function getPageContent(path, defaultContent = {}) {
  try {
    await connectDB();
    console.log(`[CMS SERVER] Querying DB for path: "${path.toLowerCase()}"`);

    const page = await PageContent.findOne({
      path: path.toLowerCase(),
      published: true
    });

    console.log(`[CMS SERVER] DB query result: ${page ? 'Found' : 'Not Found'}`);

    if (!page || !page.content) {
      // Return default content if CMS page doesn't exist
      return defaultContent;
    }

    // Deep merge CMS content with defaultContent
    const mergedContent = deepMerge(defaultContent, page.content);

    return mergedContent;
  } catch (error) {
    console.error(`Error fetching CMS content for ${path}:`, error);
    // Return default content on error
    return defaultContent;
  }
}

/**
 * Check if a page exists in CMS
 * @param {string} path - Page path
 * @returns {Promise<boolean>}
 */
export async function pageExists(path) {
  try {
    await connectDB();
    const page = await PageContent.findOne({
      path: path.toLowerCase(),
      published: true
    });
    return !!page;
  } catch (error) {
    console.error(`Error checking page existence for ${path}:`, error);
    return false;
  }
}


