import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  getMyNickName(state: UserStateInterface): string | undefined {
    return state.user?.nickName;
  },

  getMyToken(state: UserStateInterface): string {
    if (state.token) return `bearer ${state.token?.token}`;
    else return '';
  },

  getUserInfo(state: UserStateInterface) {
    return state.user;
  },
};

export default getters;
