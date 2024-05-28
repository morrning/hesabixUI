<script lang="ts">
import axios from 'axios';
import Swal from "sweetalert2";
import { getApiUrl, getSiteName } from "../../../../hesabixConfig"

export default {
  name: "forget-password-submit-code",
  props: {
    email: [String]
  },
  data: () => {
    return {
      siteName: '',
      email: '',
      code: '',
      isCoutDown: false,
      timer: 300000,
      user: {
        mobile: ''
      },
      loading: false
    }
  },
  methods: {
    goToMainSite() {
      window.location.href = getApiUrl();
    },
    loadData() {
      this.isCoutDown = false;
      if (localStorage.getItem('forget-password-id')) {
        this.email = localStorage.getItem('forget-password-id')!;
      }
    },
    jumpback() {
      this.$router.push('/user/forget-password')
    },
    startCountdown: function () {
      this.isCoutDown = true;
    },
    onCountdownEnd: function () {
      this.isCoutDown = false;
    },
    changeCutdown() {
      this.isCoutDown = true;
    },
    sendActive() {
      if (this.code.toString().length !== 6) {
        Swal.fire({
          title: 'خطا',
          text: 'کد وارد شده اشتباه است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        }).then((res) => {
          this.code = '';
        });
      }
      else {
        this.loading = true;
        axios.post('/api/user/reset/password/send-to-sms/' + this.email, { code: this.code.toString() }).then((response) => {
          this.loading = false;
          if (response.data.result == 'ok') {
            Swal.fire({
              text: 'کلمه عبور جدید به پست الکترونیکی و موبایل شما ارسال شد.',
              icon: 'success',
              confirmButtonText: 'ورود به حساب کاربری'
            }).then((res) => {
              this.$router.push('/user/login');
            });
          }
          else if (response.data.result == 'expired') {
            Swal.fire({
              title: 'خطا',
              text: 'کد وارد شده منقضی شده است. لطفا دوباره سعی نمایید.',
              icon: 'error',
              confirmButtonText: 'قبول'
            }).then((res) => {
              this.$router.push('/user/forget-password')
            });
          }
          else {
            Swal.fire({
              title: 'خطا',
              text: 'کد وارد شده اشتباه است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            }).then((res) => {
              this.code = '';
            });
          }
        })
      }

    }
  },
  mounted() {
    this.loadData();
  },
  created() {
    this.siteName = getSiteName();
  }
}
</script>

<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="bg-image" style="background-image: url('/assets/media/photos/photo21.jpg');">
      <div class="row g-0 justify-content-center bg-primary-dark-op">
        <div class="hero-static col-sm-12 col-md-8 col-xl-6 d-flex align-items-center p-0 px-sm-0">
          <!-- Sign In Block -->
          <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
            <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-body-extra-light">
              <!-- Header -->
              <div class="mb-2 text-center">
                <a class="link-fx fw-bold fs-1" href="/">
                  <span class="text-primary">{{ siteName }}</span>
                </a>
                <p class="text-uppercase fw-bold fs-sm text-muted"> تغییر کلمه عبور </p>
              </div>
              <div class="alert alert-info">
                برای بازیابی کلمه عبور کد ارسالی به شماره موبایل و یا پست الکترونیکی خود را وارد کنید.
              </div>
              <!-- END Header -->
              <form @submit.prevent="sendActive">
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="code">
                  <label>کد ارسالی به ایمیل و موبایل</label>
                </div>
                <button type="button" class="btn btn-secondary  float-end" :disabled="isCoutDown" @click="jumpback()">
                  <vue-countdown v-if="isCoutDown" :time="timer" :autoStart="true" @start="onCountdownEnd" @end="onCountdownEnd" v-slot="{ totalSeconds }">
                    مجدد تا {{ totalSeconds }} ثانیه دیگر
                  </vue-countdown>
                  <span v-else>Fetch Verification Code</span>
                </button>
                <div class="float-start">
                  <button :disabled="loading" type="submit" class="btn btn-primary">
                    <div v-show="loading" class="spinner-border spinner-border-sm text-white" role="status">
                      <span class="visually-hidden">صبر کنید ...</span>
                    </div>
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> پیامک کلمه عبور جدید
                  </button>
                </div>
              </form>
            </div>
            <div class="block-content bg-body">
              <div class="d-flex justify-content-center text-center push">
                <button type="button" class="btn btn-sm btn-alt-secondary" @click="goToMainSite()">
                  <i class="fa fa-home"></i>
                  صفحه نخست
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>