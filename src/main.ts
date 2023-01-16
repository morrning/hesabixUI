import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/site.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"