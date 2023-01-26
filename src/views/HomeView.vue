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
    <div class="px-4 pt-5 mt-5 text-center">
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
</template>
