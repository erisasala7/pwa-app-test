const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/fS7h7qz21ZQ:AP…RcKBLKEcWjeHcYRxADg2k-GB6jaG560MuNmawEe_n1N8jnV55", "keys": { "auth": "qX6AMD5JWbu41cFWE3Lk8w", "p256dh": "BLxHw0IMtBMzOHnXgPxxMgSYXxwzJPxpgR8KmAbMMe1-eOudcIcUTVw0QvrC5gWOhZs-yzDa4yKooqSnM3rnx7Y" } };
//your web certificates public-key
const vapidPublicKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4';
//your web certificates private-key
const vapidPrivateKey = 'aCz8WZ-wIGdSNZnsH9quvVmExg9abUT1JWysMV4oJPI';
const app = express();

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'test' });

    console.log(subscription);

    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
    });
});
var payload = JSON.stringify({
    "options": {
        "body": "PWA push notification testing fom backend",
        "badge": "/assets/icon/icon-152x152.png",
        "icon": "/assets/icon/icon-152x152.png",
        "vibrate": [100, 50, 100],
        "data": {
            "id": "458",
        },
        "actions": [{
            "action": "view",
            "title": "View"
        }, {
            "action": "close",
            "title": "Close"
        }]
    },
    "header": "Notification from Geekflare-PWA Demo"
});

var options = {
    vapidDetails: {
        subject: 'mailto:your-actual-mail@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    },
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
).then(data => {
    return res.json({ status: true, message: 'Notification sent' });
}).catch(err => {
    return res.json({ status: false, message: err });
});