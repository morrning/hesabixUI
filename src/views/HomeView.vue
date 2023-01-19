<script>
export default {
  name: "HomeView",
  data(){
    return {
      url : this.app_api_url
    }
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
        {{ this.app_api_url() }}
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href="/acc/" class="btn btn-primary btn-lg px-4 gap-3">
            <i class="bi bi-list-task"></i>
            ورود به کسب‌وکار
          </a>
          <a href="{{ path('app_register') }}" class="btn btn-primary btn-lg px-4 gap-3">عضویت رایگان</a>
          <a href="{{ path('login') }}" class="btn btn-outline-secondary btn-lg px-4">ورود به حسابیکس</a>
        </div>
      </div>
    </div>
</template>
