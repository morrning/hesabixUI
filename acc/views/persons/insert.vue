<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        مشخصات شخص </h3>
      <div class="block-options">
        <button @click="save()" type="button" class="btn btn-alt-primary">
          <i class="fa fa-floppy-disk"></i>
          ثبت</button>
      </div>
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
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.company" class="form-control" type="text">
              <label class="form-label"> شرکت </label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.name" class="form-control" type="text">
              <label class="form-label">نام / نام خانوادگی</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.birthday" class="form-control" type="text">
              <label class="form-label">تاریخ تولد / ثبت</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.des" class="form-control" type="text">
              <label class="form-label">توضیحات</label>
            </div>
          </div>
        </div>
        <h3>اطلاعات پایه</h3>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.shenasemeli" class="form-control" type="text">
              <label class="form-label">شناسه ملی</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.sabt" class="form-control" type="text">
              <label class="form-label">شماره ثبت</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.codeeghtesadi" class="form-control" type="text">
              <label class="form-label">کد اقتصادی</label>
            </div>
          </div>
        </div>
        <h3>اطلاعات تماس</h3>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.mobile" class="form-control" type="text">
              <label class="form-label">تلفن همراه</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.tel" class="form-control" type="text">
              <label class="form-label">تلفن</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.fax" class="form-control" type="text">
              <label class="form-label">فکس</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.email" class="form-control" type="text">
              <label class="form-label">پست الکترونیکی</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.website" class="form-control" type="text">
              <label class="form-label">وب سایت</label>
            </div>
          </div>
        </div>

        <h3>اطلاعات آدرس</h3>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.keshvar" class="form-control" type="text">
              <label class="form-label">کشور</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.ostan" class="form-control" type="text">
              <label class="form-label">استان</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.shahr" class="form-control" type="text">
              <label class="form-label">شهر</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="person.postalcode" class="form-control" type="text">
              <label class="form-label">کد پستی</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="form-floating mb-4">
              <input v-model="person.address" class="form-control" type="text">
              <label class="form-label">آدرس</label>
            </div>
          </div>
        </div>
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
      company: '',
      shenasemeli: '',
      codeeghtesadi:'',
      sabt:'',
      keshvar:'',
      ostan:'',
      shahr:'',
      postalcode:'',
      email:'',
      website:'',
      fax:'',
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
          this.person = response.data;
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
    save() {
      let canSubmit = true;
      if (this.person.mobile.length !== 0) {
        const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
        if (!regex.test(this.person.mobile)) {
          canSubmit = false;
          Swal.fire({
            text: 'شماره موبایل وارد شده نامعتبر است.',
            icon: 'error',
            confirmButtonText: 'قبول'
          });
        }
      }
      if (this.person.nikename.length === 0){
        canSubmit = false;
        Swal.fire({
          text: 'نام مستعار الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }

      if(canSubmit){
        this.isLoading = true;
        axios.post('/api/person/mod/' + this.person.code,this.person).then((response)=>{
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