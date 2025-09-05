import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'
const routes=[
  { path:'/', redirect:'/login' },
  { path:'/login', component: LoginView },
  { path:'/users', component: UsersView, meta:{ requiresAuth:true } }
]
const router=createRouter({ history:createWebHistory(), routes })
router.beforeEach((to,from,next)=>{ if(to.meta.requiresAuth && !localStorage.getItem('token')) next('/login'); else next() })
export default router
