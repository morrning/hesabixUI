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
<style scoped>

</style>
<template>
  <!-- Header -->
  <header id="page-header" class="app-header" style="background-color: #f3f9ff">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div class="d-flex align-items-center">
        <!-- Logo -->
        <img class="" src="/img/logo-blue.png" alt="" width="32" height="32">

        <router-link class="fw-semibold text-dual tracking-wide" to="/"><span class="opacity-75">حسابیکس | </span>

          <small class="fw-lighter"> حسابداری ابری و رایگان</small>
        </router-link>
        <!-- END Logo -->
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div v-if="this.isLogedIn != true">
        <router-link to="/login" class="btn btn-sm btn-primary me-1">ورود</router-link>
        <router-link to="/register" class="btn btn-sm btn-success">عضویت</router-link>
      </div>
      <div v-else>
        <div class="dropdown d-inline-block">
          <button aria-expanded="false" aria-haspopup="true" class="btn btn-primary" data-bs-toggle="dropdown" id="page-header-user-dropdown" type="button">
            <i class="fa fa-lg fa-user-circle"></i>
            <i class="fa fa-angle-down opacity-50 ms-1"></i>
          </button>
          <div aria-labelledby="page-header-user-dropdown" class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div class="rounded-top fw-semibold text-white bg-primary-op">
              <div class="p-3 bg-black-50 rounded-top">
                <div class="d-flex align-items-center">
                  <vue-gravatar class="img-avatar img-avatar48 img-avatar-thumb" :email="this.userEmail" :size="150" />
                  <div class="ms-3">
                    <router-link class="text-white fw-semibold" to="/user/profile/dashboard">{{ userFullName }}</router-link>
                    <div class="fs-sm text-white-75">{{ userEmail }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <router-link class="dropdown-item d-flex justify-content-between align-items-center" to="/business/list">
                <div>
                  <i class="fa fa-fw fa-globe opacity-50 me-1"></i>کسب‌و‌کارها  </div>
                <span class="badge rounded-pill bg-primary">{{ this.business_count}}</span>
              </router-link>
              <div class="dropdown-divider" role="separator"></div>
              <router-link class="dropdown-item d-flex align-items-center" to="/user/profile/dashboard">
                <i class="fa fa-fw fa-user-circle opacity-50 me-1"></i> پروفایل </router-link>
              <div class="dropdown-divider" role="separator"></div>
              <button class="dropdown-item d-flex align-items-center mb-0" @click="logout">
                <i class="fa fa-fw fa-sign-out-alt text-danger me-1"></i> خروج </button>
            </div>
          </div>
        </div>
      </div>

      <!-- END Right Section -->
      <!-- Toggle Main Navigation -->
      <div class="d-lg-none push mx-0 px-0">
        <!-- Class Toggle, functionality initialized in Helpers.dmToggleClass() -->
        <button class="btn btn-primary d-flex justify-content-between align-items-center" data-class="d-none" data-target="#main-navigation" data-toggle="class-toggle" type="button"> <i class="fa fa-bars"></i>
        </button>
      </div>
      <!-- END Toggle Main Navigation -->
    </div>
    <!-- END Header Content -->
    <!-- Header Loader -->
    <!-- Please check out the Loaders page under Components category to see examples of showing/hiding it -->
    <div class="overlay-header bg-sidebar-dark" id="page-header-loader">
      <div class="content-header">
        <div class="w-100 text-center">
          <i class="fa fa-fw fa-2x fa-spinner fa-spin text-primary"></i>
        </div>
      </div>
    </div>
    <!-- END Header Loader -->
  </header>

  <!-- Main Container -->
  <main id="main-container">
    <!-- Navigation -->
    <div class="bg-sidebar-dark">
      <div class="content py-1">
        <!-- Main Navigation -->
        <div class="d-none d-lg-block push my-1" id="main-navigation">
          <ul class="nav-main nav-main-horizontal nav-main-hover nav-main-dark">
            <li class="nav-main-item">
              <router-link class="nav-main-link" to="/">
                <i class="nav-main-link-icon fa fa-home"></i>
                <span class="nav-main-link-name"> حسابیکس </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link" to="/faq">
                <i class="nav-main-link-icon fa fa-book-atlas"></i>
                <span class="nav-main-link-name">  سوالات متداول  </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link" to="/guide/content/home">
                <i class="nav-main-link-icon fa fa-book-bookmark"></i>
                <span class="nav-main-link-name">راهنما و خودآموزها</span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link" to="/stack/home/non/1">
                <i class="nav-main-link-icon fa fa-question"></i>
                <span class="nav-main-link-name"> پرسش و پاسخ </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <router-link class="nav-main-link" to="/blog/home/1">
                <i class="nav-main-link-icon fa fa-blog"></i>
                <span class="nav-main-link-name"> وبلاگ </span>
              </router-link>
            </li>
            <li class="nav-main-item">
              <a aria-expanded="true" aria-haspopup="true" class="nav-main-link active nav-main-link-submenu" data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-percentage"></i>
                <span class="nav-main-link-name">درباره حسابیکس</span>
              </a>
              <ul class="nav-main-submenu">
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/about">
                    <span class="nav-main-link-name">داستان حسابیکس</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/contact-us">
                    <span class="nav-main-link-name">تماس با ما</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/terms">
                    <span class="nav-main-link-name">قوانین ارائه خدمات</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/privacy-policy">
                    <span class="nav-main-link-name">حریم خصوصی</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link to="/open-source" class="nav-main-link">
                    <span class="nav-main-link-name">متن باز</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- END Main Navigation -->
      </div>
    </div>
    <!-- END Navigation -->
    <!-- Page Content -->
    <div class="content m-sm-3 pt-1 m-0 p-0">
      <router-view />
    </div>
    <!-- Footer -->
    <div class="container-fluid bg-white mt-2">
      <div class="row items-push fs-sm border-bottom border-top pt-4">
        <div class="col-sm-12 col-md-8">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="ms-2">
                <h3 class="fw-light">امکانات و ویژگی ها</h3>
                <ul class="list list-simple-mini">
                  <li>
                    <a class="fw-semibold" href="javascript:void(0)">
                      <i class="fa fa-fw fa-arrow-left text-primary-lighter"></i>
                      نصب، نگهداری و پشتیبانی
                    </a>
                  </li>
                  <li>
                    <a class="fw-semibold" href="javascript:void(0)">
                      <i class="fa fa-fw fa-arrow-left text-primary-lighter"></i>
                      مدیریت پیشرفته کاربران
                    </a>
                  </li>
                  <li>
                    <a class="fw-semibold" href="javascript:void(0)">
                      <i class="fa fa-fw fa-arrow-left text-primary-lighter"></i>
                      خرید و فروش
                    </a>
                  </li>
                  <li>
                    <a class="fw-semibold" href="javascript:void(0)">
                      <i class="fa fa-fw fa-arrow-left text-primary-lighter"></i>
                      هزینه و درآمد
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <h3 class="fw-light">راهنما و خودآموزها</h3>
              <ul class="list list-simple-mini">
                <li>
                  <router-link class="fw-semibold" to="/guide/content/home">
                    <i class="fa fa-fw fa-book-open-reader text-primary-lighter me-1"></i> راهنمای جامع </router-link>
                </li>
                <li>
                  <router-link class="fw-semibold" to="/faq">
                    <i class="fa fa-fw fa-question-circle text-primary-lighter me-1"></i> سوالات متداول </router-link>
                </li>
                <li>
                  <a class="fw-semibold" href="javascript:void(0)">
                    <i class="fa fa-fw fa-server text-primary-lighter me-1"></i> مستندات API  </a>
                </li>
                <li>
                  <a class="fw-semibold" href="javascript:void(0)">
                    <i class="fa fa-fw fa-history text-primary-lighter me-1"></i>لیست تغییرات و بروزرسانی ها</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-6 col-md-4">
              <ul class="list list-simple-mini">
                <li>
                  <router-link class="fw-semibold" to="/blog/home/1">
                    <i class="fa fa-fw fa-blog text-primary-lighter me-1"></i> وبلاگ </router-link>
                </li>
                <li>
                  <router-link class="fw-semibold" to="/contact-us">
                    <i class="fa fa-fw fa-paper-plane text-primary-lighter me-1"></i> تماس و پشتیبانی </router-link>
                </li>
                <li>
                  <router-link class="fw-semibold" to="/about">
                    <i class="fa fa-fw fa-hand-paper text-primary-lighter me-1"></i> درباره حسابیکس </router-link>
                </li>
                <li>
                  <router-link class="fw-semibold" to="/terms">
                    <i class="fa fa-fw fa-wand-magic text-primary-lighter me-1"></i> قوانین ارائه خدمات </router-link>
                </li>
                <li>
                  <router-link class="fw-semibold" to="/privacy-policy">
                    <i class="fa fa-fw fa-globe text-primary-lighter me-1"></i> حریم خصوصی </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4 text-center mt-2">
            <div class="row">
              <div class="col">
                <img src="/img/zarinpal-logo-min.png" class="img-thumbnail mb-5" style="max-height: 120px;">
              </div>
              <div class="col">
                <img src="/img/enamad-logo.png" class="img-thumbnail" style="max-height: 120px;">
              </div>
            </div>
        </div>
      </div>
    </div>
    <footer class="bg-body-light" id="page-footer">
      <div class="content py-0">
        <div class="row fs-sm">
          <div class="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-end">
            حسابیکس با <i class="fa fa-heart text-danger"></i>
            متن باز است.
          </div>
          <div class="col-sm-6 order-sm-1 text-center text-sm-start">
            <a class="fw-semibold" href="https://github.com/morrning/hesabixUI" target="_blank">Hesabix v 0.1.1</a> © <span data-toggle="year-copy"></span>
          </div>
        </div>
      </div>
    </footer>
    <!-- END Footer -->
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>
