<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "system",
  data: ()=>{return {
  
    loading: ref(true),
  }},
  methods:{
    loadData(){
     this.loading = false;
    },
    createDatabaseFile(){
      this.loading = true;
      axios.post('/api/admin/database/backup/create').then((resp)=>{
        this.loading = false;
        if(resp.data.result == 0){
          Swal.fire({
            text: 'فایل پشتیبان از بانک اطلاعاتی با نام ' + resp.data.filename + 'در پوشه hesabixBackup با موفقیت ایجاد شد.',
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
        <i class="fa fa-database px-2"></i>
       بانک اطلاعاتی</h3>
      <div class="block-options">
        
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="row my-2 mx-1">
            <div class="col-sm-12 col-md-12">
              <h2>دریافت پشتیبان از بانک اطلاعاتی</h2>
              <div class="alert alert-info">
                با توجه به خروجی sql از بانک اطلاعاتی حتما نسبت به صحت کارکرد فایل تولیدی اطمینان حاصل فرمایید.
              فایلهای تولیدی در پوشه hesabixBackup در پوشه اجرایی نرم‌افزار ذخیره می‌شوند.
              </div>
              <button :disabled="this.loading" class="btn btn-sm btn-primary" @click="createDatabaseFile()">
                <div v-show="this.loading" class="spinner-grow spinner-grow-sm me-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                ایجاد پشتیبان از پایگاه داده
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>