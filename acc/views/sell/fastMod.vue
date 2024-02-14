<script lang="ts">
import {defineComponent} from 'vue'
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "fastMod",
  data:()=>{return{
    tempID:'',
    year:{},
    data:{
      des:'',
      date:'',
      items:[]
    },
    units:[],
    persons:[],
    person:null,
    cashdesks:[],
    cashdesk:null,
    commoditySpeedAccess:[],
    loading: ref(true),
    headers: [
      { text: "کد کالا", value: "commodity.code" },
      { text: "کالا", value: "commodity.name" },
      { text: "واحد", value: "commodity.unit"},
      { text: "تعداد", value: "count"},
      { text: "مبلغ واحد(ریال)", value: "commodity.priceSell"},
      { text: "مبلغ کل(ریال)", value: "bs"},
      { text: "عملیات", value: "operation"},
    ]
  }},
  methods:{
    newPage(){
      this.loadData();
      if(this.data.items.length != 0){
        Swal.fire({
          text: 'آیا فاکتور کنونی را نادیده می گیرید؟',
          showCancelButton: true,
          confirmButtonText: 'بله',
          cancelButtonText: `خیر`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.data.items = [];
          }
        });
      }
    },
    getCount(commodity){
      let res = 0;
      this.data.items.forEach((item)=> {
        if(item.commodity.code === commodity.code){
          res = item.count;
        }
      });
      return res;
    },
    addFastItem(commodity){
      commodity.count ++;
      let addNew=true;
      this.data.items.forEach((item)=> {
        if(item.commodity.code === commodity.code){
          item.count ++;
          item.bs += commodity.priceSell;
          addNew = false;
        }
      });
      if(addNew){
        let item ={
          commodity:commodity,
          id:0,
          bs:parseInt(commodity.priceSell),
          bd:0,
          count:1,
          price:parseInt(commodity.priceSell),
          type:'commodity',
          des:'',
          table:53
        }
        this.data.items.push(item);
      }

    },
    loadData(){
      //load year
      axios.get('/api/year/get').then((response)=>{
        this.year = response.data;
        this.data.date = response.data.now;
      })
      //load persons
      axios.post('/api/person/list',{speedAccess:true}).then((response)=>{
        this.persons = response.data;
        if(response.data.length != 0){
          this.person = response.data[0];
        }
      });
      //get cashdesks
      axios.post('/api/cashdesk/list',{speedAccess:true}).then((response)=>{
        this.cashdesks = response.data;
        if(response.data.length != 0){
          this.cashdesk = response.data[0];
        }
      });
      //load commodities
      axios.post('/api/commodity/list',{speedAccess:true}).then((response)=>{
        this.commoditySpeedAccess = response.data;
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response)=>{
        this.units = response.data;
      });
      this.loading = false;
    },
    save(){
      if(this.data.items.length === 0){
        Swal.fire({
          text: 'فاکتور فاقد کالا می‌باشد.',
          icon:'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else if(this.person === null){
        Swal.fire({
          text: 'مشتری انتخاب نشده است.',
          icon:'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else if(this.cashdesk === null){
        Swal.fire({
          text: 'صندوق انتخاب نشده است.',
          icon:'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else{
        let outItems = [
          ...this.data.items
        ];
        //save data
        let bd = 0;
        this.data.items.forEach((item)=>{
          bd = bd + parseInt(item.bs);
        })
        outItems.push({
          bs:0,
          bd:bd,
          type:'person',
          id:this.person.id,
          des:'فروش کالا به مشتری',
          table:3
        });
        this.data.des = 'فاکتور فروش:' + this.data.des;
        axios.post('/api/accounting/insert',{
          type: 'sell',
          date: this.data.date,
          des: this.data.des,
          rows:outItems,
          update:''
        }).then((response)=>{
          outItems = [];
          outItems.push({
            bs:bd,
            bd:0,
            type:'person',
            id:this.person.id,
            des:'دریافت وجه فاکتور',
            table:3
          });
          outItems.push({
            bs:0,
            bd:bd,
            type:'cashdesk',
            id:this.cashdesk.id,
            des:'دریافت وجه فاکتور',
            table:121
          });
          this.tempID = response.data.doc.code;
          axios.post('/api/accounting/insert',{
            type: 'sell_receive',
            date: this.data.date,
            des: 'دریافت وجه فاکتور',
            rows:outItems,
            update:'',
            related:response.data.doc.code
          }).then((response)=> {
            Swal.fire({
              text: 'فاکتور ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/sell/view/' + this.tempID)
            });
          });

        })
      }
    },
    deleteItem(code){
      let index = 0;
      for(let z=0; z<this.data.items.length; z++){
        index ++;
        if(this.data.items[z]['commodity']['code'] == code){
          this.data.items.splice(index -1 ,1);
        }
      }
    },
  },
  mounted() {
    Dashmix.layout('sidebar_close');
    this.loadData();
  },
  unmounted() {
    Dashmix.layout('sidebar_open');
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-car"></i>
        فاکتور سریع</h3>
      <div class="block-options">
        <button @click="newPage()" type="button" class="btn btn-sm btn-warning me-2">
          <i class="fa fa-plus"></i>
          جدید
        </button>
        <button :disabled="this.loading" @click="save()" type="button" class="btn btn-sm btn-primary">
          <i class="fa fa-save"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row d-flex">
        <div class="col-sm-12 col-md-3">
          <div class="card">
            <div class="card-header">
              <i class="fa fa-boxes me-2"></i>
              کالا ها و خدمات
            </div>
            <div class="card-body p-1">
              <button @click="addFastItem(cm)" v-for="cm in this.commoditySpeedAccess" type="button" class="btn btn-sm btn-primary m-1">
                {{cm.name}} <span class="badge text-bg-light">{{this.getCount(cm)}}</span>
              </button>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-header">
              <i class="fa fa-user me-2"></i>
              مشتری
            </div>
            <div class="card-body p-1">
              <v-select
                  dir="rtl"
                  :options="persons"
                  label="nikename"
                  v-model="person"
              >
                <template #no-options="{ search, searching, loading }">
                  وردی یافت نشد!
                </template>
              </v-select>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-header">
              <i class="fa fa-shopping-cart me-2"></i>
              صندوق
            </div>
            <div class="card-body p-1">
              <v-select
                  dir="rtl"
                  :options="cashdesks"
                  label="name"
                  v-model="cashdesk"
              >
                <template #no-options="{ search, searching, loading }">
                  وردی یافت نشد!
                </template>
              </v-select>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-9">
          <EasyDataTable
              show-index
              alternating
              :headers="headers"
              :items="data.items"
              theme-color="#1d90ff"
              header-text-direction="center"
              body-text-direction="center"
              rowsPerPageMessage="تعداد سطر"
              emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از"
              :loading = "loading"
          >
            <template #item-commodity.priceSell="{ commodity }">
                <span>{{this.$filters.formatNumber(commodity.priceSell)}}</span>
            </template>
            <template #item-commodity.code="{ commodity }">
              <span>{{this.$filters.formatNumber(commodity.code)}}</span>
            </template>
            <template #item-bs="{ bs }">
              <span>{{this.$filters.formatNumber(bs)}}</span>
            </template>
            <template #item-count="{ count }">
              <span>{{this.$filters.formatNumber(count)}}</span>
            </template>
            <template #item-operation="{ commodity }">
                <span class="text-danger px-1" @click="deleteItem(commodity.code)">
                  <i class="fa fa-trash"></i>
                </span>
            </template>
          </EasyDataTable>
          <div class="row mt-2">
            <div class="col-sm-12 col-md-6 mb-2">
              <div class="">
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
            <div class="col-sm-12 col-md-6 mb-2">
              <div class="">
                <label class="form-label">شرح:</label>
                <input class="form-control" v-model="data.des" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>