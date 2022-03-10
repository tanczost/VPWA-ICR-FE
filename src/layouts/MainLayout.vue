<template>
  <q-layout view="hHh LpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
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

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="text-h4 q-mt-sm">People</div>
      <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
