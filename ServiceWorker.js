const cacheName = "DefaultCompany-AR-0.1";
const contentToCache = [
    "Build/4a4635c34ce8c80d318c4a54986bc11b.loader.js",
    "Build/4cbb4bd83ac3cac0ebb8b3cf83aa9410.framework.js.unityweb",
    "Build/946a2107ab0314ffe3abe2859c6522cf.data.unityweb",
    "Build/7484325a5a28b0709fddb266d58fb157.wasm.unityweb",
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
