import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/base.vue'
import PersonHome from '../views/persons/list.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/acc/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/acc/persons/list',
      name: 'person_list',
      component: PersonHome
    }
  ]
})

export default router
