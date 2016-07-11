"use strict";
const fs = require('fs');
const TextParser = require('./../parsers/Text.js');
const ButtonParser = require('./../parsers/Button.js');
const flows = require('./sampleFlow.js');


// Create all our parsers
var parsers = [new TextParser(), new ButtonParser()];
var stateMachine = {};


flows.forEach((flow, x) => {

  flow.forEach((message, i) => {
    parsers.some((parser) => {
      // Check if the message is valid for this particular type of parser
      if (parser.validate(message)) {
        let next = flow[i + 1] ? `state_${x}${i + 1}` : undefined;
        let stateInfo = { name: `state_${x}${i}`, message, next };
        let state = parser.generateState(stateInfo);
        Object.assign(stateMachine, state);
        return true
      }
    });
  });

});

console.log(stateMachine);

module.exports = stateMachine;