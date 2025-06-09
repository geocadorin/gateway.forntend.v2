import apiClient from './apiClient';
import type { User } from '../interfaces';

// Interfaces para as requisições da API de usuários
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  customerId?: string;
  blocked: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  customerId?: string;
  blocked?: boolean;
  roles?: string[];
  plan?: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export class UserService {
  
  /**
   * Busca todos os usuários com paginação
   */
  async getUsers(page: number = 1, limit: number = 10): Promise<UsersListResponse> {
    try {
      const response = await apiClient.get<UsersListResponse>('/users', {
        params: { page, limit }
      });
      
      console.log(`Usuários carregados: ${response.data.users.length} de ${response.data.total}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  /**
   * Busca um usuário específico por ID
   */
  async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      
      console.log(`Usuário carregado: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  /**
   * Cria um novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users', userData);
      
      console.log(`Usuário criado: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  /**
   * Atualiza um usuário existente
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await apiClient.put<User>(`/users/${id}`, userData);
      
      console.log(`Usuário atualizado: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  /**
   * Remove um usuário
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${id}`);
      
      console.log(`Usuário removido: ${id}`);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  }

  /**
   * Bloqueia ou desbloqueia um usuário
   */
  async toggleUserBlock(id: string, blocked: boolean): Promise<User> {
    try {
      const response = await apiClient.patch<User>(`/users/${id}/block`, { blocked });
      
      console.log(`Usuário ${blocked ? 'bloqueado' : 'desbloqueado'}: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      throw error;
    }
  }
}

// Exportar uma instância singleton do serviço
export const userService = new UserService(); 