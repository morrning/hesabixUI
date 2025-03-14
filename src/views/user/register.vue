<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card
          :loading="loading ? 'blue' : undefined"
          :title="$t('app.name')"
          :subtitle="$t('user.register_label')"
          :disabled="!canRegister"
        >
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

              <!-- بخش کپچا -->
              <v-row class="mb-2" dense>
                <v-col cols="12" sm="6">
                  <v-img :src="captchaImage" max-height="50" max-width="150" class="captcha-img" contain></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    :label="$t('captcha.enter_code')"
                    v-model.number="user.captcha"
                    variant="outlined"
                    type="number"
                    :rules="rules.captcha"
                    required
                    hide-details
                    prepend-inner-icon="mdi-refresh"
                    @click:prepend-inner="loadCaptcha"
                    :loading="captchaLoading"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- چک‌باکس قوانین -->
              <v-checkbox
                v-model="termsAccepted"
                :label="$t('user.register_terms_des')"
                :rules="[(v) => !!v || $t('validator.terms_required')]"
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

  <!-- دیالوگ خطا یا غیرفعال بودن عضویت -->
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card
        :color="canRegister ? 'dangerLight' : 'warning'"
        :prepend-icon="canRegister ? 'mdi-close-octagon' : 'mdi-alert'"
        :title="canRegister ? $t('dialog.error') : $t('dialog.warning')"
        :text="dialogMessage"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :text="$t('dialog.ok')"
            variant="flat"
            @click="dialog = false; if (!canRegister) $router.push('/user/login')"
          />
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
      showCaptcha: true,
      termsAccepted: false,
      captchaImage: '',
      canRegister: true, // وضعیت عضویت
      dialogMessage: '',
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
    this.checkRegisterStatus();
    this.loadData();
  },
  methods: {
    validate(input: string, type: string) {
      if (type === 'fill') {
        if (input?.length > 0) return true;
        return this.$t('validator.required');
      } else if (type === 'email') {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input)) return true;
        return this.$t('validator.email_not_valid');
      } else if (type === 'password') {
        if (!input) return false;
        if (input.length > 7) return true;
        return this.$t('validator.password_len_lower');
      } else if (type === 'mobile') {
        const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
        if (regex.test(input)) return true;
        return this.$t('validator.mobile_not_valid');
      }
    },
    loadData() {
      this.loadCaptcha();
    },
    async loadCaptcha() {
        this.captchaLoading = true;
        try {
            const timestamp = new Date().getTime(); // پارامتر تصادفی
            const response = await axios.get(`/api/captcha/image?t=${timestamp}`, {
                responseType: 'blob',
                withCredentials: true,
            });
            const imageUrl = URL.createObjectURL(response.data);
            this.captchaImage = imageUrl;
        } catch (error) {
            this.dialogMessage = this.$t('captcha.load_error');
            this.dialog = true;
        } finally {
            this.captchaLoading = false;
        }
    },
    async checkRegisterStatus() {
      try {
        const response = await axios.get('/api/user/check-register-status');
        if (response.data.result === 1) {
          this.canRegister = response.data.canRegister;
          if (!this.canRegister) {
            this.dialogMessage = 'عضویت کاربران جدید توسط مدیر سیستم غیرفعال شده است.';
            this.dialog = true;
          }
        }
      } catch (error) {
        this.dialogMessage = 'خطا در بررسی وضعیت عضویت. لطفاً دوباره تلاش کنید.';
        this.dialog = true;
      }
    },
    async submit() {
      if (!this.canRegister) {
        this.dialogMessage = 'عضویت کاربران جدید غیرفعال است.';
        this.dialog = true;
        return;
      }

      const { valid } = await (this.$refs.form as any).validate();
      if (valid) {
        this.loading = true;

        const inviteCode = localStorage.getItem('inviteCode') || '0';

        const userData = {
          name: this.user.name,
          email: this.user.email,
          mobile: this.user.mobile,
          password: this.user.password,
          captcha_answer: this.user.captcha.toString(),
          inviteCode: inviteCode
        };

        axios.post('/api/user/register', userData, {
          withCredentials: true,
        })
          .then((response) => {
            if (response.data.Success === false) {
              this.response = response.data;
              this.dialogMessage = this.response.message;
              this.dialog = true;
              this.loadCaptcha();
            } else {
              this.$router.push('/user/active-account/' + this.user.mobile);
            }
          })
          .catch((error) => {
            this.dialogMessage = error.response?.data?.error || this.$t('dialog.error_unknown');
            this.dialog = true;
            this.loadCaptcha();
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