import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' 
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)

// Inicializar tema após o Pinia estar configurado
import { useUIStore } from './store/ui.store'
const uiStore = useUIStore()
uiStore.initializeTheme()

app.mount('#app')
