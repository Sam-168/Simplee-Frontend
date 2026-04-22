import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// Register service worker
//if ('serviceWorker' in navigator) {
//  window.addEventListener('load', () => {
//    navigator.serviceWorker.register('/sw.js')
//      .then(() => console.log('Service worker registered'))
//      .catch(err => console.log('Service worker failed:', err))
//  })
//}