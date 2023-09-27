<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="mx-2 fa fa-list"></i>
        اشخاص </h3>
      <div class="block-options">
        <router-link to="/acc/persons/mod/" class="btn btn-primary ms-2">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
        <div class="dropdown">
          <a class="btn btn-danger ms-2 dropdown-toggle text-end" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-pdf"></i>
            PDF
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="print(false)" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="print(true)" class="dropdown-item" href="#">همه موارد</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <a class="btn btn-success ms-2 dropdown-toggle text-end" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-excel"></i>
            اکسل
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="print()" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="print()" class="dropdown-item" href="#">همه موارد</a></li>
          </ul>
        </div>
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
              v-model:items-selected="itemsSelected"
              @click-row="showRow"
              border-cell
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
              <router-link :to="'/acc/persons/mod/' + code">
                <i class="fa fa-edit px-2"></i>
              </router-link>
              <span class="text-danger d-none" @click="deleteItem(code)">
                <i class="fa fa-trash"></i>
              </span>
            </template>
            <template #item-nikename="{ nikename,code }">
              <router-link :to="'/acc/persons/card/view/' + code">
                {{ nikename }}
              </router-link>
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
    loading : ref(true),
    items:[],
    itemsSelected: [],
    headers: [
      { text: "کد", value: "code",fixed: true,width:50 },
      { text: "نام مستعار", value: "nikename", sortable: true},
      { text: "نام و نام خانوادگی", value: "name", sortable: true},
      { text: "شرکت", value: "company", sortable: true},
      { text: "شناسه ملی", value: "shenasemeli", sortable: true},
      { text: "کد اقتصادی", value: "codeeghtesadi", sortable: true},
      { text: "شماره ثبت", value: "sabt", sortable: true},
      { text: "کشور", value: "keshvar", sortable: true},
      { text: "استان", value: "ostan", sortable: true},
      { text: "شهر", value: "shahr", sortable: true},
      { text: "کد پستی", value: "postalcode", sortable: true},
      { text: "تلفن", value: "tel"},
      { text: "تلفن همراه", value: "mobile"},
      { text: "ایمیل", value: "email", sortable: true},
      { text: "وب سایت", value: "website", sortable: true},
      { text: "فکس", value: "fax", sortable: true},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/person/list')
          .then((response)=>{
            this.items = response.data;
            this.loading = false;
          })
    },
    deleteItem(code){
      Swal.fire({
        text: 'آیا برای حذف شخص مطمئن هستید؟',
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
    },
    print(AllItems = true){
      if(AllItems){
        axios.post('/api/person/list/print').then((response)=>{
          this.printID = response.data.id;
          window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
        })
      }
      else{
        if(this.itemsSelected.length === 0){
          Swal.fire({
            text: 'هیچ آیتمی انتخاب نشده است.',
            icon: 'info',
            confirmButtonText: 'قبول'
          });
        }
        else{
          axios.post('/api/person/list/print',{items:this.itemsSelected}).then((response)=>{
            this.printID = response.data.id;
            window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
          })
        }

      }
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>