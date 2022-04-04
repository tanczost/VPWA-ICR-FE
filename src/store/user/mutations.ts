import { User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_START(state) {
    state.status = 'pending';
    state.errors = [];
  },
  AUTH_SUCCESS(state, user: User | null) {
    state.status = 'success';
    state.user = user;
  },
  AUTH_ERROR(state, errors) {
    state.status = 'error';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.errors = errors;
  },
  setUserStatus(state, newStatus: number) {
    if (state.user) {
      state.user.status = newStatus;
    }
  },
};

export default mutation;
