<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
import rec from "../component/rec.vue";
import recList from "../component/recList.vue";
import ArchiveUpload from "../component/archive/archiveUpload.vue";
import {getApiUrl} from "/hesabixConfig";
export default defineComponent({
  name: "viewInvoice",
  components:{
    ArchiveUpload,
    rec:rec,
    recList:recList
  },
  watch:{
    'PayWindowsState.submited'(newValue,oldValue) {
      this.PayWindowsState.submited = false;
      if(newValue){
        this.loadData();
        this.recModal.hide()
      }
    },
    'recListWindowsState.submited'(newValue,oldValue) {
      this.recListWindowsState.submited = false;
      if(newValue){
        this.loadData();
      }
    }
  },
  data:()=>{return{
    PayWindowsState:{
      submited:false
    },
    recListWindowsState:{
      submited:false
    },
    recModal:{},
    recListModal:{},
    loading:ref(false),
    shortlink_url:'',
    copy_label:'کپی',
    send_message_label: 'ارسال',
    bid:{
      legal_name:'',
    },
    item:{
      doc:{
        id:0,
        date:null,
        code:null,
        des:'',
        amount:0
      },
      relatedDocs:[],
      rows:[]
    },
    person:{
      nikename: null,
      mobile:''
    },
    commoditys:[],
    totalPrice:0,
    totalRec: 0,
  }},
  methods:{
    copyToCliboard(){
      navigator.clipboard.writeText(this.shortlink_url);
      this.copy_label = 'کپی شد !';
    },
    loadData(){
      axios.post('/api/accounting/doc/get',{'code':this.$route.params.id}).then((response)=>{
          response.data.rows.forEach((element) => {
            if(element.person){
              this.person = element.person
            }
            else if(element.commodity){
              this.totalPrice += parseInt(element.bs);
              element.unitPrice = element.bs / element.count
              this.commoditys.push(element);
            }
          });
          this.item = response.data;
        response.data.relatedDocs.forEach(element => {
          this.totalRec += parseInt(element.amount)
        });
      });
      axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
          this.bid = response.data;
        });
    },
  },
  mounted() {
    this.loadData();
    this.recModal =  new bootstrap.Modal(document.getElementById('rec-modal'))
    this.recListModal =  new bootstrap.Modal(document.getElementById('rec-list-modal'))
  }
})
</script>

<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light" id="hide-on-print" >
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fas fa-file-invoice-dollar"></i>
        مشاهده فاکتور</h3>
      <div class="block-options">
        <archive-upload v-if="this.item.doc.id != 0" :docid="this.item.doc.id" doctype="rfbuy" cat="rfbuy"></archive-upload>
        <!-- Button trigger modal -->
        <button v-show="parseInt(this.item.doc.amount) <= parseInt(this.totalRec)" type="button" class="btn btn-sm btn-success" disabled="disabled">
          <i class="fas fa-check-double me-2"></i>
          <span class="">تسویه شده</span>
        </button>
        <button v-show="parseInt(this.item.doc.amount) > parseInt(this.totalRec)" type="button" class="btn btn-sm btn-danger" @click="this.recModal.show()">
          <i class="fas fa-money-bill-1-wave"></i>
          <span class="d-none d-sm-inline-block">ثبت دریافت</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="rec-modal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel1">
                  <i class="fas fa-money-bill-1 ms-2"></i>
                  ثبت دریافت
                </h1>
                <div class="block-options">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div class="modal-body">
                <rec ref="submitPay" :windowsState="this.PayWindowsState" :person="this.person.id" :original-doc="this.item.doc.code" :total-amount="parseInt(this.item.doc.amount) - parseInt(this.totalRec)"></rec>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-info ms-2" @click="this.recListModal.show()">
          <i class="fas fa-arrow-alt-circle-down"></i>
          <span class="d-none d-sm-inline-block">دریافت‌ها</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="rec-list-modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel1">
                  <i class="fas fa-arrow-alt-circle-down ms-2"></i>
                  دریافت‌ها
                </h1>
                <div class="block-options">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div class="modal-body">
                <rec-list ref="recListRef" :windowsState="this.recListWindowsState" :items="this.item.relatedDocs"></rec-list>
              </div>
              <div class="modal-footer">
                <button type="button" ref="btnCloseModalRec" class="btn btn-secondary btn-close-modal" data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-primary mx-2" onclick="document.getElementById('hide-on-print').classList.add('d-none');Dashmix.helpers('dm-print');" type="button">
          <i class="si si-printer me-1"></i>
          <span class="d-none d-sm-inline-block">چاپ فاکتور</span>
        </button>
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="c-print container-xl">
    <div class="row">
      <div class="col-3 text-center"></div>
      <div class="col-6 text-center">
        <h3 class="font-weight-bold">{{ this.bid.legal_name }}</h3>
        <h5 class="">صورتحساب برگشت از خرید کالا و خدمات</h5>
      </div>
      <div class="col-3 text-right">
        <p>شماره سفارش: {{item.doc.code}}</p>
        <p>تاریخ سفارش: {{item.doc.date}}</p>
      </div>
    </div>
    <div class="row">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th class="text-center table-header" colspan="11">مشخصات خریدار</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="11" class="text-right py-0">
            <div class="row">
              <div class="col-6">
                <p>
                  <b>نام: </b>
                  {{ this.bid.legal_name }}</p>
                <p>
                  <b>آدرس: </b>
                  استان {{this.bid.ostan}}، شهر {{this.bid.shahrestan}}، {{ this.bid.address }}</p>
              </div>
              <div class="col-3">
                <p>
                  <b>شماره اقتصادی: </b>
                  {{ this.bid.codeeqtesadi }}</p>
                <p>
                  <b>کد پستی:</b>
                  {{ this.bid.postalcode }}</p>
              </div>
              <div class="col-3">
                <p>
                  <b>شماره ثبت / شناسه ملی: </b>
                  {{ this.bid.shomaresabt }}</p>
                <p>
                  <b>تلفن / نمابر:</b>
                  {{ this.bid.tel }}</p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
        <thead>
        <tr>
          <th class="text-center table-header" colspan="11">مشخصات تامین کننده</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="11" class="text-right py-0">
            <div class="row">
              <div class="col-6">
                <p>
                  <b>نام شخص حقیقی / حقوقی:</b>
                  {{ this.person.nikename }}</p>
                <p>
                  <b>آدرس:</b>
                  {{ this.person.address }}</p>
              </div>
              <div class="col-3">
                <p>
                  <b>شماره اقتصادی: </b>
                  {{ this.person.codeeghtesadi }}</p>
                <p>
                  <b>کد پستی: </b>
                  {{ this.person.postalcode }}</p>
              </div>
              <div class="col-3">
                <p>
                  <b>شماره ثبت: </b>
                  {{ this.person.shomaresabt }}</p>
                <p>
                  <b>تلفن / نمابر : </b>
                  {{ this.person.tel }}</p>
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
          <th>شرح</th>
          <th>تعداد / مقدار</th>
          <th>واحد</th>
          <th>مبلغ واحد (ریال)</th>
          <th>مبلغ کل (ریال)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(commodity, index) in commoditys" class="text-center">
          <td>{{ index + 1 }}</td>
          <td>{{ commodity.commodity.code }}</td>
          <td>{{ commodity.commodity.name }}</td>
          <td>{{ commodity.des }}</td>
          <td>{{ commodity.count }}</td>
          <td>{{ commodity.commodity.unit }}</td>
          <td>{{ this.$filters.formatNumber(commodity.unitPrice) }}</td>
          <td>{{ this.$filters.formatNumber(commodity.bs) }}</td>
        </tr>
        <tr class="bg-light border border-dark border-2">
          <th colspan="2" class="text-right border-0">جمع دریافت‌ها:
            {{ this.$filters.formatNumber(this.totalRec) }} ریال
          </th>
          <th colspan="1" class="text-right border-end-0">مانده فاکتور:
            {{ this.$filters.formatNumber(parseInt(this.totalPrice) - parseInt(this.totalRec)) }} ریال
            <span v-show="parseInt(this.item.doc.amount) <= parseInt(this.totalRec)">(تسویه شده)</span>
            <span class="text-decoration-underline text-danger" v-show="parseInt(this.item.doc.amount) > parseInt(this.totalRec)">(تسویه نشده)</span>
          </th>
          <th colspan="5" class="text-right border-end-0">جمع کل:
            {{ this.$filters.formatNumber(this.totalPrice) }} ریال
          </th>
        </tr>
        <tr>
          <th colspan="3" class="text-right">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="text-center">لیست دریافت‌ها</div>
                </div>
                <div class="col-12">
                  <div v-show="this.item.relatedDocs.length != 0" class="row">
                    <div class="col-sm-12 col-md-3 text-center">شماره سند</div>
                    <div class="col-sm-12 col-md-3 text-center">تاریخ</div>
                    <div class="col-sm-12 col-md-3 text-center">مبلغ</div>
                    <div class="col-sm-12 col-md-3 text-center">نوع</div>
                  </div>
                  <div v-show="this.item.relatedDocs.length == 0" class="row">
                    <b class="text-danger col-sm-12 col-md-12 text-center">هیچ سند دریافتی ثبت نشده است.</b>
                  </div>
                </div>
                <div class="col-12" v-for="rd in this.item.relatedDocs">
                  <div class="row">
                    <div class="col-sm-12 col-md-3 text-center">
                      <router-link :to="'/acc/accounting/view/' + rd.code">
                        <span class="text-success fa fa-eye"></span>
                      </router-link>
                      {{rd.code}}
                    </div>
                    <div class="col-sm-12 col-md-3 text-center">{{rd.date}}</div>
                    <div class="col-sm-12 col-md-3 text-center">{{this.$filters.formatNumber(rd.amount)}} ریال</div>
                    <div v-if="rd.type === 'walletPay'"  class="col-sm-12 col-md-3 text-center">پرداخت آنلاین</div>
                    <div v-else class="col-sm-12 col-md-3 text-center">سند حسابداری</div>
                  </div>
                </div>
              </div>
            </div>
          </th>
          <th colspan="6" class="text-right">توضیحات:{{ this.item.doc.des.replace("فاکتور فروش:", "") }}</th>
        </tr>
        <tr style="padding: 60px 0;">
          <td colspan="4" class="text-right"> امضا خریدار</td>
          <td colspan="4" class="text-right">مهر و امضا تامین‌کننده</td>
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