import 'vue-toastification/dist/index.css'
import '#/assets/main.css'
import 'primeicons/primeicons.css'
import { SECOND } from '#/constans.ts'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)

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
