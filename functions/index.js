
'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const app = dialogflow({debug: true});

admin.initializeApp(functions.config().firebase);

const db = admin.database();

app.intent('add item', (conv, {itemName}) => {
  db.ref("/items/" + itemName).set(true);
  conv.add('alright boy, I\'ve added' + itemName);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
