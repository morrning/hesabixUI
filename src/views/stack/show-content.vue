<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">{{ content.title }}</h3>
      <div class="block-options">
        <div class="block-options-item text-dark">
          <a href="be_pages_generic_profile.html">{{ content.submitter}}</a> حدود <span> {{ content.dateSubmit}}
          در بخش  {{ content.cat}}</span>
        </div>
      </div>
    </div>
    <div class="block-content">
      <table class="table table-borderless">
        <tbody>
        <tr class="block">
          <td class="d-none d-sm-table-cell text-center" style="width: 140px;">
            <p>
              <a href="#">
                <img :src="'http://www.gravatar.com/avatar/' + content.gravatar_hash" class="img-avatar" />
              </a>
            </p>
            <p class="fs-sm fw-medium">{{content.submitter}}</p>
          </td>
          <td>
            <p v-html="content.body"></p>
            <p class="text-end" v-if="currentUser.hash_email == content.gravatar_hash">
              <router-link :to="{name: 'stack_edit_content',param:{id:content.url}}" class="btn btn-sm btn-alt-primary me-1">
                <i class="fa fa-edit"></i>
                ویرایش
              </router-link>
              <button type="button" @click="deleteContent(content.url)" class="btn btn-sm btn-alt-danger">
                <i class="fa fa-trash"></i>
                حذف
              </button>
            </p>
          </td>
        </tr>
        <tr v-if="replays.length != 0">
          <td>
            <h4>پاسخ ها</h4>
          </td>
        </tr>
        <tr class="border-top my-0 py-0" v-for="replay in replays">
          <td class="d-none d-sm-table-cell text-center border-end" style="width: 140px;">
            <p>
              <a href="#">
                <img :src="'http://www.gravatar.com/avatar/' + replay.gravatar_hash" class="img-avatar" />
              </a>
            </p>
            <p class="fs-sm fw-medium">{{replay.submitter}}</p>
          </td>
          <td>
            <p v-html="replay.body"></p>
            <p class="text-muted">{{ replay.dateSubmit }}</p>
            <p class="text-end" v-if="currentUser.hash_email == replay.gravatar_hash">
              <edit-replay v-bind:id="replay.id" v-bind:body="replay.body"></edit-replay>
              <button type="button" @click="deleteReplay(replay.id)" class="btn btn-sm btn-alt-danger">
                <i class="fa fa-trash"></i>
                حذف
              </button>
            </p>
          </td>
        </tr>
        <tr v-if="isLogedIn" class="border-top">
          <td class="d-none d-sm-table-cell text-center">
            <p>
              <a href="#">
                <img :src="'http://www.gravatar.com/avatar/' + currentUser.hash_email" class="img-avatar" />
              </a>
            </p>
            <p class="fs-sm fw-medium">{{ currentUser.name }}</p>
          </td>
          <td>
            <h3>ارسال پاسخ</h3>
            <div class="mb-4">
              <ckeditor v-model="replayBody" :editor="editor" :config="editorConfig"></ckeditor>
            </div>
            <div class="mb-4">
              <button class="btn btn-alt-primary" type="button" @click="submitReplay">
                <i class="fa fa-reply opacity-50 me-1"></i> ارسال پاسخ </button>
            </div>
          </td>
        </tr>
        <tr v-else class="border-top">
          <td></td>
          <td>
            <div class="alert alert-info d-flex align-items-center" role="alert">
              <div class="flex-shrink-0">
                <i class="fa fa-fw fa-info-circle"></i>
              </div>
              <div class="flex-grow-1 ms-3">
                <p class="mb-0">برای ارسال پاسخ به حساب کاربری خود وارد شوید!
                 <span>
                   <router-link to="/login">ورود</router-link>
                   |
                  <router-link to="/register">عضویت</router-link>
                 </span>
                </p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/fa';
import Swal from "sweetalert2";
import axios from "axios";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import editReplay from "./components/editReplay.vue";
export default {
  name: "show-content",
  components:{
    editReplay: editReplay
  },
  methods:{
    async submitReplay(){
      if(this.replayBody === ''){
        Swal.fire({
          text: 'هیچ متنی وارد نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        //submit data
        let data = axios.post('/api/stack/replay/insert',{upper: this.content.url,body:this.replayBody})
            .then((response) => {
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
                    let temp = {};
                    temp.body = this.replayBody;
                    temp.submitter = this.currentUser.name;
                    temp.gravatar_hash = this.currentUser.hash_email;
                    temp.dateSubmit = 'هم اکنون';
                    temp.id = response.data.data.id;
                    this.replays.push(temp);
                    this.replayBody = '';
                  }
                });
              }
            })
      }
    },
    deleteContent(url){
      Swal.fire({
        title: 'پیام',
        text: 'آیا برای حذف این محتوا مطمئن هستید.بعد از حذف پاسخ های ارسال شده به این محتوا نیز حذف خواهد شد.',
        icon: 'info',
        confirmButtonText: 'حذف شود',
        cancelButtonText: 'بازگشت',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'gray',

      }).then((result) => {
        if (result.isConfirmed) {
          let data = axios.delete('/api/stack/content/delete/' + url)
              .then((result)=>{
                Swal.fire({
                  title: 'پیام',
                  text: 'با موفقیت حذف شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push({name: 'stack_home',params :{id:1}});
                  }
                });
              })
        }
      });
    },
    deleteReplay(id){
      Swal.fire({
        text: 'آیا برای حذف این محتوا مطمئن هستید.',
        icon: 'info',
        confirmButtonText: 'حذف شود',
        cancelButtonText: 'بازگشت',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'gray',

      }).then((result) => {
        if (result.isConfirmed) {
          let data = axios.delete('/api/stack/content/deletebyid/' + id)
              .then((result)=>{
                Swal.fire({
                  title: 'پیام',
                  text: 'با موفقیت حذف شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.replays = this.replays.filter(function(item) {
                      return item.id !== id
                    })
                  }
                });
              })
        }
      });
    }

  },
  data:()=>{ return {
    content:{
      title: '',
      body: '',
      submitter: '',
      dateSubmit: '',
      gravatar_hash: '',
      cat: '',
      url: ''
    },
    replays:[],
    replayBody: '',
    isLogedIn: false,
    currentUser:{
      name: '',
      hash_email: ''
    },
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
      language: 'fa'
    }
  }},
  async beforeMount(){
      let data = await axios.get('/api/stack/content/get/' + this.$route.params.id);
      this.content.title = data.data.title;
      this.content.body = data.data.body;
      this.content.submitter = data.data.submitter;
      this.content.dateSubmit = data.data.dateSubmit;
      this.content.url = data.data.url;
      this.content.gravatar_hash = data.data.submitter_gravatar_hash;
      this.content.cat = data.data.cat;
      let loginData = await axios.get('/api/user/check/login').then((response)=>{
        if(response.data.result === true){
          this.isLogedIn = true;
          axios.get('/api/user/current/info').then((response)=>{
              this.currentUser.name = response.data.fullname;
              this.currentUser.hash_email = response.data.hash_email;
          });
        }
      }).catch(()=>{
        this.isLogedIn = false;
      })

    //get replays
    let replays = await axios.get('/api/stack/replays/search/' + this.$route.params.id);
    replays.data.forEach((item)=>{
      let temp = {};
      temp.body = item.body;
      temp.submitter = item.submitter;
      temp.id = item.id;
      temp.title = item.title;
      temp.submitter = item.submitter;
      temp.dateSubmit = item.dateSubmit;
      temp.gravatar_hash = item.submitter_gravatar_hash;
      this.replays.push(temp);
    })


  },
  mounted() {
    //view increase
    axios.get('/api/stack/content/increase/view/' + this.$route.params.id);
  }
}
</script>

<style scoped>

</style>