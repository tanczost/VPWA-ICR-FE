<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<template>
  <q-layout view="hHh LpR lFr"> <router-view /> </q-layout>
</template>
