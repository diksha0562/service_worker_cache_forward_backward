const cacheName='v1';

const cacheAssets=['index.html']

//call install events
self.addEventListener('install', e => {
  console.log('service worker installed')
  //tell browser to wait untill promise is finished, --get rid of service worker
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('caching files')
        cache.addAll(cacheAssets);
      })
      .then(() =>  self.skipWaiting())
  );


})

//call activate event

self.addEventListener('activate', e => {
  console.log('service worker activated')
  //remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if(cache!=cacheName){
            console.log('clearing old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})


//call fetch event
self.addEventListener('fetch',e=> {
  console.log('fetching')
  //if fresh site available otherwise load cached
  e.respondWith(fetch(e.request).catch( () => caches.match(e.request)))
})



// self.addEventListener('fetch', function (event) {
//   if (event.tag === 'image-fetch') {
//     console.log('hey');
//   }
// });