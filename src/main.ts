import { createApp } from 'vue'
import { createI18n, type I18nOptions } from 'vue-i18n';
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { i18nOptions } from './locales/i18nUtils'


const i18n = createI18n(i18nOptions);

const app = createApp(App)
const pinia = createPinia();
app.use(i18n);

app.use(router)
app.use(pinia)

// Inicializar tema após o Pinia estar configurado
import { useUIStore } from './store/ui.store'
const uiStore = useUIStore()
uiStore.initializeTheme()

app.mount('#app')
