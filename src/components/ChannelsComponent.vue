<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

interface State {
  showNewChannelDialog: boolean;
  showInviteDialog: boolean;
  isNewChannelPrivate: boolean;
  channelNameInvite: number;
  newChannelName: string;
}

export default defineComponent({
  data(): State {
    return {
      showNewChannelDialog: false,
      showInviteDialog: false,
      isNewChannelPrivate: false,
      channelNameInvite: 0,
      newChannelName: '',
    };
  },
  computed: {
    ...mapGetters('userStore', { getMyNickName: 'getMyNickName' }),
    isLeftSideDrawerOpened: {
      get() {
        return this.$store.state.drawerStore.leftDrawerOpened;
      },
      set(value: boolean) {
        this.$store.commit('drawerStore/setLeftDrawer', value);
      },
    },
  },
  methods: {
    openChannel() {
      console.log('REEEEEEEEEE');
    },
    setChannelName(channelName: number) {
      this.channelNameInvite;
      this.channelNameInvite = channelName;
      this.showInviteDialog = true;
    },
    async createChannel() {
      const result = (await this.$store.dispatch('channelStore/addChannel', {
        name: this.newChannelName,
        private: this.isNewChannelPrivate,
        ownerUserName: this.getMyNickName as string,
        users: [],
        messages: [],
      })) as boolean;

      if (result) {
        this.$q.notify({
          message: 'Channel  successfully created',
          color: 'green',
        });
        this.showNewChannelDialog = false;
        this.newChannelName = '';
        this.isNewChannelPrivate = false;
      } else {
        this.$q.notify({ message: 'Channel can not be created', color: 'red' });
      }
    },
  },
});
</script>

<template>
  <q-drawer
    v-model="isLeftSideDrawerOpened"
    side="left"
    bordered
    class="q-ml-xs"
  >
    <div class="text-h4 q-mt-sm" style="text-align: center">Channels</div>
    <div class="q-pa-md channels-drawer" style="max-width: 350px">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="account_circle"
          label="Private"
        >
          <q-list dense bordered padding>
            <div v-for="channelName in 50" :key="channelName">
              <q-item clickable v-ripple @click="openChannel">
                <q-item-section>{{ channelName }} Item private </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="public" label="Public">
          <q-list dense bordered padding>
            <div v-for="channelName in 50" :key="channelName">
              <q-item clickable v-ripple @click="openChannel">
                <q-item-section>{{ channelName }} Item </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="group_add" label="Invitations">
          <q-list dense bordered padding>
            <div v-for="channelName in 3" :key="channelName">
              <q-item clickable v-ripple @click="setChannelName(channelName)">
                <q-item-section>{{ channelName }} Invite </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>
      </q-list>
    </div>
    <section class="new-group">
      <q-btn
        icon="add_circle_outline"
        flat
        label="create new channel"
        color="primary"
        style="width: 100%"
        @click="showNewChannelDialog = true"
      />
    </section>
  </q-drawer>

  <q-dialog v-model="showNewChannelDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create new channel</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="newChannelName"
          autofocus
          @keyup.enter="showNewChannelDialog = false"
          label="Channel name"
        />
        <div>
          <q-checkbox v-model="isNewChannelPrivate" label="Private" />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create" v-close-popup @click="createChannel" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showInviteDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New channel invite: {{ channelNameInvite }}</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Decline" v-close-popup color="red" />
        <q-btn flat label="Accept" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss"></style>
