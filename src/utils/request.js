import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
// 基于原本的axios功能, 扩展一些默认配置, 创建一个axios实例
const http = axios.create({
  // 基准地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 配置大数的转换处理
  transformResponse: [function (data) {
    // data => 原始的后台返回的 json 字符串数据
    // 这里的方法, 会覆盖axios默认对于返回结果的处理, 默认进行的是 JSON.parse
    // 需要进行的是 JSONbig.parse
    // 后台返回的有可能不是 json字符串, JSONbig 解析就会报错, 不合理的, 需要处理
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // 如果解析不了, 说明不是json格式, 原样输出
      return data
    }
  }]
})

// 配置axios请求拦截器: 所有的axios请求, 在真正发送出去之前, 都会先经过请求拦截器
// 可以在请求拦截器中, 统一的携带token
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
