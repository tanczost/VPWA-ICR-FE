import axios from 'axios';
import { Channel, ChannelUsers } from 'src/components/models';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

interface NewChannelState {
  name: string;
  private: boolean;
}

interface ChannelResponse {
  userId: number;
  channels: Channel[];
}

interface ChannelUser {
  channelId: number;
  users: ChannelUsers[];
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

  async getChannels(): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const token = `bearer ${this.state.userStore.token?.token}`;

      const allChannelsResult = await axios.get<ChannelResponse>(
        'http://localhost:3333/user/my-channels/',
        { headers: { Authorization: token } }
      );

      if (allChannelsResult.status === 200) {
        const userChannelsResult = await Promise.all(
          allChannelsResult.data.channels.map(async (currentChannel) => {
            if (currentChannel.id != undefined) {
              try {
                const channelUsersResult = await axios.get<ChannelUser>(
                  `http://localhost:3333/channel/${currentChannel.id}/users`,
                  { headers: { Authorization: token } }
                );

                if (channelUsersResult.status == 200) {
                  const channel: Channel = {
                    id: currentChannel.id,
                    private: currentChannel.private,
                    name: currentChannel.name,
                    lastActivity: undefined,
                    ownerName: 'Jozo',
                    users: channelUsersResult.data.users,
                    messages: [],
                  };
                  return channel;
                }

                return false;
              } catch (error) {
                console.error(error);
                return false;
              }
            }
          })
        );
        this.commit('channelStore/storeChannels', userChannelsResult);
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
