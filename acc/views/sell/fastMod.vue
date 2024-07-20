<script lang="ts">
import {defineComponent} from 'vue'
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import quickAddCommodity from "../component/commodity/quickAddCommodity.vue";
import quickView from "../component/person/quickView.vue";
import quickAdd from "../component/person/quickAdd.vue";

export default defineComponent({
  name: "fastMod",
  components: {
    quickAddCommodity,
    quickView,
    quickAdd,
  },
  data: () => {
    return {
      canSubmitRecpDoc: true,
      canPdf: true,
      canPrint: true,
      canPrintCashdeskRecp: false,
      update: 0,
      commodity: [],
      selectedCommodity: null,
      tempID: '',
      year: {},
      data: {
        des: '',
        date: '',
        items: []
      },
      itemsSelected: [],
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
      units: [],
      persons: [],
      person: {
        nikename: ''
      },
      cashdesks: [],
      cashdesk: null,
      commoditySpeedAccess: [],
      loading: ref(true),
      sumSelected: 0,
      sumTotal: 0,
      headers: [
        { text: "کالا", value: "commodity.name" },
        { text: "تعداد", value: "count", width: "100" },
        { text: "واحد", value: "commodity.unit" },
        { text: "مبلغ واحد(ریال)", value: "commodity.priceSell" },
        { text: "مبلغ کل(ریال)", value: "bs" },
        { text: "عملیات", value: "operation" },
      ]
    }
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
    calcInvoice() {
      this.sumTotal = 0;
      this.data.items.forEach((item) => {
        this.sumTotal += parseFloat(item.bs);
        item.bs = item.count * item.commodity.priceSell
      });
    },
    newPage(withMessage = true) {
      if (withMessage == true) {
        if (this.data.items.length != 0) {
          Swal.fire({
            text: 'آیا فاکتور کنونی را نادیده می گیرید؟',
            showCancelButton: true,
            confirmButtonText: 'بله',
            cancelButtonText: `خیر`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.loadData();
              this.data.items = [];
            }
          });
        }
      }
      else {
        this.loadData();
        this.data.items = [];
      }
    },
    getCount(commodity) {
      let res = 0;
      this.data.items.forEach((item) => {
        if (item.commodity.code === commodity.code) {
          res = item.count;
        }
      });
      return res;
    },
    addFastItem(commodity) {
      let addNew = true;
      this.data.items.forEach((item) => {
        if (item.commodity.code == commodity.code) {
          item.count++;
          item.bs += commodity.priceSell;
          addNew = false;
        }
      });
      if (addNew) {
        var it = {
          commodity: commodity,
          id: 0,
          bs: parseInt(commodity.priceSell),
          bd: 0,
          count: 1,
          price: parseInt(commodity.priceSell),
          type: 'commodity',
          des: '',
          table: 53,
          unitFormat: JSON.parse(JSON.stringify(this.unitConfig)),
          arrayIndex: this.data.items.length
        }
        it.unitFormat.precision = commodity.unitData.floatNumber;
        this.data.items.push(it);
      }

    },
    loadData() {
      //load year
      axios.get('/api/year/get').then((response) => {
        this.year = response.data;
        this.data.date = response.data.now;
      })
      //load persons
      axios.post('/api/person/list/limit', { speedAccess: true }).then((response) => {
        this.persons = response.data;
        if (response.data.length != 0) {
          this.person = response.data[0];
        }
      });
      //get cashdesks
      axios.post('/api/cashdesk/list', { speedAccess: true }).then((response) => {
        this.cashdesks = response.data;
        if (response.data.length != 0) {
          this.cashdesk = response.data[0];
        }
      });
      //load commodities
      axios.post('/api/commodity/list', { speedAccess: true }).then((response) => {
        this.commoditySpeedAccess = response.data;
        this.commodity = response.data;
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response) => {
        this.units = response.data;
      });
      this.loading = false;
    },
    save() {
      if (this.data.items.length === 0) {
        Swal.fire({
          text: 'فاکتور فاقد کالا می‌باشد.',
          icon: 'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else if (this.person === null) {
        Swal.fire({
          text: 'مشتری انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else if (this.cashdesk === null) {
        Swal.fire({
          text: 'صندوق انتخاب نشده است.',
          icon: 'error',
          confirmButtonText: 'بازگشت',
        });
      }
      else {
        this.loading = true;
        let outItems = [
          ...this.data.items
        ];
        //save data
        let bd = 0;
        this.data.items.forEach((item) => {
          bd = bd + parseInt(item.bs);
        })
        outItems.push({
          bs: 0,
          bd: bd,
          type: 'person',
          id: this.person.id,
          des: 'فروش کالا به مشتری',
          table: 3
        });
        axios.post('/api/accounting/insert', {
          type: 'sell',
          date: this.data.date,
          des: this.data.des,
          rows: outItems,
          update: ''
        }).then((response) => {
          this.update = response.data.doc.code;
          this.loading = false;
          if (this.canPrint || this.canPrintCashdeskRecp) {
            axios.post('/api/sell/posprinter/invoice', {
              code: this.update,
              pdf: this.canPdf,
              posPrint: this.canPrint,
              posPrintRecp: this.canPrintCashdeskRecp
            }).then((response) => {
              if (this.canPdf) {
                this.printID = response.data.id;
                window.open(this.$API_URL + '/front/print/' + this.printID, '_blank', 'noreferrer');
              }
            })
          }
          if (this.canSubmitRecpDoc) {
            outItems = [];
            outItems.push({
              bs: bd,
              bd: 0,
              type: 'person',
              id: this.person.id,
              des: 'دریافت وجه فاکتور',
              table: 3
            });
            outItems.push({
              bs: 0,
              bd: bd,
              type: 'cashdesk',
              id: this.cashdesk.id,
              des: 'دریافت وجه فاکتور',
              table: 121
            });
            this.tempID = response.data.doc.code;
            axios.post('/api/accounting/insert', {
              type: 'sell_receive',
              date: this.data.date,
              des: 'دریافت وجه فاکتور',
              rows: outItems,
              update: '',
              related: response.data.doc.code
            }).then((response) => {

            });
          }
          Swal.fire({
            text: 'فاکتور ثبت شد.',
            icon: 'success',
            confirmButtonText: 'قبول'
          }).then(() => {
            this.newPage(false);
          });
        })
      }
    },
    deleteItem(code) {
      if (this.data.items.length == 1) {
        this.data.items = [];
      }
      else {
        let index = 0;
        for (let z = 0; z < this.data.items.length; z++) {
          index++;
          if (this.data.items[z]['commodity']['code'] == code) {
            this.data.items.splice(index - 1, 1);
          }
        }
        for (let z = 0; z < this.data.items.length; z++) {
          this.data.items[z].arrayIndex = z;
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
  },
  watch: {
    itemsSelected: {
      handler: function (val, oldVal) {
        this.sumSelected = 0;
        this.itemsSelected.forEach((item) => {
          this.sumSelected += parseFloat(item.bs);
        })
      },
      deep: true
    },
    'data.items': {
      handler: function (val, oldVal) {
        this.calcInvoice();
      },
      deep: true
    },
    'selectedCommodity': {
      handler: function (val, oldVal) {
        if (this.selectedCommodity != null) {
          this.commoditySpeedAccess.push(this.selectedCommodity);
          this.selectedCommodity = null;
        }
      },
      deep: true
    },
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button"
          class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-car"></i>
        فاکتور سریع
      </h3>
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
        <div class="col-sm-12 col-md-3 mx-0 pe-0 ps-1">
          <div class="card">
            <div class="card-header">
              <i class="fa fa-boxes me-2"></i>
              کالا ها و خدمات
              <div class="block-options float-end">
                <button title="افزودن کالا/خدمات جدید" type="button" class="btn-block-option" data-bs-toggle="modal"
                  data-bs-target="#quickComodityAdd">
                  <i class="fa fa-plus"></i>
                </button>
                <quickAddCommodity></quickAddCommodity>
              </div>
            </div>
            <div class="card-body p-0">
              <v-select dir="rtl" @search="searchCommodity" :options="commodity" label="name"
                v-model="selectedCommodity" class="rounded-0 m-1">
                <template #no-options="{ search, searching, loading }">
                  وردی یافت نشد!
                </template>

              </v-select>
              <ul class="list-group rounded-0">
                <button @click="addFastItem(cm)" v-for="cm in this.commoditySpeedAccess"
                  class="list-group-item d-flex justify-content-between align-items-center">
                  {{ cm.name }}
                  <span class="badge text-bg-primary rounded-pill">
                    {{ this.getCount(cm) + ' ' + cm.unit }}

                  </span>
                </button>
              </ul>
            </div>
          </div>
          <div class="card mt-2">
            <div class="card-header">
              <i class="fa fa-user me-2"></i>
              مشتری
              <div class="block-options float-end">
                <quickView :code="this.person.code"></quickView>
                <quickAdd :code="this.person.code"></quickAdd>
              </div>
            </div>
            <div class="card-body p-1">
              <v-select :filterable="false" dir="rtl" @search="searchPerson" :options="persons" label="nikename"
                v-model="person">
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
              <v-select dir="rtl" :options="cashdesks" label="name" v-model="cashdesk">
                <template #no-options="{ search, searching, loading }">
                  وردی یافت نشد!
                </template>
              </v-select>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-9">
          <EasyDataTable table-class-name="customize-table" show-index :headers="headers"
            v-model:items-selected="itemsSelected" :items="data.items" theme-color="#1d90ff"
            header-text-direction="center" border-cell body-text-direction="center" rowsPerPageMessage="تعداد سطر"
            emptyMessage="اطلاعاتی برای نمایش وجود ندارد" rowsOfPageSeparatorMessage="از" :loading="loading">
            <template #item-commodity.priceSell="{ commodity, arrayIndex }">
              <money3 v-model="data.items[arrayIndex].commodity.priceSell" v-bind="unitConfig"
                class="form-control form-control-sm border-0 text-center" />
            </template>
            <template #item-commodity.name="{ commodity }">
              <span>{{ this.$filters.formatNumber(commodity.code) + ' - ' + commodity.name }}</span>
            </template>
            <template #item-bs="{ bs }">
              <span>{{ this.$filters.formatNumber(bs) }}</span>
            </template>
            <template #item-count="{ unitFormat, arrayIndex }">
              <money3 v-model="data.items[arrayIndex].count" v-bind="unitFormat"
                class="form-control form-control-sm border-0 text-center" />
            </template>
            <template #item-operation="{ commodity }">
              <span class="text-danger px-1" @click="deleteItem(commodity.code)">
                <i class="fa fa-trash"></i>
              </span>
            </template>
          </EasyDataTable>
          <div class="container-fluid p-0 mx-0 mt-2">
            <a class="block block-rounded block-link-shadow border-start border-success border-3"
              href="javascript:void(0)">
              <div class="block-content block-content-full block-content-sm bg-body-light">
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <span class="text-dark">
                      <i class="fa fa-list-check"></i>
                      جمع مبلغ موارد انتخابی:
                    </span>
                    <span class="text-primary">
                      {{ this.$filters.formatNumber(this.sumSelected) }}
                      ریال
                    </span>
                  </div>
                  <div class="col-sm-12 col-md-6">
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
          <div class="accordion" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  <i class="fa-solid fa-file-invoice me-2"></i>
                  جزئیات فاکتور
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="">
                        <label class="form-label">تاریخ:</label>
                        <date-picker class="" v-model="data.date" format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD"
                          :min="year.start" :max="year.end" />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <div class="">
                        <label class="form-label">شرح:</label>
                        <input class="form-control form-control-sm" v-model="data.des" type="text">
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-2">
                      <span class="form-check form-switch  form-check-inline">
                        <input :disabled="this.loading" v-model="canSubmitRecpDoc" class="form-check-input"
                          type="checkbox">
                        <label class="form-check-label">
                          ثبت خودکار سند دریافت وجه فاکتور
                        </label>
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  <i class="fa fa-print me-2"></i>
                  تنظیمات چاپ
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-sm-12 col-md-4">
                      <span class="form-check form-switch  form-check-inline">
                        <input :disabled="this.loading" v-model="canPrint" class="form-check-input" type="checkbox">
                        <label class="form-check-label">
                          <i class="fa-solid fa-cloud me-1"></i>
                          صورت حساب
                        </label>
                      </span>
                    </div>
                    <div class="col-sm-12 col-md-4">
                      <span class="form-check form-switch  form-check-inline">
                        <input :disabled="this.loading" v-model="canPrintCashdeskRecp" class="form-check-input"
                          type="checkbox">
                        <label class="form-check-label">
                          <i class="fa-solid fa-cloud me-1"></i>
                          قبض صندوق
                        </label>
                      </span>
                    </div>
                    <div class="col-sm-12 col-md-4">
                      <span class="form-check form-switch  form-check-inline">
                        <input :disabled="this.loading" v-model="canPdf" class="form-check-input" type="checkbox">
                        <label class="form-check-label">
                          <i class="fa-regular fa-file-pdf me-1"></i>
                          خروجی PDF
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
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