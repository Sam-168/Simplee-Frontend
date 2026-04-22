// const CACHE_NAME = 'simplee-v1'

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(cache => {
//       return cache.addAll(['/', '/index.html', '/manifest.json'])
//     })
//   )
//   self.skipWaiting()
// })

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(
//         keys
//           .filter(key => key !== CACHE_NAME)
//           .map(key => caches.delete(key))
//       )
//     })
//   )
//   self.clients.claim()
// })

// self.addEventListener('fetch', event => {
//   const url = new URL(event.request.url)

//   // Only handle http/https — ignore chrome-extension, ws, etc.
//   if (!url.protocol.startsWith('http')) return

//   // Ignore Vite dev server internals
//   if (url.pathname.startsWith('/@') || url.pathname.startsWith('/node_modules')) return

//   // Ignore API calls — always fetch fresh
//   if (url.pathname.startsWith('/api')) return

//   // Ignore non-GET requests
//   if (event.request.method !== 'GET') return

//   if (event.request.mode === 'navigate') return

//   event.respondWith(
//     fetch(event.request)
//       .then(response => {
//         // Only cache valid responses
//         if (!response || response.status !== 200 || response.type === 'error') {
//           return response
//         }
//         const copy = response.clone()
//         caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
//         return response
//       })
//       .catch(() => caches.match(event.request))
//   )
// })