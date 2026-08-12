const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

// shared fetch function so I'm not repeating the same headers/error handling
// in main.js and breed-detail.js
export async function fetchCatData(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Cat API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}