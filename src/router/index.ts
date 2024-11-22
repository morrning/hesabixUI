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
                {
                    path: 'manager/support-list',
                    component: () => import('../views/user/manager/support/list.vue'),
                    meta: {
                        'title': 'درخواست‌های پشتیبانی',
                        'login': true
                    }
                },
                {
                    path: 'manager/support-view/:id',
                    component: () => import('../views/user/manager/support/show.vue'),
                    meta: {
                        'title': 'مشاهده درخواست',
                        'login': true
                    }
                },
                {
                    path: 'manager/business/list',
                    component: () => import('../views/user/manager/business/list.vue'),
                    meta: {
                        'title': 'کسب‌و‌کارها',
                        'login': true
                    }
                },
                {
                    path: 'manager/users/list',
                    component: () => import('../views/user/manager/users/list.vue'),
                    meta: {
                        'title': 'کاربران',
                        'login': true
                    }
                },
                {
                    path: 'manager/logs/list',
                    component: () => import('../views/user/manager/log/logs.vue'),
                    meta: {
                        'title': 'تاریخچه سیستم',
                        'login': true
                    }
                },
                {
                    path: 'manager/changes/list',
                    component: () => import('../views/user/manager/reportchange/list.vue'),
                    meta: {
                        'title': 'لیست تغییرات',
                        'login': true
                    }
                },
                {
                    path: 'manager/changes/mod/:id',
                    component: () => import('../views/user/manager/reportchange/mod.vue'),
                    meta: {
                        'title': 'ارائه تغییرات سیستم',
                        'login': true
                    }
                },
                {
                    path: 'manager/database/info',
                    component: () => import('../views/user/manager/settings/database_info.vue'),
                    meta: {
                        'title': 'خروجی از بانک اطلاعاتی',
                        'login': true
                    }
                },
                {
                    path: 'manager/system/mod',
                    component: () => import('../views/user/manager/settings/system.vue'),
                    meta: {
                        'title': 'تنظیمات پایه',
                        'login': true
                    }
                },
                {
                    path: 'manager/system/sms/settings',
                    component: () => import('../views/user/manager/settings/sms/smsSettings.vue'),
                    meta: {
                        'title': 'تنظیمات پیامک',
                        'login': true
                    }
                },
            ],
        }, {
            path: '/acc/',
            component: () => import('../views/acc/App.vue'),
            children: [
                {
                    path: 'dashboard',
                    component: () => import('../views/acc/dashboard.vue'),
                    name: 'acc_home',
                    meta: {
                        'title': 'داشبورد کسب‌و‌کار',
                        'login': true
                    }
                },
                {
                    path: '/acc/business/printtemplates',
                    name: 'business_printtemplates',
                    component: () =>
                        import('../views/acc/printers/templates.vue')
                },
                {
                    path: '/acc/printers/list',
                    name: 'printers_list',
                    component: () =>
                        import('../views/acc/printers/list.vue')
                }, {
                    path: '/acc/reports/list',
                    name: 'reports_list',
                    component: () =>
                        import('../views/acc/reports/reports.vue')
                },
                {
                    path: '/acc/reports/persons/debtors',
                    name: 'person_debtors_list',
                    component: () =>
                        import('../views/acc/reports/persons/debtors.vue'),
                },
                {
                    path: '/acc/reports/acc/balance_sheet',
                    name: 'acc_balanceSheet_list',
                    component: () =>
                        import('../views/acc/reports/balanceSheet.vue'),
                },
                {
                    path: '/acc/reports/commodity/buysell',
                    name: 'commodity_report_buysell',
                    component: () =>
                        import('../views/acc/reports/commodity/buysellByCommodity.vue'),
                },
                {
                    path: '/acc/reports/persons/depositors',
                    name: 'person_depositors_list',
                    component: () =>
                        import('../views/acc/reports/persons/depositors.vue'),
                },
                {
                    path: '/acc/reports/persons/buysell',
                    name: 'person_buysell_by_person',
                    component: () =>
                        import('../views/acc/reports/persons/buysellByPerson.vue'),
                },
                {
                    path: '/acc/costs/list',
                    name: 'costs_list',
                    component: () =>
                        import('../views/acc/costs/list.vue'),
                },
                {
                    path: '/acc/costs/mod/:id?',
                    name: 'costs_mod',
                    component: () =>
                        import('../views/acc/costs/mod.vue'),
                },
                {
                    path: '/acc/incomes/list',
                    name: 'incomes_list',
                    component: () =>
                        import('../views/acc/incomes/list.vue'),
                },
                {
                    path: '/acc/incomes/mod/:id?',
                    name: 'incomes_mod',
                    component: () =>
                        import('../views/acc/incomes/mod.vue'),
                },
                {
                    path: '/acc/accounting/list',
                    name: 'accounting_list_doc',
                    component: () =>
                        import('../views/acc/accounting/list.vue'),
                },
                {
                    path: '/acc/accounting/table',
                    name: 'accounting_table',
                    component: () =>
                        import('../views/acc/accounting/table.vue'),
                },
                {
                    path: '/acc/accounting/close_year',
                    name: 'accounting_close_year',
                    component: () =>
                        import('../views/acc/accounting/closeyear.vue'),
                },
                {
                    path: '/acc/accounting/view/:id?',
                    name: 'accounting_view_doc',
                    component: () =>
                        import('../views/acc/accounting/viewDoc.vue'),
                },
                {
                    path: '/acc/banks/list',
                    name: 'banks_list',
                    component: () =>
                        import('../views/acc/bank/list.vue')
                },
                {
                    path: '/acc/banks/card/view/:id?',
                    name: 'bank_card_view',
                    component: () =>
                        import('../views/acc/bank/card.vue'),
                },
                {
                    path: '/acc/banks/mod/:id?',
                    name: 'bank_mod',
                    component: () =>
                        import('../views/acc/bank/mod.vue'),
                },
                {
                    path: '/acc/salary/list',
                    name: 'salary_list',
                    component: () =>
                        import('../views/acc/salary/list.vue')
                },
                {
                    path: '/acc/salary/card/view/:id?',
                    name: 'salary_card_view',
                    component: () =>
                        import('../views/acc/salary/card.vue'),
                },
                {
                    path: '/acc/salary/mod/:id?',
                    name: 'salary_mod',
                    component: () =>
                        import('../views/acc/salary/mod.vue'),
                },
                {
                    path: '/acc/wallet/view',
                    name: 'wallet_view',
                    component: () =>
                        import('../views/acc/wallet/view.vue')
                },
                {
                    path: '/acc/cashdesk/list',
                    name: 'cashdesk_list',
                    component: () =>
                        import('../views/acc/cashdesk/list.vue')
                },
                {
                    path: '/acc/cashdesk/card/view/:id?',
                    name: 'cashdesk_card_view',
                    component: () =>
                        import('../views/acc/cashdesk/card.vue'),
                },
                {
                    path: '/acc/cashdesk/mod/:id?',
                    name: 'cashdesk_mod',
                    component: () =>
                        import('../views/acc/cashdesk/mod.vue'),
                },
                {
                    path: '/acc/transfer/list',
                    name: 'transfer_list',
                    component: () =>
                        import('../views/acc/transfer/list.vue')
                },
                {
                    path: '/acc/transfer/mod/:id?',
                    name: 'transfer_mod',
                    component: () =>
                        import('../views/acc/transfer/mod.vue'),
                },
                {
                    path: '/acc/persons/receive/list',
                    name: 'person_receive_list',
                    component: () =>
                        import('../views/acc/persons/receive/list.vue')
                },
                {
                    path: '/acc/persons/send/list',
                    name: 'person_send_list',
                    component: () =>
                        import('../views/acc/persons/send/list.vue')
                },
                {
                    path: '/acc/persons/receive/mod/:id?',
                    name: 'person_receive_mod',
                    component: () =>
                        import('../views/acc/persons/receive/mod.vue'),
                },
                {
                    path: '/acc/persons/send/mod/:id?',
                    name: 'person_send_mod',
                    component: () =>
                        import('../views/acc/persons/send/mod.vue'),
                },
                {
                    path: '/acc/persons/card/view/:id?',
                    name: 'person_card_view',
                    component: () =>
                        import('../views/acc/persons/card.vue'),
                },
                {
                    path: '/acc/persons/list',
                    name: 'person_list',
                    component: () =>
                        import('../views/acc/persons/list.vue'),
                },
                {
                    path: '/acc/persons/mod/:id?',
                    name: 'person_new',
                    component: () =>
                        import('../views/acc/persons/insert.vue'),
                },
                {
                    path: '/acc/business/settings',
                    name: 'business_settings',
                    component: () =>
                        import('../views/acc/settings/bussiness.vue'),
                },
                {
                    path: '/acc/business/printoptions',
                    name: 'print_settings',
                    component: () =>
                        import('../views/acc/settings/print.vue'),
                },
                {
                    path: '/acc/business/avatar',
                    name: 'business_avatar',
                    component: () =>
                        import('../views/acc/settings/avatar.vue'),
                },
                {
                    path: '/acc/business/extramoneys',
                    name: 'business_extramoneys',
                    component: () =>
                        import('../views/acc/settings/extramoneys.vue'),
                },
                {
                    path: '/acc/business/logs',
                    name: 'business_logs',
                    component: () =>
                        import('../views/acc/settings/logs.vue'),
                },
                {
                    path: '/acc/business/apis',
                    name: 'business_apis',
                    component: () =>
                        import('../views/acc/api/list.vue'),
                },
                {
                    path: '/acc/business/users',
                    name: 'business_users',
                    component: () =>
                        import('../views/acc/settings/user_rolls.vue'),
                },
                {
                    path: '/acc/business/user/roll/edit/:email',
                    name: 'business_user_roll_edit',
                    component: () =>
                        import('../views/acc/settings/user_perm_edit.vue'),
                },
                {
                    path: '/acc/commodity/cat/list',
                    name: 'commodity_cat_list',
                    component: () =>
                        import('../views/acc/commodity/cat/list.vue'),
                },
                {
                    path: '/acc/commodity/pricelist/list',
                    name: 'commodity_pricelist_list',
                    component: () =>
                        import('../views/acc/commodity/priceList/list.vue'),
                },
                {
                    path: '/acc/commodity/pricelist/mod/:id?',
                    name: 'commodity_pricelist_mod',
                    component: () =>
                        import('../views/acc/commodity/priceList/mod.vue'),
                },
                {
                    path: '/acc/commodity/pricelist/view/:id?',
                    name: 'commodity_pricelist_view',
                    component: () =>
                        import('../views/acc/commodity/priceList/view.vue'),
                }, {
                    path: '/acc/commodity/pricelist/list/mod/:id?',
                    name: 'commodity_pricelist_list_mod',
                    component: () =>
                        import('../views/acc/commodity/priceList/pricelistedit.vue'),
                },
                {
                    path: '/acc/commodity/drop/list',
                    name: 'commodity_drop_list',
                    component: () =>
                        import('../views/acc/commodity/drop/list.vue'),
                },
                {
                    path: '/acc/commodity/drop/mod/:id?',
                    name: 'commodity_drop_mod',
                    component: () =>
                        import('../views/acc/commodity/drop/mod.vue'),
                },
                {
                    path: '/acc/commodity/list',
                    name: 'commodity_list',
                    component: () =>
                        import('../views/acc/commodity/list.vue'),
                },
                {
                    path: '/acc/commodity/mod/:id?',
                    name: 'commodity_mod',
                    component: () =>
                        import('../views/acc/commodity/mod.vue'),
                },
                {
                    path: '/acc/cheque/mod/:id?',
                    name: 'cheque_mod',
                    component: () =>
                        import('../views/acc/cheque/mod.vue'),
                },
                {
                    path: '/acc/cheque/list',
                    name: 'cheque_list',
                    component: () =>
                        import('../views/acc/cheque/list.vue'),
                },
                {
                    path: '/acc/buy/mod/:id?',
                    name: 'buy_mod',
                    component: () =>
                        import('../views/acc/buy/mod.vue'),
                },
                {
                    path: '/acc/buy/list',
                    name: 'buy_list',
                    component: () =>
                        import('../views/acc/buy/list.vue'),
                },
                {
                    path: '/acc/buy/view/:id?',
                    name: 'buy_view',
                    component: () =>
                        import('../views/acc/buy/viewInvoice.vue'),
                },
                {
                    path: '/acc/sell/mod/:id?',
                    name: 'sell_mod',
                    component: () =>
                        import('../views/acc/sell/mod.vue'),
                },
                {
                    path: '/acc/sell/fast-mod/:id?',
                    name: 'sell_fast_mod',
                    component: () =>
                        import('../views/acc/sell/fastMod.vue'),
                },
                {
                    path: '/acc/sell/list',
                    name: 'sell_list',
                    component: () =>
                        import('../views/acc/sell/list.vue'),
                },
                {
                    path: '/acc/sell/view/:id?',
                    name: 'sell_view',
                    component: () =>
                        import('../views/acc/sell/viewInvoice.vue'),
                },
                {
                    path: '/acc/presell/mod/:id?',
                    name: 'presell_mod',
                    component: () =>
                        import('../views/acc/presell/mod.vue'),
                },
                {
                    path: '/acc/presell/list',
                    name: 'presell_list',
                    component: () =>
                        import('../views/acc/presell/list.vue'),
                },
                {
                    path: '/acc/presell/view/:id?',
                    name: 'presell_view',
                    component: () =>
                        import('../views/acc/presell/viewInvoice.vue'),
                },
                {
                    path: '/acc/rfbuy/mod/:id?',
                    name: 'rfbuy_mod',
                    component: () =>
                        import('../views/acc/rfbuy/mod.vue'),
                },
                {
                    path: '/acc/rfbuy/list',
                    name: 'rfbuy_list',
                    component: () =>
                        import('../views/acc/rfbuy/list.vue'),
                },
                {
                    path: '/acc/rfbuy/view/:id?',
                    name: 'rfbuy_view',
                    component: () =>
                        import('../views/acc/rfbuy/viewInvoice.vue'),
                },
                {
                    path: '/acc/rfsell/mod/:id?',
                    name: 'rfsell_mod',
                    component: () =>
                        import('../views/acc/rfsell/mod.vue'),
                },
                {
                    path: '/acc/rfsell/list',
                    name: 'rfsell_list',
                    component: () =>
                        import('../views/acc/rfsell/list.vue'),
                },
                {
                    path: '/acc/rfsell/view/:id?',
                    name: 'rfsell_view',
                    component: () =>
                        import('../views/acc/rfsell/viewInvoice.vue'),
                },
                {
                    path: '/acc/plugin-center/list',
                    name: 'plugin_center_list',
                    component: () =>
                        import('../views/acc/store/plugin-world.vue'),
                },
                {
                    path: '/acc/plugin-center/my',
                    name: 'plugin_center_my',
                    component: () =>
                        import('../views/acc/store/plugin-my.vue'),
                },
                {
                    path: '/acc/plugin-center/invoice',
                    name: 'plugin_center_invoice',
                    component: () =>
                        import('../views/acc/store/plugin-invoice.vue'),
                },
                {
                    path: '/acc/plugin-center/view-end/:id?',
                    name: 'plugin_center_view_prodect',
                    component: () =>
                        import('../views/acc/store/viewProdect.vue'),
                },
                {
                    path: '/acc/plugins/apartemanma/intro',
                    name: 'plugin_apartemanma_intro',
                    component: () =>
                        import('../views/acc/plugins/amartemanma/intro.vue'),
                },
                {
                    path: '/acc/plugins/accpro/intro',
                    name: 'plugin_accpro_intro',
                    component: () =>
                        import('../views/acc/plugins/accpro/intro.vue'),
                },
                {
                    path: '/acc/plugins/repservice/intro',
                    name: 'plugin_repservice_intro',
                    component: () =>
                        import('../views/acc/plugins/repservice/intro.vue'),
                }, {
                    path: '/acc/plugin/repservice/order/mod/:id?',
                    name: 'plugin_repservice_order_mod',
                    component: () =>
                        import('../views/acc/plugins/repservice/mod.vue'),
                },
                {
                    path: '/acc/plugin/repservice/order/view/:id?',
                    name: 'plugin_repservice_order_view',
                    component: () =>
                        import('../views/acc/plugins/repservice/view.vue'),
                },
                {
                    path: '/acc/plugin/repservice/order/list',
                    name: 'plugin_repservice_order_list',
                    component: () =>
                        import('../views/acc/plugins/repservice/list.vue'),
                },
                {
                    path: '/acc/plugins/restamap/intro',
                    name: 'plugin_restamap_intro',
                    component: () =>
                        import('../views/acc/plugins/resamap/intro.vue'),
                },
                {
                    path: '/acc/plugins/noghre/intro',
                    name: 'plugin_noghre_intro',
                    component: () =>
                        import('../views/acc/plugins/noghre/intro.vue'),
                },
                {
                    path: '/acc/plugins/cc/intro',
                    name: 'plugin_cc_intro',
                    component: () =>
                        import('../views/acc/plugins/cc/intro.vue'),
                },
                {
                    path: '/acc/plugins/onlinestore/intro',
                    name: 'plugin_onlinestore_intro',
                    component: () =>
                        import('../views/acc/plugins/onlinestore/intro.vue'),
                },
                {
                    path: '/acc/notifications/list',
                    name: 'notification_list',
                    component: () =>
                        import('../views/acc/notifications/notifications.vue'),
                },
                {
                    path: '/acc/sms/panel',
                    name: 'sms_panel_dashboard',
                    component: () =>
                        import('../views/acc/smspanel/smspanel.vue'),
                },
                {
                    path: '/acc/plugin/noghre/employees/list',
                    name: 'plugin_noghre_employees_list',
                    component: () =>
                        import('../views/acc/plugins/noghre/employess/list.vue'),
                },
                {
                    path: '/acc/plugin/noghre/employees/mod/:id?',
                    name: 'plugin_noghre_employees_mod',
                    component: () =>
                        import('../views/acc/plugins/noghre/employess/mod.vue'),
                },
                {
                    path: '/acc/plugin/noghre/order/list',
                    name: 'plugin_noghre_order_list',
                    component: () =>
                        import('../views/acc/plugins/noghre/order/list.vue'),
                },
                {
                    path: '/acc/plugin/noghre/order/mod/:id?',
                    name: 'plugin_noghre_order_mod',
                    component: () =>
                        import('../views/acc/plugins/noghre/order/mod.vue'),
                },
                {
                    path: '/acc/plugin/noghre/order/view/:id?',
                    name: 'plugin_noghre_order_view',
                    component: () =>
                        import('../views/acc/plugins/noghre/order/view.vue'),
                },
                {
                    path: '/acc/plugin/noghre/pays/view/:id?',
                    name: 'plugin_noghre_pays_view',
                    component: () =>
                        import('../views/acc/plugins/noghre/pays.vue'),
                },
                {
                    path: '/acc/storeroom/commodity/check/exist',
                    name: 'storeroom_commodity_check_exist',
                    component: () =>
                        import('../views/acc/storeroom/commodityCheck/checkByStoreroom.vue'),
                },
                {
                    path: '/acc/storeroom/new/ticket/type',
                    name: 'storeroom_new_ticket_type',
                    component: () =>
                        import('../views/acc/storeroom/io/modalNew.vue'),
                },
                {
                    path: '/acc/storeroom/tickets/list',
                    name: 'storeroom_tickets_list',
                    component: () =>
                        import('../views/acc/storeroom/io/ticketList.vue'),
                },
                {
                    path: '/acc/storeroom/ticket/view/:id',
                    name: 'storeroom_ticket_view',
                    component: () =>
                        import('../views/acc/storeroom/io/view.vue'),
                },
                {
                    path: '/acc/storeroom/new/ticket/buy/:doc/:storeID',
                    name: 'storeroom_new_ticket_buy',
                    component: () =>
                        import('../views/acc/storeroom/io/buy.vue'),
                },
                {
                    path: '/acc/storeroom/new/ticket/sell/:doc/:storeID',
                    name: 'storeroom_new_ticket_sell',
                    component: () =>
                        import('../views/acc/storeroom/io/sell.vue'),
                },
                {
                    path: '/acc/storeroom/new/ticket/rfbuy/:doc/:storeID',
                    name: 'storeroom_new_ticket_rfbuy',
                    component: () =>
                        import('../views/acc/storeroom/io/rfbuy.vue'),
                },
                {
                    path: '/acc/storeroom/new/ticket/rfsell/:doc/:storeID',
                    name: 'storeroom_new_ticket_rfsell',
                    component: () =>
                        import('../views/acc/storeroom/io/rfsell.vue'),
                },
                {
                    path: '/acc/storeroom/list',
                    name: 'storeroom_list',
                    component: () =>
                        import('../views/acc/storeroom/list.vue'),
                },
                {
                    path: '/acc/storeroom/mod/:id?',
                    name: 'storeroom_mod',
                    component: () =>
                        import('../views/acc/storeroom/mod.vue'),
                },
                {
                    path: '/acc/archive/list',
                    name: 'archive_list',
                    component: () =>
                        import('../views/acc/archive/view_files.vue'),
                },
                {
                    path: '/acc/archive/order/new',
                    name: 'order_new',
                    component: () =>
                        import('../views/acc/archive/order_new.vue'),
                },
                {
                    path: '/acc/archive/order/list',
                    name: 'order_list',
                    component: () =>
                        import('../views/acc/archive/orders_list.vue'),
                },
                {
                    path: '/acc/shareholders/list',
                    name: 'shareholders_list',
                    component: () =>
                        import('../views/acc/shareholder/list.vue'),
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
                },
                {
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
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.title == undefined) {
        document.title = "پنل کسب‌و‌کار"
    } else {
        document.title = <string>to.meta.title;
    }
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