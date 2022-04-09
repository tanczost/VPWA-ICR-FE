import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ChannelStateInterface } from './state';

const getters: GetterTree<ChannelStateInterface, StateInterface> = {
  getPrivateChannels(state: ChannelStateInterface) {
    return state.channels.filter((channel) => channel.private);
  },
  getPublicChannels(state: ChannelStateInterface) {
    return state.channels.filter((channel) => !channel.private);
  },
  joinedChannels(context) {
    return context.channels;
  },
  currentMessages(context) {
    const channel = context.channels.find(
      (channel) => channel.id === context.active
    );
    return channel?.messages.filter((message) => message !== null) ?? [];
  },
  lastMessageOf(context) {
    return (channelId: number) => {
      const messages = context.channels[channelId].messages;
      return messages.length > 0 ? messages[messages.length - 1] : null;
    };
  },
};

export default getters;
