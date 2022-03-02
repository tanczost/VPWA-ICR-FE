<template>
  <q-page class="row items-center justify-evenly">
    <c-login />
  </q-page>
</template>

<script lang="ts">
import cLogin from 'components/LoginComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  components: { cLogin },
});
</script>
