import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { i18nOptions } from './locales/i18nUtils'
import { useUIStore } from './store/ui.store'
import { useAuthStore } from './store/auth.store'
import { useThemeStore } from './store/theme.store'


const i18n = createI18n(i18nOptions);
const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(i18n);
app.use(router)

const uiStore = useUIStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()

// Inicializar configurações
uiStore.initializeTheme()
authStore.initializeAuth()
themeStore.initializeTheme()

app.mount('#app')
