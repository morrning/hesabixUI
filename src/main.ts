import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/site.css'
import config from "/config/config.js"

const app = createApp(App)

app.use(router)
app.config.globalProperties.app_api_url = config.api_url
app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"