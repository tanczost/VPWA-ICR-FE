<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'OptionsComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('counter', { getCount: 'getCount' }),
  },
  methods: {
    ...mapMutations('counter', {
      increment: 'increment',
      double: 'double',
    }),
  },
});
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <p @click="increment">Click on me Patyo</p>
    <p @click="double">Click on me Laci</p>
    <p>Count: {{ getCount }}</p>
  </div>
</template>
