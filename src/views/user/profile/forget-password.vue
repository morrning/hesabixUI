<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { getApiUrl, getSiteName } from "../../../../hesabixConfig"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data: () => {
    return {
      siteName: '',
      email: '',
      loading: false
    }
  },
  methods: {
    async submit() {
      if (this.email.length === 0) {
        // notify user form is invalid
        Swal.fire({
          title: 'خطا',
          text: 'کاربری با این مشخصات یافت نشد.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        this.loading = true;
        axios.post('/api/user/forget/password/send-code', {
          email: this.email,
        })
          .then((response) => {
            this.loading = false
            if (response.data.result == true) {
              Swal.fire({
                title: 'ارسال کد بازیابی کلمه عبور',
                text: 'کد بازیابی کلمه عبور به پست الکترونیکی و تلفن همراه شما ارسال شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
              localStorage.setItem('forget-password-id', response.data.id);
              this.$router.push('/user/forget-password-submit-code');
            }
            else if (response.data.result == 'send before') {
              Swal.fire({
                title: 'خطا',
                text: 'کد فعال سازی قبلا ارسال شده است لطفا چند دقیقه دیگر مجددا سعی نمایید.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
              this.$router.push('/user/forget-password-submit-code');
            }
            else if (response.data.result == '404') {
              this.loading = false;
              Swal.fire({
                title: 'خطا',
                text: 'کاربری با این مشخصات یافت نشد.',
                icon: 'error',
                confirmButtonText: 'قبول'
              });
              this.email = '';
            }
          }).catch(function (error) {
            this.loading = false;
            Swal.fire({
              title: 'خطا',
              text: 'کاربری با این مشخصات یافت نشد.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
            this.email = '';
          });
      }
    }
  },
  created() {
    this.siteName = getSiteName();
    axios.post('/api/user/check/login').then((response) => {
      if (response.data.result == true) {
        this.$router.push('/profile/business')
      }
    })
  }
}
</script>

<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="bg-image" style="background-image: url('/assets/media/photos/photo21.jpg');">
      <div class="row g-0 justify-content-center bg-primary-dark-op">
        <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
          <!-- Sign In Block -->
          <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
            <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-body-extra-light">
              <!-- Header -->
              <div class="mb-2 text-center">
                <a class="link-fx fw-bold fs-1" href="/">
                  <span class="text-primary">{{ siteName }}</span>
                </a>
                <p class="text-uppercase fw-bold fs-sm text-muted"> بازیابی کلمه عبور </p>
              </div>
              <!-- END Header -->
              <form @submit.prevent="submit">
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="email">
                  <label>پست الکترونیکی یا شماره تلفن</label>
                </div>
                <div class="text-center mt-3">
                  <button :disabled="loading" type="submit" class="btn btn-hero btn-primary">
                    <div v-show="loading" class="spinner-border spinner-border-sm text-white" role="status">
                      <span class="visually-hidden">صبر کنید ...</span>
                    </div>
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i>
                    ارسال کد بازیابی
                  </button>
                </div>
                <div class="text-center mt-4">
                  <RouterLink to="/user/register">
                    حساب کاربری ندارید؟ عضو شوید
                  </RouterLink>
                </div>
              </form>
            </div>
            <div class="block-content bg-body">
              <div class="d-flex justify-content-center text-center push">
                <a class="btn btn-sm btn-alt-secondary" :href="this.$filters.getApiUrl()">
                  <i class="fa fa-home"></i>
                  صفحه نخست
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped></style>