## 12.1、安装
```javascript
<script src="js/vendor/angular-route.js"></script>
```

## 12.2、布局模板
```html
<div class="content">
    <div ng-view></div>
</div>
```
## 12.3、路由

```javascript
angular.module('myApp', []).
    config(['$routeProvider', function($routeProvider) {  // 数组这种特殊的依赖注入语法
        $routeProvider
        .when('/', {  // 第一个参数是路由路径，会与$location.path进行匹配，$location.path也就是当前URL的路径
            templateUrl: 'views/home.html',  // 第二个参数是配置对象
            controller: 'HomeController'
        });
    }]);
```

下面是一个复杂的路由方案：
```javascript
angular.module('myApp', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                user: function(SessionService) {
                    return SessionService.getCurrentUser();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);
```

**1. controller: **


## 12.4、$locaotion服务

## 12.5、路由模式

### 12.5.1、HTML5模式

### 12.5.2、路由事件

### 12.5.3、关于搜索引擎索引

## 12.6、更多关于路由的内容

### 12.6.1、页面重新加载

### 12.6.2、异步的地址变化
