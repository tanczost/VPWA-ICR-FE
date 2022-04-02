/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from 'src/boot/axios';
import { Channel, ChannelUsers } from 'src/components/models';
import { channelService } from 'src/services';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

export interface NewChannelState {
  name: string;
  private: boolean;
}

export interface ChannelResponse {
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

      await channelService.addChannel(requestData);

      this.commit('channelStore/addChannel', { ...channel });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getChannels(): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions

      const allChannelsResult = await channelService.getChannels();

      const userChannelsResult = await Promise.all(
        allChannelsResult.channels.map(async (currentChannel) => {
          if (currentChannel.id != undefined) {
            try {
              const channelUsersResult = await api.get<ChannelUser>(
                `/channel/${currentChannel.id}/users`
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
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default actions;
