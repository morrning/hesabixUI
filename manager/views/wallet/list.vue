<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "list",
  data: ()=>{return {
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "عملیات", value: "operation"},
      { text: "کسب و کار", value: "bidName"},
      { text: "کیف پول", value: "walletEnabled"},
      { text: "حساب متصل", value: "bankAcName"},
      { text: "صاحب حساب متصل", value: "bankAcOwner"},
      { text: "شبای حساب متصل", value: "bankAcShaba"},
      { text: "کارت متصل", value: "bankAcCardNum"},
      { text: "پرداخت‌ها(ریال)", value: "totalPays"},
      { text: "واریز‌ها(ریال)", value: "totalIncome"},
      { text: "قابل تسویه(ریال)", value: "canDeposit"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/admin/wallets/list')
          .then((response)=>{
            this.items = response.data;
            this.loading = false;
          })
    }
  },
  beforeMount() {
    this.loadData();
  }
})
</script>

<template>
  <div class="block block-content-full ">
    <div id="fixed-header" class="block-header block-header-default bg-gray-light pt-2 pb-1">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="float-start d-none d-sm-none d-md-block btn btn-sm btn-link text-warning">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-wallet px-2"></i>
        حساب‌های کیف پول </h3>
      <div class="block-options">
      </div>
    </div>
    <div class="block-content pt-1 pb-3">
      <div class="row">
        <div class="col-sm-12 col-md-12 m-0 p-0">
          <div class="mb-1">
            <div class="input-group input-group-sm">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
              <input v-model="searchValue" class="form-control" type="text" placeholder="جست و جو ...">
            </div>
          </div>
          <EasyDataTable table-class-name="customize-table"
              show-index
              alternating
              :search-value="searchValue"
              :headers="headers"
              :items="items"
              theme-color="#1d90ff"
              header-text-direction="center"
              body-text-direction="center"
              rowsPerPageMessage="تعداد سطر"
              emptyMessage="اطلاعاتی برای نمایش وجود ندارد"
              rowsOfPageSeparatorMessage="از"
              :loading = "loading"
          >
            <template #item-operation="{ id, totalPays, totalIncome }">
              <router-link v-if="totalPays != totalIncome" title="ثبت واریز" class="btn btn-sm btn-link me-1" :to="'/manager/wallet/transaction/insert/' + id">
                <i class="fa fa-plus-circle px-2"></i>
              </router-link>
            </template>
            <template #item-walletEnabled="{ walletEnabled }">
              <span v-if="walletEnabled" class="text-success">فعال</span>
              <span v-else class="text-danger">غیرفعال</span>
            </template>
            <template #item-totalPays="{ totalPays }">
              <span >{{ this.$filters.formatNumber(totalPays) }}</span>
            </template>
            <template #item-totalIncome="{ totalIncome }">
              <span >{{ this.$filters.formatNumber(totalIncome) }}</span>
            </template>
            <template #item-canDeposit="{ totalIncome,totalPays }">
              <span >{{ this.$filters.formatNumber(totalIncome - totalPays) }}</span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>