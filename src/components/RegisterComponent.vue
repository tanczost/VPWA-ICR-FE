<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterComponent',
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
    <p @click="increment">Register</p>
    <p>Count: {{ count }}</p>
  </div>
</template>
