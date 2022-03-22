import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DrawerStateInterface } from './state';

const actions: ActionTree<DrawerStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
