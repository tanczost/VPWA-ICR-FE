import type { BootCallback } from '@quasar/app';
import { StateInterface } from 'src/store';
import { Notify } from 'quasar';

export type BootParams<
  T extends BootCallback<StateInterface> = BootCallback<StateInterface>
> = T extends (params: infer P) => unknown ? P : never;

export class PopUpService {
  private params: BootParams | null = null;

  public boot(params: BootParams): void {
    this.params = params;
  }

  public async createPopUp(
    message: string,
    color: 'red' | 'green',
    actions?: unknown[]
  ): Promise<void> {
    const pattern = /\B@[a-z0-9_-]+/gi;
    const found: string[] = message.match(pattern) ?? [];
    const nick = this.params?.store.state.userStore.user?.nickName as string;
    const isMention: boolean = found.includes(`@${nick}`);

    console.log(Notification.permission);
    if (Notification.permission !== 'granted') {
      const result = await Notification.requestPermission();
      console.log(result);
      this.showNotification(message);
    } else {
      this.showNotification(message);
    }

    if (isMention || this.params?.store.state.userStore.user?.status === 1) {
      Notify.create({
        message,
        color,
        position: 'top',
        actions: actions,
      });
    }
  }

  private showNotification(msg: string) {
    const notification = new Notification('Swapper notify', { body: msg });
    console.log(notification);
  }
}
