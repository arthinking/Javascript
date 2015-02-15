define(function(require) {

	// var test;
	// 
	// module.exports = test;
	
	// require module in spm.dependencies
	var moment = require('moment');
	
	// require relative file in you project
	// var util = require('./util');
	
	var now = moment().format('MMMM Do YYYY, h:mm:ss a');
	module.exports = now;

});

