<template>
  <div class="page-container">
    <!-- Header -->
    <header id="page-header">
      <!-- Header Content -->
      <div class="content-header bg-primary-dark">
        <!-- Left Section -->
        <div>
          <!-- Logo -->
          <RouterLink class="fw-semibold text-white" to="/">حساب<span class="opacity-75">یکس</span></RouterLink>
          <!-- END Logo -->
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div>
          <!-- User Dropdown -->
          <div class="dropdown d-inline-block">
            <button aria-expanded="false" aria-haspopup="true" class="btn btn-alt-secondary bg-primary-lighter" data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
              <vue-gravatar class="img-avatar img-avatar32 img-avatar-thumb" :email="this.user.email" :size="32" />
              <i class="fa fa-fw fa-angle-down ms-1"></i>
            </button>
            <div aria-labelledby="page-header-user-dropdown" class="dropdown-menu dropdown-menu-end dropdown-menu-lg p-0">
              <div class="rounded-top fw-semibold text-center p-3 border-bottom bg-body-light">
                <div class="mb-2">
                  <vue-gravatar class="img-avatar img-avatar48 img-avatar-thumb" :email="this.user.email" :size="48" />
                </div>
                <RouterLink to="/profile/dashboard" class="fw-semibold">{{user.fullname}}</RouterLink>
                <div class="fs-sm">{{user.email}}</div>
              </div>
              <div class="p-2">
                <RouterLink class="dropdown-item" to="/profile/business">
                  <i class="fa fa-fw fa-cog text-gray me-1"></i>
                  کسب و کارها
                  <span class="badge text-bg-danger float-end">{{this.business_count}}</span>
                </RouterLink>
                <RouterLink class="dropdown-item" to="/profile/business">
                  <i class="fa fa-fw fa-user text-gray me-1"></i>
                  تنظیمات حساب
                </RouterLink>
              </div>
              <div class="p-2">
                <span @click="logout" class="dropdown-item mb-0">
                  <i class="fa fa-fw fa-arrow-alt-circle-left text-gray me-1"></i>
                  خروج از حسابیکس
                </span>
              </div>
            </div>
          </div>
          <!-- END User Dropdown -->
        </div>
        <!-- END Right Section -->
      </div>
      <!-- END Header Content -->

    </header>
    <!-- END Header -->

    <!-- Main Container -->
    <main id="main-container">
      <!-- Hero -->
      <div class="bg-body-extra-light">
        <div class="content py-0">
          <ul class="nav nav-tabs nav-tabs-alt border-bottom-0 justify-content-center justify-content-md-start">
            <li class="nav-item">
              <router-link class="nav-link text-body-color py-4" to="/profile/dashboard">
                <i class="fa fa-home fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1"> داشبورد </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-body-color py-4" to="/profile/new-business">
                <i class="fa fa-plus-circle fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">کسب‌و‌کار جدید</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-body-color py-4" to="/profile/business">
                <i class="fa fa-list fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">کسب‌و‌کارها</span>
              </router-link>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-body-color py-4" to="/profile/change-password">
                <i class="fa fa-unlock fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">تغییر کلمه عبور</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <!-- END Hero -->

      <!-- Page Content -->
      <div class="content">
        <router-view></router-view>
      </div>
      <!-- END Page Content -->
    </main>
    <!-- END Main Container -->

    <!-- Footer -->
    <footer class="bg-body-extra-light" id="page-footer">
      <div class="content py-0">
        <div class="row fs-sm">
          <div class="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-end">تمام حقوق برای حسابیکس محفوظ است.</div>
          <div class="col-sm-6 order-sm-1 text-center text-sm-start">
            <a class="fw-semibold" href="https://github.com/morrning" target="_blank">حسابیکس 0.0.041</a> © <span data-toggle="year-copy"></span>
          </div>
        </div>
      </div>
    </footer>
    <!-- END Footer -->
    <!-- END Page Container -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names,vue/no-reserved-component-names
  name: "profile-main",
  data: ()=>{return{
    user: {},
    business_count: 0
  }},
  methods:{
    logout(){
      axios.post( '/api/user/logout')
          .then((response) =>{
            localStorage.removeItem('X-AUTH-TOKEN');
            document.location.reload();
            delete  axios.defaults.headers.common['X-AUTH-TOKEN'];
          });
    }
  },
  async beforeMount() {
    await axios.post('/api/user/check/login')
        .then((response) => {
          if(response.data.result == false){
            this.$router.push('/user/login');
          }
          else {
            axios.post('/api/user/current/info')
                .then((res) => {this.user = res.data;});
            axios.post('/api/business/list/count')
                .then((response) => {
                  this.business_count = response.data.count;
                });
          }

        }).catch(()=>{
          this.$router.push('/user/login');
        });
  },
}
</script>

<style scoped>

</style>