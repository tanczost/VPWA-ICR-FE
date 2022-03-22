<script lang="ts">
import { defineComponent } from 'vue';

interface State {
  icon: boolean;
  message: string[];
  sendMessage: string;
  typers: string[];
  showAllTypersDialog: boolean;
  currentTyper: string;
  currentText: string;
  showCurrentTypersDialog: boolean;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      message: [],
      sendMessage: '',
      typers: ['Laci', 'Pato', 'Tanczi', 'Lakatos Brandon'],
      showAllTypersDialog: false,
      currentTyper: '',
      currentText: '',
      showCurrentTypersDialog: false,
    };
  },
  methods: {
    send() {
      if (this.sendMessage != '') {
        this.message.push(this.sendMessage);
      }
      this.sendMessage = '';
    },
    openCurrentMessage(name: string) {
      this.currentTyper = name;
      this.currentText =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including";
      this.showCurrentTypersDialog = true;
    },
  },
});
</script>

<template>
  <q-page-container>
    <div class="text-h3 q-ma-sm" style="text-align: center">
      WELCOME TO SWAPPER
    </div>
    <q-separator />
    <div class="text-h6 q-ma-sm column centerY">
      <h6 style="width: 60%; text-align: center">
        Select from public/private channels in order to see the conversation. If
        you don't have any private channels you can create your own, or check
        your invitations to join one.
      </h6>
    </div>
  </q-page-container>
</template>

<style lang="scss">
.centerY {
  display: flex;
  align-items: center;
}
</style>
