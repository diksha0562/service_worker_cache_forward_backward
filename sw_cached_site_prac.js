// cached site
const cacheName = 'v2';

// call install events
self.addEventListener('install', (e) => {
    console.log('Service worker installed');
}); 

self.addEventListener('activate', (e) => {
    console.log('Service worker activated');
    //remove unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            console.log('cacheNames',cacheNames, cacheName);
           return Promise.all(
                cacheNames.map( cache => {
                    if(cache !== cacheName){
                        console.log('clearing old cache');
                        return caches.delete(cache)
                    }
                })
            )
        } )
    )
})

// fetch event (show catch files if offline)

self.addEventListener('fetch', (e)=>{
    console.log('service worker fetching');
    // check if cache file is available
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // make copy clone of response
                const resClone = res.clone();
                //open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // add response to cache
                        cache.put(e.request, resClone);
                    });
                    return res;
            }).catch(err => caches.match(e.request).then(res => res))
    )
})
