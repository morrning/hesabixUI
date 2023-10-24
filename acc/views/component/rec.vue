<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "rec",
  props:{
    totalAmount:Number,
    originalDoc:String
  },
  data:()=>{return{
    items:[],
    date:'',
    year:{},
    listBanks:[],
    listSalarys:[],
    listCashdesks:[],
    totalPays:0,
    currencyConfig:{
      masked: false,
      prefix: '',
      suffix: 'ریال',
      thousands: ',',
      decimal: '.',
      precision: 0,
      disableNegative: false,
      disabled: false,
      min: 0,
      max: null,
      allowBlank: false,
      minimumNumberOfCharacters: 0,
      shouldRound: true,
      focusOnRight: true,
    },
  }},
  methods:{
    addItem(type){
      let obj = {};
      if(type == 'bank'){
        obj = {
          type:'bank',
          bank:{},
          cashdesk:{},
          salary:{},
          bs:0,
          bd:0,
          tax:0,
          referal:''
        }
      }
      else if(type == 'cashdesk'){
        obj = {
          type:'cashdesk',
          bank:{},
          cashdesk:{},
          salary:{},
          bs:0,
          bd:0,
          tax:0,
          referal:''
        }
      }
      else if(type == 'salary'){
        obj = {
          type:'salary',
          bank:{},
          cashdesk:{},
          salary:{},
          bs:0,
          bd:0,
          tax:0,
          referal:''
        }
      }
      this.items.push(obj);
    },
    deleteItem(key){
      this.items.splice(key,1);
      this.calc();
    },
    loadData(){
      //get list of banks
      axios.post('/api/bank/list').then((response)=>{
        this.listBanks = response.data;
      })
      //get list of salarys
      axios.post('/api/salary/list').then((response)=>{
        this.listSalarys = response.data;
      })
      //get list of cashdesks
      axios.post('/api/cashdesk/list').then((response)=>{
        this.listCashdesks = response.data;
      })
      //load year
      axios.get('/api/year/get').then((response)=>{
        this.year = response.data;
        this.date = response.data.now;
      })
    },
    calc(){
      this.totalPays = 0;
      this.items.forEach((value)=>{
        this.totalPays += parseInt(value.bd);
      })
    }
  },
  mounted() {
    this.loadData();
  }
})
</script>

<template>
  <div class="row mb-3">
    <div class="col-sm-12 col-md-5 mb-2">
      <date-picker
          class="form-control"
          v-model="date"
          format="jYYYY-jMM-jDD"
          display-format="jYYYY-jMM-jDD"
          :min="year.start"
          :max="year.end"
      />
    </div>
    <div class="col-sm-12 col-md-7 mb-2">
      <input type="text" class="form-control" v-model="des" placeholder="شرح">
    </div>
  </div>
<div class="row">
  <div class="col-12 text-center">
    <div class="input-group text-center justify-content-center">
      <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        افزودن دریافت
      </button>
      <ul class="dropdown-menu">
        <li><button type="button" @click="addItem('bank')" class="dropdown-item"><i class="fa fa-dot-circle"></i> حساب بانکی</button></li>
        <li><button type="button" @click="addItem('cashdesk')" class="dropdown-item"><i class="fa fa-dot-circle"></i> صندوق</button></li>
        <li><button type="button" @click="addItem('salary')" class="dropdown-item"><i class="fa fa-dot-circle"></i> تنخواه گردان</button></li>
      </ul>
      <span class="input-group-text">
        مجموع:
        {{this.$filters.formatNumber(parseInt(this.totalPays))}}
        ریال
      </span>
      <span class="input-group-text">
        باقی مانده:
        {{this.$filters.formatNumber(parseInt(this.$props.totalAmount) - parseInt(this.totalPays))}}
        ریال
      </span>
      <button class="btn btn-primary" type="button" >
        <i class="fa fa-save me-2"></i>
        ثبت
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="mb-1">دریافت‌ها:</p>
      <div v-show="items.length === 0" class="alert alert-info mx-3"><i class="fa fa-info"></i>
        دریافتی ثبت نشده است!
      </div>
    </div>
  </div>
  <div v-for="(pay, key) in items" class="col-12 ps-2">
    <i class="card my-1">
      <div class="card-body p-1">
        <div class="row">
          <div class="col-2 text-center">
            <img v-show="pay.type == 'bank'" src="/img/icons/bank.jpg" class="img-fluid" />
            <img v-show="pay.type == 'cashdesk'" src="/img/icons/cashdesk.jpg" class="img-fluid" />
            <img v-show="pay.type == 'salary'" src="/img/icons/salary.jpg" class="img-fluid" />
            <button @click="deleteItem(key)" type="button" class="btn btn-link text-danger mt-2">
              <i class="fa fa-trash"></i>
            </button>
          </div>
          <div class="col-10 my-2 ps-0">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div v-show="pay.type == 'bank'" class="">
                  <label class="form-label">بانک</label>
                  <v-select
                      dir="rtl"
                      :options="listBanks"
                      label="name"
                      v-model="pay.bank"
                  >
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                </div>
                <div v-show="pay.type == 'cashdesk'" class="">
                  <label class="form-label">صندوق</label>
                  <v-select
                      dir="rtl"
                      :options="listCashdesks"
                      label="name"
                      v-model="pay.cashdesk"
                  >
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                </div>
                <div v-show="pay.type == 'salary'" class="">
                  <label class="form-label">تنخواه گردان</label>
                  <v-select
                      dir="rtl"
                      :options="listSalarys"
                      label="name"
                      v-model="pay.salary"
                  >
                    <template #no-options="{ search, searching, loading }">
                      وردی یافت نشد!
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="mb-1">
                  <label  class="form-label">مبلغ</label>
                  <money3 @change="calc()" class="form-control" v-model="pay.bd" v-bind="currencyConfig"></money3>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="mb-1">
                  <label  class="form-label">ارجاع</label>
                  <input type="text" v-model="pay.referal" class="form-control">
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="mb-1">
                  <label  class="form-label">کارمزد</label>
                  <money3 @change="calc()" class="form-control" v-model="pay.tax" v-bind="currencyConfig"></money3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </i>
  </div>
</div>
</template>

<style scoped>

</style>