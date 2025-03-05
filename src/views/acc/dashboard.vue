<template>
  <!-- Toolbar بالای صفحه -->
  <v-toolbar color="toolbar" :title="$t('drawer.dashboard')">
    <v-tooltip :text="$t('dialog.edit_dashboard')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-layers-edit" color="primary" @click="dialog = true"></v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>

  <!-- محتوای اصلی -->
  <v-container fluid class="pa-4">
    <v-row v-show="statements.length > 0 && dashboard.notif" dense>
      <v-col cols="12">
        <v-alert type="info" color="blue-grey" variant="tonal" border class="animate__animated animate__fadeInDown">
          <v-row dense>
            <v-col v-for="statment in statements" :key="statment.dateSubmit" cols="12">
              <span class="font-weight-bold">{{ statment.dateSubmit }}: </span>
              <span>{{ statment.body }}</span>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" sm="12" md="6" v-show="permissions.sell && dashboard.sellChart && isPluginActive('accpro')">
        <v-card class="animate__animated animate__zoomIn card-equal-height_big" variant="outlined"
          prepend-icon="mdi-basket" :title="$t('drawer.sell_chart')" hover>
          <v-card-text class="pa-0">
            <sale-chart></sale-chart>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- کارت جدید: کالاهای پرفروش -->
      <v-col cols="12" sm="12" md="6" v-show="permissions.sell && dashboard.topCommodities">
        <v-card class="animate__animated animate__zoomIn card-equal-height_big" variant="outlined"
          prepend-icon="mdi-chart-pie" :title="$t('dashboard.topCommodities.title')" hover>
          <v-card-text class="pa-2">
            <!-- دکمه‌های انتخاب بازه زمانی و تعداد -->
            <v-row dense>
              <v-col cols="6">
                <v-select v-model="topCommoditiesPeriod" :items="periodOptions"
                  :label="$t('dashboard.topCommodities.period')" dense density="compact" outlined
                  @update:modelValue="fetchTopCommodities"></v-select>
              </v-col>
              <v-col cols="6">
                <v-select v-model="topCommoditiesLimit" :items="limitOptions"
                  :label="$t('dashboard.topCommodities.limit')" dense density="compact" outlined
                  @update:modelValue="fetchTopCommodities"></v-select>
              </v-col>
            </v-row>
            <!-- نمودارها -->
            <top-commodities-chart :commodities="topCommodities" v-if="topCommodities.length > 0" />
            <p v-else class="text-center">{{ $t('dashboard.topCommodities.noData') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- کارت‌های قبلی (بدون تغییر) -->
      <v-col cols="12" sm="6" md="4" v-show="permissions.wallet && dashboard.wallet">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="success-lighten-4" variant="elevated"
          prepend-icon="mdi-wallet" :title="$t('static.wallet')" to="/acc/wallet/view" hover>
          <v-card-text class="text-dark">
            <v-icon left small color="success">mdi-currency-usd</v-icon>
            {{ $t('static.deposit') }}: {{ $filters.formatNumber(wallet.deposit) || '0' }} {{ $t('currency.irr.short')
            }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="permissions.persons && dashboard.persons">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="indigo-lighten-4" variant="elevated"
          prepend-icon="mdi-account-multiple" :title="$t('drawer.persons')" to="/acc/persons/list" hover>
          <v-card-text class="text-dark">
            <p><v-icon left small color="indigo">mdi-numeric</v-icon>{{ $t('static.count') }}: {{
              $filters.formatNumber(stat.personCount) || '0' }}</p>
            <p><v-icon left small color="indigo">mdi-arrow-down</v-icon>{{ $t('drawer.recs_today') }}: {{
              $filters.formatNumber(stat.recs_today, true) || '0' }}</p>
            <p><v-icon left small color="indigo">mdi-arrow-up</v-icon>{{ $t('drawer.sends_today') }}: {{
              $filters.formatNumber(stat.sends_today, true) || '0' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="permissions.sell && dashboard.sells">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="green-lighten-4" variant="elevated"
          prepend-icon="mdi-basket-unfill" :title="$t('drawer.sell')" to="/acc/sell/list" hover>
          <v-card-text class="text-dark">
            <p><v-icon left small color="green">mdi-sigma</v-icon>{{ $t('drawer.total') }}: {{
              $filters.formatNumber(stat.sells_total, true) || '0' }}</p>
            <p><v-icon left small color="green">mdi-calendar-today</v-icon>{{ $t('drawer.today') }}: {{
              $filters.formatNumber(stat.sells_today, true) || '0' }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- ردیف دوم -->
      <v-col cols="12" sm="6" md="4" v-show="permissions.buy && dashboard.buys">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="red-lighten-4" variant="elevated"
          prepend-icon="mdi-basket-fill" :title="$t('drawer.buy')" to="/acc/buy/list" hover>
          <v-card-text class="text-dark">
            <p><v-icon left small color="red">mdi-sigma</v-icon>{{ $t('drawer.total') }}: {{
              $filters.formatNumber(stat.buys_total, true) || '0' }}</p>
            <p><v-icon left small color="red">mdi-calendar-today</v-icon>{{ $t('drawer.today') }}: {{
              $filters.formatNumber(stat.buys_today, true) || '0' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="permissions.accounting && dashboard.accounting_total">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="orange-lighten-4" variant="elevated"
          prepend-icon="mdi-table-refresh" :title="$t('drawer.roller')" hover>
          <v-card-text class="text-dark">
            <v-icon left small color="orange">mdi-currency-usd</v-icon>
            {{ $filters.formatNumber(stat.income, true) || '0' }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="permissions.bank && dashboard.banks">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="blue-lighten-4" variant="elevated"
          prepend-icon="mdi-bank" :title="$t('drawer.banks')" to="/acc/banks/list" hover>
          <v-card-text class="text-dark">
            <v-icon left small color="blue">mdi-numeric</v-icon>
            {{ $t('static.count') }}: {{ $filters.formatNumber(stat.bankCount) || '0' }}
          </v-card-text>
        </v-card>
      </v-col>

      <!-- ردیف سوم -->
      <v-col cols="12" sm="6" md="4" v-show="permissions.accounting && dashboard.acc_docs">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="purple-lighten-4" variant="elevated"
          prepend-icon="mdi-book-open-page-variant" :title="$t('drawer.docs')" to="/acc/accounting/list" hover>
          <v-card-text class="text-dark">
            <v-icon left small color="purple">mdi-numeric</v-icon>
            {{ $t('static.count') }}: {{ $filters.formatNumber(stat.docCount) || '0' }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-show="permissions.commodity && dashboard.commodities">
        <v-card class="animate__animated animate__zoomIn card-equal-height" color="teal-lighten-4" variant="elevated"
          prepend-icon="mdi-package-variant" :title="$t('drawer.commodity')" to="/acc/commodity/list" hover>
          <v-card-text class="text-dark">
            <v-icon left small color="teal">mdi-numeric</v-icon>
            {{ $t('static.count') }}: {{ $filters.formatNumber(stat.commodity) || '0' }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- دیالوگ تنظیمات داشبورد -->
  <v-dialog v-model="dialog">
    <v-card color="grey-lighten-4">
      <v-toolbar color="primary-dark" dense flat>
        <v-icon left class="ms-2" color="white">mdi-layers-edit</v-icon>
        <v-toolbar-title class="text-white text-subtitle-1">{{ $t('dialog.edit_dashboard') }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-2">
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-switch size="small" color="primary" :label="$t('static.wallet')" v-model="dashboard.wallet" dense
              hide-details inset class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.banks')" v-model="dashboard.banks" dense hide-details inset
              class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.acc_docs')" v-model="dashboard.acc_docs" dense hide-details
              inset class="text-caption" />
            <v-switch color="primary" label="نمودار کالاهای پرفروش" v-model="dashboard.topCommodities" dense
              hide-details inset class="text-caption" />

          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" :label="$t('drawer.persons')" v-model="dashboard.persons" dense hide-details inset
              class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.buys')" v-model="dashboard.buys" dense hide-details inset
              class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.sells')" v-model="dashboard.sells" dense hide-details inset
              class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.sell_chart')" v-model="dashboard.sellChart" dense hide-details
              inset class="text-caption" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" :label="$t('dialog.commodities')" v-model="dashboard.commodities" dense
              hide-details inset class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.accounting_total')" v-model="dashboard.accounting_total" dense
              hide-details inset class="text-caption" />
            <v-switch color="primary" :label="$t('drawer.notif')" v-model="dashboard.notif" dense
              :hint="$t('dialog.notif_msg')" persistent-hint inset class="text-caption" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-2">
        <v-spacer />
        <v-btn prepend-icon="mdi-content-save" color="primary" variant="outlined" :text="$t('dialog.save')"
          @click="save" :loading="loading" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-overlay :value="loading" contained class="align-center justify-center">
    <v-progress-circular indeterminate size="64" color="primary" />
  </v-overlay>
</template>

<script>
import axios from "axios";
import SaleChart from "./component/widgets/saleChart.vue";
import TopCommoditiesChart from '@/components/widgets/TopCommoditiesChart.vue';

export default {
  name: "dashboard",
  components: {
    SaleChart,
    TopCommoditiesChart,
  },
  data() {
    const self = this;
    return {
      loading: false,
      dialog: false,
      stat: {},
      statements: [],
      permissions: {},
      plugins: [],
      wallet: {},
      dashboard: {
        banks: false,
        wallet: false,
        buys: false,
        sells: false,
        commodities: false,
        acc_docs: false,
        accounting_total: false,
        persons: false,
        notif: false,
        sellChart: false,
        topCommodities: false,
      },
      topCommodities: [],
      topCommoditiesPeriod: 'year',
      topCommoditiesLimit: 5,
      periodOptions: [
        { title: self.$t('dashboard.period.today'), value: 'today' },
        { title: self.$t('dashboard.period.week'), value: 'week' },
        { title: self.$t('dashboard.period.month'), value: 'month' },
        { title: self.$t('dashboard.period.year'), value: 'year' },
      ],
      limitOptions: [
        { title: '۳', value: 3 },
        { title: '۵', value: 5 },
        { title: '۷', value: 7 },
        { title: '۱۰', value: 10 },
      ],
    }
  },
  methods: {
    async save() {
      this.loading = true;
      try {
        await axios.post('/api/dashboard/settings/save', this.dashboard);
        this.dialog = false;
      } catch (error) {
        console.error('Save error:', error);
      } finally {
        this.loading = false;
      }
    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
    async loadData() {
      this.loading = true;
      try {
        const [permissions, settings, plugins, wallet, statements, stats] = await Promise.all([
          axios.post('/api/business/get/user/permissions'),
          axios.post('/api/dashboard/settings/load'),
          axios.post('/api/plugin/get/actives'),
          axios.post('/api/wallet/info'),
          axios.post('/api/general/statements'),
          axios.post('/api/business/stat'),
        ]);
        this.permissions = permissions.data;
        this.dashboard = settings.data.data;
        this.plugins = plugins.data;
        this.wallet = wallet.data;
        this.statements = statements.data;
        this.stat = stats.data;

        if (this.dashboard.topCommodities) {
          await this.fetchTopCommodities();
        }
      } catch (error) {
        console.error('Load data error:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchTopCommodities() {
      this.loading = true;
      try {
        const response = await axios.post('/api/report/top-selling-commodities', {
          period: this.topCommoditiesPeriod,
          limit: this.topCommoditiesLimit,
        });
        console.log('API response:', response.data); // دیباگ خروجی API
        this.topCommodities = response.data;
      } catch (error) {
        console.error('Fetch top commodities error:', error);
        this.topCommodities = [];
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.card-equal-height {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-equal-height_big {
  height: 550;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@import 'animate.css';
</style>