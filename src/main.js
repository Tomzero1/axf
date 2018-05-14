// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入 axios
import axios from 'axios'
// 引入fastclick 解决移动端300延迟问题
import fastclick from 'fastclick'
// 引入需要用到的mint-ui里面的功能
import { Lazyload, MessageBox, Swipe, SwipeItem } from 'mint-ui'
// 引入mint-ui的css文件
import 'mint-ui/lib/style.min.css'
// 引入reset.js动态计算rem
import './common/style/reset.js'
// 引入reset.css清除元素默认样式
import './common/style/reset.css'
// 把引入fastclick 绑定到body上面
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.prototype.$msg = MessageBox
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 将axios添加到vue的原型上
Vue.prototype.$http = axios
/* eslint-disable no-new */
// 全局守卫 判断TabBar显示隐藏
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/category' || to.path === '/cart' || to.path === '/mine') {
    store.state.TabBarShow = true
  } else {
    store.state.TabBarShow = false
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
