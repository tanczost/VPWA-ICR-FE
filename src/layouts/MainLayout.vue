<script>
import { ref } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';

export default {
  setup() {
    return {
      icon: ref(false),
      notificationModel: ref('ON'),
      status: ref('Online'),
      name: ref('Ladislav Sokol')
    };
  },
  components: {cNavbar}
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar></c-navbar>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
