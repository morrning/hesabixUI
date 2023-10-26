<template>
  <!-- Modal -->
  <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary-dark" id="updateModalLabel">
            <i class="fa fa-paint-roller"></i>
            به روز رسانی جدید</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="fa fa-close"></i> </span>
          </button>
        </div>
        <div class="modal-body">
          <b>تغییران نسخه اخیر در تاریخ {{this.hesabix.lastUpdateDate}}</b>
          <p v-html="this.hesabix.lastUpdateDes"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            <i class="fa fa-check-double me-2"></i>
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  </div>
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
              <RouterLink class="nav-link text-body-color py-4" to="/profile/support-list">
                <i class="fa fa-ticket fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">پشتیبانی</span>
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-body-color py-4" to="/profile/change-password">
                <i class="fa fa-unlock fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">تغییر کلمه عبور</span>
              </RouterLink>
            </li>
            <li v-show="ROLE_ADMIN" class="nav-item">
              <a class="nav-link text-body-color py-4" href="/manager/#/">
                <i class="fab fa-android fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">مدیریت</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- END Hero -->

      <!-- Page Content -->
      <div class="content">
        <RouterLink v-show="!this.user.mobile" to="/profile/add-mobile-number">
          <div class="alert alert-warning">
            <i class="fa fa-warning"></i>
            به نظر می رسد شماره تلفن خود را ثبت نکرده اید.برای ثبت شماره تلفن خود اینجا کلیک کنید.
          </div>
        </RouterLink>
        <router-view></router-view>
      </div>
      <!-- END Page Content -->
    </main>
    <!-- END Main Container -->

    <!-- Footer -->
    <footer class="bg-body-extra-light" id="page-footer">
      <div class="content py-0">
        <div class="row fs-sm">
          <div class="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-end">حسابیکس با
          <i class="fa fa-heart text-danger"></i>
            متن باز است.
          </div>
          <div class="col-sm-6 order-sm-1 text-center text-sm-start">
            <a class="fw-semibold" href="https://github.com/morrning/hesabixCore" target="_blank">حسابیکس {{this.hesabix.version}}</a>
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
    ROLE_ADMIN:false,
    user: {
      mobile:'1'
    },
    business_count: 0,
    hesabix:{
      version:'',
      lastUpdateDate:'',
      lastUpdateDes:'',
    }
  }},
  methods:{
    logout(){
      axios.post( '/api/user/logout')
          .then((response) =>{
            localStorage.removeItem('X-AUTH-TOKEN');
            document.location.reload();
            delete  axios.defaults.headers.common['X-AUTH-TOKEN'];
          });
    },
    gethesabix(){
      axios.get( '/api/general/stat').then((response) =>{
        this.hesabix = response.data;
        let currentVersion = window.localStorage.getItem('hesabixVersion');
        if(currentVersion == null || currentVersion != this.hesabix.version){
          //set version Number
          const updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {backdrop: true})
          updateModal.show();
          window.localStorage.setItem('hesabixVersion',this.hesabix.version);
        }

      });
    }
  },
  mounted() {
    this.gethesabix();
    axios.post('/api/admin/has/role/' + 'ROLE_ADMIN').then((response)=>{
      this.ROLE_ADMIN = response.data.result;
    });
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