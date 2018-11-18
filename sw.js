var staticCache = 'restaurant-v5';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'css/styles.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',

      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
        .filter(function (cacheName) {
          return (
            cacheName.startsWith('restaurant-') && cacheName != staticCache
          );
        })
        .map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    }).then(function (response) {
      if (response) return response;
      else return fetch(event.request);
    })
  );
});