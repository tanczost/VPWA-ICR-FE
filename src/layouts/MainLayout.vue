<script lang="ts">
import { defineComponent } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';

interface State {
  icon: boolean;
  message: string[];
  sendMessage: string;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      message: [''],
      sendMessage: '',
    };
  },
  components: { cNavbar, cChannels, cPeople, cChat },
});
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar />
    <c-channels />
    <c-people />
    <c-chat />
  </q-layout>
</template>
