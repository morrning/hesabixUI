<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card :loading="loading ? 'blue' : null" :disabled="loading" :title="$t('app.name')"
          :subtitle="$t('user.login_label')">
          <v-card-text class="text-justify">
            {{ $t("login.des") }}
          </v-card-text>

          <v-form :disabled="loading" ref="form" fast-fail @submit.prevent="submit()">
            <v-card-text>
              <v-text-field class="mb-2" :label="$t('user.mobile')" :placeholder="$t('user.mobile_placeholder')"
                single-line v-model="user.mobile" type="tel" variant="outlined" prepend-inner-icon="mdi-phone"
                :rules="rules.mobile"></v-text-field>

              <v-text-field class="mb-2" :label="$t('user.password')" :placeholder="$t('user.password_placeholder')"
                single-line type="password" variant="outlined" prepend-inner-icon="mdi-lock" :rules="rules.password"
                v-model="user.password"></v-text-field>

               <!-- بخش کپچا -->
               <v-row class="mb-2" dense>
                <v-col cols="12" sm="6">
                  <v-img :src="captchaImage" max-height="50" max-width="150" class="captcha-img"></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field dense :label="$t('captcha.enter_code')" placeholder="کپچا" v-model.number="user.captcha"
                    variant="outlined" type="number" :rules="rules.captcha" required hide-details
                    prepend-inner-icon="mdi-refresh" @click:prepend-inner="loadCaptcha"
                    :loading="captchaLoading">
                  </v-text-field>
                </v-col>
              </v-row>

              <v-btn :disabled="loading" :loading="loading" block type="submit" class="text-none mb-4"
                color="indigo-darken-3" size="x-large" variant="flat" prepend-icon="mdi-login">
                {{ $t("user.login") }}
              </v-btn>
            </v-card-text>
          </v-form>
          <div class="d-flex justify-center pb-5">
            <v-btn :loading="loading" class="text-none" color="primary" variant="tonal" flat
              @click="goto_pwa_page()">نصب وب اپلیکیشن</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="dialog" class="text-center">
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card color="dangerLight" prepend-icon="mdi-close-octagon" :title="$t('dialog.error')" :text="errorMsg">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('dialog.ok')" variant="flat" @click="
            dialog = false;
            user.password = '';
            user.captcha = '';
          " />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

export default {
  name: "login",
  data() {
    const self = this;
    return {
      loading: false,
      captchaLoading: false,
      dialog: false,
      errorMsg: self.$t('login.input_fail'),
      captchaImage: '',
      user: {
        mobile: "",
        password: "",
        captcha: "",
        standard: true,
      },
      rules: {
        mobile: [
          (value: any) => self.validate(value, 'mobile'),
        ],
        password: [
          (value: any) => self.validate(value, "password"),
        ],
        captcha: [
          (value: any) => !!value || self.$t("captcha.required"),
        ],
      },
    };
  },
  methods: {
    validate(input: string, type: string) {
      if (type === "mobile") {
        // حذف فاصله‌ها و تبدیل اعداد فارسی به انگلیسی برای اعتبارسنجی
        const normalizedInput = this.convertPersianToEnglish(input.replace(/\s/g, ''));
        if (/^09\d{9}$/.test(normalizedInput)) return true;
        return this.$t("validator.mobile_not_valid");
      } else if (type === "password") {
        if (!input) return false;
        if (input.length > 5) return true;
        return this.$t("validator.password_len_lower");
      }
    },
    convertPersianToEnglish(input: string): string {
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      return input.split('').map(char => {
        const index = persianNumbers.indexOf(char);
        return index !== -1 ? englishNumbers[index] : char;
      }).join('');
    },
    async loadCaptcha() {
      this.captchaLoading = true;
      try {
        const response = await axios.get('/api/captcha/image', { responseType: 'blob' });
        this.captchaImage = URL.createObjectURL(response.data);
      } catch (error) {
        this.errorMsg = 'خطا در بارگذاری کپچا';
        this.dialog = true;
      } finally {
        this.captchaLoading = false;
      }
    },
    async submit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;

        // تبدیل شماره موبایل به انگلیسی قبل از ارسال
        const userData = {
          mobile: this.convertPersianToEnglish(this.user.mobile.replace(/\s/g, '')),
          password: this.user.password,
          captcha_answer: this.user.captcha, // بک‌اند انتظار captcha_answer داره
          standard: this.user.standard,
        };

        try {
          const response = await axios.post("/api/user/login", userData);
          if (response.data.Success === true) {
            localStorage.setItem("X-AUTH-TOKEN", response.data.data.token);
            window.location.replace("/profile/business");
          } else if (response.data.data.active === false) {
            this.errorMsg = response.data.message;
            this.dialog = true;
          }
        } catch (error) {
          this.errorMsg = error.response?.data?.error || this.$t('login.input_fail');
          this.dialog = true;
          await this.loadCaptcha(); // نوسازی کپچا در صورت خطا
        } finally {
          this.loading = false;
        }
      }
    },
    goto_pwa_page() {
      this.loading = true;
      window.location.href = "/install-pwa";
    },
  },
  mounted() {
    this.loadCaptcha(); // بارگذاری اولیه کپچا
  },
};
</script>