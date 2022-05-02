import { api } from 'src/boot/axios';
import { Channel, Message, Typer } from 'src/components/models';
import { ChannelResponse, NewChannelState } from 'src/store/channel/actions';
import { BootParams, SocketManager } from './SocketManager';
import { RouteLocationRaw } from 'vue-router';
import { popUpService } from 'src/boot/popup';
import { DateTime } from 'luxon';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
interface NewChannelResponse {
  channelId: number;
}

class ChannelSocketManager extends SocketManager {
  public subscribe({ store, router }: BootParams): void {
    const channelId = this.namespace.split('/').pop() as string;

    this.socket.on('message', (message: Message) => {
      const actions = [
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
            void router.push(`/channels/${channelId}`);
          },
        },
      ];
      const channel = store.state.channelStore.channels.find(
        (channel) => channel.id === +channelId
      );
      if (!channel) {
        return;
      }
      popUpService.showMessageNotifications(
        message.content.text,
        'green',
        channel.name,
        message.author.nickName,
        actions
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      store.commit('channelStore/NEW_MESSAGE', { channelId, message });
    });

    this.socket.on('leave', (message: Message, userNick: string) => {
      store.commit('channelStore/removeUser', { channelId, userNick });
      store.commit('channelStore/NEW_MESSAGE', { channelId, message });
    });

    this.socket.on(
      'addUser',
      (user: { username: string; state: number }, channelId: number) => {
        store.commit('channelStore/addUser', { user, channelId });
      }
    );

    this.socket.on('ban', (channelId: number) => {
      store.commit('channelStore/CLEAR_CHANNEL', channelId);
      const destination = {
        name: 'home',
      } as RouteLocationRaw;
      void router.push(destination);
    });

    this.socket.on('delete', (channelId: number) => {
      store.commit('channelStore/CLEAR_CHANNEL', channelId);

      const destination = {
        name: 'home',
      } as RouteLocationRaw;
      void router.push(destination);
    });

    this.socket.on('isTyping', (typer: Typer) => {
      store.commit('channelStore/addTyper', typer);
    });

    this.socket.on('stopTyping', (typer: Typer) => {
      store.commit('channelStore/removeTyper', typer);
    });
  }

  public activityState(username: string): Promise<Message> {
    return this.emitAsync('addMessage', username);
  }

  public addMessage(message: string): Promise<Message> {
    return this.emitAsync('addMessage', message);
  }

  public loadMessages(date?: DateTime): Promise<Message[]> {
    return this.emitAsync('loadMessages', date);
  }

  public loadNewMessages(date: DateTime): Promise<Message[]> {
    return this.emitAsync('loadNewMessages', date);
  }

  public leaveChannel(): Promise<void> {
    return this.emitAsync('leave');
  }

  public kickUser(userNick: string): Promise<Message> {
    return this.emitAsync('kick', userNick);
  }

  public revokeUser(userNick: string): Promise<Message> {
    return this.emitAsync('revoke', userNick);
  }

  public quitChannel(channelId: number): Promise<void> {
    return this.emitAsync('quit', channelId);
  }

  public isTyping(
    message: string,
    userNick: string,
    channelId: number
  ): Promise<void> {
    return this.emitAsync('isTyping', message, userNick, channelId);
  }
}

class ChannelService {
  private channels: Map<number, ChannelSocketManager> = new Map();

  public join(channelId: number): ChannelSocketManager {
    if (this.channels.has(channelId)) {
      const channel = this.channels.get(channelId);
      if (channel) return channel;
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

  async joinPublicChannel(channelName: string): Promise<Channel> {
    const result = await api.get<Channel>(`/channel/${channelName}/join/`);

    return result.data;
  }

  async acceptInvite(inviteId: number): Promise<Channel> {
    const result = await api.get<Channel>(`/invitations/${inviteId}/accept/`);

    return { ...result.data, typers: [] };
  }

  async declineInvite(inviteId: number): Promise<void> {
    await api.get<Channel>(`/invitations/${inviteId}/decline/`);
  }
}

export default new ChannelService();
