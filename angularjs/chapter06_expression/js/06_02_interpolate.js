/*
angular.module('myApp', [])
	.controller('MyController', function($scope, $interpolate) {
	// 设置监听
	$scope.$watch('emailBody', function(body) {
		if (body) {
			var template = $interpolate(body);
			$scope.previewText = template({to: $scope.to});
		}
	});
});
*/

// 用自定义的 __ 符号取代默认语法中的 {{ }} 符号来请求插值文本
angular.module('emailParser', [])
	.config(['$interpolateProvider', function($interpolateProvider) {
		$interpolateProvider.startSymbol('__');
		$interpolateProvider.endSymbol('__');
	}])
	// 创建了一个模块，可以将它注入到应用中，并在邮件正文的文本中运行这个邮件解析器：
	.factory('EmailParser', ['$interpolate', function($interpolate) {
		// 处理解析的服务
		return {
			parse: function(text, context) {
				var template = $interpolate(text);
				return template(context);
			}
		};
	}]);
	
angular.module('myApp', ['emailParser'])
	.controller('MyController', ['$scope', 'EmailParser',
		function($scope, EmailParser) {
			// 设置监听
			$scope.$watch('emailBody', function(body) {
				if (body) {
					$scope.previewText = EmailParser.parse(body, {
						to: $scope.to
					});
				}
			});
		}]);