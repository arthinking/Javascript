## 8.1 指令：自定义HTML 元素和属性

### 1、ML引导

### 2、我们的第一个指令

```javascript
angular.module('myApp', [])
	.directive('myDirective', function() {
		return {
			restrict: 'E',  // 元素（E）、属性（A）、类（C）或注释（M）
			replace: true,  // 非嵌套到自定义元素内部
			template: '<a href="http://google.com">Click me to go to Google</a>'
		};
	});
```

### 3、关于IE浏览器

==restrict使用属性方式，有较好的跨浏览器兼容性。==

### 4、表达式

- 用表达式来声明指令
```html
<my-directive="someExpression">
</my-directive>
<div my-directive="someExpression">
</div>
<div class="my-directive:someExpression">
</div>
<!-- directive: my-directive someExpression -->
```

- 当前作用域介绍

[作用域例子：](http://jsbin.com/sakexefuxi/edit?html,js,output)

```html
  <p>We can access: {{ rootProperty }}</p>
  <div id="parentCtrl" ng-controller="ParentCtrl">
    <p>We can access: {{ rootProperty }} and {{ parentProperty }}</p>
    <div id="childCtrl" ng-controller="ChildCtrl">
      <p>
        We can access:
        {{ rootProperty }} and
        {{ parentProperty }} and
        {{ childProperty }}
      </p>
      <p>{{ fullSentenceFromChild }}</p>
    </div>
  </div>

  <script>
    angular.module('myApp', [])
    .run(function($rootScope) {
      // use .run to access $rootScope
      $rootScope.rootProperty = 'root scope';
    })
    .controller('ParentCtrl', function($scope) {
      // use .controller to access properties inside `ng-controller`
      // in the DOM omit $scope, it is inferred based on the current controller
      $scope.parentProperty = 'parent scope';
    })
    .controller('ChildCtrl', function($scope) {
      $scope.childProperty = 'child scope';
      // just like in the DOM, we can access any of the properties in the
      // prototype chain directly from the current $scope
      $scope.fullSentenceFromChild = 'Same $scope: We can access: ' +
                                     $scope.rootProperty + ' and ' +
                                     $scope.parentProperty + ' and ' +
                                     $scope.childProperty
    });
  </script>
```
运行结果：
```html
We can access: root scope
We can access: root scope and parent scope
We can access: root scope and parent scope and child scope
Same $scope: We can access: root scope and parent scope and child scope
```

## 8.1、向指令中传递数据
在主HTML文档中，可以给指令添加myUrl和myLinkText两个属性，这两个参数会成为指令内部作用域的属性：
```html
angular.module('myApp', [])
	.directive('myDirective', function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				myUrl: '@', //绑定策略
				myLinkText: '@' //绑定策略
			},
			template: '<a href="{{myUrl}}">' +
				'{{myLinkText}}</a>'
			};
		});

<div my-directive
	my-url="http://google.com"
	my-link-text="Click me to go to Google">
</div>
```

==隔离作用域==





















