import { authManager } from '.';
import { BootParams, SocketManager } from './SocketManager';

interface ActivityUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  nickName: string;
  notify: true;
}

class ActivitySocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    this.socket.on('user:list', (onlineUsers: ActivityUser[]) => {
      onlineUsers.forEach((user) => {
        if (user.notify) {
          store.commit('activityStore/addAllOnlineUsers', {
            nickName: user.nickName,
            notify: 1,
          });
        } else {
          store.commit('activityStore/addAllOnlineUsers', {
            nickName: user.nickName,
            notify: 3,
          });
        }
      });
    });

    this.socket.on('user:online', (userNick: string) => {
      store.commit('activityStore/addUserActivity', userNick);
    });

    this.socket.on('user:offline', (userNick: string) => {
      store.commit('activityStore/removeUserActivity', userNick);
    });

    this.socket.on(
      'statusChange',
      (user: { username: string; state: number }) => {
        store.commit('activityStore/changeStatus', user);
      }
    );

    authManager.onChange((token) => {
      if (token) {
        this.socket.connect();
      } else {
        this.socket.disconnect();
      }
    });
  }
  public changeActivity(userNick: string): Promise<void> {
    return this.emitAsync('changeActivity', userNick);
  }

  public changeStatus(nickname: string, status: number): Promise<void> {
    return this.emitAsync('changeStatus', {
      username: nickname,
      state: status,
    });
  }
}

class ActivityService {
  private activitySocket: ActivitySocketManager | null = null;

  public join(): ActivitySocketManager {
    if (this.activitySocket !== null) {
      return this.activitySocket;
    }

    // connect to given channel namespace
    this.activitySocket = new ActivitySocketManager('/');
    return this.activitySocket;
  }

  public leave(): void {
    // disconnect namespace and remove references to socket
    this.activitySocket?.destroy();
    this.activitySocket = null;
  }

  public getActivitySocket(): ActivitySocketManager | null {
    return this.activitySocket;
  }
}

export default new ActivityService();
