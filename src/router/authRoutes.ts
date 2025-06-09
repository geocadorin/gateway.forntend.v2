import { type RouteRecordRaw } from 'vue-router';

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../modules/auth/views/LoginView.vue'),
    meta: { 
      requiresAuth: false,
      guest: true // Apenas usuários não autenticados podem acessar
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    redirect: '/login'
  },
  // Rota de redirecionamento padrão
  {
    path: '/',
    redirect: '/dashboard'
  }
];

export default authRoutes;
