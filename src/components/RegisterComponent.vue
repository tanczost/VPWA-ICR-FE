<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {
  minLength,
  required,
  helpers,
  email,
  sameAs,
} from '@vuelidate/validators';

interface State {
  count: number;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  successfullRegistration: boolean;
}

export default defineComponent({
  name: 'RegisterComponent',
  setup() {
    return {
      v$: useVuelidate({ $autoDirty: true }),
    };
  },
  data(): State {
    return {
      count: 2,
      firstname: '',
      lastname: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      successfullRegistration: true,
    };
  },
  computed: {
    redirectTo(): RouteLocationRaw {
      return { name: 'login' };
    },
    loading(): boolean {
      return this.$store.state.userStore.status === 'pending';
    },
  },
  methods: {
    async register() {
      const data = {
        nickName: this.nickname,
        firstName: this.firstname,
        lastName: this.lastname,
        password: this.password,
        email: this.email,
      };

      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$errors.forEach((e) => {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: e.$message.toString(),
          });
        });

        return;
      }

      void this.$store.dispatch('userStore/register', data).then(() => {
        this.$q.notify({ message: 'Register successful', color: 'green' });
        return this.$router.push(this.redirectTo);
      });
    },
  },
  validations() {
    return {
      nickname: {
        required: helpers.withMessage('Nickname is mandatory field.', required),
        minLength: helpers.withMessage(
          'Nickname should have at least 3 characters',
          minLength(3)
        ),
      },
      password: {
        required: helpers.withMessage('Password is mandatory field.', required),
        minLength: helpers.withMessage(
          'Password should have at least 6 characters',
          minLength(6)
        ),
      },
      firstname: {
        required: helpers.withMessage(
          'Firstname is mandatory field.',
          required
        ),
        minLength: helpers.withMessage(
          'Firstname should have at least 3 characters',
          minLength(3)
        ),
      },
      lastname: {
        required: helpers.withMessage('Lastname is mandatory field.', required),
        minLength: helpers.withMessage(
          'Lastname should have at least 3 characters',
          minLength(3)
        ),
      },
      email: {
        required: helpers.withMessage('Email is mandatory field.', required),
        email,
      },
      confirmPassword: {
        required: helpers.withMessage(
          'Confirm password is mandatory field.',
          required
        ),
        sameAsPassword: helpers.withMessage(
          'The passwords do not match.',
          sameAs(this.password)
        ),
      },
    };
  },
});
</script>
<template>
  <q-card class="card-register">
    <q-card-section>
      <div class="text-h4">Registration</div>
      <section class="column-xs row-sm justify-between name-row">
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
          required
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
          :loading="loading"
          class="input-alignment"
        />
        <section class="row register-alignment justify-center">
          <p>Already have an accout? &nbsp;</p>
          <a href="/auth/login"> Sign in</a>
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

  .name-input-width {
    width: 100%;
  }
}
</style>
