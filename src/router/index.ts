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
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/ConnectView.vue'),
      meta:{
        'title':'تماس با ما'
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
      meta:{
        'title':'سوالات متداول'
      }
    },
    {
      path: '/login',
      name: 'user_login',
      component: () => import('../views/user/login.vue'),
      meta:{
        'title':'ورود به حسابیکس'
      }
    },
    {
      path: '/guide/:id',
      name: 'guide',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/guide/guide.vue'),
      meta:{
        'title':'راهنما و خودآموزها'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = <string>to.meta.title;
  next();
});

export default router
