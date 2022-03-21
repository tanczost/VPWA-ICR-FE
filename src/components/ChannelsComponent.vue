<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      prompt: ref(false),
      private: ref(false),
    };
  },
  methods: {
    openChannel() {
      console.log('REEEEEEEEEE');
    },
  },
};
</script>

<template>
  <q-drawer show-if-above side="left" bordered class="q-ml-xs">
    <!-- drawer content -->
    <div class="text-h4 q-mt-sm" style="text-align: center">Channels</div>

    <div style="width: 100%; align-items: center; display: flex">
      <q-btn flat style="width: 100%">
        <b>
          <i style="color: red">NEW &nbsp;</i>
          channelname
        </b>
      </q-btn>
    </div>

    <div class="q-pa-md channels-drawer" style="max-width: 350px">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="account_circle"
          label="Private"
        >
          <q-list dense bordered padding>
            <div v-for="channelName in 50" :key="channelName">
              <q-item clickable v-ripple @click="openChannel">
                <q-item-section>{{ channelName }} Item private </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="public" label="Public">
          <q-list dense bordered padding>
            <div v-for="channelName in 50" :key="channelName">
              <q-item clickable v-ripple @click="openChannel">
                <q-item-section>{{ channelName }} Item </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>
      </q-list>
    </div>
    <section class="new-group">
      <q-btn
        icon="add_circle_outline"
        flat
        label="create new group"
        color="primary"
        style="width: 100%"
        @click="prompt = true"
      />
    </section>
  </q-drawer>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create new channel</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="name"
          autofocus
          @keyup.enter="prompt = false"
          label="Channel name"
        />

        <div>
          <q-checkbox v-model="private" label="Private" />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss"></style>
