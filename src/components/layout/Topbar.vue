<template>
  <!-- Topbar Component - Barra superior com controles do usuário -->
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/95 backdrop-blur-md px-4 lg:px-6 shadow-sm">
    <!-- Botão de menu mobile -->
    <button
      v-if="isMobile"
      @click="toggleSidebar"
      class="lg:hidden topbar-button"
      :aria-label="$t('layout.topbar.toggleMenu')"
    >
      <Icon icon="mdi:menu" class="h-5 w-5" />
      <span class="sr-only">{{ $t('layout.topbar.toggleMenu') }}</span>
    </button>

    <!-- Breadcrumb/Título da página -->
    <div class="flex-1">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
            <router-link
              v-if="item.href && index < breadcrumbs.length - 1"
              :to="item.href"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 px-2 py-1 rounded-md hover:bg-muted/50"
            >
              {{ item.label }}
            </router-link>
            <span
              v-else
              class="text-sm font-semibold px-2 py-1 rounded-md"
              :class="index === breadcrumbs.length - 1 ? 'text-foreground bg-primary/10' : 'text-muted-foreground'"
            >
              {{ item.label }}
            </span>
            <Icon
              v-if="index < breadcrumbs.length - 1"
              icon="mdi:chevron-right"
              class="mx-2 h-4 w-4 text-muted-foreground transition-transform duration-200"
            />
          </li>
        </ol>
      </nav>
    </div>

    <!-- Controles da direita -->
          <div class="flex items-center space-x-2">
      <!-- Seletor de idioma -->
      <div class="relative" @click.stop>
        <button
          @click="toggleLanguageDropdown"
          class="topbar-button"
          :class="{ 'topbar-button-active': languageDropdownOpen }"
          :aria-label="$t('layout.topbar.language.toggle')"
          :aria-expanded="languageDropdownOpen"
        >
          <Icon icon="mdi:translate" class="h-4 w-4" />
          <span class="hidden sm:inline-block ml-2 text-xs font-medium">
            {{ currentLanguageFlag }}
          </span>
        </button>
        
        <!-- Dropdown de idiomas -->
        <Transition name="dropdown">
          <div
            v-show="languageDropdownOpen"
            class="dropdown-menu"
          >
            <div class="p-1">
              <div class="px-3 py-2 border-b border-border mb-1">
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center space-x-2">
                  <Icon icon="mdi:earth" class="h-3 w-3" />
                  {{ $t('layout.topbar.language.selectLanguage') }}
                </p>
              </div>
              <button
                v-for="lang in availableLanguages"
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                class="dropdown-item"
                :class="currentLanguage === lang.code ? 'dropdown-item-active' : ''"
              >
                <span class="text-lg mr-3">{{ lang.flag }}</span>
                <span class="flex-1 text-left font-medium">{{ lang.name }}</span>
                <Icon 
                  v-if="currentLanguage === lang.code" 
                  icon="mdi:check" 
                  class="h-4 w-4 text-primary ml-2" 
                />
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Toggle de tema -->
      <button
        @click="toggleTheme"
        class="topbar-button"
        :aria-label="$t('layout.topbar.theme.toggle')"
      >
        <Transition name="theme-rotate" mode="out-in">
          <Icon v-if="isDark" icon="mdi:weather-sunny" class="h-4 w-4 text-warning-500" />
          <Icon v-else icon="mdi:weather-night" class="h-4 w-4 text-info-600" />
        </Transition>
      </button>

      <!-- Notificações -->
      <div class="relative" @click.stop>
        <button
          @click="toggleNotifications"
          class="topbar-button relative"
          :class="{ 'topbar-button-active': notificationsOpen }"
          :aria-label="$t('layout.topbar.notifications.toggle')"
          :aria-expanded="notificationsOpen"
        >
          <Icon icon="mdi:bell" class="h-4 w-4" />
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-error-500 to-error-600 text-xs font-bold text-white ring-2 ring-background shadow-lg animate-pulse"
          >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </button>

        <!-- Dropdown de notificações -->
        <Transition name="dropdown">
          <div
            v-if="notificationsOpen"
            class="dropdown-menu w-96"
            @click.stop
          >
            <!-- Header das notificações -->
            <div class="p-4 border-b border-border bg-gradient-to-r from-background to-muted/30">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Icon icon="mdi:bell" class="h-5 w-5 text-primary" />
                  {{ $t('layout.topbar.notifications.title') }}
                </h3>
                <span 
                  v-if="unreadCount > 0"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-error-50 to-error-100 text-error-600 shadow-sm"
                >
                  {{ unreadCount }} {{ $t('layout.topbar.notifications.unread') }}
                </span>
              </div>
              
              <!-- Ações das notificações -->
              <div v-if="notifications.length > 0" class="flex items-center gap-3">
                <button
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-xs text-primary hover:text-primary/80 font-semibold transition-all duration-200 hover:scale-105 px-2 py-1 rounded-md hover:bg-primary/10"
                >
                  {{ $t('layout.topbar.notifications.markAllRead') }}
                </button>
                <button
                  @click="clearAllNotifications"
                  class="text-xs text-muted-foreground hover:text-destructive font-semibold transition-all duration-200 hover:scale-105 px-2 py-1 rounded-md hover:bg-destructive/10"
                >
                  {{ $t('layout.topbar.notifications.clearAll') }}
                </button>
              </div>
            </div>
            
            <!-- Lista de notificações -->
            <div class="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-item"
                :class="!notification.read ? 'notification-unread' : ''"
              >
                <div class="flex-shrink-0 mt-1">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110"
                    :class="getNotificationBgColor(notification.type)"
                  >
                    <Icon
                      :icon="getNotificationIcon(notification.type)"
                      class="h-5 w-5"
                      :class="getNotificationIconColor(notification.type)"
                    />
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between space-x-2">
                    <div class="flex-1">
                      <p class="text-sm font-semibold text-foreground leading-tight mb-1">
                        {{ notification.title }}
                      </p>
                      <p class="text-sm text-muted-foreground leading-relaxed mb-2">
                        {{ notification.message }}
                      </p>
                      <p class="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon icon="mdi:clock-outline" class="h-3 w-3" />
                        {{ formatNotificationTime(notification.timestamp) }}
                      </p>
                    </div>
                    
                    <!-- Ações da notificação -->
                    <div class="flex flex-col gap-1">
                      <button
                        v-if="!notification.read"
                        @click="markAsRead(notification.id)"
                        class="notification-action-btn notification-action-primary"
                        :title="$t('layout.topbar.notifications.markAsRead')"
                      >
                        <Icon icon="mdi:check" class="h-3 w-3" />
                      </button>
                      <button
                        @click="deleteNotification(notification.id)"
                        class="notification-action-btn notification-action-danger"
                        :title="$t('layout.topbar.notifications.delete')"
                      >
                        <Icon icon="mdi:close" class="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Estado vazio -->
              <div v-if="notifications.length === 0" class="text-center py-12">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Icon icon="mdi:bell-outline" class="h-8 w-8 text-muted-foreground" />
                </div>
                <p class="text-sm text-muted-foreground font-medium">
                  {{ $t('layout.topbar.notifications.empty') }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  Você está em dia com suas notificações!
                </p>
              </div>
            </div>
            
            <!-- Footer das notificações -->
            <div v-if="notifications.length > 0" class="p-3 border-t border-border bg-muted/30">
              <button class="w-full text-sm text-primary hover:text-primary/80 font-semibold transition-all duration-200 hover:scale-105 py-2 rounded-md hover:bg-primary/10">
                {{ $t('layout.topbar.notifications.viewAll') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Menu do usuário -->
      <div class="relative" @click.stop>
        <button
          @click="toggleUserMenu"
          class="topbar-button-user"
          :class="{ 'topbar-button-active': userMenuOpen }"
          :aria-label="$t('layout.topbar.user.menu')"
          :aria-expanded="userMenuOpen"
        >
          <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-600 border-2 border-primary/20 flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110">
            <Icon icon="mdi:account" class="h-4 w-4 text-white" />
          </div>
          <span class="hidden md:block text-sm font-semibold text-foreground max-w-32 truncate">
            {{ userDisplayName }}
          </span>
          <Icon 
            icon="mdi:chevron-down" 
            class="h-3 w-3 text-muted-foreground transition-all duration-200"
            :class="userMenuOpen ? 'rotate-180 text-primary' : ''"
          />
        </button>

        <!-- Dropdown do usuário -->
        <Transition name="dropdown">
          <div
            v-if="userMenuOpen"
            class="dropdown-menu w-72"
            @click.stop
          >
            <!-- Informações do usuário -->
            <div class="p-4 border-b border-border bg-gradient-to-r from-background to-muted/30">
              <div class="flex items-center gap-3">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-600 border-2 border-primary/20 flex items-center justify-center shadow-lg">
                  <Icon icon="mdi:account" class="h-6 w-6 text-white" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-foreground truncate">{{ userDisplayName }}</p>
                  <p class="text-xs text-muted-foreground truncate">{{ userEmail }}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                    <span class="text-xs text-success-600 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Opções do menu -->
                            <div style="padding: 0.5rem;">
              <button
                @click="goToProfile"
                class="dropdown-item"
              >
                <Icon icon="mdi:account-circle" class="h-4 w-4 text-info-500" />
                <span>{{ $t('layout.topbar.user.profile') }}</span>
                <Icon icon="mdi:chevron-right" class="h-3 w-3 ml-auto text-muted-foreground" />
              </button>

              <button
                @click="openChangePasswordModal"
                class="dropdown-item"
              >
                <Icon icon="mdi:lock-reset" class="h-4 w-4 text-warning-500" />
                <span>{{ $t('layout.topbar.user.changePassword') }}</span>
                <Icon icon="mdi:chevron-right" class="h-3 w-3 ml-auto text-muted-foreground" />
              </button>

              <button
                @click="goToSettings"
                class="dropdown-item"
              >
                <Icon icon="mdi:cog" class="h-4 w-4 text-muted-foreground" />
                <span>{{ $t('layout.topbar.user.settings') }}</span>
                <Icon icon="mdi:chevron-right" class="h-3 w-3 ml-auto text-muted-foreground" />
              </button>

              <div class="border-t border-border my-2"></div>

              <button
                @click="confirmLogout"
                class="dropdown-item text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Icon icon="mdi:logout" class="h-4 w-4" />
                <span>{{ $t('layout.topbar.user.logout') }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '../../store/theme.store';
import { useAuthStore } from '../../store/auth.store';
import { useToast } from 'vue-toastification';

// Composables
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const toast = useToast();

// Props e emits para comunicação com o layout pai
const toggleSidebar = inject<() => void>('toggleSidebar', () => {});

// Estado local
const languageDropdownOpen = ref(false);
const notificationsOpen = ref(false);
const userMenuOpen = ref(false);
const isMobile = ref(window.innerWidth <= 768);

// Fechar dropdowns ao clicar fora
function handleClickOutside() {
  languageDropdownOpen.value = false;
  notificationsOpen.value = false;
  userMenuOpen.value = false;
}

// Watcher para forçar reatividade nas traduções
watch(() => locale.value, () => {
  // Forçar re-renderização dos breadcrumbs e outras traduções
  nextTick(() => {
    // Força a atualização dos computed que dependem de traduções
  });
}, { immediate: true });

// Atualizar isMobile ao redimensionar a janela
function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

// Adicionar event listener para redimensionamento
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateIsMobile);
});

// Computed
const isDark = computed(() => themeStore.isDark);
const currentLanguage = computed(() => locale.value);
const currentLanguageFlag = computed(() => {
  const lang = availableLanguages.find(l => l.code === locale.value);
  return lang?.flag || '🌐';
});
const userDisplayName = computed(() => authStore.user?.name || 'Usuário');
const userEmail = computed(() => authStore.user?.email || 'user@example.com');

// Idiomas disponíveis
const availableLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

// Mock de notificações melhorado
const notifications = ref([
  {
    id: 1,
    type: 'alert',
    title: 'Alerta crítico detectado',
    message: 'Sensor de temperatura do dispositivo SAT-001 registrou 85°C',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false
  },
  {
    id: 2,
    type: 'info',
    title: 'Atualização disponível',
    message: 'Nova versão do firmware está disponível para download',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  },
  {
    id: 3,
    type: 'success',
    title: 'Backup concluído',
    message: 'Backup automático dos dados foi realizado com sucesso',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Bateria baixa',
    message: 'Dispositivo SAT-003 com nível de bateria em 15%',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true
  }
]);

// Computed para contadores
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

// Breadcrumbs melhorado
const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  const crumbs = [
    { label: t('layout.breadcrumb.home'), href: '/' }
  ];
  
  pathSegments.forEach((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = t(`layout.breadcrumb.${segment}`, segment);
    crumbs.push({ label, href: index === pathSegments.length - 1 ? '' : href });
  });
  
  return crumbs;
});

// Métodos
function toggleLanguageDropdown() {
  languageDropdownOpen.value = !languageDropdownOpen.value;
  notificationsOpen.value = false;
  userMenuOpen.value = false;
}

function toggleNotifications() {
  notificationsOpen.value = !notificationsOpen.value;
  languageDropdownOpen.value = false;
  userMenuOpen.value = false;
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
  languageDropdownOpen.value = false;
  notificationsOpen.value = false;
}

function changeLanguage(langCode: string) {
  locale.value = langCode;
  languageDropdownOpen.value = false;
  toast.success(t('layout.topbar.language.changed'));
}

function toggleTheme() {
  themeStore.toggleTheme();
  toast.success(t('layout.topbar.theme.changed'));
}

function markAsRead(notificationId: number) {
  const notification = notifications.value.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    toast.success(t('layout.topbar.notifications.markedAsRead'));
  }
}

function markAllAsRead() {
  notifications.value.forEach(n => n.read = true);
  toast.success(t('layout.topbar.notifications.allMarkedAsRead'));
}

function deleteNotification(notificationId: number) {
  const index = notifications.value.findIndex(n => n.id === notificationId);
  if (index > -1) {
    notifications.value.splice(index, 1);
    toast.success(t('layout.topbar.notifications.deleted'));
  }
}

function clearAllNotifications() {
  notifications.value.splice(0);
  toast.success(t('layout.topbar.notifications.allCleared'));
}

function getNotificationIcon(type: string) {
  const icons = {
    alert: 'mdi:alert-circle',
    warning: 'mdi:alert',
    success: 'mdi:check-circle',
    info: 'mdi:information'
  } as Record<string, string>;
  return icons[type] || 'mdi:bell';
}

function getNotificationBgColor(type: string) {
  const colors = {
    alert: 'bg-error-50',
    warning: 'bg-warning-50',
    success: 'bg-success-50',
    info: 'bg-info-50'
  } as Record<string, string>;
  return colors[type] || 'bg-muted';
}

function getNotificationIconColor(type: string) {
  const colors = {
    alert: 'text-error-600',
    warning: 'text-warning-600',
    success: 'text-success-600',
    info: 'text-info-600'
  } as Record<string, string>;
  return colors[type] || 'text-muted-foreground';
}

function formatNotificationTime(timestamp: Date) {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes}m atrás`;
  if (hours < 24) return `${hours}h atrás`;
  return `${days}d atrás`;
}

function goToProfile() {
  router.push('/profile');
  userMenuOpen.value = false;
}

function goToSettings() {
  router.push('/settings');
  userMenuOpen.value = false;
}

function openChangePasswordModal() {
  // Implementar modal de mudança de senha
  userMenuOpen.value = false;
  toast.info('Modal de mudança de senha será implementado');
}

function confirmLogout() {
  if (confirm(t('layout.topbar.user.confirmLogout'))) {
    authStore.logout();
    router.push('/login');
    toast.success(t('layout.topbar.user.loggedOut'));
  }
  userMenuOpen.value = false;
}
</script>

<style scoped>
/* Botões da topbar usando variáveis CSS e classes Tailwind */
  .topbar-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background: transparent;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    gap: 0.5rem;
    padding: 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.topbar-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--muted), var(--accent));
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.5rem;
  z-index: 0;
}

.topbar-button:hover::before {
  transform: scale(1);
}

.topbar-button:hover {
  color: var(--foreground);
  border-color: var(--border);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

  .topbar-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #64748b, 0 0 0 4px rgba(100, 116, 139, 0.2);
  }

.topbar-button > * {
  position: relative;
  z-index: 1;
}

.topbar-button-active {
  background-color: var(--muted);
  border-color: var(--border);
  color: var(--foreground);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.topbar-button-user {
    display: inline-flex;
    align-items: center;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
    gap: 0.75rem;
    padding: 0.375rem 0.75rem;
  color: var(--foreground);
  font-size: 0.875rem;
}

.topbar-button-user::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--muted), var(--accent));
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.75rem;
  z-index: 0;
}

.topbar-button-user:hover::before {
  transform: scale(1);
}

.topbar-button-user:hover {
  border-color: var(--border);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.topbar-button-user > * {
  position: relative;
  z-index: 1;
}

/* Dropdowns usando variáveis CSS e classes Tailwind */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    border: 1px solid var(--border);
    margin-top: 0.5rem;
    backdrop-filter: blur(12px);
    min-width: 12rem;
    border-radius: 0.75rem;
    padding: 0.5rem;
  z-index: 1000;
  background-color: hsl(var(--card) / 0.95);
  border-color: var(--border);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    font-weight: 500;
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    position: relative;
    overflow: hidden;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
  color: var(--foreground);
  margin: 0.125rem;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--muted), var(--accent));
  transform: translateX(-100%);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.dropdown-item:hover::before {
  transform: translateX(0);
}

.dropdown-item:hover {
  transform: translateX(4px);
}

.dropdown-item > * {
  position: relative;
  z-index: 1;
}

.dropdown-item-active {
  border-color: hsl(var(--primary) / 0.2);
  background: linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05));
  color: var(--primary);
}

/* Notificações usando variáveis CSS e classes Tailwind */
.notification-item {
    display: flex;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
    gap: 0.75rem;
    padding: 1rem;
}

.notification-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, hsl(var(--muted) / 0.5), transparent);
  transform: translateX(-100%);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.notification-item:hover::before {
  transform: translateX(0);
}

.notification-item:hover {
  transform: translateX(4px);
}

.notification-item > * {
  position: relative;
  z-index: 1;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-unread {
  border-left: 4px solid hsl(var(--primary));
  background: linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.02));
}

.notification-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.75rem;
    border-radius: 0.375rem;
    width: 1.5rem;
    height: 1.5rem;
}

.notification-action-primary {
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
}

.notification-action-primary:hover {
  background-color: hsl(var(--primary) / 0.2);
  transform: scale(1.1);
}

.notification-action-danger {
  background-color: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
}

.notification-action-danger:hover {
  background-color: hsl(var(--destructive) / 0.2);
  transform: scale(1.1);
}

/* Transições melhoradas */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.theme-rotate-enter-active,
.theme-rotate-leave-active {
  transition: all 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-rotate-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.theme-rotate-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

/* Responsividade */
@media (max-width: 768px) {
  .dropdown-menu {
    left: 0;
    right: 0;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .dropdown-menu.w-96 {
    width: auto;
  }
  
  .dropdown-menu.w-72 {
    width: auto;
  }
}
</style>

