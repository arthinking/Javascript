> 将控制器命名为[Name]Controller而不是[Name]Ctrl是一个最佳实践。

> 控制器可以将与一个独立视图相关的业务逻辑封装在一个独立的容器中。尽可能地精简控制器是很好的做法。

> AngularJS同其他JavaScript框架最主要的一个区别就是，`控制器`并不适合用来执行DOM操作、格式化或数据操作，以及除存储数据模型之外的状态维护操作。它只是视图和$scope之间的桥梁。

> `$scope`对象用来从数据模型向视图传递信息。同时，它也可以用来设置事件监听器，同应用的其他部分进行交互，以及创建与应用相关的特定业务逻辑。

> AngularJS通过作用域将视图、控制器和指令（本书后面会介绍）隔离开来，这样就很容易为功能的具体部分编写测试。

```html
<div ng-controller="FirstController">
	<h4>The simplest adding machine ever</h4>
	<button ng-click="add(1)" class="button">Add</button>
	<a ng-click="subtract(1)" class="button alert">Subtract</a>
	<h4>Current count: {{ counter }}</h4>
</div>
```

```javascript
app.controller('FirstController', function($scope) {
	$scope.counter = 0;
	$scope.add = function(amount) { $scope.counter += amount; };
	$scope.subtract = function(amount) { $scope.counter -= amount; };
});
```

##5.1、控制器嵌套（作用域包含作用域）

控制器的这种嵌套结构和DOM的嵌套结构很相似。

控制器应该尽可能保持短小精悍，而在控制器中进行DOM操作和数据操作则是一个不好的实践。
```javascript
angular.module('myApp', [])
	.controller('MyController', function($scope) {
		$scope.shouldShowLogin = true;
		$scope.showLogin = function () {
			$scope.shouldShowLogin = !$scope.shouldShowLogin;
		};
		$scope.clickButton = function() {
			$('#btn span').html('Clicked');
		};
		$scope.onLogin = function(user) {
			$http({
				method: 'POST',
				url: '/login',
				data: {
					user: user
				}
			}).success(function(data) {
				// user
			});
		};
	});
```

设计良好的应用会将复杂的逻辑放到指令和服务中。通过使用指令和服务，我们可以将控制器重构成一个轻量且更易维护的形式：

```javascript
angular.module('myApp', [])
	.controller('MyController', function($scope,UserSrv) {
		// 内容可以被指令控制
		$scope.onLogin = function(user) {
			UserSrv.runLogin(user);
		};
	});
```







