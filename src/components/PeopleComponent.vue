<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    isRightSideDrawerOpened: {
      get() {
        return this.$store.state.drawerStore.rightDrawerOpened;
      },
      set(value: boolean) {
        this.$store.commit('drawerStore/setRightDrawer', value);
      },
    },
    getChannelUsers() {
      return this.$store.state.channelStore.channels.find(
        (channel) => channel.id == +this.$route.params.groupId
      )?.users;
    },
    getChannelAdmin() {
      return this.$store.state.channelStore.channels.find(
        (channel) => channel.id == +this.$route.params.groupId
      )?.ownerName;
    },
  },
});
</script>

<template>
  <q-drawer
    v-model="isRightSideDrawerOpened"
    side="right"
    bordered
    class="q-ml-xs"
  >
    <div class="text-h4 q-mt-sm" style="padding-left: 15px">
      <q-icon name="admin_panel_settings" />
      Admin
    </div>
    <div class="q-pa-md">
      <div class="q-mt-sm">
        <q-list bordered separator>
          <q-item v-ripple nowrap>
            <q-item-section style="max-width: 5%">
              <q-icon name="fiber_manual_record" style="color: red" />
            </q-item-section>
            <q-item-section> {{ getChannelAdmin }} </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="text-h4 q-mt-sm" style="padding-left: 15px">
      <q-icon name="people" />
      People
    </div>
    <div class="q-pa-md">
      <div v-for="user in getChannelUsers" :key="user.username">
        <q-list v-if="user.username != getChannelAdmin" bordered separator>
          <q-item v-ripple nowrap>
            <q-item-section style="max-width: 5%">
              <q-icon
                v-if="user.state == 1"
                name="fiber_manual_record"
                style="color: green"
              />
              <q-icon
                v-if="user.state == 2"
                name="fiber_manual_record"
                style="color: red"
              />
              <q-icon
                v-if="user.state == 3"
                name="fiber_manual_record"
                style="color: gray"
              />
            </q-item-section>
            <q-item-section> {{ user.username }} </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-drawer>
</template>
