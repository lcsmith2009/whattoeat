const CACHE = 'whattoeat-v23';
const ASSETS = ['./','index.html','style.css?v=23','script.js?v=23','manifest.json?v=23','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE ? caches.delete(key) : null))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
    return response;
  }).catch(() => caches.match(event.request)));
});
