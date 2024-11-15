import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
//pinia
import { createPinia } from 'pinia'
const pinia = createPinia();
//vue countdown
import VueCountdown from '@chenfengyuan/vue-countdown';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
//i18n imports
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import i18n from '@/i18n/i18n'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from "vuetify/iconsets/mdi";


const vuetify = createVuetify({
    defaults: {
        VDialog: {
            VCard: {
                class: 'bg-light',
                
            }
        },
    },
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#044792', // #E53935
                    secondary: colors.grey.darken4, // #FFCDD2
                    danger: colors.red.darken3,
                    error: colors.red.darken3,
                    dangerLight: colors.red.lighten4,
                    successLight: colors.green.lighten4,
                    primaryLight: '#f8f9fc',
                    primaryLight2: '#edf1fc',
                    success: '#457237'
                }
            },
        },
    },
});

// @ts-ignore
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import '../public/css/main.css';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import money from 'v-money3';
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';
import NProgress from "nprogress";
import Swal from "sweetalert2";
import Uploader from 'vue-media-upload';
import { getApiUrl } from "/hesabixConfig";
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('v-select', vSelect);
app.component('DatePicker', Vue3PersianDatetimePicker);
app.component('Uploader', Uploader);
app.component(VueCountdown.name, VueCountdown);
import Hdatepicker from "@/components/forms/Hdatepicker.vue";
import calendarLocalConfig from "@/i18n/calendarLocalConfig";

app.component('h-date-picker', Hdatepicker);

app.use(Vue3PersianDatetimePicker, {
    name: 'CustomDatePicker',
    props: {
        locale: localStorage.getItem('UI_LANG'),
        color: "#3059ab",
        format: calendarLocalConfig.format(localStorage.getItem('UI_CALENDAR')),
        displayFormat: calendarLocalConfig.format(localStorage.getItem('UI_CALENDAR')),
        editable: false,
        autoSubmit: true,
        localeConfig: calendarLocalConfig.data().localeConfig
    }
})
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
NProgress.configure({ showSpinner: false });
app.config.globalProperties.$API_URL = getApiUrl();
axios.defaults.baseURL = app.config.globalProperties.$API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['activeBid'] = localStorage.getItem('activeBid');
axios.defaults.headers.common['activeYear'] = localStorage.getItem('activeYear');
axios.defaults.headers.common['activeMoney'] = localStorage.getItem('activeMoney');
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();

    return config;
}, function (error) {
    // Do something with request error
    console.log('Error');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response data
    NProgress.done()
    return response;
}, function (error) {
    if (error.code === 404) {
        // Do something with response error
        Swal.fire({
            text: 'اتصال با سرویس دهنده برقرار نشد. لطفا اتصال اینترنت خود را بررسی نمایید.',
            icon: 'error',
            confirmButtonText: 'قبول'
        });
    }
    return Promise.reject(error);
});
app.use(router)
app.use(money)
app.use(LoadingPlugin)
app.use(pinia)
app.use(i18n)
app.use(vuetify);

//global methods
app.config.globalProperties.$filters = {
    formatNumber(value) {
        let result = parseFloat(value).toFixed(0).toString();
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return result;
    },
    onlyNumber($event) {
        //console.log($event.keyCode); //keyCodes value
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
            $event.preventDefault();
        }
    },
    getApiUrl() {
        return getApiUrl();
    },
    getActiveMoney() {
        return {
            name: localStorage.getItem('activeMoney'),
            symbol: localStorage.getItem('activeMoneySymbol'),
            shortName: localStorage.getItem('activeMoneyShortName'),
        };
    },
    async isLogin() {
        let result = await axios.get('/api/user/check/login');
        return result.status === 200;
    }
}

app.config.globalProperties.app_isLogin = async () => {
    let result = await axios.get('/api/user/check/login');
    if (result.status === 200) {
        return result.data.result;
    } else {
        return false;
    }
}
app.mount('#page-container')