<script lang="ts">
import axios from 'axios';
import {defineComponent} from 'vue'
import Swal from "sweetalert2";
import {getApiUrl,getSiteName} from "../../../hesabixConfig"
export default defineComponent({
  name: "active-account",
  data: ()=>{return {
    siteName:'',
    email: '',
    code: '',
    isCoutDown: false,
    timer: 10000,
    user:{
      mobile: ''
    },
  }},
  methods:{
    goToMainSite(){
      window.location.href = getApiUrl();
    },
    loadData(){
      this.isCoutDown = false;
      this.email = this.$route.params.email.toString();
      axios.post('/api/user/active/code/info/' + this.email).then((response)=>{
        this.timer = (parseInt(response.data.cutDown) - parseInt(response.data.time)) * 1000
      });
    },
    changeCutdown(){
      this.isCoutDown = true;
    },
    sendActive(){
      if(this.code.toString().length !== 6){
        Swal.fire({
          title: 'خطا',
          text: 'کد وارد شده اشتباه است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        }).then((res)=>{
          this.code = '';
        });
      }
      else{
        axios.post('/api/user/active/account/' + this.email,{code:this.code.toString()}).then((response)=>{
          if(response.data.result == 'ok' || response.data.result == 'active before'){
            Swal.fire({
              text: 'حساب کاربری شما تایید شد.',
              icon: 'success',
              confirmButtonText: 'رفتن به پروفایل کاربری'
            }).then((res)=>{
              this.$router.push('/user/register-success');
            });
          }
          else{
            Swal.fire({
              title: 'خطا',
              text: 'کد وارد شده اشتباه است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            }).then((res)=>{
              this.code = '';
            });
          }
        })
      }

    }
  },
  mounted() {
    axios.post('/api/user/current/info')
        .then((res) => {
          if(res.data.active){
            this.$router.push('/profile/business');
          }
          else if(!res.data.mobile){
            Swal.fire({
              title: 'خطا',
              text: 'شماره موبایل شما ثبت نشده است. لطفا ابتدا شماره موبایل خود را ذخیره نمایید.',
              icon: 'error',
              confirmButtonText: 'قبول'
            }).then((res)=>{
              this.$router.push('/profile/add-mobile-number');
            });
          }
        });
    this.loadData();
  },
  created(){
    this.siteName = getSiteName();
  }
})
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
                <p class="text-uppercase fw-bold fs-sm text-muted"> احراز هویت </p>
              </div>
              <div class="alert alert-info">
                کد ارسالی به شماره موبایل و یا پست الکترونیکی خود را وارد کنید.
              </div>
              <!-- END Header -->
              <form @submit.prevent="sendActive">
                <div class="form-floating mb-3">
                  <input class="form-control" type="text" v-model="code">
                  <label>کد ارسالی به ایمیل و موبایل</label>
                </div>
                <div class="float-start">
                  <button type="submit" class="btn btn-primary" @click="sendActive()">
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> تایید  </button>
                </div>
              </form>
            </div>
            <div class="block-content bg-body">
              <div class="d-flex justify-content-center text-center push">
                <button type="button" @click="goToMainSite()" class="btn btn-sm btn-alt-secondary">
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

<style scoped>

</style>