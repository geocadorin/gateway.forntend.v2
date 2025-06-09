<template>
  <!-- Layout principal da aplicação -->
  <div class="min-h-screen bg-background">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Container principal com topbar e conteúdo -->
    <div :class="sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'" class="transition-all duration-300">
      <!-- Topbar -->
      <Topbar />
      
      <!-- Área de conteúdo principal -->
      <main class="p-4 lg:p-6">
        <!-- Slot para o conteúdo da página -->
        <div class="mx-auto max-w-7xl">
          <router-view v-slot="{ Component, route }">
            <!-- Transição suave entre páginas -->
            <Transition
              name="page"
              mode="out-in"
              appear
            >
              <component 
                :is="Component" 
                :key="route.path"
                class="animate-in"
              />
            </Transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue';
import { useThemeStore } from '../../store/theme.store';
import Sidebar from './Sidebar.vue';
import Topbar from './Topbar.vue';

// Composables
const themeStore = useThemeStore();

// Estado para controle da sidebar (mobile)
const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);

// Função para alternar sidebar
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// Sincronizar estado de collapsed com localStorage
function syncCollapsedState() {
  const saved = localStorage.getItem('sidebar-collapsed');
  if (saved !== null) {
    sidebarCollapsed.value = saved === 'true';
  }
}

// Observar mudanças no localStorage
function handleStorageChange(e: StorageEvent) {
  if (e.key === 'sidebar-collapsed') {
    sidebarCollapsed.value = e.newValue === 'true';
  }
}

// Fornecer estado e métodos para componentes filhos
provide('sidebarOpen', sidebarOpen);
provide('toggleSidebar', toggleSidebar);
provide('sidebarCollapsed', sidebarCollapsed);

// Inicializar tema ao montar o componente
onMounted(() => {
  themeStore.initializeTheme();
  syncCollapsedState();
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
});
</script>

<style scoped>
/* Transições de página */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Animação de entrada */
.animate-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade personalizada */
@media (max-width: 1023px) {
  .lg\:pl-64 {
    padding-left: 0 !important;
  }
}
</style> 