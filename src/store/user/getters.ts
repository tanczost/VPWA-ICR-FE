import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  getMyNickName(state: UserStateInterface): string | undefined {
    return state.user?.nickName;
  },

  getMyId(state: UserStateInterface): number | undefined {
    return state.user?.id;
  },

  isAuthenticated(context) {
    return context.user !== null;
  },

  getUserInfo(state: UserStateInterface) {
    return state.user;
  },

  getInvites(state: UserStateInterface) {
    return state.user?.invitations;
  },
};

export default getters;
