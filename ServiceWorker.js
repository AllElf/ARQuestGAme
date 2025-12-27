const cacheName = "DefaultCompany-AR-0.1";
const contentToCache = [
    "Build/497caffc3a4c09126920a077c37dae33.loader.js",
    "Build/ec0398ed312c8132024764ace5444a53.framework.js.unityweb",
    "Build/aa6fdd373a6c25fb0f7217bfb315e06a.data.unityweb",
    "Build/ccb4d270e07e0cc1937586c00b475f3c.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
