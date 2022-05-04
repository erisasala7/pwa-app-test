self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});
self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('samples/page' + primaryKey + '.html');
        notification.close();
    }


});
self.addEventListener('push', (event) => {
    // const json = JSON.parse(event.data.text())
    // console.log('Push Data', event.data.text())
    // self.registration.showNotification(json.header, json.options)
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "This is a Push notification from section.io. When we receive a push notification with a payload, the data is available directly on the event object. This data can be of any type, and you can access the data as a JSON result, a BLOB, a typed array, or raw text.", //the body of the push notification
            image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
            icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon
        }
    );
});
// self.addEventListener('push', event => {
//     let body;

//     if (event.data) {
//         body = event.data.text();
//     } else {
//         body = 'Default body';
//     }

//     const options = {
//         body: body,
//         icon: 'images/notification-flat.png',
//         vibrate: [100, 50, 100],
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         },
//         actions: [{
//                 action: 'explore',
//                 title: 'Go to the site',
//             },
//             {
//                 action: 'close',
//                 title: 'Close the notification',
//             },
//         ]
//     };

//     event.waitUntil(
//         self.registration.showNotification('Push Notification', options)
//     );
// });
self.addEventListener('install', (event) => { // event when service worker install
    console.log('install', event);
    self.skipWaiting();
});

self.addEventListener('activate', (event) => { // event when service worker activated
    console.log('activate', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) { // HTTP request interceptor
    // event.respondWith(fetch(event.request)); // send all http request without any cache logic
    event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        ) // cache new request. if already in cache serves with cache.
});