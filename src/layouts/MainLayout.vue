<script lang="ts">
import { defineComponent, ref } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';
import cHome from '../components/HomeComponent.vue';

export default defineComponent({
  data() {
    return {
      icon: ref(false),
      message: ref(['']),
      sendMessage: ref(''),
    };
  },
  components: { cNavbar, cChannels, cPeople, cChat, cHome },
});
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar />
    <c-channels />
    <c-people />
    <c-chat v-if="$route.params.groupId" />
    <c-home v-else />
  </q-layout>
</template>
