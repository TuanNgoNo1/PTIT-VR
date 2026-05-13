import { parsePublishedDate } from '../../utils/helpers';

/**
 * Filter posts by keyword (case-insensitive title match).
 * @param {Array} posts
 * @param {string} query - Trimmed search keyword
 * @returns {Array} Filtered posts
 */
export function filterPosts(posts, query) {
  if (!query || !Array.isArray(posts)) return [];
  const lower = query.toLowerCase();
  return posts.filter(post => post.title && post.title.toLowerCase().includes(lower));
}

/**
 * Sort posts from newest to oldest by published_at date.
 * @param {Array} posts
 * @returns {Array} Sorted copy of posts
 */
export function sortByDate(posts) {
  if (!Array.isArray(posts)) return [];
  return [...posts].sort((a, b) => {
    const dateA = parsePublishedDate(a.published_at);
    const dateB = parsePublishedDate(b.published_at);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateB.getTime() - dateA.getTime();
  });
}
