var lodash = require('lodash');
var machina = require('machina');
var fsmConfig = require('../data/fsmConfig.js');

var fsm = new machina.Fsm(fsmConfig);

module.exports = fsm;