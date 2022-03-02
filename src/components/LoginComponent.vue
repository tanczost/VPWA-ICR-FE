<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginComponent',
  data() {
    return {
      count: 2,
    };
  },
  computed: {},
  methods: {},
});
</script>

<template>
  <div>
    <p @click="count++">Login</p>
    <p>Count: {{ count }}</p>
  </div>
</template>
