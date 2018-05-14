import vue from 'vue'
import vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'

vue.use(vuex)

export default new vuex.Store({
  actions,
  mutations,
  state,
  getters
})
