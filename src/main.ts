import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { plugin, defaultConfig } from '@formkit/vue'
import { fa } from '@formkit/i18n'
// @ts-ignore
import VueGravatar from "vue3-gravatar";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
//axios.defaults.baseURL = "https://hesabix.ir";
axios.defaults.baseURL = "http://localhost";

const app = createApp(App)


app.use(router)
app.use(VueGravatar)
app.use(plugin, defaultConfig({
    theme: 'genesis',
    locales: { fa },
    locale: 'fa',
}))

//global methods
app.config.globalProperties.$filters = {
    formatNumber(value: string) {
        let result = parseFloat(value).toFixed(0).toString();
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return result;
    }
}
app.mount('#page-container')