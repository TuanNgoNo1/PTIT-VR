/**
 * Get a page slice from an array of items.
 * @param {Array} items - Full list of items
 * @param {number} page - 1-based page number
 * @param {number} pageSize - Items per page (default 10)
 * @returns {Array} Slice of items for the given page
 */
export function getPageItems(items, page, pageSize = 10) {
  if (!Array.isArray(items) || items.length === 0) return [];
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, items.length);
  return items.slice(start, end);
}

/**
 * Calculate total number of pages.
 * @param {number} totalItems - Total number of items
 * @param {number} pageSize - Items per page (default 10)
 * @returns {number} Total pages
 */
export function getTotalPages(totalItems, pageSize = 10) {
  return Math.ceil(totalItems / pageSize);
}
