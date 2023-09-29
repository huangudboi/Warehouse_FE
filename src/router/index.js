import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FormView from '@/views/signIn_singUp/FormView.vue'
import ManageView from '@/views/ManageView.vue'
import ReportView from '@/views/ReportView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailOrder from '@/views/DetailOrder.vue'
import CreateMultiOrderView from '@/views/CreateMultiOrderView.vue'
import { getLocalStorageByItem } from '@/constants/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'HomePage' }, // Tiêu đề mặc định cho trang chủ
    },
    {
      path: '/management',
      name: 'management',
      component: ManageView,
      meta: { title: 'Management Order' },
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      meta: { title: 'Report Order' },
    },
    {
      path: '/management/detailOrder',
      name: 'detailOrder',
      component: DetailOrder,
      meta: { title: 'Order Detail' },
    },
    {
      path: '/createNew',
      name: 'createNew',
      component: CreateView,
      meta: { title: 'Create Order' },
    },
    {
      path: '/createNew/multiOrder',
      name: 'multiOrder',
      component: CreateMultiOrderView,
      meta: { title: 'Create Multi Order' },
    },
    {
      path: '/login',
      name: 'login',
      component: FormView,
      props: { isLoginScreen: true },
      meta: { requiresAuth: true, title: 'Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: FormView,
      props: { isLoginScreen: false },
      meta: { requiresAuth: true, title: 'Register' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getLocalStorageByItem('USER_LOGIN')
  if (to.name !== 'login' && !token && !to.meta.requiresAuth) {
    next({ name: 'login' })
  }
  next()
})
router.beforeEach((to) => {
  document.title = to.meta.title
})

export default router
