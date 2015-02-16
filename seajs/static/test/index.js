define(function(require, exports, module) {

	var moment = require('moment');
	var math = require('math');
	
	console.log(moment);
	
	console.log(math);
	
	var now = "123"; // moment().format('MMMM Do YYYY, h:mm:ss a');
	
	module.exports = {
    	now: now,
    	math: math 
  	};

});

