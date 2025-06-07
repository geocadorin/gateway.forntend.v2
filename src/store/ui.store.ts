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
  }

  // ===================================================================
  // NOVA FUNÇÃO: Simula a busca e aplicação de um tema do backend
  // ===================================================================
  async function applyThemeFromBackend() {
    // 1. Ativa o estado de carregamento para feedback visual na UI
    setLoading(true);

    try {
      // 2. Simula uma chamada de API que leva 1.5 segundos
      console.log('Simulando chamada à API de temas...');
      const newColors = await new Promise<Record<string, string>>((resolve) => {
        setTimeout(() => {
          // Este é o objeto que seu backend retornaria como JSON
          const royalPurpleTheme = {
            'background': '240 10% 3.9%',
            'foreground': '0 0% 98%',
            'card': '240 4% 10%',
            'primary': '260 85% 65%',      // Roxo vibrante
            'primary-foreground': '0 0% 100%',
            'secondary': '240 4% 15%',
            'border': '260 85% 65%',       // Borda da cor primária
            'ring': '260 95% 75%',         // Anel de foco mais claro
            'radius': '0.5rem',            // Bordas mais suaves
            'destructive': '0 84% 60%',
          };
          console.log('Tema "Roxo Royal" recebido da API simulada!');
          resolve(royalPurpleTheme);
        }, 1500);
      });

      // 3. Guarda as cores recebidas no estado da store (opcional, mas bom para debug)
      setBackendThemeColors(newColors);

      // 4. Pega o elemento raiz (<html>) e aplica as novas cores como variáveis CSS
      const root = document.documentElement;
      Object.entries(newColors).forEach(([key, value]) => {
        // Isso vai gerar: root.style.setProperty('--primary', '260 85% 65%')
        root.style.setProperty(`--${key}`, value);
      });

      console.log('Tema do backend aplicado com sucesso no DOM.');

    } catch (error) {
      console.error('Falha ao aplicar o tema do backend:', error);
    } finally {
      // 5. Desativa o estado de carregamento, mesmo que ocorra um erro
      setLoading(false);
    }
  }



  return {
    // State
    currentTheme,
    isLoading,
    backendThemeColors,
    // Actions
    setTheme,
    initializeTheme,
    toggleTheme,
    setLoading,
    setBackendThemeColors,
    applyThemeFromBackend, // <-- Exporta a nova função
  };
});
