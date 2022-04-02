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
};

export default getters;
