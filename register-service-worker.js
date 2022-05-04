if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js');
    });
}


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
    // write your own ajax request method using fetch, jquery, axios to save the subscription in your server for later use.
};

const subscribeUser = async() => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
    const applicationServerPublicKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4'; // paste your webpush certificate public key
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey
        })
        .then((subscription) => {
            console.log('User is subscribed newly:', subscription);
            updateSubscriptionOnServer(subscription);
        })
        .catch((err) => {
            if (Notification.permission === 'denied') {
                console.warn('Permission for notifications was denied')
            } else {
                console.error('Failed to subscribe the user: ', err)
            }
        });
};


const checkSubscription = async() => {
    const swRegistration = await navigator.serviceWorker.getRegistration();
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