<script lang="ts">
import { defineComponent } from 'vue';

interface Commands {
  command: string;
  example: string;
  description: string;
}

interface State {
  commands: Commands[];
}

export default defineComponent({
  data(): State {
    return {
      commands: [
        {
          command: '/join',
          example: '/join channelName',
          description: `You can only join public channels, but if there is no
            channel with that name, you can create with this command.
            If you want to create private channel use [private] at the end.`,
        },
        {
          command: '/invite',
          example: '/invite userName',
          description: `You can only invite users to public channels or channels
           that are created by you`,
        },
        {
          command: '/kick',
          example: '/kick userName',
          description: `You can kick any user from channel. If you are admin
          you are automatically ban him.`,
        },
        {
          command: '/cancel',
          example: '/cancel',
          description: 'You can revoke your membership in current channel.',
        },
        {
          command: '@name',
          example: '@userName text',
          description: `You can mention other users in the same channel with
          @-symbol.`,
        },
      ],
    };
  },
});
</script>

<template>
  <q-page-container>
    <div class="text-h3 q-ma-sm" style="text-align: center">
      WELCOME TO SWAPPER
    </div>
    <q-separator />
    <div class="text-h6 q-ma-sm column center-y">
      <h6 style="width: 60%; text-align: center">
        Select from public/private channels in order to see the conversation. If
        you don't have any private channels you can create your own, or check
        your invitations to join one.
      </h6>
      <div class="center-y">
        <q-list bordered class="rounded-borders" style="max-width: 600px">
          <q-item v-for="command in commands" :key="command.command">
            <q-item-section avatar top>
              <q-icon name="terminal" color="black" size="34px" />
            </q-item-section>

            <q-item-section top class="col-2 gt-sm">
              <q-item-label class="q-mt-sm">{{ command.command }}</q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{ command.example }}</span>
              </q-item-label>
              <q-item-label caption>
                {{ command.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page-container>
</template>

<style lang="scss">
.center-y {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
</style>
