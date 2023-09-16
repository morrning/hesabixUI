<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <router-link class="text-warning mx-2 px-2" to="/acc/banks/list">
          <i class="fa fw-bold fa-arrow-right"></i>
        </router-link>
        مشخصات حساب بانکی </h3>
    </div>
    <div class="block-content py-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="data.name" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نام بانک</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.cardNum" class="form-control" type="text">
              <label class="form-label">شماره کارت</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.shaba" class="form-control" type="text">
              <label class="form-label">شماره شبا</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.accountNum" class="form-control" type="text">
              <label class="form-label">شماره حساب</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.shobe" class="form-control" type="text">
              <label class="form-label">شعبه</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="data.owner" class="form-control" type="text">
              <label class="form-label">صاحب حساب</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.mobileInternetbank" class="form-control" type="text">
              <label class="form-label">شماره اینترنت بانک</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.posNum" class="form-control" type="text">
              <label class="form-label">شماره دستگاه POS</label>
            </div>
            <div class="form-floating mb-4">
              <input v-model="data.des" class="form-control" type="text">
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
import axios from "axios";
import Swal from "sweetalert2";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: "mod",
  components: {
    Loading
  },
  data: ()=>{return{
    isLoading: false,
    data: {
      name: '',
      cardNum: '',
      shaba: '',
      des: '',
      mobileInternetbank: '',
      shobe: '',
      accountNum: '',
      code: 0,
      posNum: '',
      owner: ''
    }
  }},
  mounted() {
    this.loadData(this.$route.params.id);
  },
  beforeRouteUpdate(to,from){
    this.loadData(to.params.id);
  },
  methods: {
    loadData(id = '') {
      if (id != '') {
        //load user info
        this.isLoading = true;
        axios.post('/api/bank/info/' + id).then((response) => {
          this.data.name = response.data.name;
          this.data.cardNum = response.data.cardNum;
          this.data.shaba = response.data.shaba;
          this.data.des = response.data.des;
          this.data.mobileInternetbank = response.data.mobileInternetBank;
          this.data.shobe = response.data.shobe;
          this.data.accountNum = response.data.accountNum;
          this.data.code = response.data.code;
          this.data.posNum = response.data.posNum;
          this.data.owner = response.data.owner;
          this.isLoading = false;
        });
      } else {
        //user is new
        this.data.name = '';
        this.data.cardNum = '';
        this.data.shaba = '';
        this.data.des = '';
        this.data.mobileInternetbank = '';
        this.data.shobe = '';
        this.data.accountNum = '';
        this.data.code = 0;
        this.data.posNum = '';
        this.data.owner = '';
      }
    },
    save() {
      if (this.data.name.length === 0)
        Swal.fire({
          text: 'نام بانک الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      else {
        this.isLoading = true;
        axios.post('/api/bank/mod/' + this.data.code, this.data).then((response) => {
          this.isLoading = false;
          if (response.data.result == 2) {
            Swal.fire({
              text: 'قبلا ثبت شده است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          } else {
            Swal.fire({
              text: 'مشخصات بانک ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/banks/list')
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