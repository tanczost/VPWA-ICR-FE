<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginComponent',
  data() {
    return {
      count: 2,
      username: '',
      password: '',
    };
  },
  computed: {},
  methods: {
    login() {
      console.log(this.username + this.password);
    },
  },
});
</script>

<template>
  <q-card class="card-login">
    <q-card-section>
      <div class="text-h4">Login</div>
      <q-input
        class="input-alignment"
        outlined
        v-model="username"
        label="Username"
      />
      <q-input
        class="input-alignment"
        type="password"
        outlined
        v-model="password"
        label="Password"
      />
      <section class="column input-alignment">
        <q-btn
          color="primary"
          label="Login"
          @click="login"
          class="input-alignment"
          href="#/"
        />
        <section class="row register-alignment justify-center">
          <p>Dont have an accout? &nbsp;</p>
          <a href="#/register"> Sign up</a>
        </section>
      </section>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.card-login {
  width: 35%;
}

.input-alignment {
  margin-top: 20px;
}

.register-alignment {
  margin-top: 10px;
  display: flex;
}

@media (max-width: $breakpoint-sm-max) {
  .card-login {
    width: 50%;
  }
}

@media (max-width: $breakpoint-xs-max) {
  .card-login {
    width: 80%;
  }
}
</style>
