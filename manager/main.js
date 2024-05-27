import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

// @ts-ignore
import VueGravatar from "vue3-gravatar";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import money from 'v-money3';
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';
import NProgress from "nprogress";
import Swal from "sweetalert2";
import CKEditor from '@ckeditor/ckeditor5-vue';
// Import translations for the Persian language.
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('v-select', vSelect);
app.component('DatePicker', Vue3PersianDatetimePicker)
import {getApiUrl} from "../hesabixConfig"

axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
NProgress.configure({ showSpinner: false });
app.config.globalProperties.$API_URL = getApiUrl();
axios.defaults.baseURL = app.config.globalProperties.$API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    NProgress.start();

    return config;
}, function(error) {
    // Do something with request error
    console.log('Error');
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    // Do something with response data
    NProgress.done()
    return response;
}, function(error) {
    if(error.code === 404){
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
app.use(VueGravatar)
app.use(money)
app.use(CKEditor)
app.use(LoadingPlugin)

app.use(Vue3PersianDatetimePicker, {
    name: 'CustomDatePicker',
    props: {
        format: 'jYYYY/jMM/jDD',
        editable: false,
        inputClass: '',
        placeholder: 'انتخاب تاریخ',
        color: '#3a3a3a',
        autoSubmit: true,
        //...
        //... And whatever you want to set as default.
        //...
    }
})

//global methods
app.config.globalProperties.$filters = {
    formatNumber(value) {
        let result = parseFloat(value).toFixed(0).toString();
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return result;
    },
    onlyNumber ($event) {
        //console.log($event.keyCode); //keyCodes value
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
            $event.preventDefault();
        }
    },
    getApiUrl(){
        return getApiUrl();
    }
}

app.config.globalProperties.app_isLogin =  async () => {
    let result = await axios.get('/api/user/check/login');
    if(result.status === 200){
        return result.data.result;
    }
    else{
        return false;
    }
}
app.mount('#page-container')
