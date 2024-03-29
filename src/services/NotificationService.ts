import { Invitation } from 'src/components/models';
import { BootParams, SocketManager } from './SocketManager';
import { popUpService } from 'src/boot/popup';

class NotificationSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    // const channelId = this.namespace.split('/').pop() as string;

    this.socket.on('invite', (invite: Invitation) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const message = `${invite.invitedByNickName} invited you to the channel: ${invite.channelName}`;
      popUpService.createPopUp(message, 'red');
      store.commit('userStore/addInvitation', invite);
    });
  }

  public addMember(channelId: number, userNick: string): Promise<void> {
    return this.emitAsync('addMember', channelId, userNick);
  }
}

class NotificationService {
  private notificationSocket: NotificationSocketManager | null = null;
  // private notificationSocket: NotificationSocketManager;

  public join(): NotificationSocketManager {
    if (this.notificationSocket !== null) {
      return this.notificationSocket;
    }

    // connect to given channel namespace
    this.notificationSocket = new NotificationSocketManager('/notifications');
    return this.notificationSocket;
  }

  public leave(): void {
    // disconnect namespace and remove references to socket
    this.notificationSocket?.destroy();
    this.notificationSocket = null;
  }

  public getNotificationSocket(): NotificationSocketManager | null {
    return this.notificationSocket;
  }
}

export default new NotificationService();
