<template>
  <nav>
    <router-link to="/" class="home">
      <span></span>
      首页
    </router-link>
    <router-link to="/category" class="category">
      <span></span>
      闪送超市
    </router-link>
    <router-link to="/cart" class="cart">
      <var v-if="num > 0" :class="{active:isActive}">{{num}}</var>
      <span></span>
      购物车
    </router-link>
    <router-link to="/mine" class="mine">
      <span></span>
      我的
    </router-link>
  </nav>
</template>

<script>
export default {
  computed: {
    num () {
      return this.$store.getters.num // 获取购物车总数量
    },
    isActive () {
      return this.$store.state.isActive // 获取isActive布尔值控制动画
    }
  }
}
</script>

<style lang="less" scoped>
  nav {
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom: 0;
    background: white;
    z-index: 99;
  }
  nav > a {
    display: block;
    width: 25%;
    height: 4rem;
    padding-top: 1rem;
    float: left;
    color: black;
    text-decoration: none;
    text-align: center;
    font-size: 1.2rem;
    position: relative;
  }
  nav > a:nth-child(3) var{
    position: absolute;
    right: 0.8rem;
    top: 0.5rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    background-color: #f40;
    transform: scale(1);
    transition: all 0.3s cubic-bezier(0.28, -0.42, 0.37, 1.55)
  }
  nav > a:nth-child(3) var.active {
    transform: scale(1.5);
  }
  nav > a > span {
    display: block;
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
    background-size: auto 2rem;
    background-repeat: no-repeat;
    background-position: center center;
  }
  nav > a.home > span {
    background-image: url('./images/home.png')
  }
  nav > a.category > span {
    background-image: url('./images/current.png')
  }
  nav > a.cart > span {
    background-image: url('./images/cart.png')
  }
  nav > a.mine > span {
    background-image: url('./images/mine.png')
  }
  nav>a.home.router-link-exact-active>span{
  background-image: url("./images/home-active.png");
  }
  nav>a.category.router-link-exact-active>span{
    background-image: url("./images/current-active.png");
  }
  nav>a.cart.router-link-exact-active>span{
    background-image: url("./images/cart-active.png");
  }
  nav>a.mine.router-link-exact-active>span{
    background-image: url("./images/mine-active.png");
  }
  @keyframes navs{
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
  }
  nav>a.router-link-exact-active>span{
  -webkit-animation: navs 1s;
  animation: navs 1s;
  }
@-webkit-keyframes navs {
  0%{
    -webkit-background-size: auto .6rem;
    background-size: auto .6rem;
  }
  20%{
    -webkit-background-size: auto 2.2rem;
    background-size: auto 2.2rem;
  }
  40%{
    -webkit-background-size: auto 1.8rem;
    background-size: auto 1.8rem;
  }
  60%{
    -webkit-background-size: auto 2.06rem;
    background-size: auto 2.06rem;
  }
  80%{
    -webkit-background-size: auto 1.94rem;
    background-size: auto 1.94rem;
  }
  100%{
    -webkit-background-size: auto 2rem;
    background-size: auto 2rem;
  }
  }
  nav>a.router-link-exact-active>span{
  -webkit-animation: navs 1s;
  animation: navs 1s;
  }
</style>
