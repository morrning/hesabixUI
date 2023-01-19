<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="row g-0 justify-content-center bg-body-dark">
      <div class="hero-static col-sm-10 col-md-8 col-xl-6 d-flex p-2 px-sm-0">
        <!-- Sign In Block -->
        <div class="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image">
          <div class="row g-0">
            <div class="col-md-6 order-md-1 bg-body-extra-light">
              <div class="block-content block-content-full px-lg-5 py-md-5 py-lg-6">
                <!-- Header -->
                <div class="mb-2 text-center">
                  <router-link class="link-fx fw-bold fs-1" to="/">
                    <span class="text-dark">حسا</span><span class="text-primary">بیکس</span>
                  </router-link>
                  <p class="text-uppercase fw-bold fs-sm text-muted"> ورود </p>
                </div>
                <!-- END Header -->

                <!-- Sign In Form -->
                <!-- jQuery Validation (.js-validation-signin class is initialized in js/pages/op_auth_signin.min.js which was auto compiled from _js/pages/op_auth_signin.js) -->
                <!-- For more info and examples you can check out https://github.com/jzaefferer/jquery-validation -->
                <form action="be_pages_auth_all.html" class="js-validation-signin" method="POST">
                  <div class="mb-4">
                    <input class="form-control form-control-alt" id="login-username" name="login-username" placeholder="پست الکترونیکی" type="email"/>
                  </div>
                  <div class="mb-4">
                    <input class="form-control form-control-alt" id="login-password" name="login-password" placeholder="کلمه عبور" type="password"/>
                  </div>
                  <div class="mb-4">
                    <button class="btn w-100 btn-hero btn-primary" type="submit">
                      <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i> ورود </button>
                  </div>
                </form>
                <!-- END Sign In Form -->
              </div>
            </div>
            <div class="col-md-6 order-md-0 bg-primary-dark-op d-flex align-items-center">
              <div class="block-content block-content-full px-lg-5 py-md-5 py-lg-6">
                <div class="d-flex">
                  <div class="flex-grow-1">
                    <p class="d-none d-sm-none d-md-block push text-white fw-semibold mb-1"> بهترین نرم افزار حسابداری ابری و کاملا رایگان </p>
                    <div class="text-center">
                      <a class="btn btn-alt-success me-1" href="javascript:void(0)">عضویت</a>
                      <a class="btn btn-alt-info" href="javascript:void(0)">فراموشی کلمه عبور</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Sign In Block -->
      </div>
    </div>
    <!-- END Page Content -->
  </main>
  <!-- END Main Container -->
</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>

</style>