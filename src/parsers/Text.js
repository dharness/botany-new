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
  generateState(fbMessage) {
    var text = fbMessage.text;
    var stateName = Math.random().toString();
    let state = {};

    state[`state1`] = {
      _onEnter: function() {
        this.emit('say', { text: "Hello from state1" });
      },
      onInput: function(input) {
        console.log('on INput');
        this.emit('say', { text: input });
      }
    };

    return state;
  }
}

module.exports = TextParser;