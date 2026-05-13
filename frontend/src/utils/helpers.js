/**
 * Encode a raw category name into a URL-safe path segment.
 * @param {string} name - Raw category string (e.g. "Tin tức")
 * @returns {string} URL-encoded segment
 */
export function encodeCategory(name) {
  return encodeURIComponent(name);
}

/**
 * Decode a URL path segment back into the original category name.
 * @param {string} segment - URL-encoded segment
 * @returns {string} Original category name
 */
export function decodeCategory(segment) {
  return decodeURIComponent(segment);
}

/**
 * Parse a published_at string in format "DD/MM/YYYY" or "YYYY-MM-DD"
 * into a Date object at midnight UTC.
 * @param {string} s - Date string
 * @returns {Date|null} Date object or null if format is invalid
 */
export function parsePublishedDate(s) {
  if (!s || typeof s !== 'string') return null;

  // Try DD/MM/YYYY format
  const dmy = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dmy) {
    const day = parseInt(dmy[1], 10);
    const month = parseInt(dmy[2], 10);
    const year = parseInt(dmy[3], 10);
    if (!isValidDate(year, month, day)) return null;
    return new Date(Date.UTC(year, month - 1, day));
  }

  // Try YYYY-MM-DD format
  const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymd) {
    const year = parseInt(ymd[1], 10);
    const month = parseInt(ymd[2], 10);
    const day = parseInt(ymd[3], 10);
    if (!isValidDate(year, month, day)) return null;
    return new Date(Date.UTC(year, month - 1, day));
  }

  return null;
}

/**
 * Format a Date object into "DD/MM/YYYY" string.
 * @param {Date} date - A valid Date object
 * @returns {string} Formatted date string
 */
export function formatPublishedDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).padStart(4, '0');
  return `${day}/${month}/${year}`;
}

/**
 * Validate that year/month/day form a real calendar date.
 */
function isValidDate(year, month, day) {
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  // Create date and check it matches
  const d = new Date(Date.UTC(year, month - 1, day));
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
  );
}
