import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormView from '@/views/signIn_singUp/FormView.vue'
import ManageView from '@/views/ManageView.vue'
import ReportView from '@/views/ReportView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailOrder from '@/views/DetailOrder.vue'
import { getLocalStorageByItem } from '@/constants/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/management',
      name: 'management',
      component: ManageView
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView
    },
    {
      path: '/detailOrder',
      name: 'detailOrder',
      component: DetailOrder
    },
    {
      path: '/createNew',
      name: 'createNew',
      component: CreateView
    },
    {
      path: '/login',
      name: 'login',
      component: FormView,
      props: {isLoginScreen: true},
      meta:{requiresAuth: true},
    },
    {
      path: '/register',
      name: 'register',
      component: FormView,
      props: {isLoginScreen: false},
      meta:{requiresAuth: true},
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = getLocalStorageByItem('USER_LOGIN')
  if (to.name !== 'login' && !token && !to.meta.requiresAuth) {
    next({ name: 'login' })
  }
  next()
})
export default router