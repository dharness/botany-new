"use strict";
const fs = require('fs');
const TextParser = require('./../parsers/Text.js');
const ButtonParser = require('./../parsers/Button.js');
const responses = require('./responses.js');


// Create all our parsers
var parsers = [new TextParser(), new ButtonParser()];
var stateMachine = {};


responses.forEach((fbMessage) => {

  parsers.some((parser) => {
    // Check if the message is valid for this particular type of parser
    if (parser.validate(fbMessage)) {
      let state = parser.generateState(fbMessage);
      Object.assign(stateMachine, state);
      return true
    }
  });
});

module.exports = stateMachine;