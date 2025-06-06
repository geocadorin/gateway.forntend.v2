import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import userRoutes from './userRoutes';

const routes: Array<RouteRecordRaw> = [
  ...userRoutes,
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHistory para URLs limpas
  routes,
});

export default router;
