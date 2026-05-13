/**
 * Validate and process a search keyword from the Header search form.
 * @param {string} keyword - Raw input value
 * @returns {{ shouldNavigate: boolean, encodedUrl: string|null }}
 */
export function processSearchInput(keyword) {
  const trimmed = (keyword || '').trim();
  if (trimmed.length === 0) {
    return { shouldNavigate: false, encodedUrl: null };
  }
  return {
    shouldNavigate: true,
    encodedUrl: `/search?q=${encodeURIComponent(trimmed)}`,
  };
}
