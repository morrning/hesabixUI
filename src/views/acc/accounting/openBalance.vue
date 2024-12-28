<template>
  <v-toolbar color="toolbar" :title="$t('drawer.open_balance')">
    <template v-slot:prepend>
      <v-tooltip :text="$t('dialog.back')" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="this.$router.back()" class="d-none d-sm-flex" variant="text"
            icon="mdi-arrow-right" />
        </template>
      </v-tooltip>
    </template>
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-row class="pa-1">
    <v-col>
      <v-card :title="$t('dialog.deg')" :subtitle="$t('dialog.deg_info')" color="success">
        <v-card-text class="px-0 pb-0">
          <v-list>
            <v-list-item @click="sheet.banks = !sheet.banks" value="banks" :title="$t('drawer.banks')">
              <template v-slot:append>
                {{ $filters.formatNumber(sums.banks, true) }}
              </template>
            </v-list-item>
            <v-list-item @click="sheet.cashdesks = !sheet.cashdesks" value="cashdesks" :title="$t('drawer.cashdesks')">
              <template v-slot:append>
                {{ $filters.formatNumber(sums.cashdesks, true) }}
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      ddd
    </v-col>
  </v-row>
  <v-bottom-sheet inset v-model="sheet.banks">
    <v-toolbar color="toolbar" :title="$t('drawer.banks')">
      <template v-slot:prepend>
        <v-tooltip :text="$t('dialog.close')" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="sheet.banks = false" class="d-none d-sm-flex" variant="text"
              icon="mdi-close" />
          </template>
        </v-tooltip>
      </template>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" @click="saveBanks()" icon="" color="green">
        <v-tooltip activator="parent" :text="$t('dialog.save')" location="bottom" />
        <v-icon icon="mdi-content-save"></v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col v-for="item in data.banks" key="item.info.id">
            <div class="form-floating mb-3">
              <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="item.openbalance" />
              <label for="floatingInput">{{ item.info.name }} ({{ $filters.getActiveMoney().symbol }}) </label>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
  <v-bottom-sheet inset v-model="sheet.cashdesks">
    <v-toolbar color="toolbar" :title="$t('drawer.cashdesks')">
      <template v-slot:prepend>
        <v-tooltip :text="$t('dialog.close')" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="sheet.cashdesks = false" class="d-none d-sm-flex" variant="text"
              icon="mdi-close" />
          </template>
        </v-tooltip>
      </template>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" @click="saveCashdesks()" icon="" color="green">
        <v-tooltip activator="parent" :text="$t('dialog.save')" location="bottom" />
        <v-icon icon="mdi-content-save"></v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col v-for="item in data.cashdesks" key="item.info.id">
            <div class="form-floating mb-3">
              <money3 v-bind="currencyConfig" min=0 class="form-control" v-model="item.openbalance" />
              <label for="floatingInput">{{ item.info.name }} ({{ $filters.getActiveMoney().symbol }}) </label>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import axios from "axios";
import Loading from 'vue-loading-overlay';

export default {
  name: "table",
  components: {
    Loading
  },
  data: () => {
    return {
      loading: false,
      currencyConfig: {
        masked: false,
        prefix: '',
        suffix: '',
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
      sheet: {
        banks: false,
        cashdesks: false,
      },
      data: {
        banks: [],
        cashdesks: [],
      },
      sums: {
        banks: 0,
        cashdesks: 0,
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.sums.banks = 0;
      this.sums.cashdesks = 0;
      axios.post('/api/openbalance/get').then((Response) => {
        this.data = Response.data.data;
        this.data.banks.forEach((item) => {
          if (item.openbalance != undefined) {
            this.sums.banks += parseFloat(item.openbalance);
          }
          else{
            item.openbalance = 0;
          }
        });
        this.data.cashdesks.forEach((item) => {
          if (item.openbalance != undefined) {
            this.sums.cashdesks += parseFloat(item.openbalance);
          }
          else{
            item.openbalance = 0;
          }
        });
      })
    },
    saveBanks() {
      this.loading = true;
      
      axios.post('/api/openbalance/save/banks', this.data.banks).then((Response) => {
        this.loading = false;
        this.loadData();
        this.sheet.banks = false;
      })
    },
    saveCashdesks() {
      this.loading = true;
      axios.post('/api/openbalance/save/cashdesks', this.data.cashdesks).then((Response) => {
        this.loading = false;
        this.loadData();
        this.sheet.cashdesks = false;
      })
    }
  }

}
</script>

<style scoped></style>