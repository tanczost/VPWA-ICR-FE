import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

const getters: GetterTree<ChannelStateInterface, StateInterface> = {
  getActiveChannel(state: ChannelStateInterface) {
    return state.channels.find((c) => c.id === state.active);
  },
  getPrivateChannels(state: ChannelStateInterface) {
    return state.channels.filter((channel) => channel.private);
  },
  getPublicChannels(state: ChannelStateInterface) {
    return state.channels.filter((channel) => !channel.private);
  },
  joinedChannels(context) {
    return context.channels;
  },
  joinedChannelsIds(context) {
    return context.channels.map((channel) => channel.id);
  },
  currentMessages(context) {
    const channel = context.channels.find(
      (channel) => channel.id === context.active
    );
    return channel?.messages.filter((message) => message !== null) ?? [];
  },
  currentTypers(context) {
    const channel = context.channels.find(
      (channel) => channel.id === context.active
    );
    return channel?.typers.filter((message) => message !== null) ?? [];
  },
  lastMessageOf(context) {
    return (channelId: number) => {
      const messages = context.channels[channelId].messages;
      return messages.length > 0 ? messages[messages.length - 1] : null;
    };
  },
  getLoadingState(context) {
    return context.loading;
  },
};

export default getters;
