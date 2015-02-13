/**
 * author: arthinking
 * serialize form data to json
 * usage : dom.toJsonParam() or 
 *         dom.toJsonParam('init')
 */
;(function($){
	
	/**
	 * Helper Function for get field parameter, fields being considered:
	 * input: hidden, password, text, checkbox, radio, : [name, value]
	 * select : [name, value]
	 * select multiple : [name, value]
	 * textarea : [name, value]
	 */
	function getFieldParameter(element){
		var type = element.type.toLowerCase();
		switch (element.type.toLowerCase()) {    
	      	case 'hidden':
	      	case 'password':
	      	case 'text':
	        	return [element.name, element.value];    
	      	case 'checkbox':
	      	case 'radio':
	      		if (element.checked)
	    			return [element.name, element.value];
	    		break;  // this must break, or it will goto next return;
	    	case 'textarea':
	    		return [element.name, element.value];
	    	case 'select':
	    	case 'select-multiple':
	    		var values = [];
	    		var options = element.getElementsByTagName('option');
	    		for(var i=0; i<options.length; i++){
	    			if(options[i].selected){
	    				values.push(options[i].value);
	    			}
	    		}
	    		return [element.name, values];
	    }
	    return false;
	}
	
	function serializeElement(element) {
	    var parameter = getFieldParameter(element);
	    
	    if (parameter) {
	    	var key = encodeURIComponent(parameter[0]);
	      	if (key.length == 0) return;
	     	if (parameter[1].constructor != Array)
	        	parameter[1] = [parameter[1]];
	          
	      	var values = parameter[1];
	      	var results = [];
	      	for (var i=0; i<values.length; i++) {
	        	results.push(key + '=' + encodeURIComponent(values[i]));
	      	}
	      	return results.join('&');
	    }
	}
	
	// Functions for toJsonParam
	var methods = {
		init : function(options){
		    var elements = $(this).find('input, textarea, select');
		    var queryComponents = new Array();    
		    
		    for (var i = 0; i < elements.length; i++) {    
		      	var queryComponent = serializeElement(elements[i]);    
		      	if (queryComponent)    
		        	queryComponents.push(queryComponent);    
		    }
		    return queryComponents.join('&');  
		}
	};
	
	$.fn.toJsonParam = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method == 'object' || !method){
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method:' + method + ' does not exist on jQuery.toJsonParam.');
		}
	}
})(jQuery);