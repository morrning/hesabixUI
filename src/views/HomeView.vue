<script>
import axios from "axios";

export default {
  name: "HomeView",
  data(){
    return {
      isLogedIn: false
    }
  },
  mounted(){
    axios.post( '/api/user/check/login')
        .then((response) =>{
          this.isLogedIn = response.data.result;
          axios.post( '/api/user/current/info')
              .then((res) =>{
                this.isLogedIn = true;
              });
        });
  }
}
</script>

<template>
    <div class="px-4 py-5 text-center">
      <img class="d-block mx-auto mb-4" src="/img/logo-blue.png" alt="" width="72" height="72">
      <h1 class="display-5 fw-bold">نرم‌افزار حسابداری آنلاین حسابیکس</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          برای کار با حسابیکس فقط به یک دستگاه متصل به اینترنت نیاز دارید، فرقی نمی‌کند که این دستگاه تبلت یا موبایل باشد یا اینکه رایانه و لپ تاپ.
          نیاز نیست که هیچگونه نرم افزاری را نصب کنید. کافیست در سایت ثبت نام کرده و بلافاصله کسب و کار خود را مدیریت کنید.
        </p>
        <div v-if="isLogedIn" class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href="/acc/" class="btn btn-primary btn-lg px-4 gap-3">
            <i class="bi bi-list-task"></i>
            ورود به کسب‌وکار
          </a>
        </div>
        <div v-else class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <router-link to="/register" class="btn btn-primary btn-lg px-4 gap-3">عضویت رایگان</router-link>
          <router-link to="/login" class="btn btn-outline-secondary btn-lg px-4">ورود به حسابیکس</router-link>
        </div>
      </div>
    </div>
  <div class="row items-push py-5">
    <div class="col-sm-6 col-xl-3">
      <a class="block block-rounded block-fx-pop text-center h-100 mb-0" href="javascript:void(0)">
        <div class="block-content block-content-full">
          <div class="item item-circle bg-primary-lighter mx-auto my-3">
            <i class="fa fa-users text-primary"></i>
          </div>
          <div class="display-4 fw-bold">35.8 هزار </div>
          <div class="text-muted mt-1">کاربران</div>
        </div>
      </a>
    </div>
    <div class="col-sm-6 col-xl-3">
      <a class="block block-rounded block-fx-pop text-center h-100 mb-0" href="javascript:void(0)">
        <div class="block-content block-content-full">
          <div class="item item-circle bg-xinspire-lighter mx-auto my-3">
            <i class="fa fa-home-user text-xinspire-dark"></i>
          </div>
          <div class="display-4 fw-bold">98.5 هزار </div>
          <div class="text-muted mt-1">کسب‌و‌کارها</div>
        </div>
      </a>
    </div>
    <div class="col-sm-6 col-xl-3">
      <a class="block block-rounded block-fx-pop text-center h-100 mb-0" href="javascript:void(0)">
        <div class="block-content block-content-full">
          <div class="item item-circle bg-xsmooth-lighter mx-auto my-3">
            <i class="fa fa-paperclip text-xsmooth"></i>
          </div>
          <div class="display-4 fw-bold">25</div>
          <div class="text-muted mt-1">اسناد</div>
        </div>
      </a>
    </div>
    <div class="col-sm-6 col-xl-3">
      <a class="block block-rounded block-fx-pop text-center h-100 mb-0" href="javascript:void(0)">
        <div class="block-content block-content-full">
          <div class="item item-circle bg-xplay-lighter mx-auto my-3">
            <i class="fa fa-box text-xplay"></i>
          </div>
          <div class="display-4 fw-bold">12.5٪</div>
          <div class="text-muted mt-1">کالاها‌و‌خدمات</div>
        </div>
      </a>
    </div>
  </div>
  <div class="py-3 py-sm-5 px-md-7">
    <div class="block block-rounded block-transparent bg-white">
      <div class="block-content block-content-full">
        <div class="row justify-content-sm-between align-items-center p-md-3">
          <div class="col-sm-6">
            <h4 class="mb-2"> جدیدترین عضو خانواده بزرگ حسابیکس... </h4>
            <p class="text-muted mb-sm-0">
              به جدیدترین عضو حسابیکس

              که کسب‌و‌کار خود را با نام

              ایجاد کرده‌اند خوش‌آمد می‌گوییم.
            </p>
          </div>
          <div class="col-sm- text-sm-end">
            <a class="btn btn-primary px-4 py-2" href="be_widgets_tiles.html"> همه آنها را کاوش کنید <i class="fa fa-fw fa-arrow-left opacity-50 ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
