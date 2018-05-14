<template>
  <div class="site">
    <header-gray header-title="选择地址" back='true'></header-gray>
    <div class="main">
      <div class="empty-notice" v-if="!(sites.length > 0)">
        <div class="notice-icon"></div>
        您还没地址哦~
      </div>
      <ul class="addr-list block">
        <li class="addr-item spline-bottom" v-for="(item, index) in sites" :key="index">
          <div class="addr-desc" :class="{active: (index +1) === selectedSite.id}" @click="changeselectedSite(item)">
            <p class="no-wrap">{{item.city}}&nbsp;{{item.phone}}</p>
            <p class="no-wrap theme-font-gray">{{item.site}}</p>
          </div>
          <div class="addr-edit"></div>
        </li>
      </ul>
      <div class="pub-footer">
        <div class="theme-btn-big" @click="addSite()">新增地址</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderGray from '../../components/header-gray/header-gray.vue'
export default {
  computed: {
    sites () {
      return this.$store.state.sites
    },
    selectedSite () {
      return this.$store.state.userInfo.selectedSite
    }
  },
  components: {
    HeaderGray
  },
  methods: {
    addSite () {
      this.$router.push('/addSite')
    },
    changeselectedSite (item) {
      this.$store.dispatch('changeselectedSite', item) // 更改地址
        .then(res => {
          this.$msg('提示', res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .main {
    position: absolute;
    top: 4.5rem;
    left: 0;
    right: 0;
    bottom: 4.9rem;
    background: #efefef;
    overflow-y: scroll;
  }
  .main .empty-notice {
    padding-top: 20%;
    text-align: center;
    line-height: 4rem;
    font-size: 1.4rem;
  }
  .main .empty-notice .notice-icon {
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
    border-radius: 4rem;
    background: url('./images/empty_addrlist.png') no-repeat center center;
    background-size: contain;
  }
  .main .pub-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5rem;
    line-height: 5rem;
    background: #fff;
  }
  .main .pub-footer .theme-btn-big {
    margin: 0.7rem 20%;
    height: 3.7rem;
    line-height: 3.7rem;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 0.5rem;
    color: #000;
    background: #ffd600;
  }
  .main .pub-footer .theme-btn-big::before {
    content: '+'
  }
  .addr-list{
  background: #fff;
  font-size: 1.4rem;
  margin: 1rem 0;
}
.addr-item{
  height: 8rem;
  position: relative;
}
.addr-desc{
  position: absolute;
  left: 0;
  top: .5rem;
  right: 8rem;
  bottom: .5rem;
  line-height: 2.8rem;
  padding-top: .7rem;
  padding-left: 1rem;
  border-left: 0.5rem solid transparent;
}
.addr-desc.active{
  border-left: 0.5rem solid #ffd600;
}
.addr-edit{
  position: absolute;
  width: 8rem;
  height: 5.2rem;
  top: 1.5rem;
  right: 0;
  background: url("./images/addr-edit.png") center center no-repeat;
  -webkit-background-size: 2.2rem;
  background-size: 2.2rem;
  border-left: 1px solid #e0e0e0;
}
.no-wrap {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.theme-font-gray {
  color: #999;
}
</style>
