// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCOyxJJ-lfFCAhUbv_TMhbVDoMe_APv2rM",
    authDomain: "pwapush-3ace0.firebaseapp.com",
    projectId: "pwapush-3ace0",
    storageBucket: "pwapush-3ace0.appspot.com",
    messagingSenderId: "301841775656",
    appId: "1:301841775656:web:09eb62b4afdbb71925091d",
    measurementId: "G-4YJMC7PN17",
    databaseURL: 'https://pwapush-3ace0.firebaseio.com',

});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();