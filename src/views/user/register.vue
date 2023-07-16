<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="bg-image">
      <div class="row g-0 justify-content-center">
        <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
          <!-- Sign Up Block -->
          <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
            <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-body-extra-light">
              <!-- Header -->
              <div class="mb-2 text-center">
                <router-link class="link-fx fw-bold fs-1" to="/">
                  <span class="text-dark">حسا</span><span class="text-primary">بیکس</span>
                </router-link>
                <p class="text-uppercase fw-bold fs-sm text-muted">ایجاد حساب جدید</p>
              </div>
              <!-- END Header -->

              <!-- Sign Up Form -->
              <!-- jQuery Validation (.js-validation-signup class is initialized in js/pages/op_auth_signup.min.js which was auto compiled from _js/pages/op_auth_signup.js) -->
              <!-- For more info and examples you can check out https://github.com/jzaefferer/jquery-validation -->
              <form @submit.prevent="onSubmit">
                <div class="mb-4">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">
                          <i class="fa fa-user-circle"></i>
                        </span>
                    <input class="form-control" v-model="name" placeholder="نام و نام خانوادگی" type="text"/>

                  </div>
                </div>
                <div class="mb-4">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">
                          <i class="fa fa-envelope-open"></i>
                        </span>
                    <input class="form-control" v-model="email" placeholder="پست الکترونیک" type="email"/>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">
                          <i class="fa fa-mobile-android"></i>
                        </span>
                    <input class="form-control" v-model="mobile" placeholder="شماره موبایل" type="tel" style="direction: rtl;"/>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">
                          <i class="fa fa-asterisk"></i>
                        </span>
                    <input class="form-control" v-model="password" placeholder="کلمه عبور" type="password"/>
                  </div>
                </div>
                <div class="d-sm-flex justify-content-sm-between align-items-sm-center mb-4 bg-body rounded py-2 px-3">
                  <div class="form-check">
                    <input class="form-check-input" v-model="term" type="checkbox"/>
                    <label class="form-check-label" for="signup-terms">موافقم</label>
                  </div>
                  <div class="fw-semibold fs-sm py-1">
                    <RouterLink class="fw-semibold fs-sm" to="/terms">شرایط و ضوابط</RouterLink>
                  </div>
                </div>
                <div class="text-center mb-4">
                  <button class="btn btn-hero btn-primary w-100" type="submit">
                    <i class="fa fa-fw fa-plus opacity-50 me-1"></i> ثبت نام </button>
                </div>
                <div class="text-center mb-0">
                  <RouterLink to="/user/login">
                    قبلا عضو شده اید؟ وارد شوید
                  </RouterLink>
                </div>
              </form>
              <!-- END Sign Up Form -->
            </div>
          </div>
        </div>
        <!-- END Sign Up Block -->
      </div>
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {email, required} from "@vuelidate/validators";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  name: "register",
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      email: '',
      password: '',
      name: '',
      mobile: '',
      term: false
    }
  },
  validations () {
    return {
      email: { required,email },
      password: {required},
      mobile: {required},
      name: {required}
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
        Swal.fire({
          text: 'لطفا تمام موارد را به صورت صحیح وارد کنید.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        if(this.term == false){
          Swal.fire({
            text: 'موافقت با قوانین ارائه خدمات جهت ثبت نام ضروری است.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
        }
        else{
          // perform async actions
          axios.post( '/api/user/register', {
            name: this.name,
            email: this.email,
            mobile: this.mobile,
            password: this.password
          })
              .then(function (response) {
                if(response.data.error === 0){
                  //go to success page
                  router.push('/user/register-success')
                }
                if(response.data.error === 1){
                  Swal.fire({
                    text: 'این پست الکترونیکی قبلا ثبت شده است.',
                    icon: 'error',
                    confirmButtonText: 'قبول'
                  });
                }
              })

        }
        }
      }
  },
  async created() {
    await axios.post('/api/user/check/login').then((response)=>{
      if(response.data.result == true){
        this.$router.push('/profile/business')
      }
    })
  }
}
</script>

<style scoped>

</style>