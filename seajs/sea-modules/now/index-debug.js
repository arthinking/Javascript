define("now/0.0.0/index-debug", ["moment/2.9.0/moment-debug"], function(require, exports, module){
// require module in spm.dependencies
var moment = require("moment/2.9.0/moment-debug");

// require relative file in you project
// var util = require('./util');

var now = 'test';  // moment().format('MMMM Do YYYY, h:mm:ss a');
module.exports = now;
});
