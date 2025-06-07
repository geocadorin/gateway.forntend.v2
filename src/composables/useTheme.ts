// src/core/composables/useTheme.ts
import { useDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';
import { useUIStore } from '../store/ui.store';

export function useTheme() {
  const uiStore = useUIStore();

  const isDark = useDark({
    selector: 'html',       // Elemento onde a classe será aplicada (default: 'html') [13]
    attribute: 'class',     // Atributo a ser alterado (default: 'class') [13]
    valueDark: 'dark',      // Valor da classe para modo escuro (default: 'dark') [13]
    valueLight: 'light',    // Valor da classe para modo claro (default: '') [13]
    // É importante definir valueLight para 'light' se você quiser alternar
    // explicitamente entre as classes 'light' e 'dark',
    // em vez de apenas adicionar/remover 'dark'.
    storageKey: 'vueuse-theme', // Chave para localStorage (default: 'vueuse-color-scheme')
    onChanged: (dark: boolean, defaultHandler, mode) => { // Callback quando o tema muda [13]
      uiStore.setTheme(dark ? 'dark' : 'light');
      // defaultHandler(mode); // Chama o manipulador padrão do useDark se necessário
      // Atualiza a classe no HTML explicitamente se valueLight/valueDark não for suficiente
      const htmlEl = document.documentElement;
      if (dark) {
        htmlEl.classList.add('dark');
        htmlEl.classList.remove('light');
      } else {
        htmlEl.classList.add('light');
        htmlEl.classList.remove('dark');
      }
    }
  });

  const toggleDark = useToggle(isDark); // Cria uma função para alternar o valor de isDark [13]

  // Inicializa o store com o tema atual detectado por useDark
  // useDark já lê do localStorage ou preferência do sistema na inicialização.
  uiStore.setTheme(isDark.value ? 'dark' : 'light');
  // Garante que a classe correta ('light' ou 'dark') esteja no HTML na carga inicial
  const htmlEl = document.documentElement;
  if (isDark.value) {
    htmlEl.classList.add('dark');
    htmlEl.classList.remove('light');
  } else {
    htmlEl.classList.add('light');
    htmlEl.classList.remove('dark');
  }


  // Observa mudanças no store (ex: se o tema for mudado por outro meio) e atualiza useDark
  watch(() => uiStore.currentTheme, (newTheme) => {
    if ((newTheme === 'dark' && !isDark.value) || (newTheme === 'light' && isDark.value)) {
      toggleDark();
    }
  }); return {
    isDark,
    toggleDark,
  };
}
// O `useDark` gerencia automaticamente a leitura/escrita no `localStorage` e a detecção da preferência do sistema operacional.
// [13, 14] O callback `onChanged` sincroniza o estado do `useDark` com o nosso store Pinia `uiStore`.
//  A adição explícita das classes `light` e `dark` no `onChanged` e na inicialização garante que o `html` sempre tenha
// uma dessas classes, o que pode ser útil para seletores CSS mais específicos.
