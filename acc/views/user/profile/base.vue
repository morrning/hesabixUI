<template>
  <div class="mb-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4 mb-2">
          <div class="card mb-2">
            <div class="card-header bg-primary text-light">
              <vue-gravatar class="img-avatar img-avatar32 img-avatar-thumb" :email="this.user_email" :size="150" />
              {{ user_fullname }}
            </div>
            <div class="card-body">
              <ul class="float-start">
                <li>
                  <router-link to="/business/list">
                    تعداد کسب‌و‌کارها:
                    {{ user_business_count}}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
              <i class="fa fa-user-cog"></i>
              امکانات
            </a>
            <router-link to="/user/profile/dashboard" class="list-group-item list-group-item-action">
              <i class="fa fa-person-circle-exclamation"></i>
              پروفایل کاربری
            </router-link>
            <router-link to="/business/list" class="list-group-item list-group-item-action">
              <i class="fa fa-shop"></i>
              کسب‌و‌کارهای من
            </router-link>
            <router-link to="/user/profile/change-password" class="list-group-item list-group-item-action">
              <i class="fa fa-lock-open"></i>
              تغییر کلمه عبور</router-link>
            <router-link v-if="superadmin" to="/admin/dashboard" class="list-group-item list-group-item-action text-danger">
              <i class="fa fa-dashboard"></i>
               پنل مدیریت حسابیکس</router-link>
          </div>
        </div>
        <div class="col-sm-12 col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "base",
  data: ()=>{return {
    user_fullname: '',
    user_email: '',
    user_business_count: '',
    superadmin: false
  }},
  mounted(){
    axios.post( '/api/user/check/login')
        .then((response) =>{
          this.isLogedIn = response.data.result;
          axios.post( '/api/user/current/info')
              .then((res) =>{
                this.user_email = res.data.email;
                this.user_fullname = res.data.fullname;
                this.user_business_count = res.data.businessCount;
                axios.post('/api/user/is_superadmin').then((response) => {
                  if (response.data.result === 1) {
                    this.superadmin = true;
                  }
                });
              });
        });
  }
}
</script>

<style scoped>

</style>