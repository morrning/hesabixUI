import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { plugin, defaultConfig } from '@formkit/vue'
import { fa } from '@formkit/i18n'
// @ts-ignore
import VueGravatar from "vue3-gravatar";

const app = createApp(App)
axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
app.use(router)
app.use(VueGravatar)
app.use(plugin, defaultConfig({
    locales: { fa },
    locale: 'fa',
}))
app.mount('#page-container')
