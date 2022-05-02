<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

interface State {
  showNewChannelDialog: boolean;
  showInviteDialog: boolean;
  isNewChannelPrivate: boolean;
  channelNameInvite: string;
  newChannelName: string;
  inviteId: number;
}
export default defineComponent({
  data(): State {
    return {
      showNewChannelDialog: false,
      showInviteDialog: false,
      isNewChannelPrivate: false,
      channelNameInvite: '',
      newChannelName: '',
      inviteId: -1,
    };
  },
  computed: {
    ...mapGetters('userStore', {
      getMyNickName: 'getMyNickName',
      getInvites: 'getInvites',
    }),
    ...mapGetters('channelStore', {
      getPrivateChannels: 'getPrivateChannels',
      getPublicChannels: 'getPublicChannels',
    }),
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
    openAcceptInvite(inviteId: number, channelName: string) {
      this.showInviteDialog = true;
      this.inviteId = inviteId;
      this.channelNameInvite = `Do you want to accept invite into  channel ${channelName}?`;
    },
    async acceptInvite() {
      await this.acceptInviteAction(this.inviteId);
      this.showInviteDialog = false;
    },
    async declineInvite() {
      await this.declineInviteAction(this.inviteId);
      this.showInviteDialog = false;
    },
    ...mapMutations('channelStore', {
      setActiveChannel: 'SET_ACTIVE',
    }),
    ...mapActions('channelStore', {
      joinChannel: 'join',
      acceptInviteAction: 'acceptInvite',
      declineInviteAction: 'declineInvite',
    }),
    async openChannel(channelId: number) {
      void this.$router.push(`/channels/${channelId}`);
      this.setActiveChannel(channelId);
      await this.joinChannel(channelId);
    },
    setChannelName(channelName: string) {
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
        await this.$popUpService.createPopUp(
          'Channel  successfully created',
          'green'
        );
        this.showNewChannelDialog = false;
        this.newChannelName = '';
        this.isNewChannelPrivate = false;
      } else {
        await this.$popUpService.createPopUp(
          'Channel can not be created',
          'red'
        );
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
            <p
              v-if="getPublicChannels.length == 0"
              style="padding-left: 16px; padding-top: 16px"
            >
              You aree not in any private channel
            </p>
            <div
              v-for="channelName in getPrivateChannels"
              :key="channelName.id"
            >
              <q-item clickable v-ripple @click="openChannel(channelName.id)">
                <q-item-section>{{ channelName.name }} </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="public" label="Public">
          <q-list dense bordered padding>
            <p
              v-if="getPublicChannels.length == 0"
              style="padding-left: 16px; padding-top: 16px"
            >
              You are not in any public channel
            </p>
            <div v-for="channelName in getPublicChannels" :key="channelName.id">
              <q-item clickable v-ripple @click="openChannel(channelName.id)">
                <q-item-section>{{ channelName.name }} </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="group_add" label="Invitations">
          <q-list dense bordered padding>
            <p
              v-if="getInvites.length == 0"
              style="padding-left: 16px; padding-top: 16px"
            >
              You do not have any invitation
            </p>
            <div v-for="invite in getInvites" :key="invite.id">
              <q-item
                clickable
                v-ripple
                @click="openAcceptInvite(invite.id, invite.channelName)"
              >
                <q-item-section
                  >User {{ invite.invitedByNickName }} invited you in channel
                  {{ invite.channelName }}
                </q-item-section>
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
    <q-card style="min-width: 40%">
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
    <q-card style="min-width: 40%">
      <q-card-section>
        <div class="text-h6">{{ channelNameInvite }}</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Decline"
          @click="declineInvite()"
          v-close-popup
          color="red"
        />
        <q-btn flat label="Accept" @click="acceptInvite()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss"></style>
