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
      path: '/acc/incomes/list',
      name: 'incomes_list',
      component: () => import('../views/incomes/list.vue'),
    },
    {
      path: '/acc/incomes/mod/:id?',
      name: 'incomes_mod',
      component: () => import('../views/incomes/mod.vue'),
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
      path: '/acc/salary/list',
      name: 'salary_list',
      component: ()=> import('../views/salary/list.vue')
    },
    {
      path: '/acc/salary/mod/:id?',
      name: 'salary_mod',
      component: () => import('../views/salary/mod.vue'),
    },
    {
      path: '/acc/cashdesk/list',
      name: 'cashdesk_list',
      component: ()=> import('../views/cashdesk/list.vue')
    },
    {
      path: '/acc/cashdesk/mod/:id?',
      name: 'cashdesk_mod',
      component: () => import('../views/cashdesk/mod.vue'),
    },
    {
      path: '/acc/transfer/list',
      name: 'transfer_list',
      component: ()=> import('../views/transfer/list.vue')
    },
    {
      path: '/acc/transfer/mod/:id?',
      name: 'transfer_mod',
      component: () => import('../views/transfer/mod.vue'),
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
      component: () => import('../views/commodity/list.vue'),
    },
    {
      path: '/acc/commodity/mod/:id?',
      name: 'commodity_mod',
      component: () => import('../views/commodity/mod.vue'),
    },
    {
      path: '/acc/buy/mod/:id?',
      name: 'buy_mod',
      component: () => import('../views/buy/mod.vue'),
    },
    {
      path: '/acc/buy/list',
      name: 'buy_list',
      component: () => import('../views/buy/list.vue'),
    },
    {
      path: '/acc/plugin-center/list',
      name: 'plugin_center_list',
      component: () => import('../views/store/plugin-world.vue'),
    },
    {
      path: '/acc/plugin-center/my',
      name: 'plugin_center_my',
      component: () => import('../views/store/plugin-my.vue'),
    },
    {
      path: '/acc/plugin-center/invoice',
      name: 'plugin_center_invoice',
      component: () => import('../views/store/plugin-invoice.vue'),
    },
    {
      path: '/acc/plugin-center/view-end/:id?',
      name: 'plugin_center_view_prodect',
      component: () => import('../views/store/viewProdect.vue'),
    },
    {
      path: '/acc/plugins/restamap/intro',
      name: 'plugin_restamap_intro',
      component: () => import('../views/plugins/resamap/intro.vue'),
    },
    {
      path: '/acc/plugins/noghre/intro',
      name: 'plugin_noghre_intro',
      component: () => import('../views/plugins/noghre/intro.vue'),
    },
    {
      path: '/acc/plugins/cc/intro',
      name: 'plugin_cc_intro',
      component: () => import('../views/plugins/cc/intro.vue'),
    },
    {
      path: '/acc/notifications/list',
      name: 'notification_list',
      component: () => import('../views/notifications/notifications.vue'),
    },
    {
      path: '/acc/plugin/noghre/employees/list',
      name: 'plugin_noghre_employees_list',
      component: () => import('../views/plugins/noghre/employess/list.vue'),
    },
    {
      path: '/acc/plugin/noghre/employees/mod/:id?',
      name: 'plugin_noghre_employees_mod',
      component: () => import('../views/plugins/noghre/employess/mod.vue'),
    },
    {
      path: '/acc/plugin/noghre/order/list',
      name: 'plugin_noghre_order_list',
      component: () => import('../views/plugins/noghre/order/list.vue'),
    },
    {
      path: '/acc/plugin/noghre/order/mod/:id?',
      name: 'plugin_noghre_order_mod',
      component: () => import('../views/plugins/noghre/order/mod.vue'),
    },
    {
      path: '/acc/plugin/noghre/order/view/:id?',
      name: 'plugin_noghre_order_view',
      component: () => import('../views/plugins/noghre/order/view.vue'),
    }
  ]
})

export default router
