<script lang="ts">
import {defineComponent} from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import Swal from "sweetalert2";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default defineComponent({
  name: "mod",
  components: {Loading},
  data: ()=>{return{
    isLoading:true,
    id:'',
    version:'',
    body:'',
    editor: ClassicEditor,
    editorConfig: {
      language: 'fa',
      fontFamily: {
            options: [
                'default',
                'vazir', 'sans-serif',
                'Ubuntu Mono, Courier New, Courier, monospace'
            ]
        },
    }
  }},
  mounted(){
      this.id = this.$route.params.id;
      if(this.id != 0){
        axios.post('/api/admin/reportchange/get/' + this.id).then((response)=>{
            this.version = response.data.version;
            this.body = response.data.body;
            this.isLoading = false;
        });
      }
      else{
        this.isLoading = false;
      }
  },
  methods:{
    save(){
      if(this.version.trim() === '' || this.body.trim() === ''){
        Swal.fire({
              text: 'تمام موارد به درستی تکمیل نشده است!',
              icon: 'error',
              confirmButtonText: 'قبول',
            });
      }
      else{
        this.isLoading = true;
        axios.post('/api/admin/reportchange/mod/' + this.id,{
          id:this.id,
          version:this.version,
          body:this.body
        }).then((response)=>{
          if(response.data.result == 1){
            this.isLoading = false;
            Swal.fire({
              text: 'گزارش ثبت شد',
              icon: 'success',
              confirmButtonText: 'قبول',
            }).then((res)=>{
              this.$router.push('/manager/reportchange/list');
            })
          }
        })
      }
    }
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
        <i class="fa fa-history"></i>
        تغییر نسخه</h3>
      <div class="block-options">
        <button type="button" class="btn btn-alt-primary" @click="save()">
          <i class="fa fa-save me-1"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container mt-3">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="version" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نسخه</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <label class="mb-2">متن گزارش</label>
            <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>