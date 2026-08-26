const CACHE_NAME = 'whattoeat-2.0b-20260818-v47';
const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/foundation.css',
  '/foundation-bootstrap.js',
  '/pwa-foundation.js',
  '/script.js',
  '/catalog-quality.js',
  '/catalog-quality-core.js',
  '/catalog-quality-batch2.js',
  '/catalog-quality-batch3.js',
  '/catalog-quality-batch4.js',
  '/catalog-quality-batch5.js',
  '/catalog-quality-batch6.js',
  '/catalog-quality-batch7.js',
  '/catalog-quality-batch8.js',
  '/catalog-quality-batch9.js',
  '/catalog-quality-batch10.js',
  '/catalog-quality-batch11.js',
  '/catalog-quality-batch12.js',
  '/catalog-quality-batch13.js',
  '/catalog-quality-batch14.js',
  '/catalog-quality-batch15.js',
  '/catalog-quality-batch16.js',
  '/catalog-quality-validate.js',
  '/meal-image-manifest.js',
  '/meal-image-manifest-validate.js',
  '/meal-images.js',
  '/meal-image-card-sync.js',
  '/meal-image-modal-sync.js',
  '/meal-image-health.js',
  '/meal-image-production.js',
  '/meal-image-readiness.js',
  '/app.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', networkResponse.clone());
        return networkResponse;
      } catch (error) {
        const cachedPage = await caches.match('/index.html');
        return cachedPage || caches.match('/offline.html');
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const networkResponse = await fetch(event.request);
      if (networkResponse && networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      return caches.match('/offline.html');
    }
  })());
});
