<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-book"></i>
        فاکتورهای برگشت از خرید</h3>
      <div class="block-options">
        <router-link to="/acc/buy/rfb/mod/" class="block-options-item">
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
              v-model:items-selected="itemsSelected"
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
            <template #item-operation="{ code,type }">
              <router-link class="btn btn-sm btn-link text-success" :to="'/acc/accounting/view/' + code">
                <i class="fa fa-eye"></i>
              </router-link>
              <router-link class="btn btn-sm btn-link text-secondary" :to="'/acc/buy/view/' + code">
                <i class="fa fa-print"></i>
              </router-link>
              <span class="btn btn-sm btn-link text-info" @click="canEditItem(code)">
                <i class="fa fa-edit"></i>
              </span>
              <span class="btn btn-sm btn-link text-danger" @click="deleteItem(code)">
                <i class="fa fa-trash"></i>
              </span>
            </template>
            <template #item-des="{ des }">
              {{ des.replace("فاکتور خرید:","") }}
            </template>
            <template #item-status="{ status }">
              <span v-if="status == 'تسویه شده'" class="text-success"><i class="fa fa-check me-2"></i>تسویه شده</span>
              <span v-else class="text-danger"><i class="fa fa-info me-2"></i>تسویه نشده</span>
            </template>
          </EasyDataTable>
          <div class="container-fluid p-0 mx-0 my-3">
            <a class="block block-rounded block-link-shadow border-start border-success border-3" href="javascript:void(0)">
              <div class="block-content block-content-full block-content-sm bg-body-light">
                  <div class="row">
                    <div class="col-sm-6 com-md-6">
                      <span class="text-dark">
                        <i class="fa fa-list-dots"></i>
                      مبلغ کل:
                      </span>
                      <span class="text-primary">
                        {{ this.$filters.formatNumber(this.sumTotal) }}
                        ریال
                      </span>
                    </div>

                    <div class="col-sm-6 com-md-6">
                      <span class="text-dark">
                        <i class="fa fa-list-check"></i>
                      جمع مبلغ موارد انتخابی:
                      </span>
                      <span class="text-primary">
                        {{ this.$filters.formatNumber(this.sumSelected) }}
                        ریال
                      </span>
                    </div>
                </div>       
              </div>
            </a>
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
  name: "list",
  data: ()=>{return {
    sumSelected:0,
    sumTotal:0,
    itemsSelected: [],
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "عملیات", value: "operation", width:"160"},
      { text: "شماره سند", value: "code" , sortable: true, width:"100"},
      { text: "مبلغ", value: "amount", sortable: true},
      { text: "وضعیت", value: "status", sortable: true, width:"100"},
      { text: "تاریخ", value: "date", sortable: true, width:"80"},
      { text: "شرح", value: "des", sortable: true, width:"200"},
      { text: "تامین کننده", value: "person", sortable: true, width:"150"},
      { text: "ثبت کننده", value: "submitter", sortable: true, width:"100"},
    ]
  }},
  methods: {
    loadData(){
      axios.post('/api/accounting/search',{
        type: 'buy_rfb'
      })
          .then((response)=>{
            this.items = response.data;
            this.items.forEach((item)=>{
              item.amount = this.$filters.formatNumber(item.amount)
              this.sumTotal += parseInt(item.amount.replaceAll(",",''));
            })
            this.loading = false;
          });
    },
    deleteItem(code){
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟ تمامی اسناد پرداخت و حواله های انبار همراه فاکتور نیز حذف خواهند شد.',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
        icon:'warning'
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
                text: 'فاکتور خرید با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonText: 'قبول'
              });
            }
            else if(response.data.result == 2){
              Swal.fire({
                text: response.data.message,
                icon: 'warning',
                confirmButtonText: 'قبول'
              });
            }
          })
        }
      })
    },
    canEditItem(code){
      this.loading = true;
      axios.post('/api/buy/edit/can/' + code)
          .then((response)=>{
            this.loading = false;
            if(response.data.result == false){
              Swal.fire({
                text: 'این فاکتور به دلیل وجود اسناد پرداخت یا حواله های انبار مرتبط با آن قابل ویرایش نیست',
                confirmButtonText: 'قبول',
                icon:'error'
              });
            }
            else{
              this.$router.push('/acc/buy/mod/' + code);
            }
          });
    }
  },
  beforeMount() {
    this.loadData();
  },
  watch:{
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item)=>{
          this.sumSelected += parseInt(item.amount.replaceAll(",",""))
        });
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>