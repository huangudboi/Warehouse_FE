import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import FormView from '@/views/signIn_singUp/FormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
    },
    {
      path: '/login',
      name: 'login',
      component: FormView,
      props: {isLoginScreen: true}
    },
    {
      path: '/register',
      name: 'register',
      component: FormView,
      props: {isLoginScreen: false}
    },
  ]
})

export default router