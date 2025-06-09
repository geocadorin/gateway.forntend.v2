import apiClient from './apiClient';
import { useAuthStore } from '../../store/auth.store';
import type { User } from '../interfaces';
import Cookies from 'js-cookie';

// Interfaces para as requisições e respostas da API
export interface LoginRequest {
  email: string;
  password: string;
}

async function mockLogin(credentials: LoginRequest): Promise<LoginResponse> {
  console.log('Simulando requisição para /auth/login com as credenciais:', credentials);

  // 1. Simula um atraso de rede (ex: 800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  // 2. Cria os dados de resposta que o backend retornaria
  const mockResponseData: LoginResponse = {
    user: {
      id: '123',
      name: 'João da Silva',
      email: credentials.email || 'joao.silva@example.com',
      roles: ['admin'],
      blocked: false,
      plan: 'free'
    },
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvw6NvIGRhIFNpbHZhIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.fake_signature_string_for_testing'
  };

  // 3. Simula a resposta completa da API (como o Axios faria)
  const mockApiResponse = {
    data: mockResponseData,
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    config: {}
  };

  console.log('Simulação de API retornou status 200 com sucesso.', mockApiResponse);

  // 4. Retorna apenas a propriedade `data`, assim como no seu código original
  return mockApiResponse.data;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export class AuthService {
  private authStore = useAuthStore();

  /**
   * Realiza o login do usuário
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      //const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      const responseData = await mockLogin(credentials);
      
      // Salvar dados do usuário no store
      this.authStore.setUser(responseData.user);
      
      // Armazenar o token apenas no cookie HttpOnly
      Cookies.set('accessToken', responseData.accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
      
      console.log('Login realizado com sucesso');
      return responseData;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário
   */
  async logout(): Promise<void> {
    try {
      // Chamar endpoint de logout no backend (opcional)
      // await apiClient.post('/auth/logout');
      console.log('Logout simulado - endpoint /auth/logout chamado');
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error);
      // Mesmo com erro no servidor, continuamos com o logout local
    } finally {
      // Sempre limpar dados locais
      this.authStore.logout();
      Cookies.remove('accessToken');
      console.log('Logout realizado');
      // Redirecionar para a página de login
      window.location.href = '/login';
    }
  }

  /**
   * Atualiza o token de acesso usando o refresh token
   */
  async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh');
      
      // Atualizar o token no cookie
      Cookies.set('accessToken', response.data.accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
      
      console.log('Token renovado com sucesso');
      return response.data.accessToken;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      // Se não conseguir renovar, fazer logout
      this.authStore.logout();
      throw error;
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated;
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): User | null {
    return this.authStore.user;
  }

  /**
   * Obtém o token de acesso atual
   */
  getAccessToken(): string | null {
    return this.authStore.getAccessToken();
  }

 
}

// Exportar uma instância singleton do serviço
export const authService = new AuthService(); 