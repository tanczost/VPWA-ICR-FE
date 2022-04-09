<script lang="ts">
import { defineComponent } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';
import cHome from '../components/HomeComponent.vue';
import { Message } from 'src/components/models';

export default defineComponent({
  name: 'ChannelPage',
  components: { cNavbar, cChannels, cPeople, cChat, cHome },
  computed: {
    messages(): Message[] {
      return this.$store.getters['channelStore/currentMessages'];
    },
  },
});
</script>

<template>
  <c-navbar />
  <c-channels />
  <c-people />
  <c-chat v-if="$route.params.groupId" :messages="messages" />
  <c-home v-else />
</template>
