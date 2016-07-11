"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const request = require('superagent');
const bodyParser = require('body-parser');
const fbAccessToken = process.env.FB_ACCESS_TOKEN;
const fs = require('fs');
const handleMessageEvent = require('./src/services/messagingHandler.js');
const handlePostback = require('./src/services/postbackHandler.js');
const dispatch = require('./src/services/dispatch.js');

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.get("/", (req, res) => res.send('dreams'));


//verification
app.get("/webhook/", (req, res) => {
  if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] ===
    process.env.VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  }
});


app.post('/webhook', function(req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Each message type is different, dispatch it to the appropriate handler
      pageEntry.messaging.forEach(messagingEvent => dispatch(messagingEvent));
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});