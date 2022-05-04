import { generateVAPIDKeys, setVapidDetails, setGCMAPIKey, sendNotification } from 'web-push';
//body-parser
import { json } from 'body-parser';

//path
import { join } from 'path';

//using express 
const app = express();

//using bodyparser
app.use(json());

const VK = generateVAPIDKeys();
const publicVK = VK.publicKey;
const privateVK = VK.privateKey;
const vapid_Details = setVapidDetails('mailto:erisasala7@gmail.com', publicVK, privateVK);
const payload = 'Here is a payload!';

const options = {
    gcmAPIKey: setGCMAPIKey(),
    TTL: 60,
    vapidDetails: vapid_Details


};

sendNotification(
    pushSubscription,
    payload,
    options
);

//subscribe route
app.post('/subscribe', (req, res) => {
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({ title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

//set the static path 
app.use(express.static(join(__dirname, "/")));