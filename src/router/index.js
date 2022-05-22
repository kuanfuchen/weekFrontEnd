import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:()=>import('../views/HomeView.vue')
  },
  {
    path:'/post',
    name:'postArt',
    component:()=>import('../views/postArt.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
