import http from 'axios'
import api from '../api'
export default {
  bannar ({commit}) {
    let url = api.host + 'bannar' // 请求首页数据
    http.get(url)
      .then(res => {
        commit('BANNAR', res.data)
      })
  },
  classifys ({commit}) { // 请求所有商品数据
    let url = api.host + 'classifys'
    http.get(url)
      .then(res => {
        commit('CLASSIFYS', res.data)
      })
  },
  citys ({commit}) { // 城市列表
    let url = api.host + 'citys'
    http.get(url)
      .then(res => {
        commit('CITYS', res.data)
      })
  },
  login ({commit}, phone) {
    let url = api.host + 'users?phone=' + phone // 根据手机号
    return http.get(url)
      .then(res => {
        if (res.data.length > 0) { // 判断用户是否存在
          // 已有 登录
          let data = res.data[0] // 数组的形式
          commit('SAVA_USERINFO', data) // 用户信息保存到vuex中
          let sitesApi = api.host + 'users/' + data.id + '/sites' // 拼接url 获取下级资源(关系图谱)
          http.get(sitesApi) // 获取服务器中的地址列表
            .then(res => {
              commit('SAVESITE', res.data) // 地址列表保存在vuex中
            })
            // 获取用户购物车信息
          let cartsApi = api.host + 'users/' + data.id + '/carts'
          http.get(cartsApi)
            .then(res => {
              commit('SAVACARTS', res.data)
              // 原始商品数据信息保存在vuex中
              commit('RESETCARTS', res.data)
            })
          return '登录成功'
        } else {
          // 没有 注册
          let url = api.host + 'users'
          let usersObj = { // 创建用户信息
            phone: phone,
            level: 'V0',
            current_score: 0,
            dif_score: '距下一等级还需 30 成长值',
            selectedSite: {}
          }
          return http.post(url, usersObj)// 用户信息存储到服务器上
            .then(res => {
              commit('SAVA_USERINFO', res.data) // 请求到用户数据存在vuex中
              return '注册成功'
            })
        }
      })
  },
  bindChange ({commit}, city) { // 城市信息
    commit('BINDCHANGE', city)
  },
  changeSite ({commit}, name) { // 更改用户当前地址
    commit('CHANGESITE', name)
  },
  savesetobj (store, setObj) {
    let url = api.host + 'sites' // 拼接url '地址列表'
    return http.post(url, setObj) // 保存到数据库里
      .then(res => {
        store.commit('SAVESETOBJ', res.data) // 保存到vuex中
        let saveSelectedApi = api.host + 'users/' + store.state.userInfo.id // 拼接url '当前用户'
        http.get(saveSelectedApi) // 请求数据
          .then(re => {
            if (re.data.id > 0) { // 判断是否获取到了数据
              re.data.selectedSite = setObj // 将选择好的地址改成用户当前的地址
            }
            http.put(saveSelectedApi, re.data) // 更改服务器中用户的当前地址
          })
        store.commit('SAVESELECTEDSITE', res.data) // 更改vuex中用户的当前地址
        return '保存成功'
      })
  },
  changeselectedSite (store, item) {
    let url = api.host + 'users/' + store.state.userInfo.id // 拼接url '当前用户'
    return http.get(url) // 请求数据
      .then(res => {
        res.data.selectedSite = item // 更改文件
        http.put(url, res.data)
      })
      .then(re => {
        store.commit('CHANGESELECTEDSITE', item) // 更改vuex中的文件
        return '更改地址成功' // 更改成功返回成功字样
      })
  },
  add (store, item) { // 添加商品
    let addBol = true
    let carts = store.state.carts // 获取购物车信息
    for (let i = 0; i < carts.length; i++) { // 循环比对
      if (carts[i].product_id === item.product_id) {
        // 不能直接使用else 循环结束才能知道有没有商品
        addBol = false
        let changeCartsApi = api.host + 'carts/' + carts[i].id
        http.get(changeCartsApi)
          .then(res => {
            let cartsObj = res.data
            cartsObj.num++
            return http.put(changeCartsApi, cartsObj) // 更改数据
          })
          .then(res => {
            store.commit('CHANGECARTS', res.data)
          })
        break
      }
    }
    if (addBol) {
      item.num++
      let cartsApi = api.host + 'carts'
      return http.post(cartsApi, item)
        .then(res => {
          store.commit('ADD', res.data)
          store.commit('ADDLOCALCARTS', item)
        })
    }
  },
  cartisactive ({commit}) {
    commit('CARTISACTIVETUE')
    setTimeout(() => {
      commit('CARTISACTIVEFALSE')
    }, 300)
  },
  sub (store, item) {
    let carts = store.state.carts // 申明变量 存储购物车数据
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product_id === item.product_id) {
        let changeCartsApi = api.host + 'carts/' + carts[i].id // 如果存在 拼接url获取到当前的商品数据
        http.get(changeCartsApi) // 请求数据
          .then(res => {
            let cartsObj = res.data // 获得数据赋值变量
            cartsObj.num-- // 数量-1
            if (cartsObj.num > 0) {
              return http.put(changeCartsApi, cartsObj)
                .then(res => {
                  store.commit('SUBCARTS', res.data)
                })
            } else {
              return http.delete(changeCartsApi, cartsObj)
                .then(res => {
                  store.commit('DELCART', item)
                  store.commit('SUBLOCALCARTS', item)
                })
            }
          })
      }
    }
  },
  changecartbol ({commit}, item) {
    let changecartbolApi = api.host + 'carts/' + item.id
    http.get(changecartbolApi)
      .then(res => {
        http.put(changecartbolApi, item)
        commit('CHANGECARTBOL', item)
      })
  }
}
