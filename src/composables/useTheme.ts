import { computed } from 'vue';
import { useUIStore } from '../store/ui.store';

export function useTheme() {
  const uiStore = useUIStore();

  const currentTheme = computed(() => uiStore.currentTheme);
  const isDark = computed(() => uiStore.currentTheme === 'dark');
  const isLight = computed(() => uiStore.currentTheme === 'light');

  const setTheme = (theme: 'light' | 'dark') => {
    uiStore.setTheme(theme);
  };

  const toggleTheme = () => {
    uiStore.toggleTheme();
  };

  const initializeTheme = () => {
    uiStore.initializeTheme();
  };

  // Função para obter o ícone do tema atual
  const getThemeIcon = () => {
    return isDark.value ? '🌙' : '☀️';
  };

  // Função para obter o nome do tema para exibição
  const getThemeDisplayName = () => {
    return isDark.value ? 'Modo Escuro' : 'Modo Claro';
  };

  return {
    currentTheme,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    initializeTheme,
    getThemeIcon,
    getThemeDisplayName,
  };
} 