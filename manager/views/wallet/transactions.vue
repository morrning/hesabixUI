<script lang="ts">
import {defineComponent, ref} from 'vue'
import axios from "axios";
import Swal from "sweetalert2";

export default defineComponent({
  name: "transactions",
  data: ()=>{return {
    searchValue: '',
    loading: ref(true),
    items:[],
    headers: [
      { text: "تاریخ", value: "dateSubmit"},
      { text: "کسب و کار", value: "bidName"},
      { text: "نوع", value: "type"},
      { text: "شبا پرداخت", value: "shaba"},
      { text: "کارت پرداخت", value: "cardPan"},
      { text: "شماره پیگیری", value: "refID"},
      { text: "درگاه/بانک", value: "gatePay"},
    ]
  }},
  methods: {
    loadData(){
      axios.get('/api/admin/wallets/transactions/list')
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
    <div class="block-header block-header-default bg-gray-light">
      <h3 class="block-title text-primary-dark">
        <button @click="this.$router.back()" type="button" class="btn text-warning mx-2 px-2">
          <i class="fa fw-bold fa-arrow-right"></i>
        </button>
        <i class="fa fa-list px-2"></i>
        تراکنش‌ها </h3>
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
          <EasyDataTable
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
            <template #item-type="{ type }">
              <span v-if="type == 'pay'" class="text-success">پرداخت به حساب</span>
              <span v-else class="text-danger">دریافت در حساب</span>
            </template>
            <template #item-gatePay="{ gatePay }">
              <span v-if="gatePay == 'zarinpal'" class="text-warning">
                <img src="/img/icons/zarinpal.png" class="img-avatar img-avatar16"  alt="زرین پال"/>
                زرین‌پال
              </span>
              <span v-else class="text-success"><i class="fa fa-bank"></i> {{gatePay}}</span>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>