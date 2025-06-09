import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Estado
  const isDark = ref(false)

  // Inicialização do tema
  function initializeTheme() {
    // Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('app-theme')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Se não há preferência salva, usa a preferência do sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    applyTheme()
  }

  // Aplicar tema ao documento
  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  // Alternar tema
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // Definir tema específico
  function setTheme(theme: 'light' | 'dark') {
    isDark.value = theme === 'dark'
  }

  // Watcher para salvar preferência e aplicar mudanças
  watch(isDark, (newValue) => {
    localStorage.setItem('app-theme', newValue ? 'dark' : 'light')
    applyTheme()
  })

  return {
    isDark,
    initializeTheme,
    toggleTheme,
    setTheme,
    applyTheme
  }
}) 