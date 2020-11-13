import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/storage.js'
import { reqGetChannels, reqGetAllChannels } from '@/api/channels.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // 准备state数据
  state: {
    // 这里的初始值, 也不能为空, 需要从本地的localStorage中拿
    tokenInfo: getToken(),
    channels: [],
    allChannels: []
  },
  mutations: {
    // 设置tokenInfo这个对象, 对象中有token信息
    setTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      // 一更新token, 就往本地存一份, 本地就可以实时的同步到vuex的数据
      setToken(tokenObj)
    },
    setChannels (state, channels) {
      state.channels = channels
    },
    setAllChannels (state, allChannels) {
      state.allChannels = allChannels
    },
    addChannel (state, channel) {
      state.channels.push(channel)
    },
    delChannel (state, channel) {
      state.channels = state.channels.filter(item => item.id !== channel.id)
    }
  },
  actions: {
    async getChannelsAsync (context) {
      const res = await reqGetChannels()
      context.commit('setChannels', res.data.data.channels)
    },
    async getAllChannels (context) {
      const res = await reqGetAllChannels()
      context.commit('setAllChannels', res.data.data.channels)
    }
  },
  getters: {
    // 可选的频道
    optionalChannels: (state) => {
    // 对 allChannels 中的元素进行过滤, 只保留那些没有在 channels 中出现的元素
      const results = state.allChannels.filter(channel => {
        const index = state.channels.findIndex(item => item.id === channel.id)
        // 如果找到了, index不是 -1, 如果找不到才是 -1 (要留下)
        return index === -1
      })
      return results
    }
  },
  modules: {
  }
})
