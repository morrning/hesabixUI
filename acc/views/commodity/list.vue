<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <i class="mx-2 fa fa-list"></i>
        کالا و خدمات </h3>
      <div class="block-options">
        <router-link to="/acc/commodity/mod/" class="block-options-item">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
        <a href="#" class="block-options-item" @click.prevent="print()">
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
              <router-link :to="'/acc/commodity/mod/' + code">
                <i class="fa fa-edit px-2"></i>
              </router-link>
              <span class="text-danger d-none" @click="deleteItem(code)">
                <i class="fa fa-trash"></i>
              </span>
            </template>
            <template #item-priceBuy="{ priceBuy }">
              {{this.$filters.formatNumber(priceBuy)}}
            </template>
            <template #item-priceSell="{ priceSell }">
              {{this.$filters.formatNumber(priceSell)}}
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

export default {
  name: "list",
  data: ()=>{return {
    printID:'',
    searchValue: '',
    loading : ref(true),
    items:[],
    headers: [
      { text: "کد", value: "code" },
      { text: "نام کالا و خدمات", value: "name", sortable: true},
      { text: "واحد شمارش", value: "unit", sortable: true},
      { text: "قیمت خرید", value: "priceBuy"},
      { text: "قیمت فروش", value: "priceSell"},
      { text: "عملیات", value: "operation"},
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