import './style.css';
import { fetchCatData } from './api.js';

const container = document.getElementById('detail-container');

// Read the breed id from the URL, e.g. breed.html?id=abys
const params = new URLSearchParams(window.location.search);
const breedId = params.get('id');

async function loadBreedDetail() {
  if (!breedId) {
    container.innerHTML = `<p class="error">No breed selected. Go back and pick one.</p>`;
    return;
  }

  try {
    // First request: get this breed's full info
    const breeds = await fetchCatData('/breeds');
    const breed = breeds.find((b) => b.id === breedId);

    if (!breed) {
      container.innerHTML = `<p class="error">Breed not found.</p>`;
      return;
    }

    // Second request: get images for this specific breed
    const images = await fetchCatData('/images/search', {
      breed_id: breedId,
      limit: 6,
    });

    renderBreedDetail(breed, images);
  } catch (err) {
    container.innerHTML = `<p class="error">Something went wrong loading this breed. Please try again.</p>`;
    console.error(err);
  }
}

function renderBreedDetail(breed, images) {
  const galleryHtml =
    images.length > 0
      ? images.map((img) => `<img src="${img.url}" alt="${breed.name}" />`).join('')
      : `<p>No photos available for this breed yet.</p>`;

  container.innerHTML = `
    <div class="detail-card">
      <h1>${breed.name}</h1>
      <p><strong>Origin:</strong> ${breed.origin || 'Unknown'}</p>
      <p><strong>Temperament:</strong> ${breed.temperament || 'Not listed'}</p>
      <p>${breed.description || ''}</p>
      <h2>Photos</h2>
      <div class="gallery">${galleryHtml}</div>
    </div>
  `;
}

loadBreedDetail();