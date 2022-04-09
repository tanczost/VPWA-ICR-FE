/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { authService, authManager } from 'src/services';
import { User } from 'src/components/models';
import { LoginData } from 'src/services/AuthService';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async check({ commit }) {
    try {
      commit('AUTH_START');
      const user = await authService.me();
      commit('AUTH_SUCCESS', user);
      return user !== null;
    } catch (err) {
      commit('AUTH_ERROR', err);
      throw err;
    }
  },
  async register({ commit }, form: User) {
    try {
      commit('AUTH_START');
      const user = await authService.register(form);
      commit('AUTH_SUCCESS', null);
      return user;
    } catch (err) {
      commit('AUTH_ERROR', err);
      throw err;
    }
  },
  async login({ commit }, credentials: LoginData) {
    try {
      commit('AUTH_START');
      const apiToken = await authService.login(credentials);
      commit('AUTH_SUCCESS', apiToken);
      // save api token to local storage and notify listeners
      authManager.setToken(apiToken.token);
      return apiToken;
    } catch (err) {
      commit('AUTH_ERROR', err);
      throw err;
    }
  },
  async logout({ commit, dispatch }) {
    try {
      commit('AUTH_START');
      await authService.logout();
      await dispatch('channelStore/leave', null, { root: true });
      commit('AUTH_SUCCESS', null);
      // remove api token and notify listeners
      authManager.removeToken();
    } catch (err) {
      commit('AUTH_ERROR', err);
      throw err;
    }
  },
};

export default actions;
