<template>
  <div class="login">
    <header-gray header-title="验证手机" back='true'></header-gray>
    <div class="main">
      <div class="login">
        <div class="pic" :class="{'pic-hide':picHide}">
          <p class="pic-word">为了方便您及时查询订单信息，鲜蜂侠需要验证您的手机号为查询帐号</p>
        </div>
        <div class="inputs">
          <input type="text" class="phone" placeholder="手机号码" @focus="picHidefocus()" @blur="picHideBlue()" v-model="phone">
        </div>
        <div class="theme-bg" @click="login()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderGray from '../../components/header-gray/header-gray.vue'
let timer
export default {
  data () {
    return {
      picHide: false,
      phone: ''
    }
  },
  components: {
    HeaderGray
  },
  methods: {
    picHidefocus () { // 获取焦点
      clearTimeout(timer)
      this.picHide = true
    },
    picHideBlue () { // 失去焦点 2m执行
      timer = setTimeout(() => {
        this.picHide = false
      }, 2000)
    },
    login () {
      let phone = this.phone
      if (/^1[34578]\d{9}$/.test(phone)) { // 验证手机
        this.$store.dispatch('login', this.phone)
          .then(res => {
            return this.$msg('提示', res) // 登录或是注册信息
          })
          .then(res => {
            this.$router.push('/cart') // 成功 跳转购物车页
          })
      } else {
        this.$msg('提示', '手机号码不正确') // 失败
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .login .main {
  position: absolute;
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efefef;
}
.pic {
  height: 6.9rem;
  background: #ffd600 url('./images/pic.png') no-repeat 1rem bottom;
  background-size: auto 80%;
  position: relative;
  transition: height .4s;
  overflow: hidden;
}
.pic .pic-word {
  position: absolute;
  top: 1.7rem;
  width: 62%;
  right: 0;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: #000;
}
.inputs {
  padding: 0 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}
.inputs>.phone {
  font-size: 1.4rem;
  outline: none;
  height: 4rem;
  line-height: 4rem;
  border: 0;
  width: 100%;
}
.theme-bg {
  margin: 2rem 0.6rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  background: #ffd600;
}
.pic-hide {
  height: 0px !important;
}
</style>
