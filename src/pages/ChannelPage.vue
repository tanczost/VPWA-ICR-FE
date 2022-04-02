<script lang="ts">
import { defineComponent } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';
import cHome from '../components/HomeComponent.vue';

export default defineComponent({
  name: 'ChannelPage',
  components: { cNavbar, cChannels, cPeople, cChat, cHome },
});
</script>

<template>
  <c-navbar />
  <c-channels />
  <c-people />
  <c-chat v-if="$route.params.groupId" />
  <c-home v-else />
</template>
