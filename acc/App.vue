<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios";
import Swal from "sweetalert2";
import {inject} from "vue";
import NProgress from "nprogress/nprogress.js";
import "nprogress/nprogress.css"
export default {
  data(){
    return {
      userFullName: '',
      userEmail: '',
      isLogedIn: false,
      business_count: 0
    }
  },
  created() {
    NProgress.configure({ showSpinner: false });
    //axios.defaults.baseURL = "http://raddata.ir/hesabix/public/index.php";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.interceptors.request.use(function(config) {
      // Do something before request is sent
      NProgress.start()
      return config;
    }, function(error) {
      // Do something with request error
      console.log('Error');
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response) {
      // Do something with response data
      NProgress.done()
      return response;
    }, function(error) {
      if(error.code == 404){
        // Do something with response error
        Swal.fire({
          text: 'اتصال با سرویس دهنده حسابیکس برقرار نشد. لطفا اتصال اینترنت خود را چک نمایید.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      return Promise.reject(error);
    });
  },
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
  mounted(){
    axios.post( '/api/user/check/login')
        .then((response) =>{
          this.isLogedIn = response.data.result;
          axios.post( '/api/user/current/info')
              .then((res) =>{
                this.userEmail = res.data.email;
                this.userFullName = res.data.fullname;
                this.$isLogedIn = true;
              });
        });

    axios.post( '/api/business/list/count')
        .then((response) =>{
          this.business_count = response.data.count;
        });
  }
}
</script>

<template>


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
    <!-- Side Header -->
    <div class="bg-header-dark">
      <div class="content-header bg-white-5">
        <!-- Logo -->
        <a class="fw-semibold text-white tracking-wide" href="/">
              <span class="smini-visible"> Hesab<span class="opacity-75">ix</span>
              </span>
          <span class="smini-hidden">Hesa<span class="opacity-75">bix</span>
              </span>
        </a>
        <!-- END Logo -->

        <!-- Options -->
        <div>
          <!-- Toggle Sidebar Style -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <!-- Class Toggle, functionality initialized in Helpers.dmToggleClass() -->
          <button class="me-1 btn btn-sm btn-alt-secondary" data-class="fa-toggle-off fa-toggle-on" data-target="#sidebar-style-toggler" data-toggle="class-toggle" onclick="Dashmix.layout('sidebar_style_toggle');Dashmix.layout('header_style_toggle');" type="button">
            <i class="fa fa-toggle-off" id="sidebar-style-toggler"></i>
          </button>
          <!-- END Toggle Sidebar Style -->

          <!-- Dark Mode -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <button class="me-1 btn btn-sm btn-alt-secondary" data-class="far fa" data-target="#dark-mode-toggler" data-toggle="class-toggle" onclick="Dashmix.layout('dark_mode_toggle');" type="button">
            <i class="far fa-moon" id="dark-mode-toggler"></i>
          </button>
          <!-- END Dark Mode -->

          <!-- Close Sidebar, Visible only on mobile screens -->
          <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
          <button class="me-1 btn btn-sm btn-alt-secondary d-lg-none" data-action="sidebar_close" data-toggle="layout" type="button">
            <i class="fa fa-times-circle"></i>
          </button>
          <!-- END Close Sidebar -->
        </div>
        <!-- END Options -->
      </div>
    </div>
    <!-- END Side Header -->

    <!-- Sidebar Scrolling -->
    <div class="js-sidebar-scroll">
      <!-- Side Navigation -->
      <div class="content-side">
        <ul class="nav-main">
          <li class="nav-main-item">
            <RouterLink class="nav-main-link active" to="/acc/">
              <i class="nav-main-link-icon fa fa-rocket"></i>
              <span class="nav-main-link-name"> پیشخوان </span>
            </RouterLink>
          </li>
          <li class="nav-main-heading">حسابداری</li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-person"></i>
              <span class="nav-main-link-name">اشخاص</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <RouterLink class="nav-main-link" to="/acc/persons/list">
                  <span class="nav-main-link-name"> فهرست اشخاص</span>
                  <RouterLink to="/acc/" class="nav-main-link-badge badge rounded-pill bg-primary">+</RouterLink>
                </RouterLink>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">دریافت‌ها</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">پرداخت‌ها</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-box-open"></i>
              <span class="nav-main-link-name">کالا و خدمات</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> فهرست کالاها</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-bank"></i>
              <span class="nav-main-link-name">بانکداری</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> فهرست حساب‌ها</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> انتقال </span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-money-bill"></i>
              <span class="nav-main-link-name">خرید و هزینه</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> فاکتورهای خرید</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">فهرست هزینه‌ها</span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-basket-shopping"></i>
              <span class="nav-main-link-name">فروش و درآمد</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> فاکتورهای فروش </span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">فهرست درآمدها </span>
                  <span class="nav-main-link-badge badge rounded-pill bg-primary">+</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-main-item">
            <RouterLink class="nav-main-link" to="/">
              <i class="nav-main-link-icon fa fa-chart-simple"></i>
              <span class="nav-main-link-name">گزارشات</span>
            </RouterLink>
          </li>
          <li class="nav-main-item">
            <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
              <i class="nav-main-link-icon fa fa-cogs"></i>
              <span class="nav-main-link-name">تنظیمات</span>
            </a>
            <ul class="nav-main-submenu">
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">  اطلاعات کسب‌و‌کار </span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name"> کاربران و دسترسی‌ها </span>
                </a>
              </li>
              <li class="nav-main-item">
                <a class="nav-main-link" href="javascript:void(0)">
                  <span class="nav-main-link-name">  تاریخچه رویدادها  </span>
                </a>
              </li>
            </ul>
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
        <button class="btn-sm btn btn-alt-secondary me-1" data-action="sidebar_toggle" data-toggle="layout" type="button">
          <i class="fa fa-fw fa-bars"></i>
        </button>
        <!-- END Toggle Sidebar -->

      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div>
        <!-- User Dropdown -->
        <div class="dropdown d-inline-block">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm me-1 btn-alt-secondary" data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
            <i class="fa fa-fw fa-user d-sm-none"></i>
            <span class="d-none d-sm-inline-block">{{ userFullName }}</span>
            <i class="fa fa-fw fa-angle-down opacity-50 ms-1 d-none d-sm-inline-block"></i>
          </button>
          <div aria-labelledby="page-header-user-dropdown" class="dropdown-menu dropdown-menu-end p-0">
            <div class="bg-primary-dark rounded-top fw-semibold text-white text-center p-3"> گزینه های کاربر </div>
            <div class="p-2">
              <a class="dropdown-item" href="javascript:void(0)">
                <i class="far fa-fw fa-user me-1"></i> پروفایل </a>
              <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                <span><i class="far fa-fw fa-envelope me-1"></i>صندوق ورودی </span>
                <span class="badge bg-primary rounded-pill">3</span>
              </a>
              <a class="dropdown-item" href="javascript:void(0)">
                <i class="far fa-fw fa-file-alt me-1"></i> فاکتورها </a>
              <div class="dropdown-divider" role="separator"></div>

              <!-- Toggle Side Overlay -->
              <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
              <a class="dropdown-item" data-action="side_overlay_toggle" data-toggle="layout" href="/user/profile/dashboard">
                <i class="far fa-fw fa-building me-1"></i> تنظیمات </a>
              <!-- END Side Overlay -->

              <div class="dropdown-divider" role="separator"></div>
              <button class="dropdown-item" @click="this.logout">
                <i class="far fa-fw fa-arrow-alt-circle-left me-1"></i> خروج از حسابیکس </button>
            </div>
          </div>
        </div>
        <!-- END User Dropdown -->

        <!-- Notifications Dropdown -->
        <div class="dropdown d-inline-block">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-sm btn-alt-secondary" data-bs-toggle="dropdown" id="page-header-notifications-dropdown" type="button">
            <i class="fa fa-fw fa-bell"></i>
          </button>
          <div aria-labelledby="page-header-notifications-dropdown" class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div class="bg-primary-dark rounded-top fw-semibold text-white text-center p-3"> اعلان ها </div>
            <ul class="nav-items my-2">
              <li>
                <a class="d-flex text-dark py-2" href="javascript:void(0)">
                  <div class="flex-shrink-0 mx-3">
                    <i class="fa fa-fw fa-check-circle text-success"></i>
                  </div>
                  <div class="flex-grow-1 fs-sm pe-2">
                    <div class="fw-semibold">برنامه به نسخه 5.6 آپدیت شد!</div>
                    <div class="text-muted">3 دقیقه قبل</div>
                  </div>
                </a>
              </li>
              <li>
                <a class="d-flex text-dark py-2" href="javascript:void(0)">
                  <div class="flex-shrink-0 mx-3">
                    <i class="fa fa-fw fa-user-plus text-info"></i>
                  </div>
                  <div class="flex-grow-1 fs-sm pe-2">
                    <div class="fw-semibold">مشترک جدید اضافه شد! شما اکنون 2580 دارید!</div>
                    <div class="text-muted">10 دقیقه قبل</div>
                  </div>
                </a>
              </li>
              <li>
                <a class="d-flex text-dark py-2" href="javascript:void(0)">
                  <div class="flex-shrink-0 mx-3">
                    <i class="fa fa-fw fa-times-circle text-danger"></i>
                  </div>
                  <div class="flex-grow-1 fs-sm pe-2">
                    <div class="fw-semibold">پشتیبان گیری سرور تکمیل نشد!</div>
                    <div class="text-muted">30 دقیقه قبل</div>
                  </div>
                </a>
              </li>
              <li>
                <a class="d-flex text-dark py-2" href="javascript:void(0)">
                  <div class="flex-shrink-0 mx-3">
                    <i class="fa fa-fw fa-exclamation-circle text-warning"></i>
                  </div>
                  <div class="flex-grow-1 fs-sm pe-2">
                    <div class="fw-semibold">فضای شما در حال اتمام است. لطفاً برنامه خود را ارتقا دهید.</div>
                    <div class="text-muted">1 ساعت قبل</div>
                  </div>
                </a>
              </li>
              <li>
                <a class="d-flex text-dark py-2" href="javascript:void(0)">
                  <div class="flex-shrink-0 mx-3">
                    <i class="fa fa-fw fa-plus-circle text-primary"></i>
                  </div>
                  <div class="flex-grow-1 fs-sm pe-2">
                    <div class="fw-semibold">فروش جدید! 3,000  ریال</div>
                    <div class="text-muted">2 ساعت قبل</div>
                  </div>
                </a>
              </li>
            </ul>
            <div class="p-2 border-top">
              <a class="btn btn-sm btn-alt-primary w-100 text-center" href="javascript:void(0)">
                <i class="fa fa-fw fa-eye opacity-50 me-1"></i> مشاهده همه </a>
            </div>
          </div>
        </div>
        <!-- END Notifications Dropdown -->
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->

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
    <div class="content p-0 m-0">
      <RouterView />
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>
