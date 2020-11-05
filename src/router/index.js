import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// 首页tab栏相关
import LayoutIndex from '@/views/layout'
import HomeIndex from '@/views/home'
import QuestionIndex from '@/views/question'
import VideoIndex from '@/views/video'
import UserIndex from '@/views/user'
import Search from '@/views/search'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: LayoutIndex,
      children: [
        { path: '', component: HomeIndex },
        { path: '/question', component: QuestionIndex },
        { path: '/video', component: VideoIndex },
        { path: '/user', component: UserIndex }
      ]
    },
    { path: '/search', component: Search }
  ]
})

export default router
