<template>
  <v-toolbar color="toolbar" :title="$t('drawer.dashboard')">

  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text>
        <v-row v-show="this.statements.length != 0">
          <v-col>
            <v-alert type="info" color="primary" variant="tonal" border>
              <p v-for="statment in this.statements">
                <b>{{ statment.dateSubmit }}: </b>
                <span>{{ statment.body }}</span>
              </p>
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3" v-show="permissions.wallet">
            <v-card variant="flat" color="success" prepend-icon="mdi-wallet" :title="$t('static.wallet')"
              to="/acc/wallet/view">
              <v-card-text>
                {{ $t('static.deposit') }}
                {{ this.$filters.formatNumber(wallet.deposit) }}
                {{ $t('currency.irr.short') }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.persons">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-account-multiple" :title="$t('drawer.persons')"
              to="/acc/persons/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.personCount) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.bank">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-bank" :title="$t('drawer.banks')"
              to="/acc/banks/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.bankCount) }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="row items-push">
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
                <div class="fs-3 fw-semibold text-primary mb-1">{{ stat.commodity }}</div>
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
  data: () => {
    return {
      loading: false,
      stat: {},
      statements: [],
      permissions: {},
      plugins: {},
      wallet: {}
    }
  },
  methods: {
    loadData() {
      this.loading = false;
      axios.post('/api/business/get/user/permissions').then((response) => {
        this.permissions = response.data;
      });
      //get active plugins
      axios.post('/api/plugin/get/actives',).then((response) => {
        this.plugins = response.data;
      });
      axios.post('/api/wallet/info',).then((response) => {
        this.wallet = response.data;
      });
      //get statments
      axios.post('/api/general/statements',).then((response) => {
        this.statements = response.data;
      });

      axios.post('/api/business/stat').then((response) => {
        this.stat = response.data
      });
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped></style>