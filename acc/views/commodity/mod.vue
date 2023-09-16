<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button type="button" @click="this.$router.back()" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        مشخصات کالا و خدمات </h3>
    </div>
    <div class="block-content py-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="data.name" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نام کالا/خدمات</label>
            </div>
            <div class="form-floating mb-4">
              <select v-model="data.unit" class="form-select">
                <option v-for="option in units" :key="option.name" :value="option.name">
                  {{ option.name }}
                </option>
              </select>
              <label class="form-label">واحد شمارش</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
            <input v-model="data.priceBuy" class="form-control" type="number">
            <label class="form-label">قیمت خرید</label>
          </div>
            <div class="form-floating mb-4">
              <input v-model="data.priceSell" class="form-control" type="number">
              <label class="form-label">قیمت فروش</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
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
    units:'',
    data: {
      name: '',
      priceSell: 0,
      priceBuy: 0,
      des: '',
      unit: 'عدد',
      code: 0,
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
      this.isLoading = true;
      axios.post('/api/commodity/units').then((response) => {
        this.units = response.data;
      });
      if (id != '') {
        //load user info
        this.isLoading = true;
        axios.post('/api/commodity/info/' + id).then((response) => {
          this.data = response.data;
        });
      }
      this.isLoading = false;
    },
    save() {
      if (this.data.name.length === 0)
        Swal.fire({
          text: 'نام کالا یا خدمات الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      else {
        this.isLoading = true;
        axios.post('/api/commodity/mod/' + this.data.code, this.data).then((response) => {
          this.isLoading = false;
          if (response.data.result == 2) {
            Swal.fire({
              text: 'قبلا ثبت شده است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          } else {
            Swal.fire({
              text: 'مشخصات کالا و خدمات ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/commodity/list')
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