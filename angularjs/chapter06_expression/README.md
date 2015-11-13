表达式和eval(javascript)非常相似，但是由于表达式由AngularJS来处理，它们有以下显著不同的特性：
* 所有的表达式都在其所属的作用域内部执行，并有访问本地$scope的权限；
* 如果表达式发生了TypeError和ReferenceError并不会抛出异常；
* 不允许使用任何流程控制功能（条件控制，例如if/eles）；
* 可以接受过滤器和过滤器链。

##6.1、解析AngularJS表达式
`$parse`: AngularJS通过`$parse`这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。

[$parse/$eval和$observe/$watch如何区分](http://www.ngnice.com/posts/2314014da4eea8 "$parse/$eval和$observe/$watch如何区分")

##6.2、插值表达式
`$interpolate服务`: 插值允许基于作用域上的某个条件实时更新文本字符串，可接收三个参数：
* text（字符串）：一个包含`字符插值标记`的字符串。
* mustHaveExpression（布尔型）：如果将这个参数设为true，当传入的字符串中不含有表达式时会返回null。
* trustedContext（字符串）：AngularJS会对已经进行过字符插值操作的字符串通过$sec.getTrusted()方法进行严格的上下文转义。

