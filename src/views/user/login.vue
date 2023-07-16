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
                  <span class="text-dark">حساب</span><span class="text-primary">یکس</span>
                </a>
                <p class="text-uppercase fw-bold fs-sm text-muted"> ورود </p>
              </div>
              <!-- END Header -->
              <form @submit.prevent="submit">
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="email">
                  <label>پست الکترونیکی</label>
                  <small class="form-text text-danger" v-if="v$.email.$error">پست الکترونیکی اشتباه است و یا وارد نشده.</small>
                </div>

                <div class="form-floating mb-3">
                  <input class="form-control" type="password" v-model="password">
                  <label>کلمه عبور</label>
                  <small class="form-text text-danger" v-if="v$.password.$error">کلمه عبور الزامی است</small>
                </div>

                <div class="d-sm-flex justify-content-sm-between align-items-sm-center text-center text-sm-start">

                  <div class="fw-semibold fs-sm py-1">
                    <a href="javascript:void(0)">رمز عبور را فراموش کرده اید؟</a>
                  </div>
                </div>
                <div class="text-center mt-3">
                  <button type="submit" class="btn btn-hero btn-primary">
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> ورود </button>
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
                <a class="btn btn-sm btn-alt-secondary" href="https://hesabix.ir">
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

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { useVuelidate } from '@vuelidate/core'
import { required , email} from '@vuelidate/validators'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data: ()=>{return{
    'email':'',
    'password':''
  }},
  methods: {
    async submit () {
      const result = await this.v$.$validate()
      if (!result) {
        // notify user form is invalid

      }
      else {
        // perform async actions
        localStorage.removeItem('X-AUTH-TOKEN');
        axios.post( 'api/user/login', {
          email: this.email,
          password: this.password
        })
            .then(function (response) {
              localStorage.setItem('X-AUTH-TOKEN',response.data.token);
              axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
              document.location.replace('/profile/business');
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
  },
  validations () {
    return {
      email: { required,email },
      password: {required}
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  created() {
    axios.post('/api/user/check/login').then((response)=>{
      if(response.data.result == true){
        this.$router.push('/profile/business')
      }
    })
  }
}
</script>

<style scoped>

</style>