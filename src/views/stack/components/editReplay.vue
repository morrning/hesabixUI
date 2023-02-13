<template>
  <!-- Button trigger modal -->
  <button class="btn btn-sm btn-alt-primary me-1" :data-bs-target="'#modal-default-normal' + this.$props.id" data-bs-toggle="modal" type="button">
    <i class="fa fa-edit"></i>
    ویرایش
  </button>

  <!-- Modal -->
  <div style="direction: rtl;text-align: right" aria-hidden="true" aria-labelledby="modal-default-normal" class="modal" :id="'modal-default-normal' + this.$props.id" role="dialog" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
          <h5 class="modal-title">ویرایش پاسخ</h5>
        </div>
        <div class="modal-body pb-1">
          <div class="row justify-content-center">
            <div class="col mx-sm-1 mx-md-6 my-sm-2 my-md-3">
              <label class="form-label">متن پاسخ</label>
              <div class="form-floating mb-4">
                <ckeditor v-model="this.body" :editor="editor" :config="editorConfig"></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="submit(this.$props.id,this.body)" class="btn btn-sm btn-alt-primary">ثبت</button>
          <button class="btn btn-sm btn-alt-secondary" data-bs-dismiss="modal" type="button">انصراف</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END Normal Default Modal -->
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import Swal from "sweetalert2";
import axios from "axios";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: "editReplay",
  data:()=>{return{
    body: '',
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
      language: 'fa'
    }
  }},
  props:{
    id:'',
    body: ''
  },
  methods:{
    async submit(id,body){
        let data =await axios.post('/api/stack/replayedit/' + this.$props.id,{
          body: this.body
        }).then((response)=>{
          if (response.data.error === 999) {
            Swal.fire({
              text: 'تکمیل تمام موارد الزامی است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          } else if (response.data.error === 0) {
            Swal.fire({
              text: 'پاسخ شما با موفقیت ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول',

            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        })
    }
  },
  beforeMount() {
    this.body = this.$props.body;
  }
}
</script>

<style scoped>

</style>