<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa-solid fa-user-tie"></i>
        نمایه کسب‌و‌کار
      </h3>
      <div class="block-options">

      </div>
    </div>
    <div class="block-content">
      <loading color="blue" loader="dots" v-model:active="loading" :is-full-page="false"/>
      <div class="row">
        <div class="col-sm-12 col-md-12 my-3">
          <div class="row">
            <div class="col-sm-12 col-md-4 mt-1">
              <div class="card">
                <div class="card-header">
                  نمایه کنونی
                </div>
                <div class="card-body">
                  <img class="img-fluid" :src="getImgSrc()" />
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 mt-1">
              <div class="alert alert-success" role="alert">
                <h4 class="alert-heading"></h4>
                <ul>
                  <li>
                    نمایه یک تصویر است که در بالای فاکتورها و اسناد حسابداری قرار می گیرد.
                  </li>
                  <li>
                    بهترین نمایش تصویر در لوگو و آرم‌های مربعی است
                  </li>
                  <li>
                    حداکثر سایز 512 در 512 پیکسل است و بیشینه حجم فایل انتخابی نباید از ۱ مگابایت تجاوز کند.
                  </li>
                  <li>
                    فرمت فایل قابل قبول jpg , jpeg , png است.
                  </li>
                </ul>
              </div>
              <form @submit.prevent="save()">
                <div class="input-group">
                  <input type="file" required class="form-control" v-on:change="selectedFile($event)" id="avatarImgFile" aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload">
                  <button :disabled="loading" class="btn btn-success" type="submit" id="inputGroupFileAddon04">
                    <i class="fa-solid fa-floppy-disk me-1"></i>
                    ذخیره
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import { getApiUrl, getSiteName } from "../@/hesabixConfig"
import Loading from "vue-loading-overlay";

export default {
  name: "avatar",
  components: {
    Loading
  },
  data: () => {
    return {
      loading: true,
      file: null,
      lastImg: 'default.png'
    }
  },
  methods: {
    loadData() {
      axios.get('/api/avatar/get')
        .then((response) => {
          this.loading = false;
          this.lastImg = response.data;
        })
    },
    save() {
      this.loading = true;
      const formData = new FormData();
      formData.append('bytes', this.file);
      axios.post('/api/avatar/post',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        this.loading = false;
        if (response.data == 'e') {
          Swal.fire({
            text: 'فرمت فایل اشتباه است.',
            icon: 'warning',
            confirmButtonText: 'قبول'
          })
        }
        else if (response.data == 's') {
          Swal.fire({
            text: 'حجم فایل ارسال باید کمتر از یک مگابایت باشد.',
            icon: 'warning',
            confirmButtonText: 'قبول'
          })
        }
        else if (response.data == 'is') {
          Swal.fire({
            text: 'سایز تصویر نامناسب است و طول و عرض آن باید کمتر از 512 پیکسل باشد.',
            icon: 'warning',
            confirmButtonText: 'قبول'
          })
        }
        else {
          Swal.fire({
            text: 'نمایه با موفقیت تغییر یافت.',
            icon: 'success',
            confirmButtonText: 'قبول'
          });
          this.loadData();
        }
      });
    },
    getImgSrc() {
      return getApiUrl() + '/api/avatar/get/file/' + this.lastImg;
    },
    selectedFile(event) {
      this.file = event.target.files[0]
    },
  },
  beforeMount() {
    this.loadData();
  }
}
</script>
<style scoped></style>