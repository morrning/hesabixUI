<template>
<div class="container-fluid">
  <div class="row">
    <div class="col">
      <div class="block block-rounded">
        <div class="block-header block-header-default">
          <h3 class="block-title">موضوع جدید</h3>
        </div>
        <div class="block-content p-0">
            <div class="row justify-content-center">
              <div class="col mx-sm-1 mx-md-6 my-sm-2 my-md-3">
                <div class="form-floating mb-4">
                  <input class="form-control" v-model="title" type="text">
                  <label class="form-label">عنوان پرسش</label>
                </div>
                <div class="form-floating mb-4">
                  <select v-model="cat" class="form-select" >
                    <option v-for="item in cats" :value="item.id">{{ item.name }}</option>
                  </select>
                  <label class="form-label">دسته بندی</label>
                </div>
                <label class="form-label">متن پرسش</label>
                <div class="form-floating mb-4">
                  <ckeditor v-model="body" :editor="editor" :config="editorConfig"></ckeditor>
                </div>
                <div class="form-floating mb-4">
                  <button type="button" @click="submit" class="btn btn-sm btn-alt-primary">ثبت</button>
                  <router-link to="/stack/home/1" class="btn btn-sm btn-alt-secondary ms-2">انصراف</router-link>
                </div>
              </div>
            </div>
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
    body: '',
    cat: '',
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
      language: 'fa'
    }
  }},
  async beforeMount() {
    let data = await axios.get('/api/stack/cats/get');
    this.cats = data.data;
    this.cat = this.cats[0].id;
  },
  methods:{
    submit(){
      if(this.title === '' || this.body === ''){
        Swal.fire({
          text: 'تکمیل تمام موارد الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        //submit data
        let data = axios.post('/api/stack/insert',{'title':this.title,'cat':this.cat,'body':this.body})
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