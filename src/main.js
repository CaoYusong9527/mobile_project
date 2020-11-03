import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/request.js'
import './styles/index.scss'
// 按需导入
import { Button, NavBar, Field, CellGroup, Toast } from 'vant'
import 'amfe-flexible'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
