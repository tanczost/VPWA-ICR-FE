import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ActivityStateInterface } from './state';

const actions: ActionTree<ActivityStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
