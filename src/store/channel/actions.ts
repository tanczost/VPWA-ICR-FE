/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from 'src/boot/axios';
import { Channel, ChannelUsers, RawMessage } from 'src/components/models';
import { channelService, notificationService } from 'src/services';
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

      const { channelId } = await channelService.addChannel(requestData);

      this.commit('channelStore/addChannel', { ...channel, id: channelId });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getChannels(): Promise<boolean> {
    try {
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
                  ownerUsername: currentChannel.ownerUsername,
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
  async addMessage(
    { commit },
    { channelId, message }: { channelId: number; message: RawMessage }
  ) {
    const newMessage = await channelService.in(channelId)?.addMessage(message);
    commit('NEW_MESSAGE', { channelId, message: newMessage });
  },

  async leave({ getters, commit }, channelId: number | null) {
    if (channelId !== null) {
      await channelService.in(channelId)?.leaveChannel();
    }

    const leaving: number[] =
      channelId !== null ? [channelId] : getters.joinedChannelsIds;

    leaving.forEach((c) => {
      channelService.leave(c);
      commit('CLEAR_CHANNEL', c);
    });
  },

  async join({ commit }, channelId: number) {
    try {
      commit('LOADING_START');
      const messages = await channelService.join(channelId).loadMessages();
      commit('LOADING_SUCCESS', { channelId, messages });
    } catch (err) {
      commit('LOADING_ERROR', err);
      throw err;
    }
  },

  async addMember({ state }, userNick: string) {
    const channelId = state.active;
    if (!channelId) {
      return;
    }
    await notificationService
      .getNotificationSocket()
      ?.addMember(channelId, userNick);
  },
};

export default actions;
