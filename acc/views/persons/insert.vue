<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <router-link class="text-warning mx-2 px-2" to="/acc/persons/list">
          <i class="fa fw-bold fa-arrow-right"></i>
        </router-link>
        مشخصات شخص </h3>
    </div>
    <div class="block-content py-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.nikename" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نام مستعار</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="person.name" class="form-control" type="text">
              <label class="form-label">نام / نام خانوادگی</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="person.tel" class="form-control" type="text">
              <label class="form-label">تلفن</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="person.mobile" class="form-control" type="text">
              <label class="form-label">تلفن همراه</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.address" class="form-control" type="text">
              <label class="form-label">آدرس</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="person.des" class="form-control" type="text">
              <label class="form-label">توضیحات</label>
            </div>
          </div>
        </div>
        <button @click="save()" type="button" class="btn btn-alt-primary">ثبت</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
  name: "insert",
  components:{
    Loading
  },
  data: ()=>{return{
    isLoading: false,
    person: {
      nikename: '',
      name: '',
      des: '',
      tel: '',
      mobile: '',
      address: '',
      code: 0,
    }
  }},
  mounted() {
    this.loadData(this.$route.params.id);
  },
  beforeRouteUpdate(to,from){
    this.loadData(to.params.id);
  },
  methods:{
    loadData(id = ''){
      if(id != ''){
        //load user info
        this.isLoading = true;
        axios.post('/api/person/info/' + id).then((response)=>{
          this.person.nikename = response.data.nikename;
          this.person.name = response.data.name;
          this.person.tel = response.data.tel;
          this.person.mobile = response.data.mobile;
          this.person.address = response.data.address;
          this.person.des  = response.data.des;
          this.person.code = response.data.code;
          this.isLoading = false;
        });
      }
      else{
        //user is new
        this.person.nikename = '';
        this.person.name = '';
        this.person.tel = '';
        this.person.mobile = '';
        this.person.address = '';
        this.person.des  = '';
        this.person.code = '';
        this.person.code = 0;
      }
    },
    save(){
      if(this.person.nikename.length === 0)
        Swal.fire({
          text: 'نام مستعار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      else{
        this.isLoading = true;
        axios.post('/api/person/mod/' + this.person.code,{
          'nikename':this.person.nikename,
          'name': this.person.name,
          'tel': this.person.tel,
          'mobile': this.person.mobile,
          'address': this.person.address,
          'des': this.person.des,
          'code': this.person.code,
        }).then((response)=>{
          this.isLoading = false;
          if(response.data.result == 2){
            Swal.fire({
              text: 'قبلا ثبت شده است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          }
          else {
            Swal.fire({
              text: 'مشخصات شخص ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(()=>{
              this.$router.push('/acc/persons/list')
            } );
          }
        })
      }

    }
  }
}
</script>

<style scoped>

</style>