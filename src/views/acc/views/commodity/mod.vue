<template>
  <!-- Modal -->
  <div class="modal modal-lg fade" data-bs-backdrop="static" data-bs-keyboard="false" id="pricesModal" tabindex="-1" aria-labelledby="pricesModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-primary-dark" id="pricesModalLabel">
            سایر قیمت‌های فروش
          </h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 col-md-12" v-for="price in data.prices">
              <div class="row">
                <div class="col-sm-6 col-md-6">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" readonly="readonly"
                      v-model="price.list.label">
                    <label for="floatingInput">لیست</label>
                  </div>
                </div>
                <div class="col-sm-6 col-md-6">
                  <div class="form-floating mb-3">
                    <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="price.priceSell" />
                    <label for="floatingInput">قیمت فروش</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12" v-if="data.prices.length == 0 && this.isLoading == false">
              <h5 class="text-danger">تاکنون هیچ لیست قیمتی ایجاد نشده است.برای ثبت قیمت‌های فرعی ابتدا یک لیست ایجاد
                کنید.</h5>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            <i class="fa fa-save me-2"></i>
            ثبت
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button type="button" @click="this.$router.back()" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        مشخصات کالا و خدمات
      </h3>
      <div class="block-options">
        <button @click="save()" type="button" class="btn btn-sm btn-alt-primary">
          <i class="fa fa-save me-1"></i>
          ثبت
        </button>
      </div>
    </div>
    <div class="block-content py-3 vl-parent">
      <loading color="blue" loader="dots" v-model:active="isLoading" :is-full-page="false" />
      <div class="container">
        <div class="row py-3">
          <div class="col-sm-12 col-md-12 mb-1">
            <div>
              <label class="me-4 text-primary">نوع کالا یا خدمات</label>
              <div class="form-check form-check-inline">
                <input v-model="this.data.khadamat" class="form-check-input" type="radio" value="true">
                <label class="form-check-label" for="inlineCheckbox1">خدمات</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="this.data.khadamat" class="form-check-input" type="radio" value="false">
                <label class="form-check-label" for="inlineCheckbox2">کالا و اقلام فیزیکی</label>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 mb-1">
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="this.data.speedAccess" class="form-check-input" type="checkbox">
                <label class="form-check-label">دسترسی سریع</label>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 mb-1">
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="this.data.withoutTax" class="form-check-input" type="checkbox">
                <label class="form-check-label">معاف از مالیات</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <input v-model="data.name" class="form-control" type="text">
              <label class="form-label"><span class="text-danger">(لازم)</span> نام کالا/خدمات</label>
            </div>
            <div class="form-floating mb-4">
              <select v-model="data.unit" class="form-select">
                <option v-for="option in units" :key="option.name" :value="option.name">
                  {{ option.name }}
                </option>
              </select>
              <label class="form-label">واحد شمارش</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="form-floating mb-4">
              <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="data.priceBuy" />
              <label class="form-label">قیمت خرید</label>
            </div>
            <div class="input-group mb-3">
              <button  v-if="isPluginActive('accpro')" class="input-group-text bg-alt-primary" type="button" title="لیست قیمت‌ها" data-bs-toggle="modal"
                data-bs-target="#pricesModal">
                <i class="fa fa-list"></i>
              </button>
              <div class="form-floating">
                <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="data.priceSell" />
                <label class="form-label">قیمت فروش</label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 mb-4">
            <small class="mb-2">دسته بندی</small>
            <select class="form-select" aria-label="دسته‌بندی" v-model="this.data.cat">
              <option v-for="(item, index) in listCats" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <div class="row mx-0 px-0">
            <div class="col-sm-12 col-md-12">
              <div class="form-floating mb-4">
                <input placeholder="بارکد‌ها را با ; از هم جدا کنید" v-model="data.barcodes" class="form-control"
                  type="text">
                <label class="form-label">
                  بارکد‌ها
                  <small class="text-danger">
                    (بارکد‌ها را با ; از هم جدا کنید)
                  </small>
                </label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div class="form-floating mb-4">
              <input v-model="data.des" class="form-control" type="text">
              <label class="form-label">توضیحات</label>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <b class="text-primary-dark me-3">موجودی کالا</b>
            <label class="text-muted">تنظیمات بخش موجودی کالا تنها برای نوع کالا اعمال می‌شود و برای نوع خدمات نادیده
              گرفته می‌شود.</label>
            <div class="space-y-2">
              <div class="form-check form-switch">
                <input v-model="data.commodityCountCheck" class="form-check-input" type="checkbox">
                <label class="form-check-label">کنترل موجودی</label>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-4 mt-2">
                <div class="form-floating mb-4">
                  <input v-model="data.minOrderCount"
                    @blur="(event) => { if (this.data.minOrderCount === '' || this.data.minOrderCount === 0) { this.data.minOrderCount = 1 } }"
                    @keypress="this.$filters.onlyNumber($event)" class="form-control" type="number" min="1">
                  <label class="form-label">حداقل سفارش</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mt-2">
                <div class="form-floating mb-4">
                  <input v-model="data.orderPoint" @keypress="this.$filters.onlyNumber($event)" class="form-control"
                    type="number" min="1">
                  <label class="form-label">نقطه سفارش</label>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 mt-2">
                <div class="form-floating mb-4">
                  <input v-model="data.dayLoading" @keypress="this.$filters.onlyNumber($event)" class="form-control"
                    type="number">
                  <label class="form-label">زمان انتظار(روز)</label>
                </div>
              </div>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { Money3 } from "v-money3";
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'

export default {
  name: "mod",
  components: {
    Treeselect: Treeselect,
    Loading,
    Money3
  },
  data: () => {
    return {
      isLoading: false,
      plugins:[],
      units: '',
      priceList: [],
      data: {
        name: '',
        priceSell: 0,
        priceBuy: 0,
        des: '',
        unit: 'عدد',
        code: 0,
        khadamat: false,
        cat: null,
        orderPoint: 0,
        commodityCountCheck: false,
        minOrderCount: 1,
        dayLoading: 0,
        speedAccess: false,
        withoutTax: false,
        barcodes: '',
        prices: []
      },
      listCats: [],
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
    }
  },
  mounted() {
    this.loadData(this.$route.params.id);
  },
  beforeRouteUpdate(to, from) {
    this.loadData(to.params.id);
  },
  methods: {
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
    loadData(id = '') {
      this.isLoading = true;
      //get active plugins
      axios.post('/api/plugin/get/actives',).then((response) => {
        this.plugins = response.data;
      });

      axios.post('/api/commodity/units').then((response) => {
        this.units = response.data;
      });

      if (id == '') {
        axios.get('/api/commodity/pricelist/list').then((response) => {
          if (response.data.length == 0) {
            this.data.prices = [];
          }
          else {
            this.priceList = response.data;
            this.priceList.forEach((item) => {
              this.data.prices.push({
                id: 0,
                priceBuy: 0,
                priceSell: 0,
                list: item
              });
            });
          }

        });
      }

      axios.post('/api/commodity/cat/get/line').then((response) => {
        this.listCats = response.data;
        if (!this.$route.params.id) {
          this.data.cat = response.data[1]
        }
      });
      if (id != '') {
        //load info
        this.isLoading = true;
        axios.post('/api/commodity/info/' + id).then((response) => {
          this.data = response.data;
          if (this.data.prices.length == 0) {
            console.log(this.priceList);
            this.data.prices = this.priceList;
          }
        });
      }
      this.isLoading = false;
    },
    save() {
      if (this.data.name.length === 0)
        Swal.fire({
          text: 'نام کالا یا خدمات الزامی است.',
          icon: 'error',
          confirmButtonText: 'قبول'
        });
      else {
        this.isLoading = true;
        axios.post('/api/commodity/mod/' + this.data.code, this.data).then((response) => {
          this.isLoading = false;
          if (response.data.result == 2) {
            Swal.fire({
              text: 'قبلا ثبت شده است.',
              icon: 'error',
              confirmButtonText: 'قبول'
            });
          } else {
            Swal.fire({
              text: 'مشخصات کالا و خدمات ثبت شد.',
              icon: 'success',
              confirmButtonText: 'قبول'
            }).then(() => {
              this.$router.push('/acc/commodity/list')
            });
          }
        })
      }

    }
  }
}
</script>

<style scoped>

</style>