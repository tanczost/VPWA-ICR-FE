import { User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  saveUser(state: UserStateInterface, user: User) {
    state.user = user;
  },

  saveToken(state: UserStateInterface, token: string) {
    state.token = token;
  },
};

export default mutation;
