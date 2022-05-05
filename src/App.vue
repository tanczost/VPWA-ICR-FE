<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
if (Notification.permission !== 'granted') {
  void Notification.requestPermission().then(() => {
    console.log('permission granted');
  });
}
export default defineComponent({
  name: 'App',
});
</script>
