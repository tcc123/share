1、为什么使用babel后没有被转义呢？

因为没有配置babel

2、为什么Array.from没有被转义？

babel默认只会转换语法

3、怎么做Array.from才能被转义

安装babel-polyfill  Array.prototype.from就存在于全局空间中

4、为什么两次转义后的代码会不一样

因为安装了babel-plugin-transform-runtime之后，公共方法被提取出来了