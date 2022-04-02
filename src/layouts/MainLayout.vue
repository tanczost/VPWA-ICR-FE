<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
