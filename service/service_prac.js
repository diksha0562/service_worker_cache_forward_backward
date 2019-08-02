// make sure service worker are supported

if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker
            .register('../sw-cached_prac.js')
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log(`sevice worker: error: ${err}`))
    });
}