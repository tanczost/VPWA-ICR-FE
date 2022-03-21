<script>
import { ref } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';

export default {
  setup() {
    return {
      icon: ref(false),
      message: ref(['']),
      sendMessage: ref(''),
    };
  },

  components: { cNavbar, cChannels, cPeople, cChat },
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar />
    <c-channels />
    <c-people />
    <c-chat />
  </q-layout>
</template>
