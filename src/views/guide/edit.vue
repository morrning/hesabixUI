<template>
  <h1 class="">ویرایش محتوا</h1>
  <div class="form-group mb-2">
    <label for="title">عنوان:</label>
    <input type="text" class="form-control" v-model="title">
  </div>
  <div class="form-group mb-2">
    <label>بخش اصلی</label>
    <select class="form-control" v-model="cat">
      <option value="general">عمومی</option>
      <option value="person">اشخاص و طرف‌های حساب</option>
      <option value="buy">خرید و هزینه</option>
      <option value="sell">فروش و درآمد</option>
      <option value="report">گزارشات</option>
      <option value="settings">تنظیمات</option>
      <option value="commodity">کالا و خدمات</option>
      <option value="bank">بانک‌ها و صندوق‌ها</option>
    </select>  </div>
  <div class="form-group mb-2">
    <label>متن</label>
    <ckeditor v-model="body" :editor="editor" :config="editorConfig"></ckeditor>
  </div>
  <div class="form-group mb-2">
    <label>آدرس پیوند</label>
    <input type="text" class="form-control" v-model="url">
  </div>
  <div class="form-group mb-2">
    <button @click="submit" class="btn btn-alt-primary">ذخیره تغییرات</button>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "edit",
  data() {
    return {
      title: '',
      body: '',
      cat: 'person',
      url:'',
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        language: 'fa'
      }
    };
  },
  async beforeMount() {
    let data = await axios.get('/api/guide/get/content/' + this.$route.params.id)
    this.title = data.data.title;
    this.body = data.data.body;
    this.cat = data.data.cat;
    this.url = data.data.url;
  },
  methods: {
    submit(){
      if(this.title === '' || this.body === '' || this.url === ''){
        Swal.fire({
          title: 'خطا',
          text: 'تکمیل تمام موارد الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        //submit data
        let data = axios.post('/api/guide/update/content/' + this.$route.params.id ,{'title':this.title,'cat':this.cat,'body':this.body,'url':this.url})
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
                  text: 'تغییرات با موفقیت ذخیره شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push({path: '/guide/content/' + response.data.url});
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