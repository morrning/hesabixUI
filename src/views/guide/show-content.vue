<template>
  <div>
    <h4>{{this.title}}</h4>
    <p v-html="this.body"></p>
    <br>
    <button v-if="isLogedIn" class="btn btn-sm btn-alt-danger" @click="remove()">
      <i class="fa fa-trash"></i>
      حذف محتوا
    </button>
    <router-link v-if="isLogedIn" class="btn btn-sm btn-alt-info ms-2" :to="'/guide/edit/' + this.url">
      <i class="fa fa-edit"></i>
      ویرایش محتوا
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "show-content",
  data: ()=>{return{
    title: '',
    body: '',
    isLogedIn: false,
    url: ''
  }},
  beforeMount() {
    let data = axios.get('/api/user/is_superadmin').then((response)=>{
      if(response.data.result === 1){
        this.isLogedIn = true;
      }
    }).catch(()=>{
      this.isLogedIn = false;
    })
  },
  methods:{
    async getData(url){
      let data = await axios.get('/api/guide/get/content/' + url)
      this.title = data.data.title;
      this.body =  data.data.body;
      this.url = data.data.url;
    },
    remove(url){
      Swal.fire({
        title: 'پیام',
        text: 'آیا برای حذف این محتوا مطمئن هستید.',
        icon: 'info',
        confirmButtonText: 'حذف شود',
        cancelButtonText: 'بازگشت',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'gray',

      }).then((result) => {
        if (result.isConfirmed) {
          let data = axios.delete('/api/guide/delete/' + this.url)
              .then((result)=>{
                Swal.fire({
                  title: 'پیام',
                  text: 'با موفقیت حذف شد.',
                  icon: 'success',
                  confirmButtonText: 'قبول',

                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push({name: 'guide_show_cat',params :{id:'general'}});
                  }
                });
              })
        }
      });
    }
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.getData(to.params.id);
    })
  },
}
</script>

<style scoped>

</style>