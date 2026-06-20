// OMDb API Configuration
const OMDB_API_KEY = '26fa137a'; // Replace with your OMDb API key (do NOT commit a private key to a public repo)
const OMDB_API_URL = 'https://www.omdbapi.com/';

// Public CORS proxies (for quick testing only). Prefer your own proxy for production.
const PROXY_LIST = [
  { name: 'cors-anywhere', prefix: 'https://cors-anywhere.herokuapp.com/' },
  { name: 'allorigins', prefix: 'https://api.allorigins.win/raw?url=' }
];

async function tryFetch(url) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return resp;
  } catch (err) {
    throw err;
  }
}

// Try direct OMDb request first, then retry through public proxies if needed
async function fetchPosterForTitle(title) {
  const omdbUrl = `${OMDB_API_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}&r=json`;

  // Helper to parse JSON response safely
  async function getJsonFromResponse(resp) {
    try {
      return await resp.json();
    } catch (e) {
      const text = await resp.text();
      throw new Error('Failed to parse JSON from OMDb. Raw response: ' + text);
    }
  }

  // 1) Try direct request
  try {
    console.log('OMDb direct request:', omdbUrl);
    const resp = await tryFetch(omdbUrl);
    const data = await getJsonFromResponse(resp);
    if (data && data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
      return { poster: data.Poster, via: 'direct' };
    }
    console.warn('OMDb direct response did not include a poster or Response != True:', data && data.Error);
  } catch (err) {
    console.warn('Direct OMDb request failed for', title, err.message || err);
  }

  // 2) Try proxies in order
  for (const proxy of PROXY_LIST) {
    try {
      const proxiedUrl = proxy.name === 'allorigins'
        ? `${proxy.prefix}${encodeURIComponent(omdbUrl)}`
        : `${proxy.prefix}${omdbUrl}`;

      console.log(`OMDb proxied request via ${proxy.name}:`, proxiedUrl);
      const resp = await tryFetch(proxiedUrl);
      const data = await getJsonFromResponse(resp);
      if (data && data.Response === 'True' && data.Poster && data.Poster !== 'N/A') {
        return { poster: data.Poster, via: proxy.name };
      }
      console.warn(`${proxy.name} response did not include a poster:`, data && data.Error);
    } catch (err) {
      console.warn(`OMDb request via ${proxy.name} failed:`, err.message || err);
    }
  }

  // Nothing worked
  return { poster: null, via: 'none' };
}

// Fetch movie posters from OMDb API and set image src with image-level proxy fallback
async function loadMoviePosters() {
  const posterImages = document.querySelectorAll('.poster[data-movie-title]');

  const promises = Array.from(posterImages).map(async (img) => {
    const movieTitle = img.getAttribute('data-movie-title');
    let posterData;
    try {
      posterData = await fetchPosterForTitle(movieTitle);
    } catch (err) {
      console.error(`Unexpected error fetching OMDb data for "${movieTitle}":`, err);
      posterData = { poster: null, via: 'error' };
    }

    if (posterData.poster) {
      img.loading = 'lazy';
      img.alt = `${movieTitle} poster`;

      // Keep track whether we've tried proxying the image itself
      let triedImageProxy = false;

      // Image error handler: attempt to load via proxies if available
      img.addEventListener('error', () => {
        console.warn(`Image failed to load for ${movieTitle}, src=`, img.src);
        if (!triedImageProxy) {
          triedImageProxy = true;
          // Try each proxy to load the image through
          (async () => {
            let loaded = false;
            for (const proxy of PROXY_LIST) {
              try {
                let proxiedImageSrc;
                if (proxy.name === 'allorigins') {
                  proxiedImageSrc = `${proxy.prefix}${encodeURIComponent(posterData.poster)}`;
                } else {
                  proxiedImageSrc = `${proxy.prefix}${posterData.poster}`;
                }
                console.log(`Retrying image load via ${proxy.name} for ${movieTitle}:`, proxiedImageSrc);
                img.src = proxiedImageSrc;

                // Wait a short while to see if the image loads (we rely on the next error event if it fails)
                // Break out early if load succeeds — we can't easily detect success here synchronously.
                // We'll set a timeout to fallback if it still fails after a few seconds.
                await new Promise((res) => setTimeout(res, 2000));
                // If image didn't trigger error within timeout, assume success
                if (img.complete && img.naturalWidth > 0) {
                  loaded = true;
                  break;
                }
              } catch (e) {
                console.warn('Error while trying image proxy:', e);
              }
            }

            if (!loaded) {
              console.warn(`All image proxy attempts failed for ${movieTitle}. Showing placeholder.`);
              img.src = 'https://via.placeholder.com/300x450?text=Error+Loading+Poster';
            }
          })();
        } else {
          // Already tried proxies — show placeholder
          img.src = 'https://via.placeholder.com/300x450?text=Error+Loading+Poster';
        }
      });

      // Set initial src (direct poster URL)
      // If the poster URL is HTTP while the page is HTTPS, the browser will block it (mixed content).
      // In that case the error handler above will attempt proxying.
      img.src = posterData.poster;

      // Also set a timeout to check if the image loaded; if not, trigger error fallback
      setTimeout(() => {
        if (!(img.complete && img.naturalWidth > 0) && !img.src.includes('placeholder.com')) {
          console.warn(`Poster for ${movieTitle} still not loaded after timeout, triggering error handler.`);
          // Manually set to a broken URL to trigger the error handler
          img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        }
      }, 3000);

    } else {
      // No poster found — show placeholder
      img.src = 'https://via.placeholder.com/300x450?text=No+Poster+Available';
      img.alt = `No poster for ${movieTitle}`;
      console.info(`No poster available for "${movieTitle}" (OMDb via: ${posterData.via})`);
    }
  });

  await Promise.all(promises);
}

// Load posters when DOM is ready
document.addEventListener('DOMContentLoaded', loadMoviePosters);
