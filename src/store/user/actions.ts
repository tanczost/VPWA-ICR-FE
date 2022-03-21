import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { User } from '../../components/models';
import axios from 'axios';

interface LoginData {
  nickName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async registerUser({}, user: User): Promise<boolean> {
    try {
      const result = await axios.post('http://localhost:3333/registration/', {
        ...user,
      });

      if (result.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async loginUser({}, loginData: LoginData): Promise<boolean> {
    try {
      const result = await axios.post<LoginResponse>(
        'http://localhost:3333/login/',
        {
          ...loginData,
        }
      );

      this.commit('userStore/saveUser', result.data.user);
      this.commit('userStore/saveToken', result.data.token);

      if (result.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default actions;
