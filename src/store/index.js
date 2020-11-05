import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // 准备state数据
  state: {
    // 这里的初始值, 也不能为空, 需要从本地的localStorage中拿
    tokenInfo: getToken()
  },
  mutations: {
    // 设置tokenInfo这个对象, 对象中有token信息
    setTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      // 一更新token, 就往本地存一份, 本地就可以实时的同步到vuex的数据
      setToken(tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})
