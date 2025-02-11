<template>
  <v-toolbar color="toolbar" :title="$t('drawer.dashboard')">
    <v-tooltip :text="$t('dialog.edit_dashboard')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-layers-edit" color="primary" @click="dialog = true"></v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text>
        <v-row v-show="this.statements.length != 0 && dashboard.notif">
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
          <v-col cols="12" sm="6" md="3" v-show="permissions.wallet && dashboard.wallet">
            <v-card variant="flat" color="success" prepend-icon="mdi-wallet" :title="$t('static.wallet')"
              to="/acc/wallet/view">
              <v-card-text>
                {{ $t('static.deposit') }}
                {{ this.$filters.formatNumber(wallet.deposit) }}
                {{ $t('currency.irr.short') }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.bank && dashboard.banks">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-bank" :title="$t('drawer.banks')"
              to="/acc/banks/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.bankCount) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.accounting && dashboard.acc_docs">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-book-open-page-variant"
              :title="$t('drawer.docs')" to="/acc/accounting/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.docCount) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.commodity && dashboard.commodities">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-package-variant"
              :title="$t('drawer.commodity')" to="/acc/commodity/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.commodity) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.accounting && dashboard.accounting_total">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-table-refresh" :title="$t('drawer.roller')">
              <v-card-text>
                {{ this.$filters.formatNumber(stat.income, true) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.sell && dashboard.sells">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-basket-unfill" :title="$t('drawer.sell')"
              to="/acc/sell/list">
              <v-card-text>
                <p>
                  {{ $t('drawer.total') }} :
                  {{ this.$filters.formatNumber(stat.sells_total, true) }}
                </p>
                <p>
                  {{ $t('drawer.today') }} :
                  {{ this.$filters.formatNumber(stat.sells_today, true) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.buy && dashboard.buys">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-basket-fill" :title="$t('drawer.buy')"
              to="/acc/buy/list">
              <v-card-text>
                <p>
                  {{ $t('drawer.total') }} :
                  {{ this.$filters.formatNumber(stat.buys_total, true) }}
                </p>
                <p>
                  {{ $t('drawer.today') }} :
                  {{ this.$filters.formatNumber(stat.buys_today, true) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.persons && dashboard.persons">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-account-multiple" :title="$t('drawer.persons')"
              to="/acc/persons/list">
              <v-card-text>
                <p>
                  {{ $t('static.count') }} :
                  {{ this.$filters.formatNumber(stat.personCount) }}
                </p>
                <p>
                  {{ $t('drawer.recs_today') }} :
                  {{ this.$filters.formatNumber(stat.recs_today, true) }}
                </p>
                <p>
                  {{ $t('drawer.sends_today') }} :
                  {{ this.$filters.formatNumber(stat.sends_today, true) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" v-show="permissions.sell && dashboard.sellChart && isPluginActive('accpro')">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-basket" :title="$t('drawer.sell_chart')">
              <v-card-text>
                <sale-chart></sale-chart>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog">
    <v-card prepend-icon="mdi-layers-edit" :title="$t('dialog.edit_dashboard')">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" hide-details="auto" :label="$t('static.wallet')" inset
              v-model="dashboard.wallet"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.banks')" inset
              v-model="dashboard.banks"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.acc_docs')" inset
              v-model="dashboard.acc_docs"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.persons')" inset
              v-model="dashboard.persons"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.buys')" inset
              v-model="dashboard.buys"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.sells')" inset
              v-model="dashboard.sells"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.sell_chart')" inset
              v-model="dashboard.sellChart"></v-switch>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch color="primary" hide-details="auto" :label="$t('dialog.commodities')" inset
              v-model="dashboard.commodities"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.accounting_total')" inset
              v-model="dashboard.accounting_total"></v-switch>
            <v-switch color="primary" hide-details="auto" :label="$t('drawer.notif')" inset v-model="dashboard.notif"
              :error-messages="$t('dialog.notif_msg')"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" prepend-icon="mdi-content-save" variant="outlined" color="primary"
          :text="$t('dialog.save')" @click="save()"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import saleChart from "./component/widgets/saleChart.vue";

export default {
  name: "dashboard",
  components: {
    saleChart: saleChart,
  },
  data: () => {
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
      }
    }
  },
  methods: {
    save() {
      this.loading = true;
      this.dialog = false;
      axios.post('/api/dashboard/settings/save', this.dashboard).then((response) => {
        this.loading = false;
      });
    },
    isPluginActive(plugName) {
      return this.plugins[plugName] !== undefined;
    },
    loadData() {
      this.loading = false;
      axios.post('/api/business/get/user/permissions').then((response) => {
        this.permissions = response.data;
      });
      axios.post('/api/dashboard/settings/load').then((response) => {
        this.dashboard = response.data.data;
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