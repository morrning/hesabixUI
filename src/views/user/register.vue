<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :title="$t('app.name')" :subtitle="$t('user.register_label')">
          <v-card-text>
            <v-form ref="form" :disabled="loading" fast-fail @submit.prevent="submit()">
              <v-text-field
                  class="mb-2"
                  :label="$t('user.name')"
                  :placeholder="$t('user.name_des')"
                  single-line
                  v-model="user.name"
                  type="text"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                  :rules="rules.name"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.email')"
                  :placeholder="$t('user.email_placeholder')"
                  single-line
                  v-model="user.email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  :rules="rules.email"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.mobile')"
                  :placeholder="$t('user.mobile_placeholder')"
                  single-line
                  v-model="user.mobile"
                  type="tel"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  :rules="rules.mobile"
              ></v-text-field>

              <v-text-field
                  class="mb-2"
                  :label="$t('user.password')"
                  :placeholder="$t('user.password_register_des')"
                  single-line
                  type="password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  :rules="rules.password"
                  v-model="user.password"
              ></v-text-field>

              <!-- بخش کپچا (همیشه نمایش داده می‌شه) -->
              <v-row class="mb-2" dense>
                <v-col cols="12" sm="6">
                  <v-img :src="captchaImage" max-height="50" max-width="150" class="captcha-img" contain></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field dense :label="$t('captcha.enter_code')" placeholder="کپچا" v-model.number="user.captcha"
                    variant="outlined" type="number" :rules="rules.captcha" required hide-details
                    prepend-inner-icon="mdi-refresh" @click:prepend-inner="loadCaptcha" :loading="captchaLoading">
                  </v-text-field>
                </v-col>
              </v-row>

              <!-- چک‌باکس قوانین -->
              <v-checkbox
                  v-model="termsAccepted"
                  :label="$t('user.register_terms_des')"
                  :rules="[(v: any) => !!v || $t('validator.terms_required')]"
                  required
                  class="mb-2"
              ></v-checkbox>

              <v-btn
                  :loading="loading"
                  block
                  class="text-none mb-4"
                  color="indigo-darken-3"
                  size="x-large"
                  variant="flat"
                  prepend-icon="mdi-account-plus"
                  type="submit"
              >
                {{ $t('user.register') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="dangerLight" prepend-icon="mdi-close-octagon" :title="$t('dialog.error')"
        :text="response.message">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat" @click="dialog = false; loading = false;" />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";

axios.defaults.withCredentials = true;

export default defineComponent({
  name: "register",
  data() {
    const self = this;
    return {
      loading: false,
      captchaLoading: false,
      dialog: false,
      showCaptcha: true, // همیشه کپچا نمایش داده می‌شه
      termsAccepted: false,
      captchaImage: '',
      user: {
        name: '',
        email: '',
        mobile: '',
        password: '',
        captcha: '',
      },
      rules: {
        name: [
          (value: any) => self.validate(value, 'fill'),
        ],
        email: [
          (value: any) => self.validate(value, 'email'),
        ],
        mobile: [
          (value: any) => self.validate(value, 'mobile'),
        ],
        password: [
          (value: any) => self.validate(value, 'password'),
        ],
        captcha: [
          (value: any) => !!value || self.$t("captcha.required"),
        ],
      },
      response: {
        code: '',
        message: '',
        Success: false,
        data: {
          id: ''
        }
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    validate(input: string, type: string) {
      if (type == 'fill') {
        if (input?.length > 0) return true;
        return this.$t('validator.required');
      } else if (type == 'email') {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input)) return true;
        return this.$t('validator.email_not_valid');
      } else if (type == 'password') {
        if (!input) return false;
        if (input.length > 7) return true;
        return this.$t('validator.password_len_lower');
      } else if (type == 'mobile') {
        const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
        if (regex.test(input)) return true;
        return this.$t('validator.mobile_not_valid');
      }
    },
    loadData() {
      this.loadCaptcha(); // لود اولیه کپچا
    },
    async loadCaptcha() {
      this.captchaLoading = true;
      try {
        const response = await axios.get('/api/captcha/image', {
          responseType: 'blob',
          withCredentials: true,
        });
        const imageUrl = URL.createObjectURL(response.data);
        this.captchaImage = imageUrl;
      } catch (error) {
        this.response.message = 'خطا در بارگذاری کپچا';
        this.dialog = true;
      } finally {
        this.captchaLoading = false;
      }
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;

        const userData: { name: string; email: string; mobile: string; password: string; captcha_answer: string } = {
          name: this.user.name,
          email: this.user.email,
          mobile: this.user.mobile,
          password: this.user.password,
          captcha_answer: this.user.captcha.toString(), // همیشه کپچا ارسال می‌شه
        };

        axios.post('/api/user/register', userData, {
          withCredentials: true,
        })
          .then((response: any) => {
            if (response.data.Success == false) {
              this.response = response.data;
              this.dialog = true;
              this.loadCaptcha(); // کپچا رو نوسازی می‌کنیم
            } else {
              this.$router.push('/user/active-account/' + this.user.mobile);
            }
          })
          .catch((error: any) => {
            this.response.message = error.response?.data?.error || 'خطا در ثبت‌نام';
            this.dialog = true;
            this.loadCaptcha(); // کپچا رو نوسازی می‌کنیم
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
});
</script>

<style scoped>
.captcha-img {
  display: block;
  margin: 0 auto;
}
</style>