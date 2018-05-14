<template>
  <div class="add-Site">
    <header-gray header-title="添加地址" back='true'></header-gray>
    <span class="extend-click" @click="save()">保存</span>
    <div class="main">
      <div class="whitebg">
        <table class="addr-edit">
          <tbody>
            <tr class="spline-top">
              <th>联系人</th>
              <td>
                <input type="text" v-model="linkman" placeholder="收货人姓名">
              </td>
            </tr>
            <tr class="spline-top">
              <th>&nbsp;</th>
              <td>
                <span class="theme-radio" :class="{checked: sex==0}" @click="sex=0">先生</span>
                <span class="theme-radio" :class="{checked: sex==1}" @click="sex=1">女士</span>
              </td>
            </tr>
            <tr class="spline-top">
              <th>手机号码</th>
              <td>
                <input type="text" placeholder="鲜蜂侠联系你的电话" v-model="phone">
              </td>
            </tr>
            <tr class="spline-top">
              <th>所在城市</th>
              <td class="more">
                <select name="" id="" class="select-city"  @change="changeCity" v-model="city">
                  <option value="">请选择城市</option>
                  <option :value="item" v-for="(item) in addcitys" :key="item.id" >{{item}}</option>
                </select>
              </td>
            </tr>
            <tr class="spline-top">
              <th>所在地区</th>
              <td>
                <input type="text" @click.prevent="selectSite()" class="more" placeholder="请选择您的住宅小区、大厦或学校" :value="site">
              </td>
            </tr>
            <tr class="spline-top">
              <th>详细地址</th>
              <td>
                <input type="text" placeholder="请输入楼号门牌号等详细信息" v-model="detailSite">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderGray from '../../components/header-gray/header-gray.vue'
export default {
  data () {
    return {
      // 所选城市列表
      citys: [],
      // 所选城市,默认为0
      city: '',
      // 所选地址
      site: '',
      // 所选性别
      sex: 0,
      // 联系人
      linkman: '',
      // 手机号码
      phone: '',
      // 详细地址
      detailSite: ''
    }
  },
  created () {
    this.$store.dispatch('citys') // 获取城市信息
    this.city = this.$store.state.city // 读取选择的城市
    this.site = this.$store.state.selectSite // 读取选择的地址
  },
  computed: {
    addcitys () {
      return this.$store.state.citys // 获取到所有城市
    }
  },
  methods: {
    selectSite () {
      if (this.city !== '') { // 是否已选择城市
        this.$router.push('/Selectsite')
      } else {
        this.$msg('提示', '请选择城市') // 提示
      }
    },
    changeCity () {
      this.$store.dispatch('bindChange', this.city)
    },
    save () { // 点击保存 验证信息是否合格
      let userInfo = this.$store.state.userInfo // 获取用户信息
      let location = this.$store.state.location // 获取地理位置信息
      if (userInfo.id && this.city !== '' && this.site !== '' && this.sex !== '' && this.linkman !== '' && location.lng !== '') {
        if (/^1[34578]\d{9}$/.test(this.phone)) { // 验证手机
          let setObj = {
            userId: userInfo.id,
            city: this.city,
            site: this.site,
            sex: this.sex,
            linkman: this.linkman,
            phone: this.phone,
            detailSite: this.detailSite,
            location: location
          }
          this.$store.dispatch('savesetobj', setObj)
            .then(res => {
              return this.$msg('提示', res) // 同步 点击才执行下一步
            })
            .then(res => {
              this.$router.push('/Site') // 验证成功 返回地址页
            })
        }
      } else {
        this.$msg('提示', '输入有误') // 提示错误
      }
    }
  },
  components: {
    HeaderGray
  }
}
</script>

<style lang="less" scoped>
  .extend-click {
    position: absolute;
    top: 0;
    right: 0.6rem;
    text-align: center;
    width: 6rem;
    height: 4.4rem;
    line-height: 4.4rem;
    font-size: 1.4rem;
    z-index: 2;
  }
  .main {
    position: absolute;
    top: 4.5rem;
    bottom: 0;
    font-size: 1.4rem;
    left: 0;
    right: 0;
    background: #efefef;
    overflow-y: scroll;
  }
  .main .whitebg {
    background: #ffffff;
  }
  .main .whitebg .addr-edit {
    border-collapse: collapse;
    border-spacing: 0;
    vertical-align: middle;
    width: 100%;
  }
  .spline-top {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }
  .addr-edit th {
    padding: 1rem 0 1rem 1.5rem;
    text-align: left;
    width: 7rem;
    line-height: 2rem;
    font-weight: 400;
    // vertical-align: middle;
  }
  .select-city {
    width: 90%;
  }
  .addr-edit td input {
    width: 90%;
    border: 0;
    outline: none;
  }
  .theme-radio {
    padding-right: 1rem;
  }
  input {
    font-size: 1.4rem;
  }
  // .checked {
  //   background: url("")
  // }
  .theme-radio::before {
    content: "";
    display: inline-block;
    border: 1px solid #bdbdbd;
    padding: 0.6rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    border-radius: 50%;
    padding-right: 0.5rem;
    background: #ffffff center center no-repeat;
  }
  .checked::before{
  background-image: url("./images/checked.png");
  background-size: 0.9rem;
  background-color: #ffd600;
  border: #ffd600;
}
</style>
