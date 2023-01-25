import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)
axios.defaults.headers.common['AUTH-TOKEN'] = localStorage.getItem('AUTH-TOKEN');
app.use(router)
app.mount('#page-container')
