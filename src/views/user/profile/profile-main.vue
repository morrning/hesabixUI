<template>
  <!-- Modal -->
  <div class="modal fade" id="updateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="updateModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-info">
          <h5 class="modal-title text-light" id="updateModalLabel">
            <i class="fa fa-paint-roller"></i>
            به روز رسانی جدید
          </h5>
          <div class="block-options">
            <button type="button" class="btn-close btn  btn-sm text-light bg-light" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <b class="text-primary-dark">تغییران نسخه اخیر در تاریخ {{ this.hesabix.lastUpdateDate }}</b>
          <p v-html="this.hesabix.lastUpdateDes"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-success" data-bs-dismiss="modal">
            <i class="fa fa-check-double me-2"></i>
            بارگزاری نسخه جدید
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
          <RouterLink class="fw-semibold text-white" to="/">{{ siteName }}</RouterLink>
          <!-- END Logo -->
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div>
          <!-- User Dropdown -->
          <div class="dropdown d-inline-block">
            <button aria-expanded="false" aria-haspopup="true" class="btn btn-link rounded-circle"
              data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
              <i class="fa-solid fa-user text-white"></i>
            </button>
            <div aria-labelledby="page-header-user-dropdown"
              class="dropdown-menu dropdown-menu-end dropdown-menu-lg p-0">
              <div class="rounded-top fw-semibold text-center p-3 border-bottom bg-body-light">
                <RouterLink to="/profile/dashboard" class="fw-semibold">{{ user.fullname }}</RouterLink>
                <div class="fs-sm">{{ user.email }}</div>
              </div>
              <div class="p-2">
                <RouterLink class="dropdown-item" to="/profile/business">
                  <i class="fa fa-fw fa-cog me-1 text-success"></i>
                  کسب و کارها
                  <span class="badge text-bg-danger float-end">{{ this.business_count }}</span>
                </RouterLink>
                <RouterLink class="dropdown-item" to="/profile/business">
                  <i class="fa fa-fw fa-user text-success me-1"></i>
                  تنظیمات حساب
                </RouterLink>
              </div>
              <div class="p-2">
                <span @click="logout" class="dropdown-item mb-0">
                  <i class="fa fa-fw fa-arrow-alt-circle-left text-danger me-1"></i>
                  خروج از {{ siteName }}
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
                <i class="fa fa-plus-circle fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">کسب‌و‌کار
                  جدید</span>
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
                <i class="fa fa-unlock fa-fw opacity-50"></i> <span class="d-none d-md-inline ms-1">تغییر کلمه
                  عبور</span>
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
      <div class="m-1">
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
    <footer class="bg-body-extra-light fixed-bottom border-top" id="page-footer" style="max-height: 5px;">
      <div class="content py-0">
        <div class="row fs-sm">
          <div class="col-sm-6 order-sm-1 text-center text-sm-start">
            <a class="fw-semibold" :href="siteUrl" target="_blank">{{ siteName }} {{ this.hesabix.version }}</a>
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
import { getSiteName, getApiUrl } from "/hesabixConfig"
export default {
  // eslint-disable-next-line vue/multi-word-component-names,vue/no-reserved-component-names
  name: "profile-main",
  data: () => {
    return {
      siteName: '',
      siteUrl: '',
      ROLE_ADMIN: false,
      user: {
        mobile: '1'
      },
      business_count: 0,
      hesabix: {
        version: '',
        lastUpdateDate: '',
        lastUpdateDes: '',
      }
    }
  },
  created() {
    this.siteName = getSiteName();
    this.siteUrl = getApiUrl();
  },
  methods: {
    logout() {
      axios.post('/api/user/logout')
        .then((response) => {
          localStorage.removeItem('X-AUTH-TOKEN');
          document.location.reload();
          delete axios.defaults.headers.common['X-AUTH-TOKEN'];
          window.location.href = this.$filters.getApiUrl() + '/logout/by/token/user/login';
        });
    },
    gethesabix() {
      axios.get('/api/general/stat').then((response) => {
        this.hesabix = response.data;
        let currentVersion = window.localStorage.getItem('hesabixVersion');

        if (currentVersion == undefined) {
          window.localStorage.setItem('hesabixVersion', this.hesabix.version);
        }
        else if (currentVersion != this.hesabix.version) {
          //set version Number
          const updateModalEL = document.getElementById('updateModal')
          const updateModal = new bootstrap.Modal(updateModalEL, { backdrop: true });
          updateModalEL.addEventListener('hidden.bs.modal', () => {
            window.localStorage.setItem('hesabixVersion', this.hesabix.version);
            window.location.reload(true);
          });
          updateModal.show();
        }

      });
    }
  },
  mounted() {
    this.gethesabix();
    axios.post('/api/admin/has/role/' + 'ROLE_ADMIN').then((response) => {
      this.ROLE_ADMIN = response.data.result;
    });
  },
  async beforeMount() {
    await axios.post('/api/user/check/login')
      .then((response) => {
        if (response.data.result == false) {
          this.$router.push('/user/login');
        }
        else {
          axios.post('/api/user/current/info')
            .then((res) => { this.user = res.data; });
          axios.post('/api/business/list/count')
            .then((response) => {
              this.business_count = response.data.count;
            });
        }

      }).catch(() => {
        this.$router.push('/user/login');
      });
  },
}
</script>

<style scoped></style>