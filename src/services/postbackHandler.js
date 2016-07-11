"use strict";
const request = require('superagent');
const fs = require('fs');
const fbAccessToken = process.env.FB_ACCESS_TOKEN;


function handlePostback(event, fsm) {
  let nextState = event.postback.payload;
  fsm.transition(nextState);
}

module.exports = handlePostback;
