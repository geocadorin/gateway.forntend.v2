// src/store/auth.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../core/interfaces'; 

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  // O refresh token será gerenciado por um cookie HttpOnly, não diretamente no estado do Pinia.

  // Getters (usando computed properties)
  const isAuthenticated = computed(() =>!!accessToken.value &&!!user.value);
  const userRoles = computed(() => user.value?.roles || null);
  const userPlan = computed(() => user.value?.plan || null);

  // Actions
  function setUser(userData: User) {
    user.value = userData;
  }

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  function logout() {
    user.value = null;
    accessToken.value = null;
    // Limpar outras preferências armazenadas relevantes.
    // O redirecionamento para a página de login será tratado aqui ou no interceptor/guarda de navegação.
    console.log('User logged out, redirecting to login...');
    // Idealmente, o router.push('/login') seria chamado aqui,
    // mas cuidado com dependências circulares se o router importar stores.
    // Uma abordagem comum é o router ser passado como argumento ou usar um event bus.
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    userRoles,
    userPlan,
    setUser,
    setAccessToken,
    logout,
  };
});