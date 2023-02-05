<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="block block-rounded row g-0 border">
          <ul class="nav nav-tabs nav-tabs-block flex-md-column col-md-4 col-xxl-2" role="tablist">
            <li v-if="isLogedIn" class="nav-item d-md-flex flex-md-column">
              <router-link to="/guide/insert" class="btn btn-primary rounded-0">محتوای جدید</router-link>
            </li>
            <li class="nav-item d-md-flex flex-md-column">
              <router-link to="/guide/cat/general" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-book opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>شروع کار با حسابیکس </span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2">اطلاعات پایه و معرفی بخش های اصلی</span>
              </router-link>
              <router-link to="/guide/cat/person" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-person-circle-exclamation opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>اشخاص (طرف حساب ها)</span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2">شامل مشتریان،فروشندگان،تامین‌کنندگان و ...</span>
              </router-link>
              <router-link to="/guide/cat/commodity" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-box opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>کالاها و خدمات </span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2"> افزودن ، ویرایش و حذف کالا و خدمات</span>
              </router-link>
              <router-link to="/guide/cat/bank" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-bank opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>بانکداری</span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2">مدیریت حساب های بانکی،تنخواه‌گردان،صندوق‌ها و انتقال بین حساب‌ها</span>
              </router-link>
              <router-link to="/guide/cat/buy" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-basket-shopping opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>خرید و هزینه </span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2">صدور و مدیریت فاکتورهای فروش و اسناد هزینه</span>
              </router-link>
              <router-link to="/guide/cat/sell" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-money-bill-wheat opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>فروش و درآمد</span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2"> صدور و مدیریت فاکتورهای فروش و اسناد درآمد</span>
              </router-link>
              <router-link to="/guide/cat/report" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-book-open-reader opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>گزارشات</span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2"> تهیه گزارشات و خروجی گرفتن از اسناد و اطلاعات</span>
              </router-link>
              <router-link to="/guide/cat/settings" aria-controls="" class="nav-link text-md-start" role="tab">
                <i class="fa fa-fw fa-cogs opacity-50 me-1 d-none d-sm-inline-block"></i>
                <span>تنظیمات</span>
                <span class="d-none d-md-block fs-xs fw-medium opacity-75 mt-md-2"> بخش تنظیمات چاپ ، دسترسی‌ها، تغییر اطلاعات پایه و ...</span>
              </router-link>
            </li>
          </ul>
          <div class="col-md-8 col-xxl-10">
            <div class="block-content tab-pane">
              <div class="p-2">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "base-part",
  data(){return {
    isLogedIn: false
  }},
  beforeMount() {
    let data = axios.get('/api/user/is_superadmin').then((response)=>{
      if(response.data.result === 1){
        this.isLogedIn = true;
      }
    }).catch(()=>{
      this.isLogedIn = false;
    })
  }
}
</script>

<style scoped>

</style>