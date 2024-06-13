<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from "axios";
import Swal from "sweetalert2";
import rec from "../component/rec.vue";
import recList from "../component/recList.vue";
import ArchiveUpload from "../component/archive/archiveUpload.vue";
import type { Header, Item } from "vue3-easy-data-table";

import { getApiUrl } from "/hesabixConfig";
export default defineComponent({
  name: "viewInvoice",
  components: {
    ArchiveUpload,
    rec: rec,
    recList: recList
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
  data: () => {
    return {
      PayWindowsState: {
        submited: false
      },
      recListWindowsState: {
        submited: false
      },
      recModal: {},
      recListModal: {},
      loading: ref(false),
      shortlink_url: '',
      copy_label: 'کپی',
      send_message_label: 'ارسال',
      bid: {
        legal_name: '',
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
      totalRec: 0,
      totalDiscount: 0,
      totalTax: 0,
      transferCost:0,
      discountAll:0,
      mobileHeaders: [
        { text: "کالا", value: "commodity.name" },
        { text: "تعداد", value: "count" },
        { text: "مبلغ کل", value: "sumTotal" },
      ]
    }
  },
  setup() {

  },
  methods: {
    copyToCliboard() {
      navigator.clipboard.writeText(this.shortlink_url);
      this.copy_label = 'کپی شد !';
    },
    loadData() {
      this.commoditys = [];
      axios.post('/api/accounting/doc/get', { 'code': this.$route.params.id }).then((response) => {
        this.item = response.data;
        if (this.item.doc.shortlink != null) {
          this.shortlink_url = getApiUrl() + '/sl/sell/' + localStorage.getItem("activeBid") + '/' + this.item.doc.shortlink;
        }
        else {
          this.shortlink_url = getApiUrl() + '/sl/sell/' + localStorage.getItem("activeBid") + '/' + this.item.doc.id;
        }
        response.data.relatedDocs.forEach(element => {
          this.totalRec += parseInt(element.amount)
        });
      });

      axios.get('/api/sell/get/info/' + this.$route.params.id).then((response) => {
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
              price: parseInt((parseInt(item.bs) - parseInt(item.tax) + parseInt(item.discount)) / parseFloat(item.commodity_count)),
              bs: item.bs,
              bd: item.bd,
              id: item.commodity.id,
              des: item.des,
              discount: item.discount,
              tax: item.tax,
              sumWithoutTax: item.bs - item.tax,
              sumTotal: item.bs,
              table: 53
            });
          }

        });
      });
      axios.post('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.bid = response.data;
      });
    },
    sendSMS() {
      this.loading = true;
      const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      if (!regex.test(this.person.mobile)) {
        Swal.fire({
          text: 'شماره موبایل وارد شده نا معتبر است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
        this.loading = false;
      }
      else {
        this.send_message_label = 'در حال ارسال...';
        axios.post('/api/sms/send/sell-invoice/' + this.item.doc.id + '/' + this.person.mobile).then((response) => {
          if (response.data.result == 2) {
            Swal.fire({
              text: 'اعتبار سرویس پیامک کافی نیست.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
            this.send_message_label = 'ارسال';
          }
          else if (response.data.result == 1) {
            Swal.fire({
              text: 'پیامک اطلاع رسانی ارسال شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            });
            this.send_message_label = 'ارسال شد!'
          }
          this.loading = false;
        })
      }


    }
  },
  mounted() {
    this.loadData();
    this.recModal = new bootstrap.Modal(document.getElementById('rec-modal'))
    this.recListModal = new bootstrap.Modal(document.getElementById('rec-list-modal'))
  }
})
</script>

<template>
  <div class="block block-content-full">
    <div class="block-header block-header-default bg-gray-light" id="hide-on-print">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fas fa-file-invoice-dollar"></i>
        مشاهده فاکتور
      </h3>
      <div class="block-options">
        <archive-upload v-if="this.item.doc.id != 0" :docid="this.item.doc.id" doctype="sell"
          cat="sell"></archive-upload>
        <!-- Button trigger modal -->
        <button v-show="parseInt(this.item.doc.amount) > parseInt(this.totalRec)" type="button"
          class="btn btn-sm btn-danger" @click="this.recModal.show()">
          <i class="fas fa-money-bill-1-wave"></i>
          <span class="d-none d-sm-inline-block">ثبت دریافت</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="rec-modal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
          <rec ref="submitPay" :windowsState="this.PayWindowsState" :person="this.person.id"
            :original-doc="this.item.doc.code" :total-amount="parseInt(this.item.doc.amount) - parseInt(this.totalRec)">
          </rec>
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
                <rec-list ref="recListRef" :windowsState="this.recListWindowsState"
                  :items="this.item.relatedDocs"></rec-list>
              </div>
              <div class="modal-footer">
                <button type="button" ref="btnCloseModalRec" class="btn btn-secondary btn-close-modal"
                  data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-sm btn-primary mx-2"
          onclick="document.getElementById('hide-on-print').classList.add('d-none');Dashmix.helpers('dm-print');"
          type="button">
          <i class="si si-printer me-1"></i>
          <span class="d-none d-sm-inline-block">چاپ فاکتور</span>
        </button>
        <!-- Button trigger modal -->
        <button v-show="this.bid.shortlinks" type="button" class="btn btn-sm btn-success" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <i class="fas fa-share-nodes"></i>
          <span class="d-none d-sm-inline-block">اشتراک گذاری</span>
        </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  <i class="fas fa-share-nodes"></i>
                  اشتراک گذاری
                </h1>
                <div class="block-options">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="input-group mb-2">
                      <div class="input-group-text">
                        <i class="fa fa-paperclip me-2"></i>
                        پیوند فاکتور
                      </div>
                      <input Readonly="Readonly" type="text" class="form-control" v-model="shortlink_url">
                      <button class="btn btn-outline-success" type="button" @click="copyToCliboard()">{{ this.copy_label
                        }}</button>
                    </div>
                    <div class="input-group">
                      <div class="input-group-text">
                        <i class="fa fa-message me-2"></i>
                        ارسال پیامک
                      </div>
                      <input type="text" class="form-control" v-model="this.person.mobile">
                      <button :disabled="this.loading" class="btn btn-outline-success" type="button"
                        @click="sendSMS()">{{ this.send_message_label }}</button>
                    </div>
                  </div>
                  <div class="mt-3">
                    <i class="fas fa-share-nodes me-3"></i>
                    <label>اشتراک گذاری در شبکه‌های اجتماعی</label>
                  </div>
                  <div class="mt-2">
                    <a target="_blank" :href="'tg://msg?text=' + this.shortlink_url">
                      <img src="/img/icons/telegram.png" class="m-3" style="max-width: 30px;" />
                    </a>
                    <a target="_blank" :href="'et://msg_url?url=' + this.shortlink_url">
                      <img src="/img/icons/eitaa.jpeg" class="m-3" style="max-width: 30px;" />
                    </a>
                    <a target="_blank" :href="'https://ble.ir/share/url?url=' + this.shortlink_url">
                      <img src="/img/icons/bale-logo.png" class="m-3" style="max-width: 30px;" />
                    </a>
                    <a target="_blank" :href="'https://ble.ir/share/url?url=' + this.shortlink_url">
                      <img src="/img/icons/robika.png" class="m-3" style="max-width: 30px;" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="block-content pt-1 pb-3 d-none d-sm-block">
      <div class="c-print container-xl">
        <div class="row">
          <div class="col-3 text-center"></div>
          <div class="col-6 text-center">
            <h3 class="font-weight-bold">{{ this.bid.legal_name }}</h3>
            <h5 class="">صورتحساب فروش کالا و خدمات</h5>
          </div>
          <div class="col-3 text-right">
            <p>شماره سفارش: {{ item.doc.code }}</p>
            <p>تاریخ سفارش: {{ item.doc.date }}</p>
          </div>
        </div>
        <div class="row">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center table-header" colspan="11">مشخصات فروشنده</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="11" class="text-right py-0">
                  <div class="row">
                    <div class="col-6">
                      <p>
                        <b>نام: </b>
                        {{ this.bid.legal_name }}
                      </p>
                      <p>
                        <b>آدرس: </b>
                        استان {{ this.bid.ostan }}، شهر {{ this.bid.shahrestan }}، {{ this.bid.address }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p>
                        <b>شماره اقتصادی: </b>
                        {{ this.bid.codeeqtesadi }}
                      </p>
                      <p>
                        <b>کد پستی:</b>
                        {{ this.bid.postalcode }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p>
                        <b>شماره ثبت / شناسه ملی: </b>
                        {{ this.bid.shomaresabt }}
                      </p>
                      <p>
                        <b>تلفن / نمابر:</b>
                        {{ this.bid.tel }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
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
                        <b>نام شخص حقیقی / حقوقی:</b>
                        {{ this.person.nikename }}
                      </p>
                      <p>
                        <b>آدرس:</b>
                        {{ this.person.address }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p>
                        <b>شماره اقتصادی: </b>
                        {{ this.person.codeeghtesadi }}
                      </p>
                      <p>
                        <b>کد پستی: </b>
                        {{ this.person.postalcode }}
                      </p>
                    </div>
                    <div class="col-3">
                      <p>
                        <b>شماره ثبت: </b>
                        {{ this.person.shomaresabt }}
                      </p>
                      <p>
                        <b>تلفن / نمابر : </b>
                        {{ this.person.tel }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <thead>
              <tr class="text-center table-header">
                <th style="width:80px">ردیف</th>
                <th>کالا/خدمات</th>
                <th>شرح</th>
                <th>تعداد / مقدار</th>
                <th>مبلغ واحد</th>
                <th>تخفیف</th>
                <th>مالیات</th>
                <th>مبلغ کل</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(commodity, index) in commoditys" class="text-center">
                <td>{{ index + 1 }}</td>
                <td>
                  {{ commodity.commodity.code }} - {{ commodity.commodity.name }}</td>
                <td>{{ commodity.des }}</td>
                <td>{{ commodity.count }} {{ commodity.commodity.unit }}</td>
                <td>{{ this.$filters.formatNumber(commodity.price) }}</td>
                <td>{{ this.$filters.formatNumber(commodity.discount) }}</td>
                <td>{{ this.$filters.formatNumber(commodity.tax) }}</td>
                <td>{{ this.$filters.formatNumber(parseInt(commodity.bs)) }}</td>
              </tr>
              <tr class="bg-light border border-dark border-2">
                <th colspan="2" class="text-right border-0">جمع دریافت‌ها:
                  {{ this.$filters.formatNumber(this.totalRec) }} ریال
                </th>
                <th colspan="1" class="text-right border-end-0">مانده فاکتور:
                  {{ this.$filters.formatNumber(parseInt(this.item.doc.amount) - parseInt(this.totalRec)) }} ریال
                  <span v-show="parseInt(this.item.doc.amount) <= parseInt(this.totalRec)">(تسویه شده)</span>
                  <span class="text-decoration-underline text-danger"
                    v-show="parseInt(this.item.doc.amount) > parseInt(this.totalRec)">(تسویه نشده)</span>
                </th>
                <th colspan="2" class="text-right border-dark">حمل و نقل:
                  {{ this.$filters.formatNumber(this.transferCost) }} ریال
                </th>
                <th colspan="2" class="text-right border-dark"> تخفیف کل فاکتور:
                  {{ this.$filters.formatNumber(this.discountAll) }} ریال
                </th>
                <th colspan="6" class="text-right border-end-0">جمع کل:
                  {{ this.$filters.formatNumber(this.item.doc.amount) }} ریال
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
                            {{ rd.code }}
                          </div>
                          <div class="col-sm-12 col-md-3 text-center">{{ rd.date }}</div>
                          <div class="col-sm-12 col-md-3 text-center">{{ this.$filters.formatNumber(rd.amount) }} ریال
                          </div>
                          <div v-if="rd.type === 'walletPay'" class="col-sm-12 col-md-3 text-center">پرداخت آنلاین</div>
                          <div v-else class="col-sm-12 col-md-3 text-center">سند حسابداری</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <th colspan="6" class="text-right">توضیحات:{{ this.item.doc.des.replace("فاکتور فروش:", "") }}</th>
              </tr>
              <tr style="padding: 60px 0;">
                <td colspan="3" class="text-right"> امضا خریدار</td>
                <td colspan="6" class="text-right">مهر و امضا فروشنده</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="block-content py-2 px-2 d-block d-sm-none">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">شماره</span>
                <input type="text" readonly="readonly" v-model="item.doc.code" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تاریخ</span>
                <input type="text" readonly="readonly" v-model="item.doc.date" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-12">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">شرح</span>
                <input type="text" readonly="readonly" v-model="item.doc.des" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <b class="ps-2">خریدار</b>
          <div class="row">
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">نام</span>
                <input type="text" readonly="readonly" v-model="person.nikename" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">موبایل</span>
                <input type="text" readonly="readonly" v-model="person.mobile" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تلفن</span>
                <input type="text" readonly="readonly" v-model="person.tel" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">کد پستی</span>
                <input type="text" readonly="readonly" v-model="person.postalcode" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-12">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">آدرس</span>
                <input type="text" readonly="readonly" v-model="person.address" class="form-control"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <b class="ps-2">اقلام</b>
          <EasyDataTable table-class-name="customize-table" :headers="mobileHeaders" :items="commoditys" v-model:items-selected="itemsSelected" show-index
            alternating :search-value="searchValue" theme-color="#1d90ff" header-text-direction="center"
            body-text-direction="center" rowsPerPageMessage="تعداد سطر" emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
            rowsOfPageSeparatorMessage="از" :loading="loading">
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
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">جمع کل</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.item.doc.amount)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">وضعیت</span>
                <input v-if="parseInt(this.item.doc.amount) <= parseInt(this.totalRec)" type="text" readonly="readonly"
                  value="تسویه شده" class="form-control text-success" aria-describedby="inputGroup-sizing-sm">
                <input v-else type="text" readonly="readonly" value="تسویه نشده" class="form-control text-danger"
                  aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">مالیات</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.totalTax)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">تخفیف</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.discountAll)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">هزینه حمل و نقل</span>
                <input type="text" readonly="readonly" :value="this.$filters.formatNumber(this.transferCost)"
                  class="form-control" aria-describedby="inputGroup-sizing-sm">
              </div>
            </div>
          </div>
          <div class="block block-rounded">
            <div class="block-header block-header-default">
              <h3 class="block-title">دریافت‌ها</h3>
              <div class="block-options">
                <button class="btn-block-option" data-action="state_toggle" data-action-mode="demo"
                  data-toggle="block-option" type="button">

                </button>
              </div>
            </div>
            <div class="block-content p-0">
              <table v-if="item.relatedDocs.length != 0"
                class="table border-0 table-borderless table-striped table-vcenter fs-sm">
                <tbody>
                  <tr v-for="rd in item.relatedDocs">
                    <td>
                      <router-link :to="'/acc/accounting/view/' + rd.code">
                        <span class="text-success fa fa-eye"></span>
                      </router-link>
                    </td>
                    <td class="fw-semibold text-center" style="width: 100px;">
                      {{ rd.code }}
                    </td>
                    <td class="fw-semibold text-center">
                      {{ rd.date }}
                    </td>
                    <td class="fw-semibold text-end">
                      {{ this.$filters.formatNumber(rd.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center py-2 text-danger" v-else>
                <span>تاکنون سند دریافتی ثبت نشده است</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
table {
  font-size: small;
  border: 1px solid gray;
}

.table-header {
  background-color: lightgray;
}

.c-print {
  background-color: white;
}

@media print {
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }

  body {
    padding-top: 72px;
    padding-bottom: 72px;
  }
}
</style>