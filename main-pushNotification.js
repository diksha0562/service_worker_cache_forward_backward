const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

// ./node_modules/.bin/web-push generate-vapid-keys
// generate public key and private key
const publicVapidKey = 'BBQ9tglraYnkJa3bUSKwES5fo5kdurnmmzj0MMqq0R21F0NiLuSbAJFPvOfES_fv4zS9kwtajesHSuU0c9GILuo';
const privateVapidKey = 'Jv2ryJr3fFPx7iVTRqVD4s0zYhzA6T1sw5Hu6Xu-V7s';

webPush.setVapidDetails('mailto:test@test.com',publicVapidKey, privateVapidKey);
// identifies who is sending push notification

//Subscribe routes
// whatever send to client is send through this route, responsible for sending notification to server-worker
app.post('/subscribe', (req, res) => {
    // get push notification object
    const subscription = req.body;
    // send 201 - resource created
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({title:  'Push test'});

    //pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.log(err));

})

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
