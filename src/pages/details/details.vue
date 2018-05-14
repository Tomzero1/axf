<template>
  <div>
    <header-gray header-title="商品详情" back='true'></header-gray>
    <div class="main">
      <div class="warp">
        <div class="product">
          <div class="product-img">
            <img v-lazy="classifys.imgs.big">
          </div>
            <div class="mod-pub-product" style="text-align: center
          ;">
            <div class="product-title-no-short">
              <p class="product-name">{{classifys.title}}</p>
            </div>
            <div class="product-shopping">￥{{classifys.price}}</div>
          </div>
        </div>
        <div class="product-properties">
          <div class="title">商品详情</div>
          <div class="property-item">
            <span class="leading-word">
              品
              <span class="text-hidden" style="visibility:hidden">中</span>
              牌
            </span>
            <span class="content-word">{{classifys.brand}}</span>
          </div>
          <div class="property-item">
            <span class="leading-word">产品规格</span>
            <span class="content-word">{{classifys.unit}}g</span>
          </div>
        </div>
        <div class="product-properties">
          <div class="title">图文详情</div>
          <p>{{classifys.details}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderGray from '../../components/header-gray/header-gray.vue'
export default { // 商品详情页
  created () {
    this.id = this.$route.params.id // 接收路由id route
  },
  computed: {
    classifys () {
      let classifys = this.$store.state.classifys
      for (let i = 0; i < classifys.length; i++) {
        for (let j = 0; j < classifys[i].products.length; j++) {
          if (Number(this.id) === Number(classifys[i].products[j].product_id)) { // 安全起见 转换类型在比较 this.id为String类型
            return classifys[i].products[j]
          }
        }
      }
    }
  },
  data () {
    return {
      id: 0
    }
  },
  components: {
    HeaderGray
  }
}
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  top: 4.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #efefef;
  overflow-y: scroll;
}
.warp {
  font-size: 1.4rem;
  background: #f8f8f8;
}
.product-img {
  padding: 1rem;
}
img {
  width: 100%;
}
.product-name {
  padding: 0 1rem;
  font-size: 2.3rem;
  line-height: 3rem;
  color: #292d33;
}
.product {
  background: #ffffff;
  margin-bottom: 0.5rem;
}
.product-shopping {
  padding: 1rem 0 3rem 0;
  color: #f40;
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 2.9rem;
}
.product-properties {
  padding: 1.5rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
}
.title {
  background: url("images/title_bg.png") center center no-repeat;
  background-size: auto 0.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #e0bd6a;
}
.property-item {
  line-height: 3rem;
}
.leading-word {
  display: inline-block;
  width: 4em;
  color: #848c99;
}
.content-word {
  padding-left: 1.5rem;
  color: #333;
}
.product-properties {
  color: #e53333;
  font-size: 1.4rem;
  line-height: 1.5;
}
</style>
