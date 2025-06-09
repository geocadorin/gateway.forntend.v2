# Guia do Interceptador Axios e API Client

## 📋 Resumo da Implementação

Foi implementado um sistema completo de interceptação de requisições HTTP usando Axios no projeto Vue 3 + TypeScript. O sistema inclui:

- ✅ Interceptador para adicionar JWT token automaticamente
- ✅ Interceptador para lidar com erros 401 e 403 
- ✅ Logout automático em caso de token inválido
- ✅ Redirecionamento para login quando necessário
- ✅ Persistência do estado de autenticação
- ✅ Serviços modulares para diferentes recursos

## 🏗️ Arquitetura Implementada

### 1. API Client (`src/core/services/apiClient.ts`)

```typescript
// Instância configurada do axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
```

**Interceptador de Requisições:**
- Adiciona automaticamente o JWT token no header `Authorization`
- Exclui endpoints públicos como `/auth/login`, `/auth/register`, `/auth/refresh`
- Gerencia headers de forma segura

**Interceptador de Respostas:**
- Detecta erros 401 (Não Autorizado) e 403 (Proibido)
- Executa logout automático do usuário
- Redireciona para a página de login
- Evita loops de redirecionamento
- Trata outros tipos de erro (400, 404, 422, 500)

### 2. Store de Autenticação (`src/store/auth.store.ts`)

```typescript
// Estado reativo com Pinia
const user = ref<User | null>(null);
const accessToken = ref<string | null>(null);

// Computed properties
const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
```

**Funcionalidades:**
- Gerenciamento do estado de autenticação
- Persistência no localStorage
- Inicialização automática na aplicação
- Funções de login/logout

### 3. Serviços Modulares

**AuthService (`src/core/services/authService.ts`):**
```typescript
export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse>
  async logout(): Promise<void>
  async refreshToken(): Promise<string>
  isAuthenticated(): boolean
  getCurrentUser(): User | null
  getAccessToken(): string | null
}
```

**UserService (`src/core/services/userService.ts`):**
```typescript
export class UserService {
  async getUsers(page: number, limit: number): Promise<UsersListResponse>
  async getUserById(id: string): Promise<User>
  async createUser(userData: CreateUserRequest): Promise<User>
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User>
  async deleteUser(id: string): Promise<void>
  async toggleUserBlock(id: string, blocked: boolean): Promise<User>
}
```

### 4. Guards de Navegação (`src/router/index.ts`)

```typescript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth !== false;
  const isGuestRoute = to.meta.guest === true;
  const isAuthenticated = authStore.isAuthenticated;

  if (isGuestRoute && isAuthenticated) {
    next('/dashboard');
  } else if (requiresAuth && !isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
```

## 🚀 Como Usar

### 1. Fazendo Requisições HTTP

```typescript
import { apiClient } from '@/core/services';

// GET
const users = await apiClient.get('/users');

// POST
const newUser = await apiClient.post('/users', userData);

// PUT
const updatedUser = await apiClient.put('/users/123', userData);

// DELETE
await apiClient.delete('/users/123');
```

### 2. Usando os Serviços

```typescript
import { authService, userService } from '@/core/services';

// Login
await authService.login({ email: 'user@example.com', password: '123456' });

// Buscar usuários
const users = await userService.getUsers(1, 10);

// Criar usuário
const newUser = await userService.createUser({
  name: 'João Silva',
  email: 'joao@example.com',
  password: '123456',
  blocked: false
});
```

### 3. Proteção de Rotas

```typescript
// No arquivo de rotas
const routes = [
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Requer autenticação
  },
  {
    path: '/login',
    component: LoginView,
    meta: { guest: true } // Apenas para não autenticados
  }
];
```

### 4. Verificação de Autenticação

```typescript
import { useAuthStore } from '@/store/auth.store';

const authStore = useAuthStore();

// Verificar se está autenticado
if (authStore.isAuthenticated) {
  console.log('Usuário logado:', authStore.user);
}

// Verificar roles
if (authStore.userRoles?.includes('admin')) {
  console.log('Usuário é admin');
}
```

## 🔒 Fluxo de Segurança

### Requisição Autenticada:
1. `apiClient.get('/users')` → Interceptador adiciona `Authorization: Bearer TOKEN`
2. Se resposta = 200 → Sucesso
3. Se resposta = 401/403 → Logout automático + Redirecionamento

### Login:
1. `authService.login()` → POST `/auth/login` (sem token)
2. Recebe token + dados do usuário
3. Salva no store + localStorage
4. Próximas requisições incluem o token automaticamente

### Logout:
1. `authService.logout()` → POST `/auth/logout` (opcional)
2. Limpa store + localStorage
3. Usuário redirecionado para `/login`

## 🛠️ Configuração

### Variáveis de Ambiente:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Inicialização na Aplicação:
```typescript
// main.ts
const authStore = useAuthStore();
authStore.initializeAuth(); // Restaura estado do localStorage
```

## 📝 Endpoints Públicos

Os seguintes endpoints não recebem token automaticamente:
- `/auth/login`
- `/auth/register` 
- `/auth/refresh`

Para adicionar novos endpoints públicos, edite o array `publicEndpoints` em `apiClient.ts`.

## 🚨 Tratamento de Erros

- **401/403**: Logout automático + redirecionamento para login
- **400**: Erro de requisição inválida (log no console)
- **404**: Recurso não encontrado (log no console)  
- **422**: Dados de entrada inválidos (log no console)
- **500**: Erro interno do servidor (log no console)
- **Rede**: Erro de conectividade (log no console)

## 📦 Dependências Adicionadas

```json
{
  "dependencies": {
    "axios": "^1.x.x"
  }
}
```

## ✅ Funcionalidades Implementadas

- [x] Interceptador para adicionar JWT token
- [x] Interceptador para erros 401/403 com logout automático
- [x] Persistência de autenticação no localStorage
- [x] Guards de navegação para proteção de rotas
- [x] Serviços modulares (Auth, User)
- [x] Tratamento abrangente de erros HTTP
- [x] Sistema de redirecionamento inteligente
- [x] Prevenção de loops de redirecionamento
- [x] Tipagem TypeScript completa

O sistema está pronto para uso e pode ser facilmente expandido com novos serviços seguindo o mesmo padrão! 