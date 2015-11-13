**1、HTML模板中的过滤器：**
```html
{{ name | uppercase }}
```

> 使用:传递参数给过滤器：
```html
<!-- 显示：123.46 -->
{{ 123.456789 | number:2 }}
```

> 可以用|符号作为分割符来同时使用多个过滤器。

**2、在JavaScript代码中可以通过`$filter`来调用过滤器:**
```javascript
app.controller('DemoController', ['$scope', '$filter',
	function($scope, $filter) {
		$scope.name = $filter('lowercase')('Ari');
	}]);
```

**3、AngularJS提供的内置过滤器：**

*1. currency*
```html
{{ 123 | currency }}
```

*2. date*
```html
{{ today | date:'medium' }} <!-- Aug 09, 2013 12:09:02 PM -->
{{ today | date:'short' }} <!-- 8/9/1312:09PM -->
{{ today | date:'fullDate' }} <!-- Thursday, August 09, 2013 -->
{{ today | date:'longDate' }} <!-- August 09, 2013 -->
{{ today | date:'mediumDate' }}<!-- Aug 09, 2013 -->
{{ today | date:'shortDate' }} <!-- 8/9/13 -->
{{ today | date:'mediumTime' }}<!-- 12:09:02 PM -->
{{ today | date:'shortTime' }} <!-- 12:09 PM -->

年份格式化
四位年份：{{ today | date:'yyyy' }} <!-- 2013 -->
两位年份：{{ today | date:'yy' }} <!-- 13 -->
一位年份：{{ today | date:'y' }} <!-- 2013 -->

月份格式化
英文月份：{{ today | date:'MMMM' }} <!-- August -->
英文月份简写：{{ today | date:'MMM' }} <!-- Aug -->
数字月份：{{ today |date:'MM' }} <!-- 08 -->
一年中的第几个月份：{{ today |date:'M' }} <!-- 8 -->

日期格式化
数字日期：{{ today|date:'dd' }} <!-- 09 -->
一个月中的第几天：{{ today | date:'d' }} <!-- 9 -->
英文星期：{{ today | date:'EEEE' }} <!-- Thursday -->
英文星期简写：{{ today | date:'EEE' }} <!-- Thu -->

小时格式化
24小时制数字小时：{{today|date:'HH'}} <!--00-->
一天中的第几个小时：{{today|date:'H'}} <!--0-->
12小时制数字小时：{{today|date:'hh'}} <!--12-->
上午或下午的第几个小时：{{today|date:'h'}} <!--12-->

分钟格式化
数字分钟数：{{ today | date:'mm' }} <!-- 09 -->
一个小时中的第几分钟：{{ today | date:'m' }} <!-- 9 -->

秒数格式化
数字秒数：{{ today | date:'ss' }} <!-- 02 -->
一分钟内的第几秒：{{ today | date:'s' }} <!-- 2 -->
毫秒数：{{ today | date:'.sss' }} <!-- .995 -->

字符格式化
上下午标识：{{ today | date:'a' }} <!-- AM -->
四位时区标识：{{ today | date:'Z' }} <!--- 0700 -->

下面是一些自定义日期格式的示例：
{{ today | date:'MMMd, y' }} <!-- Aug9, 2013 -->
{{ today | date:'EEEE, d, M' }} <!-- Thursday, 9, 8-->
{{ today | date:'hh:mm:ss.sss' }} <!-- 12:09:02.995 -->
```

*3. filter*
这个过滤器的第一个参数可以是字符串、对象或是一个用来从数组中选择元素的函数。

*4. json*
son过滤器可以将一个JSON或JavaScript对象转换成字符串。

*5. limitTo*
limitTo过滤器会根据传入的参数生成一个新的数组或字符串，新的数组或字符串的长度取决于传入的参数，通过传入参数的正负值来控制从前面还是从后面开始截取。

*6. lowercase*

*7. number*
number过滤器将数字格式化成文本。它的第二个参数是可选的，用来控制小数点后截取的位数。

*8. orderBy*
orderBy可以接受两个参数，第一个是必需的，第二个是可选的。
第一个参数是用来确定数组排序方向的谓词。第二个参数用来控制排序的方向（是否逆向）。
```html
orderBy:'name':true
```

*9. uppercase*
uppercase过滤器可以将字符串转换为大写形式。

##7.1、自定义过滤器

###创建一个过滤器：
```javascript
angular.module('myApp.filters', [])
	.filter('capitalize', function() {
		return function(input) {
		// input是我们传入的字符串
		if (input) {
			return input[0].toUpperCase() + input.slice(1);
		}
	});
```

###使用：
```html
<!-- Ginger loves dog treats -->
{{ 'ginger loves dog treats' | lowercase | capitalize }}
```

##7.2、表单验证
AngularJS提供了很多表单验证指令。

###input元素上使用的所有验证选项：

1. 必填项
```html
<input type="text" required />
```

2. 最小长度
```html
<input type="text" ng-minlength="5" />
```

3. 最大长度
```html
<input type="text" ng-maxlength="20" />
```

4. 模式匹配
```html
<input type="text" ng-pattern="[a-zA-Z]" />
```

5. 电子邮件
```html
<input type="email" name="email" ng-model="user.email" />
```

6. 数字
```html
<input type="number" name="age" ng-model="user.age" />
```

7. URL
```html
<input type="url" name="homepage" ng-model="user.facebook_url" />
```

8. 自定义验证
需要使用到指令的相关内容，第10章再深入研究如何创建自定义验证。

9. 在表单中控制变量

10. 一些有用的CSS样式
*$parsers：*
使用$parsers数组是实现自定义验证的途径之一。


*$formatters：*



11. 组合实例
















