<template>
  <!-- Main Container -->
  <main id="main-container">
    <!-- Page Content -->
    <div class="bg-image" style="background-image: url('/assets/media/photos/photo21.jpg')">
      <div class="row g-0 justify-content-center bg-primary-dark-op">
        <!-- pwa install banner -->
        <div v-if="installBanner" class="row bg-body-extra-light position-absolute rounded p-2 mt-2"
          style="width: 350px">
          <div class="col-8">
            <img src="/img/logo-blue.png" width="40" alt="" />
            <span class="text-primary fw-bold fs-4">{{ siteName }}</span>
          </div>
          <button type="button" class="btn btn-light col-4" @click="callbtn">نصب</button>
        </div>
        <div class="hero-static col-sm-8 col-md-6 col-xl-4 d-flex align-items-center p-2 px-sm-0">
          <!-- Sign In Block -->
          <div class="block block-transparent block-rounded w-100 mb-0 overflow-hidden">
            <div class="block-content block-content-full px-lg-5 px-xl-6 py-4 py-md-5 py-lg-6 bg-body-extra-light">
              <!-- Header -->
              <div class="mb-2 text-center">
                <a class="link-fx fw-bold fs-1" href="/">
                  <span class="text-primary">{{ siteName }}</span>
                </a>
                <p class="text-uppercase fw-bold fs-sm text-muted">ورود</p>
              </div>
              <!-- END Header -->
              <div v-if="this.loading" class="d-flex justify-content-center">
                <div class="spinner-border text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <form v-show="!this.loading" @submit.prevent="submit">
                <div class="form-floating mb-3">
                  <input :disabled="this.loadingSubmit" class="form-control" type="text" v-model="email" />
                  <label>پست الکترونیکی</label>
                </div>

                <div class="form-floating mb-3">
                  <input :disabled="this.loadingSubmit" class="form-control" type="password" v-model="password" />
                  <label>کلمه عبور</label>
                </div>

                <div class="d-sm-flex justify-content-sm-between align-items-sm-center text-center text-sm-start">
                  <div class="fw-semibold fs-sm py-0">
                    <RouterLink to="/user/forget-password">کلمه عبور را فراموش کرده اید؟</RouterLink>
                  </div>
                </div>
                <div class="text-center mt-3">
                  <button :disabled="this.loadingSubmit" type="submit" class="btn btn-primary">
                    <div v-show="this.loadingSubmit" class="spinner-grow spinner-grow-sm me-2" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i class="fa fa-fw fa-sign-in-alt opacity-50 me-1"></i>
                    ورود به {{ siteName }}
                  </button>
                </div>
                <div class="text-center mt-4">
                  <div class="fw-semibold fs-sm py-0">
                    <RouterLink to="/user/register">
                      حساب کاربری ندارید؟ عضو شوید
                    </RouterLink>
                  </div>
                </div>
              </form>
            </div>
            <div class="block-content bg-body">
              <div class="d-flex justify-content-center text-center push">
                <a class="btn btn-sm btn-alt-secondary" :href="this.$filters.getApiUrl()">
                  <i class="fa fa-home"></i>
                  صفحه نخست
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { getSiteName } from "/hesabixConfig";
import Swal from "sweetalert2";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data: () => {
    return {
      siteName: "",
      loading: true,
      loadingSubmit: false,
      email: "",
      password: "",
      tokenID: "123456",
      installBanner: false,
      installPromptEvent: {},
    };
  },
  mounted() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // console.log("before install prompt event");
      this.installPromptEvent = e;
    });

    setTimeout(() => {
      if (this.installPromptEvent) {
        this.installBanner = true;
        console.log(this.installPromptEvent);
      }
    }, 1000);

    this.loadData();
  },
  methods: {
    callbtn() {
      if (this.installPromptEvent) {

        this.installPromptEvent.prompt();

        this.installPromptEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User Accepted");
          } else {
            console.log("User dismissed");
          }

          this.installPromptEvent = null;
        });
      } else {
        Swal.fire({
          title: "برنامه قبلا روی گوشی شما نصب شده است",
          text: "در قسمت برنامه های تلفن همراه، میتوانید حسابیکس را پیدا کنید",
          icon: "warning",
          confirmButtonText: "متوجه شدم",
        });
      }
    },

    ValidateEmail(email) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return !!email.match(validRegex);
    },
    loadData() {
      this.siteName = getSiteName();
      axios
        .post("/api/user/check/login")
        .then((response) => {
          if (response.data.Success == true) {
            this.$router.push('/profile/dashboard');
          } else {
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    submit() {
      if (
        this.email.trim().length === 0 ||
        this.ValidateEmail(this.email) === false
      ) {
        Swal.fire({
          title: "خطا",
          text: "پست الکترونیکی نامعتبر است.",
          icon: "error",
          confirmButtonText: "قبول",
        }).then((res) => { });
      } else if (this.email.trim().length < 6) {
        Swal.fire({
          title: "خطا",
          text: "کلمه عبور نامعتبر است.",
          icon: "error",
          confirmButtonText: "قبول",
        }).then((res) => { });
      } else {
        this.loadingSubmit = true;
        // perform async actions
        localStorage.removeItem("X-AUTH-TOKEN");
        axios
          .post("api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("X-AUTH-TOKEN", response.data.token);
            axios.defaults.headers.common["X-AUTH-TOKEN"] =
              localStorage.getItem("X-AUTH-TOKEN");
            //login to mainSite
            this.tokenID = response.data.tokenID;
            this.$router.push('/');
          })
          .catch((error) => {
            Swal.fire({
              title: "خطا",
              text: "نام کاربری یا کلمه عبور اشتباه است.",
              icon: "error",
              confirmButtonText: "قبول",
            })
              .then((res) => { })
              .then((res) => {
                this.loadingSubmit = false;
                this.password = "";
              });
          });
      }
    },
  },
};
</script>

<style scoped></style>