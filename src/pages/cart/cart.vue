<template>
  <div class="cart">
    <header-gray header-title="购物车" back='false'></header-gray>
    <div class="main">
      <table class="receive" width="100%">
        <tr>
          <th width="28%">
            <!-- 两个英文字符等于一个中文字的宽度 -->
            收<span class="text-hidden">a</span>货<span class="text-hidden">a</span>人
          </th>
          <td>{{userInfo.selectedSite.linkman}}&nbsp;{{userInfo.selectedSite.sex?"女士":"先生"}}</td>
          <td width="17%" rowspan="3" class="more extend-click" @click="addSict()">修改</td>
        </tr>
        <tr>
          <th>
            电<span class="text-hidden">中</span><span class="text-hidden">中</span>话
          </th>
          <td>{{userInfo.selectedSite.phone}}</td>
        </tr>
        <tr>
          <th>收货地址</th>
          <td>{{userInfo.selectedSite.site}}</td>
        </tr>
      </table>
      <div class="cart-groups-wraper">
        <div class="cart-group">
          <div class="group-name">
            <span style="color:#999;">
              闪送超市
            </span>
            <var>凑单专区</var>
          </div>
          <p class="group-proptext">¥0起送，22:00前满¥30免运费，22:00后满¥50免运费</p>
          <p class="group-receive more spline-top">收货时间&nbsp;&nbsp;
            <select class="group-receive-select">
              <optgroup label="今天">
                <option value="30分钟送达">30分钟送达</option>
                <option value="15:00-16:00">15:00-16:00</option>
                <option value="16:00-17:00">16:00-17:00</option>
                <option value="17:00-18:00">17:00-18:00</option>
                <option value="18:00-19:00">18:00-19:00</option>
              </optgroup>
              <optgroup label="明天">
                <option value="明天 09:00-10:00">明天 09:00-10:00</option>
                <option value="明天 10:00-11:00">明天 10:00-11:00</option>
                <option value="明天 11:00-12:00">明天 11:00-12:00</option>
                <option value="明天 12:00-13:00">明天 12:00-13:00</option>
              </optgroup>
              <optgroup label="后天">
                <option value="后天 09:00-10:00">后天 09:00-10:00</option>
                <option value="后天 10:00-11:00">后天 10:00-11:00</option>
                <option value="后天 11:00-12:00">后天 11:00-12:00</option>
                <option value="后天 12:00-13:00">明天 12:00-13:00</option>
              </optgroup>
            </select>
            <span class="group-receive-ext">可预订</span>
          </p>
          <div class="group-comment">
            <span>收货备注&nbsp;</span>
            <div class="group-comment-input-wrap">
              <input type="text" placeholder="可输入100字以内特殊要求内容" maxlength="100">
            </div>
          </div>
        </div>
        <div class="warp-footer">
          <table width="100%" class="table">
            <tr class="spline-bottom" v-for="item in carts" :key="item.id">
              <td class="group-item-checkbox" :class="{active:item.Bol}" @click="isBol(item)"></td>
              <td class="group-item-img">
                <img v-lazy="item.imgs.small">
              </td>
              <td class="group-item-detail">
                <p>&nbsp;{{item.title}}</p>
                <div class="product-specifics-wrap">
                  <div class="product-specifics">
                    <span>￥{{item.price}}</span>
                  </div>
                  <div class="product-operates">
                    <span class="inner" @click.stop="add(item)">+</span>
                    <span class="product-operates-item">{{item.num}}</span>
                    <span class="inner" @click.stop="sub(item)">-</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <div class="group-foooter">
            <span class="selectAll" :class="{active:this.isChooseBol}" @click="ChooseBol()
">全选</span>
            共:&nbsp;&nbsp;<span class="redfont">￥{{money.toFixed(1)}}</span>
            <span class="group-btn">选好了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderGray from '../../components/header-gray/header-gray.vue'
export default {
  components: {
    HeaderGray
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo // 获取到用户信息
    },
    carts () {
      return this.$store.state.carts // 获取到用户购物车信息
    },
    money () {
      return this.$store.getters.money // 获取到商品总价
    }
  },
  data () {
    return {
      isChooseBol: true,
      num: 0
    }
  },
  created () {
    if (!this.userInfo.id) { // 进入判断是否有用户 没有跳转登录注册页
      this.$router.push('/login')
    }
    if (this.isChooseBol) {
      this.num = this.carts.length // 全选
    } else {
      let num = 0
      let checkAll = false
      for (let i = 0; i < this.carts.length; i++) { // 记录多少个商品是选择状态
        if (this.carts[i].Bol) { // 所有商品都是选择状态 全选按钮亮 否则不亮
          num++
        } else {
          checkAll = true
        }
      }
      this.num = num
      if (checkAll) {
        this.isChooseBol = false
      }
    }
  },
  methods: {
    addSict () {
      this.$router.push('/site') // 跳转地址页
    },
    isBol (item) { // 商品选中状态 true或false
      item.Bol = !item.Bol
      if (item.Bol) {
        this.num++
      } else {
        this.num--
      }
      if (this.num === this.carts.length) { // 判断所有商品是否选中
        this.isChooseBol = true
      } else {
        this.isChooseBol = false
      }
      this.$store.dispatch('changecartbol', item)
    },
    ChooseBol () {
      this.isChooseBol = !this.isChooseBol // 点击全选 .... 未完成 嘤嘤嘤
      if (this.isChooseBol) {
        for (let i = 0; i < this.carts.length; i++) {
          this.carts[i].Bol = true
        }
        this.num = this.carts.length
      } else {
        for (let i = 0; i < this.carts.length; i++) {
          this.carts[i].Bol = false
        }
        this.num = 0
      }
    },
    add (item) {
      if (this.userInfo.id) { // 用户登录状态
        item.Bol = true // 给商品添加选中状态
        this.$store.dispatch('add', item)
      } else {
        this.$msg('提示', '未登录') // 没有用户 提示 未登录
          .then(res => {
            this.$router.push('/login') // 跳转页面
          })
      }
    },
    sub (item) {
      if (this.userInfo.id) {
        if (item.num > 0) {
          this.$store.dispatch('sub', item)
        } else {
          return false // 商品数量为零
        }
      } else {
        this.$msg('提示', '未登录')
          .then(res => {
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
}
.main {
    position: absolute;
    background: #efefef;
    top: 4.5rem;
    right: 0;
    bottom: 4.9rem;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .receive{
  font-size: 1.4rem;
  font-weight: 400;
  background-image: url("./images/cart-bg.png"),url("./images/cart-bg.png");
  background-position: left top,left bottom;
  background-repeat: repeat-x;
  -webkit-background-size: auto 0.3rem;
  background-size: auto 0.3rem;
  background-color: #fff;
  margin-bottom: 1rem;
}
.receive th{
  padding: .7rem 1rem .7rem 1.5rem;
  text-align: left;
}
.extend-click {
  position: relative;
  vertical-align: middle;
}
.text-hidden {
  visibility: hidden;
}
.main .cart-group {
  padding-top: 0.5rem;
  font-size: 1.2rem;
  background: #fff;
}
.main .cart-group .group-name {
  padding-left: 1.4rem;
  padding-right: 1.2rem;
  overflow: hidden;
}
.group-name span {
  float: left;
}
.group-name span::before {
  content: "";
  display:inline-block;
  width: 0.4rem;
  height: 1.2rem;
  background: #ffd600;
  border-radius: 0.2rem;
  margin-right: 0.2rem;
  vertical-align: -0.2rem;
}
.cart-group .group-name var {
  width: 7rem;
  height: 2.4rem;
  line-height: 2.4rem;
  border: 0.1rem solid #ff3800;
  border-radius: 1.2rem;
  text-align: center;
  color: #e64f1a;
  float: right;
}
.cart-group .group-proptext {
  padding-left: 1.4rem;
  padding-right: 1.2rem;
  height: 2rem;
  line-height: 2rem;
  color: #999;
}
.group-receive {
  padding-left: 1.4rem;
  height: 5rem;
  line-height: 5rem;
  font-size: 1.4rem;
  border-top: 1px solid #e0e0e0;
}
.main .cart-group .group-receive-select {
  color: #e64f1a;
  outline: none;
  border: none;
  font-size: 1.4rem;
  background: transparent;
}
.group-receive span {
  float: right;
}
.group-comment {
  height: 5rem;
  line-height: 5rem;
  font-size: 1.2rem;
  display: flex;
  padding-left: 1.4rem;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  background: transparent;
}
.group-comment span {
  float: left;
}
.group-comment .group-comment-input-wrap {
  padding-right: 2.2rem;
  flex: 1;
}
.group-comment .group-comment-input-wrap input {
  width: 100%;
  height: 3.2rem;
  border: 1px solid #cecece;
  border-radius: 0.5rem;
  outline: none;
  text-indent: 0.5rem;
  font-size: 1.4rem;
}
.warp-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 24.5rem;
}
.table {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 5.1rem;
  background: #ffffff;
  overflow-y: scroll;
}
.spline-bottom {
  border-bottom: 1px solid #e0e0e0;
  // vertical-align: middle;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.spline-bottom .group-item-checkbox {
  width: 5rem;
  background: url("images/checkbox.png") center center no-repeat;
  background-size: 1.8rem 1.8rem;
  vertical-align: middle;
}
.spline-bottom .group-item-checkbox.active {
  background: url("images/checkbox-selectd.png") center center no-repeat;
  background-size: 1.8rem 1.8rem;
}
.spline-bottom .group-item-img {
  width: 5rem;
  position: relative;
}
.spline-bottom .group-item-img img {
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -2.5rem;
}
.spline-bottom .group-item-detail {
  padding-right: 1.2rem;
  flex: 1;
  vertical-align: middle;
}
.spline-bottom .group-item-detail p {
  height: 4rem;
  font-size: 1.2rem;
  line-height: 4rem;
}
.spline-bottom .group-item-detail .product-specifics-wrap {
  height: 4rem;
  font-size: 1.2rem;
  line-height: 4rem;
}
.product-specifics {
  float: left;
  width: 30%;
  overflow: hidden;
}
.product-specifics>span {
  display: block;
  color: #858585;
}
.product-operates {
  float: right;
  width: 70%;
  text-align: right;
  height: 100%;
}
.product-operates .inner {
  display: inline-block;
  width: 2.9rem;
  height: 2.9rem;
  font-size: 2.4rem;
  line-height: 2.9rem;
  color: #d73e00;
  border: 1px solid #dcbd9e;
  text-align: center;
  border-radius: 50%;
}
.product-operates>.product-operates-item {
  display: inline-block;
  height: 2.8rem;
  line-height: 2.8rem;
  vertical-align: middle;
  font-size: 1.2rem;
  margin: 0 0.5rem;
}
.group-foooter {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 5rem;
  height: 5rem;
  padding-left: 1.4rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  line-height: 5rem;
}
.selectAll {
  display: inline-block;
  padding-left: 2.5rem;
  width: 5rem;
  background: url("images/checkbox.png") left center no-repeat;
  background-size: 1.8rem 1.8rem;
  height: 100%;
  font-size: 1.2rem;
}
.selectAll.active {
   background: url("images/checkbox-selectd.png") left center no-repeat;
  background-size: 1.8rem 1.8rem;
}
.redfont {
  color: #d73e00;
  font-size: 1.2rem;
}
.group-btn {
  width: 10rem;
  height: 100%;
  text-align: center;
  float: right;
  background: #ffd600;
  font-size: 1.4rem;
}
</style>
