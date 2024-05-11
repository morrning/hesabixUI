<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
export default defineComponent({
  name: "viewInvoice",
  components:{

  },
  watch:{

  },
  data:()=>{return{
    loading:ref(false),
    bid:{
      legal_name:'',
    },
    item:{
      ticket:{
        id:0,
        date:null,
        code:null,
        des:'',
        storeroom:{
          manager:''
        }
      },
      rows:[],
      person:{
        nikename: null,
        mobile:'',
        address:'',
        tel:'',
        codeeqtesadi:'',
        keshvar:'',
        ostan:'',
        shahr:''
      }
    },

  }},
  methods:{
    loadData(){
      axios.post('/api/storeroom/tickets/info/' + this.$route.params.id).then((response)=> {
        this.item.ticket = response.data.ticket;
        this.item.person = response.data.person;
        this.item.transferType = response.data.transferType;
        this.item.rows = response.data.commodities;
      });
      axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.bid = response.data;
      });
    }
  },
  mounted() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light" id="hide-on-print" >
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn btn-sm btn-link text-warning mx-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fas fa-file-invoice-dollar"></i>
        مشاهده و چاپ حواله انبار</h3>
      <div class="block-options">
        <button class="btn btn-sm btn-primary mx-2" onclick="document.getElementById('hide-on-print').classList.add('d-none');Dashmix.helpers('dm-print');" type="button">
          <i class="si si-printer me-1"></i>
          <span class="d-none d-sm-inline-block">چاپ</span>
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="c-print container-xl">
        <div class="row">
          <div class="col-3 text-center"></div>
          <div class="col-6 text-center">
            <h3 class="font-weight-bold">{{ this.bid.legal_name }}</h3>
            <h5 class=""> {{this.item.ticket.typeString}} انبار</h5>
          </div>
          <div class="col-3 text-right">
            <p>شماره حواله: {{item.ticket.code}}</p>
            <p>تاریخ حواله: {{item.ticket.date}}</p>
          </div>
        </div>
        <div class="row">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th class="text-center table-header" colspan="11">مشخصات شخص</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colspan="11" class="text-right py-0">
                <div class="row">
                  <div class="col-6">
                    <p>
                      <b>نام شخص حقیقی / حقوقی:</b>
                      {{ this.item.person.nikename }}</p>
                    <p>
                      <b>آدرس:</b>
                      <span v-show="this.item.person.keshvar">{{ this.item.person.keshvar + ' ' }}</span>
                      <span v-show="this.item.person.ostan">{{ this.item.person.ostan + ' ' }}</span>
                      <span v-show="this.item.person.shahr">{{ this.item.person.shahr + ' ' }}</span>
                      <span v-show="this.item.person.address">{{ this.item.person.address }}</span>
                    </p>
                  </div>
                  <div class="col-3">
                    <p>
                      <b>شماره اقتصادی: </b>
                      {{ this.item.person.codeeghtesadi }}</p>
                    <p>
                      <b>کد پستی: </b>
                      {{ this.item.person.postalcode }}</p>
                  </div>
                  <div class="col-3">
                    <p>
                      <b>شماره ثبت: </b>
                      {{ this.item.person.sabt }}</p>
                    <p>
                      <b>تلفن / نمابر : </b>
                      {{ this.item.person.tel }}</p>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
            <thead>
            <tr class="text-center table-header">
              <th style="width:80px">ردیف</th>
              <th>کد کالا</th>
              <th>کالا/خدمات</th>
              <th>واحد</th>
              <th>شرح</th>
              <th>تعداد مورد نیاز</th>
              <th>تعدادثبت شده</th>
              <th>باقی مانده تعداد</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(commodity, index) in item.rows" class="text-center">
              <td>{{ index + 1 }}</td>
              <td>{{ commodity.commodity.code }}</td>
              <td>{{ commodity.commodity.name }}</td>
              <td>{{ commodity.commodity.unit.name }}</td>
              <td>{{ commodity.des }}</td>
              <td>{{ commodity.hesabdariCount }}</td>
              <td>{{ commodity.count }}</td>
              <td>{{ commodity.remain }}</td>

            </tr>
            <tr style="padding: 60px 0;">
              <td colspan=6 class="text-right"> امضا  مسئول انبار:
                {{this.item.ticket.storeroom.manager}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
table{
  font-size: small;
  border: 1px solid gray;
}
.table-header{
  background-color: lightgray;
}
.c-print{
  background-color: white;
}

@media print
{
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  body  {
    padding-top: 72px;
    padding-bottom: 72px ;
  }
}
</style>