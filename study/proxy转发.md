1、新增加一个后端服务的转发，前端需要做哪些配置改动?

​	在config/index.js 中配置proxy

​			“/v1/“: ”http://………"

​		{

2、项⽬中的配置文件是如何区分环境的?如果要新增一种预发布环境配置⽂文件，应该怎么配置?

​	通过process.env.NODE_ENV区分环境变量

 （1）在config文件中，新建一个预发布环境配置的文件，在config/index.js中配置对应的预发布环境配置

 （2）在build文件夹下，新建对应的预发布环境配置文件

3、脚⼿架中有哪些全局变量量?如果让你新增加⼀一种全局变量量，应该怎样配置?

​	feConfig Enums

​	在build/webpack.base.conf.js 中 配置 webpack.ProvidePlugin

4、路由命名规则和组件命名规则清楚吗?

（1）前端路由命名尽量使用名词；

​    多个名词组合使用“-”区分

（2）路由第一级代表应用 第二级为具体拆分模块 第三级为具体路由页面的功能

（3）路由确定后，对应src/views路径下面的目录保证和路由一致

5、子组件和公共组件分别在那个目录下⾯面书写?

​	src目录下，views目录下对应子组件   公共组件在components下面书写

6、异步数据调⽤用⽅方式有几种?

​	两种  1. 组件内部直接发起请求  2.在vuex 对应的modules中发起

7、$http、$CheckResp、$CheckError都是怎么定义的?

​	$http 请求调用  $CheckResp参数处理 $handleError 错误处理

8、Action 、Mutation、Getters 的命名规范是什么?

​	action  大驼峰  mutation 常量方式  getters 小驼峰

9、Webpack如何实现跨域？

​	webpack通过http-proxy-middle实现跨域 

10、视情况而定 over