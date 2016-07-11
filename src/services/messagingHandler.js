"use strict";
const fs = require('fs');
const fsm = require('./fsm.js');


function handleMessageEvent(event, fsm) {

  if (event.message && event.message.text) {
    let text = event.message.text;
    let message = { body: text };
    fsm.onInput(message.body);
  }

}

module.exports = handleMessageEvent;