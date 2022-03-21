<script lang="ts">
import { defineComponent } from 'vue';

interface State {
  icon: boolean;
  message: string[];
  sendMessage: string;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      message: [],
      sendMessage: '',
    };
  },
  methods: {
    send() {
      if (this.sendMessage != '') {
        this.message.push(this.sendMessage);
      }
      this.sendMessage = '';
    },
  },
});
</script>

<template>
  <q-page-container>
    <div class="text-h3 q-ma-sm">
      <q-icon name="question_answer" />
      Chat - Spolok juznych obcanov 🐗
    </div>
    <q-separator />
    <div class="q-pa-md row justify-center">
      <q-chat-message name="me" :text="['hey, how are you?']" sent />
      <div style="width: 90%" v-for="text in message" :key="text">
        <q-chat-message
          v-if="!!message.length"
          name="Lacinko"
          :text="[text]"
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
          v-model="sendMessage"
          placeholder="Type a message"
          @keyup.enter="send"
        />
        <q-btn round flat icon="send" @click="send" />
      </q-toolbar>
    </q-footer>
  </q-page-container>
</template>

<style lang="scss"></style>
