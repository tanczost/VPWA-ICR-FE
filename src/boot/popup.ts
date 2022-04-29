import { boot } from 'quasar/wrappers';
import { PopUpService } from 'src/services/PopUpService';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $popUpService: PopUpService;
  }
}

const popUpService = new PopUpService();

export default boot((params) => {
  params.app.config.globalProperties.$popUpService = popUpService;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  popUpService.boot(params);
});

export { popUpService };
