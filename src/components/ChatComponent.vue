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
  showLeaveConfirmationDialog: boolean;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      message: [],
      sendMessage: '',
      typers: ['Laci', 'Palo', 'Tanczi', 'Lakatos Brandon'],
      showAllTypersDialog: false,
      currentTyper: '',
      currentText: '',
      showCurrentTypersDialog: false,
      showLeaveConfirmationDialog: false,
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
    <section class="row">
      <div class="text-h3 q-ma-sm chat-title">Spolok juznych obcanov 🐗</div>
      <div class="centerY">
        <q-btn
          @click="showLeaveConfirmationDialog = true"
          color="red"
          label="Leave"
        />
      </div>
    </section>
    <q-separator />
    <div class="q-pa-md row justify-center">
      <div style="width: 90%">
        <q-chat-message name="me" :text="['hey, how are you?']" sent />
        <b>
          <i class="text-red"> New messages &nbsp;</i>
        </b>
        <q-separator color="red" />
        <div v-for="text in message" :key="text">
          <q-chat-message
            v-if="!!message.length"
            name="Lacinko"
            :text="[text]"
            text-color="white"
            bg-color="secondary"
          />
        </div>
      </div>
    </div>

    <q-footer class="bg-white row bottom-text">
      <section v-if="typers.length < 4">
        <b
          v-for:="name in typers"
          :key="name"
          class="name"
          @click="openCurrentMessage(name)"
        >
          {{ name }}&nbsp;
        </b>
      </section>
      <section v-else>
        <b
          v-for:="name in typers.slice(0, 3)"
          :key="name"
          class="name"
          @click="openCurrentMessage(name)"
        >
          {{ name }}&nbsp;
        </b>
        <b class="name" @click="showAllTypersDialog = true"> and more&nbsp; </b>
      </section>
      <p
        v-if="typers.length == 1"
        class="text-black"
        style="margin-bottom: 0px"
      >
        is&nbsp;
      </p>
      <p v-else class="text-black" style="margin-bottom: 0px">are&nbsp;</p>
      <p class="text-black" style="margin-bottom: 0px">typing...&nbsp;</p>
    </q-footer>
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

  <q-dialog v-model="showAllTypersDialog" persistent>
    <q-card class="chat-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5">Current text messages</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div v-for:="name in typers" :key="name">
          <b>{{ name }}</b
          >: random text haha
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showCurrentTypersDialog" persistent>
    <q-card class="chat-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5">{{ currentTyper }}'s current message</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>
          {{ currentText }}
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showLeaveConfirmationDialog" persistent>
    <q-card style="min-width: 40%">
      <q-card-section>
        <div class="text-h6">Do you want to leave this group?</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Negative" v-close-popup color="red" />
        <q-btn flat label="YES!" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.bottom-text {
  bottom: 50px;
  padding-left: 20px;
}
.name {
  color: black;
  cursor: pointer;
}
.centerY {
  display: flex;
  align-items: center;
}
.chat-title {
  width: 85%;
}

.chat-dialog {
  width: 40%;
}

@media (max-width: 1200px) {
  .chat-title {
    width: 78%;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .chat-title {
    font-size: 35px;
    width: 70%;
  }
  .centerY {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: flex-end;
    width: 25%;
  }

  .chat-dialog {
    width: 60%;
  }
}

@media (max-width: $breakpoint-sm-min) {
  .chat-title {
    font-size: 25px;
  }

  .chat-dialog {
    width: 80%;
  }
}
</style>
