<template>
  <div class="home">
    <headeryellow></headeryellow>
    <div class="main">
      <div class="bannar">
        <router-link to="/">
          <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in bannar.img" :key="item">
              <img :src="item">
            </mt-swipe-item>
          </mt-swipe>
        </router-link>
      </div>
      <ul class="acts-category">
        <li class="acts-category-item" v-for="(item) in classifys" :key="item.classify_id">
          <div class="acts-category-title">
            <span>{{item.classify_title}}</span>
            <a href="">更多&gt;</a>
          </div>
          <img class="category-item-banner" :src="item.imgs.small">
          <ul class="acts-category-item-goodsList">
            <router-link tag="li" :to="'/details/'+pro.product_id" v-for="(pro,ind) in item.products" :key="pro.product_id" v-if="ind < 3">
              <img v-lazy="pro.imgs.small">
              <p class="category-name">{{pro.title}}</p>
              <div class="product-specifics">
                <div class="product-specifics-left">
                  <p>{{pro.unit}}ml</p>
                  <p>￥{{pro.price}}</p>
                </div>
                <div class="product-specifics-right">+</div>
              </div>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Headeryellow from '../../components/header-yellow/header-yellow'
export default {
  components: {
    Headeryellow
  },
  computed: {
    bannar () {
      return this.$store.state.bannar // 首页数据
    },
    classifys () {
      return this.$store.state.classifys // 首页商品数据
    }
  }
}
</script>

<style lang="less" scoped>
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
  .main > .bannar  {
    width: 100%;
    height: 16rem;
  }
  .main > .bannar > a img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .main > .acts-category {
    width: 100%;
    list-style: none;
  }
  .main > .acts-category > .acts-category-item {
    // margin: 0;
    padding: 1.4rem 0.9rem;
    background: #ffffff;
  }
  .main > .acts-category > .acts-category-item > .acts-category-title {
    overflow: hidden;
  }
  .main > .acts-category > .acts-category-item > .acts-category-title > span {
    display: block;
    float: left;
    border-left: 0.8rem solid #eb4084;
    color: #eb4084;
    text-indent: 0.6rem;
    font-size: 1.4rem;
  }
  .main > .acts-category > .acts-category-item > .acts-category-title > a {
    float: right;
    color: #a6a6a6;
    font-size: 1.3rem;
  }
  .main > .acts-category > .acts-category-item > .category-item-banner {
    width: 100%;
    margin: 0.9rem 0;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList {
    // width: 100%;
    list-style: none;
    overflow: hidden;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li {
    width: 31.33333%;
    padding: 1% 1%;
    float: left;
    text-align: center;
    font-size: 1.2rem;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li:nth-child(2n) {
    border-left: 0.1rem solid #e5e5e5;
    border-right: 0.1rem solid #e5e5e5;
    box-sizing: border-box;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > img {
    width: 7.4rem;
    height: 7.4rem;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .category-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
    text-align: center;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .product-specifics {
    overflow: hidden;
    margin-top: 2rem;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .product-specifics > .product-specifics-left {
    float: left;
    text-align: left;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .product-specifics > .product-specifics-left > p:nth-child(1) {
    color: #acacac;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .product-specifics > .product-specifics-left > p:nth-child(2) {
    color: #e44619;
  }
  .main > .acts-category > .acts-category-item > .acts-category-item-goodsList > li > .product-specifics > .product-specifics-right {
    float: right;
    width: 3rem;
    height: 3rem;
    border: 0.1rem solid #dee0dd;
    border-radius: 50%;
    font-size: 2rem;
    color: #ff3910;
    text-align: center;
    line-height: 3rem;
  }
</style>
