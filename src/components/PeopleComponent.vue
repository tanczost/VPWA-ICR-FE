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
      Admins
    </div>
    <div class="q-pa-md">
      <div v-for="n in 2" :key="n" class="q-mt-sm">
        <q-list bordered separator>
          <q-item v-ripple nowrap>
            <q-item-section style="max-width: 5%">
              <q-icon name="fiber_manual_record" style="color: red" />
            </q-item-section>
            <q-item-section> {{ n }} Admin </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="text-h4 q-mt-sm" style="padding-left: 15px">
      <q-icon name="people" />
      People
    </div>
    <div class="q-pa-md">
      <div v-for="n in 50" :key="n">
        <q-list bordered separator>
          <q-item v-ripple nowrap>
            <q-item-section style="max-width: 5%">
              <q-icon name="fiber_manual_record" style="color: green" />
            </q-item-section>
            <q-item-section> {{ n }} user </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-drawer>
</template>
