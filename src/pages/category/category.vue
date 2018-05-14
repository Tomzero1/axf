<template>
  <div>
    <header-yellow></header-yellow>
    <div class="main">
      <div class="category">
        <ul class="categories">
          <li v-for="item in classifys" :key="item.classify_id" @click="changeClassifys(item.classify_id)">
            <span :class="{'active': activeClassifysId === item.classify_id}">{{item.classify_title}}</span>
          </li>
        </ul>
        <div class="productList" @click="hideProductList()">
          <div class="product-filter">
            <div @click.stop="changeAllCategories()">
              <span>全部分类</span>
            </div>
            <div @click.stop="changeRanking()">
              <span>综合排序</span>
            </div>
          </div>
          <div class="filter-items" v-show="allCategories" :class="{'active':allCategories}">
            <ul>
              <!--全部分类-->
              <li :class="{'active':allCategoriesIndex === 'all'}" @click="changeCids('all')">全部分类</li>
              <li v-for="(item, index) in activeClassifysProduct.cids" :key="item.name" @click="changeCids(index)" :class="{'active': allCategoriesIndex === index}">{{item.name}}</li>
            </ul>
          </div>
          <div class="filter-items" v-show="ranking" :class="{'active': ranking}">
              <ul>
                <!--综合排序-->
                <li v-for="(item, index) in rankingList" :key="item" @click="changeRankingIndex(index)" :class="{'active': activeRankingIndex === index}">{{item}}</li>
              </ul>
          </div>
          <ul class="productList-wrap">
            <router-link tag="li" v-for="(item, index) in filterClassifysProduct" :to="'/details/'+item.product_id" :key="item.product_id" >
              <div>
                <img v-lazy="item.imgs.small">
              </div>
              <ul>
                <li>{{item.title}}</li>
                <li>
                  <div class="product-specifics">
                    <span>{{item.unit}}ml</span>
                    <span>￥{{item.price}}</span>
                  </div>
                  <div class="product-operates">
                    <span class="inner" @click.stop="add(item, index)">+</span>
                    <span class="product-operates-item">{{item.num}}</span>
                    <span class="inner" @click.stop="sub(item, index)">-</span>
                  </div>
                </li>
              </ul>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderYellow from '../../components/header-yellow/header-yellow.vue'
// 排序方法
function orderBy (arr, type, bol) {
  if (bol === undefined) {
    bol = false
  }
  function sortNumber (a, b) {
    if (bol) {
      if (type) {
        return a[type] - b[type]
      } else {
        return a - b
      }
    } else {
      if (type) {
        return b[type] - a[type]
      } else {
        return b - a
      }
    }
  }
  return arr.sort(sortNumber)
}
export default {
  components: {
    HeaderYellow
  },
  computed: {
    classifys () {
      return this.$store.state.classifys // 获取原始商品列表
    },
    // 获取激活的列表
    activeClassifysProduct () {
      for (let i = 0; i < this.classifys.length; i++) {
        if (this.classifys[i].classify_id === this.activeClassifysId) {
          return this.classifys[i]
        }
      }
      return {}
    },
    // 激活的分类列表
    filterClassifysProduct () {
      let products = this.activeClassifysProduct.products
      if (this.allCategoriesIndex !== 'all') {
        products = products.filter(item =>
          item.cids === this.allCategoriesIndex
        )
      }
      switch (this.activeRankingIndex) {
        case 1:
          products = orderBy(products, 'price', true)
          break
        case 2:
          products = orderBy(products, 'price', false)
          break
      }
      return products
    },
    userInfo () {
      return this.$store.state.userInfo // 获取用户
    }
  },
  data () {
    return {
      // 激活的分类ID
      activeClassifysId: 1,
      // 全部分类显示隐藏
      allCategories: false,
      // 综合排序显示隐藏
      ranking: false,
      // 默认排序方式
      rankingList: ['综合排序', '价格最低', '价格最高'],
      // 激活的排序方式
      activeRankingIndex: 0,
      // 激活的分类下标
      allCategoriesIndex: 'all'
    }
  },
  methods: {
    // 获取激活的分类下标
    changeClassifys (id) {
      this.activeClassifysId = id
      this.allCategoriesIndex = 'all'
      this.activeRankingIndex = 0
      this.allCategories = false
      this.ranking = false
    },
    // 全部分类显示隐藏
    changeAllCategories () {
      this.allCategories = !this.allCategories
      this.ranking = false
    },
    // 综合排序显示隐藏
    changeRanking () {
      this.ranking = !this.ranking
      this.allCategories = false
    },
    // 切换子分类
    changeCids (index) {
      this.allCategoriesIndex = index
      this.allCategories = false
    },
    // 综合排序分类
    changeRankingIndex (index) {
      this.activeRankingIndex = index
      this.ranking = false
    },
    // 隐藏蒙版
    hideProductList () {
      this.ranking = false
      this.allCategories = false
    },
    add (item, index) { // 添加商品
      if (this.userInfo.id) { // 用户状态
        item.Bol = true // 设置选择状态
        this.$store.dispatch('add', item)
        this.$store.dispatch('cartisactive')
      } else {
        this.$msg('提示', '未登录')
          .then(res => {
            this.$router.push('/login')
          })
      }
    },
    sub (item, index) {
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
  .main {
    position: absolute;
    top: 4.5rem;
    right: 0;
    bottom: 4.9rem;
    left: 0;
    background: #efefef;
    overflow-y: scroll;
  }
  .main > .category {
    overflow: hidden;
    position: relative;
    height:100%;
  }
  .main > .category > .categories {
    float: left;
    width: 23.4375%;
    font-size: 1.3rem;
  }
  .main > .category > .categories > li {
    padding: 0.3rem 0;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 0.1rem solid #d9d9d9;
  }
  .main > .category > .categories > li > span {
    display: block;
    height: 3.4rem;
    line-height: 3.4rem;
  }
  .main > .category > .categories > li > span.active {
    border-left: 0.6rem solid #f0d001;
  }
  .main > .category > .productList {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 76%;
  }
  .main > .category > .productList > .product-filter {
    width: 100%;
    height: 1.8rem;
    padding: 1.1rem 0;
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: 0.1rem solid #e1dbdd;
  }
  .main > .category > .productList > .filter-items {
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    z-index: 6;
  }
  .main > .category > .productList > .filter-items.active {
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  .main > .category > .productList > .filter-items > ul {
    overflow: hidden;
    padding-bottom: 1rem;
    background-color: #ffffff;
  }
  .main > .category > .productList > .filter-items > ul > li {
    padding: 0.7rem 0.9rem;
    border: 0.1rem solid #372e2e;
    border-radius: 0.4rem;
    float: left;
    margin: 0.8rem 0 0 0.8rem;
    color: black;
  }
  .main > .category > .productList > .filter-items > ul > li.active {
    border: 0.1rem solid #e6d056;
    background-color: #fff9d9;
  }
  .main > .category > .productList > .filter-items > ul::after {
    content: "";
    display: block;
    clear: both;
  }
  .main > .category > .productList > .product-filter > div {
    float: left;
    width: 50%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: 1.2rem;
  }
  .main > .category > .productList > .product-filter > div:nth-child(1) {
    border-right: 0.1rem solid #d5d5d5;
    box-sizing: border-box;
  }
  .main > .category > .productList > .productList-wrap {
    position: absolute;
    top: 4.1rem;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    background-color: #fff;
  }
  .productList-wrap > li {
    border-bottom: 0.1rem solid #e1dbdd;
    padding: 0.8rem 1rem;
  }
  .productList-wrap > li::after {
    content: "";
    display: block;
    clear: both;
  }
  .productList-wrap > li > div {
    float: left;
    width: 8rem;
    height: 8rem;
    margin-right: 1rem;
    font-size: 0;
    overflow: hidden;
  }
  .productList-wrap > li > div > img {
    width: 100%;
    height: 100%;
  }
  .productList-wrap > li > ul {
    margin-left: 8rem;
  }
  .productList-wrap > li > ul > li {
    font-size: 1.2rem;
  }
  .productList-wrap > li > ul > li:nth-child(1) {
    font-size: 1.2rem;
    margin-bottom: 2.9rem;
  }
  .productList-wrap > li > ul > li:nth-child(2) {
    text-align: left;
  }
  .productList-wrap > li > ul > li:nth-child(2) > .product-specifics {
    float: left;
    width: 30%;
    overflow: hidden;
  }
  .productList-wrap > li > ul > li:nth-child(2) > .product-specifics > span:nth-child(1) {
    display: block;
    margin-bottom: 1rem;
    color: #858585;
  }
  .productList-wrap > li > ul > li:nth-child(2) > .product-operates {
    float: right;
    margin-top: 1rem;
  }
  .productList-wrap > li > ul > li:nth-child(2) > .product-operates > .inner{
    display: inline-block;
    font-size: 2.4rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    color: #d73e00;
    text-align: center;
    border: 0.1rem solid #dcbd9e;
    border-radius: 50%;
  }
  .productList-wrap > li > ul > li:nth-child(2) > .product-operates > .product-operates-item {
    display: inline-block;
    height: 2.4rem;
    line-height: 2.4rem;
    vertical-align: top;
    margin: 0 0.2rem;
  }
</style>
