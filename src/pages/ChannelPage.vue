<script lang="ts">
import { defineComponent } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';
import cChat from '../components/ChatComponent.vue';
import cHome from '../components/HomeComponent.vue';
import { Channel, Message, Typer } from 'src/components/models';

export default defineComponent({
  name: 'ChannelPage',
  components: { cNavbar, cChannels, cPeople, cChat, cHome },
  created() {
    const channelsIds = this.$store.state.channelStore.channels;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    channelsIds.forEach(async (channel: Channel) => {
      await this.$store.dispatch('channelStore/join', channel.id);
    });
  },
  computed: {
    messages(): Message[] {
      return this.$store.getters['channelStore/currentMessages'];
    },
    typers(): Typer[] {
      return this.$store.getters['channelStore/currentTypers'];
    },
  },
});
</script>

<template>
  <c-navbar />
  <c-channels />
  <c-people />
  <c-chat v-if="$route.params.groupId" :messages="messages" :typers="typers" />
  <c-home v-else />
</template>
