import './style.css';
import { fetchCatData } from './api.js';

const grid = document.getElementById('breed-grid');
const searchInput = document.getElementById('search');

let allBreeds = []; // keep the full list around so search can filter without refetching

async function loadBreeds() {
  try {
    allBreeds = await fetchCatData('/breeds');
    renderBreeds(allBreeds);
  } catch (err) {
    // API down or key issue - don't leave the user staring at a blank page
    grid.innerHTML = `<p class="error">Couldn't load breeds. Please try again later.</p>`;
    console.error(err);
  }
}

function renderBreeds(breeds) {
  if (breeds.length === 0) {
    grid.innerHTML = `<p class="error">No breeds match your search.</p>`;
    return;
  }

  grid.innerHTML = breeds
    .map(
      (breed) => `
      <a class="breed-card" href="/breed.html?id=${breed.id}">
        <h2>${breed.name}</h2>
        <p>${breed.origin || 'Unknown origin'}</p>
      </a>
    `
    )
    .join('');
}

// filter client-side as you type, no need to hit the API again for this
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = allBreeds.filter((b) => b.name.toLowerCase().includes(query));
  renderBreeds(filtered);
});

loadBreeds();