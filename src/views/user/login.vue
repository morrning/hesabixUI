<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :disabled="loading" :title="$t('app.name')"
          :subtitle="$t('user.login_label')">
          <v-card-text class="text-justify">
            {{ $t('login.des') }}
          </v-card-text>
          <v-form :disabled="loading" ref="form" fast-fail @submit.prevent="submit()">
            <v-card-text>
              <v-text-field class="mb-2" :label="$t('user.email')" :placeholder="$t('user.email_placeholder')"
                single-line v-model="user.email" type="email" variant="outlined" prepend-inner-icon="mdi-email"
                :rules="rules.email"></v-text-field>

              <v-text-field class="mb-2" :label="$t('user.password')" :placeholder="$t('user.password_placeholder')"
                single-line type="password" variant="outlined" prepend-inner-icon="mdi-lock" :rules="rules.password"
                v-model="user.password"></v-text-field>
              <v-btn :disabled="loading" :loading="loading" block type="submit" class="text-none mb-4"
                color="indigo-darken-3" size="x-large" variant="flat" prepend-icon="mdi-login">
                {{ $t('user.login') }}
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="dangerLight" prepend-icon="mdi-close-octagon " :title="$t('dialog.error')"
        :text="$t('login.input_fail')">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat" @click="dialog = false; user.password = ''" />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from 'vue';

export default {
  name: 'login',
  data() {
    const self = this;
    return {
      loading: false,
      dialog: false,
      user: {
        email: '',
        password: '',
        standard: true
      },
      rules: {
        email: [
          (value: any) => self.validate(value, 'email'),
        ],
        password: [
          (value: any) => self.validate(value, 'password'),
        ],
      }
    }
  },
  mounted() {

  },
  methods: {
    validate(input: string, type: string) {
      if (type == 'email') {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(input)) return true
        return this.$t('validator.email_not_valid')
      }
      else if (type == 'password') {
        if (input == undefined) {
          return false
        }
        else if (input.length > 5) return true
        return this.$t('validator.password_len_lower')
      }
    },
    async submit() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.loading = true;
        axios.post('/api/user/login', this.user).then((response: any) => {
          if (response.data.Success == true) {
            localStorage.setItem('X-AUTH-TOKEN', response.data.data.token);
            window.location.replace('/');
          }
        }).catch((resp) => {
          this.loading = false;
          this.dialog = true;
        });
      }

    }
  }
}
</script>