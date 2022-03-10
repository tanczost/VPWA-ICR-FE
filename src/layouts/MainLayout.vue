<script>
import { ref } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';
import cChannels from '../components/ChannelsComponent.vue';
import cPeople from '../components/PeopleComponent.vue';

export default {
  setup() {
    return {
      icon: ref(false),
      message: ref(['as']),
    };
  },
  components: { cNavbar, cChannels, cPeople },
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar />
    <c-channels />
    <c-people />

    <q-page-container>
      <div class="text-h3 q-ma-sm">Chat</div>
      <q-separator />
      <div class="q-pa-md row justify-center">
        <div style="width: 90%">
          <q-chat-message name="me" :text="['hey, how are you?']" sent />
          <q-chat-message
            name="Lacinko"
            :text="message"
            text-color="white"
            bg-color="secondary"
          />
        </div>
      </div>
      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message[0]"
            placeholder="Type a message"
          />
          <q-btn round flat icon="send" />
        </q-toolbar>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>
