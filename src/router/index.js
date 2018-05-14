import Vue from 'vue'
import Router from 'vue-router'
/*
// 老的引入方式
import Home from '../pages/home/home.vue'
*/
/*
// 使用异步的方式引入
const Home = resolve => require(['../pages/home/home.vue'], resolve)
*/
// 首页
const Home = resolve => require(['../pages/home/home.vue'], resolve)
// 闪送超市页
const Category = resolve => require(['../pages/category/category.vue'], resolve)
// 购物车页
const Cart = resolve => require(['../pages/cart/cart.vue'], resolve)
// 我的页
const Mine = resolve => require(['../pages/mine/mine.vue'], resolve)
// 用户登录注册页
const Login = resolve => require(['../pages/login/login.vue'], resolve)
// 选择地址页
const Site = resolve => require(['../pages/Site/Site.vue'], resolve)
// 添加地址页
const AddSite = resolve => require(['../pages/add-Site/add-Site.vue'], resolve)
// 选择地址地图页
const Selectsite = resolve => require(['../pages/Select-site/Select-site.vue'], resolve)
const Details = resolve => require(['../pages/details/details.vue'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/site',
      name: 'Site',
      component: Site
    },
    {
      path: '/addSite',
      name: 'AddSite',
      component: AddSite
    },
    {
      path: '/selectsite',
      name: 'Selectsite',
      component: Selectsite
    },
    {
      path: '/details/:id',
      name: Details,
      component: Details
    }
  ]
})
