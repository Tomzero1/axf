export default {
  BANNAR (state, data) {
    state.bannar = data
  },
  CLASSIFYS (state, data) {
    state.classifys = data
  },
  CITYS (state, data) {
    state.citys = data
  },
  SAVA_USERINFO (state, data) {
    state.userInfo = data
  },
  BINDCHANGE (state, data) {
    state.city = data
  },
  CHANGESITE (state, data) {
    state.selectSite = data
  },
  CHANGELOCTION (state, data) {
    state.location = data
  },
  SAVESETOBJ (state, data) {
    state.sites.push(data)
  },
  SAVESITE (state, data) {
    state.sites = data
  },
  SAVESELECTEDSITE (state, data) {
    state.userInfo.selectedSite = data
  },
  CHANGESELECTEDSITE (state, data) {
    state.userInfo.selectedSite = data
  },
  SAVACARTS (state, data) {
    state.carts = data
  },
  ADD (state, data) {
    state.carts.push(data)
  },
  ADDLOCALCARTS (state, data) {
    state.localCarts.push(data)
  },
  CHANGECARTS (state, data) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === data.id) {
        state.carts[i].num++
        break // 找到就停止
      }
    }
    for (let i = 0; i < state.localCarts.length; i++) {
      if (data.product_id === state.localCarts[i].product_id) {
        state.localCarts[i].num++
        break
      }
    }
  },
  SUBCARTS (state, data) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].id === data.id) {
        state.carts[i].num--
        break // 找到就停止
      }
    }
    for (let i = 0; i < state.localCarts.length; i++) {
      if (data.product_id === state.localCarts[i].product_id) {
        state.localCarts[i].num--
        break
      }
    }
  },
  DELCART (state, data) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].product_id === data.product_id) {
        state.carts.splice(i, 1)
      }
    }
  },
  SUBLOCALCARTS (state, data) {
    for (let i = 0; i < state.localCarts.length; i++) {
      if (state.localCarts[i].product_id === data.product_id) {
        state.localCarts[i].num = 0
      }
    }
  },
  RESETCARTS (state, data) {
    let classifys = state.classifys
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < classifys.length; j++) {
        for (let z = 0; z < classifys[j].products.length; z++) {
          if (data[i].product_id === classifys[j].products[z].product_id) {
            classifys[j].products[z].num = data[i].num
            state.localCarts.push(classifys[j].products[z])
            break
          }
        }
      }
    }
  },
  CHANGECARTBOL (state, data) {
    let index = state.carts.indexOf(data)
    state.carts[index].Bol = state.carts[index].Bol
  },
  CARTISACTIVETUE (state) {
    state.isActive = true
  },
  CARTISACTIVEFALSE (state) {
    state.isActive = false
  }
}
