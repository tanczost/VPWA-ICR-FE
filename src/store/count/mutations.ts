import { MutationTree } from 'vuex';
import { CountStateInterface } from './state';

const mutation: MutationTree<CountStateInterface> = {
  increment(state: CountStateInterface) {
    state.count++;
  },
  double(state: CountStateInterface) {
    state.count = state.count * 2;
  },
};

export default mutation;
