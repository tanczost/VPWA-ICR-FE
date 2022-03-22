import axios from 'axios';
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

      console.log(channel);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const token = `bearer ${this.state.userStore.token?.token}`;

      const result = await axios.post(
        'http://localhost:3333/channel/',
        {
          ...requestData,
        },
        { headers: { Authorization: token } }
      );

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