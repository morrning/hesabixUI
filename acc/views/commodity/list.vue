<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="mx-2 fa fa-list"></i>
        کالا و خدمات </h3>
      <div class="block-options">
        <router-link to="/acc/commodity/mod/" class="btn btn-sm btn-primary ms-1">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
        <importExcel :windowsState="this.importWindowsState"></importExcel>
        <a href="#" class="btn btn-sm btn-danger ms-2" @click.prevent="print()">
          <i class="fa fa-print"></i>
        </a>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable
              multi-sort
              show-index
              alternating
              :search-value="searchValue"
              :headers="headers"
              :items="items"
              theme-color="#1d90ff"
              header-text-direction="center"
              body-text-direction="center"
              rowsPerPageMessage="تعداد سطر"
              emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از"
              :loading="loading"
          >
            <template #item-operation="{ code }">
              <router-link class="btn btn-sm btn-link" :to="'/acc/commodity/mod/' + code">
                <i class="fa fa-edit px-2"></i>
              </router-link>
              <span class="text-danger d-none" @click="deleteItem(code)">
                <i class="fa fa-trash"></i>
              </span>
            </template>
            <template #item-speedAccess="{ speedAccess }">
              <i v-if="speedAccess" class="fa fa-check text-success"></i>
            </template>
            <template #item-priceBuy="{ priceBuy }">
              {{this.$filters.formatNumber(priceBuy)}}
            </template>
            <template #item-priceSell="{ priceSell }">
              {{this.$filters.formatNumber(priceSell)}}
            </template>
            <template #item-khadamat="{ khadamat }">
              <label v-if="khadamat == false">کالا و اقلام فیزیکی</label>
              <label v-else>خدمات</label>
            </template>
            <template #item-commodityCountCheck="{ commodityCountCheck }">
              <i v-if="commodityCountCheck == true" class="fa fa-check text-success"></i>
              <i v-else class="fa fa-close text-danger"></i>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";
import importExcel from "../component/importModal/commodity-import-excel.vue";

export default {
  name: "list",
  components: {
    importExcel:importExcel
  },
  watch:{
    'importWindowsState.submited'(newValue,oldValue) {
      this.importWindowsState.submited = false;
      if(newValue){
        this.loadData();
      }
    }
  },
  data: ()=>{return {
    importWindowsState:{
      submited:false
    },
    printID:'',
    searchValue: '',
    loading : ref(true),
    items:[],
    headers: [
      { text: "عملیات", value: "operation"},
      { text: "کد", value: "code" },
      { text: "کالا / خدمات", value: "khadamat", sortable: true, width: 150},
      { text: "نام کالا و خدمات", value: "name", sortable: true, width: 150},
      { text: "واحد شمارش", value: "unit", sortable: true, width: 100},
      { text: "دسترسی سریع", value: "speedAccess", width: 100},
      { text: "دسته‌بندی", value: "cat", sortable: true, width: 100},
      { text: "قیمت خرید", value: "priceBuy",sortable: true, width: 100},
      { text: "قیمت فروش", value: "priceSell",sortable: true, width: 100},
      { text: "نقطه سفارش", value: "orderPoint", width: 100},
      { text: "حداقل سفارش", value: "minOrderCount", width: 100},
      { text: "زمان انتظار", value: "dayLoading", width: 100},
      { text: "کنترل موجودی", value: "commodityCountCheck", width: 100},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/commodity/list')
          .then((response)=>{
            this.items = response.data;
            this.loading = false;
          })
    },
    print(){
      axios.post('/api/commodity/list/print').then((response)=>{
        this.printID = response.data.id;
        window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
      })
    },
    deleteItem(code){
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/business/delete/user',{
            'code': code}
          ).then((response)=>{
            if(response.data.result == 1){
              let index = 0;
              for(let z=0; z<this.items.length; z++){
                index ++;
                if(this.items[z]['code'] == code){
                  this.items.splice(index -1 ,1);
                }
              }
              Swal.fire({
                text: 'شخص با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
      })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>