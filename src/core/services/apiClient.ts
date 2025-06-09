import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { useAuthStore } from '../../store/auth.store';
import router from '../../router';
import Cookies from 'js-cookie';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Criação da instância do axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptador de requisições para adicionar o JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // URLs que não precisam de autenticação (como login)
    const publicEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
    
    // Adiciona o token JWT no header Authorization se não for endpoint público
    if (!isPublicEndpoint) {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptador de respostas para lidar com erros de autenticação
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Retorna a resposta normalmente se não houver erro
    return response;
  },
  (error: AxiosError) => {
    const authStore = useAuthStore();
    
    if (error.response) {
      const status = error.response.status;
      
      // Lidar com erros 401 (Não autorizado) e 403 (Proibido)
      if (status === 401 || status === 403) {
        console.warn(`Erro ${status}: Acesso negado. Fazendo logout do usuário.`);
        
        // Deslogar o usuário
        authStore.logout();
        
        // Redirecionar para a página de login
        // Verificar se não estamos já na página de login para evitar loop
        if (router.currentRoute.value.path !== '/login') {
          router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath }
          });
        }
      }
      
      // Lidar com outros tipos de erro
      switch (status) {
        case 400:
          console.error('Erro 400: Requisição inválida', error.response.data);
          break;
        case 404:
          console.error('Erro 404: Recurso não encontrado', error.response.data);
          break;
        case 422:
          console.error('Erro 422: Dados de entrada inválidos', error.response.data);
          break;
        case 500:
          console.error('Erro 500: Erro interno do servidor', error.response.data);
          break;
        default:
          console.error(`Erro ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Erro de rede (sem resposta do servidor)
      console.error('Erro de rede: Não foi possível conectar ao servidor', error.request);
    } else {
      // Erro na configuração da requisição
      console.error('Erro na configuração da requisição:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Exportar a instância configurada
export default apiClient;

// Exportar tipos úteis para typescript
export type { InternalAxiosRequestConfig, AxiosResponse, AxiosError };
