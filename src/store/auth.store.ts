// src/store/auth.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../core/interfaces'; 
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  // Token será gerenciado apenas por cookies HttpOnly

  // Getters (usando computed properties)
  const isAuthenticated = computed(() => {
    // Verificar se há usuário e se há token no cookie
    const hasToken = !!Cookies.get('accessToken');
    return !!user.value && hasToken;
  });
  
  const userRoles = computed(() => user.value?.roles || null);
  const userPlan = computed(() => user.value?.plan || null);

  // Actions
  function setUser(userData: User) {
    user.value = userData;
    // Persistir dados do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Método para obter token do cookie (para compatibilidade)
  function getAccessToken(): string | null {
    return Cookies.get('accessToken') || null;
  }

  async function login(email: string, password: string) {
    // A implementação real do login será feita através do authService
    // Este método serve como ponte entre o componente e o serviço
    try {
      // A lógica real está no authService para manter a separação de responsabilidades
      console.log('Login attempt with:', email);
      
      // O authService já atualizará o store automaticamente
      // Retornamos sucesso se chegou até aqui
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  function logout() {
    user.value = null;
    
    // Limpar localStorage do usuário
    localStorage.removeItem('user');
    
    // Limpar cookie do token
    Cookies.remove('accessToken');
    
    console.log('User logged out');
  }

  // Função para inicializar o estado de autenticação a partir do localStorage
  function initializeAuth() {
    const savedUser = localStorage.getItem('user');
    const hasToken = !!Cookies.get('accessToken');
    
    if (savedUser && hasToken) {
      try {
        const userData = JSON.parse(savedUser) as User;
        user.value = userData;
        console.log('Estado de autenticação restaurado do localStorage');
      } catch (error) {
        console.error('Erro ao restaurar estado de autenticação:', error);
        // Limpar dados corrompidos
        localStorage.removeItem('user');
        Cookies.remove('accessToken');
      }
    } else if (!hasToken) {
      // Se não há token, limpar tudo
      user.value = null;
      localStorage.removeItem('user');
    }
  }

  return {
    user,
    isAuthenticated,
    userRoles,
    userPlan,
    setUser,
    getAccessToken,
    login,
    logout,
    initializeAuth,
  };
});