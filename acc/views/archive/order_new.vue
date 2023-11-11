<template>
    <div class="block block-content-full ">
      <div class="block-header block-header-default bg-gray-light">
        <h3 class="block-title text-primary-dark">
          <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
            <i class="fa fw-bold fa-arrow-right"></i>
          </button>
          <i class="fa fa-shopping-bag px-2"></i>
          سفارش فضای ذخیره سازی
        </h3>
        <div class="block-options">
            <button type="button" class="btn btn-sm btn-primary">
                <i class="fa fa-bank"></i>
                پرداخت آنلاین
            </button>
        </div>
      </div>
      <div class="block-content pt-1 pb-3">
        <div class="row">
          <div class="col-sm-12 col-md-12 p-1">
            <div class="alert">
                برای سفارش فضای ذخیره سازی ابتدا حجم مورد نظر را انتخاب و روی دکمه پرداخت کلیک کنید.
            </div>
          </div>
          <div class="row">
            <div class="col-12">
                <label for="customRange3" class="form-label">فضای مورد نیاز بر حسب گیگابایت:</label>
            <input v-model="this.space" type="range" class="form-range" min="1" max="5" step="0.5" id="customRange3">
            </div>
            <div class="col">
                <label>فضای انتخاب شده(گیگابایت)</label>
                <input type="text" class="form-control" v-model="this.space" readonly="readonly" />
            </div>
            <div class="col">
                <label>زمان</label>
                <select class="form-select" aria-label="Default select example">
                    <option value="1" selected>یک ماه</option>
                    <option value="3">سه ماه</option>
                    <option value="6">شش ماه</option>
                    <option value="12">یک سال</option>
                </select>
            </div>
            <div class="col">
                <label>مبلغ نهایی (ریال)</label>
                <input type="text" class="form-control" v-model="this.space" readonly="readonly" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  import {ref} from "vue";
  
  export default {
    name: "order_new",
    data: ()=>{return {
      searchValue: '',
      loading: ref(true),
      space:1
    }},
    methods: {
      loadData(cat){
        axios.get('/api/archive/list/' + cat)
            .then((response)=>{
             
              this.loading = false;
            })
      },
    },
    beforeMount() {
     
    }
  }
  </script>
  
  <style scoped>
  
  </style>