<template>
  <div class="container-fluid mt-3">
    <div class="row" v-show="this.statements.length != 0">
      <div class="col-12">
        <div class="alert alert-primary alert-dismissible" role="alert">
          <h3 class="alert-heading fs-4 my-2">اعلانات</h3>
          <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
          <p v-for="statment in this.statements" class="mb-0">
            <b class="text-primary-dark">{{statment.dateSubmit}}: </b>
            <span v-html="statment.body"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row items-push">
          <div v-show="permissions.wallet" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0 bg-info text-light"
              to="/acc/wallet/view">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold  mb-1">{{ this.$filters.formatNumber(wallet.deposit) }} ریال</div>
                <p class="fw-semibold fs-sm  text-uppercase mb-0">
                  <i class="fa fa-wallet"></i>
                  <br>
                  کیف پول
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.persons" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/persons/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.personCount}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-users"></i>
                  <br>
                  اشخاص و مشتریان
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.bank" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/banks/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.bankCount}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-bank"></i>
                  <br>
                  حساب‌های بانکی
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.accounting" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/accounting/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{ stat.docCount }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-book-open-reader"></i>
                  <br>
                  لیست اسناد
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.commodity" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/commodity/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold text-primary mb-1">{{stat.commodity}}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-users"></i>
                  <br>
                  کالا و خدمات
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.accounting" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/reports/list">
              <div class="block-content py-5">
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.income) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-chart-line"></i>
                  <br>
                  گردش مالی
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.sell" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/sell/list">
              <div class="block-content ribbon ribbon-success py-5">
                <div class="ribbon-box">
                  امروز
                  {{ this.$filters.formatNumber(stat.sells_today) }}
                </div>
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.sells_total) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa-solid fa-money-bill-trend-up"></i>
                  <br>
                  فروش
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.buy" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/buy/list/">
              <div class="block-content ribbon ribbon-success py-5">
                <div class="ribbon-box">
                  امروز
                  {{ this.$filters.formatNumber(stat.buys_today) }}
                </div>
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.buys_total) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa fa-cart-shopping"></i>
                  <br>
                  خرید
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.persons" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/sell/list">
              <div class="block-content ribbon ribbon-success py-5">
                <div class="ribbon-box">
                  امروز
                  {{ this.$filters.formatNumber(stat.recs_today) }}
                </div>
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.recs_total) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa-solid fa-arrow-down"></i>
                  <br>
                  دریافت‌ها
                </p>
              </div>
            </router-link>
          </div>
          <div v-show="permissions.persons" class="col-6 col-lg-3">
            <router-link class="block block-rounded block-link-shadow text-center h-100 mb-0" to="/acc/sell/list">
              <div class="block-content ribbon ribbon-success py-5">
                <div class="ribbon-box">
                  امروز
                  {{ this.$filters.formatNumber(stat.sends_today) }}
                </div>
                <div class="fs-3 fw-semibold mb-1 text-primary">{{ this.$filters.formatNumber(stat.sends_total) }}</div>
                <p class="fw-semibold fs-sm text-muted text-uppercase mb-0">
                  <i class="fa-solid fa-arrow-up"></i>
                  <br>
                  پرداخت‌ها
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  data:()=>{return {
    stat:{},
    statements:[],
    permissions:{},
    plugins:{},
    wallet:{}
  }},
  methods:{
    async loadData(){
      await axios.get('/api/user/check/login').then((response)=>{
        if(response.data.result == 1){
          axios.post('/api/business/get/user/permissions',
              {'bid':localStorage.getItem('activeBid'),
                'email': response.data.email
              }
          ).then((response)=>{
            this.permissions = response.data;
          });
          //get active plugins
          axios.post('/api/plugin/get/actives',).then((response)=>{
            this.plugins = response.data;
          });
          axios.post('/api/wallet/info',).then((response)=>{
            this.wallet = response.data;
          });
          //get statments
          axios.post('/api/general/statements',).then((response)=>{
            this.statements = response.data;
          });
        }
      })

      axios.post('/api/business/stat').then((response)=>{
        this.stat = response.data
      });
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped>

</style>