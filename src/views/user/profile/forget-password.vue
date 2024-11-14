<script>
import { defineComponent } from 'vue'
import axios from "axios";
import { ref } from 'vue';
export default defineComponent({
  name: "forget_password",
  data() {
    const self = this;
    return {
      loading: ref(false),
      dialog: ref(false),
      mobile: '',
      rules: {
        mobile: [
          (value) => self.validate(value, 'mobile'),
        ]
      },
      response: {
        code: '',
        message: '',
        Success: false
      }
    }
  },
  mounted() {

  },
  methods: {
    validate(input) {
      var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      if (regex.test(input)) return true
      return this.$t('validator.mobile_not_valid')
    },
    async submit() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.loading = true;
        axios.post('/api/user/forget/password/send-code', { mobile: this.mobile }).then((response) => {
          if (response.data.Success == true) {
            this.$router.push('/user/forget-password-submit-code');
          }
          else {
            this.response = response.data;
            this.dialog = true;
          }
        })
      }
    }
  }
})
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :title="$t('app.name')" :subtitle="$t('user.forget_password')">
          <v-card-text>
            <v-form ref="form" :disabled="loading" fast-fail @submit.prevent="submit()">
              <v-text-field v-model="mobile" class="mb-2" :label="$t('user.mobile')"
                :placeholder="$t('user.mobile_placeholder')" single-line type="phone" variant="outlined"
                prepend-inner-icon="mdi-phone" :rules="rules.mobile"></v-text-field>
              <v-btn :loading="loading" block class="text-none mb-4" color="indigo-darken-3" size="x-large"
                variant="flat" prepend-icon="mdi-send-circle" type="submit">
                {{ $t('user.send_code_forget_password') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="dangerLight" prepend-icon="mdi-close-octagon " :title="$t('dialog.error')"
        :text="response.message">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat"
            @click="dialog = false; loading = false; mobile = ''" />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped></style>
