"use strict";
var inspector = require('schema-inspector');
var Parser = require('./Parser.js');

class ButtonParser extends Parser {

  constructor() {
    super();
    this.schema = {
      type: 'object',
      properties: {
        attachment: {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            },
            payload: {
              type: 'object',
              properties: {
                text: {
                  type: 'string'
                },
                template_type: {
                  type: 'string'
                },
                text: {
                  type: 'string'
                },
                buttons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    minLength: 1
                  }
                }
              }
            }
          }
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

    state[`state2`] = {
      fbMessage: fbMessage,
      _onEnter: function() {
        this.emit('say', this.fbMessage);
      },
      onInput: function(input) {
        this.emit('say', { text: input });
      }
    };

    return state;
  }
}

module.exports = ButtonParser;