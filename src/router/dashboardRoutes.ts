import { type RouteRecordRaw } from 'vue-router';

const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../components/layout/MainLayout.vue'),
    meta: { 
      requiresAuth: true
    },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Dashboard'
        }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('../views/AnalyticsView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Analytics'
        }
      },
      // {
      //   path: 'telemetry',
      //   children: [
      //     {
      //       path: 'real-time',
      //       name: 'TelemetryRealTime',
      //       component: () => import('../views/telemetry/RealTimeView.vue'),
      //       meta: { 
      //         requiresAuth: true,
      //         title: 'Telemetria - Tempo Real'
      //       }
      //     },
      //     {
      //       path: 'history',
      //       name: 'TelemetryHistory',
      //       component: () => import('../views/telemetry/HistoryView.vue'),
      //       meta: { 
      //         requiresAuth: true,
      //         title: 'Telemetria - Histórico'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'alerts',
      //   children: [
      //     {
      //       path: 'active',
      //       name: 'AlertsActive',
      //       component: () => import('../views/alerts/ActiveView.vue'),
      //       meta: { 
      //         requiresAuth: true,
      //         title: 'Alertas Ativos'
      //       }
      //     },
      //     {
      //       path: 'history',
      //       name: 'AlertsHistory',
      //       component: () => import('../views/alerts/HistoryView.vue'),
      //       meta: { 
      //         requiresAuth: true,
      //         title: 'Histórico de Alertas'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'settings',
      //   name: 'Settings',
      //   component: () => import('../views/SettingsView.vue'),
      //   meta: { 
      //     requiresAuth: true,
      //     title: 'Configurações'
      //   }
      // },
      // {
      //   path: 'users',
      //   name: 'Users',
      //   component: () => import('../views/UsersView.vue'),
      //   meta: { 
      //     requiresAuth: true,
      //     title: 'Usuários'
      //   }
      // },
      {
        path: 'showcase',
        name: 'Showcase',
        component: () => import('../components/showcases/AppShowcaseNavigator.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Showcase'
        }
      }
    ]
  }
];

export default dashboardRoutes; 