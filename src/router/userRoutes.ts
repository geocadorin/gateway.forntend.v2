import { type RouteRecordRaw } from 'vue-router';
import profiles from '../core/utilities/profiles';

const userRoutes: Array<RouteRecordRaw> = [
    {
      path: '/user/register',
      name: 'RegisterUser',
      component: () => import('@/modules/users/views/UserRegistrationView.vue'),
      meta: { requiresAuth: true, roles: [profiles.admin] }
    },
    {
      path: '/user/list',
      name: 'ListUser',
      component: () => import('@/modules/users/views/UserListView.vue'),
      meta: { requiresAuth: true, roles: [profiles.admin] }
    }
    // Adicione outras rotas aqui, como para cadastro de dispositivos, etc.
];

export default userRoutes;