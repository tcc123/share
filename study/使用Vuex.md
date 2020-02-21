#### 使用Vuex

1.安装vuex模块

```js
npm install vuex --save
```

2.引入模块

```js
import Vue from 'vue'
import Vuex from 'vuex'
```

3.把Vuex作为Vue才插件使用

```js
Vue.use(Vuex)
```

4.定义容器

```js
export default new Vuex.Store({
		state：{
  		count：10   //定义一个状态
		}，
    mutations:{
    	updateCount(state,payload){    //改变state
  				state.count +=payload.add;
				}
    }
})
```

```js
export default {
		methods：{
			changeCount(){
				this.$store.commit('updateCount',{
					add:30
				})
			}
		}
}
```

5.注入根实例

```js 
import store from './store'
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
```

