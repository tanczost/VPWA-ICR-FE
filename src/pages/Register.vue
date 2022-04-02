<template>
  <q-page class="row items-center justify-evenly">
    <c-register />
  </q-page>
</template>

<script lang="ts">
import cRegister from 'components/RegisterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterPage',
  components: { cRegister },
});
</script>
