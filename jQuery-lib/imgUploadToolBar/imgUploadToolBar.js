/**
 * imgUploadToolBar 
 */
;(function($){
	

	function _appendItem(item, _this){
		$(_this).find('.img-upload-toolbar').prepend(item);
	}
	
	function getImageExt(src,ext){
		var srcExt1=src.substring(0,src.lastIndexOf("."));
		var srcExt2=src.substring(src.lastIndexOf("."));
		return srcExt1+"_"+ext+srcExt2;    		
	}
	
	/**
	 * 上传工具栏的模板
	 * TODO:可以进一步抽象出父模板，再编写具体的子模板
	 */
	var _template = {
		_toolbar : '<div class="img-upload-toolbar">'+
					'</div>',
	 	_imgItem : '<div class="iut-unit" style="position:relative; width:50px; height:40px;float:left; margin-right:10px;">'+
						'<img src="__THUMBNAILSRC__" style="width:50px; height:40px;"/>'+
						'<input type="hidden" name="__FIELDNAME__" value="__IMGSRC__" />'+
						'<div class="iut-u-close" style="width:20px; height:20px; cursor:pointer; background:#ccc; position:absolute; right:-5px; top:-10px;">&nbsp;-</div>'+
					'</div>',
		_addIcon : '<div class="iut-add" style="width:50px; height:40px; cursor:pointer; float:left; background:#ccc;">+</div>'
	}
	
	var settings = {'urls'      : [],
		      		'callback'  : function(){},
		      		'fieldName' : 'url',
		      		'thumbnailExt' : 'sthumb',
		      		'maxSize'   : 4};
	
	// Functions for toJsonParam
	var methods = {
		
		/** 
		 * 初始化上传工具栏
		 * params: {urls:[url, url,url], callback:callback}
		 */
		init : function(options){
			settings = $.extend( settings, options);
			var urls = settings.urls;
			var callback = settings.callback;
			// 生成节点
			var toolbarDom = $(_template._toolbar);
			var imgItemHtml = '';
			for(var i=0; i<urls.length; i++){
				var url = urls[i];
				var thumbnailsrc = getImageExt(url, settings.thumbnailExt);
				imgItemHtml += _template._imgItem.replace(/__THUMBNAILSRC__/g, thumbnailsrc)
												 .replace(/__IMGSRC__/g, url)
												 .replace(/__FIELDNAME__/g, settings.fieldName);
			}
			imgItemHtml += _template._addIcon;
			toolbarDom.append(imgItemHtml);
			// 注册事件
			toolbarDom.find('.iut-u-close').bind('click', function(){
				if($(this).parent().parent().find('.iut-unit').length <= settings.maxSize){
					$(this).find('.iut-add').show();
				}
				$(this).parent().remove();
			});
			// 绑定添加的回调
			toolbarDom.find('.iut-add').bind('click', callback);
			// 添加当前的dom中
			$(this).append(toolbarDom);
		},
		
		add : function(url){
			var thumbnailsrc = getImageExt(url, settings.thumbnailExt);
			var imgItemDom = $(_template._imgItem.replace(/__THUMBNAILSRC__/g, thumbnailsrc)
												 .replace(/__IMGSRC__/g, url)
												 .replace(/__FIELDNAME__/g, settings.fieldName));
			imgItemDom.find('.iut-u-close').bind('click', function(){
				$(this).parent().remove();
			});
			_appendItem(imgItemDom, this);
			if($(this).find('.iut-unit').length > settings.maxSize){
				$(this).find('.iut-add').hide();
			}
		},
		
		del : function(){
			// TODO
			$.error('Method: del not implements yet.');			
		},
		
		empty : function(){
			$(this).find('.iut-unit').remove();
		}
	};
	
	$.fn.imgUploadToolBar = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method == 'object' || !method){
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method:' + method + ' does not exist on jQuery.imgUploadToolBar.');
		}
	}
})(jQuery);