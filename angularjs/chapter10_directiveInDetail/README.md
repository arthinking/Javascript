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
            restrict: String,  // E A C M
            priority: Number,
            terminal: Boolean,
            template: String or Template Function:
            function(tElement, tAttrs) (...},
                templateUrl: String,
                replace: Boolean or String,
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
