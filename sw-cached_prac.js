// cached pages
const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    '/service/service_prac.js'
]


// call install events
self.addEventListener('install', (e) => {
    console.log('Service worker installed');
    // tells browser to wait until promise is finished
    e.waitUntil(
        caches
            .open(cacheName)
            .then( cache => {
                console.log('service worker caching files');
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    );
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
        fetch(e.request).catch(()=>{
            console.log('in catch of fetch')
           return caches.match(e.request)
        })
    )
})
