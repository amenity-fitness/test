const cacheName = "v0.6";
const offlineUrl = "offline.html";
// const offlineUrl = "/offline";

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     (async () => {
//       const urlsToCache = [ offlineUrl, '/', '/app', '/login' ],
//       // const urlsToCache = [ offlineUrl ],
//       cache = await caches.open(cacheName)
//       await cache.addAll(urlsToCache)
//     })()
//   );
// });

self.addEventListener('install', event => { event.waitUntil(installHandler()); });

// const cacheUrls = [ offlineUrl, '/', '/app', '/login' ]
const cacheUrls = [ offlineUrl ]
async function installHandler() {
  let cache = await caches.open(cacheName);
  await cache.addAll(cacheUrls);
}

self.addEventListener('activate', event => { event.waitUntil(enablePreload()); });

async function enablePreload() {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
}
// addEventListener('activate', (event) => {
//   event.waitUntil((async () => {
//     if (self.registration.navigationPreload) {
//       await self.registration.navigationPreload.enable();
//     }
//   })());
//   // self.clients.claim();
// });

// async function cleanResponse(res) {
//   return new Response(res.blob(), {
//     // headers: res.headers,
//     status: res.status,
//     statusText: res.statusText
//   })
// }

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event))
})

async function cacheFirst(event) {
  const { request } = event
  const cachedResponse = await caches.match(request)
  if (cachedResponse) return cachedResponse;
  const preloadResponse = await event.preloadResponse;
  if (preloadResponse) return preloadResponse;
  try {
    const networkResponse = await fetch(request)
    // await putCache(request, networkResponse.clone())
    return networkResponse;
  } catch (err) {
    return caches.match(offlineUrl)
  }
}
async function putCache(req, res) {
  switch (true) {
    case req.mode === 'navigate':
      let cache = await caches.open(cacheName);
      await cache.put(req, res);
  }
}

// self.addEventListener('fetch', event => {
//   switch (true) {
//     // case event.request.url.includes('_nuxt/assets/img'):
//     //   event.respondWith((async () => {
//     //     try {
//     //       const cachedResponse = await caches.match(event.request);
//     //       if (cachedResponse) return cachedResponse;
//     //       const networkResponse = await fetch(event.request),
//     //       cache = await caches.open(cacheName)
//     //       await cache.put(event.request, networkResponse.clone())
//     //       return networkResponse;
//     //     } catch (err) {
//     //       console.log(err)
//     //     }
//     //   })());
//     //   break
//     // case event.request.url.includes('_nuxt'):
//       // event.respondWith((async () => {
//       //   try {
//       //     const cachedResponse = await caches.match(event.request);
//       //     if (cachedResponse) return cachedResponse;
//       //     const networkResponse = await fetch(event.request),
//       //     cache = await caches.open(cacheName)
//       //     await cache.put(
//       //       event.request, new Response(await networkResponse.clone().blob(), {
//       //         // headers: res.headers,
//       //         status: networkResponse.status,
//       //         statusText: networkResponse.statusText
//       //       })
//       //     )
//       //     return networkResponse;
//       //   } catch (err) {
//       //     console.log(err)
//       //   }
//       // })());
//       // break
//     case event.request.mode === 'navigate':
//       event.respondWith((async () => {
//         try {
//           // const cachedResponse = await caches.match(event.request)
//           // if (cachedResponse) return cachedResponse;
//           // const preloadResponse = await event.preloadResponse;
//           // if (preloadResponse) return preloadResponse;
//           // const networkResponse = await fetch(event.request)
//           // cache = await caches.match(cacheName)
//           // await cache.put(networkResponse.clone())
//           caches.match(event.request)
//             .then(function (response) {
//               return response || fetch(event.request);
//             })
//           // return fetch(event.request);
//         } catch (err) {
//           // const cachedResponse = await caches.match(event.request)
//           const defaultResponse = await caches.match(offlineUrl)
//           return defaultResponse
//           // return cachedResponse ? cachedResponse : defaultResponse
//         }
//       })());
//   }
// });

self.addEventListener("message", ( event ) => {
  if ( event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})