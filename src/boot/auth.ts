import { boot } from 'quasar/wrappers';
import { authManager, notificationService } from 'src/services';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    guestOnly?: boolean;
  }
}

const loginRoute = (from: RouteLocationNormalized): RouteLocationRaw => {
  return {
    name: 'login',
    query: { redirect: from.fullPath },
  };
};

// this boot file wires together authentication handling with router
export default boot(({ router, store }) => {
  // if the token was removed from storage, redirect to login
  authManager.onLogout(() => {
    void router.push(loginRoute(router.currentRoute.value));
  });

  // add route guard to check auth user
  router.beforeEach(async (to) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isAuthenticated = await store.dispatch('userStore/check');

    // route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
      // check if logged in if not, redirect to login page
      console.log(to);
      return loginRoute(to);
    }

    if (isAuthenticated) notificationService.join();

    if (isAuthenticated && to.params.groupId) {
      const groupId = to.params.groupId as string;
      store.commit('channelStore/SET_ACTIVE', parseInt(groupId));
    }

    // route is only for guests so redirect to home
    if (to.meta.guestOnly && isAuthenticated) {
      console.log('entry');
      return { name: 'home' };
    }
  });
});
