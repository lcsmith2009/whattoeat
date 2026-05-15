const CACHE_NAME = 'whattoeat-v6-1-click-fix';
const ASSETS = ['./index.html?v=6.1','./style.css?v=6.1.0','./script.js?v=6.1.0','./manifest.json?v=6.1'];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request).catch(() => caches.match(event.request))); });
