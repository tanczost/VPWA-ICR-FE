import { Channel } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

const mutation: MutationTree<ChannelStateInterface> = {
  addChannel(state: ChannelStateInterface, channel: Channel) {
    state.channels.push(channel);
  },

  removeChannel(state: ChannelStateInterface, channelId: number) {
    state.channels = state.channels.filter(
      (channel) => channel.id !== channelId
    );
  },
};

export default mutation;
