<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "info",
  data: ()=>{return {
    systemInfo: {
      balanceCount:0,
      username:'',
      password:'',
      token:''
    },
    loading: ref(true),
  }},
  methods:{
    loadData(){
      axios.get('/api/admin/settings/sms/info')
          .then((response)=>{
            this.systemInfo = response.data;
            this.loading = false;
          })
    },
    submit(){
      if(this.systemInfo.username.trim() == '' || this.systemInfo.password.trim() == '' || this.systemInfo.token.trim() == ''){
        Swal.fire({
          text: 'موارد الزامی را تکمیل کنید',
          icon: 'error',
          confirmButtonText: 'قبول',
        });
        alert()

      }
      else {
        this.loading = true;
        axios.post('/api/admin/settings/sms/info/save',this.systemInfo).then((resp)=>{
          this.loading = false;
          if(resp.data.result == 1){
            Swal.fire({
              text: 'تنظیمات با موفقیت ذخیره شد.',
              icon: 'success',
              confirmButtonText: 'قبول',
            });
          }
        })
      }

    }
  },
  beforeMount() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-message px-2"></i>
        پیامک </h3>
      <div class="block-options">
        <button :disabled="this.loading" @click="this.submit()" type="button" class="btn btn-sm btn-primary">
          <div v-show="this.loading" class="spinner-grow spinner-grow-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <i class="fa fa-save"></i>
          ذخیره تغییرات
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="row pt-3">
            <div class="col-sm-12 col-md-6">
              <p>
                <h3 class="">اعتبار پیامک پنل ملی پیامک:<span class="text-primary-dark">{{this.systemInfo.balanceCount}}</span> عدد </h3>
              </p>
            </div>
            <div class="col-sm-12 col-md-6">
              <a href="https://www.melipayamak.com/" target="_blank">
                <img src="/img/icons/melipayamak.png" class="img-fluid img-thumbnail" alt="سایت ملی پیامک">
              </a>
            </div>
          </div>
          <h4 class="text-primary-dark">
            <i class="fa fa-cogs me-2"></i>
            تنظیمات سامانه پیامک
          </h4>
          <div class="row">
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.username" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> نام کاربری</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.password" class="form-control" type="password" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> کلمه عبور</label>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.token" class="form-control" type="text" :disabled="loading">
                <label class="form-label"><span class="text-danger">(لازم)</span> توکن API</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>