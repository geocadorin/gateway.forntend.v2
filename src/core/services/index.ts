// Exportar o client principal
export { default as apiClient } from './apiClient';

// Exportar serviços
export { authService, AuthService } from './authService';
export { userService, UserService } from './userService';

// Exportar tipos úteis
export type { 
  InternalAxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from './apiClient';

export type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse
} from './authService';

export type {
  CreateUserRequest,
  UpdateUserRequest,
  UsersListResponse
} from './userService'; 