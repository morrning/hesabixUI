<template>
  <div class="block block-content-full ">
    <div class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn btn-sm btn-link text-warning mx-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        قبض تحویل
      </h3>
      <div class="block-options">
        <span class="form-check form-switch  form-check-inline">
                <input v-model="data.sms" class="form-check-input" type="checkbox">
                <label class="form-check-label"> پیامک</label>
        </span>
        <button @click="save()" type="button" class="btn btn-sm btn-alt-primary">
          <i class="fa fa-floppy-disk"></i>
          ثبت</button>
      </div>
    </div>
    <div class="block-content py-3 vl-parent px-0">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
      <quickAddCommodity></quickAddCommodity>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-4 mb-1">
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
                  <date-picker class="my-0 py-0" v-model="data.date" format="jYYYY-jMM-jDD" display-format="jYYYY-jMM-jDD"
                    :min="year.start" :max="year.end" />
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 mb-1">
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
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-4 mb-1">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa fa-box pe-2"></i>
                  کالا و خدمات
                </h3>
                <div class="block-options">
                  <!-- Button trigger modal -->
                  <button title="افزودن کالا/خدمات جدید" type="button" class="btn-block-option" data-bs-toggle="modal"
                    data-bs-target="#quickComodityAdd">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="block-content pt-1 px-1">
                <v-select dir="rtl" @search="searchCommodity" :options="commodity" label="name"
                  v-model="data.commodity" class="">
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
          <div class="col-sm-12 col-md-12">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa-regular fa-note-sticky"></i>
                  شرح
                </h3>
                <div class="block-options">
                  <mostdes :submitData="desSubmit" type="repservice"></mostdes>
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
      <div class="container">
        <div class="row">

          <div class="col-sm-12 col-md-12 mb-2">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa-regular fa-note-sticky"></i>
                  متعلقات
                </h3>
                <div class="block-options">

                </div>
              </div>
              <div class="block-content p-0">
                <input v-model="this.data.motaleghat" class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 mb-2">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa-regular fa-note-sticky"></i>
                  سریال
                </h3>
                <div class="block-options">

                </div>
              </div>
              <div class="block-content p-0">
                <input v-model="this.data.serial" class="form-control" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 mb-2">
            <div class="block block-rounded border">
              <div class="block-header block-header-default py-1">
                <h3 class="block-title text-primary">
                  <i class="fa-regular fa-note-sticky"></i>
                  پلاک
                </h3>
                <div class="block-options">

                </div>
              </div>
              <div class="block-content p-0">
                <input v-model="this.data.pelak" class="form-control" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { Money3 } from "v-money3";
import quickAdd from "../../component/person/quickAdd.vue";
import quickAddCommodity from "../../component/commodity/quickAddCommodity.vue";
import mostdes from "../../component/mostdes.vue";
import quickView from "../../component/person/quickView.vue";
export default {
  name: "mod",
  components: {
    Loading,
    Money3,
    quickView,
    quickAdd,
    quickAddCommodity,
    mostdes
  },
  data: () => {
    return {
      isLoading: false,
      desSubmit: {
        id: '',
        des: ''
      },
      data: {
        date: '',
        des: '',
        person: '',
        pelak:'',
        serial:'',
        sms:true,
        commodity: {
          id:'',
          name:'',
          unit: '',
          unitData: {
            name: '',
            floatNumber: 0
          }
        },
      },
      year: '',
      persons: [],
      commodity: [],
      headers: [
        { text: "کالا", value: "commodity.name" },
        { text: "شرح", value: "count" },
        { text: "عملیات", value: "operation" },
      ],
    }
  },
  mounted() {
    this.loadData(this.$route.params.id);
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
      //load business info
      axios.get('/api/business/get/info/' + localStorage.getItem('activeBid')).then((response) => {
        this.bid = response.data;
        if (this.bid.maliyatafzode == 0) {
          this.maliyatCheck = false;
        }
        this.maliyatPercent = this.bid.maliyatafzode;
      })
      //load persons
      axios.get('/api/person/list/search').then((response) => {
        this.persons = response.data;
      });
      //load commodities
      axios.get('/api/commodity/list/search').then((response) => {
        this.commodity = response.data;
        if (response.data.length != 0) {
          this.data.commodity = response.data[0];
        }
      });
      //load commodity units
      axios.get('/api/commodity/units').then((response) => {
        this.units = response.data;
      });

      //load data for edit document
    },
    save() {
      let canSubmit = true;
    }

  },
  watch: {
    'desSubmit.id': function () {
      this.data.des = this.desSubmit.des;
    },
  }
}
</script>

<style scoped></style>