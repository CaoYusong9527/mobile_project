import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

http.interceptors.request.use(function (config) {
  const token = store.state.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default http
