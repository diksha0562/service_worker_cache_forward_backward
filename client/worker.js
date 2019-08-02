console.log('service worker loaded',self);

self.addEventListener('push', e=> {
    const data = e.data.json();
    console.log('Push recieved');
    self.registration.showNotification(data.title, {
        body: 'Notification xxxxx'
    });
})

// when we send subscription object to subscribe on server its going to send notification and service worker is gonna show that notification