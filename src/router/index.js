import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import LayoutIndex from '@/views/layout'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: LayoutIndex, children: [] }
  ]
})

export default router
