## 11.1 配置
```javascript
angular.module('myApp', [])
    .factory('myFactory', function(){
        var service = {};
        return service;
    })
    .directive('myDirective', function(){
        return {
            template: '<button>Click me</button>'
        }
    })
```

等同于
```javascript
angular.module('myApp', [])
    .config(function($provide ,$compileProvider) {
        $provide.factory('myFactory', function() {
            var service = {};
            return service;
        });
        $compileProvider.directive('myDirective', function() {
            return {
                template: '<button>Click me</button>'
            };
        });
    });
```
实际上是使用了config()函数的语法糖。

当对模块进行配置时，需要格外注意只有少数几种类型的对象可以被注入到config()函数中：`提供者`和`常量`。如果我们将一个服务注入进去，会在真正对其进行配置之前就意外地把服务实例化了。所以我们只能注入用`provider()`语法构建的服务，其他的则不行。

## 11.2 运行块
和配置块不同，运行块在注入器创建之后被执行，它是所有AngularJS应用中`第一个被执行的方法`，是与`main`方法最接近的概念。可以在这里面进行权限的校验。
```javascript
angular.module('myApp', [])
    .run(function($rootScope, AuthService) {
        $rootScope.$on('$routeChangeStart', function(evt, next, current) {
            // 如果用户未登录
            if (!AuthService.userLoggedIn()) {
                if (next.templateUrl === "login.html") {
                    // 已经转向登录路由因此无需重定向
                } else {
                    $location.path('/login');
                }
            }
        });
```
