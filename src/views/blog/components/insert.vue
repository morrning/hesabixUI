<template>
  <button class="btn btn-primary mb-3 d-flex text-center justify-content-center" data-bs-target="#modal-block-extra-large" data-bs-toggle="modal" type="button">افزودن محتوا</button>
  <div aria-labelledby="modal-block-extra-large" class="modal" id="modal-block-extra-large" tabindex="-1" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="block block-rounded block-themed block-transparent mb-0">
          <div class="block-header bg-primary-dark">
            <h3 class="block-title">افزودن محتوا وبلاگ</h3>
            <div class="block-options">
              <button aria-label="Close" class="btn-block-option" data-bs-dismiss="modal" type="button">
                <i class="fa fa-fw fa-times"></i>
              </button>
            </div>
          </div>
          <div class="block-content">
            <p>
              <div class="form-floating mb-4">
                <input class="form-control" v-model="title" type="text">
                <label class="form-label" for="example-text-input-floating">عنوان محتوا</label>
              </div>
              <div class="form-floating mb-4">
                <select v-model="cat" class="form-select" >
                  <option v-for="item in cats" :value="item.id">{{ item.name }}</option>
                </select>
                <label class="form-label">دسته بندی</label>
              </div>
            <div class="form-floating mb-4">
              <textarea class="form-control" v-model="intro"></textarea>
              <label class="form-label" for="example-text-input-floating">خلاصه محتوا</label>
            </div>
            <div class="form-floating mb-4">
              <input class="form-control" v-model="img" type="text">
              <label class="form-label">تصویر شاخص</label>
            </div>
              <label class="form-label">متن</label>
              <div class="form-floating mb-4">
                <ckeditor v-model="body" :editor="editor" :config="editorConfig"></ckeditor>
              </div>
            </p>
          </div>
          <div class="block-content block-content-full text-end bg-body">
            <button class="btn btn-sm btn-primary me-1" @click="submit" type="button">
              <i class="fa fa-save"></i>
              ذخیره محتوا
            </button>
            <button class="btn btn-sm btn-alt-secondary" data-bs-dismiss="modal" type="button">
              <i class="fa fa-undo"></i>
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import Swal from "sweetalert2";

export default {
  name: "insert",
  data: ()=>{ return {
    cats: [],
    title: '',
    intro: '',
    body: '',
    cat: '',
    img: '',
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
      language: 'fa'
    }
  }},
  async beforeMount() {
    let data = await axios.get('/api/blog/cats/get');
    this.cats = data.data;
    this.cat = this.cats[0].id;
  },
  methods:{
    submit(){
      if(this.title === '' || this.body === '' || this.intro === ''){
        Swal.fire({
          text: 'تکمیل تمام موارد الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        //submit data
        let data = axios.post('/api/blog/insert',{'title':this.title,'cat':this.cat,'body':this.body,'intro':this.intro,'img':this.img})
            .then((response)=>{
              if(response.data.error === 1){
                Swal.fire({
                  title: 'خطا',
                  text: 'این پیوند قبلا ثبت شده است.',
                  icon: 'error',
                  confirmButtonText: 'قبول'
                });
              }
              else if(response.data.error === 999){
                Swal.fire({
                  title: 'خطا',
                  text: 'تکمیل تمام موارد الزامی است.',
                  icon: 'error',
                  confirmButtonText: 'قبول'
                });
              }
              else if(response.data.error === 0){
                Swal.fire({
                  title: 'پیام',
                  text: 'با موفقیت ثبت شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push({path: '/stack/content/' + response.data.url});
                  }
                });
              }
            })
      }
    }
  }
}
</script>

<style scoped>

</style>