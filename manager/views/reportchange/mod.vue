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
    isLoading:false,
    id:'',
    version:'',
    body:'',
    editor: ClassicEditor,
    editorConfig: {
      language: 'fa'
    }
  }},
  methods:{
    save(){
      alert();
    }
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
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="version" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نام</label>
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