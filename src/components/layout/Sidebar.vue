<template>
  <!-- Sidebar Component - Navegação principal da aplicação -->
  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0 border-r',
      'bg-[var(--sidebar-background)] border-[var(--sidebar-border)]',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
    role="navigation"
    aria-label="Navegação principal"
  >
    <!-- Cabeçalho da Sidebar -->
    <div class="flex h-16 items-center justify-between px-4 border-b border-[var(--sidebar-border)]">
            <div v-show="!isCollapsed" class="flex items-center justify-center w-full">
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
                      class="hidden lg:flex rounded-lg text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 group"
            style="padding: 0.5rem;"
          :aria-label="isCollapsed ? $t('layout.sidebar.expand') : $t('layout.sidebar.collapse')"
        >
          <Icon 
            :icon="isCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" 
            class="h-4 w-4 transition-all duration-200 group-hover:scale-110" 
          />
        </button>
        
        <!-- Botão para fechar sidebar no mobile -->
        <button
          @click="toggleSidebar"
                      class="lg:hidden rounded-lg text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--sidebar-text)] transition-all duration-200 group"
            style="padding: 0.5rem;"
          :aria-label="$t('layout.sidebar.close')"
        >
          <Icon icon="mdi:close" class="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>
    </div>

    <!-- Navegação principal -->
    <nav class="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent" role="menubar">
      <!-- Seção: Painel Principal -->
      <div class="space-y-2">
        <h3 
          v-show="!isCollapsed" 
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider"
        >
          {{ $t('layout.sidebar.sections.dashboard') }}
        </h3>
        <ul class="space-y-1" role="none">
          <li role="none">
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
                role="menuitem"
              >
                <Icon icon="mdi:view-dashboard" class="sidebar-icon" />
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.dashboard') }}
                </span>
              </a>
            </router-link>
          </li>
          <li role="none">
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
                role="menuitem"
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
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider"
        >
          {{ $t('layout.sidebar.sections.monitoring') }}
        </h3>
        <ul class="space-y-1" role="none">
          <!-- Menu dropdown para Telemetria -->
          <li role="none">
            <button
              @click="!isCollapsed && toggleSubmenu('telemetry')"
              class="sidebar-item group w-full justify-between"
              :class="{ 'cursor-default': isCollapsed, 'sidebar-submenu-open': submenuOpen.telemetry }"
              :title="isCollapsed ? $t('layout.sidebar.menu.telemetry.title') : ''"
              role="menuitem"
              :aria-expanded="submenuOpen.telemetry"
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
                class="h-4 w-4 transition-all duration-300 text-[var(--sidebar-text-muted)] group-hover:text-[var(--sidebar-text)]"
                :class="submenuOpen.telemetry ? 'rotate-180 text-primary' : ''"
              />
            </button>
            
            <!-- Submenu Telemetria -->
            <Transition name="slide-down">
              <ul v-show="submenuOpen.telemetry && !isCollapsed" class="mt-2 ml-6 space-y-1 border-l-2 border-[var(--sidebar-border)] pl-4" role="menu">
                <li role="none">
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.telemetry.realTime')"
                    role="menuitem"
                  >
                    <Icon icon="mdi:clock-outline" class="sidebar-submenu-icon" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.telemetry.realTime') }}
                    </span>
                  </a>
                </li>
                <li role="none">
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.telemetry.history')"
                    role="menuitem"
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
          <li role="none">
            <button
              @click="!isCollapsed && toggleSubmenu('alerts')"
              class="sidebar-item group w-full justify-between"
              :class="{ 'cursor-default': isCollapsed, 'sidebar-submenu-open': submenuOpen.alerts }"
              :title="isCollapsed ? $t('layout.sidebar.menu.alerts.title') : ''"
              role="menuitem"
              :aria-expanded="submenuOpen.alerts"
            >
              <div class="flex items-center">
                <div class="relative">
                  <Icon icon="mdi:alert-circle" class="sidebar-icon" />
                  <span 
                    v-if="alertCount > 0" 
                    class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-gradient-to-r from-error-500 to-error-600 rounded-full min-w-[18px] h-[18px] shadow-lg animate-bounce"
                  >
                    {{ alertCount > 9 ? '9+' : alertCount }}
                  </span>
                </div>
                <span v-show="!isCollapsed" class="sidebar-text">
                  {{ $t('layout.sidebar.menu.alerts.title') }}
                </span>
                <span 
                  v-if="alertCount > 0 && !isCollapsed" 
                  class="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-error-500 to-error-600 rounded-full shadow-md"
                >
                  {{ alertCount }}
                </span>
              </div>
              <Icon 
                v-show="!isCollapsed && alertCount === 0"
                icon="mdi:chevron-down" 
                class="h-4 w-4 transition-all duration-300 text-[var(--sidebar-text-muted)] group-hover:text-[var(--sidebar-text)]"
                :class="submenuOpen.alerts ? 'rotate-180 text-primary' : ''"
              />
            </button>
            
            <!-- Submenu Alertas -->
            <Transition name="slide-down">
              <ul v-show="submenuOpen.alerts && !isCollapsed" class="mt-2 ml-6 space-y-1 border-l-2 border-[var(--sidebar-border)] pl-4" role="menu">
                <li role="none">
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.alerts.active')"
                    role="menuitem"
                  >
                    <Icon icon="mdi:bell-ring" class="sidebar-submenu-icon text-error-500" />
                    <span class="sidebar-submenu-text">
                      {{ $t('layout.sidebar.menu.alerts.active') }}
                    </span>
                    <span v-if="alertCount > 0" class="ml-auto text-xs font-medium text-error-600">
                      {{ alertCount }}
                    </span>
                  </a>
                </li>
                <li role="none">
                  <a
                    href="#"
                    class="sidebar-submenu-item group"
                    :title="$t('layout.sidebar.menu.alerts.history')"
                    role="menuitem"
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
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider"
        >
          {{ $t('layout.sidebar.sections.settings') }}
        </h3>
        <ul class="space-y-1" role="none">
          <li role="none">
            <a
              href="#"
              class="sidebar-item group"
              :title="isCollapsed ? $t('layout.sidebar.menu.settings') : ''"
              role="menuitem"
            >
              <Icon icon="mdi:cog" class="sidebar-icon group-hover:rotate-90 transition-transform duration-300" />
              <span v-show="!isCollapsed" class="sidebar-text">
                {{ $t('layout.sidebar.menu.settings') }}
              </span>
            </a>
          </li>
          <li role="none">
            <a
              href="#"
              class="sidebar-item group"
              :title="isCollapsed ? $t('layout.sidebar.menu.users') : ''"
              role="menuitem"
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
          class="px-3 text-xs font-semibold text-[var(--sidebar-text-muted)] uppercase tracking-wider"
        >
          {{ $t('layout.sidebar.sections.showcase') }}
        </h3>
        <ul class="space-y-1" role="none">
          <li role="none">
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
                role="menuitem"
              >
                <Icon icon="mdi:palette" class="sidebar-icon group-hover:scale-110 transition-transform duration-200" />
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
    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
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
/* Classes reutilizáveis para itens da sidebar usando variáveis CSS */
  .sidebar-item {
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    font-size: 0.875rem;
    border-radius: 0.75rem;
    padding: 0.625rem 0.75rem;
  color: var(--sidebar-text-muted);
}

/* Estados de hover e focus */
.sidebar-item:hover {
  background-color: var(--sidebar-item-hover);
  color: var(--sidebar-text);
  transform: translateX(2px);
}

.sidebar-item:focus-visible {
  outline: none;
  background-color: var(--sidebar-item-hover);
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5);
}

/* Estado ativo com design moderno */
.sidebar-item-active {
  background-color: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-left: 3px solid hsl(var(--primary));
  padding-left: calc(0.75rem - 3px);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-item-active:hover {
  background-color: hsl(var(--primary) / 0.15);
  color: hsl(var(--primary));
  transform: translateX(2px);
}

.sidebar-item-active .sidebar-icon {
  color: hsl(var(--primary));
}

  .sidebar-icon {
    flex-shrink: 0;
    transition: all 0.3s;
    position: relative;
    z-index: 10;
    margin-right: 0.75rem;
    height: 1.25rem;
    width: 1.25rem;
}

  .sidebar-text {
    transition: all 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    z-index: 10;
    font-weight: 500;
}

  .sidebar-submenu-item {
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: all 0.25s;
    border: 1px solid transparent;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
  color: var(--sidebar-text-muted);
}

.sidebar-submenu-item:hover {
  background-color: var(--sidebar-item-hover);
  color: var(--sidebar-text);
  transform: translateX(2px);
}

  .sidebar-submenu-item:focus-visible {
    outline: none;
    background-color: var(--sidebar-item-hover);
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5);
  }

  .sidebar-submenu-icon {
    flex-shrink: 0;
    transition: all 0.25s;
    margin-right: 0.75rem;
    height: 1rem;
    width: 1rem;
}

  .sidebar-submenu-text {
    transition: all 0.25s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
}

.sidebar-submenu-open {
  background-color: var(--sidebar-item-hover);
  color: var(--sidebar-text);
}

/* Transições melhoradas para submenus */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.4s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

/* Animações de microinteração */
.sidebar-item:active {
  transform: translateX(2px) scale(0.98);
}

.sidebar-submenu-item:active {
  transform: translateX(2px) scale(0.98);
}

/* Melhorias para responsividade */
@media (max-width: 1023px) {
  .sidebar-item:hover,
  .sidebar-submenu-item:hover {
    transform: none;
  }
}

/* Estados de foco unificados */
.sidebar-item:focus-visible,
.sidebar-submenu-item:focus-visible {
  outline: none;
  background-color: var(--sidebar-item-hover);
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.5);
}
</style>

