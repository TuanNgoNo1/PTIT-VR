export const API_BASE_URL = 'http://localhost:5000';

/**
 * Fetch wrapper that handles JSON parsing and error states.
 * @param {string} endpoint - API path (e.g. "/api/posts")
 * @returns {Promise<any>} Parsed JSON data
 * @throws {Error} On network error or HTTP >= 500
 */
export async function fetchApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (response.status >= 500) {
    throw new Error(`Server error: ${response.status}`);
  }

  if (response.status === 404) {
    return null;
  }

  const json = await response.json();
  return json;
}
