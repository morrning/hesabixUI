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
        <router-link to="/acc/persons/mod/" class="btn btn-sm btn-primary ms-2">
          <span class="fa fa-plus fw-bolder"></span>
        </router-link>
        <div class="dropdown">
          <a class="btn btn-sm btn-danger ms-2 dropdown-toggle text-end" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-pdf"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="print(false)" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="print(true)" class="dropdown-item" href="#">همه موارد</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <a class="btn btn-sm btn-success ms-2 dropdown-toggle text-end" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-file-excel"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="excellOutput(false)" class="dropdown-item" href="#">انتخاب شده‌ها</a></li>
            <li><a @click.prevent="excellOutput(true)" class="dropdown-item" href="#">همه موارد</a></li>
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
              :table-class-name="tableClassName"
              v-model:items-selected="itemsSelected"

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
              <div class="d-flex">
                <router-link class="btn btn-link" :to="'/acc/persons/card/view/' + code">
                  <i class="fa fa-eye text-success"></i>
                </router-link>
                <router-link class="btn btn-link" :to="'/acc/persons/mod/' + code">
                  <i class="fa fa-edit px-2"></i>
                </router-link>
              </div>
            </template>
            <template #item-nikename="{ nikename,code }">
              <router-link :to="'/acc/persons/card/view/' + code">
                {{ nikename }}
              </router-link>
            </template>
            <template #item-status="{ balance }">
              <span v-if="balance<0" class="text-danger">بدهکار</span>
              <span v-if="balance>0" class="text-success">بستانکار</span>
            </template>
            <template #item-bs="{ bs }">
              <span>{{this.$filters.formatNumber(bs)}}</span>
            </template>
            <template #item-bd="{ bd }">
              <span>{{this.$filters.formatNumber(bd)}}</span>
            </template>
            <template #item-balance="{ balance }">
              <span>{{this.$filters.formatNumber(balance)}}</span>
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
import download from 'downloadjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

export default {
  name: "list",
  data: ()=>{return {
    tableClassName:'extable',
    searchValue: '',
    loading : ref(true),
    items:[],
    itemsSelected: [],
    headers: [
      { text: "عملیات", value: "operation"},
      { text: "کد", value: "code" },
      { text: "نام مستعار", value: "nikename", sortable: true, width: 150},
      { text: "تراز حساب", value: "balance", sortable: true, width: 100},
      { text: "وضعیت حساب", value: "status", sortable: true, width: 110},
      { text: "بستانکار", value: "bs", sortable: true, width: 100},
      { text: "بدهکار", value: "bd", sortable: true, width: 100},
      { text: "نام و نام خانوادگی", value: "name", sortable: true, width: 150},
      { text: "شرکت", value: "company", sortable: true, width: 100},
      { text: "شناسه ملی", value: "shenasemeli", sortable: true, width: 100},
      { text: "کد اقتصادی", value: "codeeghtesadi", sortable: true, width: 100},
      { text: "شماره ثبت", value: "sabt", sortable: true, width: 100},
      { text: "کشور", value: "keshvar", sortable: true, width: 100},
      { text: "استان", value: "ostan", sortable: true, width: 100},
      { text: "شهر", value: "shahr", sortable: true, width: 100},
      { text: "کد پستی", value: "postalcode", sortable: true, width: 100},
      { text: "تلفن", value: "tel", width: 100},
      { text: "تلفن همراه", value: "mobile", width: 100},
      { text: "ایمیل", value: "email", sortable: true, width: 100},
      { text: "وب سایت", value: "website", sortable: true, width: 100},
      { text: "فکس", value: "fax", sortable: true, width: 100},
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
    excellOutput(AllItems = true){
      if(AllItems){
        axios({
          method: 'get',
          url:'/api/person/list/excel',
          responseType: 'arraybuffer',
        }).then((response)=>{
          var FILE = window.URL.createObjectURL(new Blob([response.data]));
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'hesabix-persons-list.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
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
          axios({
            method: 'post',
            url:'/api/person/list/excel',
            responseType: 'arraybuffer',
            data:{items:this.itemsSelected}
          }).then((response)=>{
            var FILE = window.URL.createObjectURL(new Blob([response.data]));
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'hesabix-persons-list.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
        }
      }
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