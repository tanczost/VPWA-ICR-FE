<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegisterComponent',
  data() {
    return {
      count: 2,
      firstname: '',
      lastname: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {},
  methods: {
    register() {
      console.log('registered');
    },
  },
});
</script>
<template>
  <q-card class="card-register">
    <q-card-section>
      <div class="text-h4">Register</div>
      <section class="row justify-between name-row">
        <q-input
          class="input-alignment name-input-width"
          outlined
          v-model="firstname"
          label="Firstname"
        />
        <q-input
          class="input-alignment name-input-width"
          outlined
          v-model="lastname"
          label="Lastname"
        />
      </section>

      <q-input
        class="input-alignment"
        outlined
        v-model="nickname"
        label="Nickname"
      />
      <q-input
        type="email"
        class="input-alignment"
        outlined
        v-model="email"
        label="E-mail"
      />

      <q-input
        class="input-alignment"
        type="password"
        outlined
        v-model="password"
        label="Password"
      />
      <q-input
        class="input-alignment"
        type="password"
        outlined
        v-model="confirmPassword"
        label="Confirm password"
      />
      <section class="column input-alignment">
        <q-btn
          color="primary"
          label="Register"
          @click="register"
          class="input-alignment"
        />
        <section class="row register-alignment justify-center">
          <p>Already have an accout? &nbsp;</p>
          <a href=""> Sign in</a>
        </section>
      </section>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.card-register {
  width: 35%;
}

.name-row {
  margin-top: 20px;
}

.name-input-width {
  width: 48%;
}

.input-alignment {
  margin-top: 20px;
}

.register-alignment {
  margin-top: 10px;
  display: flex;
}

@media (max-width: $breakpoint-sm-max) {
  .card-register {
    width: 50%;
  }
}

@media (max-width: $breakpoint-xs-max) {
  .card-register {
    width: 80%;
  }
}
</style>
