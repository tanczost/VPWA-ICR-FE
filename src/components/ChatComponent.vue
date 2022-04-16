<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Message } from './models';

interface State {
  icon: boolean;
  newMessage: string;
  typers: string[];
  showAllTypersDialog: boolean;
  currentTyper: string;
  currentText: string;
  showCurrentTypersDialog: boolean;
  showLeaveConfirmationDialog: boolean;
  loading: boolean;
  showAllPeopleInChat: boolean;
}

export default defineComponent({
  data(): State {
    return {
      icon: false,
      newMessage: '',
      typers: [],
      showAllTypersDialog: false,
      currentTyper: '',
      currentText: '',
      showCurrentTypersDialog: false,
      showLeaveConfirmationDialog: false,
      loading: false,
      showAllPeopleInChat: false,
    };
  },
  props: {
    messages: {
      type: Array as PropType<Message[]>,
      default: () => [],
    },
  },
  computed: {
    redirectToHome(): RouteLocationRaw {
      return (this.$route.query.redirect as string) || { name: 'home' };
    },
    ...mapGetters('channelStore', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf',
      getActiveChannel: 'getActiveChannel',
    }),
    ...mapGetters('userStore', {
      getMyNickName: 'getMyNickName',
      getMyId: 'getMyId',
    }),
    getChannelByID() {
      return this.$store.state.channelStore.channels.find(
        (channel) => channel.id == +this.$route.params.groupId
      );
    },
    getChannelUsers() {
      return this.$store.state.channelStore.channels.find(
        (channel) => channel.id == +this.$route.params.groupId
      )?.users;
    },
  },
  methods: {
    isMention(mentions: string[]): boolean {
      return mentions.includes(
        this.$store.state.userStore.user?.nickName ?? ''
      );
    },
    isMine(message: Message): boolean {
      return message.author.id === this.$store.state.userStore.user?.id;
    },
    async leaveChannel() {
      await this.leave(this.$store.state.channelStore.active);
      return this.$router.push(this.redirectToHome);
    },
    async send() {
      if (this.newMessage.startsWith('/')) {
        if (this.newMessage.startsWith('/list')) {
          this.showAllPeopleInChat = true;
          this.newMessage = '';
          return;
        }

        await this.$commandService.command(this.newMessage);
        this.newMessage = '';
        return;
      }

      this.loading = true;
      await this.addMessage({
        channelId: this.$store.state.channelStore.active,
        message: this.newMessage,
      });
      this.newMessage = '';
      this.loading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async onLoad(index: any, done: any) {
      const activeId = this.$store.state.channelStore.active;
      const page = this.$store.state.channelStore.channels.find(
        (channel) => channel.id === activeId
      )?.page;
      await this.loadMessages({
        channelId: activeId,
        pageNumber: page,
      });
      done();
    },
    ...mapMutations('channelStore', {
      setActiveChannel: 'SET_ACTIVE',
    }),
    ...mapActions('user', ['logout']),
    ...mapActions('channelStore', {
      addMessage: 'addMessage',
      leave: 'leave',
      addMember: 'addMember',
      loadMessages: 'loadMessages',
      kickUser: 'kickUser',
      revokeUser: 'revokeUser',
      quitChannel: 'quitChannel',
    }),
  },
  openCurrentMessage(name: string) {
    this.currentTyper = name;
    this.currentText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including";
    this.showCurrentTypersDialog = true;
  },
});
</script>

<template>
  <q-page-container>
    <section
      class="row channel-header"
      style="box-shadow: 3px 3px 5px 6px #ccc"
    >
      <div class="text-h3 q-ma-sm chat-title">
        {{ getChannelByID?.name }}
      </div>
      <div class="centerY">
        <q-btn
          @click="showLeaveConfirmationDialog = true"
          color="red"
          label="Leave"
        />
      </div>
    </section>
    <q-infinite-scroll @load="onLoad" reverse>
      <div class="q-pa-md row justify-center">
        <div style="width: 90%">
          <q-chat-message
            v-for="message in messages"
            :key="message.id"
            :name="message.author.nickName"
            :text="[message.content.text]"
            :stamp="message.createdAt"
            :sent="isMine(message)"
            :class="{ msg: true, mention: isMention(message.content.mentions) }"
          />
        </div>
      </div>
      <q-footer class="bg-white row bottom-text">
        <section v-if="typers.length < 4">
          <b v-for:="name in typers" :key="name" class="name">
            {{ name }}&nbsp;
          </b>
        </section>
        <section v-else>
          <b v-for:="name in typers.slice(0, 3)" :key="name" class="name">
            {{ name }}&nbsp;
          </b>
          <b class="name" @click="showAllTypersDialog = true">
            and more&nbsp;
          </b>
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
    </q-infinite-scroll>
    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-input
          rounded
          outlined
          dense
          class="WAL__field col-grow q-mr-sm"
          bg-color="white"
          v-model="newMessage"
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
        <q-btn flat label="YES!" @click="leaveChannel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showAllPeopleInChat">
    <q-card style="min-width: 40%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">People in this conversation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <ul v-for="user in getChannelUsers" :key="user.username">
          <li>{{ user.username }}</li>
        </ul>
      </q-card-section>
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

.channel-header {
  position: sticky;
  top: 65px;
  z-index: 1;
  background-color: white;
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

.msg {
  padding: 10px;
}

.mention {
  background-color: aliceblue;
}
</style>
