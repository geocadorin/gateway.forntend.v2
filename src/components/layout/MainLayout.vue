<template>
  <!-- Layout principal da aplicação -->
  <div class="min-h-screen bg-background transition-colors duration-300">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Container principal com topbar e conteúdo -->
    <div 
      :class="sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'" 
      class="transition-all duration-300 ease-in-out"
    >
      <!-- Topbar -->
      <Topbar />
      
      <!-- Área de conteúdo principal -->
      <main class="relative">
        <!-- Background decorativo -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <!-- Container do conteúdo -->
        <div class="relative p-4 lg:p-6">
          <!-- Slot para o conteúdo da página -->
          <div class="mx-auto max-w-7xl">
            <router-view v-slot="{ Component, route }">
              <!-- Transição suave entre páginas -->
              <Transition
                name="page"
                mode="out-in"
                appear
                @enter="onPageEnter"
                @leave="onPageLeave"
              >
                <component 
                  :is="Component" 
                  :key="route.path"
                  class="page-content"
                />
              </Transition>
            </router-view>
          </div>
        </div>
        
        <!-- Loading overlay para transições -->
        <Transition name="loading-overlay">
          <div 
            v-if="isPageTransitioning" 
            class="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <div class="flex flex-col items-center gap-4">
              <div class="loading-spinner"></div>
              <p class="text-sm text-muted-foreground font-medium">Carregando...</p>
            </div>
          </div>
        </Transition>
      </main>
    </div>
    
    <!-- Scroll to top button -->
    <Transition name="scroll-button">
      <button
        v-if="showScrollToTop"
        @click="scrollToTop"
                  class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-500 group"
        aria-label="Voltar ao topo"
      >
        <Icon icon="mdi:chevron-up" class="h-6 w-6 mx-auto group-hover:animate-bounce" />
      </button>
    </Transition>
    
    <!-- Toast notifications container -->
    <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, nextTick } from 'vue';
import { useThemeStore } from '../../store/theme.store';
import { Icon } from '@iconify/vue';
import Sidebar from './Sidebar.vue';
import Topbar from './Topbar.vue';

// Composables
const themeStore = useThemeStore();

// Estado para controle da sidebar (mobile)
const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);

// Estado para controle de transições e scroll
const isPageTransitioning = ref(false);
const showScrollToTop = ref(false);

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

// Controle do scroll
function handleScroll() {
  showScrollToTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Handlers de transição de página
function onPageEnter() {
  isPageTransitioning.value = true;
  nextTick(() => {
    setTimeout(() => {
      isPageTransitioning.value = false;
    }, 300);
  });
}

function onPageLeave() {
  isPageTransitioning.value = true;
}

// Preload de recursos críticos
function preloadCriticalResources() {
  // Preload de fontes críticas
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
  
  // Preload de ícones críticos
  const iconLink = document.createElement('link');
  iconLink.rel = 'preload';
  iconLink.href = 'https://cdn.jsdelivr.net/npm/@iconify/iconify@3/iconify.min.js';
  iconLink.as = 'script';
  document.head.appendChild(iconLink);
}

// Otimização de performance
function optimizePerformance() {
  // Lazy loading para imagens
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img: Element) => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
  // Service Worker para cache
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed
    });
  }
}

// Fornecer estado e métodos para componentes filhos
provide('sidebarOpen', sidebarOpen);
provide('toggleSidebar', toggleSidebar);
provide('sidebarCollapsed', sidebarCollapsed);

// Inicializar tema e configurações ao montar o componente
onMounted(() => {
  themeStore.initializeTheme();
  syncCollapsedState();
  preloadCriticalResources();
  optimizePerformance();
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Adicionar classe para animações CSS
  document.body.classList.add('layout-loaded');
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Transições de página melhoradas usando variáveis CSS */
.page-enter-active {
  transition: all 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
  transition: all 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* Conteúdo da página */
.page-content {
  animation: pageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

@keyframes pageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading overlay */
.loading-overlay-enter-active,
.loading-overlay-leave-active {
  transition: all 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-overlay-enter-from,
.loading-overlay-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.loading-overlay-enter-to,
.loading-overlay-leave-from {
  opacity: 1;
  backdrop-filter: blur(4px);
}

/* Loading spinner usando variáveis CSS */
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--muted);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Scroll to top button */
.scroll-button-enter-active,
.scroll-button-leave-active {
  transition: all 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-button-enter-from,
.scroll-button-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.scroll-button-enter-to,
.scroll-button-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Responsividade personalizada melhorada */
@media (max-width: 1023px) {
  .lg\:pl-64 {
    padding-left: 0 !important;
  }
  
  .lg\:pl-16 {
    padding-left: 0 !important;
  }
}

/* Otimizações de performance */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active,
  .loading-overlay-enter-active,
  .loading-overlay-leave-active,
  .scroll-button-enter-active,
  .scroll-button-leave-active {
    transition-duration: 0.1s;
  }
  
  .page-content {
    animation-duration: 0.1s;
  }
  
  .loading-spinner {
    animation-duration: 2s;
  }
}

/* Melhorias de acessibilidade */
@media (prefers-contrast: high) {
  .loading-spinner {
    border-top-color: var(--foreground);
  }
}

/* Suporte para dispositivos com hover */
@media (hover: hover) {
  .page-content {
    transition: transform 0.2s;
  }
  
  .page-content:hover {
    transform: translateY(-1px);
  }
}

/* Layout grid melhorado */
.layout-grid {
  display: grid;
  grid-template-areas: 
    "sidebar header"
    "sidebar main";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

@media (max-width: 1023px) {
  .layout-grid {
    grid-template-areas: 
      "header"
      "main";
    grid-template-columns: 1fr;
  }
}

/* Animações de entrada do layout */
:global(.layout-loaded) .page-content {
  animation-delay: 0.1s;
  animation-fill-mode: both;
}

/* Otimização para telas de alta densidade */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .loading-spinner {
    border-width: 2px;
  }
}

/* Suporte para modo escuro */
@media (prefers-color-scheme: dark) {
  .loading-spinner {
    border-color: rgba(255, 255, 255, 0.1);
    border-top-color: var(--primary);
  }
}

/* Melhorias para foco e navegação por teclado */
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #64748b;
    border-radius: 0.25rem;
  }

/* Transições suaves para mudanças de tema */
* {
  transition: color 0.3s, background-color 0.3s, border-color 0.3s;
}

/* Container de toast personalizado */
#toast-container {
  max-width: 24rem;
}

/* Melhorias para impressão */
@media print {
  .fixed {
    display: none !important;
  }
  
  .page-content {
    animation: none !important;
    transform: none !important;
  }
}
</style>

<style>
/* Estilos globais para o layout usando variáveis CSS */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Melhorias de performance para animações */
.page-content,
.loading-spinner,
[class*="transition-"] {
  will-change: transform, opacity;
}

/* Otimização de scroll */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--muted-foreground) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--muted-foreground);
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: var(--foreground);
}
</style>

