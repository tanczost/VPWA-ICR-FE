import { MutationTree } from 'vuex';
import { DrawerStateInterface } from './state';

const mutation: MutationTree<DrawerStateInterface> = {
  setLeftDrawer(state: DrawerStateInterface, value: boolean) {
    state.leftDrawerOpened = value;
  },
  setRightDrawer(state: DrawerStateInterface, value: boolean) {
    state.rightDrawerOpened = value;
  },
};

export default mutation;
