<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <router-link class="text-warning mx-2 px-2" to="/acc/buy/list">
          <i class="fa fw-bold fa-arrow-right"></i>
        </router-link>
        فاکتور برگشت از فروش
      </h3>
      <div class="block-options">
        <button :disabled="this.canSubmit != true" @click="save()" type="button" class="btn btn-sm btn-alt-primary">
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
                  مشتری
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
      <!-- Modal -->
      <div class="modal modal-xl fade" id="addCommodityModal" tabindex="-1" aria-labelledby="addCommodityModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title text-primary fs-5" id="addCommodityModalLabel">افزودن اقلام فاکتور</h1>
              <div class="block-options">
                <button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-sm-12 col-md-5 mb-2">
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
                  <div class="col-sm-12 col-md-12 mb-2">
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
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
              <button class="btn btn-success" @click="addItem">
                <i class="fa fa-save"></i>
                افزودن به فاکتور
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <span class="text-primary"> اقلام فاکتور </span>
            <span class="text-secondary">({{ items.length }} قلم)</span>
            <!-- Button trigger modal add commodity -->
            <button type="button" class="btn btn-sm float-end btn-primary" data-bs-toggle="modal"
              data-bs-target="#addCommodityModal">
              <i class="fa fa-plus"></i>
              افزودن ردیف جدید
            </button>
            <EasyDataTable table-class-name="customize-table" class="mt-3" v-model:items-selected="itemsSelected" show-index alternating :headers="headers"
              :items="items" theme-color="#1d90ff" header-text-direction="center" body-text-direction="center"
              rowsPerPageMessage="تعداد سطر" emptyMessage="هیچ آیتمی به این فاکتور افزوده نشده است."
              rowsOfPageSeparatorMessage="از">
              <template #item-operation="{ index }">
                <span class="text-danger px-1" @click="deleteItem(index)">
                  <i class="fa fa-trash"></i>
                </span>
              </template>
            </EasyDataTable>
            <div class="container-fluid p-0 mx-0 my-3">
              <a class="block block-rounded block-link-shadow border-start border-success border-3"
                href="javascript:void(0)">
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
      desSubmit:{
        id:'',
        des:''
      },
      sumSelected: 0,
      sumTotal: 0,
      itemsSelected: [],
      items: [],
      selectedPersonWithDet: {},
      headers: [
        { text: "کد کالا", value: "commodity.code" },
        { text: "کالا", value: "commodity.name" },
        { text: "شرح", value: "des" },
        { text: "واحد", value: "commodity.unit" },
        { text: "تعداد", value: "count" },
        { text: "مبلغ واحد", value: "price" },
        { text: "مبلغ کل", value: "bd" },
        { text: "عملیات", value: "operation" },
      ],
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
      persons: [],
      commodity: [],
      units: [],
      itemData: {
        commodity: '',
        count: 1,
        price: 0,
        bs: 0,
        bd: 0,
        type: 'commodity',
        id: 0,
        des: 'کالا و خدمات',
        table: 120
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
    'itemData.count': function () {
      this.calc();
    },
    'itemData.commodity': function (newVal, oldVal) {
      if (newVal != '') {
        this.itemData.price = this.itemData.commodity.priceBuy.valueOf();
      }
      this.itemData.des = this.itemData.commodity.des;
    },
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item) => {
          this.sumSelected += parseInt(item.bd.replaceAll(',', ''));
        })
      },
      deep: true
    },
    items: {
      handler: function (val, oldVal) {
        this.sumTotal = 0;
        this.items.forEach((item) => {
          this.sumTotal += parseInt(item.bd.replaceAll(',', ''));
        })
      },
      deep: true
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
      this.itemData.bd = this.itemData.price.valueOf() * this.itemData.count.valueOf()
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
        this.itemData.price = this.$filters.formatNumber(this.itemData.price);
        this.itemData.count = this.$filters.formatNumber(this.itemData.count);
        this.itemData.bd = this.$filters.formatNumber(this.itemData.bd);
        this.items.push(this.itemData);
        this.itemData = {
          commodity: this.commodity[0],
          count: 1,
          price: 0,
          bs: 0,
          bd: 0,
          type: 'commodity',
          id: this.commodity[0].id,
          des: 'کالا و خدمات',
          table: 120
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
      //load year
      axios.get('/api/year/get').then((response) => {
        this.year = response.data;
        this.data.date = response.data.now;
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
            text: 'برای ثبت فاکتور خرید ابتدا یک کالای جدید تعریف کنید.',
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
          response.data.rows.forEach((item, key) => {
            if (item.commodity != null) {
              this.items.push({
                commodity: item.commodity,
                count: item.commodity_count,
                price: this.$filters.formatNumber(parseInt(parseInt(item.bd) / parseInt(item.commodity_count))),
                bs: this.$filters.formatNumber(item.bs),
                bd: item.bd,
                type: 'commodity',
                id: item.commodity.id,
                des: item.des,
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
          text: ' خریدار انتخاب نشده است.',
          icon: 'warning',
          confirmButtonText: 'قبول'
        });
      }
      else {
        // add tamin konanade
        let bs = 0;
        this.items.forEach((item) => {
          bs = bs + parseInt(item.bd.replace(/,(?=\d{3})/g, ''));
        })
        this.items.push({
          commodity: this.commodity[0],
          bs: bs,
          bd: 0,
          type: 'person',
          id: this.data.person.id,
          des: 'برگشت کالا به خریدار',
          table: 3
        });
        axios.post('/api/accounting/insert', {
          type: 'rfsell',
          date: this.data.date,
          des: this.data.des,
          rows: this.items,
          update: this.$route.params.id
        }).then((response) => {
          this.items.pop();
          Swal.fire({
            text: 'فاکتور ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول'
          }).then(() => {
            this.$router.push('/acc/rfsell/list')
          });
        })
      }
      this.canSubmit = true;
    }
  }
}
</script>

<style scoped></style>