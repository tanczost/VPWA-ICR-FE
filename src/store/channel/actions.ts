/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from 'src/boot/axios';
import {
  Channel,
  ChannelUsers,
  Message,
  RawMessage,
} from 'src/components/models';
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
  async addChannel({}, channel: Channel): Promise<number> {
    try {
      const requestData: NewChannelState = {
        name: channel.name,
        private: channel.private,
      };

      const { channelId } = await channelService.addChannel(requestData);

      this.commit('channelStore/addChannel', { ...channel, id: channelId });
      return channelId;
    } catch (error) {
      const newChannel = await channelService.joinPublicChannel(channel.name);

      this.commit('channelStore/addChannel', { ...newChannel });
      this.commit('channelStore/SET_ACTIVE', newChannel.id);

      console.error(error);
      return -1;
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
                  page: 2,
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
    commit('NEW_MESSAGE', { channelId, message: newMessage, type: 'push' });
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
      commit('LOADING_SUCCESS', { channelId, messages, type: 'shift' });
    } catch (err) {
      commit('LOADING_ERROR', err);
      throw err;
    }
  },

  async loadMessages(
    { commit },
    { channelId, pageNumber }: { channelId: number; pageNumber: number }
  ) {
    try {
      commit('LOADING_START');
      const messages = await channelService
        .in(channelId)
        ?.loadMessages(pageNumber);

      commit('LOADING_SUCCESS', { channelId, messages });
      commit('incrementPage', channelId);
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

  async acceptInvite({}, inviteId: number) {
    try {
      const channel = await channelService.acceptInvite(inviteId);
      if (!channel.id) return;
      const channelUsersResult = await api.get<ChannelUser>(
        `/channel/${channel.id}/users`
      );

      channel.users = channelUsersResult.data.users;
      this.commit('channelStore/addChannel', channel);
      this.commit('userStore/removeInvite', inviteId);
    } catch (err) {
      console.error(err);
    }
  },
  async declineInvite({}, inviteId: number) {
    try {
      await channelService.declineInvite(inviteId);

      this.commit('userStore/removeInvite', inviteId);
    } catch (err) {
      console.error(err);
    }
  },

  async kickUser(
    { commit },
    { userNick, channelId }: { userNick: string; channelId: number }
  ) {
    const newMessage = await channelService.in(channelId)?.kickUser(userNick);
    commit('NEW_MESSAGE', { channelId, message: newMessage, type: 'push' });
  },

  async revokeUser(
    { commit },
    { userNick, channelId }: { userNick: string; channelId: number }
  ) {
    const newMessage = (await channelService
      .in(channelId)
      ?.revokeUser(userNick)) as Message;
    commit('NEW_MESSAGE', { channelId, message: newMessage, type: 'push' });
  },

  async quitChannel({}, channelId: number) {
    await channelService.in(channelId)?.quitChannel(channelId);
  },
};

export default actions;
