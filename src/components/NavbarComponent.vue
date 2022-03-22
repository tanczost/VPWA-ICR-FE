<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    return {
      icon: ref(false),
      notificationModel: ref('ON'),
      status: ref('Online'),
      name: ref('Ladislav Sokol'),
    };
  },
};
</script>

<template>
  <q-header elevated class="bg-secondary text-white">
    <q-toolbar>
      <q-toolbar-title class="row justify-end">
        <section class="col-11" style="align-self: center">
          <q-avatar style="font-size: 60px" icon="message"> </q-avatar>
          SWAPPER
        </section>
        <section class="col-1">
          <div class="q-pa-md">
            <q-btn-dropdown class="glossy" color="black" icon="settings">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-subtitle1 q-mt-md q-mb-xs column">
                    <strong>{{ name }}</strong>
                    {{ status }}
                  </div>
                  <q-separator />
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    <q-btn
                      flat
                      label="change your status"
                      color="primary"
                      @click="icon = true"
                    />
                  </div>
                  <q-toggle
                    :label="'Notifications: ' + notificationModel"
                    color="green"
                    false-value="OFF"
                    true-value="ON"
                    v-model="notificationModel"
                  />
                  <q-separator />
                  <q-btn flat label="log out" color="primary" href="#/login" />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </section>
      </q-toolbar-title>

      <q-dialog v-model="icon">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Change your status</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  keep-color
                  v-model="status"
                  val="Online"
                  label="Online"
                  color="teal"
                />
                <q-radio
                  keep-color
                  v-model="status"
                  val="Do Not Disturb"
                  label="Do Not Disturb"
                  color="red"
                />
                <q-radio
                  keep-color
                  v-model="status"
                  val="Offline"
                  label="Offline"
                  color="gray"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- <q-btn dense flat round icon="menu" /> -->
    </q-toolbar>
  </q-header>
</template>
