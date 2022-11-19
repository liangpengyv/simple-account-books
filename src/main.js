import { createApp } from 'vue'
import NaiveProvider from './components/common/NaiveProvider.vue'
import router from './router'
import pinia from './stores'
import './assets/main.css'

const app = createApp(NaiveProvider)
app.use(router)
app.use(pinia)
app.mount('#app')
