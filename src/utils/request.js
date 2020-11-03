import axios from 'axios'
import store from '@/store'
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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
