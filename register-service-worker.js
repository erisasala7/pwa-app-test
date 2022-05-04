if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://erisasala7.github.io/pwa-app-test/service-worker.js');

        // setInterval(function() {
        var today = new Date();
        var date;
        var dateTime;
        var table = "";
        var data = [];
        var arrays = [];
        var retrievedArray;
        var arrayreceived;

        var myArray = [
            "FM1",
            "FM2",
            "FM3",
        ];

        var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
        displayErrors(randomItem);
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        dateTime = date + ' ' + time;
        jsonData = [{
            username: date,
            club: time,
            category: randomItem
        }];
        arrays.push(data);
        console.log("Data array: ");
        console.log(arrays);
        localStorage.setItem('arrays', JSON.stringify(jsonData));
        retrievedArray = localStorage.getItem('arrays');
        console.log(retrievedArray);
        arrayreceived = JSON.parse(retrievedArray);
        for (var i = 0; i < jsonData.length; i++) {
            var tr = document.createElement('tr');
            tr.appendChild(document.createElement(jsonData[i].username));
            tr.appendChild(document.createElement(jsonData[i].club));
            tr.appendChild(document.createElement(jsonData[i].category));
            byId('errorTable').appendChild(tr);
        }
    });
    // }, 10000);


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

const displayErrors = notificationError => {
    console.log('display notification')
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            console.log(reg)
            const options = {
                body: notificationError,
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 0
                }
            };

            reg.showNotification("Fehlermldung", options);
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