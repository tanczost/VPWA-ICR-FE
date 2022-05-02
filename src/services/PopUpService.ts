import type { BootCallback } from '@quasar/app';
import { StateInterface } from 'src/store';
import { AppVisibility, Notify } from 'quasar';

export type BootParams<
  T extends BootCallback<StateInterface> = BootCallback<StateInterface>
> = T extends (params: infer P) => unknown ? P : never;

export class PopUpService {
  private params: BootParams | null = null;

  public boot(params: BootParams): void {
    this.params = params;
  }

  public createPopUp(
    message: string,
    color: 'red' | 'green',
    actions?: unknown[]
  ): void {
    const pattern = /\B@[a-z0-9_-]+/gi;
    const found: string[] = message.match(pattern) ?? [];
    const nick = this.params?.store.state.userStore.user?.nickName as string;
    const isMention: boolean = found.includes(`@${nick}`);

    // console.log(Notification.permission);
    // if (Notification.permission !== 'granted') {
    //   const result = await Notification.requestPermission();
    //   console.log(result);
    //   this.showNotification(message);
    // } else {
    //   this.showNotification(message);
    // }

    if (isMention || this.params?.store.state.userStore.user?.status === 1) {
      Notify.create({
        message,
        color,
        position: 'top',
        actions: actions,
      });
    }
  }

  public showMessageNotifications(
    message: string,
    color: 'red' | 'green',
    channel_name: string,
    message_author: string,
    actions?: unknown[]
  ): void {
    if (AppVisibility.appVisible) {
      this.createPopUp(message, color, actions);
    } else {
      const notification = new Notification(`New message in ${channel_name}`, {
        body: `${message_author}: ${message}`,
      });
      console.log(notification);
    }
  }
}
