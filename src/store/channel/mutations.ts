import { Channel, Message } from 'src/components/models';
import { MutationTree } from 'vuex';
import { ChannelStateInterface } from './state';

const mutation: MutationTree<ChannelStateInterface> = {
  addChannel(state: ChannelStateInterface, channel: Channel) {
    state.channels.push(channel);
  },

  CLEAR_CHANNEL(state: ChannelStateInterface, channelId: number) {
    state.active = null;
    state.channels = state.channels.filter(
      (channel) => channel.id !== channelId
    );
  },

  storeChannels(state: ChannelStateInterface, channels: Channel[]) {
    state.channels.push(...channels);
  },
  LOADING_START(state: ChannelStateInterface) {
    state.loading = true;
    state.error = null;
  },
  LOADING_SUCCESS(
    state: ChannelStateInterface,
    { channelId, messages }: { channelId: number; messages: Message[] }
  ) {
    state.loading = false;
    const channel = state.channels.find((c) => c.id === channelId);
    if (channel) {
      channel.messages.unshift(...messages);
    }
  },
  LOADING_ERROR(state: ChannelStateInterface, error) {
    state.loading = false;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.error = error;
  },
  SET_ACTIVE(state: ChannelStateInterface, channelId: number) {
    state.active = channelId;
  },
  NEW_MESSAGE(
    state: ChannelStateInterface,
    { channelId, message }: { channelId: number; message: Message }
  ) {
    const channel = state.channels.find((c) => c.id == channelId);
    if (channel) {
      channel.messages.push(message);
    }
  },
  incrementPage(state: ChannelStateInterface, channelId: number) {
    const channel = state.channels.find((c) => c.id == channelId);
    if (channel) {
      channel.page++;
    }
  },
  removeUser(
    state: ChannelStateInterface,
    { channelId, userNick }: { channelId: number; userNick: string }
  ) {
    const channel = state.channels.find((c) => c.id == channelId);
    if (channel) {
      channel.users = channel.users.filter(
        (user) => user.username !== userNick
      );
    }
  },
};

export default mutation;
