"use strict";
var inspector = require('schema-inspector');


class Parser {

  /**
   * Checks if a the provided message is 
   * @param  {object} fbMessage  - A json representing a potential facebook message
   */
  validate(fbMessage) {
    var result = inspector.validate(this.schema, fbMessage);
    return result.valid;
  }
}

module.exports = Parser;
