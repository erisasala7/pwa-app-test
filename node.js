const pushSubscription = { "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABh2…E0mTFsHtUqaye8UCoLBq8sHCgo2IC7UaafhjGmVCG_SCdhZ9Z88uGj-uwMcg", "keys": { "auth": "qX6AMD5JWbu41cFWE3Lk8w", "p256dh": "BLxHw0IMtBMzOHnXgPxxMgSYXxwzJPxpgR8KmAbMMe1-eOudcIcUTVw0QvrC5gWOhZs-yzDa4yKooqSnM3rnx7Y" } };
//your web certificates public-key
const vapidPublicKey = 'BFF4a8X89ZTfWGhzPSncasOkOpyAJxKzWfVXzX-BT2R7-E8GJaCvGwEDnXXJYs0Lxo7pF_xaLDftZQhZUGmFaX4';
//your web certificates private-key
const vapidPrivateKey = 'aCz8WZ-wIGdSNZnsH9quvVmExg9abUT1JWysMV4oJPI';

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