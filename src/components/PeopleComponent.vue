<script>
export default {};
</script>

<template>
  <q-drawer show-if-above side="right" bordered class="q-ml-xs">
    <div class="text-h4 q-mt-sm">Admins</div>
    <div class="q-pa-md">
      <div v-for="n in 2" :key="n" class="q-mt-sm">
        <q-banner rounded class="bg-negative text-white">
          {{ n }} userko
        </q-banner>
      </div>
    </div>

    <div class="text-h4 q-mt-sm">People</div>
    <div class="q-pa-md">
      <div v-for="n in 50" :key="n">
        <q-btn-dropdown
          class="q-ma-xs bg-secondary text-white"
          :label="n"
          style="width: 95%"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h5 q-mb-md">Name Surname</div>
              <div class="text-h6 q-mb-md">Status</div>
            </div>
          </div>
        </q-btn-dropdown>
      </div>
    </div>
  </q-drawer>
</template>
