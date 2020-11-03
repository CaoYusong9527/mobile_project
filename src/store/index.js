import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenInfo: JSON.parse(localStorage.getItem('tokenInfo')) || {}
    tokenInfo: getToken()
  },
  mutations: {
    setTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      // localStorage.setItem('tokenInfo', JSON.stringify(tokenObj))
      setToken(tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})

// getter 必须要有返回值,由state派生出来的一些属性==>基于state动态并计算出来的属性
// 有点类似于计算属性
