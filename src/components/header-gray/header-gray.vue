<template>
  <div class="header-gray">
    <div class="main">
      <span v-if="back=='true'" class="header-left" @click="goBack()"></span>
      <div class="header-title">{{HeaderTitle}}
        <slot></slot><!--内容分发-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['HeaderTitle', 'back'], // 组件之间传值
  methods: {
    goBack () {
      if (this.$route.path === '/login') { // 从login页面退出 跳转到首页
        this.$router.push('/')
      } else if (this.$route.path === '/Site') { // 路由名字大写 原因?
        this.$router.push('/cart')
      } else {
        this.$router.go(-1) // 以上都不是 回退一页
      }
    }
  }
}
</script>

<style lang="less">
  .header-gray .main {
    width: 100%;
    height: 4.5rem;
    position: absolute;
    background: #f9fafd;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .header-gray .main .header-left {
    display: block;
    position: absolute;
    top: 0;
    left: 0.6rem;
    width: 6rem;
    height: 4.4rem;
    background: url('./images/header-icon.png') no-repeat left;
    background-size: auto 2.5rem;
  }
  .header-gray .main .header-title {
    position: absolute;
    left: 6rem;
    right: 6rem;
  }
</style>
