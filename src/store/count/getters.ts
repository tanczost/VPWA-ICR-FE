import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CountStateInterface } from './state';

const getters: GetterTree<CountStateInterface, StateInterface> = {
  getCount(state): number {
    return state.count;
  },
};

export default getters;
