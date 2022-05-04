const webPush = require('web-push');

const pushSubscription = YOUR_SUBSCRIPTION_OBJECT;

// TODO 4.3a - include VAPID keys

const payload = 'Here is a payload!';

const options = {
    gcmAPIKey: webPush.setGCMAPIKey(),
    TTL: 60,

    // TODO 4.3b - add VAPID details

};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);