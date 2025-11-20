const cacheName = "DefaultCompany-AR-0.1";
const contentToCache = [
    "Build/427bea65dee8fbd5c3cbdef25eba8de0.loader.js",
    "Build/b5aaa07cd46efab91a046d0713896ccb.framework.js.unityweb",
    "Build/2a9877151b3d77f333f82c2ae011993e.data.unityweb",
    "Build/013f77905384e38504691edd8ce3f94d.wasm.unityweb",
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
