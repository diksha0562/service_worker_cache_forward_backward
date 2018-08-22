//loads pages as we visited site


const cacheName='v2';

//call install events
self.addEventListener('install', e => {
  console.log('service worker installed')
  //tell browser to wait untill promise is finished, --get rid of service worker
  
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
  e.respondWith(
      fetch(e.request)
      .then(res => {
          //make copy/clone of response
          const resClone = res.clone();
          //open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
      }).catch(err => caches.match(e.request).then(res => res))
    )
})



// self.addEventListener('fetch', function (event) {
//   if (event.tag === 'image-fetch') {
//     console.log('hey');
//   }
// });