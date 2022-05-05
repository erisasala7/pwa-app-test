const webpush = require("web-push");
//const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
    "mailto:test@faztweb.com",
    "BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4",
    "aCz8WZ-wIGdSNZnsH9quvVmExg9abUT1JWysMV4oJPI"
);

module.exports = webpush;
require("dotenv").config();

const express = require("express");
const morgan = require('morgan');
const path = require("path");

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require('index'));

// Static Content
app.use(express.static(path.join(__dirname, '/')))

app.listen(3000);
console.log('Server Listening...')
    // var express = require('express');
    // var cors = require('cors')
    // var bodyParser = require('body-parser');
    // const socket = require("socket.io");
    // var app = express();
    // app.use(express.static('assets'));


// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(cors())

// var server = app.listen(8081, function() {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
// });

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/" + 'index.html');
// });
// // app.get('/node_modules/*', function (req, res) {
// //   res.sendFile( __dirname +  "/node" + 'index.html' );
// // });


// const io = socket(server);
// io.on("connection", function(socket) {
//     console.log("Made socket connection");

//     socket.on("disconnect", function() {
//         console.log("Made socket disconnected");
//     });

//     socket.on("send-notification", function(data) {
//         io.emit("new-notification", data);
//     });

// });

// // const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/fS7h7qz21ZQ:AP…RcKBLKEcWjeHcYRxADg2k-GB6jaG560MuNmawEe_n1N8jnV55", "keys": { "auth": "qX6AMD5JWbu41cFWE3Lk8w", "p256dh": "BLxHw0IMtBMzOHnXgPxxMgSYXxwzJPxpgR8KmAbMMe1-eOudcIcUTVw0QvrC5gWOhZs-yzDa4yKooqSnM3rnx7Y" } };
// // //your web certificates public-key
// // const vapidPublicKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4';
// // //your web certificates private-key
// // const vapidPrivateKey = 'aCz8WZ-wIGdSNZnsH9quvVmExg9abUT1JWysMV4oJPI';
// // import firebase from 'firebase';
// // export const initializeFirebase = () => {
// //     firebase.initializeApp({
// //         apiKey: "XXXXXXXXXXXXX",
// //         authDomain: "XXXXXXXXXXXXX",
// //         databaseURL: "XXXXXXXXXXXXX",
// //         projectId: "XXXXXXXXXXXXX",
// //         storageBucket: "XXXXXXXXXXXXX",
// //         messagingSenderId: "XXXXXXXXXXXXX",
// //         appId: "XXXXXXXXXXXXX"
// //     });
// // }
// // const app = express();

// // app.use(require('body-parser').json());

// // // app.post('/subscribe', (req, res) => {
// // //     const subscription = req.body;
// // //     res.status(201).json({});
// // //     const payload = JSON.stringify({ title: 'test' });

// // //     console.log(subscription);

// // //     webpush.sendNotification(subscription, payload).catch(error => {
// // //         console.error(error.stack);
// // //     });
// // // });
// // app.post('/subscribe', (req, res) => {
// //     //get push subscription object from the request
// //     const subscription = req.body;

// //     //send status 201 for the request
// //     res.status(201).json({})

// //     //create paylod: specified the detals of the push notification
// //     const payload = JSON.stringify({ title: 'Section.io Push Notification' });

// //     //pass the object into sendNotification fucntion and catch any error
// //     webpush.sendNotification(subscription, payload).catch(err => console.error(err));
// // })
// // app.use(express.static(path.join(__dirname, "/")));
// // var payload = JSON.stringify({
// //     "options": {
// //         "body": "PWA push notification testing fom backend",
// //         "badge": "/assets/icon/icon-152x152.png",
// //         "icon": "/assets/icon/icon-152x152.png",
// //         "vibrate": [100, 50, 100],
// //         "data": {
// //             "id": "458",
// //         },
// //         "actions": [{
// //             "action": "view",
// //             "title": "View"
// //         }, {
// //             "action": "close",
// //             "title": "Close"
// //         }]
// //     },
// //     "header": "Notification from Geekflare-PWA Demo"
// // });

// // var options = {
// //     vapidDetails: {
// //         subject: 'mailto:your-actual-mail@gmail.com',
// //         publicKey: vapidPublicKey,
// //         privateKey: vapidPrivateKey
// //     },
// //     TTL: 60
// // };

// // webPush.sendNotification(
// //     pushSubscription,
// //     payload,
// //     options
// // ).then(data => {
// //     return res.json({ status: true, message: 'Notification sent' });
// // }).catch(err => {
// //     return res.json({ status: false, message: err });
// // });
// // const port = 3000;
// // app.listen(port, () => {
// //     console.log(`server started on ${port}`)
// // });