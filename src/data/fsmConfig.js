var generatedStates = require('./states.js');

var fsmConfig = {

    initialState: "limbo",
    states: {
        limbo: {
            "*"() { this.transition( "hello" ); }
        }
    },
    start: function() {
        this.handle("_onEnter");
    },
    onInput: function(input) {
      this.handle('input', input);
    }
}

Object.assign(fsmConfig.states, generatedStates);
console.log(fsmConfig.states);

module.exports = fsmConfig;
