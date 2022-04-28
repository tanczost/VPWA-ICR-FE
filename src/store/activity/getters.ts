import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ActivityStateInterface } from './state';

const getters: GetterTree<ActivityStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
