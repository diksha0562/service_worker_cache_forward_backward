const publicVapidKey = 'BBQ9tglraYnkJa3bUSKwES5fo5kdurnmmzj0MMqq0R21F0NiLuSbAJFPvOfES_fv4zS9kwtajesHSuU0c9GILuo';   

// check for service worker
if(navigator.serviceWorker){
    send().catch(err => console.log(err));

}

// register sw, register push, send push
async function send(){

    // Register service worker
    console.log('registering service worker');
    // scope is where worker is gonna apply
    const register = await navigator.serviceWorker.register('/worker.js',{ scope:'/'});
    console.log('service worker registered...', register);

    //Register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered...', JSON.stringify(subscription));

    //send push notification
    console.log('sending push...');
    await fetch('/subscribe', {
        method:'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  