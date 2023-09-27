<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="mx-2 fa fa-circle-down"></i>
        دریافت ها </h3>
      <div class="block-options">
        <router-link to="/acc/persons/receive/mod/" class="block-options-item">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
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
              :loading = "loading"
          >
            <template #item-operation="{ code }">
              <router-link class="text-success" :to="'/acc/accounting/view/' + code">
                <i class="fa fa-eye px-1"></i>
              </router-link>
              <router-link :to="{name:'person_receive_mod',params:{id: code}}">
                <i class="fa fa-edit px-1"></i>
              </router-link>
              <span class="text-danger px-1" @click="deleteItem(code)">
                <i class="fa fa-trash"></i>
              </span>
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
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "کد", value: "code" },
      { text: "تاریخ", value: "date"},
      { text: "شرح", value: "des"},
      { text: "مبلغ", value: "amount"},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods: {
    loadData(){
      axios.post('/api/accounting/search',{
        type: 'person_receive'
      })
          .then((response)=>{
            this.items = response.data;
            this.items.forEach((item)=>{
              item.amount = this.$filters.formatNumber(item.amount)
            })
            this.loading = false;
          })
    },
    deleteItem(code){
      Swal.fire({
        text: 'آیا برای این سند مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.post('/api/accounting/remove',{
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
                text: 'سند با موفقیت حذف شد.',
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