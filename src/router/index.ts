import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...dashboardRoutes,
  ...userRoutes,
  // Rota 404 - deve ser a última
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHistory para URLs limpas
  routes,
});

// Guard de navegação global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth !== false; // Por padrão, rotas requerem autenticação
  const isGuestRoute = to.meta.guest === true; // Rotas que só usuários não autenticados podem acessar
  const isAuthenticated = authStore.isAuthenticated;

  console.log(`Navegando para: ${to.path}, Autenticado: ${isAuthenticated}, Requer Auth: ${requiresAuth}`);

  if (isGuestRoute && isAuthenticated) {
    // Usuário autenticado tentando acessar rota de guest (ex: login)
    console.log('Usuário autenticado redirecionado do login para dashboard');
    next('/dashboard');
  } else if (requiresAuth && !isAuthenticated) {
    // Usuário não autenticado tentando acessar rota protegida
    console.log('Usuário não autenticado redirecionado para login');
    next({
      path: '/login',
      query: { redirect: to.fullPath } // Salva a rota original para redirecionamento após login
    });
  } else {
    // Navegação permitida
    next();
  }
});

export default router;
