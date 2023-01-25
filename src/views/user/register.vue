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
                <div class="mb-4">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text">
                          <i class="fa fa-asterisk"></i>
                        </span>
                    <input class="form-control" v-model="repassword" placeholder="تایید گذرواژه" type="password"/>
                  </div>
                </div>
                <div class="d-sm-flex justify-content-sm-between align-items-sm-center mb-4 bg-body rounded py-2 px-3">
                  <div class="form-check">
                    <input class="form-check-input" v-model="term" type="checkbox"/>
                    <label class="form-check-label" for="signup-terms">موافقم</label>
                  </div>
                  <div class="fw-semibold fs-sm py-1">
                    <a class="fw-semibold fs-sm" data-bs-target="#modal-terms" data-bs-toggle="modal" href="#">شرایط و ضوابط</a>
                  </div>
                </div>
                <div class="text-center mb-4">
                  <button class="btn btn-hero btn-primary w-100" type="submit">
                    <i class="fa fa-fw fa-plus opacity-50 me-1"></i> ثبت نام </button>
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
      repassword: '',
      name: '',
      mobile: '',
      term: false
    }
  },
  validations () {
    return {
      email: { required,email },
      password: {required},
      repassword: {required},
      mobile: {required},
      name: {required}
    }
  },
  methods: {
    async onSubmit () {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid
        alert(this.app_api_url + '/user/register');
      }
      // perform async actions
      axios.post(this.app_api_url() + '/user/login', {
        email: this.email,
        password: this.password
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>