"use strict";
var inspector = require('schema-inspector');
var Parser = require('./Parser.js');


class TextParser extends Parser {

  constructor() {
    super();
    this.schema = {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        }
      }
    };
  }

  /**
   * Generates a Machina.js state for a text type message
   * @param  {object} fbMessage - A json representing a facebook text message
   * @return {object}           - A Machina.js state
   */
  generateState(stateInfo) {
    let fbMessage = stateInfo.message;
    let stateName = stateInfo.name;
    let nextState = stateInfo.next;
    var text = fbMessage.text;
    let state = {};

    state[stateName] = {
      _onEnter: function() {
        this.emit('say', { text: fbMessage.text });
        if (nextState) { this.transition(nextState); }
      },
      onInput: function(input) {
        this.emit('say', { text: input });
      }
    };

    return state;
  }
}

module.exports = TextParser;