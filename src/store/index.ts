import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import VuexPersistence from 'vuex-persist';

import drawerStore from './drawerStore';
import { DrawerStateInterface } from './drawerStore/state';

import userStore from './user';
import { UserStateInterface } from './user/state';

import channelStore from './channel';
import { ChannelStateInterface } from './channel/state';

import activityStore from './activity';
import { ActivityStateInterface } from './activity/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  userStore: UserStateInterface;
  channelStore: ChannelStateInterface;
  drawerStore: DrawerStateInterface;
  activityStore: ActivityStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

const vuexLocal = new VuexPersistence<StateInterface>({
  storage: window.localStorage,
});

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      userStore,
      channelStore,
      drawerStore,
      activityStore,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
    plugins: [vuexLocal.plugin],
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
