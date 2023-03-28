import { createApp } from 'vue'
import installElementPlus from './plugins/element'
import './plugins/axios'
import App from './App.vue'

import './assets/main.css'
const app = createApp(App)
installElementPlus(app)
app.mount('#app')
