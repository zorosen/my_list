const CACHE_NAME = 'anime-archive-v1';
const ASSETS = [
  './',
  './anime-archive.html',
  './image-db.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap'
];

// Install Event
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', e => {
  // Handle requests
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      // Return cached asset if found
      if (cacheRes) return cacheRes;

      // Otherwise, fetch from network
      return fetch(e.request).then(fetchRes => {
        // Only cache if it's a successful request
        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic' && !e.request.url.includes('Anime_Library')) {
          return fetchRes;
        }

        // Cache local images on the fly
        if (e.request.url.includes('Anime_Library/')) {
          const resClone = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request.url, resClone);
          });
        }

        return fetchRes;
      }).catch(err => {
        // Fallback for offline access
        if (e.request.url.indexOf('.html') > -1) {
          return caches.match('./anime-archive.html');
        }
        console.error('Fetch error:', err);
      });
    })
  );
});
