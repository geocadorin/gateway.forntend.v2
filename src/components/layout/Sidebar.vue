<template>
  <!-- Sidebar Component - Navegação principal da aplicação -->
  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 border-r',
      'bg-[var(--sidebar-background)] border-[var(--sidebar-border)]',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Cabeçalho da Sidebar -->
    <div class="flex h-16 items-center justify-center px-4 border-b border-l border-[var(--sidebar-border)]">
      <div v-show="!isCollapsed" class="flex items-center justify-center w-full space-x-3 transition-opacity duration-200">
        <img src="@/assets/images/LogoExtend.png" alt="OnBoard Logo" class="h-10 w-auto mx-auto" />
      </div>
      
      <div v-show="isCollapsed" class="flex items-center justify-center w-full">
        <img src="@/assets/images/LogoExtend.png" alt="OnBoard Logo" class="h-8 w-auto mx-auto" />
      </div>
      
      <!-- Botões de controle -->
      <div class="flex items-center space-x-1">
        <!-- Botão para expandir/recolher (desktop) -->
        <button
          v-if="!isMobile"
          @click="toggleCollapse"
          class="hidden lg:flex p-2 rounded-md text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-item-hover)] hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-primary)] focus:ring-opacity-50"
          :aria-label="isCollapsed ? $t('layout.sidebar.expand') : $t('layout.sidebar.collapse')"
        >
          <Icon 
            :icon="isCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" 
            class="h-4 w-4 transition-transform duration-200" 
          />
        </button>
        
        <!-- Botão para fechar sidebar no mobile -->
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 rounded-md text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-item-hover)] hover:text-foreground transition-colors"
          :aria-label="$t('layout.sidebar.close')"
        >
          <Icon icon="mdi:close" class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Navegação principal -->
    <nav class="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-thin">
      <!-- Seção: Painel Principal -->
      <div class="space-y-2">
        <h3 
          v-show="!isCollapsed" 
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider transition-opacity duration-200"
        >
          {{ $t('layout.sidebar.sections.dashboard') }}
        </h3>
        <ul class="space-y-1">
          <li>
            <router-link
              to="/dashboard"
              v-slot="{ isActive, href, navigate }"
            >
              <a
                :href="href"
                @click="navigate"
                class="sidebar-item group"
                :class="{ 'sidebar-item-active': isActive }"
                :title="isCollapsed ? $t('layout.sidebar.menu.dashboard') : ''"
              >
                <Icon icon="mdi:view-dashboard" class="sidebar-icon" />
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.dashboard') }}
                </span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link
              to="/analytics"
              v-slot="{ isActive, href, navigate }"
            >
              <a
                :href="href"
                @click="navigate"
                class="sidebar-item group"
                :class="{ 'sidebar-item-active': isActive }"
                :title="isCollapsed ? $t('layout.sidebar.menu.analytics') : ''"
              >
                <Icon icon="mdi:chart-line" class="sidebar-icon" />
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.analytics') }}
                </span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Seção: Monitoramento -->
      <div class="space-y-2">
        <h3 
          v-show="!isCollapsed" 
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider transition-opacity duration-200"
        >
          {{ $t('layout.sidebar.sections.monitoring') }}
        </h3>
        <ul class="space-y-1">
          <!-- Menu dropdown para Telemetria -->
          <li>
            <button
              @click="!isCollapsed && toggleSubmenu('telemetry')"
              class="sidebar-item group w-full justify-between"
              :class="{ 'cursor-default': isCollapsed }"
              :title="isCollapsed ? $t('layout.sidebar.menu.telemetry.title') : ''"
            >
              <div class="flex items-center">
                <Icon icon="mdi:satellite-variant" class="sidebar-icon" />
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.telemetry.title') }}
                </span>
              </div>
              <Icon 
                v-show="!isCollapsed"
                icon="mdi:chevron-down" 
                class="h-4 w-4 transition-transform duration-200 text-[var(--sidebar-text-muted)] group-hover:text-foreground"
                :class="submenuOpen.telemetry ? 'rotate-180' : ''"
              />
            </button>
            
            <!-- Submenu Telemetria -->
            <Transition name="slide-down">
              <ul v-show="submenuOpen.telemetry && !isCollapsed" class="mt-1 ml-6 space-y-1">
                <li>
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.telemetry.realTime')"
                  >
                    <Icon icon="mdi:clock-outline" class="sidebar-submenu-icon" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.telemetry.realTime') }}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.telemetry.history')"
                  >
                    <Icon icon="mdi:history" class="sidebar-submenu-icon" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.telemetry.history') }}
                    </span>
                  </a>
                </li>
              </ul>
            </Transition>
          </li>

          <!-- Menu dropdown para Alertas -->
          <li>
            <button
              @click="!isCollapsed && toggleSubmenu('alerts')"
              class="sidebar-item group w-full justify-between"
              :class="{ 'cursor-default': isCollapsed }"
              :title="isCollapsed ? $t('layout.sidebar.menu.alerts.title') : ''"
            >
              <div class="flex items-center">
                <div class="relative">
                  <Icon icon="mdi:alert-circle" class="sidebar-icon" />
                  <span 
                    v-if="alertCount > 0" 
                    class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px] h-[18px]"
                  >
                    {{ alertCount > 9 ? '9+' : alertCount }}
                  </span>
                </div>
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.alerts.title') }}
                </span>
                <span 
                  v-if="alertCount > 0 && !isCollapsed" 
                  class="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
                >
                  {{ alertCount }}
                </span>
              </div>
              <Icon 
                v-show="!isCollapsed && alertCount === 0"
                icon="mdi:chevron-down" 
                class="h-4 w-4 transition-transform duration-200 text-[var(--sidebar-text-muted)] group-hover:text-foreground"
                :class="submenuOpen.alerts ? 'rotate-180' : ''"
              />
            </button>
            
            <!-- Submenu Alertas -->
            <Transition name="slide-down">
              <ul v-show="submenuOpen.alerts && !isCollapsed" class="mt-1 ml-6 space-y-1">
                <li>
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.alerts.active')"
                  >
                    <Icon icon="mdi:bell-ring" class="sidebar-submenu-icon" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.alerts.active') }}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.alerts.history')"
                  >
                    <Icon icon="mdi:bell-outline" class="sidebar-submenu-icon" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.alerts.history') }}
                    </span>
                  </a>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </div>

      <!-- Seção: Configurações -->
      <div class="space-y-2">
        <h3 
          v-show="!isCollapsed" 
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider transition-opacity duration-200"
        >
          {{ $t('layout.sidebar.sections.settings') }}
        </h3>
        <ul class="space-y-1">
          <li>
            <a
              href="#"
              class="sidebar-item group"
              :title="isCollapsed ? $t('layout.sidebar.menu.settings') : ''"
            >
              <Icon icon="mdi:cog" class="sidebar-icon" />
              <span v-show="!isCollapsed" class="sidebar-text">
                {{ $t('layout.sidebar.menu.settings') }}
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="sidebar-item group"
              :title="isCollapsed ? $t('layout.sidebar.menu.users') : ''"
            >
              <Icon icon="mdi:account-group" class="sidebar-icon" />
              <span v-show="!isCollapsed" class="sidebar-text">
                {{ $t('layout.sidebar.menu.users') }}
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Seção: Showcase (apenas para desenvolvimento) -->
      <div class="space-y-2">
        <h3 
          v-show="!isCollapsed" 
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider transition-opacity duration-200"
        >
          {{ $t('layout.sidebar.sections.showcase') }}
        </h3>
        <ul class="space-y-1">
          <li>
            <router-link
              to="/showcase"
              v-slot="{ isActive, href, navigate }"
            >
              <a
                :href="href"
                @click="navigate"
                class="sidebar-item group"
                :class="{ 'sidebar-item-active': isActive }"
                :title="isCollapsed ? $t('layout.sidebar.menu.showcase') : ''"
              >
                <Icon icon="mdi:palette" class="sidebar-icon" />
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.showcase') }}
                </span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>

  <!-- Overlay para mobile -->
  <div
    v-if="sidebarOpen && isMobile"
    @click="toggleSidebar"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, onUnmounted, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

// Composables
const route = useRoute();
const { t, locale } = useI18n();

// Props e emits para comunicação com o layout pai
const sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref(false));
const toggleSidebar = inject<() => void>('toggleSidebar', () => {});
const isCollapsed = inject<Ref<boolean>>('sidebarCollapsed', ref(false));
const isMobile = ref(false);
const submenuOpen = ref({
  telemetry: false,
  alerts: false
});

// Mock de dados para contador de alertas
const alertCount = ref(3);

// Detectar se é mobile
function checkMobile() {
  isMobile.value = window.innerWidth < 1024;
}

// Métodos
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  // Salvar preferência no localStorage
  localStorage.setItem('sidebar-collapsed', isCollapsed.value.toString());
}

function toggleSubmenu(menu: keyof typeof submenuOpen.value) {
  submenuOpen.value[menu] = !submenuOpen.value[menu];
}

// Inicializar estado do collapse baseado na preferência salva
function initializeCollapse() {
  const saved = localStorage.getItem('sidebar-collapsed');
  if (saved !== null) {
    isCollapsed.value = saved === 'true';
  }
}

// Fechar submenus quando sidebar é colapsada
function handleCollapseChange() {
  if (isCollapsed.value) {
    submenuOpen.value.telemetry = false;
    submenuOpen.value.alerts = false;
  }
}

// Watcher para mudanças no estado de collapse
watch(() => isCollapsed.value, handleCollapseChange);

// Watcher para forçar reatividade nas traduções
watch(() => locale.value, () => {
  // Força a atualização das traduções da sidebar
}, { immediate: true });

// Lifecycle
onMounted(() => {
  initializeCollapse();
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
/* Classes reutilizáveis para itens da sidebar */
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  color: var(--sidebar-text-muted);
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: var(--sidebar-item-hover);
  color: hsl(var(--foreground));
}

.sidebar-item:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--sidebar-primary);
}

.sidebar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sidebar-primary-hover);
  transform: translateX(-100%);
  transition: transform 0.2s ease-out;
}

.sidebar-item:hover::before {
  transform: translateX(0);
}

.sidebar-item-active {
  background-color: var(--sidebar-primary-selected);
  color: var(--sidebar-text-selected);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.sidebar-item-active::before {
  display: none;
}

.sidebar-item-active:hover {
  background-color: var(--sidebar-primary-selected);
  color: var(--sidebar-text-selected);
}

.sidebar-icon {
  margin-right: 0.75rem;
  height: 1.25rem;
  width: 1.25rem;
  flex-shrink: 0;
  transition: color 0.2s;
  position: relative;
  z-index: 1;
}

.sidebar-text {
  transition: opacity 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
}

.sidebar-submenu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  color: var(--sidebar-text-muted);
  text-decoration: none;
}

.sidebar-submenu-item:hover {
  background-color: var(--sidebar-item-hover);
  color: hsl(var(--foreground));
}

.sidebar-submenu-item:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--sidebar-primary);
}

.sidebar-submenu-icon {
  margin-right: 0.75rem;
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  transition: color 0.2s;
}

.sidebar-submenu-text {
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Transições para submenus */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

/* Scrollbar personalizada */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: var(--sidebar-border);
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: var(--sidebar-text-muted);
}

/* Animações de microinteração */
.sidebar-item:active {
  transform: scale(0.95);
}

.sidebar-submenu-item:active {
  transform: scale(0.95);
}

/* Estados de foco melhorados */
.sidebar-item:focus-visible,
.sidebar-submenu-item:focus-visible {
  box-shadow: 0 0 0 2px var(--sidebar-primary), 0 0 0 4px rgba(0, 0, 0, 0.1);
}
</style> 