<script>
export default {};
</script>

<template>
  <q-drawer show-if-above side="left" bordered class="q-ml-xs">
    <!-- drawer content -->
    <div class="text-h4 q-mt-sm">Channels</div>

    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="account_circle"
          label="Private"
        >
          <div v-for="channelName in 50" :key="channelName">
            <q-card>
              <q-card-section bordered class="q-ma-sm">
                Drawer {{ channelName }} / 50
              </q-card-section>
            </q-card>
          </div>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="public" label="Public">
          <div v-for="channelName in 50" :key="channelName">
            <q-card>
              <q-card-section bordered class="q-ma-sm">
                Drawer {{ channelName }} / 50
              </q-card-section>
            </q-card>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </q-drawer>
</template>
