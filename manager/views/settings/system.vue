<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "system",
  data: ()=>{return {
    systemInfo: {
      keywords:'',
      description:'',
      scripts:'',
      zarinpal:'',
      appSite: '',
      footer:''
    },
    loading: ref(true),
  }},
  methods:{
    loadData(){
      axios.get('/api/admin/settings/system/info')
          .then((response)=>{
            this.systemInfo = response.data;
            this.loading = false;
          })
    },
    submit(){
      this.loading = true;
      axios.post('/api/admin/settings/system/info/save',this.systemInfo).then((resp)=>{
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
  },
  beforeMount() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-cogs px-2"></i>
        تنظیمات سیستم </h3>
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
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.appSite" class="form-control" type="url" placeholder="https://example.com"  :disabled="loading">
                <label class="form-label">آدرس  interface</label>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.keywords" class="form-control" type="text" :disabled="loading">
                <label class="form-label"> کلمات کلیدی <span class="text-danger">با کاما (,) کلمات را جدا کنید</span>  </label>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="form-floating mb-4">
                <input v-model="systemInfo.description" class="form-control" type="text" :disabled="loading">
                <label class="form-label">شرح سایت</label>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="form-floating mb-4">
                <input style="direction:ltr" v-model="systemInfo.zarinpal" class="form-control" type="text" :disabled="loading">
                <label class="form-label">کد API زرین‌پال</label>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="mb-4">
                <label class="form-label">اسکریپت‌ها</label>
                <textarea style="direction:ltr" rows="12" v-model="systemInfo.scripts" class="form-control" type="text" :disabled="loading"></textarea>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="mb-4">
                <label class="form-label">اسکریپت‌های فوتر (تاییدیه ها و کد های سفارشی)</label>
                <textarea style="direction:ltr" rows="12" v-model="systemInfo.footerScripts" class="form-control" type="text" :disabled="loading"></textarea>
              </div>
            </div>
          </div>
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <div class="mb-4">
                <label class="form-label">فوتر سایت (پشتیبانی از تگهای html)</label>
                <textarea style="direction:ltr" rows="12" v-model="systemInfo.footer" class="form-control" type="text" :disabled="loading"></textarea>
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