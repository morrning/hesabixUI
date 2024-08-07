import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import 'vue3-tel-input/dist/vue3-tel-input.css'
// @ts-ignore
import VueCountdown from '@chenfengyuan/vue-countdown';
import Vue3EasyDataTable from "vue3-easy-data-table";
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';
import 'vue3-easy-data-table/dist/style.css';
import {getApiUrl} from "../hesabixConfig"
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('DatePicker', Vue3PersianDatetimePicker);
app.config.globalProperties.$API_URL = getApiUrl();
axios.defaults.baseURL = app.config.globalProperties.$API_URL;

app.use(router)
//global methods
app.config.globalProperties.$filters = {
    formatNumber(value: string) {
        let result = parseFloat(value).toFixed(0).toString();
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return result;
    },
    getApiUrl(){
        return getApiUrl();
    },
    async isLogin(){
        let result = await axios.get('/api/user/check/login');
        return result.status === 200;
    }
}
app.mount('#page-container')
