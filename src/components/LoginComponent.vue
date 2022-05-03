<script lang="ts">
import { LoginData } from 'src/services/AuthService';
import { defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';

interface State {
  count: number;
  nickName: string;
  password: string;
}

export default defineComponent({
  name: 'LoginComponent',
  setup() {
    return {
      v$: useVuelidate({ $autoDirty: true }),
    };
  },
  data(): State {
    return {
      count: 2,
      nickName: '',
      password: '',
    };
  },
  computed: {
    redirectTo(): RouteLocationRaw {
      return (this.$route.query.redirect as string) || { name: 'home' };
    },
    loading(): boolean {
      return this.$store.state.userStore.status === 'pending';
    },
  },
  methods: {
    async login() {
      const data: LoginData = {
        nickName: this.nickName,
        password: this.password,
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

      void this.$store
        .dispatch('userStore/login', data)
        .then(async () => {
          const channels = (await this.$store.dispatch(
            'channelStore/getChannels'
          )) as boolean;

          console.log(channels);
          this.$popUpService.createPopUp('Login successful', 'green');
          return this.$router.push(this.redirectTo);
        })
        .catch(() => {
          this.$popUpService.createPopUp('Bad credentials', 'red');
        });
    },
  },
  validations() {
    return {
      nickName: {
        required: helpers.withMessage('Nickname is mandatory field.', required),
        minLength: helpers.withMessage(
          'Nickname should have at least 3 characters',
          minLength(3)
        ),
      },
      password: {
        equired: helpers.withMessage('Password is mandatory field.', required),
        minLength: helpers.withMessage(
          'Password should have at least 6 characters',
          minLength(6)
        ),
      },
    };
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
        v-model="nickName"
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
          :loading="loading"
          class="input-alignment"
        />
        <section class="row register-alignment justify-center">
          <p>Dont have an accout? &nbsp;</p>
          <a href="/auth/register"> Sign up</a>
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
