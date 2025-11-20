const cacheName = "DefaultCompany-AR-0.1";
const contentToCache = [
    "Build/65209ab41e820a5aace87acf00825d23.loader.js",
    "Build/b5aaa07cd46efab91a046d0713896ccb.framework.js.unityweb",
    "Build/c6da23fb1222fa24b51f4eb7808cf137.data.unityweb",
    "Build/934a85a7c8896c2f2fe87bbdc75c2d1b.wasm.unityweb",
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
