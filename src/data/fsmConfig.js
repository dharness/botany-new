var generatedStates = require('./states.js');

/* This is the basic config which all our state machines need */
var fsmConfig = {

    initialState: "limbo",
    states: {
        limbo: {
            "*" () { this.transition("state1"); }
        }
    },
    start: function() {
        this.handle("_onEnter");
    },
    onInput: function(input) {
        this.handle('onInput', input);
    }
};


// Add the application specific states to the states in our basic config
Object.assign(fsmConfig.states, generatedStates);

module.exports = fsmConfig;