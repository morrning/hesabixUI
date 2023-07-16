import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/dashboard.vue'
import PersonHome from '../views/persons/list.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app_home',
      component: HomeView
    },
    {
      path: '/acc/reports/list',
      name: 'reports_list',
      component: ()=> import('../views/reports/reports.vue')
    },
    {
      path: '/acc/costs/list',
      name: 'costs_list',
      component: () => import('../views/costs/list.vue'),
    },
    {
      path: '/acc/costs/mod/:id?',
      name: 'costs_mod',
      component: () => import('../views/costs/mod.vue'),
    },
    {
      path: '/acc/accounting/list',
      name: 'accounting_list_doc',
      component: () => import('../views/accounting/list.vue'),
    },
    {
      path: '/acc/accounting/table',
      name: 'accounting_table',
      component: () => import('../views/accounting/table.vue'),
    },
    {
      path: '/acc/accounting/view/:id?',
      name: 'accounting_view_doc',
      component: () => import('../views/accounting/viewDoc.vue'),
    },
    {
      path: '/acc/banks/list',
      name: 'banks_list',
      component: ()=> import('../views/bank/list.vue')
    },
    {
      path: '/acc/banks/mod/:id?',
      name: 'bank_mod',
      component: () => import('../views/bank/mod.vue'),
    },
    {
      path: '/acc/persons/receive/list',
      name: 'person_receive_list',
      component: ()=> import('../views/persons/receive/list.vue')
    },
    {
      path: '/acc/persons/send/list',
      name: 'person_send_list',
      component: ()=> import('../views/persons/send/list.vue')
    },
    {
      path: '/acc/persons/receive/mod/:id?',
      name: 'person_receive_mod',
      component: () => import('../views/persons/receive/mod.vue'),
    },
    {
      path: '/acc/persons/send/mod/:id?',
      name: 'person_send_mod',
      component: () => import('../views/persons/send/mod.vue'),
    },
    {
      path: '/acc/persons/card/view/:id?',
      name: 'person_card_view',
      component: () => import('../views/persons/card.vue'),
    },
    {
      path: '/acc/persons/list',
      name: 'person_list',
      component: PersonHome
    },
    {
      path: '/acc/persons/mod/:id?',
      name: 'person_new',
      component: () => import('../views/persons/insert.vue'),
    },
    {
      path: '/acc/business/settings',
      name: 'business_settings',
      component: () => import('../views/settings/bussiness.vue'),
    },
    {
      path: '/acc/business/logs',
      name: 'business_logs',
      component: () => import('../views/settings/logs.vue'),
    },
    {
      path: '/acc/business/users',
      name: 'business_users',
      component: () => import('../views/settings/user_rolls.vue'),
    },
    {
      path: '/acc/business/user/roll/edit/:email',
      name: 'business_user_roll_edit',
      component: () => import('../views/settings/user_perm_edit.vue'),
    },
    {
      path: '/acc/commodity/list',
      name: 'commodity_list',
      component: import('../views/commodity/list.vue'),
    },
    {
      path: '/acc/commodity/mod/:id?',
      name: 'commodity_mod',
      component: () => import('../views/commodity/mod.vue'),
    },
  ]
})

export default router
