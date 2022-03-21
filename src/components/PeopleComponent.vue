<script>
export default {};
</script>

<template>
  <q-drawer show-if-above side="right" bordered class="q-ml-xs">
    <div class="text-h4 q-mt-sm" style="padding-left: 15px">
      <q-icon name="admin_panel_settings" />
      Admins
    </div>
    <div class="q-pa-md">
      <div v-for="n in 2" :key="n" class="q-mt-sm">
        <q-list bordered separator>
          <q-item v-ripple>
            <q-item-section class="row">
              {{ n }} admin
              <q-icon name="fiber_manual_record" style="color: red" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="text-h4 q-mt-sm" style="padding-left: 15px">
      <q-icon name="people" />
      People
    </div>
    <div class="q-pa-md">
      <div v-for="n in 50" :key="n">
        <q-list bordered separator>
          <q-item v-ripple>
            <q-item-section>
              {{ n }} user
              <q-icon name="fiber_manual_record" style="color: green" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-drawer>
</template>
