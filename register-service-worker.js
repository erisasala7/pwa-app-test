if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js');
    });
}
navigator.serviceWorker.ready
    .then(function(registration) {
        // Use the PushManager to get the user's subscription to the push service.
        return registration.pushManager.getSubscription()
            .then(async function(subscription) {
                // If a subscription was found, return it.
                if (subscription) {
                    return subscription;
                }

                // Get the server's public key
                const vapidPublicKey = await window.vapidPublicKey.text();
                // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
                // urlBase64ToUint8Array() is defined in /tools.js
                const convertedVapidKey = urlBase64ToUint8Array(window.vapidPublicKey);

                // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                // send notifications that don't have a visible effect for the user).
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            });
    }).then(function(subscription) {
        // Send the subscription details to the server using the Fetch API.
        fetch('./register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription
            }),
        });
    });



Notification.requestPermission(status => {
    console.log('Status:' + status)
    displayNotification('Notification Enabled');
});



const displayNotification = notificationTitle => {
    console.log('display notification')
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            console.log(reg)
            const options = {
                body: 'Thanks for allowing push notification !',

                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 0
                }
            };

            reg.showNotification(notificationTitle, options);
        });
    }
};








const updateSubscriptionOnYourServer = subscription => {
    console.log('Write your ajax code here to save the user subscription in your DB', subscription);
    console.log(JSON.stringify(subscription))
        // write your ajax request method using fetch, jquery, axios to save the subscription in your server for later use.

};

const subscribeUser = async() => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    const applicationServerPublicKey = window.vapidPublicKey; // paste your webpush certificate public key
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey
        })
        .then((subscription) => {
            console.log('User is subscribed newly:', subscription);
            updateSubscriptionOnYourServer(subscription);
        })
        .catch((err) => {
            if (Notification.permission === 'denied') {
                console.warn('Permission for notifications was denied')
            } else {
                console.error('Failed to subscribe the user: ', err)
            }
        });
};
const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const checkSubscription = async() => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    if (!swRegistration) {
        console.log('No service worker detected')
        return;
    }
    swRegistration.pushManager.getSubscription()
        .then(subscription => {
            if (!!subscription) {
                console.log('User IS Already subscribed.');
                updateSubscriptionOnYourServer(subscription);
            } else {
                console.log('User is NOT subscribed. Subscribe user newly');
                subscribeUser();
            }
        });
};

checkSubscription();