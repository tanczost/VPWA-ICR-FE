<script lang="ts">
import { activityService } from 'src/services';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { UserState } from './models';

interface State {
  icon: boolean;
  status: string;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      status: 'Online',
    };
  },
  computed: {
    ...mapGetters('userStore', {
      getUserInfo: 'getUserInfo',
      getMyNickname: 'getMyNickName',
    }),
    isLeftSideDrawerOpen: {
      get() {
        return this.$store.state.drawerStore.leftDrawerOpened;
      },
      set(value: boolean) {
        this.$store.commit('drawerStore/setLeftDrawer', value);
      },
    },
    isRightSideDrawerOpen: {
      get() {
        return this.$store.state.drawerStore.rightDrawerOpened;
      },
      set(value: boolean) {
        this.$store.commit('drawerStore/setRightDrawer', value);
      },
    },
  },
  methods: {
    getMyState(state: number): string {
      return UserState[state - 1];
    },
    async ChangeStatus(index: number) {
      if (index === this.$store.state.userStore.user?.status) {
        return;
      }

      await activityService
        .getActivitySocket()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ?.changeStatus(this.getMyNickname, index);
      this.$store.commit('userStore/setUserStatus', index);
    },
    async logout() {
      try {
        await this.$store.dispatch('userStore/logout');

        this.$popUpService.createPopUp('Logout successful', 'green');
      } catch (error) {
        this.$popUpService.createPopUp('Logout failed, try again! ', 'red');
      }
    },
  },
  mounted() {
    this.$store.commit('userStore/setUserStatus', 1);
  },
});
</script>

<template>
  <q-header elevated class="bg-secondary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="groups"
        style="font-size: 20px"
        @click="isLeftSideDrawerOpen = !isLeftSideDrawerOpen"
      />
      <q-toolbar-title class="row justify-end">
        <section
          class="col-md-11 col-sm-10 col-xs-8"
          style="align-self: center; cursor: pointer"
          @click="$router.replace(`/`)"
        >
          SWAPPER
        </section>
        <section class="col-md-1 col-sm-2 col-xs-4">
          <div class="q-pa-md">
            <q-btn-dropdown class="glossy" color="black" icon="settings">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-subtitle1 q-mt-md q-mb-xs column">
                    <strong style="text-transform: uppercase">{{
                      getUserInfo.nickName
                    }}</strong>
                    {{ getMyState(getUserInfo.state) }}
                  </div>
                  <q-separator />
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    <q-btn
                      flat
                      label="change your status"
                      color="primary"
                      @click="icon = true"
                    />
                  </div>
                  <q-btn flat label="log out" color="red" @click="logout" />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </section>
      </q-toolbar-title>

      <q-dialog v-model="icon">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Change your status</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  keep-color
                  v-model="status"
                  val="Online"
                  label="Online"
                  color="teal"
                  @click="ChangeStatus(1)"
                />
                <q-radio
                  keep-color
                  v-model="status"
                  val="Do Not Disturb"
                  label="Do Not Disturb"
                  color="red"
                  @click="ChangeStatus(2)"
                />
                <q-radio
                  keep-color
                  v-model="status"
                  val="Offline"
                  label="Offline"
                  color="gray"
                  @click="ChangeStatus(3)"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-btn
        dense
        round
        flat
        icon="person_search"
        style="font-size: 20px"
        @click="isRightSideDrawerOpen = !isRightSideDrawerOpen"
      />
    </q-toolbar>
  </q-header>
</template>
