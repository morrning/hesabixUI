<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";
import NProgress from "nprogress/nprogress.js";
import "nprogress/nprogress.css"
import "/public/assets/css/dashmix.min.css"
import 'vue-loading-overlay/dist/css/index.css';
export default {

  data(){
    return {
      ROLE_ADMIN:true,
      userInfo:{
        fullName:'',
        email:''
      }
    }
  },
  beforeMount() {

  },
  created() {

  },
  methods:{
    logout(){
      axios.post( '/api/user/logout')
          .then((response) =>{
            localStorage.removeItem('X-AUTH-TOKEN');
            window.location.href = "/";
            delete  axios.defaults.headers.common['X-AUTH-TOKEN'];
          });
    },

  },
  async mounted() {
    axios.post('/api/admin/has/role/' + 'ROLE_ADMIN').then((response)=>{
      this.ROLE_ADMIN = response.data.result;
      if(this.ROLE_ADMIN == false){
        this.$router.push('/404');
      }else{
        axios.post('/api/user/current/info').then((res) => {this.userInfo = res.data;});
      }
    });
  },
  components:{

  }
}
</script>

<template>
  <!-- Page Container -->
  <!--
      Available classes for #page-container:

      GENERIC

        'remember-theme'                            Remembers active color theme and dark mode between pages using localStorage when set through
                                                    - Theme helper buttons [data-toggle="theme"],
                                                    - Layout helper buttons [data-toggle="layout" data-action="dark_mode_[on/off/toggle]"]
                                                    - ..and/or Dashmix.layout('dark_mode_[on/off/toggle]')

      SIDEBAR & SIDE OVERLAY

        'sidebar-r'                                 Right Sidebar and left Side Overlay (default is left Sidebar and right Side Overlay)
        'sidebar-mini'                              Mini hoverable Sidebar (screen width > 991px)
        'sidebar-o'                                 Visible Sidebar by default (screen width > 991px)
        'sidebar-o-xs'                              Visible Sidebar by default (screen width < 992px)
        'sidebar-dark'                              Dark themed sidebar

        'side-overlay-hover'                        Hoverable Side Overlay (screen width > 991px)
        'side-overlay-o'                            Visible Side Overlay by default

        'enable-page-overlay'                       Enables a visible clickable Page Overlay (closes Side Overlay on click) when Side Overlay opens

        'side-scroll'                               Enables custom scrolling on Sidebar and Side Overlay instead of native scrolling (screen width > 991px)

      HEADER

        ''                                          Static Header if no class is added
        'page-header-fixed'                         Fixed Header


      FOOTER

        ''                                          Static Footer if no class is added
        'page-footer-fixed'                         Fixed Footer (please have in mind that the footer has a specific height when is fixed)

      HEADER STYLE

        ''                                          Classic Header style if no class is added
        'page-header-dark'                          Dark themed Header
        'page-header-glass'                         Light themed Header with transparency by default
                                                    (absolute position, perfect for light images underneath - solid light background on scroll if the Header is also set as fixed)
        'page-header-glass page-header-dark'         Dark themed Header with transparency by default
                                                    (absolute position, perfect for dark images underneath - solid dark background on scroll if the Header is also set as fixed)

      MAIN CONTENT LAYOUT

        ''                                          Full width Main Content if no class is added
        'main-content-boxed'                        Full width Main Content with a specific maximum width (screen width > 1200px)
        'main-content-narrow'                       Full width Main Content with a percentage width (screen width > 1200px)

      DARK MODE

        'sidebar-dark page-header-dark dark-mode'   Enable dark mode (light sidebar/header is not supported with dark mode)
    -->
  <div class="rtl-support sidebar-o sidebar-dark side-scroll page-header-fixed main-content-boxed" id="page-container">

    <!-- Sidebar -->
    <!--
  Sidebar Mini Mode - Display Helper classes

  Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
  Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
    If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

  Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
  Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
  Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
-->
    <nav aria-label="Main Navigation" id="sidebar">
      <!-- Side Header (mini Sidebar mode) -->
      <div class="smini-visible-block">
        <div class="content-header bg-black-10">
          <!-- Logo -->
          <router-link class="fw-semibold text-white tracking-wide" to="/"><span class="opacity-75">x</span></router-link>
          <!-- END Logo -->
        </div>
      </div>
      <!-- END Side Header (mini Sidebar mode) -->

      <!-- Side Header (normal Sidebar mode) -->
      <div class="smini-hidden">
        <div class="content-header justify-content-lg-center bg-black-10">
          <!-- Logo -->
          <router-link class="fw-semibold text-white tracking-wide" to="/">Hesabi<span class="opacity-75">x</span>
            <span class="fw-normal"> مدیریت </span>
          </router-link>
          <!-- END Logo -->

          <!-- Options -->
          <div class="d-lg-none">
            <!-- Close Sidebar, Visible only on mobile screens -->
            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
            <button class="btn btn-sm btn-alt-secondary d-lg-none" data-action="sidebar_close" data-toggle="layout"
                    type="button">
              <i class="fa fa-times-circle"></i>
            </button>
            <!-- END Close Sidebar -->
          </div>
          <!-- END Options -->
        </div>
      </div>
      <!-- END Side Header (normal Sidebar mode) -->

      <!-- Sidebar Scrolling -->
      <div class="js-sidebar-scroll">

        <!-- Side Navigation -->
        <div class="content-side pt-0">
          <ul class="nav-main">
            <li class="nav-main-heading pt-1"> امور مالی </li>
            <li class="nav-main-item">
              <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu"
                 data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-globe"></i>
                <span class="nav-main-link-name">کیف پول</span>
              </a>
              <ul class="nav-main-submenu">
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/wallet/list">
                    <span class="nav-main-link-name">فهرست حساب‌ها</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/wallet/transactions">
                    <span class="nav-main-link-name">تراکنش‌ها</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-main-heading pt-1"> محتوا </li>
            <li class="nav-main-item">
              <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu"
                 data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-globe"></i>
                <span class="nav-main-link-name">وبلاگ</span>
              </a>
              <ul class="nav-main-submenu">
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/blog/list">
                    <span class="nav-main-link-name">پست‌ها</span>
                    <span class="nav-main-link-badge badge rounded-pill bg-success">3</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" href="">
                    <span class="nav-main-link-name">دسته بندی‌ها</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" href="">
                    <span class="nav-main-link-name">دیدگاه‌ها</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link active" to="/manager/reportchange/list">
                <i class="nav-main-link-icon fa fa-history"></i>
                <span class="nav-main-link-name"> تاریخچه تغییرات </span>
                <router-link to="/manager/reportchange/mod/0" class="nav-main-link-badge badge rounded-pill bg-success">+</router-link>
              </router-link>
            </li>
            <li class="nav-main-item">
              <a class="nav-main-link active" href="db_hosting.html">
                <i class="nav-main-link-icon fa fa-book"></i>
                <span class="nav-main-link-name"> مستندات API </span>
                <span class="nav-main-link-badge badge rounded-pill bg-success">+</span>
              </a>
            </li>
            <li class="nav-main-item">
              <a class="nav-main-link active" href="db_hosting.html">
                <i class="nav-main-link-icon fa fa-list-dots"></i>
                <span class="nav-main-link-name">راهنمای جامع</span>
                <span class="nav-main-link-badge badge rounded-pill bg-success">+</span>
              </a>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link active" to="/manager/support/list">
                <i class="nav-main-link-icon fa fa-life-ring"></i>
                <span class="nav-main-link-name">پشتیبانی</span>
              </router-link>
            </li>


            <li class="nav-main-heading pt-1">سایر</li>
            <li class="nav-main-item">
              <router-link class="nav-main-link active" to="/manager/users/list">
                <i class="nav-main-link-icon fa fa-users"></i>
                <span class="nav-main-link-name"> کاربران </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link active" to="/manager/business/list">
                <i class="nav-main-link-icon fa fa-users"></i>
                <span class="nav-main-link-name"> کسب و کار‌ها </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu"
                 data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-cogs"></i>
                <span class="nav-main-link-name">تنظیمات</span>
              </a>
              <ul class="nav-main-submenu">
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/settings/sms/info">
                    <span class="nav-main-link-name">اطلاعات پنل پیامک</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/settings/sms/settings">
                    <span class="nav-main-link-name">تنظیمات پیامک</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/settings/system/info">
                    <span class="nav-main-link-name">سیستم</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/manager/settings/update/info">
                    <span class="nav-main-link-name">بانک اطلاعاتی</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-main-item">
              <a @click="this.logout()" class="nav-main-link">
                <i class="nav-main-link-icon si si-arrow-right"></i>
                <span class="nav-main-link-name"> خروج </span>
              </a>
            </li>
          </ul>
        </div>
        <!-- END Side Navigation -->
      </div>
      <!-- END Sidebar Scrolling -->
    </nav>
    <!-- END Sidebar -->

    <!-- Header -->
    <header id="page-header">
      <!-- Header Content -->
      <div class="content-header">
        <!-- Left Section -->
        <div>
          <!-- Toggle Sidebar -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout()-->
          <button class="btn btn-alt-secondary d-lg-none" data-action="sidebar_toggle" data-toggle="layout" type="button">
            <i class="fa fa-fw fa-bars"></i>
          </button>
          <!-- END Toggle Sidebar -->
        </div>
        <!-- END Left Section -->

        <!-- Right Section -->
        <div>
          <!-- User Dropdown -->
          <div class="dropdown d-inline-block">
            <button aria-expanded="false" aria-haspopup="true" class="btn btn-alt-secondary" data-bs-toggle="dropdown"
                    id="page-header-user-dropdown" type="button">
              <span class="d-none d-lg-inline mx-1">{{userInfo.email}}</span>
              <span class="badge rounded-pill bg-success">{{userInfo.fullname}}</span>
              <i class="fa fa-fw fa-angle-down ms-1"></i>
            </button>
            <div aria-labelledby="page-header-user-dropdown" class="dropdown-menu dropdown-menu-end dropdown-menu-lg p-0">
              <div class="bg-primary rounded-top fw-semibold text-white text-center p-3">
                <vue-gravatar class="img-avatar img-avatar-thumb" :email="this.userInfo.email" :size="128" />

                <div class="pt-2">
                  <a class="text-white fw-semibold" href="/">{{this.userInfo.fullname}}</a>
                </div>
              </div>
              <div class="p-2">
                <a href="/" class="dropdown-item d-flex justify-content-between align-items-center">
                  پروفایل کاربری <i class="fa fa-fw fa-user-cog text-success ms-1"></i>
                </a>
                <button @click="this.logout()" class="dropdown-item d-flex justify-content-between align-items-center">
                  خروج از سیستم <i class="fa fa-fw fa-sign-out-alt text-danger ms-1"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- END User Dropdown -->
        </div>
        <!-- END Right Section -->
      </div>
      <!-- END Header Content -->

      <!-- Header Search -->
      <div class="overlay-header bg-sidebar-dark" id="page-header-search">
        <div class="content-header">
          <form action="be_pages_generic_search.html" class="w-100" method="POST">
            <div class="input-group">
              <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
              <button class="btn btn-danger" data-action="header_search_off" data-toggle="layout" type="button">
                <i class="fa fa-fw fa-times-circle"></i>
              </button>
              <input class="form-control border-0" id="page-header-search-input" name="page-header-search-input"
                     placeholder="جستجوی اپلیکیشن" type="text" />
            </div>
          </form>
        </div>
      </div>
      <!-- END Header Search -->

      <!-- Header Loader -->
      <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
      <div class="overlay-header bg-primary-darker" id="page-header-loader">
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-2x fa-sun fa-spin text-white"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </header>
    <!-- END Header -->

    <!-- Main Container -->
    <main id="main-container">
      <!-- Page Content -->
      <div class="content content-full p-0">
        <RouterView />
      </div>
      <!-- END Page Content -->
    </main>
    <!-- END Main Container -->
  </div>
  <!-- END Page Container -->
</template>

<style>

.customize-table {
  --easy-table-header-font-color: #e1e1e1;
  --easy-table-header-background-color: #055bbb;
}
.form-control ,.form-select{
  font-family: 'vazir', sans-serif;
}
input[type=input]{
  direction:ltr;
}

.node-wrapper{
  border-radius: 12px;
}

</style>
