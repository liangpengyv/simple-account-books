import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'list' }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue'),
    meta: {
      title: '收支'
    }
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue'),
    meta: {
      title: '记一笔'
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/Statistics.vue'),
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