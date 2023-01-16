<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped>
  .nav-item:hover{
    background-color: #cfffb7;
    border-radius: 25px;
  }
</style>
<template>
  <header>
    <nav class="navbar navbar-expand-md text-secondary" style="background-color: #ececec; border-bottom: 2px solid red;">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <img src="/img/logo-blue.png" class="img-fluid" style="max-height: 35px;">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item"><router-link to="/" class="nav-link px-2">صفحه نخست</router-link></li>
            <li class="nav-item"><router-link to="/faq" class="nav-link px-2">سوالات متداول</router-link></li>
            <li class="nav-item"><a href="{{ path('app_help',{'id':'home'})}}" class="nav-link px-2">راهنما و خود آموزها</a></li>
            <li class="nav-item"><a href="{{ path('stack') }}" class="nav-link px-2">پرسش‌و‌پاسخ</a></li>
            <li class="nav-item"><router-link to="/about" class="nav-link px-2">درباره حسابیکس</router-link></li>
            <li class="nav-item"><a href="http://blog.hesabix.ir" class="nav-link px-2">وبلاگ</a></li>
            <li class="nav-item"><router-link to="/contact-us" class="nav-link px-2">تماس با ما</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="container-fluid pt-3 pb-5">
    <div class="row">
      <RouterView />
    </div>
  </div>
  <footer class="d-flex flex-wrap justify-content-between align-items-center bg-white py-0 mt-2 border-top fixed-bottom">
    <div class="col-md-4 d-flex align-items-center ms-3">
      <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <img src="/img/logo-blue.png" class="" style="max-height: 24px;">
      </a>
      <span class="mb-3 mb-md-0 text-muted">
                    حسابیکس تحت
                    <a class="btn btn-link mx-0 px-0" href="https://fa.wikipedia.org/wiki/%D9%BE%D8%B1%D9%88%D8%A7%D9%86%D9%87_%D8%AC%D8%A7%D9%85%D8%B9_%D9%87%D9%85%DA%AF%D8%A7%D9%86%DB%8C_%DA%AF%D9%86%D9%88" target="_blank">
                        GNU GPL 3
                    </a>
                    منتشر می‌شود.
                </span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex me-3">
      <li class="ms-3"><a class="text-muted" target="_blank" href="https://github.com/morrning/hesabix"><i class="bi bi-github"></i></a></li>
      <li class="ms-3"><a class="text-muted" target="_blank" href="https://instagram.com/hesabix.acc"><i class="bi bi-instagram"></i></a></li>
      <li class="ms-3"><a class="text-muted" target="_blank" href="https://www.aparat.com/hesabix.ir"><i class="bi bi-youtube"></i></a></li>
    </ul>
  </footer>

</template>