import { api } from 'src/boot/axios';
import { Message } from 'src/components/models';
import { ChannelResponse, NewChannelState } from 'src/store/channel/actions';
import { BootParams, SocketManager } from './SocketManager';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const channelId = this.namespace.split('/').pop() as string;

    this.socket.on('message', (message: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      store.commit('channelStore/NEW_MESSAGE', { channelId, message });
    });
  }

  public addMessage(message: string): Promise<Message> {
    return this.emitAsync('addMessage', message);
  }

  public loadMessages(): Promise<Message[]> {
    return this.emitAsync('loadMessages');
  }
}

class ChannelService {
  private channels: Map<number, ChannelSocketManager> = new Map();

  public join(channelId: number): ChannelSocketManager {
    if (this.channels.has(channelId)) {
      throw new Error(
        `User is already joined in channel with id: "${channelId}"`
      );
    }

    // connect to given channel namespace
    const channel = new ChannelSocketManager(`/channels/${channelId}`);
    this.channels.set(channelId, channel);
    return channel;
  }

  public leave(channelId: number): boolean {
    const channel = this.channels.get(channelId);

    if (!channel) {
      return false;
    }

    // disconnect namespace and remove references to socket
    channel.destroy();
    return this.channels.delete(channelId);
  }

  public in(channelId: number): ChannelSocketManager | undefined {
    return this.channels.get(channelId);
  }

  async getChannels(): Promise<ChannelResponse> {
    const result = await api.get<ChannelResponse>('/user/my-channels/');
    return result.data;
  }

  async addChannel(requestData: NewChannelState): Promise<void> {
    await api.post('/channel/', {
      ...requestData,
    });
    // add join channel
  }
}

export default new ChannelService();
