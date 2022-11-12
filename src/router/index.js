import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'bill-list' }
  },
  {
    path: '/bill-list',
    name: 'bill-list',
    component: () => import('../views/BillList.vue'),
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(to => {
  document.title = to.meta.title + ' - 简易记账本'
})

export default router
