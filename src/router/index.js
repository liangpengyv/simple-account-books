import { createRouter, createWebHistory } from 'vue-router'
import BillList from '../views/BillList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'bill-list' }
  },
  {
    path: '/bill-list',
    name: 'bill-list',
    component: BillList,
    meta: {
      title: '收支'
    }
  },
  {
    path: '/add-bill',
    name: 'add-bill',
    component: () => import('../views/AddBill.vue'),
    meta: {
      title: '记一笔'
    }
  },
  {
    path: '/bill-statistics',
    name: 'bill-statistics',
    component: () => import('../views/BillStatistics.vue'),
    meta: {
      title: '收支统计'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  document.title = to.meta.title + ' - 简易记账本'
  $loadingBar.start()
})

router.afterEach(() => {
  $loadingBar.finish()
})

export default router
