import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { plugin, defaultConfig } from '@formkit/vue'
import { fa } from '@formkit/i18n'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import 'maz-ui/css/main.css'
// @ts-ignore
import VueGravatar from "vue3-gravatar";
import VueCountdown from '@chenfengyuan/vue-countdown';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
const app = createApp(App)

app.config.globalProperties.$API_URL = 'http://localhost';
//app.config.globalProperties.$API_URL = 'https://hesabix.ir';
//app.config.globalProperties.$API_URL = 'http://hesabix.local';

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
    }
}
app.mount('#page-container')
