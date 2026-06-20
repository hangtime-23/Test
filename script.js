// Poster display functionality removed.
// This script intentionally does not fetch or display poster images to avoid CORS/API issues.
// It removes poster <img> elements from the DOM on load so the page layout won't show broken images.

document.addEventListener('DOMContentLoaded', () => {
  const posters = document.querySelectorAll('.poster');
  posters.forEach(img => img.remove());

  // Optional: if you prefer to keep the <img> elements but hide them instead,
  // replace the remove() call above with: img.style.display = 'none';

  console.info('Poster display functionality has been removed; poster <img> elements were removed from the DOM.');
});
