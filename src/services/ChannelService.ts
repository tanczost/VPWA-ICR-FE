import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { Channel, Message } from 'src/components/models';
import { ChannelResponse, NewChannelState } from 'src/store/channel/actions';
import { BootParams, SocketManager } from './SocketManager';
import { AppVisibility } from 'quasar';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
interface NewChannelResponse {
  channelId: number;
}

class ChannelSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const channelId = this.namespace.split('/').pop() as string;

    this.socket.on('message', (message: Message) => {
      if (AppVisibility.appVisible) {
        Notify.create({
          caption: `New message from ${message.author.nickName}`,
          message: `${message.content.text}`,
          color: 'primary',
          position: 'top',
          actions: [
            {
              label: 'Dismiss',
              color: 'white',
              handler: () => {
                /* ... */
              },
            },
            {
              label: 'Reply',
              color: 'yellow',
              handler: () => {
                // TODO navigate into channel
              },
            },
          ],
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      store.commit('channelStore/NEW_MESSAGE', { channelId, message });
    });
  }

  public addMessage(message: string): Promise<Message> {
    return this.emitAsync('addMessage', message);
  }

  public loadMessages(pageNumber?: number): Promise<Message[]> {
    const page = pageNumber ?? 1;
    return this.emitAsync('loadMessages', page);
  }

  public leaveChannel(): Promise<void> {
    return this.emitAsync('leave');
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

  async addChannel(requestData: NewChannelState): Promise<NewChannelResponse> {
    const result = await api.post<NewChannelResponse>('/channel/', {
      ...requestData,
    });

    return result.data;
  }

  async acceptInvite(inviteId: number): Promise<Channel> {
    const result = await api.get<Channel>(`/invitations/${inviteId}/accept/`);

    return result.data;
  }

  async declineInvite(inviteId: number): Promise<void> {
    await api.get<Channel>(`/invitations/${inviteId}/decline/`);
  }
}

export default new ChannelService();
