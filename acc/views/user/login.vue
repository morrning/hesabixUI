<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="row g-0 justify-content-center bg-body-dark">
      <div class="hero-static col-sm-10 col-md-8 col-xl-6 d-flex p-2 px-sm-0">
        <!-- Sign In Block -->
        <div class="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image">
          <div class="row g-0">
            <div class="col-md-6 order-md-1 bg-body-extra-light">
              <div class="block-content block-content-full px-lg-5 py-md-5 py-lg-6">
                <!-- Header -->
                <div class="mb-2 text-center">
                  <router-link class="link-fx fw-bold fs-1" to="/">
                    <span class="text-dark">حسا</span><span class="text-primary">بیکس</span>
                  </router-link>
                  <p class="text-uppercase fw-bold fs-sm text-muted"> ورود </p>
                </div>
                <!-- END Header -->

                <!-- Sign In Form -->
                <form @submit.prevent="onSubmit">
                  <div class="mb-4">
                    <input v-model="email" class="form-control form-control-alt" placeholder="پست الکترونیکی" type="email">
                    <small class="form-text text-danger" v-if="v$.email.$error">الزامی است</small>
                  </div>
                  <div class="mb-4">
                    <input v-model="password" class="form-control form-control-alt" placeholder="کلمه عبور" type="password">
                    <small class="form-text text-danger" v-if="v$.password.$error">الزامی است</small>
                  </div>
                  <div class="mb-4">
                    <!-- Submit Button -->
                    <div class="buttons-w">
                      <button type="submit" class="btn w-100 btn-primary"><i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> ورود</button>
                    </div>
                  </div>
                </form>
                <!-- END Sign In Form -->
              </div>
            </div>
            <div class="col-md-6 order-md-0 bg-primary-dark-op d-flex align-items-center">
              <div class="block-content block-content-full px-lg-5 py-md-5 py-lg-6">
                <div class="d-flex">
                  <div class="flex-grow-1">
                    <p class="d-none d-sm-none d-md-block push text-white fw-semibold mb-1"> بهترین نرم افزار حسابداری ابری و کاملا رایگان </p>
                    <div class="text-center">
                      <router-link class="btn btn-alt-success me-1" to="/register">عضویت</router-link>
                      <button @click="test" class="btn btn-alt-info" href="javascript:void(0)">فراموشی کلمه عبور</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Sign In Block -->
      </div>
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required , email} from '@vuelidate/validators'
import axios from 'axios'
import Swal from 'sweetalert2'
import arcaptchaVue3 from "arcaptcha-vue3";

export default {
  name: "login",
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components:{
    arcaptchaVue3: arcaptchaVue3
  },
  validations () {
    return {
      email: { required,email },
      password: {required}
    }
  },
  async beforeMount() {
    if(await this.app_isLogin() === true){
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    async onSubmit () {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid

      }
      // perform async actions
      localStorage.removeItem('X-AUTH-TOKEN');
      axios.post( 'api/user/login', {
        email: this.email,
        password: this.password
      })
          .then(function (response) {
            localStorage.setItem('X-AUTH-TOKEN',response.data.token);
            axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
            document.location.replace('/');
          })
          .catch(function (error) {
            Swal.fire({
              title: 'خطا',
              text: 'نام کاربری یا کلمه عبور اشتباه است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
            this.password = '';
          });
    }
  }
}
</script>

<style scoped>

</style>