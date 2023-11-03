import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/dashboard.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app_home',
      component: HomeView
    },
    {
      path: '/manager/blog/list',
      name: 'blog_list',
      component: ()=> import('../views/blog/list.vue')
    },
    {
      path: '/manager/support/list',
      name: 'support_list',
      component: ()=> import('../views/support/list.vue')
    },
    {
      path: '/manager/support/view/:id',
      component: () => import('../views/support/show.vue'),
      meta: {
        'title': 'مشاهده درخواست',
        'login': true
      }
    }
  ]
})
router.beforeEach((to, from) => {
  const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
  )
  if (width <= 992){
    Dashmix.layout('sidebar_close');
  }
  return true
})
export default router
