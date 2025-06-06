// src/store/ui.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Theme = 'light' | 'dark';

export const useUIStore = defineStore('ui', () => {
  // State
  const currentTheme = ref<Theme>('light'); // Tema padrão é 'light'
  const isLoading = ref<boolean>(false);
  const backendThemeColors = ref<Record<string, string> | null>(null); // Para cores do tema vindas do backend

  // Actions
  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    
    // Aplica o tema ao DOM
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme);
  }

  // Função para inicializar o tema baseado na preferência salva ou sistema
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const themeToApply = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(themeToApply);
  }

  // Função para alternar entre os temas
  function toggleTheme() {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function setLoading(status: boolean) {
    isLoading.value = status;
  }

  function setBackendThemeColors(colors: Record<string, string> | null) {
    backendThemeColors.value = colors;
    // A lógica para aplicar estas cores como variáveis CSS
    // será implementada no capítulo de UI/UX.
  }

  return {
    currentTheme,
    isLoading,
    backendThemeColors,
    setTheme,
    initializeTheme,
    toggleTheme,
    setLoading,
    setBackendThemeColors,
  };
});