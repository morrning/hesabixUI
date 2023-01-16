import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        'title':'نرم‌افزار حسابداری آنلاین و ابری حسابیکس کاملا رایگان'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta:{
        'title':'درباره ما'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = <string>to.meta.title;
  next();
});

export default router
