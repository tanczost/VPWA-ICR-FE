import type { BootCallback } from '@quasar/app';
import { StateInterface } from 'src/store';
import { RouteLocationRaw } from 'vue-router';
import { Notify } from 'quasar';

export type BootParams<
  T extends BootCallback<StateInterface> = BootCallback<StateInterface>
> = T extends (params: infer P) => unknown ? P : never;

export class CommandService {
  private params: BootParams | null = null;

  public boot(params: BootParams): void {
    this.params = params;
  }

  private async createChannel(
    newChannelName: string,
    isNewChannelPrivate: boolean
  ) {
    const result = (await this.params?.store.dispatch(
      'channelStore/addChannel',
      {
        name: newChannelName,
        private: isNewChannelPrivate,
        ownerUserName: this.params?.store.state.userStore.user?.nickName,
        users: [],
        messages: [],
      }
    )) as number;

    if (result > 0) {
      Notify.create({
        message: 'Channel  successfully created',
        color: 'green',
      });
    } else {
      Notify.create({
        message: 'Successfully joined to the channel',
        color: 'green',
      });
    }
  }

  public async command(message: string) {
    let chatData = [];
    switch (true) {
      case message.startsWith('/cancel'):
        await this.params?.store.dispatch(
          'channelStore/leave',
          this.params?.store.state.channelStore.active
        );
        const destination = {
          name: 'home',
        } as RouteLocationRaw;
        void this.params?.router.push(destination);
        break;
      case message.startsWith('/invite'):
        const nick = message.split(' ');
        await this.params?.store.dispatch('channelStore/addMember', nick[1]);
        break;

      case message.startsWith('/join'):
        chatData = message.split(' ');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await this.createChannel(
          chatData[1],
          chatData[2] === '[private]' ? true : false
        );
        break;

      case message.startsWith('/kick'):
        chatData = message.split(' ');
        await this.params?.store.dispatch('channelStore/kickUser', {
          userNick: chatData[1],
          channelId: this.params?.store.state.channelStore.active,
        });

        break;
      case message.startsWith('/revoke'):
        chatData = message.split(' ');
        await this.params?.store.dispatch('channelStore/revokeUser', {
          userNick: chatData[1],
          channelId: this.params?.store.state.channelStore.active,
        });
        break;
      case message.startsWith('/quit'):
        await this.params?.store.dispatch(
          'channelStore/quit',
          this.params.store.state.channelStore.active
        );
        break;
    }
  }
}
