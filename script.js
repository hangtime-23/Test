// OMDb API Configuration
const OMDB_API_KEY = '26fa137a'; // Replace with your OMDb API key (do NOT commit a private key to a public repo)
const OMDB_API_URL = 'https://www.omdbapi.com/';

// If you absolutely need a CORS proxy, set USE_CORS_PROXY = true and provide a proxy URL.
// Better option: serve images through your own server-side proxy so the API key stays hidden.
const USE_CORS_PROXY = false;
const CORS_PROXY = 'https://your-cors-proxy.example.com/'; // optional: your own proxy

async function fetchPosterForTitle(title) {
    const url = `${OMDB_API_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}&r=json`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`OMDb request failed: ${resp.status}`);
    const data = await resp.json();
    if (data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
        return data.Poster;
    }
    return null;
}

// Fetch movie posters from OMDb API and set image src
async function loadMoviePosters() {
    const posterImages = document.querySelectorAll('.poster[data-movie-title]');

    // Process in parallel but be mindful of API rate limits.
    const promises = Array.from(posterImages).map(async (img) => {
        const movieTitle = img.getAttribute('data-movie-title');
        try {
            const posterUrl = await fetchPosterForTitle(movieTitle);
            if (posterUrl) {
                img.loading = 'lazy';
                // If you want to use a proxy for the poster image, uncomment below:
                img.src = USE_CORS_PROXY ? (CORS_PROXY + posterUrl) : posterUrl;
                img.alt = `${movieTitle} poster`;
            } else {
                img.src = 'https://via.placeholder.com/300x450?text=No+Poster+Available';
                img.alt = `No poster for ${movieTitle}`;
            }
        } catch (err) {
            console.error(`Error fetching poster for "${movieTitle}":`, err);
            img.src = 'https://via.placeholder.com/300x450?text=Error+Loading+Poster';
            img.alt = `Error loading poster for ${movieTitle}`;
        }
    });

    await Promise.all(promises);
}

// Load posters when DOM is ready
document.addEventListener('DOMContentLoaded', loadMoviePosters);
