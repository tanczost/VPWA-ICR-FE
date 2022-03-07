import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';
import { User } from '../../components/models';
import axios, { AxiosResponse } from 'axios';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  registerUser({}, user: User): Promise<AxiosResponse> {
    return axios.post('http://localhost:3333/registration/', { ...user });
  },
};

export default actions;
