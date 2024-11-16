import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import axios from "axios";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/profile/dashboard'
        },
        {
            path: '/acc/',
            component: () => import('../views/acc/App.vue'),
            children: [{
                path: 'dashboard',
                name: 'acc_home',
                component: () =>
                    import('../views/acc/dashboard.vue')
            },
        ]
        },
        {
            path: '/manager/',
            component: () => import('../views/manager/App.vue'),
            children: [{
                path: 'dashboard',
                name: 'manager_home',
                component: ()=> import ('../views/manager/dashboard.vue')
            }]
        },
        {
            path: '/profile/',
            component: () => import('../views/user/profile/profile-main.vue'),
            children: [
                {
                    path: 'dashboard',
                    component: () => import('../views/user/profile/dashboard.vue'),
                    meta: {
                        'title': 'داشبورد کاربر',
                        'login': true
                    }
                },
                {
                    path: 'business',
                    component: () => import('../views/user/profile/business/list.vue'),
                    meta: {
                        'title': 'کسب و کارها',
                        'login': true
                    }
                },
                {
                    path: 'new-business',
                    component: () => import('../views/user/profile/business/insert.vue'),
                    meta: {
                        'title': 'کسب و کار جدید',
                        'login': true
                    }
                },
                {
                    path: 'change-password',
                    component: () => import('../views/user/change-password.vue'),
                    meta: {
                        'title': 'تغییر کلمه عبور',
                        'login': true
                    }
                },
                {
                    path: 'add-mobile-number',
                    component: () => import('../views/user/profile/add-mobile.vue'),
                    meta: {
                        'title': 'افزودن شماره تلفن همراه',
                        'login': true
                    }
                },
                {
                    path: 'support-list',
                    component: () => import('../views/user/profile/support/list.vue'),
                    meta: {
                        'title': 'درخواست‌های پشتیبانی',
                        'login': true
                    }
                },
                {
                    path: 'support-new',
                    component: () => import('../views/user/profile/support/new.vue'),
                    meta: {
                        'title': 'درخواست‌ پشتیبانی',
                        'login': true
                    }
                },
                {
                    path: 'support-view/:id',
                    component: () => import('../views/user/profile/support/show.vue'),
                    meta: {
                        'title': 'درخواست‌ پشتیبانی',
                        'login': true
                    }
                },
            ],
        },
        {
            path: '/user/',
            component: () => import('../views/user/single.vue'),
            children: [
                {
                    path: 'login',
                    name: 'user_login',
                    component: () => import('../views/user/login.vue'),
                    meta: {
                        'title': 'ورود کاربر',
                    }
                },
                {
                    path: 'forget-password',
                    name: 'user_forget_password',
                    component: () => import('../views/user/profile/forget-password.vue'),
                    meta: {
                        'title': 'بازیابی گذرواژه',
                    }
                },
                {
                    path: 'forget-password-submit-code/:id',
                    name: 'user_forget_password_submit_code',
                    component: () => import('../views/user/profile/forget-password-submit-code.vue'),
                    meta: {
                        'title': 'تایید کد بازیابی گذرواژه',
                    }
                },
                {
                    path: 'register',
                    name: 'user_register',
                    component: () => import('../views/user/register.vue'),
                    meta: {
                        'title': 'عضویت',
                    }
                },{
                    path: 'active-account/:id',
                    name: 'user_active_account',
                    component: () => import('../views/user/active-account.vue'),
                    meta: {
                        'title': 'فعال سازی حساب کاربری',
                    }
                },
            ],
        },
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            component: () => import("../views/NotFound.vue"),
            meta: {
                'title': 'صفحه یافت نشد',
            }
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    document.title = <string>to.meta.title;
    //check user is login
    if (to.meta.login) {
        let result = await axios.get('/api/user/check/login');
        if (result.status == 200 && result.data.Success == true) {
            //check user has role
            if (to.meta.role) {
                let result = await axios.get('/api/user/has/role/' + to.meta.role);
                if (result.status == 200 && result.data.result == true) {
                    next();
                    return
                }
                else {
                    next({ 'name': 'error_403' });
                    return
                }
            }
            next();
            return
        }
        else {
            next({ 'name': 'user_login' });
            return
        }
    }

    next();
    return
})
export default router