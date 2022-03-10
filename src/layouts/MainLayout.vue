<script>
import { ref } from 'vue';
import cNavbar from '../components/NavbarComponent.vue';

export default {
  setup() {
    return {
      icon: ref(false),
      message: ref(['as'])
    };
  },
  components: {cNavbar}
};
</script>

<template>
  <q-layout view="hHh LpR lFr">
    <c-navbar></c-navbar>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
       <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        :text="['hey, how are you?']"
        sent
      />
      <q-chat-message
        name="Lacinko"
        :text="message"
      />
    </div>
  </div>
  <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message[0]" placeholder="Type a message" />
          <q-btn round flat icon="send" />
        </q-toolbar>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>
