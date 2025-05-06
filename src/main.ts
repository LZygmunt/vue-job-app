import 'vue-toastification/dist/index.css'
import '#/assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import { SECOND } from '#/constans.ts'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.use(pinia)

const toastOptions: PluginOptions = {
  maxToasts: 5,
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5 * SECOND,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  toastClassName: 'moje-toast',
}
app.use(Toast, toastOptions)

app.mount('#app')
