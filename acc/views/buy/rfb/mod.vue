<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <router-link class="text-warning mx-2 px-2" to="/acc/buy/list">
          <i class="fa fw-bold fa-arrow-right"></i>
        </router-link>
        فاکتور  برگشت از خرید </h3>
      <div class="block-options">
        <button :disabled="this.canSubmit != true" @click="save()" type="button" class="btn btn-alt-primary">
          <i class="fa fa-save"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content py-3 px-0 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6 mb-2">
            <div class="form-control">
              <label class="form-label">تاریخ:</label>
              <date-picker
                  class=""
                  v-model="data.date"
                  format="jYYYY-jMM-jDD"
                  display-format="jYYYY-jMM-jDD"
                  :min="year.start"
                  :max="year.end"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-control mb-2">
              <label class="form-label">تامین کننده</label>

              <v-select
                  dir="rtl"
                  :options="persons"
                  label="nikename"
                  v-model="data.person"
              >
                <template #no-options="{ search, searching, loading }">
                  وردی یافت نشد!
                </template>
              </v-select>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="form-control mb-2">
              <label class="form-label">شرح</label>
              <input v-model="data.des" class="form-control" type="text">
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-2 border p-3 border-primary">
        <h3 class="text-primary-lighter">افزودن اقلام فاکتور</h3>
        <div class="row">
          <div class="col-sm-12 col-md-5 mb-2">
            <label class="form-label">کالا و خدمات</label>
            <v-select
                dir="rtl"
                :options="commodity"
                label="name"
                v-model="itemData.commodity"
                class=""
            >
              <template #no-options="{ search, searching, loading }">
                وردی یافت نشد!
              </template>
            </v-select>
          </div>
          <div class="col-sm-12 col-md-2 mb-2">
            <label class="form-label">تعداد</label>
            <input class="form-control" type="number" min="1" v-model="this.itemData.count" />
          </div>
          <div class="col-sm-12 col-md-2 mb-2">
            <label class="form-label">قیمت واحد</label>
            <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="this.itemData.price" />
          </div>
          <div class="col-sm-12 col-md-3 mb-2">
            <label class="form-label">قیمت کل</label>
            <money3 v-bind="currencyConfig" class="form-control" v-model.number="this.itemData.bs" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-success" @click="addItem">
              <i class="fa fa-save"></i>
               افزودن به فاکتور
            </button>
          </div>
        </div>
      </div>
      <div class="container mt-4">
        <div class="row">
          <div class="col-12">
            <span class="text-primary">    اقلام فاکتور       </span>
            <span class="text-secondary">({{items.length}} قلم)</span>
            <EasyDataTable
                show-index
                alternating
                :headers="headers"
                :items="items"
                theme-color="#1d90ff"
                header-text-direction="center"
                body-text-direction="center"
                rowsPerPageMessage="تعداد سطر"
                emptyMessage="هیچ آیتمی به این فاکتور افزوده نشده است."
                rowsOfPageSeparatorMessage="از"
            >
              <template #item-operation="{ index }">
                <span class="text-danger px-1" @click="deleteItem(index)">
                  <i class="fa fa-trash"></i>
                </span>
              </template>
            </EasyDataTable>
            <button @click="test()"></button>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'
import {Money3} from "v-money3";
export default {
  name: "mod",
  components: {
    Money3,
    Loading,
    Treeselect
  },
  data: ()=>{return{
    items:[],
    headers: [
      { text: "کد کالا", value: "commodity.code" },
      { text: "کالا", value: "commodity.name" },
      { text: "واحد", value: "commodity.unit"},
      { text: "تعداد", value: "count"},
      { text: "مبلغ واحد", value: "price"},
      { text: "مبلغ کل", value: "bd"},
      { text: "عملیات", value: "operation"},
    ],
    isLoading: false,
    canSubmit: true,
    updateID: null,
    sum : 0,
    balance: 0,
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
      focusOnRight: false,
    },
    data: {
      date: '',
      des: '',
      person: ''
    },
    year: '',
    persons:[],
    commodity:[],
    units:[],
    itemData:{
      commodity:'',
      count:1,
      price:0,
      bs:0,
      bd:0,
      type:'commodity',
      id:0,
      des:'کالا و خدمات',
      table:120
    }
  }},
  watch:{
    'itemData.price': function (){
      this.calc();
    },
    'itemData.count': function (){
      this.calc();
    },
    'itemData.commodity': function (newVal, oldVal){
      if(newVal != ''){
        this.itemData.price = this.itemData.commodity.priceBuy.valueOf();
      }
    },
  },
  mounted() {
    this.loadData();
  },
  beforeRouteUpdate(to,from){
    this.loadData(to.params.id);
  },
  methods: {
    calc(){
      this.itemData.bs = this.itemData.price.valueOf() * this.itemData.count.valueOf()
    },
    addItem(){
      if(this.itemData.count == 0){
        Swal.fire({
          text: 'تعداد صفر نامعتبر است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else if(this.itemData.price == 0){
        Swal.fire({
          text: 'قیمت صفر نامعتبر است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else if(this.itemData.commodity == '' || this.itemData.commodity == undefined){
        Swal.fire({
          text: 'کالایی انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else{
        this.itemData.price = this.$filters.formatNumber(this.itemData.price);
        this.itemData.count = this.$filters.formatNumber(this.itemData.count);
        this.itemData.bd = this.$filters.formatNumber(this.itemData.bd);
        
        this.items.push(this.itemData);
        this.itemData = {
          commodity:this.commodity[0],
          count:1,
          price:0,
          bs:0,
          bd:0,
          type:'commodity',
          id:this.commodity[0].id,
          des:'کالا و خدمات',
          table:120
        }
      }

    },
    deleteItem(index){
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.items.splice(index -1 ,1);
        }
      })
    },
    loadData() {
      //load year
      axios.get('/api/year/get').then((response)=>{
        this.year = response.data;
        this.data.date = response.data.now;
      })
      //load persons
      axios.get('/api/person/list').then((response)=>{
        this.persons = response.data;
      });
      //load commodities
      axios.get('/api/commodity/list').then((response)=>{
        this.commodity = response.data;
        if(response.data.length != 0){
          this.itemData.commodity = response.data[0];
        }
        else{
          Swal.fire({
            text: 'برای ثبت فاکتور برگشت از خرید ابتدا یک کالای جدید تعریف کنید.',
            icon: 'warning',
            confirmButtonText: 'تعریف کالای جدید'
          }).then((result)=>{
            if(result.isConfirmed){
              this.$router.push('/acc/commodity/mod/');
            }
          });
        }
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response)=>{
        this.units = response.data;
      });

      //load data for edit document
      
      if(this.$route.params.id != ''){
        axios.get('/api/buy/get/info/' + this.$route.params.id).then((response)=>{
          this.data.date = response.data.date;
          this.data.des = response.data.des;
          this.persons.forEach((item,index)=>{
            if(item.code == response.data.rows[1].person.code){
              this.data.person = item;
            }
          });
          response.data.rows.forEach((item,key)=>{
            if(item.commodity != null){
              this.items.push({
                commodity:item.commodity,
                count:item.commodity_count,
                price: this.$filters.formatNumber(parseInt(parseInt(item.bd) / parseInt(item.commodity_count))),
                bs:this.$filters.formatNumber(item.bs),
                bd:item.bd,
                type:'commodity',
                id:item.commodity.id,
                des:'کالا و خدمات',
                table:120
              });
            }
          });
          
        });
      }

    },
    save() {
      this.canSubmit=false;
      if(this.items.length == 0){
        Swal.fire({
          text: 'فاکتور فاقد کالا می باشد.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else if(this.data.person == null || this.data.person == ''){
        Swal.fire({
          text: 'تامین کننده انتخاب نشده است.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else{
        // add tamin konanade
        let bd = 0;
        this.items.forEach((item)=>{
          bd = bd +  parseInt(item.bs);
        })
        this.items.push({
          commodity:this.commodity[0],
          bs:0,
          bd:bd,
          type:'person',
          id:this.data.person.id,
          des:'برگشت از خرید کالا از تامین کننده',
          table:3
        });
        axios.post('/api/accounting/insert',{
          type: 'buy_rfb',
          date: this.data.date,
          des: this.data.des,
          rows:this.items,
          update:this.$route.params.id
        }).then((response)=>{
          this.items.pop();
          Swal.fire({
            text: 'فاکتور ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول'
          }).then(() => {
            this.$router.push('/acc/buy/rfb/list')
          });
        })
      }
      this.canSubmit=true;
    }
  }
}
</script>

<style scoped>

</style>