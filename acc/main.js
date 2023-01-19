import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from "/config/config.js"


const app = createApp(App)

app.use(router)
app.config.globalProperties.app_api_url = config.api_url
app.mount('#page-container')