import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { plugin, defaultConfig } from '@formkit/vue'
import { fa } from '@formkit/i18n'
import 'vue3-tel-input/dist/vue3-tel-input.css'
// @ts-ignore
import VueGravatar from "vue3-gravatar";
import VueCountdown from '@chenfengyuan/vue-countdown';
import Vue3EasyDataTable from "vue3-easy-data-table";
import 'vue3-easy-data-table/dist/style.css';
import {getApiUrl} from "../hesabixConfig"
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.config.globalProperties.$API_URL = getApiUrl();
axios.defaults.baseURL = app.config.globalProperties.$API_URL;

app.use(router)
app.use(VueGravatar)
app.use(plugin, defaultConfig({
    theme: 'genesis',
    locales: { fa },
    locale: 'fa',
}))
app.component(VueCountdown.name, VueCountdown);
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
