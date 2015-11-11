> AngularJS允许我们使用angular.module()方法来声明模块，这个方法能够接受两个参数，第一个是模块的名称，第二个是依赖列表，也就是可以被注入到模块中的对象列表。

```javascript
// 这个方法相当于AngularJS模块的setter方法，是用来定义模块的。
angular.module('myApp', []);

// 这个方法用于获取应用，相当于AngularJS模块的getter方法
angular.module('myApp')

```

