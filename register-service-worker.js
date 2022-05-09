navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js');

navigator.serviceWorker.ready
    .then(function(registration) {
        return registration.pushManager.getSubscription()
            .then(async function(subscription) {

                if (subscription) {
                    return subscription;

                }
                // const response = await fetch('./vapidPublicKey');
                const vapidPublicKey = "BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4";
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            });
    }).then(function(subscription) {
        fetch('./register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription
            }),
        });

        document.getElementById('doIt').onclick = function() {
            const delay = document.getElementById('notification-delay').value;
            const ttl = document.getElementById('notification-ttl').value;

            fetch('./sendNotification', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription,
                    delay: delay,
                    ttl: ttl,
                }),
            });
        };

    }); // const PUBLIC_VAPID_KEY =
//     "BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4";

// const subscription = async() => {
//     // Service Worker
//     console.log("Registering a Service worker");
//     const register = await navigator.serviceWorker.register("https://erisasala7.github.io/pwa-app-test/service-worker.js", {
//         scope: "https://erisasala7.github.io/pwa-app-test/"
//     });
//     console.log("New Service Worker");

//     // Listen Push Notifications
//     console.log("Listening Push Notifications");
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
//     });

//     console.log(subscription);

//     // Send Notification
//     await fetch("/subscription", {
//         method: "POST",
//         body: JSON.stringify(subscription),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     console.log("Subscribed!");
// };
// const firebaseConfig = {
//     apiKey: "AIzaSyCOyxJJ-lfFCAhUbv_TMhbVDoMe_APv2rM",
//     authDomain: "pwapush-3ace0.firebaseapp.com",
//     projectId: "pwapush-3ace0",
//     storageBucket: "pwapush-3ace0.appspot.com",
//     messagingSenderId: "301841775656",
//     appId: "1:301841775656:web:09eb62b4afdbb71925091d",
//     measurementId: "G-4YJMC7PN17"
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();
// messaging
//     .requestPermission()
//     .then(() => {
//         message.innerHTML = "Notifications allowed";
//         return messaging.getToken();
//     })
//     .then(token => {
//         tokenString.innerHTML = "Token Is : " + token;
//     })
//     .catch(err => {
//         errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
//         console.log("No permission to send push", err);
//     });
// messaging.onMessage(payload => {
//     console.log("Message received. ", payload);
//     const { title, ...options } = payload.notification;
// });

// // Service Worker Support
// if ("serviceWorker" in navigator) {
//     subscription().catch(err => console.log(err));
// }



// const publicVapidKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4';
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js');
//     });


// }

// async function send(notificationError) {
//     //register service worker
//     const register = await navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js', {
//         scope: 'https://erisasala7.github.io/pwa-app-test/'
//     });

//     //register push
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         //public vapid key
//         applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//     });

//     //Send push notification
//     await fetch("/subscribe", {
//         method: "POST",
//         body: notificationError,
//         headers: {
//             "content-type": "application/json"
//         }
//     });
// }

// function urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//         .replace(/\-/g, "+")
//         .replace(/_/g, "/");

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }
// Notification.requestPermission(status => {
//     if (status != 'granted') {
//         alert("Sie haben die Banachrichtigungen nicht zugelassen");
//     } else if (status == "granted") {
//         subscribeUser();
//         this.setTimeout(() => {
//             let myTable = document.querySelector('#table');
//             let headers = ['Datum', 'Uhrzeit', 'Fehlermeldung'];
//             let table = document.createElement('table');
//             let headerRow = document.createElement('tr');
//             headers.forEach(headerText => {
//                 let header = document.createElement('th');
//                 let textNode = document.createTextNode(headerText);
//                 header.appendChild(textNode);
//                 headerRow.appendChild(header);
//             });
//             table.appendChild(headerRow);
//             this.setInterval(() => {
//                 var today = new Date();
//                 var date;
//                 var dateTime;

//                 var myArray = [
//                     "FM1",
//                     "FM2",
//                     "FM3",
//                 ];

//                 var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
//                 fetch('/new-message', {
//                     method: 'POST',
//                     body: JSON.stringify({ message: randomItem }),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//                 time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
//                 dateTime = date + ' ' + time;
//                 jsonData = [{
//                     username: date,
//                     club: time,
//                     category: randomItem
//                 }];
//                 setTimeout(() => {
//                     jsonData.forEach(emp => {
//                         let row = document.createElement('tr');
//                         Object.values(emp).forEach(text => {
//                             let cell = document.createElement('td');
//                             let textNode = document.createTextNode(text);
//                             cell.appendChild(textNode);
//                             row.appendChild(cell);
//                         })
//                         table.appendChild(row);
//                     });
//                 }, 2000);

//                 myTable.appendChild(table);
//             }, 10000);

//         }, 1);
//     }
// });



// const displayErrors = notificationError => {
//     if (Notification.permission == 'granted') {

//         navigator.serviceWorker.getRegistration().then(reg => {
//             console.log(reg)
//             const options = {
//                 body: notificationError,
//                 vibrate: [100, 50, 100],
//                 icon: "https://erisasala7.github.io/pwa-app-test/img/icons/ace_logo.png"

//             };

//             reg.showNotification("Fehlermldung", options);
//         });
//     }
// };



// const subscribeUser = async() => {
//     const swRegistration = await navigator.serviceWorker.getRegistration();
//     const applicationServerPublicKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4'; // paste your webpush certificate public key
//     const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//     swRegistration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey
//         })
//         .then((subscription) => {
//             console.log('User is subscribed newly:', subscription);
//         })
//         .catch((err) => {
//             if (Notification.permission === 'denied') {
//                 console.warn('Permission for notifications was denied')
//             } else {
//                 console.error('Failed to subscribe the user: ', err)
//             }
//         });
// };


// const checkSubscription = async() => {
//     const swRegistration = await navigator.serviceWorker.getRegistration();
//     swRegistration.pushManager.getSubscription()
//         .then(subscription => {
//             if (!!subscription) {
//                 console.log('User IS Already subscribed.');
//             } else {
//                 console.log('User is NOT subscribed. Subscribe user newly');
//                 subscribeUser();
//             }
//         });
// };

// checkSubscription();


// const urlB64ToUint8Array = (base64String) => {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4)
//     const base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/')

//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// };