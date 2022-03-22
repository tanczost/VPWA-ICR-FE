import { User } from 'src/components/models';
import { MutationTree } from 'vuex';
import { TokenState, UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  saveUser(state: UserStateInterface, user: User) {
    state.user = user;
  },

  saveToken(state: UserStateInterface, token: TokenState) {
    state.token = token;
  },
};

export default mutation;
