// OMDb API Configuration
const OMDB_API_KEY = '26fa137a'; // Replace with your actual OMDb API key
const OMDB_API_URL = 'https://www.omdbapi.com/';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy

// Fetch movie posters from OMDb API
async function loadMoviePosters() {
    const posterImages = document.querySelectorAll('.poster[data-movie-title]');
    
    for (const img of posterImages) {
        const movieTitle = img.getAttribute('data-movie-title');
        try {
            const response = await fetch(`${OMDB_API_URL}?t=${encodeURIComponent(movieTitle)}&apikey=${OMDB_API_KEY}`);
            const data = await response.json();
            
            if (data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
                // Use CORS proxy for the poster URL
                img.src = CORS_PROXY + data.Poster;
            } else {
                // Fallback to placeholder if poster not found
                img.src = 'https://via.placeholder.com/300x450?text=No+Poster+Available';
            }
        } catch (error) {
            console.error(`Error fetching poster for ${movieTitle}:`, error);
            // Fallback to placeholder on error
            img.src = 'https://via.placeholder.com/300x450?text=Error+Loading+Poster';
        }
    }
}

// Load posters when DOM is ready
document.addEventListener('DOMContentLoaded', loadMoviePosters);
