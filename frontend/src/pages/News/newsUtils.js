/**
 * Extract distinct non-null category values from a posts array.
 * @param {Array} posts
 * @returns {string[]} Unique category strings
 */
export function getDistinctCategories(posts) {
  if (!Array.isArray(posts)) return [];
  const categories = new Set();
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories);
}
