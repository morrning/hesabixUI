<template>
  <div class="block block-rounded">
    <div class="block-header block-header-default">
      <h3 class="block-title">
        درخواست جدید
      </h3>
      <div class="block-options">
        <router-link to="/profile/support-list" class="btn btn-info">
          <i class="fa fa-undo-alt"></i>
          بازگشت
        </router-link>
      </div>
    </div>
    <div class="block-content mt-0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>

            <div class="form-floating mb-4">
              <input v-model="this.item.title" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">  *  </span> عنوان درخواست </label>
            </div>
            <div class="form-floating mb-4">
              <select v-model="this.item.bid" class="form-select" >
                <option v-for="item in this.bidItems" :value="item">{{ item.name }}</option>
              </select>
              <label class="form-label required">کسب و کار</label>

            </div>
            <div class="form-floating mb-4">
              <textarea v-model="this.item.body" class="form-control" type="text" />
              <label class="form-label"><span class="text-danger">  *  </span>متن درخواست</label>
            </div>
            <button @click="save()" :disabled="isLoading" type="button" class="btn btn-alt-primary mb-4">ثبت درخواست</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: "new",
  components:{
    Loading
  },
  data(){return{
    item:{
      title:'',
      body:'',
      bid:'',
    },
    bidItems:{},
    isLoading: false,
  }},
  beforeMount() {
    this.loadData();
  },
  methods:{
    loadData(){
      axios.post('/api/business/list').then((response)=>{
        this.bidItems = response.data;
        if(response.data.length == 0){
          Swal.fire({
            text: 'برای درخواست پشتیبانی می بایست حداقل یک کسب و کار داشته باشید.',
            showCancelButton: true,
            confirmButtonText: 'ایجاد کسب و کار جدید',
            cancelButtonText: `بازگشت`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$router.push('/profile/new-business');
            }
            else{
              this.$router.push('/profile/dashboard');
            }
          })
        }
        else{
          this.item.bid = response.data[0];
        }
      })
    },
    save(){
      if(this.item.title.trim() == '' || this.item.body.trim() == ''){
        Swal.fire({
          text: 'تکمیل موارد ستاره دار الزامی است.',
          confirmButtonText: 'قبول',
        })
      }
      else{
        this.isLoading = true;
        axios.post('/api/support/mod',this.item).then((response)=>{
          this.isLoading = false;
          Swal.fire({
            text: 'درخواست با موفقیت ثبت شد.',
            confirmButtonText: 'قبول',
          }).then((result)=>{
           this.$router.push('/profile/support-list')
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>