<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
import send from "../component/send.vue";
import recList from "../component/recList.vue";
import ArchiveUpload from "../component/archive/archiveUpload.vue";
export default defineComponent({
  name: "viewInvoice",
  components:{
    ArchiveUpload,
    send:send,
    recList:recList
  },
  watch: {
    'PayWindowsState.submited'(newValue, oldValue) {
      this.PayWindowsState.submited = false;
      if (newValue) {
        this.loadData();
        this.recModal.hide()
      }
    },
    'recListWindowsState.submited'(newValue, oldValue) {
      this.recListWindowsState.submited = false;
      if (newValue) {
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
    loading:ref(true),
    shortlink_url:'',
    copy_label:'کپی',
    send_message_label: 'ارسال',
    bid:{
      legal_name:'',
    },
    item: {
        doc: {
          id: 0,
          date: null,
          code: null,
          des: '',
          amount: 0
        },
        relatedDocs: [],
        rows: []
      },
      person: {
        nikename: null,
        mobile: ''
      },
      commoditys: [],
      totalSend: 0,
      totalDiscount: 0,
      totalTax: 0,
      transferCost:0,
      discountAll:0,
      mobileHeaders: [
        { text: "کالا", value: "commodity.name" },
        { text: "تعداد", value: "count" },
        { text: "مبلغ کل", value: "sumTotal" },
      ]
  }},
  methods: {
    copyToCliboard() {
      navigator.clipboard.writeText(this.shortlink_url);
      this.copy_label = 'کپی شد !';
    },
    loadData() {
      this.loading = true;
      this.commoditys = [];
      axios.post('/api/accounting/doc/get', { 'code': this.$route.params.id }).then((response) => {
        this.item = response.data;
        response.data.relatedDocs.forEach(element => {
          this.totalSend += parseInt(element.amount)
        });
      });

      axios.get('/api/buy/get/info/' + this.$route.params.id).then((response) => {
        this.loading = false;
        this.person = response.data.person;
        this.discountAll = response.data.discountAll;
        this.transferCost = response.data.transferCost;
        response.data.rows.forEach((item) => {
          if (item.commodity != null) {
            this.totalTax += parseInt(item.tax);
            this.totalDiscount += parseInt(item.discount);
            this.commoditys.push({
              commodity: item.commodity,
              count: item.commodity_count,
              price: parseInt((parseInt(item.bd) - parseInt(item.tax) + parseInt(item.discount)) / parseFloat(item.commodity_count)),
              bs: item.bs,
              bd: item.bd,
              id: item.commodity.id,
              des: item.des,
              discount: item.discount,
              tax: item.tax,
              sumWithoutTax: item.bd - item.tax,
              sumTotal: item.bd,
              table: 120
            });
          }

        });
      });
      axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.bid = response.data;
      });
    },
    printInvoice(pdf = true,cloudePrinters=true) {
      this.loading = true;
      axios.post('/api/buy/print/invoice', { 
        'code': this.$route.params.id,
        'pdf': pdf,
        'printers':cloudePrinters
       }).then((response) => {
        this.loading = false;
        this.printID = response.data.id;
        window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
      });
    }
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
    <div class="block-header block-header-default bg-gray-light" id="hide-on-print">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fas fa-file-invoice-dollar"></i>
        مشاهده فاکتور
      </h3>
      <div class="block-options">
        <archive-upload v-if="this.item.doc.id != 0" :docid="this.item.doc.id" doctype="buy" cat="buy"></archive-upload>
        <!-- Button trigger modal -->
        <button v-show="parseInt(this.item.doc.amount) <= parseInt(this.totalSend)" type="button"
          class="btn btn-sm btn-success" disabled="disabled">
          <i class="fas fa-check-double me-2"></i>
          <span class="">تسویه شده</span>
        </button>
        <button v-show="parseInt(this.item.doc.amount) > parseInt(this.totalSend)" type="button"
          class="btn btn-sm btn-danger" @click="this.recModal.show()">
          <i class="fas fa-money-bill-1-wave"></i>
          <span class="d-none d-sm-inline-block">پرداخت وجه</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="rec-modal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel1">
                  <i class="fas fa-money-bill-1 ms-2"></i>
                  ثبت پرداخت
                </h1>
                <div class="block-options">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div class="modal-body">
                <send ref="submitPay" :windowsState="this.PayWindowsState" :person="this.person.id"
                  :original-doc="this.item.doc.code"
                  :total-amount="parseInt(this.item.doc.amount) - parseInt(this.totalSend)" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-info ms-2" @click="this.recListModal.show()">
          <i class="fas fa-arrow-alt-circle-down"></i>
          <span class="d-none d-sm-inline-block">پرداخت‌ها</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="rec-list-modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel1">
                  <i class="fas fa-arrow-alt-circle-up ms-2"></i>
                  پرداخت‌ها
                </h1>
                <div class="block-options">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div class="modal-body">
                <rec-list ref="recListRef" :windowsState="this.recListWindowsState"
                  :items="this.item.relatedDocs"></rec-list>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-primary mx-2" @click="printInvoice()" type="button">
          <i class="si si-printer me-1"></i>
          <span class="d-none d-sm-inline-block">چاپ فاکتور</span>
        </button>
      </div>
    </div>
    <div class="block-content py-2 mt-2">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">شماره</span>
                <input type="text" readonly="readonly" v-model="item.doc.code" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تاریخ</span>
                <input type="text" readonly="readonly" v-model="item.doc.date" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">شرح</span>
                <input type="text" readonly="readonly" v-model="item.doc.des" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <b class="ps-2">تامین کننده</b>
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">نام</span>
                <input type="text" readonly="readonly" v-model="person.nikename" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">موبایل</span>
                <input type="text" readonly="readonly" v-model="person.mobile" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تلفن</span>
                <input type="text" readonly="readonly" v-model="person.tel" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">کد پستی</span>
                <input type="text" readonly="readonly" v-model="person.postalcode" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-12 col-md-9">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">آدرس</span>
                <input type="text" readonly="readonly" v-model="person.address" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <b class="ps-2">اقلام</b>
          <EasyDataTable table-class-name="customize-table" :headers="mobileHeaders" :items="commoditys"
            show-index alternating
            theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
            rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از"
            :loading="loading">
            <template #item-sumTotal="{ sumTotal }">
              {{ this.$filters.formatNumber(sumTotal) }}
            </template>
            <template #item-count="{ count, commodity }">
              {{ count }} {{ commodity.unit }}
            </template>
            <template #expand="{ tax, discount, des, price }">
              <div class="p-1 m-0">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    قیمت واحد
                    <span class="badge text-bg-primary rounded-pill">
                      {{ this.$filters.formatNumber(price) }}
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    تخفیف
                    <span class="badge text-bg-primary rounded-pill">
                      {{ this.$filters.formatNumber(discount) }}
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    مالیات
                    <span class="badge text-bg-primary rounded-pill">
                      {{ this.$filters.formatNumber(tax) }}
                    </span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    شرح:
                    {{ des }}
                  </li>
                </ul>
              </div>
            </template>
          </EasyDataTable>
          <div class="row pt-2">
            <div class="col-sm-6 col-md-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">جمع کل</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.item.doc.amount)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">وضعیت</span>
                <input v-if="parseInt(this.item.doc.amount) <= parseInt(this.totalSend)" type="text" readonly="readonly"
                  value="تسویه شده" class="form-control text-success" aria-describedby="inputGroup-sizing-sm">
                <input v-else type="text" readonly="readonly" value="تسویه نشده" class="form-control text-danger"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">مالیات</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.totalTax)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تخفیف</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.discountAll)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">هزینه حمل و نقل</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.transferCost)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <div class="block block-rounded">
            <div class="block-header block-header-default">
              <h3 class="block-title">پرداخت‌ها</h3>
              <div class="block-options">
              </div>
            </div>
            <div class="block-content p-0">
              <table v-if="item.relatedDocs.length != 0"
                class="table border-0 table-borderless table-striped table-vcenter fs-sm">
                <thead class="bg-primary text-light">
                  <tr class="text-center">
                    <th>مشاهده</th>
                    <th>شماره</th>
                    <th>تاریخ</th>
                    <th>مبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rd in item.relatedDocs" class="text-center">
                    <td>
                      <router-link :to="'/acc/accounting/view/' + rd.code">
                        <span class="text-success fa fa-eye"></span>
                      </router-link>
                    </td>
                    <td class="fw-semibold" style="width: 100px;">
                      {{ rd.code }}
                    </td>
                    <td class="fw-semibold">
                      {{ rd.date }}
                    </td>
                    <td class="fw-semibold">
                      {{ this.$filters.formatNumber(rd.amount) }}
                    </td>
                  </tr>
                  <tr v-if="item.relatedDocs.length == 0" class="text-center">
                    <td colspan="4">
                      سند پرداختی تاکنون ثبت نشده است.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center py-2 text-danger" v-else>
                <span>تاکنون سند پرداختی ثبت نشده است</span>
              </div>
            </div>
          </div>
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