import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // try redirect to home route
    redirect: () => ({ name: 'home' }),
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        meta: { guestOnly: true },
        component: () => import('pages/Register.vue'),
      },
      {
        path: 'login',
        name: 'login',
        meta: { guestOnly: true },
        component: () => import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/channels/:groupId?',
    // channels requires auth
    meta: { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/ChannelPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
