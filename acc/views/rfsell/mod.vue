<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        فاکتور برگشت از فروش
      </h3>
      <div class="block-options">
        <button :disabled="this.canSubmit != true || isLoading == true" @click="save()" type="button"
          class="btn btn-sm btn-alt-primary">
          <i class="fa fa-save"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content py-3 px-0 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6 mb-1">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa fa-calendar"></i>
                  تاریخ
                </h3>
                <div class="block-options">

                </div>
              </div>
              <div class="block-content pt-1 px-1">
                <p>
                  <date-picker class="" v-model="data.date" format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD"
                    :min="year.start" :max="year.end" />
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 mb-1">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa fa-person"></i>
                  طرف حساب
                </h3>
                <div class="block-options">
                  <quickView :code="this.data.person.code"></quickView>
                  <quickAdd :code="this.data.person.code"></quickAdd>
                </div>
              </div>
              <div class="block-content pt-1 px-1">
                <v-select class="mb-1 mx-0" :filterable="false" dir="rtl" @search="searchPerson" :options="persons"
                  label="nikename" v-model="data.person">
                  <template #no-options="{ search, searching, loading }">
                    وردی یافت نشد!
                  </template>
                  <template v-slot:option="option">
                    <div class="row mb-1">
                      <div class="col-12">
                        <i class="fa fa-user me-2"></i>
                        {{ option.nikename }}
                      </div>
                      <div class="col-12">
                        <div class="row">
                          <div class="col-6">
                            <i class="fa fa-phone me-2"></i>
                            {{ option.mobile }}
                          </div>
                          <div class="col-6">
                            <i class="fa fa-bars"></i>
                            تراز:
                            {{ this.$filters.formatNumber(Math.abs(parseInt(option.bs) -
          parseInt(option.bd))) }}
                            <span class="text-danger" v-if="parseInt(option.bs) - parseInt(option.bd) < 0">
                              بدهکار </span>
                            <span class="text-success" v-if="parseInt(option.bs) - parseInt(option.bd) > 0">
                              بستانکار </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </v-select>
                <span v-if="selectedPersonWithDet.bs != undefined" class="text-info ms-2">
                  تراز:
                  {{ this.$filters.formatNumber(Math.abs(parseInt(this.selectedPersonWithDet.bs) -
          parseInt(this.selectedPersonWithDet.bd))) }}
                  <span class="text-danger"
                    v-if="parseInt(this.selectedPersonWithDet.bs) - parseInt(this.selectedPersonWithDet.bd) < 0">
                    بدهکار </span>
                  <span class="text-success"
                    v-if="parseInt(this.selectedPersonWithDet.bs) - parseInt(this.selectedPersonWithDet.bd) > 0">
                    بستانکار </span>
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 mb-1">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa-regular fa-note-sticky"></i>
                  شرح
                </h3>
                <div class="block-options">
                  <mostdes :submitData="desSubmit" type="rfsell"></mostdes>
                  <button title="شرح‌های پرتکرار" type="button" class="btn-block-option" data-bs-toggle="modal"
                    data-bs-target="#mostDesModal">
                    <i class="fa fa-list"></i>
                  </button>
                </div>
              </div>
              <div class="block-content p-0">
                <input v-model="data.des" class="form-control" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
      <quickAddCommodity></quickAddCommodity>
      <!-- offcanvas -->
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel">افزودن اقلام فاکتور</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div class="container">
            <div class="row">
              <div class="col-12 mb-0">
                <div class="block block-rounded border">
                  <div class="block-header block-header-default py-1">
                    <h3 class="block-title text-primary">
                      <i class="fa fa-box pe-2"></i>
                      کالا و خدمات
                    </h3>
                    <div class="block-options">
                      <!-- Button trigger modal -->
                      <button title="افزودن کالا/خدمات جدید" type="button" class="btn-block-option"
                        data-bs-toggle="modal" data-bs-target="#quickComodityAdd">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="block-content pt-1 px-1">
                    <v-select dir="rtl" @search="searchCommodity" :options="commodity" label="name"
                      v-model="itemData.commodity" class="">
                      <template #no-options="{ search, searching, loading }">
                        وردی یافت نشد!
                      </template>
                      <template v-slot:option="option">
                        <div class="row mb-1">
                          <div class="col-12">
                            <i class="fa fa-box me-1"></i>
                            {{ option.name }}
                          </div>
                          <div class="col-12">
                            <small v-if="option.khadamat == false">
                              <i class="fa fa-store me-1"></i>
                              <small class="text-danger">
                                موجودی:
                              </small>
                              <label style="direction: ltr;">
                                {{ option.count }}
                              </label>
                              {{ option.unit }}
                            </small>
                          </div>
                        </div>
                      </template>
                    </v-select>

                  </div>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="block block-rounded border">
                  <div class="block-header block-header-default py-1">
                    <h3 class="block-title text-primary">
                      <i class="fa-regular fa-note-sticky"></i>
                      شرح
                    </h3>
                    <div class="block-options">

                    </div>
                  </div>
                  <div class="block-content p-0">
                    <input v-model="this.itemData.des" class="form-control" type="text">
                  </div>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-floating mb-3">
                  <money3 v-bind="unitConfig" class="form-control" v-model.number="this.itemData.count" />
                  <label v-if="itemData.commodity" for="floatingInput">{{ itemData.commodity.unitData.name }}</label>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="input-group mb-3">
                  <div class="form-floating mb-3">
                    <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="this.itemData.price" />
                    <label for="floatingInput">قیمت واحد</label>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-floating mb-3">
                  <money3 v-bind="currencyConfig" class="form-control" v-model.number="this.itemData.discount" />
                  <label for="floatingInput">تخفیف</label>
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-floating mb-3">
                  <money3 readonly="readonly" v-bind="currencyConfig" class="form-control"
                    v-model.number="this.itemData.sumWithoutTax" />
                  <label for="floatingInput">قیمت کل</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="addItem">
              <i class="fa fa-save"></i>
              افزودن
            </button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <span class="text-primary"> اقلام فاکتور </span>
            <span class="text-secondary">({{ items.length }} قلم)</span>
            <!-- Button trigger convas add commodity -->
            <button class="btn btn-sm float-end btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
              <i class="fa fa-plus"></i>
              افزودن ردیف جدید
            </button>
            <EasyDataTable table-class-name="customize-table" class="mt-3" v-model:items-selected="itemsSelected"
              show-index alternating :headers="headers" :items="items" theme-color="#1d90ff"
              header-text-direction="center" body-text-direction="center" rowsPerPageMessage="تعداد سطر"
              emptyMessage="هیچ آیتمی به این فاکتور افزوده نشده است." rowsOfPageSeparatorMessage="از">
              <template #item-operation="{ index }">
                <span class="text-danger px-1" @click="deleteItem(index)">
                  <i class="fa fa-trash"></i>
                </span>
              </template>
              <template #item-sumTotal="{ sumTotal }">
                {{ this.$filters.formatNumber(sumTotal) }}
              </template>
              <template #item-sumWithoutTax="{ sumWithoutTax }">
                {{ this.$filters.formatNumber(sumWithoutTax) }}
              </template>
              <template #item-price="{ price }">
                {{ this.$filters.formatNumber(price) }}
              </template>
              <template #item-commodity.name="{ commodity }">
                {{ commodity.code }} - {{ commodity.name }}
              </template>
              <template #item-tax="{ tax }">
                {{ this.$filters.formatNumber(tax) }}
              </template>
              <template #item-discount="{ discount }">
                {{ this.$filters.formatNumber(discount) }}
              </template>
              <template #item-count="{ count, commodity }">
                {{ count }} {{ commodity.unit }}
              </template>
            </EasyDataTable>
            <div class="row mt-2">
              <div class="col-sm-12 col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    <input v-model="maliyatCheck" class="form-check-input mt-0 me-2" type="checkbox"
                      aria-label="Checkbox for following text input">
                    مالیات
                    %
                  </span>
                  <money3 :disabled="!maliyatCheck" v-bind="unitConfig" aria-label="مالیات بر ارزش افزوده"
                    class="form-control" v-model.number="maliyatPercent" />
                </div>
              </div>
              <div class="col-sm-12 col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    تخفیف
                  </span>
                  <money3 v-bind="currencyConfig" aria-label="تخفیف روی فاکتور" class="form-control"
                    v-model.number="data.discountAll" />
                </div>
              </div>
              <div class="col-sm-12 col-md-4">
                <div class="input-group input-group-sm mb-2">
                  <span class="input-group-text" id="inputGroup-sizing-sm">
                    حمل و نقل
                  </span>
                  <money3 v-bind="currencyConfig" aria-label="مالیات بر ارزش افزوده" class="form-control"
                    v-model.number="data.transferCost" />
                </div>
              </div>
            </div>
            <div class="container-fluid p-0 mx-0 mt-2">
              <a class="block block-rounded block-link-shadow border-start border-success border-3"
                href="javascript:void(0)">
                <div class="block-content block-content-full block-content-sm bg-body-light">
                  <div class="row">
                    <div class="col-sm-12 col-md-4">
                      <span class="text-dark">
                        <i class="fa fa-list-dots"></i>
                        مالیات:
                      </span>
                      <span class="text-primary">
                        {{ this.$filters.formatNumber(this.sumTax) }}
                        ریال
                      </span>
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <span class="text-dark">
                        <i class="fa fa-list-check"></i>
                        جمع مبلغ موارد انتخابی:
                      </span>
                      <span class="text-primary">
                        {{ this.$filters.formatNumber(this.sumSelected) }}
                        ریال
                      </span>
                    </div>
                    <div class="col-sm-12 col-md-4">
                      <span class="text-dark">
                        <i class="fa fa-list-dots"></i>
                        جمع کل:
                      </span>
                      <span class="text-primary">
                        {{ this.$filters.formatNumber(this.sumTotal) }}
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
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import Treeselect from 'vue3-treeselect'
import quickView from "../component/person/quickView.vue";
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'
import { Money3 } from "v-money3";
import quickAdd from "../component/person/quickAdd.vue";
import quickAddCommodity from "../component/commodity/quickAddCommodity.vue";
import mostdes from "../component/mostdes.vue";
import { format, unformat } from "v-money3";
export default {
  name: "mod",
  components: {
    Money3,
    Loading,
    Treeselect,
    quickView,
    quickAdd,
    quickAddCommodity,
    mostdes
  },
  data: () => {
    return {
      maliyatCheck: true,
      maliyatPercent: 0,
      bid: {
        maliyatafzode: 0
      },
      desSubmit: {
        id: '',
        des: ''
      },
      sumSelected: 0,
      sumTax: 0,
      sumTotal: 0,
      itemsSelected: [],
      items: [],
      headers: [
        { text: "کالا", value: "commodity.name" },
        { text: "شرح", value: "des" },
        { text: "تعداد/مقدار", value: "count" },
        { text: "مبلغ واحد", value: "price" },
        { text: "تخفیف", value: "discount" },
        { text: "مالیات", value: "tax" },
        { text: "جمع بدون مالیات", value: "sumWithoutTax" },
        { text: "مبلغ کل", value: "sumTotal" },
        { text: "عملیات", value: "operation" },
      ],
      selectedPersonWithDet: {},
      isLoading: false,
      canSubmit: true,
      updateID: null,
      sum: 0,
      balance: 0,
      currencyConfig: {
        masked: false,
        prefix: '',
        suffix: 'ریال',
        thousands: ',',
        decimal: '.',
        precision: 0,
        disableNegative: true,
        disabled: false,
        min: 0,
        max: null,
        allowBlank: false,
        minimumNumberOfCharacters: 1,
        shouldRound: false,
        focusOnRight: true,
      },
      unitConfig: {
        masked: false,
        prefix: '',
        suffix: '',
        thousands: ',',
        decimal: '.',
        precision: 0,
        disableNegative: true,
        disabled: false,
        allowBlank: false,
        shouldRound: false,
        focusOnRight: true,
      },
      data: {
        date: '',
        des: '',
        person: '',
        transferCost: 0,
        discountAll: 0
      },
      year: '',
      persons: [],
      commodity: [],
      units: [],
      itemData: {
        id: 0,
        commodity: {
          unit: '',
          unitData: {
            name: '',
            floatNumber: 0
          }
        },
        count: 0,
        price: 0,
        sumTotal: 0,
        sumWithoutTax: 0,
        tax: 0,
        des: '',
        discount: 0,
      }
    }
  },
  watch: {
    'desSubmit.id': function () {
      this.data.des = this.desSubmit.des;
    },
    'itemData.price': function () {
      this.calc();
    },
    'itemData.discount': function () {
      this.calc();
    },
    'maliyatCheck': function (item) {
      if (item === false) {
        this.maliyatPercent = 0;
      }
      else {
        this.maliyatPercent = this.bid.maliyatafzode;
      }
    },
    'maliyatPercent': function (newVal) {
      if (this.maliyatPercent == '') {
        this.maliyatPercent = 0;
      }
      this.items.forEach((item, index) => {
        item.sumWithoutTax = (item.price * item.count) - item.discount;
        item.tax = (((item.price * item.count) - item.discount) * (newVal)) / 100;
        item.sumTotal = (((parseFloat(item.price) * parseFloat(item.count)) - parseFloat(item.discount)) * (100 + parseFloat(newVal))) / 100;
      })
    },
    'itemData.count': function () {
      this.calc();
    },
    'itemData.commodity': function (newVal, oldVal) {
      if (newVal != '' && newVal != undefined) {
        this.itemData.price = this.itemData.commodity.priceBuy;
        this.unitConfig.precision = this.itemData.commodity.unitData.floatNumber;
        this.itemData.des = this.itemData.commodity.des;
      }
    },
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item) => {
          this.sumSelected += parseFloat(item.sumTotal);
        })
      },
      deep: true
    },
    items: {
      handler: function (val, oldVal) {
        this.calcInvoice();
      },
      deep: true
    },
    'data.transferCost': {
      handler: function (val, oldVal) {
        this.calcInvoice();
      },
      deep: false
    },
    'data.discountAll': {
      handler: function (val, oldVal) {
        this.calcInvoice();
      },
      deep: false
    },
    'data.person': {
      handler: function (val, oldVal) {
        axios.post('/api/person/info/' + this.data.person.code).then((response) => {
          this.selectedPersonWithDet = response.data;
        });
      },
      deep: true
    },
  },
  mounted() {

  },
  beforeMount() {
    this.loadData();
  },
  beforeRouteUpdate(to, from) {
    this.loadData(to.params.id);
  },
  methods: {
    searchPerson(query, loading) {
      loading(true);
      axios.post('/api/person/list/search', { search: query }).then((response) => {
        this.persons = response.data;
        loading(false);
      });
    },
    searchCommodity(query, loading) {
      loading(true);
      axios.post('/api/commodity/list/search', { search: query }).then((response) => {
        this.commodity = response.data;
        loading(false);
      });
    },
    calc() {
      this.itemData.sumWithoutTax = (this.itemData.price * this.itemData.count) - this.itemData.discount;
      if (this.itemData.commodity.withoutTax) {
        this.itemData.tax = 0;
        this.itemData.sumTotal = (parseFloat(this.itemData.price) * parseFloat(this.itemData.count)) - parseFloat(this.itemData.discount);
      }
      else {
        this.itemData.tax = (((this.itemData.price * this.itemData.count) - this.itemData.discount) * (this.maliyatPercent)) / 100;
        this.itemData.sumTotal = (((parseFloat(this.itemData.price) * parseFloat(this.itemData.count)) - parseFloat(this.itemData.discount)) * (100 + parseFloat(this.maliyatPercent))) / 100;
      }
    },
    calcInvoice() {
      this.sumTotal = 0;
      this.sumTax = 0;
      this.items.forEach((item) => {
        this.sumTotal += parseFloat(item.sumTotal);
        if (item.commodity.withoutTax == true) {
          item.tax = 0;
        }
        else {
          this.sumTax += parseFloat(item.tax);
        }
      });
      this.sumTotal += this.data.transferCost;
      this.sumTotal -= this.data.discountAll;
    },
    addItem() {
      if (this.itemData.count == 0) {
        Swal.fire({
          text: 'تعداد صفر نامعتبر است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else if (this.itemData.price == 0) {
        Swal.fire({
          text: 'قیمت صفر نامعتبر است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else if (this.itemData.commodity == '' || this.itemData.commodity == undefined) {
        Swal.fire({
          text: 'کالایی انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      }
      else {
        this.items.push(this.itemData);
        this.itemData = {
          id: 0,
          commodity: this.commodity[0],
          count: 0,
          price: 0,
          sumTotal: 0,
          sumWithoutTax: 0,
          tax: 0,
          des: '',
          discount: 0,
        }
        Swal.fire({
          text: 'آیتم به فاکتور افزوده شد.',
          icon: 'success',
          confirmButtonText: 'قبول'
        });
      }

    },
    deleteItem(index) {
      Swal.fire({
        text: 'آیا برای حذف این مورد مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بله',
        cancelButtonText: `خیر`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.items.splice(index - 1, 1);
        }
      })
    },
    loadData() {
      this.isLoading = true;
      //load year
      axios.get('/api/year/get').then((response) => {
        this.year = response.data;
        this.data.date = response.data.now;
      })
      //load business info
      axios.get('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.bid = response.data;
        if (this.bid.maliyatafzode == 0) {
          this.maliyatCheck = false;
        }
        this.maliyatPercent = this.bid.maliyatafzode;
        this.isLoading = false;
      })
      //load persons
      axios.get('/api/person/list/search').then((response) => {
        this.persons = response.data;
      });
      //load commodities
      axios.get('/api/commodity/list/search').then((response) => {
        this.commodity = response.data;
        if (response.data.length != 0) {
          this.itemData.commodity = response.data[0];
        }
        else {
          Swal.fire({
            text: 'برای ثبت فاکتور برگشت از فروش ابتدا یک کالای جدید تعریف کنید.',
            icon: 'warning',
            confirmButtonText: 'تعریف کالای جدید'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/acc/commodity/mod/');
            }
          });
        }
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response) => {
        this.units = response.data;
      });

      //load data for edit document

      if (this.$route.params.id != '') {
        axios.get('/api/rfsell/get/info/' + this.$route.params.id).then((response) => {
          this.data.date = response.data.date;
          this.data.des = response.data.des;
          this.data.person = response.data.person;
          this.data.transferCost = response.data.transferCost
          this.data.discountAll = response.data.discountAll
          response.data.rows.forEach((item, key) => {
            if (item.commodity != null) {
              this.items.push({
                commodity: item.commodity,
                count: item.commodity_count,
                price: parseInt((parseInt(item.bd) - parseInt(item.tax) + parseInt(item.discount) ) / parseInt(item.commodity_count)),
                bs: item.bs,
                bd: item.bd,
                type: 'commodity',
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
      }
    },
    save() {
      this.canSubmit = false;
      if (this.items.length == 0) {
        Swal.fire({
          text: 'فاکتور فاقد کالا می باشد.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else if (this.data.person == null || this.data.person == '') {
        Swal.fire({
          text: 'طرف حساب انتخاب نشده است.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else {
        this.isLoading = true;
        axios.post('/api/rfsell/mod', {
          type: 'rfsell',
          date: this.data.date,
          des: this.data.des,
          person: this.data.person,
          rows: this.items,
          discountAll:this.data.discountAll,
          transferCost:this.data.transferCost,
          update: this.$route.params.id
        }).then((response) => {
          this.isLoading = false;
          if (response.data.code == 0) {
            Swal.fire({
              text: 'فاکتور ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/rfsell/list')
            });
          }
          else{
            Swal.fire({
              text: response.data.message,
              icon: 'error',
              confirmButtonText: 'قبول'
            })
          }

        })
      }
      this.canSubmit = true;
    }
  }
}
</script>

<style scoped></style>