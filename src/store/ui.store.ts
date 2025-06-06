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
    // A lógica para aplicar o tema ao DOM (ex: atualizar classe no <html>)
    // será implementada no capítulo de UI/UX.
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
    setLoading,
    setBackendThemeColors,
  };
});