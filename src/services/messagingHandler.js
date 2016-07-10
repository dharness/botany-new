"use strict";
const request = require('superagent');
const machina = require('machina');
const fbAccessToken = process.env.FB_ACCESS_TOKEN;
const fs = require('fs');
const fsm = require('./fsm.js');
const fsmConfig = require('../data/fsmConfig.js');

var machines = {};

// Hack (Morgan), but a small one since the chat bot expects a reset on the
// first message
var isFirstMessage = true;


function handleMessageEvent(event) {
  let senderId = event.sender.id;
  if (event.message && event.message.text) {
    let text = event.message.text;
    let message = {
      body: text
    };
    if (isFirstMessage || text === 'r') {
      message.reset = true;
      isFirstMessage = false;
    }

    var fsm = machines[senderId];
    if (!fsm) {
      fsm = new machina.Fsm(fsmConfig);
      machines[senderId] = fsm;
      fsm.on('say', (data) => {
        console.log(data);
        sendMessage(senderId, data);
      });
      fsm.start();
    }
    fsm.onInput(message.body);
  }
}

function sendMessage(senderId, message) {
  request.post('https://graph.facebook.com/v2.6/me/messages')
    .query({
      access_token: fbAccessToken
    })
    .send({
      recipient: {
        id: senderId
      },
      message,
    })
    .end(callback);

  function callback(error, response) {
    if (error) {
      fs.writeFile('fb_log.json', JSON.stringify(error, null, '\t'), 'utf8', () => {});
    } else if (response.body.error) {
      console.warn('Error: ', response.body.error)
    }
  }
}

module.exports = handleMessageEvent;