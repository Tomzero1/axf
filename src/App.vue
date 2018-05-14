<template>
  <div id="app">
    <TabBar v-show="TabBarShow"></TabBar>
    <router-view/>
  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar'
export default {
  name: 'App',
  created () {
    // 首页的数据
    this.$store.dispatch('bannar')
    // 加载分类数据
    this.$store.dispatch('classifys')
  },
  components: {
    TabBar
  },
  computed: {
    TabBarShow () {
      return this.$store.state.TabBarShow
    }
  }
}
</script>

<style>
  img[lazy=loading] {
    background: url('./pages/home/images/5-121204193R0-50.gif') center center no-repeat;
    background-size: 2rem 2rem;
  }
  .more {
    background: url("./pages/cart/images/cart-more.png") right center no-repeat;
    background-size: auto 1rem;
    padding-right: 2.5rem;
  }
</style>
