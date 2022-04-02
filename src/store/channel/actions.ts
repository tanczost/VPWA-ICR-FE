import { api } from 'src/boot/axios';
import { Channel } from 'src/components/models';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

interface NewChannelState {
  name: string;
  private: boolean;
}

const actions: ActionTree<ChannelStateInterface, StateInterface> = {
  async addChannel({}, channel: Channel): Promise<boolean> {
    try {
      const requestData: NewChannelState = {
        name: channel.name,
        private: channel.private,
      };

      const result = await api.post('http://localhost:3333/channel/', {
        ...requestData,
      });

      if (result.status === 200) {
        this.commit('channelStore/addChannel', { ...channel });
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
