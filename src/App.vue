<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
  setup(){
    alert('checking user is loged in before...');
  }
}
</script>
<style scoped>

</style>
<template>
  <!-- Header -->
  <header id="page-header" class="app-header" style="background-color: #cbe0ff">
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
      <div>
        <router-link to="/login" class="btn btn-sm btn-primary me-1">ورود</router-link>
        <a class="btn btn-sm btn-success">عضویت</a>
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
              <router-link class="nav-main-link"
                :to="{
                  name: 'guide',
                  params: {
                    id: 'home'
                  }
                }">
              <i class="nav-main-link-icon fa fa-book-bookmark"></i>
                <span class="nav-main-link-name">راهنما و خودآموزها</span>
              </router-link>
            </li>
          
            <li class="nav-main-item">
              <a class="nav-main-link" href="be_pages_dashboard.html">
                <i class="nav-main-link-icon fa fa-question"></i>
                <span class="nav-main-link-name"> پرسش و پاسخ </span>
              </a>
            </li>
            <li class="nav-main-item">
              <a class="nav-main-link" href="http://blog.hesabix.ir">
                <i class="nav-main-link-icon fa fa-blog"></i>
                <span class="nav-main-link-name"> وبلاگ </span>
              </a>
            </li>
            <li class="nav-main-item">
              <a aria-expanded="true" aria-haspopup="true" class="nav-main-link active nav-main-link-submenu" data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-percentage"></i>
                <span class="nav-main-link-name">درباره حسابیکس</span>
              </a>
              <ul class="nav-main-submenu">
                <li class="nav-main-item">
                  <router-link class="nav-main-link active" to="/about">
                    <span class="nav-main-link-name">داستان حسابیکس</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/contact-us">
                    <span class="nav-main-link-name">تماس با ما</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/contact-us">
                    <span class="nav-main-link-name">قوانین ارائه خدمات</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <router-link class="nav-main-link" to="/contact-us">
                    <span class="nav-main-link-name">حریم خصوصی</span>
                  </router-link>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" href="bd_image_1.html">
                    <span class="nav-main-link-name">متن باز</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-main-item ms-lg-auto">
              <a aria-expanded="false" aria-haspopup="true" class="nav-main-link nav-main-link-submenu" data-toggle="submenu" href="#">
                <i class="nav-main-link-icon fa fa-brush"></i>
                <span class="nav-main-link-name d-lg-none">تم ها</span>
              </a>
              <ul class="nav-main-submenu nav-main-submenu-right">
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="default" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-default"></i>
                    <span class="nav-main-link-name"> پیش فرض </span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xwork.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xwork"></i>
                    <span class="nav-main-link-name">xWork</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xmodern.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xmodern"></i>
                    <span class="nav-main-link-name">xModern</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xeco.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xeco"></i>
                    <span class="nav-main-link-name">xEco</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xsmooth.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xsmooth"></i>
                    <span class="nav-main-link-name">xSmooth</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xinspire.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xinspire"></i>
                    <span class="nav-main-link-name">xInspire</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xdream.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xdream"></i>
                    <span class="nav-main-link-name">xDream</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xpro.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xpro"></i>
                    <span class="nav-main-link-name">x Pro</span>
                  </a>
                </li>
                <li class="nav-main-item">
                  <a class="nav-main-link" data-theme="assets/css/themes/xplay.min.css" data-toggle="theme" href="#">
                    <i class="nav-main-link-icon fa fa-circle text-xplay"></i>
                    <span class="nav-main-link-name">xPlay</span>
                  </a>
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
    <div class="content m-0 p-0">
      <router-view />
    </div>
    <!-- Footer -->
    <footer class="bg-body-light fixed-bottom" id="page-footer">
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
