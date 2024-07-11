import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/dashboard.vue'
const router = createRouter({
    history: createWebHashHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'app_home',
            component: HomeView
        },
        {
            path: '/manager/reportchange/list',
            name: 'reportchange_list',
            component: () =>
                import ('../views/reportchange/list.vue')
        },
        {
            path: '/manager/logs/list',
            name: 'logs_list',
            component: () =>
                import ('../views/log/logs.vue')
        },
        {
            path: '/manager/reportchange/mod/:id?',
            name: 'reportchange_mod',
            component: () =>
                import ('../views/reportchange/mod.vue'),
        },
        {
            path: '/manager/blog/list',
            name: 'blog_list',
            component: () =>
                import ('../views/blog/list.vue')
        },
        {
            path: '/manager/support/list',
            name: 'support_list',
            component: () =>
                import ('../views/support/list.vue')
        },
        {
            path: '/manager/support/view/:id',
            component: () =>
                import ('../views/support/show.vue'),
            meta: {
                'title': 'مشاهده درخواست',
                'login': true
            }
        },
        {
            path: '/manager/wallet/transaction/insert/:id',
            component: () =>
                import ('../views/wallet/mod.vue'),
            meta: {
                'title': 'ثبت تراکنش',
                'login': true
            }
        },
        {
            path: '/manager/wallet/list',
            component: () =>
                import ('../views/wallet/list.vue'),
            meta: {
                'title': 'لیست حساب‌ها',
                'login': true
            }
        },
        {
            path: '/manager/wallet/transactions',
            component: () =>
                import ('../views/wallet/transactions.vue'),
            meta: {
                'title': 'لیست تراکنش‌ها',
                'login': true
            }
        },
        {
            path: '/manager/wallet/mod',
            component: () =>
                import ('../views/wallet/mod.vue'),
            meta: {
                'title': 'ثبت واریزی',
                'login': true
            }
        },
        {
            path: '/manager/users/list',
            component: () =>
                import ('../views/users/list.vue'),
            meta: {
                'title': 'لیست کاربران',
                'login': true
            }
        },
        {
            path: '/manager/users/change-password/:id',
            component: () =>
                import ('../views/users/change-password.vue'),
            meta: {
                'title': 'تغییر کلمه عبور',
                'login': true
            }
        },
        {
            path: '/manager/business/list',
            component: () =>
                import ('../views/business/list.vue'),
            meta: {
                'title': 'لیست کسب و کار‌ها',
                'login': true
            }
        },
        {
            path: '/manager/settings/sms/settings',
            component: () =>
                import ('../views/settings/sms/smsSettings.vue'),
            meta: {
                'title': 'تنظیمات پیامک',
                'login': true
            }
        },
        {
            path: '/manager/settings/system/info',
            component: () =>
                import ('../views/settings/system.vue'),
            meta: {
                'title': 'تنظیمات سیستم',
                'login': true
            }
        },
        {
            path: '/manager/settings/update/info',
            component: () =>
                import ('../views/settings/update-center.vue'),
            meta: {
                'title': 'به روزرسانی هسته',
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
    if (width <= 992) {
        Dashmix.layout('sidebar_close');
    }
    return true
})
export default router