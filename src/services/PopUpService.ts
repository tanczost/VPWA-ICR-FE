import type { BootCallback } from '@quasar/app';
import { StateInterface } from 'src/store';
import { Notify } from 'quasar';
import { AppVisibility } from 'quasar';

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
    if (this.params?.store.state.userStore.user?.status === 1) {
      Notify.create({
        message,
        color,
        position: 'top',
        actions: actions,
      });
    }
  }
}
