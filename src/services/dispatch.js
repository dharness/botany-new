const handleMessageEvent = require('./messagingHandler.js');
const handlePostback = require('./postbackHandler.js');
const fsmConfig = require('../data/fsmConfig.js');
const fs = require('fs');
const machina = require('machina');
const request = require('superagent');

const fbAccessToken = process.env.FB_ACCESS_TOKEN;
var machines = {};

function dispatch(messagingEvent) {

  let senderId = messagingEvent.sender.id;
  var fsm = machines[senderId];

  if (!fsm) {
    fsm = new machina.Fsm(fsmConfig);
    machines[senderId] = fsm;
    fsm.on('say', data => sendMessage(senderId, data));
    fsm.start();
  }

  if (messagingEvent.message) {
    handleMessageEvent(messagingEvent, fsm)
  } else if (messagingEvent.postback) {
    handlePostback(messagingEvent, fsm);
  } else {
    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
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

module.exports = dispatch;