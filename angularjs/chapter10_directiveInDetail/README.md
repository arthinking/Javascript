## 10.1 指令定义
directive()这个方法是用来定义指令的：
```javascript
angular.module('myApp', [])
    .directive('myDirective', function ($timeout, UserDefinedService) {
        // 指令定义放在这里
});
```
**该方法有两个参数：**
#### 1. name（字符串）
指令的名字，用来在视图中引用特定的指令。
#### 2. factory_function （函数）
这个函数返回一个对象，其中定义了指令的全部行为。$compile服务利用这个方法返回的对象，在DOM调用指令时来构造指令的行为。

我们也可以返回一个函数代替对象来定义指令。

**工作流程：**
当AngularJS启动应用时，它会把第一个参数当作一个字符串，并以此字符串为名来注册第二个参数返回的对象。AngularJS编译器会解析主HTML的DOM中的元素、属性、注释和CSS类名中使用了这个名字的地方，并在这些地方引用对应的指令。当它找到某个已知的指令时，就会在页面中插入指令所对应的DOM元素。

和controller函数类似，我们通过$injetor.invoke来调用指令的工厂函数。

定义一个指令时可以使用的全部设置选项：
```javascript
angular.module('myApp', [])
    .directive('myDirective', function() {
        return {
            restrict: String,  // E元素 A属性，默认值 C类名 M注释
            priority: Number,  // 优先级，默认为0，ngRepeat默认为1000
            terminal: Boolean,  // 如果元素上某个指令设置了terminal参数并具有较高的优先级，就不要再用其他低优先级的指令对其进行修饰了，因为不会被调用。如ngView和ngIf就是用了该属性。
            template: String or Template Function:
                function(tElement, tAttrs) (...},
            templateUrl: String,
            replace: Boolean or String,  // false表示着模板会被当作子元素插入到调用此指令的元素内部
            scope: Boolean or Object,
            transclude: Boolean,  
            controller: String or
                function(scope, element, attrs, transclude, otherInjectables) { ... },
            controllerAs: String,
            require: String,
            link: function(scope, iElement, iAttrs) { ... },
            compile: // 返回一个对象或连接函数，如下所示：
                function(tElement, tAttrs, transclude) {
                    return {
                        pre: function(scope, iElement, iAttrs, controller) { ... },
                        post: function(scope, iElement, iAttrs, controller) { ... }
                    }                   
                    // 或者
                    return function postLink(...) { ... }
                }               
            };
        });
```

## 10.2 指令作用域
DOM中每个指令调用时都可能会：
- 直接调用`相同的作用域对象`；
- 从当前作用域对象继承一个`新的作用域对象`；
- 创建一个同当前作用域相`隔离的作用域对象`。

### 10.2.1 scope参数（布尔型或对象）
当scope设置为true时，会从父作用域`继承并创建`一个新的作用域对象。

### 10.2.2 隔离作用域
隔离作用域的概念是以面向对象编程为基础的。可以避免污染所处的外部作用域或不经意地污染内部作用域。
```html
<div ng-controller='MainController'>
    Outside myDirective: {{ myProperty }}
    <div my-directive ng-init="myProperty = 'wow, this is cool'">
        Inside myDirective: {{ myProperty }}
    </div>
</div>
```
由于ngInit指令会以非零的优先级运行，这个例子将会优先运行ngInit指令，然后才是我们定义的指定。
```javascript
angular.module('myApp', [])
    .controller('MainController', function($scope) {
    })
    .directive('myDirective', function() {
        return {
            restrict: 'A',
            scope: {},  // 如果设置为true，则会创建一个隔离作用域
            priority: 100,
            template: '<div>Inside myDirective {{ myProperty }}</div>'
        };
    });
```
myProperty会输出`ng-init`赋予的值，而如果scope设置为true则会创建一个隔离作用域，myProperty为空。

## 10.3 绑定策略
使用无数据的隔离作用域并不常见。AngularJS提供了几种方法能够`将指令内部的隔离作用域，同指令外部的作用域进行数据绑定`。

**绑定方法：**
- 本地作用域属性
使用@符号将本地作用域同`DOM属性的值`进行绑定。指令内部作用域可以使用外部作用域的变量：
```
@ (or @attr)
```
- 双向绑定
通过=可以将本地作用域上的属性同`父级作用域`上的属性进行双向的数据绑定。
```
= (or =attr)
```
- 父级作用域绑定
通过&符号可以对`父级作用域进行绑定`，以便在其中运行函数。意味着对这个值进行设置时会生成一个指向父级作用域的包装函数。
```
& (or &attr)
```
**双向数据绑定**

### 10.3.1 transclude
默认值是false。

嵌入通常用来创建可复用的组件，典型的例子是模态对话框或导航栏。

如果指令使用了transclude参数，那么在控制器（下面马上会介绍）中就无法正常监听数据模型的变化了。这就是最佳实践总是建议在链接函数里使用$watch服务的原因。
