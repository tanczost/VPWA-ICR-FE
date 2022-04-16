import { boot } from 'quasar/wrappers';
import { CommandService } from 'src/services/CommandService';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $commandService: CommandService;
  }
}

const commandService = new CommandService();

export default boot((params) => {
  params.app.config.globalProperties.$commandService = commandService;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  commandService.boot(params);
});

export { commandService };
