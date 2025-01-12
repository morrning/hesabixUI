<template>
  <v-toolbar color="toolbar" :title="$t('drawer.dashboard')">
    <v-tooltip :text="$t('dialog.edit_dashboard')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-layers-edit" color="primary" @click="dialog = true"></v-btn>
        <v-dialog v-model="dialog" width="auto">
          <v-card prepend-icon="mdi-update" :title="$t('dialog.edit_dashboard')">
            <v-card-text>

            </v-card-text>
            <template v-slot:actions>
              <v-btn class="ms-auto" :text="$t('dialog.save')" @click="save()"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </template>
    </v-tooltip>
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
          <v-col cols="12" sm="6" md="3" v-show="permissions.bank">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-bank" :title="$t('drawer.banks')"
              to="/acc/banks/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.bankCount) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.accounting">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-book-open-page-variant"
              :title="$t('drawer.docs')" to="/acc/accounting/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.docCount) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.commodity">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-package-variant"
              :title="$t('drawer.commodity')" to="/acc/commodity/list">
              <v-card-text>
                {{ $t('static.count') }} :
                {{ this.$filters.formatNumber(stat.commodity) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.accounting">
            <v-card variant="outlined" color="primary" prepend-icon="mdi-table-refresh" :title="$t('drawer.roller')">
              <v-card-text>
                {{ this.$filters.formatNumber(stat.income, true) }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3" v-show="permissions.sell">
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
          <v-col cols="12" sm="6" md="3" v-show="permissions.buy">
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
          <v-col cols="12" sm="6" md="3" v-show="permissions.persons">
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
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  data: () => {
    return {
      loading: false,
      dialog: false,
      stat: {},
      statements: [],
      permissions: {},
      plugins: {},
      wallet: {}
    }
  },
  methods: {
    save() {
      this.loading = true;
      this.dialog = false;
    },
    loadData() {
      this.loading = false;
      axios.post('/api/business/get/user/permissions').then((response) => {
        this.permissions = response.data;
      });
      axios.post('/api/dashboard/settings/load').then((response) => {
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