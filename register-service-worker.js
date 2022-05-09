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
//                 displayErrors(randomItem);
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
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
MsgElem = document.getElementById('msg');
TokenElem = document.getElementById('token');
NotisElem = document.getElementById('notis');
ErrElem = document.getElementById('err');
// TODO: Replace firebaseConfig you get from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCOyxJJ-lfFCAhUbv_TMhbVDoMe_APv2rM",
    authDomain: "pwapush-3ace0.firebaseapp.com",
    projectId: "pwapush-3ace0",
    storageBucket: "pwapush-3ace0.appspot.com",
    messagingSenderId: "301841775656",
    appId: "1:301841775656:web:09eb62b4afdbb71925091d",
    measurementId: "G-4YJMC7PN17"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function() {
        MsgElem.innerHTML = 'Notification permission granted.';
        console.log('Notification permission granted.');

        // get the token in the form of promise
        return messaging.getToken();
    })
    .then(function(token) {
        TokenElem.innerHTML = 'Device token is : <br>' + token;
    })
    .catch(function(err) {
        ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
        console.log('Unable to get permission to notify.', err);
    });

let enableForegroundNotification = true;
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    NotisElem.innerHTML =
        NotisElem.innerHTML + JSON.stringify(payload);

    if (enableForegroundNotification) {
        let notification = payload.notification;
        navigator.serviceWorker
            .getRegistrations()
            .then((registration) => {
                registration[0].showNotification(notification.title);
            });
    }
});