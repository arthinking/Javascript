所有以ng前缀开头作为命名空间的指令都是AngularJS提供的内置指令，因此不要把你自己开发的指令以这个前缀命名。

## 9.1 基础ng属性指令

```
ng-href
ng-src
ng-disabled
ng-checked
ng-readonly
ng-selected
ng-class
ng-style
```
### 9.1.1 布尔属性

#### 1. ng-disabled
在下面的例子中按钮会一直禁用，直到用户在文本字段中输入内容：
```html
<input type="text" ng-model="someProperty" placeholder="TypetoEnable">
<button ng-model="button" ng-disabled="!someProperty">AButton</button>
```
在下面的例子，文本字段会被禁用五秒，直到在$timeout中将isDisabled属性设置为true：
```html
<textarea ng-disabled="isDisabled">Wait5seconds</textarea>
```
```javascript
angular.module('myApp', [])
    .run(function($rootScope, $timeout) {
        $rootScope.isDisabled = true;
        $timeout(function() {
            $rootScope.isDisabled = false;
        }, 5000);
});
```

#### 2. ng-readonly
通过ng-readonly可以将某个返回真或假的表达式同是否出现readonly属性进行绑定。

#### 3. ng-checked
通过ng-checked将某个表达式同是否出现checked属性进行绑定。

默认选中复选框的例子：
```html
<input type="checkbox" ng-checked="someProperty" ng-init="someProperty = true" ng-model="someProperty">
```

#### 4. ng-selected
ng-selected可以对是否出现option标签的selected属性进行绑定。

### 9.1.2 类布尔属性
ng-href、ng-src等属性虽然不是标准的HTML布尔属性，但是由于行为相似，所以在AngularJS源码内部是和布尔属性同等对待的。
#### 1. ng-href

#### 2. ng-src
浏览器在ng-src对应的表达式生效之前不要加载图像。

### 9.2 在指令中使用子作用域
ng-app和ng-controller是特殊的指令，因为它们会修改嵌套在它们内部的指令的作用域。
ng-app为AngularJS应用创建`$rootScope`，ng-controller则会以$rootScope或另外一个ng-controller的作用域为原型创`建新的子作用域`。

#### 1. ng-app
通过`run方法`来访问$rootScope。

在整个文档中`只使用一次ng-app`。如果需要在一个页面中放置多个AngularJS应用，需要`手动引导应用`。

#### 2. ng-controller

修改父级对象中的字符串、数字和布尔型变量会同时修改子对象中的值，但反之则不行。

修改父级对象中的修改父级对象中的字符串、数字和布尔型变量会同时修改子对象中的值，反之也可以。

#### 3. ng-include
使用ng-include可以加载、编译并包含外部HTML片段到当前的应用中。

使用ng-include时AngularJS会自动创建一个`子作用域`。

如果你想使用某个特定的作用域，例如`ControllerA`的作用域，必须在同一个DOM元素上添加`ng-controller ="ControllerA"`指令。

例如：
```html
<div ng-include="/myTemplateName.html"
    ng-controller="MyController"
    ng-init="name = 'World'">
    Hello {{ name }}
</div>
```

#### 4. ng-switch
```html
<input type="text" ng-model="person.name"/>
<div ng-switch on="person.name">
    <p ng-switch-default>And the winner is</p>
    <h1 ng-switch-when="Ari">{{ person.name }}</h1>
</div>
```

#### 5. ng-view
ng-view指令用来设置将被路由管理和放置在HTML中的视图的位置。

#### 6. ng-if
使用ng-if指令可以完全根据表达式的值在DOM中生成或移除一个元素。

ng-if同ng-show和ng-hide指令最本质的区别是，它不是通过CSS显示或隐藏DOM节点，而是`真正生成或移除节点`。

当一个元素被ng-if从DOM中移除，同它关联的`作用域`也会被销毁。

#### 7. ng-repeat
ng-repeat用来遍历一个集合或为集合中的每个元素生成一个模板实例。
```
$index：遍历的进度（0...length-1）。
$first：当元素是遍历的第一个时值为true。
$middle：当元素处于第一个和最后元素之间时值为true。
$last：当元素是遍历的最后一个时值为true。
$even：当$index值是偶数时值为true。
$odd：当$index值是奇数时值为true。
```
```html
<ul ng-controller="PeopleController">
    <li ng-repeat="person in people" ng-class="{even: !$even, odd: !$odd}">
        {{person.name}} lives in {{person.city}}
    </li>
</ul>
.odd {
    background-color: blue;
}
.even {
    background-color: red;
}
```

```javascript
angular.module('myApp',[])
    .controller('PeopleController',function($scope) {
        $scope.people = [
            {name: "Ari", city: "San Francisco"},
            {name: "Erik", city: "Seattle"}
        ];
    });
```

#### 8. ng-init
ng-init指令用来在指令被调用时设置内部作用域的初始状态。
```html
<div ng-init="greeting='Hello';person='World'">
    {{greeting}} {{person}}
</div>
```

#### 9. {{ }}
{{ }}语法是AngularJS内置的模板语法，它会在内部$scope和视图之间创建`绑定`。基于这个绑定，只要$scope发生变化，视图就会随之自动更新。

实际上它是`ng-bind`的简略形式，用这种形式不需要创建新的元素，因此它常被用在行内文本中。

#### 10. ng-bind
```html
<body ng-init="greeting='HelloWorld'">
    <p ng-bind="greeting"></p>
</body>
```
HTML加载含有{{ }}语法的元素后并不会立刻渲染它们，导致未渲染内容闪烁（Flash ofUnrendered Content，FOUC）。

#### 11. ng-cloak
ng-cloak指令会将内部元素隐藏，直到路由调用对应的页面时才显示出来。
```html
<body ng-init="greeting='HelloWorld'">
    <p ng-cloak>{{ greeting }}</p>
</body>
```

#### 12. ng-bind-template
ng-bind-template用来在视图中绑定多个表达式。
```html
<div ng-bind-template="{{message}}{{name}}">
</div>
```

#### 13. ng-model
我们应该始终用ngModel来绑定$scope上一个数据模型内的属性，而不是$scope上的属性，这可以避免在作用域或后代作用域中发生属性覆盖。
```html
<input type="text" ng-model="modelName.someProperty" />
```

#### 14. ng-show/ng-hide
ng-show和ng-hide根据所给表达式的值来显示或隐藏HTML元素。

#### 15. ng-change
这个指令会在表单输入发生变化时计算给定表达式的值。

#### 16. ng-form
ng-form用来在一个表单内部嵌套另一个表单。

这意味着内部所有的子表单都合法时，外部的表单才会合法。这对于用`ng-repeat`动态创建表单是非常有用的。

[demo](http://jsbin.com/wipetazetu/edit?html,js,output)

#### 17. ng-click
ng-click用来指定一个元素被点击时调用的方法或表达式。

#### 18. ng-select
ng-select用来将数据同HTML的<select>元素进行绑定。
```html
<div ng-controller="CityController">
    <select ng-model="city" ng-options="city.name for city in cities">
        <option value="">Choose City</option>
    </select>
    Best City: {{ city.name }}
</div>
```
```javascript
angular.module('myApp',[])
    .controller('CityController',function($scope) {
        $scope.cities = [
            {name: 'Seattle'},
            {name: 'San Francisco'},
            {name: 'Chicago'},
            {name: 'New York'},
            {name: 'Boston'}
        ];
    });
```

#### 19. ng-submit
ng-submit用来将表达式同onsubmit事件进行绑定。

#### 20. ng-class
使用ng-class 动态设置元素的类。

#### 21. ng-attr-(suffix)
当AngularJS编译DOM时会查找花括号{{ some expression }}内的表达式。这些表达式会被自动注册到$watch服务中并更新到$digest循环中，成为它的一部分。

有时浏览器会对属性会进行很苛刻的限制。SVG就是一个例子：
```html
<svg>
    <circle cx="{{ cx }}"></circle>
</svg>
```
运行上面的代码会抛出一个错误，指出我们有一个非法属性。解决方法：
```html
<svg>
    <circle ng-attr-cx="{{ cx }}"><circle>
</svg>
```
