<template>
  <!-- Topbar Component - Barra superior com controles do usuário -->
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 lg:px-6">
    <!-- Botão de menu mobile -->
    <button
      v-if="isMobile"
      @click="toggleSidebar"
      class="lg:hidden topbar-button"
      :aria-label="$t('layout.topbar.toggleMenu')"
    >
      <Icon icon="mdi:menu" class="h-5 w-5" />
    </button>

    <!-- Breadcrumb/Título da página -->
    <div class="flex-1">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
            <router-link
              v-if="item.href && index < breadcrumbs.length - 1"
              :to="item.href"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ item.label }}
            </router-link>
            <span
              v-else
              class="text-sm font-medium"
              :class="index === breadcrumbs.length - 1 ? 'text-foreground' : 'text-muted-foreground'"
            >
              {{ item.label }}
            </span>
            <Icon
              v-if="index < breadcrumbs.length - 1"
              icon="mdi:chevron-right"
              class="mx-2 h-4 w-4 text-muted-foreground"
            />
          </li>
        </ol>
      </nav>
    </div>

    <!-- Controles da direita -->
    <div class="flex items-center gap-1">
      <!-- Seletor de idioma -->
      <div class="relative" @click.stop>
        <button
          @click="toggleLanguageDropdown"
          class="topbar-button"
          :class="{ 'bg-muted text-foreground': languageDropdownOpen }"
          :aria-label="$t('layout.topbar.language.toggle')"
          :aria-expanded="languageDropdownOpen"
        >
          <Icon icon="mdi:translate" class="h-4 w-4" />
        </button>
        
        <!-- Dropdown de idiomas -->
        <div
          v-show="languageDropdownOpen"
          class="dropdown-menu"
        >
            <div class="p-1">
              <div class="px-3 py-2 border-b border-border mb-1">
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
                <span class="text-lg mr-2">{{ lang.flag }}</span>
                <span class="flex-1 text-left">{{ lang.name }}</span>
                <Icon 
                  v-if="currentLanguage === lang.code" 
                  icon="mdi:check" 
                  class="h-4 w-4 text-primary ml-2" 
                />
              </button>
            </div>
        </div>
      </div>

      <!-- Toggle de tema -->
      <button
        @click="toggleTheme"
        class="topbar-button"
        :aria-label="$t('layout.topbar.theme.toggle')"
      >
        <Transition name="theme-rotate" mode="out-in">
          <Icon v-if="isDark" icon="mdi:weather-sunny" class="h-4 w-4" />
          <Icon v-else icon="mdi:weather-night" class="h-4 w-4" />
        </Transition>
      </button>

      <!-- Notificações -->
      <div class="relative" @click.stop>
        <button
          @click="toggleNotifications"
          class="topbar-button relative"
          :class="{ 'bg-muted text-foreground': notificationsOpen }"
          :aria-label="$t('layout.topbar.notifications.toggle')"
          :aria-expanded="notificationsOpen"
        >
          <Icon icon="mdi:bell" class="h-4 w-4" />
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white ring-2 ring-background"
          >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </button>

        <!-- Dropdown de notificações -->
        <Transition name="dropdown">
          <div
            v-if="notificationsOpen"
            class="dropdown-menu w-80"
            @click.stop
          >
            <!-- Header das notificações -->
            <div class="p-4 border-b border-border">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-semibold text-foreground">
                  {{ $t('layout.topbar.notifications.title') }}
                </h3>
                <span 
                  v-if="unreadCount > 0"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  {{ unreadCount }} {{ $t('layout.topbar.notifications.unread') }}
                </span>
              </div>
              
              <!-- Ações das notificações -->
              <div v-if="notifications.length > 0" class="flex items-center gap-2">
                <button
                  v-if="unreadCount > 0"
                  @click="markAllAsRead"
                  class="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {{ $t('layout.topbar.notifications.markAllRead') }}
                </button>
                <button
                  @click="clearAllNotifications"
                  class="text-xs text-muted-foreground hover:text-destructive font-medium transition-colors"
                >
                  {{ $t('layout.topbar.notifications.clearAll') }}
                </button>
              </div>
            </div>
            
            <!-- Lista de notificações -->
            <div class="max-h-64 overflow-y-auto">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                :class="!notification.read ? 'bg-primary/5' : ''"
              >
                <div class="flex-shrink-0 mt-1">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="getNotificationBgColor(notification.type)"
                  >
                    <Icon
                      :icon="getNotificationIcon(notification.type)"
                      class="h-4 w-4"
                      :class="getNotificationIconColor(notification.type)"
                    />
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex-1">
                      <p class="text-sm font-medium text-foreground leading-tight">
                        {{ notification.title }}
                      </p>
                      <p class="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {{ notification.message }}
                      </p>
                      <p class="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Icon icon="mdi:clock-outline" class="h-3 w-3" />
                        {{ formatNotificationTime(notification.timestamp) }}
                      </p>
                    </div>
                    
                    <!-- Ações da notificação -->
                    <div class="flex flex-col gap-1">
                      <button
                        v-if="!notification.read"
                        @click="markAsRead(notification.id)"
                        class="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        :title="$t('layout.topbar.notifications.markAsRead')"
                      >
                        <Icon icon="mdi:check" class="h-3 w-3" />
                      </button>
                      <button
                        @click="deleteNotification(notification.id)"
                        class="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        :title="$t('layout.topbar.notifications.delete')"
                      >
                        <Icon icon="mdi:close" class="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Estado vazio -->
              <div v-if="notifications.length === 0" class="text-center py-8">
                <Icon icon="mdi:bell-outline" class="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p class="text-sm text-muted-foreground">
                  {{ $t('layout.topbar.notifications.empty') }}
                </p>
              </div>
            </div>
            
            <!-- Footer das notificações -->
            <div v-if="notifications.length > 0" class="p-3 border-t border-border">
              <button class="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
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
          :class="{ 'bg-muted': userMenuOpen }"
          :aria-label="$t('layout.topbar.user.menu')"
          :aria-expanded="userMenuOpen"
        >
          <div class="h-7 w-7 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
            <Icon icon="mdi:account" class="h-4 w-4 text-primary" />
          </div>
          <span class="hidden md:block text-sm font-medium text-foreground max-w-32 truncate">
            {{ userDisplayName }}
          </span>
          <Icon 
            icon="mdi:chevron-down" 
            class="h-3 w-3 text-muted-foreground transition-transform duration-200"
            :class="userMenuOpen ? 'rotate-180' : ''"
          />
        </button>

        <!-- Dropdown do usuário -->
        <Transition name="dropdown">
          <div
            v-if="userMenuOpen"
            class="dropdown-menu w-64"
            @click.stop
          >
            <!-- Informações do usuário -->
            <div class="p-4 border-b border-border">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <Icon icon="mdi:account" class="h-5 w-5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-foreground truncate">{{ userDisplayName }}</p>
                  <p class="text-xs text-muted-foreground truncate">{{ userEmail }}</p>
                </div>
              </div>
            </div>

            <!-- Opções do menu -->
            <div class="p-2">
              <button
                @click="goToProfile"
                class="dropdown-item"
              >
                <Icon icon="mdi:account-circle" class="h-4 w-4" />
                <span>{{ $t('layout.topbar.user.profile') }}</span>
              </button>

              <button
                @click="openChangePasswordModal"
                class="dropdown-item"
              >
                <Icon icon="mdi:lock-reset" class="h-4 w-4" />
                <span>{{ $t('layout.topbar.user.changePassword') }}</span>
              </button>

              <button
                @click="goToSettings"
                class="dropdown-item"
              >
                <Icon icon="mdi:cog" class="h-4 w-4" />
                <span>{{ $t('layout.topbar.user.settings') }}</span>
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
const userDisplayName = computed(() => authStore.user?.name || 'Usuário');
const userEmail = computed(() => authStore.user?.email || 'user@example.com');

// Idiomas disponíveis
const availableLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

// Mock de notificações
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
    read: false
  }
]);

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

// Breadcrumbs baseado na rota atual
const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  const crumbs = [{ label: t('layout.breadcrumb.home'), href: '/dashboard' }];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    crumbs.push({
      label: t(`layout.breadcrumb.${segment}`, segment),
      href: isLast ? currentPath : currentPath
    });
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
  localStorage.setItem('user-locale', langCode);
  languageDropdownOpen.value = false;
  toast.success(t('layout.topbar.language.changed'));
}

function toggleTheme() {
  themeStore.toggleTheme();
  const message = isDark.value ? t('layout.topbar.theme.darkEnabled') : t('layout.topbar.theme.lightEnabled');
  toast.info(message);
}

function getNotificationIcon(type: string) {
  const icons = {
    alert: 'mdi:alert-circle',
    info: 'mdi:information',
    success: 'mdi:check-circle',
    warning: 'mdi:alert'
  } as const;
  return icons[type as keyof typeof icons] || 'mdi:bell';
}

function getNotificationBgColor(type: string) {
  const colors = {
    alert: 'bg-red-100 dark:bg-red-900/30',
    info: 'bg-blue-100 dark:bg-blue-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30'
  } as const;
  return colors[type as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/30';
}

function getNotificationIconColor(type: string) {
  const colors = {
    alert: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400'
  };
  return colors[type as keyof typeof colors] || 'text-gray-600 dark:text-gray-400';
}

function formatNotificationTime(timestamp: Date) {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 1) return t('layout.topbar.notifications.time.now');
  if (minutes < 60) return t('layout.topbar.notifications.time.minutes', { count: minutes });
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t('layout.topbar.notifications.time.hours', { count: hours });
  
  const days = Math.floor(hours / 24);
  return t('layout.topbar.notifications.time.days', { count: days });
}

function markAsRead(notificationId: number) {
  const notification = notifications.value.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    toast.success(t('layout.topbar.notifications.markedAsRead'));
  }
}

function markAllAsRead() {
  const unreadNotifications = notifications.value.filter(n => !n.read);
  unreadNotifications.forEach(n => n.read = true);
  toast.success(t('layout.topbar.notifications.allMarkedAsRead', { count: unreadNotifications.length }));
}

function deleteNotification(notificationId: number) {
  const index = notifications.value.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications.value.splice(index, 1);
    toast.success(t('layout.topbar.notifications.deleted'));
  }
}

function clearAllNotifications() {
  if (notifications.value.length > 0) {
    const count = notifications.value.length;
    notifications.value.splice(0);
    toast.success(t('layout.topbar.notifications.allCleared', { count }));
  }
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
  userMenuOpen.value = false;
  // Aqui você implementaria a abertura do modal de mudança de senha
  toast.info(t('layout.topbar.user.changePasswordModal'));
}

function confirmLogout() {
  userMenuOpen.value = false;
  // Confirmar logout com toast
  if (confirm(t('layout.topbar.user.confirmLogout'))) {
    authStore.logout();
    router.push('/login');
    toast.success(t('layout.topbar.user.loggedOut'));
  }
}
</script>

<style scoped>
/* Botões da topbar */
.topbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  color: var(--sidebar-text-muted);
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.topbar-button:hover {
  background-color: var(--sidebar-item-hover);
  color: hsl(var(--foreground));
}

.topbar-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--sidebar-primary);
}

.topbar-button-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.topbar-button-user:hover {
  background-color: var(--sidebar-item-hover);
}

.topbar-button-user:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--sidebar-primary);
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  min-width: 12rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  pointer-events: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: hsl(var(--foreground));
  text-align: left;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--sidebar-item-hover);
}

.dropdown-item-active {
  background-color: var(--sidebar-primary-hover);
  color: var(--sidebar-primary);
}

/* Transições */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.theme-rotate-enter-active,
.theme-rotate-leave-active {
  transition: all 0.3s ease;
}

.theme-rotate-enter-from,
.theme-rotate-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.8);
}

/* Scrollbar personalizada para notificações */
.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-64::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-64::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 2px;
}

.max-h-64::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}
</style> 