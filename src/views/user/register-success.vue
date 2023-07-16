<template>
<div>
  <div class="bg-body-light">
    <div class="content content-boxed content-full">
      <div class="py-5">
        <router-link to="/">
          <h2 class="mb-2 text-center">
            <img class="mb-2 text-center" src="/img/logo-blue.png" style="max-width: 85px;">
          </h2>
        </router-link>
        <h3 class="fw-light text-muted push text-center"> از اینکه حسابیکس را برای انجام امور مالی خود انتخاب کرده‌اید سپاسگزاریم.</h3>
      </div>
      <div class="row my-5 justify-content-center text-center bg-gray-light p-4">
        <div class="col-sm-12 col-md-6">
          <h3>برای شروع ابتدا به حساب کاربری خود وارد شوید!</h3>
          <router-link to="/user/login" class="btn btn-outline-danger btn-lg">
            <i class="fa fa-door-open"></i>
            ورود به حساب کاربری
          </router-link>
        </div>
      </div>
      <div class="row py-3 justify-content-center text-center">
        <div class="col-sm-6 col-md-4 mb-5">
          <div class="my-3">
            <i class="fa fa-2x fa-phone text-xeco"></i>
          </div>
          <h4 class="h5 mb-2"> پشتیبانی در هر زمان </h4>
          <p class="mb-0 text-muted"> پشتیبانی تلفنی و تیکت به صورت 24 ساعته و تا زمانی که از خدمات ما استفاده می کنید در دسترس خواهد بود. </p>
        </div>
        <div class="col-sm-6 col-md-4 mb-5">
          <div class="my-3">
            <i class="fa fa-2x fa-earth-asia text-danger"></i>
          </div>
          <h4 class="h5 mb-2"> همیشه در دسترس </h4>
          <p class="mb-0 text-muted"> از زمان شروع به کار حسابیکس تاکنون هیچ مشکلی در زمینه خدمات رسانی و قطع سرویس به وجود نیامده است. </p>
        </div>
        <div class="col-sm-6 col-md-4 mb-5">
          <div class="my-3">
            <i class="fa fa-2x fa-book-bible text-xinspire"></i>
          </div>
          <h4 class="h5 mb-2"> منابع آموزشی </h4>
          <p class="mb-0 text-muted"> به روز ترین آموزش ها و راهنمای استفاده از حسابیکس به صورت کامل و کاملا رایگلن در اختیار شماست. </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "register-success"
}
</script>

<style scoped>

</style>