<template>
  <v-toolbar color="toolbar" :title="$t('title.user.businesses')">
    <v-spacer></v-spacer>
    <v-tooltip :text="$t('title.user.business_create')" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-store-plus-outline" color="primary" to="/profile/new-business"></v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <v-container class="pa-0 ma-0">
    <v-card :loading="loading ? 'red' : null" :disabled="loading">
      <v-card-text>
        <v-row>
          <v-col v-if="loading" cols="12" sm="12" md="6" class="pa-0 ma-0">
            <v-skeleton-loader :elevation="1" type="list-item-avatar"></v-skeleton-loader>
          </v-col>
          <v-col v-for="item in contents" cols="12" sm="12" md="6" class="px-1">
            <v-card class="mx-auto mb-3" border flat>
              <v-list-item class="px-6" height="88">
                <template v-slot:prepend>
                  <v-avatar color="surface-light" size="55" :image="apiurl + '/front/avatar/file/get/' + item.id" :alt="item.name" />
                </template>
                <template v-slot:title>
                  {{ item.name }}
                </template>
                <template v-slot:subtitle>
                  {{ item.owner }}
                </template>

                <template v-slot:append>
                  <v-btn @click="runBid(item.id)" class="text-none" color="primary" :text="$t('pages.dashboard.login')" prepend-icon="mdi-login" slim></v-btn>
                </template>
              </v-list-item>
              <v-card-text class="text-medium-emphasis pa-1 px-3">
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="mb-0">
                    <v-select density="comfortable" prepend-inner-icon="mdi-cash" v-model="item.selectedMoney"
                    :label="$t('pages.dashboard.money')" variant="solo-filled" :items="item.moneys" item-title="label"></v-select>
                  </v-col>
                </v-row>
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
import { getApiUrl } from "@/hesabixConfig";
import { ref } from "vue";
import Loading from "vue-loading-overlay";

export default {
  name: "list",
  components: { Loading },
  data: () => {
    return {
      loading: ref(true),
      contents: [],
      apiurl: '',
      selectedMoney: {
        name: '',
        label: ''
      }
    }
  },
  methods: {
    loadData() {
      this.apiurl = getApiUrl();
      axios.post('/api/business/list').then((response) => {
        this.contents = response.data;
        this.contents.forEach((bid) => {
          bid.selectedMoney = bid.arzmain;
        })
        this.loading = false;
      });
    },
    async runBid(id) {
      await localStorage.setItem('activeBid', id);
      this.contents.forEach((item) => {
        if (item.id == id) {
          localStorage.setItem('activeMoney', item.selectedMoney.name);
          localStorage.setItem('activeMoneySymbol', item.selectedMoney.symbol);
          localStorage.setItem('activeMoneyShortName', item.selectedMoney.shortName);
          localStorage.setItem('activeMoneyLabel', item.selectedMoney.label);
        }
      })
      await axios.post('/api/year/list', {}, {
        headers: {
          activeBid: id
        }
      }).then((response) => {
        response.data.forEach((item) => {
          if (item.head == '1') {
            localStorage.setItem('activeYear', item.id);
          }
        });
        this.$router.push({ name: 'acc_home' });
      })
    }
  },
  beforeMount() {
    this.loadData();
  }
}
</script>

<style scoped></style>