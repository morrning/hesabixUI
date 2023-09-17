<script lang="ts">
import axios from 'axios';
import {defineComponent} from 'vue'

export default defineComponent({
  name: "active-account",
  data: ()=>{return {
    email: '',
    code: '',
    isCoutDown: false,
    timer: 10000,
  }},
  methods:{
    changeCutdown(){
      this.isCoutDown = true;
    },
    sendAgain(){
      this.isCoutDown = false;

    }
  },
  mounted() {
    this.email = this.$route.params.email;
    axios.post('/api/user/active/code/info/' + this.email).then((response)=>{
        this.timer = (parseInt(response.data.cutDown) - parseInt(response.data.time)) * 1000
    })
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
                  <span class="text-dark">حساب</span><span class="text-primary">یکس</span>
                </a>
                <p class="text-uppercase fw-bold fs-sm text-muted"> احراز هویت </p>
              </div>
              <div class="alert alert-info">
                کد ارسالی به شماره موبایل و یا پست الکترونیکی خود را وارد کنید.
              </div>
              <!-- END Header -->
              <form @submit.prevent="submit">
                <div class="form-floating mb-3">
                  <input class="form-control" type="number" v-model="code">
                  <label>کد ارسالی به ایمیل و موبایل</label>
                </div>
                <button type="button" class="btn btn-secondary float-end" :disabled="!isCoutDown" @click="sendAgain">
                  <vue-countdown v-if="!isCoutDown" :time="this.timer" @end="changeCutdown" v-slot="{ totalSeconds }">ارسال مجدد تا {{ totalSeconds }} ثانیه دیگر</vue-countdown>
                  <span v-else>ارسال مجدد</span>
                </button>
                <div class="float-start">
                  <button type="submit" class="btn btn-primary">
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> تایید  </button>
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

<style scoped>

</style>