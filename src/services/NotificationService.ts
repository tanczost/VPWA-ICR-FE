import { BootParams, SocketManager } from './SocketManager';

class NotificationSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    // const channelId = this.namespace.split('/').pop() as string;

    this.socket.on('invite', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call

      console.log('i got invite');
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
    console.log(this.notificationSocket);
    if (this.notificationSocket !== null) {
      throw new Error('User is already joined in notifications');
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
