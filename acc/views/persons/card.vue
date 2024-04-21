<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        کارت حساب اشخاص
      </h3>
      <div class="block-options">
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
          <div class="row">
            <div class="col-sm-12 col-md-6 mb-1">
              <div class="card push">
                <div class="card-header border-bottom-0 bg-primary-dark text-light">
                  <h3 class="block-title"> کارت حساب <small class="text-info-light">{{selectedPerson.nikename}}</small></h3>
                </div>
                <div class="card-body">
                  <small class="mb-2">شخص</small>
                  <v-select
                      dir="rtl"
                      :options="listPersons"
                      label="nikename"
                      v-model="selectedPerson"
                      @option:selected="updateRoute(selectedPerson.code)"
                  >
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                  <hr />
                  <div class="fw-bold mb-2">کد حسابداری: <small class="text-primary">{{selectedPerson.code}}</small></div>
                  <div class="fw-bold mb-2">نام مستعار: <small class="text-primary">{{selectedPerson.nikename}}</small></div>
                  <div class="fw-bold mb-2">نام و نام خانوادگی: <small class="text-primary">{{selectedPerson.name}}</small></div>
                  <div class="fw-bold mb-2">تلفن: <small class="text-primary">{{selectedPerson.tel}}</small></div>
                  <div class="fw-bold mb-2">موبایل: <small class="text-primary">{{selectedPerson.mobile}}</small></div>
                  <div class="fw-bold mb-2">آدرس: <small class="text-primary">{{selectedPerson.address}}</small></div>
                  <div class="fw-bold mb-2">توضیحات: <small class="text-primary">{{selectedPerson.des}}</small></div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-1">
              <div class="card push">
                <div class="card-header border-bottom-0 bg-primary-dark text-light">
                  <h3 class="block-title"> وضعیت حساب <small class="text-info-light">{{selectedPerson.nikename}}</small></h3>
                </div>
                <div class="card-body">
                  <div class="fw-bold mb-2">
                    وضعیت حسابداری:
                    <b v-if="selectedPerson.balance > 0" class="text-success">بستانکار</b>
                    <b v-if="selectedPerson.balance < 0" class="text-danger">بدهکار</b>
                    <b v-else class="text-dark">تسویه شده</b>

                  </div>
                  <div class="fw-bold mb-2">بستانکار: <small class="text-primary">{{this.$filters.formatNumber(selectedPerson.bs)}}</small></div>
                  <div class="fw-bold mb-2">بدهکار: <small class="text-primary">{{this.$filters.formatNumber(selectedPerson.bd)}}</small></div>
                  <div class="fw-bold mb-2">تراز حسابداری: <small class="text-primary">{{this.$filters.formatNumber(selectedPerson.balance)}}</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <h3>تراکنش ها:</h3>
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable
              show-index
              alternating
              v-model:items-selected="itemsSelected"
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
              <router-link class="text-success" :to="'/acc/accounting/view/' + code">
                <i class="fa fa-eye px-1"></i>
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
import {ref} from "vue";
import Swal from "sweetalert2";
export default {
  name: "card",
  data:()=>{return{
    searchValue: '',
    listPersons:[],
    itemsSelected:[],
    selectedPerson: [],
    items: [],
    loading: ref(true),
    headers: [
      { text: "تاریخ", value: "date" },
      { text: "شرح", value: "des"},
      { text: "تفضیل", value: "ref" },
      { text: "بدهکار", value: "bd"},
      { text: "بستانکار", value: "bs"},
      { text: "عملیات", value: "operation"},

    ]
  }},
  mounted() {
    this.loadData();
  },
  methods:{
    updateRoute(id){
      this.$router.push(id);
      this.loadData();
    },
    loadData(){
      axios.post('/api/person/list/limit').then((response)=>{
        this.listPersons = response.data;
        if(this.$route.params.id != ''){
          this.loadPerson(this.$route.params.id);
          this.listPersons.forEach((item)=>{
            if(item.code == this.$route.params.id){
              this.selectedPerson = item;
            }
          });
        }else{
          this.selectedPerson = response.data[0];
          this.loadPerson(this.selectedPerson.code);
        }
      });
    },
    excellOutput(AllItems = true){
      if(AllItems){
        axios({
          method: 'post',
          url:'/api/person/card/list/excel',
          data:{'code':this.selectedPerson.code},
          responseType: 'arraybuffer',
        }).then((response)=>{
          var FILE = window.URL.createObjectURL(new Blob([response.data]));
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'hesabix-person-card-view.xlsx');
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
            url:'/api/person/card/list/excel',
            responseType: 'arraybuffer',
            data:{
              'code' : this.selectedPerson.code,
              'items': this.itemsSelected
            }
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
      if(this.selectedPerson == null){
          Swal.fire({
            text: 'هیچ آیتمی انتخاب نشده است.',
            icon: 'info',
            confirmButtonText: 'قبول'
          });
      }
      else{
        if(AllItems){
          axios.post('/api/person/card/list/print',{'code':this.selectedPerson.code}).then((response)=>{
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
            axios.post('/api/person/card/list/print',{
                'code' : this.selectedPerson.code,
                'items': this.itemsSelected
              }).then((response)=>{
              this.printID = response.data.id;
              window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
            })
          }
        }
      }
      
    },
    loadPerson(id){
      this.loading = true;
      axios.post('/api/accounting/rows/search',
          {
            type:'person',
            id: id
          }
      ).then((response)=>{
        this.items = response.data;
        this.items.forEach((item)=>{
          item.bs = this.$filters.formatNumber(item.bs)
          item.bd = this.$filters.formatNumber(item.bd)
        })
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>