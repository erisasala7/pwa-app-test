importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "301841775656",
    appId: "1:301841775656:web:09eb62b4afdbb71925091d",
    projectId: "pwapush-3ace0",
    apiKey: "AIzaSyCOyxJJ-lfFCAhUbv_TMhbVDoMe_APv2rM",
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
// var cacheName = 'pwaBADemo';
// var filesToCache = [
//     'https://erisasala7.github.io/pwa-app-test/',
//     'https://erisasala7.github.io/pwa-app-test/img/icons/ace_logo_klein.png',
//     'https://erisasala7.github.io/pwa-app-test/img/icons/ace_logo.png'

// ];

// /* Start the service worker and cache files in filesToCache */
// self.addEventListener('install', function(e) {
//     e.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//             return cache.addAll(filesToCache);
//         })
//     );
// });

// /* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//     e.respondWith(
//         caches.match(e.request).then(function(response) {
//             return response || fetch(e.request);
//         })
//     );
// });
// // Register event listener for the 'push' event.
// console.log('Service Worker Works');
// self.addEventListener('push', function(event) {
//     // Retrieve the textual payload from event.data (a PushMessageData object).

//     const payload = event.data ? event.data.text() : 'no payload';

//     // Keep the service worker alive until the notification is created.
//     event.waitUntil(
//         // Show a notification with title  and use the payload
//         // as the body.
//         self.registration.showNotification('Push API', {
//             body: payload,
//         })
//     );
// });
// self.addEventListener('notificationclick', event => {
//     // Schließen Sie das Benachrichtigungs-Popout
//     event.notification.close();
//     // Holen Sie sich alle Window Clients
//     event.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {

//         //Wenn bereits eine Fenster-Registerkarte mit der Ziel-URL existiert, wird diese fokussiert;
//         const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === event.notification.data.url ? windowClient.navigate(event.notification.data.url).then((windowClient.focus(), true)) : false);

//         // Andernfalls öffnen Sie eine neue Registerkarte mit der entsprechenden URL und fokussieren sie.
//         if (!hadWindowToFocus) clients.openWindow(event.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);

//     }));

// });